---
title: 模型列表
aside: false
outline: false
---

# 模型列表

模型列表 API 會回傳目前 DGrid API Key 可存取的模型清單。在發送聊天、補全或其他模型請求之前，可使用此端點探索可用的模型 ID。

<ApiEndpoint
  id="list-models"
  title="取得模型列表"
  summary="取得目前 API Key 可見的所有模型。回傳結果依據金鑰的存取群組進行權限過濾。"
  method="GET"
  path="/v1/models"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type=""
  response-code="200"
  response-type="application/json"
>

### 回應主體

| 欄位 | 類型 | 說明 |
| --- | --- | --- |
| `object` | string | 固定為 `list`。 |
| `success` | boolean | 請求是否成功。 |
| `data` | array | 目前 API Key 可見的模型物件列表。 |
| `data[].id` | string | 用於下游 API 請求的模型 ID（例如 `openai/gpt-5.4`）。 |
| `data[].object` | string | 固定為 `model`。 |
| `data[].created` | integer | Unix 時間戳（秒）。 |
| `data[].owned_by` | string | 擁有者識別碼。預設值：`custom`。 |
| `data[].supported_endpoint_types` | array | 該模型支援的端點類型。 |
| `message` | string | 當 `success` 為 `false` 時的錯誤描述。 |

### 支援的端點類型

| 值 | 說明 |
| --- | --- |
| `openai` | OpenAI 相容 API，例如 Chat Completions（`/v1/chat/completions`）。 |
| `openai-response` | OpenAI Responses API（`/v1/responses`）。 |
| `image-generation` | 圖像生成 API（`/v1/images/generations`）。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 回應" label="application/json">

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

<ApiCodePanel title="401 回應" label="application/json">

```json
{
  "data": [],
  "object": "list",
  "success": false,
  "message": "unauthorized"
}
```

</ApiCodePanel>

<ApiCodePanel title="403 回應" label="application/json">

```json
{
  "data": [],
  "object": "list",
  "success": false,
  "message": "Permission denied. This API key does not have access to the model list."
}
```

</ApiCodePanel>

<ApiCodePanel title="500 回應" label="application/json">

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

## 行為說明

- 回傳的列表僅反映目前 API Key 可存取的模型，而非平台的完整全域目錄。
- 回應回傳前，模型會依模型 ID 進行去重。
- 模型列表根據 API Key 所屬存取群組中可用的供應商與模型組裝而成。
- 若同一模型可透過多個供應商取得，回應中仍僅出現一次。
