---
title: Embeddings
aside: false
outline: false
---

# Embeddings

The Embeddings API supports both OpenAI-compatible and Gemini-native vector generation for retrieval, clustering, and semantic similarity workloads.

<ApiEndpoint
  id="native-openai-format"
  title="Native OpenAI Format"
  summary="Use the OpenAI-compatible embeddings endpoint when you want simple SDK-based integration and broad ecosystem support."
  method="POST"
  path="/v1/embeddings"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `input` | string or array | Yes | - | Input text or text array. |
| `model` | string | Yes | - | Embedding model ID. |
| `encoding_format` | string | No | `float` | `float` or `base64`. |
| `dimensions` | integer | No | - | Output vector dimensions. |
| `user` | string | No | - | End-user identifier. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `object` | string | Always `list`. |
| `data` | array | Embedding results. |
| `data[].object` | string | Always `embedding`. |
| `data[].embedding` | array | Embedding vector. |
| `data[].index` | integer | Embedding index. |
| `model` | string | Model used for the request. |
| `usage` | object | Token usage summary. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 Response" label="application/json">

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
  title="Legacy Engine Embeddings Format"
  summary="Use the engine-based embeddings request shown in the code example when you need the legacy path format."
  method="POST"
  path="/v1/engines/{engine}/embeddings"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `engine` | string | Yes | Engine identifier used in the request path, such as `string`. |

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Embedding model ID used in the JSON body. |
| `input` | string | Yes | Input text to embed. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `object` | string | Always `list`. |
| `data` | array | Embedding results. |
| `data[].object` | string | Always `embedding`. |
| `data[].embedding` | array | Embedding vector. |
| `data[].index` | integer | Embedding index. |
| `model` | string | Model used for the request. |
| `usage` | object | Token usage summary. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 Response" label="application/json">

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
