---
title: 모델 목록
aside: false
outline: false
---

# 모델 목록

모델 목록 API는 현재 DGrid API 키로 접근 가능한 모델 목록을 반환합니다. 채팅, 컴플리션 또는 기타 모델 요청을 보내기 전에 사용 가능한 모델 ID를 확인할 수 있습니다.

<ApiEndpoint
  id="list-models"
  title="모델 목록 조회"
  summary="현재 API 키에 표시되는 모든 모델을 조회합니다. 결과는 키의 접근 그룹에 따라 권한 기반으로 필터링됩니다."
  method="GET"
  path="/v1/models"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type=""
  response-code="200"
  response-type="application/json"
>

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `object` | string | 항상 `list`. |
| `success` | boolean | 요청 성공 여부. |
| `data` | array | 현재 API 키에 표시되는 모델 객체 목록. |
| `data[].id` | string | 다운스트림 API 요청에 사용되는 모델 ID (예: `openai/gpt-5.4`). |
| `data[].object` | string | 항상 `model`. |
| `data[].created` | integer | Unix 타임스탬프 (초). |
| `data[].owned_by` | string | 소유자 식별자. 기본값: `custom`. |
| `data[].supported_endpoint_types` | array | 모델이 지원하는 엔드포인트 유형. |
| `message` | string | `success`가 `false`일 때의 오류 설명. |

### 지원되는 엔드포인트 유형

| 값 | 설명 |
| --- | --- |
| `openai` | Chat Completions 등 OpenAI 호환 API (`/v1/chat/completions`). |
| `openai-response` | OpenAI Responses API (`/v1/responses`). |
| `image-generation` | 이미지 생성 API (`/v1/images/generations`). |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl "https://api.dgrid.ai/v1/models" \
  -H "Authorization: Bearer "
```

```js [JavaScript]
fetch("https://api.dgrid.ai/v1/models", {
  method: "GET",
  headers: {
    "Authorization": "Bearer "
  }
})
```

```go [Go]
package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
)

func main() {
  url := "https://api.dgrid.ai/v1/models"
  req, _ := http.NewRequest("GET", url, nil)
  req.Header.Add("Authorization", "Bearer ")
  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))
}
```

```python [Python]
import requests

url = "https://api.dgrid.ai/v1/models"
response = requests.request("GET", url, headers = {
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

HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/models"))
  .header("Authorization", "Bearer ")
  .GET()
  .build();

try {
  HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
  System.out.println("Status code: " + response.statusCode());
  System.out.println("Response body: " + response.body());
} catch (Exception e) {
  e.printStackTrace();
}
```

```cs [C#]
using System;
using System.Net.Http;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.GetAsync("https://api.dgrid.ai/v1/models");
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 응답" label="application/json">

```json
{
  "object": "list",
  "success": true,
  "data": [
    {
      "id": "openai/gpt-5.4",
      "object": "model",
      "created": 1626777600,
      "owned_by": "custom",
      "supported_endpoint_types": [
        "openai",
        "openai-response"
      ]
    }
  ]
}
```

</ApiCodePanel>

<ApiCodePanel title="401 응답" label="application/json">

```json
{
  "data": [],
  "object": "list",
  "success": false,
  "message": "unauthorized"
}
```

</ApiCodePanel>

<ApiCodePanel title="403 응답" label="application/json">

```json
{
  "data": [],
  "object": "list",
  "success": false,
  "message": "Permission denied. This API key does not have access to the model list."
}
```

</ApiCodePanel>

<ApiCodePanel title="500 응답" label="application/json">

```json
{
  "data": [],
  "object": "list",
  "success": false,
  "message": "Internal server error while building the model list."
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

## 동작 참고 사항

- 반환되는 목록은 현재 API 키로 접근 가능한 모델만 포함하며, 플랫폼의 전체 글로벌 카탈로그가 아닙니다.
- 응답 반환 전 모델 ID 기준으로 중복이 제거됩니다.
- 모델 목록은 API 키의 접근 그룹에서 사용 가능한 공급자 및 모델을 기반으로 구성됩니다.
- 동일한 모델이 여러 공급자를 통해 제공되더라도 응답에는 한 번만 표시됩니다.
