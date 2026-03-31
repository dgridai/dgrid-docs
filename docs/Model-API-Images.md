---
title: Images
aside: false
outline: false
---

# Images

The Images API covers Gemini-native image generation, OpenAI-compatible image endpoints, and Qwen-compatible image workflows exposed through the DGrid API gateway.

<ApiEndpoint
  id="gemini-native-format"
  title="Gemini Native Format"
  summary="Generate images through the Gemini native generateContent interface when you need provider-specific multimodal response controls."
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contents` | array | Yes | Input content array. |
| `contents[]` | object | Yes | The sample uses an empty object item inside `contents`. |
| `generationConfig` | object | Yes | Generation configuration object. |
| `generationConfig.responseModalities` | array | Yes | Requested modalities array. |
| `generationConfig.imageConfig` | object | Yes | Image configuration object. |
| `generationConfig.imageConfig.aspectRatio` | string | Yes | Aspect ratio value used in the sample. |
| `generationConfig.imageConfig.imageSize` | string | Yes | Image size value used in the sample. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `candidates` | array | Candidate responses returned by the model. |
| `candidates[].content` | object | Generated content object. |
| `candidates[].content.role` | string | Role returned in the generated content block. |
| `candidates[].content.parts` | array | Returned content parts. |
| `candidates[].finishReason` | string | Finish reason string. |
| `candidates[].safetyRatings` | array | Safety evaluation results. |
| `usageMetadata` | object | Token usage metadata. |
| `usageMetadata.promptTokenCount` | integer | Prompt token count. |
| `usageMetadata.candidatesTokenCount` | integer | Candidate output token count. |
| `usageMetadata.totalTokenCount` | integer | Total token count. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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
  title="OpenAI Chat Format"
  summary="Use the Chat Completions endpoint when you want to request Gemini-backed image generation from an OpenAI-compatible client."
  method="POST"
  path="/v1/chat/completions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Model identifier sent in the request body. |
| `stream` | boolean | Yes | Streaming flag included in the sample request. |
| `messages` | array | Yes | Messages array included in the request body. |
| `messages[]` | object | Yes | Message objects inside `messages`. |
| `contents` | array | Yes | Additional `contents` array sent in the sample request. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Chat completion identifier. |
| `model` | string | Model used for the request. |
| `object` | string | Response object type. |
| `created` | integer | Creation timestamp. |
| `choices` | array | Returned choice entries. |
| `choices[].index` | integer | Choice index. |
| `choices[].message` | object | Assistant message object. |
| `choices[].message.role` | string | Message role. |
| `choices[].message.content` | string | Message content. |
| `choices[].finish_reason` | string | Finish reason. |
| `usage` | object | Token usage summary. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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
  title="OpenAI Image Generations"
  summary="Generate images with the OpenAI-compatible image creation endpoint."
  method="POST"
  path="/v1/images/generations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `prompt` | string | Yes | - | Image prompt. |
| `model` | string | No | `dall-e-2` | Model such as `dall-e-2` or `dall-e-3`. |
| `n` | integer | No | `1` | Number of images to generate. |
| `quality` | string | No | `standard` | `standard` or `hd`. |
| `response_format` | string | No | `url` | `url` or `b64_json`. |
| `size` | string | No | `1024x1024` | Output size. |
| `style` | string | No | `vivid` | `vivid` or `natural`. |
| `user` | string | No | - | End-user identifier. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `created` | integer | Creation timestamp. |
| `data` | array | Generated image entries. |
| `data[].url` | string | Image URL when using URL output. |
| `data[].b64_json` | string | Base64 image payload when requested. |
| `data[].revised_prompt` | string | Refined prompt returned by the model. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 Response" label="application/json">

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
  title="OpenAI Image Edits"
  summary="Edit an uploaded image with an optional mask using the OpenAI-compatible image editing endpoint."
  method="POST"
  path="/v1/images/edits"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="multipart/form-data"
  response-code="200"
  response-type="application/json"
>

### Form Data

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `image` | file | Yes | Source image in PNG format, under 4 MB. |
| `mask` | file | No | Optional mask image. |
| `prompt` | string | Yes | Editing instruction. |
| `model` | string | No | Target image model. |
| `n` | integer | No | Number of outputs. |
| `size` | string | No | Output size. |
| `response_format` | string | No | Response format. |
| `user` | string | No | End-user identifier. |

### Response Body

The response matches the OpenAI image generation schema, including `data[].url` or `data[].b64_json`.

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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
  title="Qwen Image Generations"
  summary="Generate images through the Qwen-compatible OpenAI image endpoint for `wanx-v1` style models."
  method="POST"
  path="/v1/images/generations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Model identifier, such as `wanx-v1`. |
| `input` | object | Yes | Input wrapper object sent in the sample request. |
| `input.messages` | array | Yes | Messages array nested under `input`. |
| `input.messages[]` | object | Yes | Message objects inside `input.messages`. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `created` | integer | Creation timestamp. |
| `data` | array | Generated image entries. |
| `data[].url` | string | Image URL. |
| `data[].b64_json` | string | Base64 image payload. |
| `data[].revised_prompt` | string | Revised prompt returned by the model. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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
  title="Qwen Image Edits"
  summary="Edit images through the Qwen-compatible OpenAI image editing workflow."
  method="POST"
  path="/v1/images/edits"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Model identifier sent in the sample request. |
| `input` | object | Yes | Input wrapper object sent in the request body. |
| `input.messages` | array | Yes | Messages array nested under `input`. |
| `input.messages[]` | object | Yes | Message objects inside `input.messages`. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `created` | integer | Creation timestamp. |
| `data` | array | Generated image entries. |
| `data[].url` | string | Image URL. |
| `data[].b64_json` | string | Base64 image payload. |
| `data[].revised_prompt` | string | Revised prompt returned by the model. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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
