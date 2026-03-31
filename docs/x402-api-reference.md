---
title: API Reference
aside: false
outline: false
---

# x402 API Reference

This page documents the x402-specific endpoint details for DGrid pay-per-inference requests.

If you are looking for provider-style request patterns such as **OpenAI-compatible** or **Claude-compatible** payloads, see [Model API](/Model-API). Those references remain the best source for provider-specific invocation examples. This page focuses on the x402 payment flow plus the shared inference fields exposed at the x402 endpoint.

<ApiEndpoint
  id="x402-inference-api"
  title="x402 AI Inference API"
  summary="Call DGrid inference with x402 payment requirements. The first request returns payment instructions; the second request includes a signed x-payment header and executes inference."
  method="POST"
  path="/x402/v1"
  base-url="https://api.dgrid.ai"
  auth="Content-Type: application/json; x-payment: <x402-payment-payload>"
  request-type="application/json"
  response-code="402 / 200"
  response-type="application/json or text/event-stream"
>

### Payment and Authentication

This endpoint uses the **x402 payment protocol** instead of an account balance workflow.

Required request headers for the paid request:

```http
Content-Type: application/json
x-payment: <x402-payment-payload>
```

### Request Body

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `messages` | array | Yes | - | `UIMessage` array containing `role` and `content`. |
| `model` | string | No | `anthropic/claude-opus-4.5` | Target model name. |
| `stream` | boolean | No | `true` | Whether to return a streaming response. |
| `temperature` | number | No | `1` | Sampling temperature. |
| `topP` | number | No | `1` | Top-p sampling parameter. |
| `topK` | number | No | `40` | Top-k sampling parameter. |

### Response Modes

#### `stream = true` (default)

Returns **UIMessageStream** SSE (`text/event-stream`) using AI SDK style `UIMessageChunk` events. Common event types include:

* `start`
* `text-start`
* `text-delta`
* `text-end`
* `finish`

The final `finish` event includes `messageMetadata` such as:

* `totalTokens`
* `allowanceLeft`
* `calculatedPriceWei`
* `realPriceWei`

#### `stream = false`

Returns a single JSON response in DGrid's standard completion format with `choices` and `usage`.

### Errors

| Status | Meaning |
| --- | --- |
| `402` | Payment validation failed, usually because the first request omitted `x-payment` or the payment signature was invalid |
| `400` | Invalid request or upstream validation error |
| `500` | Server-side or upstream provider error |

### Settlement Notes

* The endpoint settles based on actual usage.
* If actual cost exceeds the authorized upper bound, settlement is capped at that authorized limit.

<template #code>

<ApiCodePanel title="Step 1: Trigger 402" label="cURL">

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

<ApiCodePanel title="402 Response Example" label="application/json">

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

<ApiCodePanel title="Step 2: Retry with x-payment" label="cURL">

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

<ApiCodePanel title="Streaming Response Example" label="text/event-stream">

```text
data: {"type":"start"}

data: {"type":"text-start","id":"..."}

data: {"type":"text-delta","id":"...","delta":"Hello"}

data: {"type":"text-end","id":"..."}

data: {"type":"finish","finishReason":"stop","messageMetadata":{"totalTokens":123,"allowanceLeft":"990000000000000000","calculatedPriceWei":"1230000000000000","realPriceWei":"1230000000000000"}}
```

</ApiCodePanel>

<ApiCodePanel title="Non-Streaming Response Example" label="application/json">

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
