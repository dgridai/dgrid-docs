---
title: Realtime
aside: false
outline: false
---

# Realtime

The Realtime API exposes OpenAI-compatible low-latency text and audio conversations through websocket sessions plus an HTTP endpoint for short-lived client tokens.

<ApiEndpoint
  id="websocket-connection"
  title="WebSocket Connection"
  summary="Open a realtime websocket session directly when your backend can securely hold the DGrid API key."
  method="WSS"
  path="wss://api.dgrid.ai/v1/realtime?model={model}"
  auth="Authorization: Bearer <DGRID_API_KEY>; OpenAI-Beta: realtime=v1"
  request-type="websocket"
  response-type="websocket events"
>

### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Realtime model ID, such as `gpt-4o-realtime-preview`. |

### Client Events

| Event Type | Description |
| --- | --- |
| `session.update` | Update session-level options. |
| `input_audio_buffer.append` | Stream audio chunks to the server. |
| `input_audio_buffer.commit` | Commit the current buffered audio. |
| `response.create` | Trigger a new assistant response. |
| `conversation.item.create` | Insert a conversation item. |

### Server Events

| Event Type | Description |
| --- | --- |
| `session.created` | Session was successfully created. |
| `session.updated` | Session settings were updated. |
| `response.text.delta` | Streamed text token delta. |
| `response.audio.delta` | Streamed audio chunk delta. |
| `response.done` | Response has completed. |
| `error` | Error payload. |

<template #code>

<ApiCodePanel title="JavaScript Example" label="WebSocket">

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

<ApiCodePanel title="Realtime Notes" label="headers">

```http
Authorization: Bearer <DGRID_API_KEY>
OpenAI-Beta: realtime=v1
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="session-tokens"
  title="Create Realtime Session Token"
  summary="Use the realtime endpoint example shown below when you need an authenticated GET request against the realtime HTTP entrypoint."
  method="GET"
  path="/v1/realtime"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="none"
  response-code="101"
  response-type="application/json"
>

### Request Headers

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Authorization` | string | Yes | Bearer token used to authenticate the realtime request. |

### Response Body

| Field | Type | Description |
| --- | --- | --- |
| `101` | text | Successful upgrade response with no JSON body. |
| `error` | object | Error payload returned when the request fails. |

<template #code>

<ApiCodePanel title="Request Example" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="101 Response" label="application/json">

```text
Empty
```

</ApiCodePanel>

<ApiCodePanel title="400 Response" label="application/json">

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
  title="WebSocket Events"
  summary="Plan your client around a small set of request and response event types for low-latency conversational streaming."
  method="WSS"
  path="wss://api.dgrid.ai/v1/realtime?model={model}"
  auth="Authorization: Bearer <DGRID_API_KEY>; OpenAI-Beta: realtime=v1"
  request-type="websocket"
  response-type="event stream"
>

### Core Client Events

| Event Type | Description |
| --- | --- |
| `session.update` | Update modalities, voice, or other session preferences. |
| `input_audio_buffer.append` | Send encoded audio fragments. |
| `input_audio_buffer.commit` | Mark the buffered audio as ready. |
| `response.create` | Ask the server to begin generating a response. |
| `conversation.item.create` | Add a conversation turn or tool result. |

### Core Server Events

| Event Type | Description |
| --- | --- |
| `session.created` | Initial confirmation that the websocket session exists. |
| `session.updated` | Confirmation that session settings changed. |
| `response.text.delta` | Incremental text output. |
| `response.audio.delta` | Incremental audio output. |
| `response.done` | Final event for a completed response. |
| `error` | Recoverable or fatal error payload. |

### Integration Guidance

1. Buffer client-side audio in small chunks and use `input_audio_buffer.commit` to signal turn boundaries.
2. Listen for both `response.text.delta` and `response.audio.delta` if the session supports multimodal output.
3. Use the HTTP session token endpoint for browser clients so the long-lived API key never reaches the client.

<template #code>

<ApiCodePanel title="Example Event" label="response.text.delta">

```json
{
  "type": "response.text.delta",
  "response_id": "resp_123",
  "delta": "Hello"
}
```

</ApiCodePanel>

<ApiCodePanel title="Example Event" label="response.done">

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
