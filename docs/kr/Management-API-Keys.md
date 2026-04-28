# Management API Keys 가이드

Management API Keys는 Model API Keys의 전체 라이프사이클을 프로그래밍 방식으로 관리할 수 있도록 해줍니다. 수동 콘솔 작업에 의존하지 않고 키 생성, 배포, 로테이션, 활성화, 비활성화, 폐기를 처리해야 하는 엔터프라이즈 팀, SaaS 플랫폼, 자동화 시스템을 위해 설계되었습니다.

Management API Keys는 관리용 자격 증명으로, 키 관리 작업에만 사용할 수 있습니다. 모델 추론 또는 completion 엔드포인트 호출에는 사용할 수 없습니다.

## 1. 개요

Management API Keys는 다음과 같은 시나리오에 적합합니다.

- 고객, 프로젝트, 환경별로 별도의 Model API Key 발급
- 하위 Model API Keys에 사용량 제한과 자동 초기화 주기 적용
- 키 로테이션, 비활성화, 폐기를 프로그래밍 방식으로 수행
- SaaS, 멀티테넌트, 컴플라이언스 중심 워크플로우에서 최소 권한 기반 키 관리 구현

핵심 기능:

- 키 관리 작업에 대한 엄격한 권한 분리
- Model API Keys 전체 라이프사이클 자동화
- 설정 가능한 사용량 제한 및 초기화 주기
- 서버 측 서비스, 내부 도구, 자동 프로비저닝 워크플로우에 적합

## 2. API 영역과 인증 경계

키 관리는 서로 다른 인증 모델을 사용하는 두 개의 API 영역으로 나뉩니다.

| API 영역 | 용도 | 인증 방식 |
| --- | --- | --- |
| `/v1/management-keys` | Management API Keys 자체 관리 | `JWT` |
| `/api/v1/model-router/keys` | Management API Key를 사용하여 Model API Keys 관리 | `Authorization: Bearer <management_key>` |

중요:

- `Management API Key`는 `/api/v1/model-router/keys`에서만 사용할 수 있습니다
- `Management API Key`는 `/v1/management-keys`에서는 사용할 수 없습니다
- `/v1/management-keys`는 `JWT` 인증만 지원합니다
- 전체 시크릿 값은 키 생성 시 한 번만 반환되며 이후 다시 조회할 수 없습니다

## 3. 기본 규칙

- 계정당 최대 `10`개의 Management API Keys를 생성할 수 있습니다
- Management API Keys는 생성 즉시 활성화됩니다
- 전체 Management API Key 시크릿은 한 번만 반환됩니다
- 이후 목록 및 상세 응답에서는 마스킹된 키 값만 반환됩니다
- Model API Keys는 현재 영구 삭제가 아닌 소프트 삭제 방식으로 처리됩니다

## 4. Base URL

공개 API의 base URL은 다음과 같습니다.

```text
https://api.dgrid.ai
```

이 문서에서 사용하는 라우트 prefix는 다음과 같습니다.

```text
/v1/management-keys
/api/v1/model-router/keys
```

## 5. Management API Key 생성

Management API를 사용하기 전에 먼저 DGrid 콘솔에서 Management API Key를 생성해야 합니다.

1. `Management API Keys` 페이지를 엽니다
2. `Create`를 클릭합니다
3. 키 이름을 입력합니다
4. 필요한 보안 인증을 완료합니다
5. 생성 직후 키를 복사하여 안전하게 저장합니다

자체 UI에서 이 흐름을 제공하는 경우, 시크릿이 한 번만 표시되므로 즉시 저장해야 한다는 점을 명확히 안내하는 것이 좋습니다.

## 6. 인증

이 문서에는 두 가지 인증 방식이 포함되어 있습니다.

- `/v1/management-keys` 하위 엔드포인트는 `JWT`가 필요합니다
- `/api/v1/model-router/keys` 하위 엔드포인트는 Management API Key가 필요합니다

`/api/v1/model-router/keys` 엔드포인트를 호출할 때는 다음 헤더를 사용합니다.

```http
Authorization: Bearer <management_key>
```

## 7. Management API Key 라이프사이클 엔드포인트

