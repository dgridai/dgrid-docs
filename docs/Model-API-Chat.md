---
title: Chat
aside: false
outline: false
---

# Chat

The Chat API section covers Claude-compatible conversations, Gemini-native multimodal messaging, OpenAI-compatible Chat Completions, and the newer Responses API.

<ApiEndpoint
  id="native-claude-format"
  title="Native Claude Format"
  summary="Use the Claude Messages API when you need Anthropic-compatible payloads, tool use, or system prompts."
  method="POST"
  path="/v1/messages"
  auth="Authorization: Bearer <DGRID_API_KEY>; anthropic-version: 2023-06-01"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Model ID, such as `claude-3-5-sonnet-20241022`. |
| `max_tokens` | integer | Yes | Maximum output token count. |
| `messages` | array | Yes | Conversation message list. |
| `messages[].role` | string | Yes | `user` or `assistant`. |
| `messages[].content` | string or array | Yes | Message content or content blocks. |
| `system` | string | No | System instructions. |
| `temperature` | number | No | Sampling temperature. |
| `top_p` | number | No | Top-p sampling. |
| `top_k` | integer | No | Top-k sampling. |
| `stop_sequences` | array | No | Stop sequences. |
| `stream` | boolean | No | Enable streaming responses. |
| `tools` | array | No | Tool schema definitions. |
| `tool_choice` | object | No | Tool selection strategy. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Message identifier. |
| `type` | string | Always `message`. |
| `role` | string | Always `assistant`. |
| `content` | array | Returned content blocks. |
| `content[].type` | string | `text` or `tool_use`. |
| `content[].text` | string | Text body when the content type is text. |
| `model` | string | Model that produced the output. |
| `stop_reason` | string | `end_turn`, `max_tokens`, `stop_sequence`, or `tool_use`. |
| `usage` | object | Token usage metadata. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/messages" \
  -H "anthropic-version: 2023-06-01" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-opus-20240229",
    "messages": [
      {
        "role": "user",
        "content": "string"
      }
    ],
    "max_tokens": 1
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "claude-3-opus-20240229",
  "messages": [
    {
      "role": "user",
      "content": "string"
    }
  ],
  "max_tokens": 1
})

fetch("https://api.dgrid.ai/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "anthropic-version": "2023-06-01",
    "Authorization": "Bearer "
  },
  body
})
```

```go [Go]
package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
  "strings"
)

func main() {
  url := "https://api.dgrid.ai/v1/messages"
  body := strings.NewReader(`{
    "model": "claude-3-opus-20240229",
    "messages": [
      {
        "role": "user",
        "content": "string"
      }
    ],
    "max_tokens": 1
  }`)
  req, _ := http.NewRequest("POST", url, body)
  req.Header.Add("anthropic-version", "2023-06-01")
  req.Header.Add("Authorization", "Bearer ")
  req.Header.Add("Content-Type", "application/json")
  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))
}
```

```python [Python]
import requests

url = "https://api.dgrid.ai/v1/messages"
body = """{
  "model": "claude-3-opus-20240229",
  "messages": [
    {
      "role": "user",
      "content": "string"
    }
  ],
  "max_tokens": 1
}"""
response = requests.request("POST", url, data = body, headers = {
  "Content-Type": "application/json", 
  "anthropic-version": "2023-06-01", 
  "Authorization": "Bearer "
})

print(response.text)
```

```java [Java]
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;
import java.net.http.HttpRequest.BodyPublishers;

