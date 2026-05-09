# Management API Keys 使用指南

Management API Keys 提供一種以程式化方式管理 Model API Keys 完整生命週期的方法。它適用於企業團隊、SaaS 平台與自動化系統，協助你在不依賴手動控制台操作的情況下，完成金鑰的建立、分發、輪換、啟用、停用與撤銷。

Management API Keys 屬於管理型憑證，只能用於金鑰管理操作，不能用於呼叫模型推理或補全端點。

## 1. 概述

Management API Keys 適用於以下場景：

- 為不同客戶、專案或環境簽發獨立的 Model API Key
- 為下游 Model API Key 設定用量限制與自動重置週期
- 以程式化方式輪換、停用或撤銷金鑰
- 在 SaaS、多租戶與合規要求較高的流程中實踐最小權限金鑰管理

核心能力：

- 嚴格的權限隔離，僅用於金鑰管理操作
- 支援 Model API Key 的完整生命週期自動化
- 可設定的用量限制與重置週期
- 適合伺服器端服務、內部工具與自動化開通流程

## 2. API 面向與認證邊界

金鑰管理分為兩組 API，各自對應不同的認證方式：

| API 面向 | 用途 | 認證方式 |
| --- | --- | --- |
| `/v1/management-keys` | 管理 Management API Keys 本身 | `JWT` |
| `/api/v1/model-router/keys` | 使用 Management API Key 管理 Model API Keys | `Authorization: Bearer <management_key>` |

請特別注意：

- `Management API Key` 只能用於 `/api/v1/model-router/keys`
- `Management API Key` 不能用於 `/v1/management-keys`
- `/v1/management-keys` 僅支援 `JWT` 認證
- 完整密鑰只會在建立時返回一次，之後無法再次取回

## 3. 基本規則

- 每個帳戶最多可建立 `10` 組 Management API Keys
- Management API Keys 建立後會立即啟用
- 完整的 Management API Key 密鑰只會返回一次
- 後續的列表與詳情回應僅返回遮罩後的金鑰值
- Model API Keys 目前採用軟刪除，而非永久刪除

## 4. Base URL

公開 API 的 base URL 為：

```text
https://api.dgrid.ai
```

本文檔使用的路由前綴如下：

```text
/v1/management-keys
/api/v1/model-router/keys
```

## 5. 建立 Management API Key

在使用 Management API 之前，請先於 DGrid 控制台建立 Management API Key：

1. 開啟 `Management API Keys` 頁面
2. 點擊 `Create`
3. 輸入金鑰名稱
4. 完成必要的安全驗證
5. 建立成功後立即複製並安全保存金鑰

若你在自有 UI 中提供這個流程，建議清楚提示使用者此密鑰只會顯示一次，必須立即保存。

## 6. 認證方式

本文檔涵蓋兩種認證模式：

- `/v1/management-keys` 下的端點需要使用 `JWT`
- `/api/v1/model-router/keys` 下的端點需要使用 Management API Key

呼叫 `/api/v1/model-router/keys` 端點時，請使用以下請求頭：

```http
Authorization: Bearer <management_key>
```

## 7. Management API Key 生命週期端點

以下端點用於建立、查詢、更新、啟用、停用與刪除 Management API Keys，全部都需要使用 `JWT` 認證。

| 操作 | 方法 | 路徑 | 說明 |
| --- | --- | --- | --- |
| 建立管理金鑰 | `POST` | `/v1/management-keys` | 完整金鑰只返回一次 |
| 查詢管理金鑰列表 | `GET` | `/v1/management-keys` | 支援分頁 |
| 更新管理金鑰 | `PUT` | `/v1/management-keys/{id}` | 目前僅支援更新 `name` |
| 刪除管理金鑰 | `DELETE` | `/v1/management-keys/{id}` | 軟刪除 |
| 啟用管理金鑰 | `POST` | `/v1/management-keys/{id}/enablement` | 立即生效 |
| 停用管理金鑰 | `POST` | `/v1/management-keys/{id}/disablement` | 立即生效 |

建立回應範例：

