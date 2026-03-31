---
title: 音訊
aside: false
outline: false
---

# 音訊

音訊 API 涵蓋 Gemini 原生音訊理解，以及 OpenAI 相容的語音合成、音訊轉錄與音訊翻譯端點。

<ApiEndpoint
  id="native-gemini-format"
  title="原生 Gemini 格式"
  summary="當您需要以結構化 parts 處理多模態音訊理解或生成時，請使用 Gemini 相容的 generateContent 介面。"
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### 路徑參數

| 參數 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 目標模型 ID，例如 `gemini-1.5-pro`。 |

### 請求體

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `contents` | array | 是 | 輸入內容陣列。 |
| `contents[]` | object | 是 | 目前範例會傳送一個只包含空物件的陣列項目。 |
| `generationConfig` | object | 是 | 用於語音回應生成的設定。 |
| <code>generationConfig.<wbr>responseModalities</code> | array | 是 | 要返回的模態清單。 |
| <code>generationConfig.<wbr>speechConfig</code> | object | 是 | 語音生成設定。 |
| <code>generationConfig.<wbr>speechConfig.<wbr>voiceConfig</code> | object | 是 | 語音設定包裝物件。 |
| <code>generationConfig.<wbr>speechConfig.<wbr>voiceConfig.<wbr>prebuiltVoiceConfig</code> | object | 是 | 預建語音設定。 |
| <code>generationConfig.<wbr>speechConfig.<wbr>voiceConfig.<wbr>prebuiltVoiceConfig.<wbr>voiceName</code> | string | 是 | 要使用的語音名稱。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `candidates` | array | 模型返回的候選回應。 |
| `candidates[].content` | object | 生成內容物件。 |
| `candidates[].content.role` | string | 生成內容的角色。 |
| `candidates[].content.parts` | array | 返回內容片段。 |
| `candidates[].finishReason` | string | 範例回應返回的結束原因字串。 |
| `candidates[].safetyRatings` | array | 安全評分結果。 |
| `usageMetadata` | object | Token 使用統計。 |
| `usageMetadata.promptTokenCount` | integer | 輸入 token 數。 |
| `usageMetadata.candidatesTokenCount` | integer | 輸出 token 數。 |
| `usageMetadata.totalTokenCount` | integer | 總 token 數。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/models/string:generateContent" \
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
      "speechConfig": {
        "voiceConfig": {
          "prebuiltVoiceConfig": {
            "voiceName": "string"
          }
        }
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
    "speechConfig": {
      "voiceConfig": {
        "prebuiltVoiceConfig": {
          "voiceName": "string"
        }
      }
    }
  }
})