다음 엔드포인트는 Management API Keys의 생성, 조회, 수정, 활성화, 비활성화, 삭제에 사용되며, 모두 `JWT` 인증이 필요합니다.

| 작업 | 메서드 | 경로 | 비고 |
| --- | --- | --- | --- |
| 관리 키 생성 | `POST` | `/v1/management-keys` | 전체 키는 한 번만 반환됨 |
| 관리 키 목록 조회 | `GET` | `/v1/management-keys` | 페이지네이션 지원 |
| 관리 키 수정 | `PUT` | `/v1/management-keys/{id}` | 현재는 `name`만 수정 가능 |
| 관리 키 삭제 | `DELETE` | `/v1/management-keys/{id}` | 소프트 삭제 |
| 관리 키 활성화 | `POST` | `/v1/management-keys/{id}/enablement` | 즉시 적용 |
| 관리 키 비활성화 | `POST` | `/v1/management-keys/{id}/disablement` | 즉시 적용 |

생성 응답 예시:

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

설명:

- `key`는 생성 시 한 번만 반환됩니다
- `keyPreview`는 마스킹된 표시값입니다

## 8. Management API Key로 Model API Keys 관리

이 섹션의 모든 엔드포인트는 다음 헤더를 사용합니다.

```http
Authorization: Bearer <management_key>
```

### 8.1 요청 필드

현재 구현에서는 Model API Key 생성 또는 수정 시 다음 필드를 지원합니다.

| 필드 | 타입 | 필수 여부 | 설명 |
| --- | --- | --- | --- |
| `name` | `string` | 생성 시 필수 | 키 이름 |
| `limit` | `number` | 아니오 | 사용량 한도 |
| `cycle` | `daily \| weekly \| monthly` | 아니오 | 한도 초기화 주기 |
| `expiredAt` | `string` | 아니오 | UTC 기준 만료 타임스탬프 |
| `groupId` | `string` | 아니오 | 그룹 ID |

설명:

- OpenRouter의 `limit_reset`에 익숙하다면, 현재 DGrid 구현에서 가장 가까운 대응 개념은 `cycle`입니다
- `expiredAt`는 `2026-12-31T23:59:59Z`와 같은 ISO 8601 UTC 형식을 사용해야 합니다

### 8.2 키 목록 조회

- 메서드: `GET`
- 경로: `/api/v1/model-router/keys`
- Query 파라미터:
  - `page`: 페이지 번호, 기본값 `1`
  - `size`: 페이지 크기, 기본값 `20`, 최대 `100`

구현 참고:

- 페이지네이션은 `limit`/`offset`이 아니라 `page`와 `size`를 사용합니다
- 현재 부분 이름 검색은 지원하지 않습니다
- 현재 `disabled` 필터링은 지원하지 않습니다

요청 예시:

```bash
curl "https://api.dgrid.ai/api/v1/model-router/keys?page=1&size=20" \
  -H "Authorization: Bearer <management_key>"
```

응답 예시:

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

필드 설명:

- `key`: 마스킹된 API key 값
- `usageInCycle`: 현재 주기 내 사용량
- `usageInTotal`: 누적 총 사용량
- `enabled`: 현재 활성화 상태
- `groupName`: 그룹 이름

### 8.3 Model API Key 생성

- 메서드: `POST`
- 경로: `/api/v1/model-router/keys`

요청 예시:

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

요청 본문 예시:

```json
{
  "name": "prod-key",
  "limit": 1000,
  "cycle": "monthly",
  "expiredAt": "2026-12-31T23:59:59Z"
}
```

응답 예시:

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

설명:

- `key`는 전체 API key 값이며 한 번만 반환됩니다
- 반드시 안전한 시크릿 관리 시스템에 즉시 저장해야 합니다

### 8.4 키 상세 조회

- 메서드: `GET`
- 경로: `/api/v1/model-router/keys/{id}`

구현 참고:

- 현재 구현은 `key_hash`가 아니라 `id (UUID)`를 사용합니다

요청 예시:

```bash
curl "https://api.dgrid.ai/api/v1/model-router/keys/e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111" \
  -H "Authorization: Bearer <management_key>"
```