```json
{
  "code": 200,
  "message": "ok",
  "data": {
    "id": "3ecf9d8d-9b8f-4df6-9d30-7a693e1f0d1c",
    "name": "prod-admin",
    "key": "mk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "keyPreview": "mk-x************************xxxx5",
    "createdAt": "2026-04-23T10:00:00Z",
    "status": "Enabled",
    "enabled": true
  }
}
```

說明：

- `key` 只會在建立時返回一次
- `keyPreview` 為遮罩後的展示值

## 8. 使用 Management API Key 管理 Model API Keys

本節所有端點均使用：

```http
Authorization: Bearer <management_key>
```

### 8.1 請求欄位

目前建立或更新 Model API Key 時支援以下欄位：

| 欄位 | 類型 | 是否必填 | 說明 |
| --- | --- | --- | --- |
| `name` | `string` | 建立時必填 | 金鑰名稱 |
| `limit` | `number` | 否 | 用量上限 |
| `cycle` | `daily \| weekly \| monthly` | 否 | 用量重置週期 |
| `expiredAt` | `string` | 否 | UTC 到期時間戳記 |
| `groupId` | `string` | 否 | 群組 ID |

說明：

- 若你熟悉 OpenRouter 的 `limit_reset`，在目前 DGrid 實作中最接近的對應欄位是 `cycle`
- `expiredAt` 建議使用 ISO 8601 UTC 時間格式，例如 `2026-12-31T23:59:59Z`

### 8.2 查詢金鑰列表

- 方法：`GET`
- 路徑：`/api/v1/model-router/keys`
- Query 參數：
  - `page`：頁碼，預設 `1`
  - `size`：每頁筆數，預設 `20`，最大 `100`

實作說明：

- 分頁使用 `page` 與 `size`，不是 `limit` 與 `offset`
- 目前不支援部分名稱搜尋
- 目前不支援 `disabled` 篩選

請求範例：

```bash
curl "https://api.dgrid.ai/api/v1/model-router/keys?page=1&size=20" \
  -H "Authorization: Bearer <management_key>"
```

回應範例：

```json
{
  "code": 200,
  "message": "ok",
  "data": {
    "total": 2,
    "page": 1,
    "items": [
      {
        "id": "e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111",
        "name": "prod-key",
        "key": "sk-a************************f9x2d",
        "limit": 1000,
        "usageInCycle": 12.34,
        "usageInTotal": 98.76,
        "enabled": true,
        "cycle": "monthly",
        "expiredAt": "2026-12-31T23:59:59Z",
        "groupId": null,
        "groupName": ""
      }
    ]
  }
}
```

欄位說明：

- `key`：遮罩後的 API Key 值
- `usageInCycle`：目前週期內的使用量
- `usageInTotal`：累積總使用量
- `enabled`：目前是否啟用
- `groupName`：群組名稱

### 8.3 建立 Model API Key

- 方法：`POST`
- 路徑：`/api/v1/model-router/keys`

請求範例：

```bash
curl -X POST "https://api.dgrid.ai/api/v1/model-router/keys" \
  -H "Authorization: Bearer <management_key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "prod-key",
    "limit": 1000,
    "cycle": "monthly",
    "expiredAt": "2026-12-31T23:59:59Z"
  }'
```

請求體範例：

```json
{
  "name": "prod-key",
  "limit": 1000,
  "cycle": "monthly",
  "expiredAt": "2026-12-31T23:59:59Z"
}
```

回應範例：

```json
{
  "code": 200,
  "message": "ok",
  "data": {
    "id": "e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111",
    "key": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

說明：

- `key` 為完整 API Key 值，只會返回一次
- 請立即保存至安全的 Secrets 管理系統

### 8.4 查詢金鑰詳情

- 方法：`GET`
- 路徑：`/api/v1/model-router/keys/{id}`

實作說明：

- 目前使用的是 `id (UUID)`，不是 `key_hash`

請求範例：

```bash
curl "https://api.dgrid.ai/api/v1/model-router/keys/e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111" \
  -H "Authorization: Bearer <management_key>"
