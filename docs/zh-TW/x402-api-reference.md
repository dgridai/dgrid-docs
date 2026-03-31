---
title: API Reference
aside: false
outline: false
---

# x402 API Reference

本頁整理 DGrid 按次支付推理的 x402 專屬端點細節。

若您要找的是 **OpenAI 相容** 或 **Claude 相容** 的模型調用格式，建議改看 [Model API](/zh-TW/Model-API)。那些頁面仍是供應商風格請求範例的主要參考；本頁則聚焦在 x402 的支付流程，以及 x402 端點暴露的共用推理欄位。

<ApiEndpoint
  id="x402-inference-api"
  title="x402 AI 推理 API"
  summary="透過 x402 payment requirements 調用 DGrid 推理。第一次請求取得付款要求，第二次攜帶簽名後的 x-payment 執行推理。"
  method="POST"
  path="/x402/v1"
  base-url="https://api.dgrid.ai"
  auth="Content-Type: application/json; x-payment: <x402-payment-payload>"
  request-type="application/json"
  response-code="402 / 200"
  response-type="application/json 或 text/event-stream"
>

### 認證與支付

此端點使用 **x402 支付協議**，而不是傳統帳戶餘額計費方式。

付費請求所需標頭：

```http
Content-Type: application/json
x-payment: <x402-payment-payload>
```

### 請求體

| 欄位 | 型別 | 必填 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| `messages` | array | 是 | - | `UIMessage` 陣列，包含 `role` 與 `content`。 |
| `model` | string | 否 | `anthropic/claude-opus-4.5` | 目標模型名稱。 |
| `stream` | boolean | 否 | `true` | 是否返回串流回應。 |
| `temperature` | number | 否 | `1` | 採樣溫度。 |
| `topP` | number | 否 | `1` | Top-p 參數。 |
| `topK` | number | 否 | `40` | Top-k 參數。 |

### 回應模式

#### `stream = true`（預設）

返回 **UIMessageStream** 的 SSE（`text/event-stream`），事件格式採用 AI SDK 風格的 `UIMessageChunk`。常見事件類型包括：

* `start`
* `text-start`
* `text-delta`
* `text-end`
* `finish`

最後的 `finish` 事件會帶有 `messageMetadata`，例如：

* `totalTokens`
* `allowanceLeft`
* `calculatedPriceWei`
* `realPriceWei`

#### `stream = false`

返回一次性 JSON，格式為 DGrid 標準 completion 回應，包含 `choices` 與 `usage`。

### 錯誤

| 狀態碼 | 說明 |
| --- | --- |
| `402` | 付款驗證失敗，通常是第一次請求未帶 `x-payment`，或付款簽名無效 |
| `400` | 請求參數錯誤或上游校驗失敗 |
| `500` | 服務端或上游模型錯誤 |

### 結算說明

* 端點會依據實際 `usage` 進行結算。
* 若實際費用超過授權上限，則按授權上限結算。

<template #code>

<ApiCodePanel title="第一步：觸發 402" label="cURL">

```bash
curl -i 'https://api.dgrid.ai/x402/v1' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "model": "anthropic/claude-opus-4.5",
    "stream": true,
    "messages": [
      { "role": "user", "content": "Hello" }
    ]
  }'
```

</ApiCodePanel>

<ApiCodePanel title="402 回應範例" label="application/json">

```http
HTTP/1.1 402 Payment Required
Content-Type: application/json
X-PAYMENT-RESPONSE: <base64>
```

```json
{
  "x402Version": 1,
  "error": "Payment required",
  "accepts": [
    {
      "scheme": "upto",
      "network": "eip155:56",
      "maxAmountRequired": "990000000000000000",
      "resource": "https://api.dgrid.ai/x402/v1",
      "payTo": "0x...",
      "asset": "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
      "maxTimeoutSeconds": 86400
    }
  ]
}
```

</ApiCodePanel>

<ApiCodePanel title="第二步：攜帶 x-payment 重新請求" label="cURL">

```bash
curl -i 'https://api.dgrid.ai/x402/v1' \
  -H 'Content-Type: application/json' \
  -H 'x-payment: <x402-payment-payload>' \
  --data-raw '{
    "model": "anthropic/claude-opus-4.5",
    "stream": true,
    "messages": [
      { "role": "user", "content": "Hello" }
    ]
  }'
```

</ApiCodePanel>

<ApiCodePanel title="串流回應範例" label="text/event-stream">

```text
data: {"type":"start"}

data: {"type":"text-start","id":"..."}

data: {"type":"text-delta","id":"...","delta":"Hello"}

data: {"type":"text-end","id":"..."}

data: {"type":"finish","finishReason":"stop","messageMetadata":{"totalTokens":123,"allowanceLeft":"990000000000000000","calculatedPriceWei":"1230000000000000","realPriceWei":"1230000000000000"}}
```

</ApiCodePanel>

<ApiCodePanel title="非串流回應範例" label="application/json">

```json
{
  "id": "chatcmpl-xxxx",
  "object": "chat.completion",
  "created": 1773823863,
  "model": "grok-4-fast",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "xxxxx"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 11,
    "completion_tokens": 323,
    "total_tokens": 334
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
