---
title: 審查
aside: false
outline: false
---

# 審查

審查 API 提供 OpenAI 相容內容安全檢查，可用於使用者輸入或模型輸出的文字審查。

<ApiEndpoint
  id="moderations"
  title="內容審查"
  summary="針對仇恨、騷擾、自殘、性內容與暴力等常見安全類別評估文字輸入。"
  method="POST"
  path="/v1/moderations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `input` | string 或 array | 是 | 要審查的文字內容。 |
| `model` | string | 否 | 審查模型，例如 `text-moderation-latest` 或 `text-moderation-stable`。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `id` | string | 審查請求 ID。 |
| `model` | string | 實際使用的審查模型。 |
| `results` | array | 審查結果陣列。 |
| `results[].flagged` | boolean | 是否被標記。 |
| `results[].categories` | object | 各類別布林結果。 |
| `results[].categories.hate` | boolean | 仇恨言論。 |
| `results[].categories.hate/threatening` | boolean | 威脅性仇恨言論。 |
| `results[].categories.harassment` | boolean | 騷擾。 |
| `results[].categories.self-harm` | boolean | 自殘。 |
| `results[].categories.sexual` | boolean | 性內容。 |
| `results[].categories.violence` | boolean | 暴力。 |
| `results[].category_scores` | object | 各分類連續分數。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 回應" label="application/json">

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
