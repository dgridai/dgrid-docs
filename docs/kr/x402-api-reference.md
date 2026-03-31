---
title: API Reference
aside: false
outline: false
---

# x402 API Reference

이 페이지는 DGrid 요청 단위 결제 추론을 위한 x402 전용 엔드포인트 세부사항을 정리합니다.

**OpenAI 호환** 또는 **Claude 호환** 모델 호출 형식을 찾고 있다면 [Model API](/kr/Model-API)을 참고하세요. 해당 페이지들이 공급자 스타일 요청 예시의 기본 레퍼런스이며, 이 페이지는 x402 결제 플로우와 x402 엔드포인트에서 노출하는 공통 추론 필드에 집중합니다.

<ApiEndpoint
  id="x402-inference-api"
  title="x402 AI 추론 API"
  summary="x402 payment requirements 를 통해 DGrid 추론을 호출합니다. 첫 번째 요청은 결제 요구사항을 받고, 두 번째 요청은 서명된 x-payment 와 함께 추론을 실행합니다."
  method="POST"
  path="/x402/v1"
  base-url="https://api.dgrid.ai"
  auth="Content-Type: application/json; x-payment: <x402-payment-payload>"
  request-type="application/json"
  response-code="402 / 200"
  response-type="application/json 또는 text/event-stream"
>

### 인증 및 결제

이 엔드포인트는 계정 잔액 기반 과금 대신 **x402 결제 프로토콜**을 사용합니다.

유료 요청에 필요한 헤더:

```http
Content-Type: application/json
x-payment: <x402-payment-payload>
```

### 요청 본문

| 필드 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `messages` | array | 예 | - | `role` 과 `content` 를 포함한 `UIMessage` 배열입니다. |
| `model` | string | 아니오 | `anthropic/claude-opus-4.5` | 대상 모델 이름입니다. |
| `stream` | boolean | 아니오 | `true` | 스트리밍 응답 여부입니다. |
| `temperature` | number | 아니오 | `1` | 샘플링 온도입니다. |
| `topP` | number | 아니오 | `1` | top-p 파라미터입니다. |
| `topK` | number | 아니오 | `40` | top-k 파라미터입니다. |

### 응답 모드

#### `stream = true` (기본값)

AI SDK 스타일 `UIMessageChunk` 이벤트를 사용하는 **UIMessageStream** SSE (`text/event-stream`) 를 반환합니다. 대표 이벤트 타입은 다음과 같습니다:

* `start`
* `text-start`
* `text-delta`
* `text-end`
* `finish`

마지막 `finish` 이벤트에는 다음과 같은 `messageMetadata` 가 포함됩니다:

* `totalTokens`
* `allowanceLeft`
* `calculatedPriceWei`
* `realPriceWei`

#### `stream = false`

`choices` 와 `usage` 를 포함하는 DGrid 표준 completion 형식의 단일 JSON 응답을 반환합니다.

### 오류

| 상태 코드 | 의미 |
| --- | --- |
| `402` | 결제 검증 실패. 보통 첫 요청에 `x-payment` 가 없었거나 결제 서명이 잘못된 경우 |
| `400` | 잘못된 요청 또는 업스트림 검증 오류 |
| `500` | 서버 또는 업스트림 모델 오류 |

### 정산 메모

* 엔드포인트는 실제 `usage` 기준으로 정산합니다.
* 실제 비용이 승인 상한을 초과하면, 상한까지만 정산합니다.

<template #code>

<ApiCodePanel title="1단계: 402 유도" label="cURL">

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

<ApiCodePanel title="402 응답 예시" label="application/json">

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

<ApiCodePanel title="2단계: x-payment 와 함께 재요청" label="cURL">

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

<ApiCodePanel title="스트리밍 응답 예시" label="text/event-stream">

```text
data: {"type":"start"}

data: {"type":"text-start","id":"..."}

data: {"type":"text-delta","id":"...","delta":"Hello"}

data: {"type":"text-end","id":"..."}

data: {"type":"finish","finishReason":"stop","messageMetadata":{"totalTokens":123,"allowanceLeft":"990000000000000000","calculatedPriceWei":"1230000000000000","realPriceWei":"1230000000000000"}}
```

</ApiCodePanel>

<ApiCodePanel title="비스트리밍 응답 예시" label="application/json">

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
