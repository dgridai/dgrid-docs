---
title: 실시간
aside: false
outline: false
---

# 실시간

실시간 API는 OpenAI 호환 저지연 텍스트 및 오디오 대화를 websocket과 짧은 수명의 session token 생성 엔드포인트로 제공합니다.

<ApiEndpoint
  id="websocket-connection"
  title="WebSocket 연결"
  summary="백엔드가 DGrid API 키를 안전하게 보관할 수 있다면 realtime websocket 연결을 직접 열 수 있습니다."
  method="WSS"
  path="wss://api.dgrid.ai/v1/realtime?model={model}"
  auth="Authorization: Bearer <DGRID_API_KEY>; OpenAI-Beta: realtime=v1"
  request-type="websocket"
  response-type="websocket events"
>

### Query 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `model` | string | 예 | realtime 모델 ID, 예: `gpt-4o-realtime-preview`. |

### 클라이언트 이벤트

| 이벤트 타입 | 설명 |
| --- | --- |
| `session.update` | session 수준 설정을 업데이트합니다. |
| `input_audio_buffer.append` | 오디오 청크를 전송합니다. |
| `input_audio_buffer.commit` | 현재 오디오 버퍼를 커밋합니다. |
| `response.create` | 새 어시스턴트 응답을 트리거합니다. |
| `conversation.item.create` | 대화 항목을 추가합니다. |

### 서버 이벤트

| 이벤트 타입 | 설명 |
| --- | --- |
| `session.created` | session 이 성공적으로 생성되었습니다. |
| `session.updated` | session 설정이 갱신되었습니다. |
| `response.text.delta` | 스트리밍 텍스트 증분 출력입니다. |
| `response.audio.delta` | 스트리밍 오디오 증분 출력입니다. |
| `response.done` | 응답이 완료되었습니다. |
| `error` | 오류 페이로드입니다. |

<template #code>

<ApiCodePanel title="JavaScript 예시" label="WebSocket">

```js
const ws = new WebSocket(
  'wss://api.dgrid.ai/v1/realtime?model=gpt-4o-realtime-preview',
  [],
  {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'OpenAI-Beta': 'realtime=v1'
    }
  }
)

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'session.update',
    session: {
      modalities: ['text', 'audio'],
      voice: 'alloy'
    }
  }))
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log('received event:', data)
}
```

</ApiCodePanel>

<ApiCodePanel title="헤더 요구사항" label="headers">

```http
Authorization: Bearer <DGRID_API_KEY>
OpenAI-Beta: realtime=v1
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="session-tokens"
  title="Realtime Session Token 생성"
  summary="아래 예시처럼 realtime HTTP 진입점에 인증된 GET 요청을 보내야 할 때 이 예시를 사용합니다."
  method="GET"
  path="/v1/realtime"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="none"
  response-code="101"
  response-type="application/json"
>

### 요청 헤더

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `Authorization` | string | 예 | realtime 요청 인증에 사용하는 Bearer 토큰입니다. |

### 응답 본문

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `101` | text | JSON 본문 없이 성공적으로 업그레이드된 응답입니다. |
| `error` | object | 요청이 실패했을 때 반환되는 오류 페이로드입니다. |

<template #code>

<ApiCodePanel title="요청 예시" label="cURL / JavaScript / Go / Python / Java / C#">

::: code-group

```bash [cURL]
curl -X GET "https://api.dgrid.ai/v1/realtime" \
  -H "Authorization: Bearer "
```

```js [JavaScript]
fetch("https://api.dgrid.ai/v1/realtime", {
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
  url := "https://api.dgrid.ai/v1/realtime"

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

url = "https://api.dgrid.ai/v1/realtime"

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

HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
  .uri(URI.create("https://api.dgrid.ai/v1/realtime"))
  .header("Authorization", "Bearer ")
  .GET()
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

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ");
var response = await client.GetAsync("https://api.dgrid.ai/v1/realtime");
var responseBody = await response.Content.ReadAsStringAsync();
```

:::

</ApiCodePanel>

<ApiCodePanel title="101 응답" label="application/json">

```text
Empty
```

</ApiCodePanel>

<ApiCodePanel title="400 응답" label="application/json">

```json
{
  "error": {
    "message": "string",
    "type": "string",
    "param": "string",
    "code": "string"
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="websocket-events"
  title="WebSocket 이벤트"
  summary="저지연 대화 스트리밍은 소수의 핵심 request 및 response 이벤트를 중심으로 설계됩니다."
  method="WSS"
  path="wss://api.dgrid.ai/v1/realtime?model={model}"
  auth="Authorization: Bearer <DGRID_API_KEY>; OpenAI-Beta: realtime=v1"
  request-type="websocket"
  response-type="event stream"
>

### 핵심 클라이언트 이벤트

| 이벤트 타입 | 설명 |
| --- | --- |
| `session.update` | 모달리티, 음성, session 선호값을 업데이트합니다. |
| `input_audio_buffer.append` | 인코딩된 오디오 조각을 전송합니다. |
| `input_audio_buffer.commit` | 현재 오디오 버퍼가 처리 준비되었음을 알립니다. |
| `response.create` | 서버에 응답 생성을 요청합니다. |
| `conversation.item.create` | 대화 턴이나 도구 결과를 추가합니다. |

### 핵심 서버 이벤트

| 이벤트 타입 | 설명 |
| --- | --- |
| `session.created` | websocket session 이 생성되었습니다. |
| `session.updated` | session 설정이 변경되었습니다. |
| `response.text.delta` | 점진적인 텍스트 출력입니다. |
| `response.audio.delta` | 점진적인 오디오 출력입니다. |
| `response.done` | 하나의 응답이 완료되었습니다. |
| `error` | 복구 가능 또는 치명적 오류입니다. |

### 통합 가이드

1. 클라이언트에서 오디오를 작은 청크로 버퍼링하고 `input_audio_buffer.commit` 으로 turn 경계를 표시하세요.
2. session 이 멀티모달 출력을 지원한다면 `response.text.delta` 와 `response.audio.delta` 를 모두 구독하세요.
3. 브라우저 클라이언트는 장기 API 키 대신 서버가 발급한 짧은 수명의 session token 을 사용하세요.

<template #code>

<ApiCodePanel title="이벤트 예시" label="response.text.delta">

```json
{
  "type": "response.text.delta",
  "response_id": "resp_123",
  "delta": "Hello"
}
```

</ApiCodePanel>

<ApiCodePanel title="이벤트 예시" label="response.done">

```json
{
  "type": "response.done",
  "response": {
    "id": "resp_123",
    "status": "completed"
  }
}
```

</ApiCodePanel>

</template>
</ApiEndpoint>
