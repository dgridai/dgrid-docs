---
title: Completions
aside: false
outline: false
---

# Completions

The Completions API exposes the classic OpenAI-compatible text completion workflow for prompt-based generation and legacy integrations.

<ApiEndpoint
  id="native-openai-format"
  title="Native OpenAI Format"
  summary="Use the completions endpoint for single-prompt generation workloads that do not require a multi-message chat schema."
  method="POST"
  path="/v1/completions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Request Body

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `model` | string | Yes | - | Target model ID. |
| `prompt` | string or array | Yes | - | Prompt text or prompt array. |
| `suffix` | string | No | - | Optional suffix for insertion use cases. |
| `max_tokens` | integer | No | `16` | Maximum completion length. |
| `temperature` | number | No | `1` | Sampling temperature. |
| `top_p` | number | No | `1` | Nucleus sampling value. |
| `n` | integer | No | `1` | Number of completions to return. |
| `stream` | boolean | No | `false` | Enable streaming. |
| `logprobs` | integer | No | - | Number of log probability values to return. |
| `echo` | boolean | No | `false` | Whether to include the prompt in the output. |
| `stop` | string or array | No | - | Stop sequence. |
| `presence_penalty` | number | No | `0` | Presence penalty. |
| `frequency_penalty` | number | No | `0` | Frequency penalty. |
| `best_of` | integer | No | `1` | Server-side reranking count. |
| `logit_bias` | object | No | - | Token bias map. |
| `user` | string | No | - | End-user identifier. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Completion identifier. |
| `object` | string | Always `text_completion`. |
| `created` | integer | Creation timestamp. |
| `model` | string | Model used for generation. |
| `choices` | array | Completion choices. |
| `choices[].text` | string | Generated text. |
| `choices[].index` | integer | Choice index. |
| `choices[].logprobs` | object or null | Log probability output when requested. |
| `choices[].finish_reason` | string | Finish reason. |
| `usage` | object | Token usage metadata. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/completions" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "prompt": "string"
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "string",
  "prompt": "string"
})

fetch("https://api.dgrid.ai/v1/completions", {
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
  url := "https://api.dgrid.ai/v1/completions"
  body := strings.NewReader(`{
    "model": "string",
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

url = "https://api.dgrid.ai/v1/completions"
body = """{
  "model": "string",
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
  "model": "string",
  "prompt": "string"
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/completions"))
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
  "prompt": "string"
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/completions", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 Response" label="application/json">

```json
{
  "id": "string",
  "object": "text_completion",
  "created": 0,
  "model": "string",
  "choices": [
    {
      "text": "string",
      "index": 0,
      "finish_reason": "string"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "text_tokens": 0,
      "audio_tokens": 0,
      "image_tokens": 0
    },
    "completion_tokens_details": {
      "text_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0
    }
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