```

回應範例：

```json
{
  "code": 200,
  "message": "ok",
  "data": {
    "id": "e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111",
    "name": "prod-key",
    "key": "sk-a************************f9x2d",
    "limit": 1000,
    "usageInCycle": 12.34,
    "usageInTotal": 98.76,
    "enabled": true,
    "cycle": "monthly",
    "expiredAt": "2026-12-31T23:59:59Z",
    "groupId": null,
    "groupName": ""
  }
}
```

### 8.5 更新 Model API Key

- 方法：`PUT`
- 路徑：`/api/v1/model-router/keys/{id}`

目前支援更新的欄位：

- `name`
- `limit`
- `cycle`
- `groupId`

請求範例：

```bash
curl -X PUT "https://api.dgrid.ai/api/v1/model-router/keys/e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111" \
  -H "Authorization: Bearer <management_key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "prod-key-v2",
    "limit": 2000,
    "cycle": "monthly"
  }'
```

請求體範例：

```json
{
  "name": "prod-key-v2",
  "limit": 2000,
  "cycle": "monthly"
}
```

實作說明：

- 目前更新方法為 `PUT`，不是 `PATCH`

### 8.6 停用 Model API Key

- 方法：`POST`
- 路徑：`/api/v1/model-router/keys/{id}/disablement`

請求範例：

```bash
curl -X POST "https://api.dgrid.ai/api/v1/model-router/keys/e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111/disablement" \
  -H "Authorization: Bearer <management_key>"
```

停用後，該 API Key 將無法再用於模型呼叫。

### 8.7 啟用 Model API Key

- 方法：`POST`
- 路徑：`/api/v1/model-router/keys/{id}/enablement`

請求範例：

```bash
curl -X POST "https://api.dgrid.ai/api/v1/model-router/keys/e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111/enablement" \
  -H "Authorization: Bearer <management_key>"
```

### 8.8 刪除 Model API Key

- 方法：`DELETE`
- 路徑：`/api/v1/model-router/keys/{id}`

請求範例：

```bash
curl -X DELETE "https://api.dgrid.ai/api/v1/model-router/keys/e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111" \
  -H "Authorization: Bearer <management_key>"
```

實作說明：

- 目前為軟刪除，而非實體刪除

## 9. 使用範例

### 9.1 Python

```python
import requests

BASE = "https://api.dgrid.ai/api/v1/model-router"
MANAGEMENT_KEY = "mk-your-management-key"

headers = {
    "Authorization": f"Bearer {MANAGEMENT_KEY}",
    "Content-Type": "application/json"
}

# 1) 查詢列表
resp = requests.get(
    f"{BASE}/keys",
    headers=headers,
    params={"page": 1, "size": 20}
)
print("LIST:", resp.json())

# 2) 建立 key
resp = requests.post(
    f"{BASE}/keys",
    headers=headers,
    json={
        "name": "prod-key",
        "limit": 1000,
        "cycle": "monthly",
        "expiredAt": "2026-12-31T23:59:59Z"
    }
)
create_data = resp.json()
print("CREATE:", create_data)

key_id = create_data["data"]["id"]

# 3) 查詢 key
resp = requests.get(f"{BASE}/keys/{key_id}", headers=headers)
print("GET:", resp.json())

# 4) 更新 key
resp = requests.put(
    f"{BASE}/keys/{key_id}",
    headers=headers,
    json={
        "name": "prod-key-v2",
        "limit": 2000,
        "cycle": "monthly"
    }
)
print("UPDATE:", resp.json())

# 5) 停用 key
resp = requests.post(f"{BASE}/keys/{key_id}/disablement", headers=headers)
print("DISABLE:", resp.json())

# 6) 啟用 key
resp = requests.post(f"{BASE}/keys/{key_id}/enablement", headers=headers)
print("ENABLE:", resp.json())

# 7) 刪除 key
resp = requests.delete(f"{BASE}/keys/{key_id}", headers=headers)
print("DELETE:", resp.json())
```

### 9.2 TypeScript

```ts
const BASE = "https://api.dgrid.ai/api/v1/model-router";
const MANAGEMENT_KEY = "mk-your-management-key";

const headers: HeadersInit = {
  Authorization: `Bearer ${MANAGEMENT_KEY}`,
  "Content-Type": "application/json",
};

