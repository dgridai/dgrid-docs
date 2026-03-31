---
title: 오디오
aside: false
outline: false
---

# 오디오

오디오 API는 Gemini 네이티브 오디오 이해와 OpenAI 호환 음성 합성, 전사, 번역 엔드포인트를 포함합니다.

<ApiEndpoint
  id="native-gemini-format"
  title="네이티브 Gemini 형식"
  summary="구조화된 parts로 멀티모달 오디오 이해나 생성을 처리해야 할 때 Gemini 호환 generateContent 인터페이스를 사용합니다."
  method="POST"
  path="/v1/models/{model}:generateContent"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="application/json"
>

### Path 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `model` | string | 예 | 대상 모델 ID, 예: `gemini-1.5-pro`. |

### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `contents` | array | 예 | 입력 콘텐츠 배열입니다. |
| `contents[]` | object | 예 | 현재 예시는 빈 객체를 하나 포함한 배열을 전송합니다. |
| `generationConfig` | object | 예 | 음성 응답 생성을 위한 설정입니다. |
| <code>generationConfig.<wbr>responseModalities</code> | array | 예 | 반환할 모달리티 목록입니다. |
| <code>generationConfig.<wbr>speechConfig</code> | object | 예 | 음성 생성 설정입니다. |
| <code>generationConfig.<wbr>speechConfig.<wbr>voiceConfig</code> | object | 예 | 음성 설정 래퍼입니다. |
| <code>generationConfig.<wbr>speechConfig.<wbr>voiceConfig.<wbr>prebuiltVoiceConfig</code> | object | 예 | 사전 구성 음성 설정입니다. |
| <code>generationConfig.<wbr>speechConfig.<wbr>voiceConfig.<wbr>prebuiltVoiceConfig.<wbr>voiceName</code> | string | 예 | 사용할 음성 이름입니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `candidates` | array | 모델이 반환한 후보 응답 목록입니다. |
| `candidates[].content` | object | 생성된 콘텐츠 객체입니다. |
| `candidates[].content.role` | string | 생성된 콘텐츠의 역할입니다. |
| `candidates[].content.parts` | array | 반환된 콘텐츠 파트입니다. |
| `candidates[].finishReason` | string | 예시 응답이 반환하는 종료 이유 문자열입니다. |
| `candidates[].safetyRatings` | array | 안전 평가 결과입니다. |
| `usageMetadata` | object | token 사용량 정보입니다. |
| `usageMetadata.promptTokenCount` | integer | 입력 token 수입니다. |
| `usageMetadata.candidatesTokenCount` | integer | 출력 token 수입니다. |
| `usageMetadata.totalTokenCount` | integer | 총 token 수입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 응답" label="application/json">

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
  title="텍스트 음성 합성"
  summary="OpenAI 호환 speech 인터페이스를 통해 텍스트를 자연스러운 음성으로 변환합니다."
  method="POST"
  path="/v1/audio/speech"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="application/json"
  response-code="200"
  response-type="audio/mpeg"
>

### 요청 본문

| 필드 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `model` | string | 예 | - | 음성 모델, 예: `tts-1`, `tts-1-hd`. |
| `input` | string | 예 | - | 합성할 텍스트, 최대 4096자. |
| `voice` | string | 예 | - | `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer` 등 음성 프리셋. |
| `response_format` | string | 아니오 | `mp3` | 출력 오디오 형식입니다. |
| `speed` | number | 아니오 | `1.0` | `0.25` 부터 `4.0` 까지의 속도입니다. |

### 응답

이 엔드포인트는 바이너리 오디오 스트림을 반환합니다. 응답 본문을 파일이나 스토리지 대상으로 바로 저장하세요.

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="응답" label="binary stream">

```text
"string"
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="audio-transcriptions"
  title="오디오 전사"
  summary="OpenAI 호환 Whisper 스타일 인터페이스로 업로드한 오디오를 텍스트로 전사합니다."
  method="POST"
  path="/v1/audio/transcriptions"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="multipart/form-data"
  response-code="200"
  response-type="application/json"
>

### Form Data

| 필드 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `file` | file | 예 | - | 최대 25 MB 오디오 파일입니다. |
| `model` | string | 예 | - | 모델 ID, 예: `whisper-1`. |
| `language` | string | 아니오 | - | ISO-639-1 언어 코드, 예: `ko`, `en`, `zh`. |
| `prompt` | string | 아니오 | - | 전사 결과를 보정하기 위한 프롬프트입니다. |
| `response_format` | string | 아니오 | `json` | `json`, `text`, `srt`, `verbose_json`, `vtt`. |
| `temperature` | number | 아니오 | `0` | `0` 부터 `1` 까지의 샘플링 온도입니다. |

### 지원 형식

FLAC, MP3, MP4, MPEG, MPGA, M4A, OGG, WAV, WebM.

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `text` | string | 전사된 텍스트입니다. |

`response_format` 을 `verbose_json` 으로 설정하면 `task`, `language`, `duration`, 세그먼트별 타이밍 정보도 포함됩니다.

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 응답" label="application/json">

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
  title="오디오 번역"
  summary="OpenAI 호환 번역 엔드포인트를 통해 업로드한 오디오를 영어로 번역합니다."
  method="POST"
  path="/v1/audio/translations"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="multipart/form-data"
  response-code="200"
  response-type="application/json"
>

### Form Data

| 필드 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `file` | file | 예 | - | 원본 오디오 파일입니다. |
| `model` | string | 예 | - | 모델 ID, 예: `whisper-1`. |
| `prompt` | string | 아니오 | - | 선택적 영어 프롬프트입니다. |
| `response_format` | string | 아니오 | `json` | `json`, `text`, `srt`, `verbose_json`, `vtt`. |
| `temperature` | number | 아니오 | `0` | `0` 부터 `1` 까지의 샘플링 온도입니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `text` | string | 오디오를 영어로 번역한 텍스트입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="200 응답" label="application/json">

```json
{
  "text": "string"
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
