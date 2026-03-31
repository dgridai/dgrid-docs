---
title: Moderations
aside: false
outline: false
---

# Moderations

The Moderations API provides OpenAI-compatible content safety checks for user-generated or model-generated text.

<ApiEndpoint
  id="moderations"
  title="Moderations"
  summary="Evaluate text input against common safety categories such as hate, harassment, self-harm, sexual content, and violence."
  method="POST"
  path="/v1/moderations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | string or array | Yes | Text content to moderate. |
| `model` | string | No | Moderation model such as `text-moderation-latest` or `text-moderation-stable`. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Moderation request ID. |
| `model` | string | Model used for moderation. |
| `results` | array | Moderation result entries. |
| `results[].flagged` | boolean | Whether the input was flagged. |
| `results[].categories` | object | Boolean category decisions. |
| `results[].categories.hate` | boolean | Hate speech flag. |
| `results[].categories.hate/threatening` | boolean | Threatening hate speech flag. |
| `results[].categories.harassment` | boolean | Harassment flag. |
| `results[].categories.self-harm` | boolean | Self-harm flag. |
| `results[].categories.sexual` | boolean | Sexual content flag. |
| `results[].categories.violence` | boolean | Violence flag. |
| `results[].category_scores` | object | Continuous scores for each category. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 Response" label="application/json">

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
