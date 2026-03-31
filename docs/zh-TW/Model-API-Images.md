---
title: 圖像
aside: false
outline: false
---

# 圖像

圖像 API 涵蓋 Gemini 原生圖像生成、OpenAI 相容圖像端點，以及 Qwen 相容圖像工作流。

<ApiEndpoint
  id="gemini-native-format"
  title="Gemini 原生格式"
  summary="若您需要供應商原生多模態回應控制，請透過 Gemini generateContent 介面生成圖像。"
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `contents` | array | 是 | 輸入內容陣列。 |
| `contents[]` | object | 是 | 目前範例會傳送一個只包含空物件的陣列項目。 |
| `generationConfig` | object | 是 | 圖像生成設定。 |
| `generationConfig.responseModalities` | array | 是 | 要返回的模態清單。 |
| `generationConfig.imageConfig` | object | 是 | 圖像設定。 |
| `generationConfig.imageConfig.aspectRatio` | string | 是 | 圖像長寬比。 |
| `generationConfig.imageConfig.imageSize` | string | 是 | 圖像尺寸。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `candidates` | array | 模型返回的候選回應。 |
| `candidates[].content` | object | 候選內容物件。 |
| `candidates[].content.role` | string | 回應內容角色。 |
| `candidates[].content.parts` | array | 返回內容片段陣列。 |
| `candidates[].finishReason` | string | 生成結束原因。 |
| `candidates[].safetyRatings` | array | 安全評分結果。 |
| `usageMetadata` | object | Token 使用量中繼資料。 |
| `usageMetadata.promptTokenCount` | integer | 輸入 token 數。 |
| `usageMetadata.candidatesTokenCount` | integer | 輸出 token 數。 |
| `usageMetadata.totalTokenCount` | integer | 總 token 數。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/models/string:generateContent/" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {}
    ],
    "generationConfig": {
      "responseModalities": [
        "string"
      ],
      "imageConfig": {
        "aspectRatio": "string",
        "imageSize": "string"
      }
    }
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "contents": [
    {}
  ],
  "generationConfig": {
    "responseModalities": [
      "string"
    ],
    "imageConfig": {
      "aspectRatio": "string",
      "imageSize": "string"
    }
  }
})

