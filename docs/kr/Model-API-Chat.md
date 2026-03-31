---
title: 채팅
aside: false
outline: false
---

# 채팅

채팅 API는 Claude 호환 대화, Gemini 네이티브 멀티모달 메시징, OpenAI 호환 Chat Completions, 최신 Responses API를 포함합니다.

<ApiEndpoint
  id="native-claude-format"
  title="네이티브 Claude 형식"
  summary="Anthropic 호환 페이로드, 도구 호출, 시스템 프롬프트가 필요할 때 Claude Messages API를 사용합니다."
  method="POST"
  path="/v1/messages"
  auth="Authorization: Bearer <DGRID_API_KEY>; anthropic-version: 2023-06-01"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `model` | string | 예 | 모델 ID, 예: `claude-3-5-sonnet-20241022`. |
| `max_tokens` | integer | 예 | 최대 출력 token 수입니다. |
| `messages` | array | 예 | 대화 메시지 목록입니다. |
| `messages[].role` | string | 예 | `user` 또는 `assistant`. |
| `messages[].content` | string 또는 array | 예 | 메시지 내용 또는 콘텐츠 블록입니다. |
| `system` | string | 아니오 | 시스템 지시문입니다. |
| `temperature` | number | 아니오 | 샘플링 온도입니다. |
| `top_p` | number | 아니오 | Top-p 샘플링입니다. |
| `top_k` | integer | 아니오 | Top-k 샘플링입니다. |
| `stop_sequences` | array | 아니오 | 중지 시퀀스입니다. |
| `stream` | boolean | 아니오 | 스트리밍 활성화 여부입니다. |
| `tools` | array | 아니오 | 도구 정의입니다. |
| `tool_choice` | object | 아니오 | 도구 선택 전략입니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | 메시지 식별자입니다. |
| `type` | string | 항상 `message` 입니다. |
| `role` | string | 항상 `assistant` 입니다. |
| `content` | array | 반환된 콘텐츠 블록입니다. |
| `content[].type` | string | `text` 또는 `tool_use`. |
| `content[].text` | string | type이 text일 때의 텍스트입니다. |
| `model` | string | 응답을 생성한 모델입니다. |
| `stop_reason` | string | `end_turn`, `max_tokens`, `stop_sequence`, `tool_use`. |
| `usage` | object | token 사용량 정보입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 응답" label="application/json">

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
  title="Gemini 미디어 인식"
  summary="이미지, 오디오, 비디오, 혼합 미디어를 단일 요청으로 분석하려면 Gemini 네이티브 멀티모달 parts를 사용합니다."
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Path 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `model` | string | 예 | 모델 ID, 예: `gemini-1.5-pro`. |

### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `body` | object | 예 | 현재 예시는 빈 JSON 객체 `{}` 만 전송합니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `candidates` | array | 모델이 반환한 후보 응답 목록입니다. |
| `candidates[].content` | object | 후보 콘텐츠 객체입니다. |
| `candidates[].content.role` | string | 응답 콘텐츠 역할입니다. |
| `candidates[].content.parts` | array | 반환된 콘텐츠 파트 목록입니다. |
| `candidates[].finishReason` | string | 생성 종료 이유입니다. |
| `candidates[].safetyRatings` | array | 안전 평가 결과입니다. |
| `usageMetadata` | object | token 사용량 메타데이터입니다. |
| `usageMetadata.promptTokenCount` | integer | 입력 token 수입니다. |
| `usageMetadata.candidatesTokenCount` | integer | 출력 token 수입니다. |
| `usageMetadata.totalTokenCount` | integer | 총 token 수입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 응답" label="application/json">

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
  title="Gemini 텍스트 채팅"
  summary="텍스트 전용 대화가 필요하면서도 Gemini 네이티브 형식을 유지하고 싶다면 이 경량 채팅 형식을 사용하세요."
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `body` | object | 예 | 현재 예시는 빈 JSON 객체 `{}` 만 전송합니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `candidates` | array | 모델이 반환한 후보 응답 목록입니다. |
| `candidates[].content` | object | 후보 콘텐츠 객체입니다. |
| `candidates[].content.role` | string | 응답 콘텐츠 역할입니다. |
| `candidates[].content.parts` | array | 반환된 콘텐츠 파트 목록입니다. |
| `candidates[].finishReason` | string | 생성 종료 이유입니다. |
| `candidates[].safetyRatings` | array | 안전 평가 결과입니다. |
| `usageMetadata` | object | token 사용량 메타데이터입니다. |
| `usageMetadata.promptTokenCount` | integer | 입력 token 수입니다. |
| `usageMetadata.candidatesTokenCount` | integer | 출력 token 수입니다. |
| `usageMetadata.totalTokenCount` | integer | 총 token 수입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 응답" label="application/json">

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
  summary="표준 멀티턴 대화, 구조화된 출력, 도구 호출이 필요할 때 OpenAI 호환 Chat Completions 형식을 사용합니다."
  method="POST"
  path="/v1/chat/completions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `model` | string | 예 | - | 대상 모델 ID입니다. |
| `messages` | array | 예 | - | 현재 예시는 단일 메시지 객체 배열을 전송합니다. |
| `messages[].role` | string | 예 | - | 현재 예시는 `system` 역할을 사용합니다. |
| `messages[].content` | string | 예 | - | 현재 예시 메시지 텍스트입니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | completion 식별자입니다. |
| `object` | string | 항상 `chat.completion` 입니다. |
| `created` | integer | 생성 타임스탬프입니다. |
| `model` | string | 응답을 생성한 모델입니다. |
| `choices` | array | 반환된 choice 목록입니다. |
| `choices[].message` | object | 어시스턴트 메시지 객체입니다. |
| `choices[].message.role` | string | 응답 역할입니다. |
| `choices[].message.content` | string | 응답 텍스트입니다. |
| `choices[].message.tool_calls` | array | 도구 호출 데이터입니다. |
| `choices[].finish_reason` | string | `stop`, `length`, `content_filter`, `tool_calls`. |
| `usage` | object | token 사용량 정보입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 응답" label="application/json">

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

<ApiCodePanel title="400 응답" label="application/json">

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

<ApiCodePanel title="429 응답" label="application/json">

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
  summary="상태 기반 플로우, reasoning 옵션, 최신 OpenAI 도구 패턴이 필요할 때 Responses API를 사용하세요."
  method="POST"
  path="/v1/responses"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `model` | string | 예 | 대상 모델 ID입니다. |
| `body.model` | string | 예 | 현재 예시는 요청 본문에 `model` 필드만 전송합니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | 응답 식별자입니다. |
| `object` | string | 항상 `response` 입니다. |
| `created_at` | integer | 생성 타임스탬프입니다. |
| `status` | string | 응답 상태입니다. |
| `model` | string | 사용된 모델입니다. |
| `output` | array | 출력 항목 목록입니다. |
| `output[].type` | string | 보통 `message` 입니다. |
| `output[].role` | string | 출력 역할입니다. |
| `output[].content` | array | 출력 콘텐츠 블록입니다. |
| `output[].content[].type` | string | 텍스트 출력일 때 `output_text` 입니다. |
| `output[].content[].text` | string | 출력 텍스트입니다. |
| `usage` | object | token 사용량 요약입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 응답" label="application/json">

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