fetch("https://api.dgrid.ai/v1/models/string:generateContent", {
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
  url := "https://api.dgrid.ai/v1/models/string:generateContent"
  body := strings.NewReader(`{
    "contents": [
      {}
    ],
    "generationConfig": {
      "responseModalities": [
        "string"
      ],
      "speechConfig": {
        "voiceConfig": {
          "prebuiltVoiceConfig": {
            "voiceName": "string"
          }
        }
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

url = "https://api.dgrid.ai/v1/models/string:generateContent"
body = """{
  "contents": [
    {}
  ],
  "generationConfig": {
    "responseModalities": [
      "string"
    ],
    "speechConfig": {
      "voiceConfig": {
        "prebuiltVoiceConfig": {
          "voiceName": "string"
        }
      }
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
    "speechConfig": {
      "voiceConfig": {
        "prebuiltVoiceConfig": {
          "voiceName": "string"
        }
      }
    }
  }
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/models/string:generateContent"))
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
    "speechConfig": {
      "voiceConfig": {
        "prebuiltVoiceConfig": {
          "voiceName": "string"
        }
      }
    }
  }
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/models/string:generateContent", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 回應" label="application/json">

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
  id="text-to-speech"
  title="文字轉語音"
  summary="透過 OpenAI 相容 speech 介面，將文字轉換為自然語音。"
  method="POST"
  path="/v1/audio/speech"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="audio/mpeg"
>

### 請求體

| 欄位 | 型別 | 必填 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| `model` | string | 是 | - | 語音模型，例如 `tts-1` 或 `tts-1-hd`。 |
| `input` | string | 是 | - | 要合成的文字，最長 4096 字元。 |
| `voice` | string | 是 | - | 語音預設，例如 `alloy`、`echo`、`fable`、`onyx`、`nova`、`shimmer`。 |
| `response_format` | string | 否 | `mp3` | 輸出音訊格式。 |
| `speed` | number | 否 | `1.0` | 語速，範圍 `0.25` 到 `4.0`。 |

### 回應

此端點返回二進位音訊串流，請直接將回應內容保存為檔案或上傳到儲存目標。

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/audio/speech" \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "string",
    "voice": "alloy"
  }'
```

```js [JavaScript]
const body = JSON.stringify({
  "model": "tts-1",
  "input": "string",
  "voice": "alloy"
})

fetch("https://api.dgrid.ai/v1/audio/speech", {
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
  url := "https://api.dgrid.ai/v1/audio/speech"
  body := strings.NewReader(`{
    "model": "tts-1",
    "input": "string",
    "voice": "alloy"
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

url = "https://api.dgrid.ai/v1/audio/speech"
body = """{
  "model": "tts-1",
  "input": "string",
  "voice": "alloy"
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
  "model": "tts-1",
  "input": "string",
  "voice": "alloy"
}""");
HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/audio/speech"))
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
  "model": "tts-1",
  "input": "string",
  "voice": "alloy"
}
""", Encoding.UTF8, "application/json");

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.PostAsync("https://api.dgrid.ai/v1/audio/speech", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="回應" label="binary stream">

```text
"string"
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="audio-transcriptions"
  title="音訊轉錄"
  summary="透過 OpenAI 相容 Whisper 風格介面，將上傳音訊轉為文字。"
  method="POST"
  path="/v1/audio/transcriptions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="multipart/form-data"
  response-code="200"
  response-type="application/json"
>

### 表單欄位

| 欄位 | 型別 | 必填 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| `file` | file | 是 | - | 音訊檔，大小上限 25 MB。 |
| `model` | string | 是 | - | 模型 ID，例如 `whisper-1`。 |
| `language` | string | 否 | - | ISO-639-1 語言代碼，例如 `zh`、`en`、`ko`。 |
| `prompt` | string | 否 | - | 用於偏置轉錄結果的提示文字。 |
| `response_format` | string | 否 | `json` | `json`、`text`、`srt`、`verbose_json` 或 `vtt`。 |
| `temperature` | number | 否 | `0` | 採樣溫度，範圍 `0` 到 `1`。 |

### 支援格式

FLAC、MP3、MP4、MPEG、MPGA、M4A、OGG、WAV 與 WebM。

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `text` | string | 轉錄後的文字內容。 |

若 `response_format` 設為 `verbose_json`，回應中還會包含 `task`、`language`、`duration` 與逐段時間軸資訊。

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/audio/transcriptions" \
  -H "Authorization: Bearer " \
  -F file="string" \
  -F model="whisper-1"
```

```js [JavaScript]
const body = new FormData();
body.set(file, "string")
body.set(model, "whisper-1")

fetch("https://api.dgrid.ai/v1/audio/transcriptions", {
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
  url := "https://api.dgrid.ai/v1/audio/transcriptions"
  body := new(bytes.Buffer)
  mp := multipart.NewWriter(payload)
  mp.WriteField("file", `string`)
  mp.WriteField("model", `whisper-1`)
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

url = "https://api.dgrid.ai/v1/audio/transcriptions"
body = {
  "file": "string",
  "model": "whisper-1"
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
  .uri(URI.create("https://api.dgrid.ai/v1/audio/transcriptions"))
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
var response = await client.PostAsync("https://api.dgrid.ai/v1/audio/transcriptions", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 回應" label="application/json">

```json
{
  "text": "string"
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="audio-translations"
  title="音訊翻譯"
  summary="透過 OpenAI 相容翻譯端點，將上傳音訊翻譯為英文。"
  method="POST"
  path="/v1/audio/translations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="multipart/form-data"
  response-code="200"
  response-type="application/json"
>

### 表單欄位

| 欄位 | 型別 | 必填 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| `file` | file | 是 | - | 原始音訊檔。 |
| `model` | string | 是 | - | 模型 ID，例如 `whisper-1`。 |
| `prompt` | string | 否 | - | 可選英文提示文字。 |
| `response_format` | string | 否 | `json` | `json`、`text`、`srt`、`verbose_json` 或 `vtt`。 |
| `temperature` | number | 否 | `0` | 採樣溫度，範圍 `0` 到 `1`。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `text` | string | 翻譯後的英文文字。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X POST "https://api.dgrid.ai/v1/audio/translations" \
  -H "Authorization: Bearer " \
  -F file="string" \
  -F model="string"
```

```js [JavaScript]
const body = new FormData();
body.set(file, "string")
body.set(model, "string")

fetch("https://api.dgrid.ai/v1/audio/translations", {
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
  url := "https://api.dgrid.ai/v1/audio/translations"
  body := new(bytes.Buffer)
  mp := multipart.NewWriter(payload)
  mp.WriteField("file", `string`)
  mp.WriteField("model", `string`)
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

url = "https://api.dgrid.ai/v1/audio/translations"
body = {
  "file": "string",
  "model": "string"
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
  .uri(URI.create("https://api.dgrid.ai/v1/audio/translations"))
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
var response = await client.PostAsync("https://api.dgrid.ai/v1/audio/translations", body);
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="200 回應" label="application/json">

```json
{
  "text": "string"
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
