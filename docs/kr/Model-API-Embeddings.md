---
title: 임베딩
aside: false
outline: false
---

# 임베딩

임베딩 API는 OpenAI 호환 벡터 생성과 Gemini 네이티브 임베딩 생성을 모두 지원하여 검색, 분류, 의미 기반 유사도 워크로드에 사용할 수 있습니다.

<ApiEndpoint
  id="native-openai-format"
  title="네이티브 OpenAI 형식"
  summary="간단한 SDK 통합과 넓은 생태계 호환성이 필요하다면 OpenAI 호환 embeddings 엔드포인트를 사용하세요."
  method="POST"
  path="/v1/embeddings"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `input` | string 또는 array | 예 | - | 입력 텍스트 또는 텍스트 배열입니다. |
| `model` | string | 예 | - | 임베딩 모델 ID입니다. |
| `encoding_format` | string | 아니오 | `float` | `float` 또는 `base64`. |
| `dimensions` | integer | 아니오 | - | 출력 벡터 차원 수입니다. |
| `user` | string | 아니오 | - | 최종 사용자 식별자입니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `object` | string | 항상 `list` 입니다. |
| `data` | array | 임베딩 결과 배열입니다. |
| `data[].object` | string | 항상 `embedding` 입니다. |
| `data[].embedding` | array | 임베딩 벡터입니다. |
| `data[].index` | integer | 임베딩 인덱스입니다. |
| `model` | string | 요청에 사용된 모델입니다. |
| `usage` | object | token 사용량 정보입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/embeddings" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-ada-002",
    "input": "string"
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "text-embedding-ada-002",
  "input": "string"
})

fetch("https://api.dgrid.ai/v1/embeddings", {
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
  url := "https://api.dgrid.ai/v1/embeddings"
  body := strings.NewReader(`{
    "model": "text-embedding-ada-002",
    "input": "string"
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

url = "https://api.dgrid.ai/v1/embeddings"
body = """{
  "model": "text-embedding-ada-002",
  "input": "string"
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
  "model": "text-embedding-ada-002",
  "input": "string"
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/embeddings"))
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
  "model": "text-embedding-ada-002",
  "input": "string"
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/embeddings", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 응답" label="application/json">

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [
        0
      ]
    }
  ],
  "model": "string",
  "usage": {
    "prompt_tokens": 0,
    "total_tokens": 0
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="native-gemini-format"
  title="레거시 Engine 임베딩 형식"
  summary="현재 예시는 model 필드와 input 문자열을 함께 보내는 engine 기반 레거시 임베딩 경로를 사용합니다."
  method="POST"
  path="/v1/engines/{engine}/embeddings"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Path 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `engine` | string | 예 | 엔진 ID, 예: `text-embedding-ada-002`. |

### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `model` | string | 예 | 요청 본문에 포함되는 모델 이름입니다. |
| `input` | string | 예 | 임베딩할 입력 문자열입니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `object` | string | 최상위 객체 타입입니다. |
| `data` | array | 임베딩 결과 배열입니다. |
| `data[].object` | string | 각 항목의 객체 타입입니다. |
| `data[].embedding` | array | 임베딩 벡터 값입니다. |
| `data[].index` | integer | 결과 인덱스입니다. |
| `model` | string | 응답에 포함된 모델 이름입니다. |
| `usage` | object | token 사용량 정보입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/engines/string/embeddings" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-ada-002",
    "input": "string"
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "text-embedding-ada-002",
  "input": "string"
})

fetch("https://api.dgrid.ai/v1/engines/string/embeddings", {
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
  url := "https://api.dgrid.ai/v1/engines/string/embeddings"
  body := strings.NewReader(`{
    "model": "text-embedding-ada-002",
    "input": "string"
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

url = "https://api.dgrid.ai/v1/engines/string/embeddings"
body = """{
  "model": "text-embedding-ada-002",
  "input": "string"
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
  "model": "text-embedding-ada-002",
  "input": "string"
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/engines/string/embeddings"))
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
  "model": "text-embedding-ada-002",
  "input": "string"
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/engines/string/embeddings", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 응답" label="application/json">

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [
        0
      ]
    }
  ],
  "model": "string",
  "usage": {
    "prompt_tokens": 0,
    "total_tokens": 0
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
