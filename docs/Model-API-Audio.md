---
title: Audio
aside: false
outline: false
---

# Audio

The Audio API covers Gemini-native audio understanding plus OpenAI-compatible speech synthesis, transcription, and translation endpoints.

<ApiEndpoint
  id="native-gemini-format"
  title="Native Gemini Format"
  summary="Use Gemini-compatible generateContent requests when you need multimodal audio understanding or generation with structured parts."
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Target model ID, such as `gemini-1.5-pro`. |

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contents` | array | Yes | Content array used in the request body. |
| `contents[]` | object | Yes | The sample uses an empty object item inside `contents`. |
| `generationConfig` | object | Yes | Generation configuration object used in the sample. |
| <code>generationConfig.<wbr>responseModalities</code> | array | Yes | Requested response modalities array. |
| <code>generationConfig.<wbr>speechConfig</code> | object | Yes | Speech configuration object. |
| <code>generationConfig.<wbr>speechConfig.<wbr>voiceConfig</code> | object | Yes | Voice configuration wrapper. |
| <code>generationConfig.<wbr>speechConfig.<wbr>voiceConfig.<wbr>prebuiltVoiceConfig</code> | object | Yes | Prebuilt voice settings. |
| <code>generationConfig.<wbr>speechConfig.<wbr>voiceConfig.<wbr>prebuiltVoiceConfig.<wbr>voiceName</code> | string | Yes | Voice preset name used in the sample. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `candidates` | array | Candidate responses returned by the model. |
| `candidates[].content` | object | Generated content object. |
| `candidates[].content.role` | string | Role returned in the generated content block. |
| `candidates[].content.parts` | array | Returned parts. |
| `candidates[].finishReason` | string | Finish reason string returned by the sample response. |
| `candidates[].safetyRatings` | array | Safety evaluation results. |
| `usageMetadata` | object | Token accounting. |
| `usageMetadata.promptTokenCount` | integer | Prompt token count. |
| `usageMetadata.candidatesTokenCount` | integer | Output token count. |
| `usageMetadata.totalTokenCount` | integer | Total token count. |
| `promptFeedback` | object | Prompt blocking feedback when applicable. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 Response" label="application/json">

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
  title="Text-to-Speech"
  summary="Convert text into natural speech with the OpenAI-compatible audio speech interface."
  method="POST"
  path="/v1/audio/speech"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="audio/mpeg"
>

### Request Body

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `model` | string | Yes | - | Voice model, such as `tts-1` or `tts-1-hd`. |
| `input` | string | Yes | - | Text to synthesize, up to 4096 characters. |
| `voice` | string | Yes | - | Voice preset, such as `alloy`, `echo`, `fable`, `onyx`, `nova`, or `shimmer`. |
| `response_format` | string | No | `mp3` | Output audio format. |
| `speed` | number | No | `1.0` | Speaking speed from `0.25` to `4.0`. |

### Response

The endpoint returns a binary audio stream. Save the response body directly to a local file or cloud storage target.

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="Response" label="binary stream">

```text
"string"
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="audio-transcriptions"
  title="Audio Transcriptions"
  summary="Transcribe uploaded audio into text with the OpenAI-compatible Whisper-style interface."
  method="POST"
  path="/v1/audio/transcriptions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="multipart/form-data"
  response-code="200"
  response-type="application/json"
>

### Form Data

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `file` | file | Yes | - | Audio file up to 25 MB. |
| `model` | string | Yes | - | Model ID, such as `whisper-1`. |
| `language` | string | No | - | ISO-639-1 language code, such as `en`, `zh`, or `ko`. |
| `prompt` | string | No | - | Optional prompt for biasing the transcript. |
| `response_format` | string | No | `json` | `json`, `text`, `srt`, `verbose_json`, or `vtt`. |
| `temperature` | number | No | `0` | Sampling temperature from `0` to `1`. |

### Supported Formats

FLAC, MP3, MP4, MPEG, MPGA, M4A, OGG, WAV, and WebM.

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `text` | string | Transcript text. |

When `response_format` is set to `verbose_json`, the response also includes `task`, `language`, `duration`, and per-segment timing metadata.

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 Response" label="application/json">

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
  title="Audio Translations"
  summary="Translate uploaded audio into English with the OpenAI-compatible translation endpoint."
  method="POST"
  path="/v1/audio/translations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="multipart/form-data"
  response-code="200"
  response-type="application/json"
>

### Form Data

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `file` | file | Yes | - | Source audio file. |
| `model` | string | Yes | - | Model ID, such as `whisper-1`. |
| `prompt` | string | No | - | Optional English prompt. |
| `response_format` | string | No | `json` | `json`, `text`, `srt`, `verbose_json`, or `vtt`. |
| `temperature` | number | No | `0` | Sampling temperature from `0` to `1`. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `text` | string | English translation of the uploaded audio. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 Response" label="application/json">

```json
{
  "text": "string"
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
