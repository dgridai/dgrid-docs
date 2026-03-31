---
title: 이미지
aside: false
outline: false
---

# 이미지

이미지 API는 Gemini 네이티브 이미지 생성, OpenAI 호환 이미지 엔드포인트, Qwen 호환 이미지 워크플로를 포함합니다.

<ApiEndpoint
  id="gemini-native-format"
  title="Gemini 네이티브 형식"
  summary="공급자 네이티브 멀티모달 응답 제어가 필요하면 Gemini generateContent 인터페이스로 이미지를 생성하세요."
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
| `contents` | array | 예 | 입력 콘텐츠 배열입니다. |
| `contents[]` | object | 예 | 현재 예시는 빈 객체를 하나 포함한 배열을 전송합니다. |
| `generationConfig` | object | 예 | 이미지 생성 설정입니다. |
| `generationConfig.responseModalities` | array | 예 | 반환할 모달리티 목록입니다. |
| `generationConfig.imageConfig` | object | 예 | 이미지 설정입니다. |
| `generationConfig.imageConfig.aspectRatio` | string | 예 | 이미지 종횡비입니다. |
| `generationConfig.imageConfig.imageSize` | string | 예 | 이미지 크기입니다. |

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
curl -X POST "https://api.dgrid.ai/v1/models/string:generateContent/" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {}
    ],
    "generationConfig": {
      "responseModalities": [
        "string"
      ],
      "imageConfig": {
        "aspectRatio": "string",
        "imageSize": "string"
      }
    }
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "contents": [
    {}
  ],
  "generationConfig": {
    "responseModalities": [
      "string"
    ],
    "imageConfig": {
      "aspectRatio": "string",
      "imageSize": "string"
    }
  }
})

