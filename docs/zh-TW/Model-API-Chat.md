---
title: 聊天
aside: false
outline: false
---

# 聊天

聊天 API 涵蓋 Claude 相容對話、Gemini 原生多模態訊息、OpenAI 相容 Chat Completions，以及較新的 Responses API。

<ApiEndpoint
  id="native-claude-format"
  title="原生 Claude 格式"
  summary="若您需要 Anthropic 相容載荷、工具調用或系統提示，請使用 Claude Messages API。"
  method="POST"
  path="/v1/messages"
  auth="Authorization: Bearer <DGRID_API_KEY>; anthropic-version: 2023-06-01"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 模型 ID，例如 `claude-3-5-sonnet-20241022`。 |
| `max_tokens` | integer | 是 | 最大輸出 token 數。 |
| `messages` | array | 是 | 對話訊息列表。 |
| `messages[].role` | string | 是 | `user` 或 `assistant`。 |
| `messages[].content` | string 或 array | 是 | 訊息內容或內容區塊。 |
| `system` | string | 否 | 系統指令。 |
| `temperature` | number | 否 | 採樣溫度。 |
| `top_p` | number | 否 | Top-p 採樣。 |
| `top_k` | integer | 否 | Top-k 採樣。 |
| `stop_sequences` | array | 否 | 停止序列。 |
| `stream` | boolean | 否 | 是否啟用串流。 |
| `tools` | array | 否 | 工具定義。 |
| `tool_choice` | object | 否 | 工具選擇策略。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `id` | string | 訊息識別碼。 |
| `type` | string | 固定為 `message`。 |
| `role` | string | 固定為 `assistant`。 |
| `content` | array | 返回內容區塊。 |
| `content[].type` | string | `text` 或 `tool_use`。 |
| `content[].text` | string | 當型別為 text 時的文字內容。 |
| `model` | string | 產生回應的模型。 |
| `stop_reason` | string | `end_turn`、`max_tokens`、`stop_sequence` 或 `tool_use`。 |
| `usage` | object | Token 使用統計。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 回應" label="application/json">

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
  title="Gemini 媒體識別"
  summary="若您要在單一請求中分析圖像、音訊、影片或混合媒體，請使用 Gemini 原生多模態 parts。"
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 路徑參數

| 參數 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 模型 ID，例如 `gemini-1.5-pro`。 |

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `body` | object | 是 | 目前範例只傳送空的 JSON 物件 `{}`。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `candidates` | array | 模型返回的候選回應。 |
| `candidates[].content` | object | 候選內容物件。 |
| `candidates[].content.role` | string | 回應內容角色。 |
| `candidates[].content.parts` | array | 返回內容片段陣列。 |
| `candidates[].finishReason` | string | 生成結束原因。 |
| `candidates[].safetyRatings` | array | 安全評分結果。 |
| `usageMetadata` | object | Token 使用量中繼資料。 |
| `usageMetadata.promptTokenCount` | integer | 輸入 token 數。 |
| `usageMetadata.candidatesTokenCount` | integer | 輸出 token 數。 |
| `usageMetadata.totalTokenCount` | integer | 總 token 數。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 回應" label="application/json">

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
  title="Gemini 文字聊天"
  summary="若您只需要純文字對話，又希望保留 Gemini 原生格式，可使用此輕量聊天方式。"
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `body` | object | 是 | 目前範例只傳送空的 JSON 物件 `{}`。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `candidates` | array | 模型返回的候選回應。 |
| `candidates[].content` | object | 候選內容物件。 |
| `candidates[].content.role` | string | 回應內容角色。 |
| `candidates[].content.parts` | array | 返回內容片段陣列。 |
| `candidates[].finishReason` | string | 生成結束原因。 |
| `candidates[].safetyRatings` | array | 安全評分結果。 |
| `usageMetadata` | object | Token 使用量中繼資料。 |
| `usageMetadata.promptTokenCount` | integer | 輸入 token 數。 |
| `usageMetadata.candidatesTokenCount` | integer | 輸出 token 數。 |
| `usageMetadata.totalTokenCount` | integer | 總 token 數。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 回應" label="application/json">

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
  summary="若您需要標準多輪對話、結構化輸出或工具調用，請使用 OpenAI 相容 Chat Completions 格式。"
  method="POST"
  path="/v1/chat/completions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| `model` | string | 是 | - | 目標模型 ID。 |
| `messages` | array | 是 | - | 目前範例會傳送只包含一個訊息物件的陣列。 |
| `messages[].role` | string | 是 | - | 目前範例使用 `system` 角色。 |
| `messages[].content` | string | 是 | - | 目前範例中的訊息文字。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `id` | string | Completion 識別碼。 |
| `object` | string | 固定為 `chat.completion`。 |
| `created` | integer | 建立時間戳。 |
| `model` | string | 提供推理的模型。 |
| `choices` | array | 返回的 choices。 |
| `choices[].message` | object | 助手訊息物件。 |
| `choices[].message.role` | string | 回應角色。 |
| `choices[].message.content` | string | 回應文字。 |
| `choices[].message.tool_calls` | array | 工具調用資料。 |
| `choices[].finish_reason` | string | `stop`、`length`、`content_filter` 或 `tool_calls`。 |
| `usage` | object | Token 使用統計。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 回應" label="application/json">

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

<ApiCodePanel title="400 回應" label="application/json">

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

<ApiCodePanel title="429 回應" label="application/json">

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
  summary="若您需要狀態化流程、推理參數或新版 OpenAI 工具模式，建議使用 Responses API。"
  method="POST"
  path="/v1/responses"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 目標模型 ID。 |
| `body.model` | string | 是 | 目前範例在請求體中只傳送 `model` 欄位。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `id` | string | 回應識別碼。 |
| `object` | string | 固定為 `response`。 |
| `created_at` | integer | 建立時間戳。 |
| `status` | string | 回應狀態。 |
| `model` | string | 使用的模型。 |
| `output` | array | 輸出項目陣列。 |
| `output[].type` | string | 一般為 `message`。 |
| `output[].role` | string | 輸出角色。 |
| `output[].content` | array | 輸出內容區塊。 |
| `output[].content[].type` | string | 文字輸出時為 `output_text`。 |
| `output[].content[].text` | string | 文字內容。 |
| `usage` | object | Token 使用摘要。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 回應" label="application/json">

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
