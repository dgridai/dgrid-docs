---
title: 모더레이션
aside: false
outline: false
---

# 모더레이션

모더레이션 API는 사용자 입력이나 모델 출력 텍스트를 대상으로 OpenAI 호환 콘텐츠 안전 검사를 제공합니다.

<ApiEndpoint
  id="moderations"
  title="모더레이션"
  summary="혐오, 괴롭힘, 자해, 성적 콘텐츠, 폭력과 같은 주요 안전 카테고리를 기준으로 텍스트를 평가합니다."
  method="POST"
  path="/v1/moderations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `input` | string 또는 array | 예 | 검사할 텍스트 콘텐츠입니다. |
| `model` | string | 아니오 | `text-moderation-latest`, `text-moderation-stable` 등 모더레이션 모델입니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | 모더레이션 요청 ID입니다. |
| `model` | string | 사용된 모더레이션 모델입니다. |
| `results` | array | 모더레이션 결과 목록입니다. |
| `results[].flagged` | boolean | 입력이 플래그 처리되었는지 여부입니다. |
| `results[].categories` | object | 카테고리별 boolean 결과입니다. |
| `results[].categories.hate` | boolean | 혐오 발언 여부입니다. |
| `results[].categories.hate/threatening` | boolean | 위협성 혐오 발언 여부입니다. |
| `results[].categories.harassment` | boolean | 괴롭힘 여부입니다. |
| `results[].categories.self-harm` | boolean | 자해 여부입니다. |
| `results[].categories.sexual` | boolean | 성적 콘텐츠 여부입니다. |
| `results[].categories.violence` | boolean | 폭력 여부입니다. |
| `results[].category_scores` | object | 카테고리별 점수입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/moderations" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "input": "string"
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "input": "string"
})

fetch("https://api.dgrid.ai/v1/moderations", {
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
  url := "https://api.dgrid.ai/v1/moderations"
  body := strings.NewReader(`{
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

url = "https://api.dgrid.ai/v1/moderations"
body = """{
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
  "input": "string"
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/moderations"))
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
  "input": "string"
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/moderations", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 응답" label="application/json">

```json
{
  "id": "string",
  "model": "string",
  "results": [
    {
      "flagged": true,
      "categories": {},
      "category_scores": {}
    }
  ]
}]
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