var body = BodyPublishers.ofString("""{
  "model": "claude-3-opus-20240229",
  "messages": [
    {
      "role": "user",
      "content": "string"
    }
  ],
  "max_tokens": 1
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/messages"))
  .header("anthropic-version", "2023-06-01")
  .header("Authorization", "Bearer ")
  .header("Content-Type", "application/json")
  .POST(body)
  .build();

try {
  HttpResponse<String> response = client.send(requestBuilder.build(), BodyHandlers.ofString());
  System.out.println("Status code: " + response.statusCode());
  System.out.println("Response body: " + response.body());
} catch (Exception e) {
  e.printStackTrace();
}
```

```cs [C#]
using System;
using System.Net.Http;
using System.Text;

var body = new StringContent("""
{
  "model": "claude-3-opus-20240229",
  "messages": [
    {
      "role": "user",
      "content": "string"
    }
  ],
  "max_tokens": 1
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("anthropic-version", "2023-06-01");
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/messages", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 Response" label="application/json">

```json
{
  "id": "string",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "string",
      "text": "string"
    }
  ],
  "model": "string",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 0,
    "output_tokens": 0,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="gemini-media-recognition"
  title="Gemini Media Recognition"
  summary="Use Gemini-native multimodal parts to analyze images, audio, video, or mixed media in a single request."
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Model ID such as `gemini-1.5-pro`. |

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | object | Yes | The current example sends an empty JSON object `{}`. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `candidates` | array | Candidate responses returned by the model. |
| `candidates[].content` | object | Generated content object. |
| `candidates[].content.role` | string | Role returned in the generated content block. |
| `candidates[].content.parts` | array | Returned content parts. |
| `candidates[].finishReason` | string | Finish reason string. |
| `candidates[].safetyRatings` | array | Safety evaluation results. |
| `usageMetadata` | object | Token accounting metadata. |
| `usageMetadata.promptTokenCount` | integer | Prompt token count. |
| `usageMetadata.candidatesTokenCount` | integer | Candidate output token count. |
| `usageMetadata.totalTokenCount` | integer | Total token count. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/models/string:generateContent" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{}'
```

```js [JavaScript]
const body = JSON.stringify({})

fetch("https://api.dgrid.ai/v1/models/string:generateContent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer "
  },
  body
})
```

```go [Go]
package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
  "strings"
)

func main() {
  url := "https://api.dgrid.ai/v1/models/string:generateContent"
  body := strings.NewReader(`{}`)
  req, _ := http.NewRequest("POST", url, body)
  req.Header.Add("Authorization", "Bearer ")
  req.Header.Add("Content-Type", "application/json")
  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))
}
```

```python [Python]
import requests

url = "https://api.dgrid.ai/v1/models/string:generateContent"
body = """{}"""
response = requests.request("POST", url, data = body, headers = {
  "Content-Type": "application/json", 
  "Authorization": "Bearer "
})

print(response.text)
```

```java [Java]
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;
import java.net.http.HttpRequest.BodyPublishers;

var body = BodyPublishers.ofString("""{}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/models/string:generateContent"))
  .header("Authorization", "Bearer ")
  .header("Content-Type", "application/json")
  .POST(body)
  .build();

try {
  HttpResponse<String> response = client.send(requestBuilder.build(), BodyHandlers.ofString());
  System.out.println("Status code: " + response.statusCode());
  System.out.println("Response body: " + response.body());
} catch (Exception e) {
  e.printStackTrace();
}
```

```cs [C#]
using System;
using System.Net.Http;
using System.Text;

var body = new StringContent("""
{}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/models/string:generateContent", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 Response" label="application/json">

```json
{
  "candidates": [
    {
      "content": {
        "role": "string",
        "parts": [
          {}
        ]
      },
      "finishReason": "string",
      "safetyRatings": [
        {}
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 0,
    "candidatesTokenCount": 0,
    "totalTokenCount": 0
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="gemini-text-chat"
  title="Gemini Text Chat"
  summary="Use the Gemini native chat format when you want a lightweight text-only payload without switching providers."
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | object | Yes | The current example sends an empty JSON object `{}`. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `candidates` | array | Candidate responses returned by the model. |
| `candidates[].content` | object | Generated content object. |
| `candidates[].content.role` | string | Role returned in the generated content block. |
| `candidates[].content.parts` | array | Returned content parts. |
| `candidates[].finishReason` | string | Finish reason string. |
| `candidates[].safetyRatings` | array | Safety evaluation results. |
| `usageMetadata` | object | Token accounting metadata. |
| `usageMetadata.promptTokenCount` | integer | Prompt token count. |
| `usageMetadata.candidatesTokenCount` | integer | Candidate output token count. |
| `usageMetadata.totalTokenCount` | integer | Total token count. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/models/string:generateContent" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{}'
```

```js [JavaScript]
const body = JSON.stringify({})

fetch("https://api.dgrid.ai/v1/models/string:generateContent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer "
  },
  body
})
```

```go [Go]
package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
  "strings"
)

func main() {
  url := "https://api.dgrid.ai/v1/models/string:generateContent"
  body := strings.NewReader(`{}`)
  req, _ := http.NewRequest("POST", url, body)
  req.Header.Add("Authorization", "Bearer ")
  req.Header.Add("Content-Type", "application/json")
  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))
}
```

```python [Python]
import requests

url = "https://api.dgrid.ai/v1/models/string:generateContent"
body = """{}"""
response = requests.request("POST", url, data = body, headers = {
  "Content-Type": "application/json", 
  "Authorization": "Bearer "
})

print(response.text)
```

```java [Java]
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;
import java.net.http.HttpRequest.BodyPublishers;

var body = BodyPublishers.ofString("""{}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/models/string:generateContent"))
  .header("Authorization", "Bearer ")
  .header("Content-Type", "application/json")
  .POST(body)
  .build();

try {
  HttpResponse<String> response = client.send(requestBuilder.build(), BodyHandlers.ofString());
  System.out.println("Status code: " + response.statusCode());
  System.out.println("Response body: " + response.body());
} catch (Exception e) {
  e.printStackTrace();
}
```

```cs [C#]
using System;
using System.Net.Http;
using System.Text;

var body = new StringContent("""
{}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/models/string:generateContent", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 Response" label="application/json">

```json
{
  "candidates": [
    {
      "content": {
        "role": "string",
        "parts": [
          {}
        ]
      },
      "finishReason": "string",
      "safetyRatings": [
        {}
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 0,
    "candidatesTokenCount": 0,
    "totalTokenCount": 0
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="chat-completions"
  title="Chat Completions"
  summary="Use the OpenAI-compatible Chat Completions format for standard multi-turn chat, structured output, and tool calling."
  method="POST"
  path="/v1/chat/completions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `model` | string | Yes | - | Target model ID. |
| `messages` | array | Yes | - | Conversation message list. |
| `messages[].role` | string | Yes | - | `system`, `user`, `assistant`, or `tool`. |
| `messages[].content` | string | Yes | - | Message content. |
| `messages[].name` | string | No | - | Optional participant name. |
| `messages[].tool_calls` | array | No | - | Tool invocation payloads. |
| `messages[].tool_call_id` | string | No | - | Tool call identifier. |
| `temperature` | number | No | `1` | Sampling temperature. |
| `top_p` | number | No | `1` | Nucleus sampling value. |
| `n` | integer | No | `1` | Number of choices to generate. |
| `stream` | boolean | No | `false` | Enable SSE streaming. |
| `max_tokens` | integer | No | - | Maximum token count. |
| `max_completion_tokens` | integer | No | - | Max completion-only tokens. |
| `presence_penalty` | number | No | `0` | Presence penalty. |
| `frequency_penalty` | number | No | `0` | Frequency penalty. |
| `logit_bias` | object | No | - | Token bias configuration. |
| `stop` | string or array | No | - | Stop sequence. |
| `tools` | array | No | - | Tool definitions. |
| `tool_choice` | string or object | No | `auto` | Tool selection behavior. |
| `response_format` | object | No | - | Response schema or JSON mode config. |
| `seed` | integer | No | - | Deterministic seed. |
| `user` | string | No | - | End-user identifier. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Completion identifier. |
| `object` | string | Always `chat.completion`. |
| `created` | integer | Creation timestamp. |
| `model` | string | Model that served the request. |
| `choices` | array | Returned choices. |
| `choices[].message` | object | Assistant message object. |
| `choices[].message.role` | string | Response role. |
| `choices[].message.content` | string | Response text. |
| `choices[].message.tool_calls` | array | Tool call payloads. |
| `choices[].finish_reason` | string | `stop`, `length`, `content_filter`, or `tool_calls`. |
| `usage` | object | Token usage breakdown. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/chat/completions" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4",
    "messages": [
      {
        "role": "system",
        "content": "string"
      }
    ]
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "string"
    }
  ]
})

fetch("https://api.dgrid.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer "
  },
  body
})
```

```go [Go]
package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
  "strings"
)

func main() {
  url := "https://api.dgrid.ai/v1/chat/completions"
  body := strings.NewReader(`{
    "model": "gpt-4",
    "messages": [
      {
        "role": "system",
        "content": "string"
      }
    ]
  }`)
  req, _ := http.NewRequest("POST", url, body)
  req.Header.Add("Authorization", "Bearer ")
  req.Header.Add("Content-Type", "application/json")
  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))
}
```

```python [Python]
import requests

url = "https://api.dgrid.ai/v1/chat/completions"
body = """{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "string"
    }
  ]
}"""
response = requests.request("POST", url, data = body, headers = {
  "Content-Type": "application/json", 
  "Authorization": "Bearer "
})

print(response.text)
```

```java [Java]
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;
import java.net.http.HttpRequest.BodyPublishers;

var body = BodyPublishers.ofString("""{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "string"
    }
  ]
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/chat/completions"))
  .header("Authorization", "Bearer ")
  .header("Content-Type", "application/json")
  .POST(body)
  .build();

try {
  HttpResponse<String> response = client.send(requestBuilder.build(), BodyHandlers.ofString());
  System.out.println("Status code: " + response.statusCode());
  System.out.println("Response body: " + response.body());
} catch (Exception e) {
  e.printStackTrace();
}
```

```cs [C#]
using System;
using System.Net.Http;
using System.Text;

var body = new StringContent("""
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "string"
    }
  ]
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/chat/completions", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 Response" label="application/json">

```json
{
  "id": "string",
  "object": "chat.completion",
  "created": 0,
  "model": "string",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "system",
        "content": "string",
        "name": "string",
        "tool_calls": [
          {
            "id": "string",
            "type": "function",
            "function": {
              "name": "string",
              "arguments": "string"
            }
          }
        ],
        "tool_call_id": "string",
        "reasoning_content": "string"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "text_tokens": 0,
      "audio_tokens": 0,
      "image_tokens": 0
    },
    "completion_tokens_details": {
      "text_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0
    }
  },
  "system_fingerprint": "string"
}
```

</ApiCodePanel>

<ApiCodePanel title="400 Response" label="application/json">

```json
{
  "error": {
    "message": "string",
    "type": "string",
    "param": "string",
    "code": "string"
  }
}
```

</ApiCodePanel>

<ApiCodePanel title="429 Response" label="application/json">

```json
{
  "error": {
    "message": "string",
    "type": "string",
    "param": "string",
    "code": "string"
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="responses"
  title="Responses"
  summary="Use the OpenAI Responses API when you want stateful flows, reasoning-specific options, or newer OpenAI tooling patterns."
  method="POST"
  path="/v1/responses"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Target model ID. |
| `body.model` | string | Yes | The current example only sends the `model` field in the request body. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Response identifier. |
| `object` | string | Always `response`. |
| `created_at` | integer | Creation timestamp. |
| `status` | string | Response lifecycle state. |
| `model` | string | Model used for inference. |
| `output` | array | Output items. |
| `output[].type` | string | Typically `message`. |
| `output[].role` | string | Output role. |
| `output[].content` | array | Output content blocks. |
| `output[].content[].type` | string | `output_text` for text payloads. |
| `output[].content[].text` | string | Output text. |
| `usage` | object | Token usage summary. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/responses" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string"
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "string"
})

