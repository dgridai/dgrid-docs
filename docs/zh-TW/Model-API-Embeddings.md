---
title: 嵌入
aside: false
outline: false
---

# 嵌入

嵌入 API 同時支援 OpenAI 相容與 Gemini 原生向量生成，可用於檢索、分群與語意相似度應用。

<ApiEndpoint
  id="native-openai-format"
  title="原生 OpenAI 格式"
  summary="若您希望以簡單 SDK 方式整合，並取得最廣泛的生態相容性，請使用 OpenAI 相容 embeddings 端點。"
  method="POST"
  path="/v1/embeddings"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| `input` | string 或 array | 是 | - | 輸入文字或文字陣列。 |
| `model` | string | 是 | - | 嵌入模型 ID。 |
| `encoding_format` | string | 否 | `float` | `float` 或 `base64`。 |
| `dimensions` | integer | 否 | - | 輸出維度。 |
| `user` | string | 否 | - | 終端使用者識別。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `object` | string | 固定為 `list`。 |
| `data` | array | 嵌入結果陣列。 |
| `data[].object` | string | 固定為 `embedding`。 |
| `data[].embedding` | array | 嵌入向量。 |
| `data[].index` | integer | 向量索引。 |
| `model` | string | 實際使用的模型。 |
| `usage` | object | Token 使用摘要。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 回應" label="application/json">

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
  title="舊版 Engine Embeddings 格式"
  summary="目前範例使用 engine 路徑的舊版嵌入介面，並在請求體中傳送 model 與 input。"
  method="POST"
  path="/v1/engines/{engine}/embeddings"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 路徑參數

| 參數 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `engine` | string | 是 | engine ID，例如 `text-embedding-ada-002`。 |

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 請求體中的模型名稱。 |
| `input` | string | 是 | 要嵌入的輸入字串。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `object` | string | 最上層物件型別。 |
| `data` | array | 嵌入結果陣列。 |
| `data[].object` | string | 各項目的物件型別。 |
| `data[].embedding` | array | 嵌入向量值。 |
| `data[].index` | integer | 結果索引。 |
| `model` | string | 回應中的模型名稱。 |
| `usage` | object | Token 使用資訊。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 回應" label="application/json">

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