응답 예시:

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

### 8.5 Model API Key 수정

- 메서드: `PUT`
- 경로: `/api/v1/model-router/keys/{id}`

현재 수정 가능한 필드:

- `name`
- `limit`
- `cycle`
- `groupId`

요청 예시:

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

요청 본문 예시:

```json
{
  "name": "prod-key-v2",
  "limit": 2000,
  "cycle": "monthly"
}
```

구현 참고:

- 현재 업데이트 메서드는 `PATCH`가 아니라 `PUT`입니다

### 8.6 Model API Key 비활성화

- 메서드: `POST`
- 경로: `/api/v1/model-router/keys/{id}/disablement`

요청 예시:

```bash
curl -X POST "https://api.dgrid.ai/api/v1/model-router/keys/e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111/disablement" \
  -H "Authorization: Bearer <management_key>"
```

비활성화되면 해당 API key는 더 이상 모델 호출에 사용할 수 없습니다.

### 8.7 Model API Key 활성화

- 메서드: `POST`
- 경로: `/api/v1/model-router/keys/{id}/enablement`

요청 예시:

```bash
curl -X POST "https://api.dgrid.ai/api/v1/model-router/keys/e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111/enablement" \
  -H "Authorization: Bearer <management_key>"
```

### 8.8 Model API Key 삭제

- 메서드: `DELETE`
- 경로: `/api/v1/model-router/keys/{id}`

요청 예시:

```bash
curl -X DELETE "https://api.dgrid.ai/api/v1/model-router/keys/e8f9c547-4f0c-4d8b-8e1b-8ef9b0aa1111" \
  -H "Authorization: Bearer <management_key>"
```

구현 참고:

- 현재 삭제는 물리 삭제가 아닌 소프트 삭제입니다

## 9. End-to-End 예시

### 9.1 Python

```python
import requests

BASE = "https://api.dgrid.ai/api/v1/model-router"
MANAGEMENT_KEY = "mk-your-management-key"

headers = {
    "Authorization": f"Bearer {MANAGEMENT_KEY}",
    "Content-Type": "application/json"
}

# 1) 목록 조회
resp = requests.get(
    f"{BASE}/keys",
    headers=headers,
    params={"page": 1, "size": 20}
)
print("LIST:", resp.json())

# 2) key 생성
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

# 3) key 조회
resp = requests.get(f"{BASE}/keys/{key_id}", headers=headers)
print("GET:", resp.json())

# 4) key 수정
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

# 5) key 비활성화
resp = requests.post(f"{BASE}/keys/{key_id}/disablement", headers=headers)
print("DISABLE:", resp.json())

# 6) key 활성화
resp = requests.post(f"{BASE}/keys/{key_id}/enablement", headers=headers)
print("ENABLE:", resp.json())

# 7) key 삭제
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

## 10. HTTP 상태 코드 및 오류 코드

| HTTP Status | Error Code | 설명 |
| --- | --- | --- |
| `400` | `40001` | 잘못된 요청 파라미터 |
| `401` | `40101` | 요청 헤더에 Management API Key가 없음 |
| `401` | `40102` | Management API Key가 유효하지 않거나, 만료되었거나, 비활성화됨 |
| `403` | `40301` | 권한이 없거나 현재 key 유형으로는 이 엔드포인트에 접근할 수 없음 |
| `404` | `40401` | 대상 key를 찾을 수 없거나 현재 계정에 속하지 않음 |
| `429` | `42901` | rate limit 초과 |
| `500` | `50001` | 내부 서버 오류 |

## 11. 표준 응답 형식

성공 응답은 다음 envelope 형식을 사용합니다.

```json
{
  "code": 200,
  "message": "ok",
  "data": {}
}
```

설명:

- 성공 요청은 HTTP `200`을 반환합니다
- 생성 응답의 `data`에는 전체 시크릿 키가 포함될 수 있습니다
- 목록 및 상세 엔드포인트는 일반적으로 마스킹된 키 값을 반환합니다
- Management API Keys와 Model API Keys의 전체 시크릿은 모두 한 번만 반환됩니다
