---
title: Models
aside: false
outline: false
---

# Models

The Models API returns the list of models available to the current DGrid API key. Use it to discover accessible model IDs before sending chat, completion, or other model requests.

<ApiEndpoint
  id="list-models"
  title="List Models"
  summary="Retrieve all models visible to the current API key. The result is permission-aware and scoped to the key's assigned access group."
  method="GET"
  path="/v1/models"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type=""
  response-code="200"
  response-type="application/json"
>

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `object` | string | Always `list`. |
| `success` | boolean | Whether the request succeeded. |
| `data` | array | List of model objects visible to the current API key. |
| `data[].id` | string | Model ID used in downstream API requests (e.g. `openai/gpt-5.4`). |
| `data[].object` | string | Always `model`. |
| `data[].created` | integer | Unix timestamp in seconds. |
| `data[].owned_by` | string | Owner identifier. Default: `custom`. |
| `data[].supported_endpoint_types` | array | Endpoint types the model supports. |
| `message` | string | Error description when `success` is `false`. |

### Supported Endpoint Types

| Value | Description |
| --- | --- |
| `openai` | OpenAI-compatible APIs such as Chat Completions (`/v1/chat/completions`). |
| `openai-response` | OpenAI Responses API (`/v1/responses`). |
| `image-generation` | Image generation APIs (`/v1/images/generations`). |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 Response" label="application/json">

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

<ApiCodePanel title="401 Response" label="application/json">

```json
{
  "data": [],
  "object": "list",
  "success": false,
  "message": "unauthorized"
}
```

</ApiCodePanel>

<ApiCodePanel title="403 Response" label="application/json">

```json
{
  "data": [],
  "object": "list",
  "success": false,
  "message": "Permission denied. This API key does not have access to the model list."
}
```

</ApiCodePanel>

<ApiCodePanel title="500 Response" label="application/json">

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

## Behavior Notes

- The returned list reflects the models available to the current API key, not the platform's full global catalog.
- Models are deduplicated by model ID before the response is returned.
- The model list is assembled from the suppliers and models available to the API key's access group.
- If the same model is available through multiple suppliers, it still appears only once in the response.