fetch("https://api.dgrid.ai/v1/models/string:generateContent/", {
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
  url := "https://api.dgrid.ai/v1/models/string:generateContent/"
  body := strings.NewReader(`{
    "contents": [
      {}
    ],
    "generationConfig": {
      "responseModalities": [
        "string"
      ],
      "imageConfig": {
        "aspectRatio": "string",
        "imageSize": "string"
      }
    }
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

url = "https://api.dgrid.ai/v1/models/string:generateContent/"
body = """{
  "contents": [
    {}
  ],
  "generationConfig": {
    "responseModalities": [
      "string"
    ],
    "imageConfig": {
      "aspectRatio": "string",
      "imageSize": "string"
    }
  }
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
  "contents": [
    {}
  ],
  "generationConfig": {
    "responseModalities": [
      "string"
    ],
    "imageConfig": {
      "aspectRatio": "string",
      "imageSize": "string"
    }
  }
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/models/string:generateContent/"))
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
  "contents": [
    {}
  ],
  "generationConfig": {
    "responseModalities": [
      "string"
    ],
    "imageConfig": {
      "aspectRatio": "string",
      "imageSize": "string"
    }
  }
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/models/string:generateContent/", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200" label="Gemini schema">

```json
{
  "candidates": [
    {
      "content": {
        "role": "string",
        "parts": [
          {}
        ]
      },
      "finishReason": "string",
      "safetyRatings": [
        {}
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 0,
    "candidatesTokenCount": 0,
    "totalTokenCount": 0
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="openai-chat-format"
  title="OpenAI 聊天格式"
  summary="若您希望以 OpenAI 相容客戶端請求 Gemini 圖像生成，可使用 Chat Completions 介面。"
  method="POST"
  path="/v1/chat/completions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `model` | string | 是 | Gemini 支援模型 ID。 |
| `stream` | boolean | 是 | 目前範例會傳送 `true`。 |
| `messages` | array | 是 | 聊天訊息陣列。 |
| `messages[]` | object | 是 | 目前範例包含一個空物件。 |
| `contents` | array | 是 | 目前範例另外傳送 `contents` 陣列。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `id` | string | Completion 識別碼。 |
| `model` | string | 產生回應的模型。 |
| `object` | string | 最上層物件型別。 |
| `created` | integer | 建立時間戳。 |
| `choices` | array | 返回的 choices。 |
| `choices[].index` | integer | Choice 索引。 |
| `choices[].message` | object | 助手訊息物件。 |
| `choices[].message.role` | string | 回應角色。 |
| `choices[].message.content` | string | 回應內容。 |
| `choices[].finish_reason` | string | 結束原因。 |
| `usage` | object | Token 使用統計。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/chat/completions" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "stream": true,
    "messages": [
      {}
    ],
    "contents": [
      {}
    ]
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "string",
  "stream": true,
  "messages": [
    {}
  ],
  "contents": [
    {}
  ]
})

fetch("https://api.dgrid.ai/v1/chat/completions", {
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
  url := "https://api.dgrid.ai/v1/chat/completions"
  body := strings.NewReader(`{
    "model": "string",
    "stream": true,
    "messages": [
      {}
    ],
    "contents": [
      {}
    ]
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

url = "https://api.dgrid.ai/v1/chat/completions"
body = """{
  "model": "string",
  "stream": true,
  "messages": [
    {}
  ],
  "contents": [
    {}
  ]
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
  "stream": true,
  "messages": [
    {}
  ],
  "contents": [
    {}
  ]
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/chat/completions"))
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
  "stream": true,
  "messages": [
    {}
  ],
  "contents": [
    {}
  ]
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/chat/completions", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200" label="OpenAI chat schema">

```json
{
  "id": "string",
  "model": "string",
  "object": "string",
  "created": 0,
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "string",
        "content": "string"
      },
      "finish_reason": "string"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="openai-image-generations"
  title="OpenAI 圖像生成"
  summary="透過 OpenAI 相容 images/generations 端點生成圖像。"
  method="POST"
  path="/v1/images/generations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| `prompt` | string | 是 | - | 圖像描述。 |
| `model` | string | 否 | `dall-e-2` | 模型，例如 `dall-e-2` 或 `dall-e-3`。 |
| `n` | integer | 否 | `1` | 生成數量。 |
| `quality` | string | 否 | `standard` | `standard` 或 `hd`。 |
| `response_format` | string | 否 | `url` | `url` 或 `b64_json`。 |
| `size` | string | 否 | `1024x1024` | 輸出尺寸。 |
| `style` | string | 否 | `vivid` | `vivid` 或 `natural`。 |
| `user` | string | 否 | - | 終端使用者識別。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `created` | integer | 建立時間戳。 |
| `data` | array | 生成圖像列表。 |
| `data[].url` | string | URL 形式輸出時的圖像連結。 |
| `data[].b64_json` | string | Base64 形式輸出時的圖像內容。 |
| `data[].revised_prompt` | string | 模型調整後的提示文字。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/images/generations/" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "string"
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "prompt": "string"
})

fetch("https://api.dgrid.ai/v1/images/generations/", {
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
  url := "https://api.dgrid.ai/v1/images/generations/"
  body := strings.NewReader(`{
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

url = "https://api.dgrid.ai/v1/images/generations/"
body = """{
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
  "prompt": "string"
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/images/generations/"))
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
};
```

```cs [C#]
using System;
using System.Net.Http;
using System.Text;

var body = new StringContent("""
{
  "prompt": "string"
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/images/generations/", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 回應" label="application/json">

```json
{
  "created": 0,
  "data": [
    {
      "b64_json": "string",
      "url": "string"
    }
  ],
  "usage": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "input_tokens_details": {
      "text_tokens": 0,
      "image_tokens": 0
    }
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="openai-image-edits"
  title="OpenAI 圖像編輯"
  summary="透過 OpenAI 相容圖像編輯端點，搭配可選 mask 修改上傳圖像。"
  method="POST"
  path="/v1/images/edits"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="multipart/form-data"
  response-code="200"
  response-type="application/json"
>

### 表單欄位

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `image` | file | 是 | 原始圖像，PNG 格式且小於 4 MB。 |
| `mask` | file | 否 | 可選遮罩圖像。 |
| `prompt` | string | 是 | 編輯指令。 |
| `model` | string | 否 | 目標模型。 |
| `n` | integer | 否 | 輸出數量。 |
| `size` | string | 否 | 輸出尺寸。 |
| `response_format` | string | 否 | 回應格式。 |
| `user` | string | 否 | 終端使用者識別。 |

### 回應體

回應遵循 OpenAI 圖像生成 schema，包含 `data[].url` 或 `data[].b64_json`。

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/images/edits/" \
  -H "Authorization: Bearer " \
  -F image="cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png" \
  -F prompt="A cute baby sea otter wearing a beret."
```

```js [JavaScript]
const body = new FormData();
body.set(image, "cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png")
body.set(prompt, "A cute baby sea otter wearing a beret.")

fetch("https://api.dgrid.ai/v1/images/edits/", {
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
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
  "mime/multipart"
  "bytes"
)

func main() {
  url := "https://api.dgrid.ai/v1/images/edits/"
  body := new(bytes.Buffer)
  mp := multipart.NewWriter(payload)
  mp.WriteField("image", `cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png`)
  mp.WriteField("prompt", `A cute baby sea otter wearing a beret.`)
  req, _ := http.NewRequest("POST", url, body)
  req.Header.Add("Authorization", "Bearer ")
  req.Header.Add("Content-Type", "multipart/form-data")
  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))
}
```

```python [Python]
import requests

url = "https://api.dgrid.ai/v1/images/edits/"
body = {
  "image": "cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png",
  "prompt": "A cute baby sea otter wearing a beret."
}
response = requests.request("POST", url, data = body, headers = {
  "Content-Type": "multipart/form-data", 
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

var body = BodyPublishers.ofByteArray(new byte[] { ... });
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/images/edits/"))
  .header("Authorization", "Bearer ")
  .header("Content-Type", "multipart/form-data")
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

var body = new MultipartFormDataContent();

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/images/edits/", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200" label="OpenAI image schema">

```text
The response body matches the image generation response format and returns
one or more edited image results.
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="qwen-image-generations"
  title="Qwen 圖像生成"
  summary="透過 Qwen 相容 OpenAI 圖像端點，對 `wanx-v1` 等模型發送生成請求。"
  method="POST"
  path="/v1/images/generations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 模型 ID，例如 `wanx-v1`。 |
| `input` | object | 是 | 輸入物件。 |
| `input.messages` | array | 是 | 輸入訊息陣列。 |
| `input.messages[]` | object | 是 | 目前範例包含一個空物件。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `created` | integer | 建立時間戳。 |
| `data` | array | 生成的圖像結果陣列。 |
| `data[].url` | string | 圖像 URL。 |
| `data[].b64_json` | string | Base64 編碼圖像資料。 |
| `data[].revised_prompt` | string | 修訂或正規化後的提示。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/images/generations" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "input": {
      "messages": [
        {}
      ]
    }
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
})

fetch("https://api.dgrid.ai/v1/images/generations", {
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
  url := "https://api.dgrid.ai/v1/images/generations"
  body := strings.NewReader(`{
    "model": "string",
    "input": {
      "messages": [
        {}
      ]
    }
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

url = "https://api.dgrid.ai/v1/images/generations"
body = """{
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
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
  "input": {
    "messages": [
      {}
    ]
  }
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/images/generations"))
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
  "input": {
    "messages": [
      {}
    ]
  }
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/images/generations", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200" label="OpenAI image schema">

```json
{
  "created": 0,
  "data": [
    {
      "url": "string",
      "b64_json": "string",
      "revised_prompt": "string"
    }
  ]
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="qwen-image-edits"
  title="Qwen 圖像編輯"
  summary="透過 Qwen 相容圖像編輯流程修改已上傳圖像。"
  method="POST"
  path="/v1/images/edits"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `model` | string | 是 | Qwen 圖像模型 ID。 |
| `input` | object | 是 | 輸入物件。 |
| `input.messages` | array | 是 | 輸入訊息陣列。 |
| `input.messages[]` | object | 是 | 目前範例包含一個空物件。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `created` | integer | 建立時間戳。 |
| `data` | array | 生成的圖像結果陣列。 |
| `data[].url` | string | 圖像 URL。 |
| `data[].b64_json` | string | Base64 編碼圖像資料。 |
| `data[].revised_prompt` | string | 修訂或正規化後的提示。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/images/edits" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "input": {
      "messages": [
        {}
      ]
    }
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
})

fetch("https://api.dgrid.ai/v1/images/edits", {
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
  url := "https://api.dgrid.ai/v1/images/edits"
  body := strings.NewReader(`{
    "model": "string",
    "input": {
      "messages": [
        {}
      ]
    }
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

url = "https://api.dgrid.ai/v1/images/edits"
body = """{
  "model": "string",
  "input": {
    "messages": [
      {}
    ]
  }
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
  "input": {
    "messages": [
      {}
    ]
  }
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/images/edits"))
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
  "input": {
    "messages": [
      {}
    ]
  }
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/images/edits", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200" label="OpenAI image schema">

```json
{
  "created": 0,
  "data": [
    {
      "url": "string",
      "b64_json": "string",
      "revised_prompt": "string"
    }
  ]
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