fetch("https://api.dgrid.ai/v1/models/string:generateContent/", {
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
  url := "https://api.dgrid.ai/v1/models/string:generateContent/"
  body := strings.NewReader(`{
    "contents": [
      {}
    ],
    "generationConfig": {
      "responseModalities": [
        "string"
      ],
      "imageConfig": {
        "aspectRatio": "string",
        "imageSize": "string"
      }
    }
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

url = "https://api.dgrid.ai/v1/models/string:generateContent/"
body = """{
  "contents": [
    {}
  ],
  "generationConfig": {
    "responseModalities": [
      "string"
    ],
    "imageConfig": {
      "aspectRatio": "string",
      "imageSize": "string"
    }
  }
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
  "contents": [
    {}
  ],
  "generationConfig": {
    "responseModalities": [
      "string"
    ],
    "imageConfig": {
      "aspectRatio": "string",
      "imageSize": "string"
    }
  }
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/models/string:generateContent/"))
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
  "contents": [
    {}
  ],
  "generationConfig": {
    "responseModalities": [
      "string"
    ],
    "imageConfig": {
      "aspectRatio": "string",
      "imageSize": "string"
    }
  }
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/models/string:generateContent/", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200" label="Gemini schema">

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
  id="openai-chat-format"
  title="OpenAI 채팅 형식"
  summary="OpenAI 호환 클라이언트에서 Gemini 기반 이미지 생성을 요청하려면 Chat Completions 엔드포인트를 사용할 수 있습니다."
  method="POST"
  path="/v1/chat/completions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `model` | string | 예 | Gemini 기반 모델 ID입니다. |
| `stream` | boolean | 예 | 현재 예시는 `true` 를 전송합니다. |
| `messages` | array | 예 | 채팅 메시지 배열입니다. |
| `messages[]` | object | 예 | 현재 예시는 빈 객체를 하나 포함합니다. |
| `contents` | array | 예 | 현재 예시는 추가 `contents` 배열도 함께 전송합니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | completion 식별자입니다. |
| `model` | string | 응답을 생성한 모델입니다. |
| `object` | string | 최상위 객체 타입입니다. |
| `created` | integer | 생성 타임스탬프입니다. |
| `choices` | array | 반환된 choice 목록입니다. |
| `choices[].index` | integer | choice 인덱스입니다. |
| `choices[].message` | object | 어시스턴트 메시지 객체입니다. |
| `choices[].message.role` | string | 응답 역할입니다. |
| `choices[].message.content` | string | 응답 콘텐츠입니다. |
| `choices[].finish_reason` | string | 종료 이유입니다. |
| `usage` | object | token 사용량 정보입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/chat/completions" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "stream": true,
    "messages": [
      {}
    ],
    "contents": [
      {}
    ]
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "string",
  "stream": true,
  "messages": [
    {}
  ],
  "contents": [
    {}
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
    "model": "string",
    "stream": true,
    "messages": [
      {}
    ],
    "contents": [
      {}
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
  "model": "string",
  "stream": true,
  "messages": [
    {}
  ],
  "contents": [
    {}
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
  "model": "string",
  "stream": true,
  "messages": [
    {}
  ],
  "contents": [
    {}
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
  "model": "string",
  "stream": true,
  "messages": [
    {}
  ],
  "contents": [
    {}
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

<ApiCodePanel title="200" label="OpenAI chat schema">

```json
{
  "id": "string",
  "model": "string",
  "object": "string",
  "created": 0,
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "string",
        "content": "string"
      },
      "finish_reason": "string"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="openai-image-generations"
  title="OpenAI 이미지 생성"
  summary="OpenAI 호환 images/generations 엔드포인트로 이미지를 생성합니다."
  method="POST"
  path="/v1/images/generations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `prompt` | string | 예 | - | 이미지 프롬프트입니다. |
| `model` | string | 아니오 | `dall-e-2` | `dall-e-2`, `dall-e-3` 등의 모델입니다. |
| `n` | integer | 아니오 | `1` | 생성할 이미지 수입니다. |
| `quality` | string | 아니오 | `standard` | `standard` 또는 `hd`. |
| `response_format` | string | 아니오 | `url` | `url` 또는 `b64_json`. |
| `size` | string | 아니오 | `1024x1024` | 출력 크기입니다. |
| `style` | string | 아니오 | `vivid` | `vivid` 또는 `natural`. |
| `user` | string | 아니오 | - | 최종 사용자 식별자입니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `created` | integer | 생성 타임스탬프입니다. |
| `data` | array | 생성된 이미지 목록입니다. |
| `data[].url` | string | URL 출력일 때의 이미지 링크입니다. |
| `data[].b64_json` | string | Base64 출력일 때의 이미지 데이터입니다. |
| `data[].revised_prompt` | string | 모델이 보정한 프롬프트입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/images/generations/" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "string"
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "prompt": "string"
})

fetch("https://api.dgrid.ai/v1/images/generations/", {
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
  url := "https://api.dgrid.ai/v1/images/generations/"
  body := strings.NewReader(`{
    "prompt": "string"
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

url = "https://api.dgrid.ai/v1/images/generations/"
body = """{
  "prompt": "string"
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
  "prompt": "string"
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/images/generations/"))
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
};
```

```cs [C#]
using System;
using System.Net.Http;
using System.Text;

var body = new StringContent("""
{
  "prompt": "string"
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/images/generations/", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 응답" label="application/json">

```json
{
  "created": 0,
  "data": [
    {
      "b64_json": "string",
      "url": "string"
    }
  ],
  "usage": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "input_tokens_details": {
      "text_tokens": 0,
      "image_tokens": 0
    }
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="openai-image-edits"
  title="OpenAI 이미지 편집"
  summary="선택적 mask와 함께 업로드한 이미지를 수정하려면 OpenAI 호환 이미지 편집 엔드포인트를 사용하세요."
  method="POST"
  path="/v1/images/edits"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="multipart/form-data"
  response-code="200"
  response-type="application/json"
>

### Form Data

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `image` | file | 예 | PNG 형식의 원본 이미지, 4 MB 미만. |
| `mask` | file | 아니오 | 선택적 마스크 이미지입니다. |
| `prompt` | string | 예 | 편집 지시문입니다. |
| `model` | string | 아니오 | 대상 이미지 모델입니다. |
| `n` | integer | 아니오 | 출력 이미지 수입니다. |
| `size` | string | 아니오 | 출력 크기입니다. |
| `response_format` | string | 아니오 | 응답 형식입니다. |
| `user` | string | 아니오 | 최종 사용자 식별자입니다. |

### 응답 본문

응답은 OpenAI 이미지 생성 스키마와 동일하며 `data[].url` 또는 `data[].b64_json` 을 반환합니다.

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/images/edits/" \
  -H "Authorization: Bearer " \
  -F image="cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png" \
  -F prompt="A cute baby sea otter wearing a beret."
```

```js [JavaScript]
const body = new FormData();
body.set(image, "cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png")
body.set(prompt, "A cute baby sea otter wearing a beret.")

fetch("https://api.dgrid.ai/v1/images/edits/", {
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
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
  "mime/multipart"
  "bytes"
)

func main() {
  url := "https://api.dgrid.ai/v1/images/edits/"
  body := new(bytes.Buffer)
  mp := multipart.NewWriter(payload)
  mp.WriteField("image", `cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png`)
  mp.WriteField("prompt", `A cute baby sea otter wearing a beret.`)
  req, _ := http.NewRequest("POST", url, body)
  req.Header.Add("Authorization", "Bearer ")
  req.Header.Add("Content-Type", "multipart/form-data")
  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))
}
```

```python [Python]
import requests

url = "https://api.dgrid.ai/v1/images/edits/"
body = {
  "image": "cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png",
  "prompt": "A cute baby sea otter wearing a beret."
}
response = requests.request("POST", url, data = body, headers = {
  "Content-Type": "multipart/form-data", 
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

var body = BodyPublishers.ofByteArray(new byte[] { ... });
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/images/edits/"))
  .header("Authorization", "Bearer ")
  .header("Content-Type", "multipart/form-data")
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

var body = new MultipartFormDataContent();

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/images/edits/", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200" label="OpenAI image schema">

```text
The response body matches the image generation response format and returns
one or more edited image results.
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="qwen-image-generations"
  title="Qwen 이미지 생성"
  summary="Qwen 호환 OpenAI 이미지 엔드포인트를 통해 `wanx-v1` 같은 모델에 생성 요청을 보낼 수 있습니다."
  method="POST"
  path="/v1/images/generations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `model` | string | 예 | 모델 ID, 예: `wanx-v1`. |
| `input` | object | 예 | 입력 객체입니다. |
| `input.messages` | array | 예 | 입력 메시지 배열입니다. |
| `input.messages[]` | object | 예 | 현재 예시는 빈 객체를 하나 포함합니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `created` | integer | 생성 타임스탬프입니다. |
| `data` | array | 생성된 이미지 결과 목록입니다. |
| `data[].url` | string | 이미지 URL입니다. |
| `data[].b64_json` | string | Base64 인코딩 이미지 데이터입니다. |
| `data[].revised_prompt` | string | 수정 또는 정규화된 프롬프트입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/images/generations" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "input": {
      "messages": [
        {}
      ]
    }
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
})

fetch("https://api.dgrid.ai/v1/images/generations", {
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
  url := "https://api.dgrid.ai/v1/images/generations"
  body := strings.NewReader(`{
    "model": "string",
    "input": {
      "messages": [
        {}
      ]
    }
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

url = "https://api.dgrid.ai/v1/images/generations"
body = """{
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
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
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/images/generations"))
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
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/images/generations", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200" label="OpenAI image schema">

```json
{
  "created": 0,
  "data": [
    {
      "url": "string",
      "b64_json": "string",
      "revised_prompt": "string"
    }
  ]
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="qwen-image-edits"
  title="Qwen 이미지 편집"
  summary="Qwen 호환 이미지 편집 플로우로 업로드한 이미지를 수정할 수 있습니다."
  method="POST"
  path="/v1/images/edits"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `model` | string | 예 | Qwen 이미지 모델 ID입니다. |
| `input` | object | 예 | 입력 객체입니다. |
| `input.messages` | array | 예 | 입력 메시지 배열입니다. |
| `input.messages[]` | object | 예 | 현재 예시는 빈 객체를 하나 포함합니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `created` | integer | 생성 타임스탬프입니다. |
| `data` | array | 생성된 이미지 결과 목록입니다. |
| `data[].url` | string | 이미지 URL입니다. |
| `data[].b64_json` | string | Base64 인코딩 이미지 데이터입니다. |
| `data[].revised_prompt` | string | 수정 또는 정규화된 프롬프트입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/images/edits" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "input": {
      "messages": [
        {}
      ]
    }
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
})

fetch("https://api.dgrid.ai/v1/images/edits", {
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
  url := "https://api.dgrid.ai/v1/images/edits"
  body := strings.NewReader(`{
    "model": "string",
    "input": {
      "messages": [
        {}
      ]
    }
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

url = "https://api.dgrid.ai/v1/images/edits"
body = """{
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
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
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/images/edits"))
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
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/images/edits", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200" label="OpenAI image schema">

```json
{
  "created": 0,
  "data": [
    {
      "url": "string",
      "b64_json": "string",
      "revised_prompt": "string"
    }
  ]
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
