---
title: 即時語音
aside: false
outline: false
---

# 即時語音

即時語音 API 提供 OpenAI 相容低延遲文字與音訊對話能力，包含 websocket 連線與短時效 session token 建立端點。

<ApiEndpoint
  id="websocket-connection"
  title="WebSocket 連線"
  summary="若您的後端可以安全持有 DGrid API 金鑰，可直接建立 realtime websocket 連線。"
  method="WSS"
  path="wss://api.dgrid.ai/v1/realtime?model={model}"
  auth="Authorization: Bearer <DGRID_API_KEY>; OpenAI-Beta: realtime=v1"
  request-type="websocket"
  response-type="websocket events"
>

### 查詢參數

| 參數 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 即時模型 ID，例如 `gpt-4o-realtime-preview`。 |

### 用戶端事件

| 事件類型 | 說明 |
| --- | --- |
| `session.update` | 更新 session 層級設定。 |
| `input_audio_buffer.append` | 傳送音訊區塊。 |
| `input_audio_buffer.commit` | 提交目前音訊緩衝區。 |
| `response.create` | 觸發新的助手回應。 |
| `conversation.item.create` | 新增對話項目。 |

### 伺服器事件

| 事件類型 | 說明 |
| --- | --- |
| `session.created` | session 已成功建立。 |
| `session.updated` | session 設定已更新。 |
| `response.text.delta` | 串流文字增量輸出。 |
| `response.audio.delta` | 串流音訊增量輸出。 |
| `response.done` | 本次回應完成。 |
| `error` | 錯誤事件。 |

<template #code>

<ApiCodePanel title="JavaScript 範例" label="WebSocket">

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

<ApiCodePanel title="標頭需求" label="headers">

```http
Authorization: Bearer <DGRID_API_KEY>
OpenAI-Beta: realtime=v1
```

</ApiCodePanel>

</template>
</ApiEndpoint>

<ApiEndpoint
  id="session-tokens"
  title="建立 Realtime Session Token"
  summary="若您需要像下方範例那樣，對 realtime HTTP 入口發送帶認證的 GET 請求，可參考此段示例。"
  method="GET"
  path="/v1/realtime"
  auth="Authorization: Bearer <DGRID_API_KEY>"
  request-type="none"
  response-code="101"
  response-type="application/json"
>

### 請求標頭

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `Authorization` | string | 是 | 用於 realtime 請求驗證的 Bearer 權杖。 |

### 回應體

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `101` | text | 成功升級後不返回 JSON 主體。 |
| `error` | object | 請求失敗時返回的錯誤載荷。 |

<template #code>

<ApiCodePanel title="請求範例" label="cURL / JavaScript / Go / Python / Java / C#">

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

<ApiCodePanel title="101 回應" label="application/json">

```text
Empty
```

</ApiCodePanel>

<ApiCodePanel title="400 回應" label="application/json">

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
  title="WebSocket 事件"
  summary="低延遲對話串流通常圍繞一小組核心 request 與 response 事件展開。"
  method="WSS"
  path="wss://api.dgrid.ai/v1/realtime?model={model}"
  auth="Authorization: Bearer <DGRID_API_KEY>; OpenAI-Beta: realtime=v1"
  request-type="websocket"
  response-type="event stream"
>

### 核心用戶端事件

| 事件類型 | 說明 |
| --- | --- |
| `session.update` | 更新模態、語音或 session 偏好設定。 |
| `input_audio_buffer.append` | 傳送編碼後的音訊片段。 |
| `input_audio_buffer.commit` | 標記當前音訊緩衝區可開始處理。 |
| `response.create` | 要求伺服器開始生成回應。 |
| `conversation.item.create` | 新增對話輪次或工具結果。 |

### 核心伺服器事件

| 事件類型 | 說明 |
| --- | --- |
| `session.created` | websocket session 已建立。 |
| `session.updated` | session 設定已變更。 |
| `response.text.delta` | 漸進式文字輸出。 |
| `response.audio.delta` | 漸進式音訊輸出。 |
| `response.done` | 一次回應完成。 |
| `error` | 可恢復或致命錯誤。 |

### 整合建議

1. 先在客戶端將音訊分塊緩衝，再用 `input_audio_buffer.commit` 標記 turn 邊界。
2. 若 session 支援多模態輸出，請同時監聽 `response.text.delta` 與 `response.audio.delta`。
3. 瀏覽器端建議先向伺服器請求短時效 session token，避免長期 API 金鑰下發到客戶端。

<template #code>

<ApiCodePanel title="事件範例" label="response.text.delta">

```json
{
  "type": "response.text.delta",
  "response_id": "resp_123",
  "delta": "Hello"
}
```

</ApiCodePanel>

<ApiCodePanel title="事件範例" label="response.done">

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
