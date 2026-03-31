---
title: 컴플리션
aside: false
outline: false
---

# 컴플리션

Completions API는 프롬프트 기반 생성과 레거시 통합에 적합한 전통적인 OpenAI 호환 텍스트 completion 워크플로를 제공합니다.

<ApiEndpoint
  id="native-openai-format"
  title="네이티브 OpenAI 형식"
  summary="멀티턴 chat 스키마가 필요하지 않고 단일 프롬프트 기반 텍스트 생성만 필요할 때 completions 엔드포인트를 사용합니다."
  method="POST"
  path="/v1/completions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `model` | string | 예 | - | 대상 모델 ID입니다. |
| `prompt` | string 또는 array | 예 | - | 프롬프트 텍스트 또는 프롬프트 배열입니다. |
| `suffix` | string | 아니오 | - | 삽입형 워크플로용 suffix 텍스트입니다. |
| `max_tokens` | integer | 아니오 | `16` | 최대 completion 길이입니다. |
| `temperature` | number | 아니오 | `1` | 샘플링 온도입니다. |
| `top_p` | number | 아니오 | `1` | nucleus sampling 값입니다. |
| `n` | integer | 아니오 | `1` | 반환할 completion 수입니다. |
| `stream` | boolean | 아니오 | `false` | 스트리밍 여부입니다. |
| `logprobs` | integer | 아니오 | - | 반환할 log probability 수입니다. |
| `echo` | boolean | 아니오 | `false` | 프롬프트를 그대로 포함할지 여부입니다. |
| `stop` | string 또는 array | 아니오 | - | 중지 시퀀스입니다. |
| `presence_penalty` | number | 아니오 | `0` | presence penalty 입니다. |
| `frequency_penalty` | number | 아니오 | `0` | frequency penalty 입니다. |
| `best_of` | integer | 아니오 | `1` | 서버 측 rerank 후보 수입니다. |
| `logit_bias` | object | 아니오 | - | token bias 맵입니다. |
| `user` | string | 아니오 | - | 최종 사용자 식별자입니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | completion 식별자입니다. |
| `object` | string | 항상 `text_completion` 입니다. |
| `created` | integer | 생성 타임스탬프입니다. |
| `model` | string | 생성에 사용된 모델입니다. |
| `choices` | array | completion 결과 목록입니다. |
| `choices[].text` | string | 생성된 텍스트입니다. |
| `choices[].index` | integer | choice 인덱스입니다. |
| `choices[].logprobs` | object 또는 null | 요청한 경우 log probability 정보입니다. |
| `choices[].finish_reason` | string | 종료 이유입니다. |
| `usage` | object | token 사용량 정보입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/completions" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "prompt": "string"
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "string",
  "prompt": "string"
})

fetch("https://api.dgrid.ai/v1/completions", {
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
  url := "https://api.dgrid.ai/v1/completions"
  body := strings.NewReader(`{
    "model": "string",
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

url = "https://api.dgrid.ai/v1/completions"
body = """{
  "model": "string",
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
  "model": "string",
  "prompt": "string"
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/completions"))
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
  "prompt": "string"
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/completions", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 응답" label="application/json">

```json
{
  "id": "string",
  "object": "text_completion",
  "created": 0,
  "model": "string",
  "choices": [
    {
      "text": "string",
      "index": 0,
      "finish_reason": "string"
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
