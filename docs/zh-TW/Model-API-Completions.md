---
title: 補全
aside: false
outline: false
---

# 補全

補全 API 提供經典 OpenAI 相容文字補全流程，適用於 prompt 導向生成與舊版整合場景。

<ApiEndpoint
  id="native-openai-format"
  title="原生 OpenAI 格式"
  summary="若您的工作流只需要單一 prompt 文字生成，而不需要多輪 chat schema，請使用 completions 端點。"
  method="POST"
  path="/v1/completions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 請求體

| 欄位 | 型別 | 必填 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| `model` | string | 是 | - | 目標模型 ID。 |
| `prompt` | string 或 array | 是 | - | 提示文字或提示陣列。 |
| `suffix` | string | 否 | - | 用於插入場景的後綴文字。 |
| `max_tokens` | integer | 否 | `16` | 最大補全長度。 |
| `temperature` | number | 否 | `1` | 採樣溫度。 |
| `top_p` | number | 否 | `1` | Nucleus sampling。 |
| `n` | integer | 否 | `1` | 回傳的補全數量。 |
| `stream` | boolean | 否 | `false` | 是否串流。 |
| `logprobs` | integer | 否 | - | 返回 log probability 數量。 |
| `echo` | boolean | 否 | `false` | 是否回傳原始 prompt。 |
| `stop` | string 或 array | 否 | - | 停止序列。 |
| `presence_penalty` | number | 否 | `0` | 存在懲罰。 |
| `frequency_penalty` | number | 否 | `0` | 頻率懲罰。 |
| `best_of` | integer | 否 | `1` | 伺服器端挑選最佳結果數。 |
| `logit_bias` | object | 否 | - | Token 偏置映射。 |
| `user` | string | 否 | - | 終端使用者識別。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `id` | string | Completion 識別碼。 |
| `object` | string | 固定為 `text_completion`。 |
| `created` | integer | 建立時間戳。 |
| `model` | string | 用於生成的模型。 |
| `choices` | array | 補全結果列表。 |
| `choices[].text` | string | 生成文字。 |
| `choices[].index` | integer | choice 索引。 |
| `choices[].logprobs` | object 或 null | 若有要求時返回 log probability。 |
| `choices[].finish_reason` | string | 結束原因。 |
| `usage` | object | Token 使用統計。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 回應" label="application/json">

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