fetch("https://api.dgrid.ai/v1/responses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer "
  },
  body
})
```

```go [Go]
package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
  "strings"
)

func main() {
  url := "https://api.dgrid.ai/v1/responses"
  body := strings.NewReader(`{
    "model": "string"
  }`)
  req, _ := http.NewRequest("POST", url, body)
  req.Header.Add("Authorization", "Bearer ")
  req.Header.Add("Content-Type", "application/json")
  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))
}
```

```python [Python]
import requests

url = "https://api.dgrid.ai/v1/responses"
body = """{
  "model": "string"
}"""
response = requests.request("POST", url, data = body, headers = {
  "Content-Type": "application/json", 
  "Authorization": "Bearer "
})

print(response.text)
```

```java [Java]
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;
import java.net.http.HttpRequest.BodyPublishers;

var body = BodyPublishers.ofString("""{
  "model": "string"
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/responses"))
  .header("Authorization", "Bearer ")
  .header("Content-Type", "application/json")
  .POST(body)
  .build();

try {
  HttpResponse<String> response = client.send(requestBuilder.build(), BodyHandlers.ofString());
  System.out.println("Status code: " + response.statusCode());
  System.out.println("Response body: " + response.body());
} catch (Exception e) {
  e.printStackTrace();
}
```

```cs [C#]
using System;
using System.Net.Http;
using System.Text;

var body = new StringContent("""
{
  "model": "string"
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/responses", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 Response" label="application/json">

```json
{
  "id": "string",
  "object": "response",
  "created_at": 0,
  "status": "completed",
  "model": "string",
  "output": [
    {
      "type": "string",
      "id": "string",
      "status": "string",
      "role": "string",
      "content": [
        {
          "type": "string",
          "text": "string"
        }
      ]
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "text_tokens": 0,
      "audio_tokens": 0,
      "image_tokens": 0
    },
    "completion_tokens_details": {
      "text_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0
    }
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