async function main() {
  const listResp = await fetch(`${BASE}/keys?page=1&size=20`, {
    method: "GET",
    headers,
  });
  console.log("LIST:", await listResp.json());

  const createResp = await fetch(`${BASE}/keys`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: "prod-key",
      limit: 1000,
      cycle: "monthly",
      expiredAt: "2026-12-31T23:59:59Z",
    }),
  });
  const createData = await createResp.json();
  console.log("CREATE:", createData);

  const keyId = createData.data.id;

  const getResp = await fetch(`${BASE}/keys/${keyId}`, {
    method: "GET",
    headers,
  });
  console.log("GET:", await getResp.json());

  const updateResp = await fetch(`${BASE}/keys/${keyId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      name: "prod-key-v2",
      limit: 2000,
      cycle: "monthly",
    }),
  });
  console.log("UPDATE:", await updateResp.json());

  const disableResp = await fetch(`${BASE}/keys/${keyId}/disablement`, {
    method: "POST",
    headers,
  });
  console.log("DISABLE:", await disableResp.json());

  const enableResp = await fetch(`${BASE}/keys/${keyId}/enablement`, {
    method: "POST",
    headers,
  });
  console.log("ENABLE:", await enableResp.json());

  const deleteResp = await fetch(`${BASE}/keys/${keyId}`, {
    method: "DELETE",
    headers,
  });
  console.log("DELETE:", await deleteResp.json());
}

main().catch(console.error);
```

### 9.3 JavaScript

```javascript
const BASE = "https://api.dgrid.ai/api/v1/model-router";
const MANAGEMENT_KEY = "mk-your-management-key";

const headers = {
  Authorization: `Bearer ${MANAGEMENT_KEY}`,
  "Content-Type": "application/json",
};

async function main() {
  let resp = await fetch(`${BASE}/keys?page=1&size=20`, {
    method: "GET",
    headers,
  });
  console.log("LIST:", await resp.json());

  resp = await fetch(`${BASE}/keys`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: "prod-key",
      limit: 1000,
      cycle: "monthly",
      expiredAt: "2026-12-31T23:59:59Z",
    }),
  });
  const createData = await resp.json();
  console.log("CREATE:", createData);

  const keyId = createData.data.id;

  resp = await fetch(`${BASE}/keys/${keyId}`, {
    method: "GET",
    headers,
  });
  console.log("GET:", await resp.json());

  resp = await fetch(`${BASE}/keys/${keyId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      name: "prod-key-v2",
      limit: 2000,
      cycle: "monthly",
    }),
  });
  console.log("UPDATE:", await resp.json());

  resp = await fetch(`${BASE}/keys/${keyId}/disablement`, {
    method: "POST",
    headers,
  });
  console.log("DISABLE:", await resp.json());

  resp = await fetch(`${BASE}/keys/${keyId}/enablement`, {
    method: "POST",
    headers,
  });
  console.log("ENABLE:", await resp.json());

  resp = await fetch(`${BASE}/keys/${keyId}`, {
    method: "DELETE",
    headers,
  });
  console.log("DELETE:", await resp.json());
}

main().catch(console.error);
```

## 10. HTTP 狀態碼與錯誤碼

| HTTP Status | Error Code | 說明 |
| --- | --- | --- |
| `400` | `40001` | 請求參數無效 |
| `401` | `40101` | 請求標頭中缺少 Management API Key |
| `401` | `40102` | Management API Key 無效、已過期或已停用 |
| `403` | `40301` | 權限不足，或目前的 key 類型無法存取此端點 |
| `404` | `40401` | 目標 key 不存在，或不屬於目前帳戶 |
| `429` | `42901` | 已超出頻率限制 |
| `500` | `50001` | 內部伺服器錯誤 |

## 11. 統一回應格式

成功回應使用以下結構：

```json
{
  "code": 200,
  "message": "ok",
  "data": {}
}
```

說明：

- 成功請求返回 HTTP `200`
- 建立回應中的 `data` 可能包含完整密鑰
- 列表與詳情端點通常返回遮罩後的金鑰值
- Management API Keys 與 Model API Keys 的完整密鑰都只會返回一次
