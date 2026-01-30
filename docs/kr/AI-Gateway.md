# DGrid AI 게이트웨이

DGrid AI 게이트웨이는 200개 이상의 최고 수준 AI 모델에 접근할 수 있는 단일 통합 API를 제공합니다. 사용자는 Claude Code, Codex, Moltbot(Clawdbot)과 같은 도구에 본인의 API 키를 직접 연결할 수 있어, 통합 복잡성과 운영 비용을 크게 줄일 수 있습니다.

# 빠른 시작

DGrid AI 게이트웨이는 수백 개의 AI 모델 인터페이스를 통합합니다. 코드에서 다양한 모델에 대한 호환성 적응을 처리할 필요가 없습니다 — 단일 API 엔드포인트와 표준화된 API 요청 형식만으로 DGrid에서 제공하는 수백 개의 모든 모델을 자유롭게 전환하고 접근할 수 있습니다.

> DGrid 공식 SDK는 현재 적극적으로 개발 중이며, 출시를 기다려 주십시오. 아래는 DGrid AI 게이트웨이와 상호작용하기 위한 사용 가능한 임시 요청 방법입니다.

### 선행 조건

시작하기 전에 다음 작업을 완료해야 합니다:

1. 유효한 `DGRID_API_KEY`를 획득합니다 ([가이드](https://blog.dgrid.ai/posts/2026-01-04/)).
2. 개발 환경에서 `https://api.dgrid.ai`에 접근할 수 있는 네트워크 권한이 있는지 확인합니다.
3. SDK 사용 시, 프로젝트에 해당 OpenAI SDK 패키지를 설치합니다.

### cURL을 통한 직접 API 요청

cURL을 사용하여 DGrid AI 게이트웨이 엔드포인트에 직접 HTTP POST 요청을 보낼 수 있습니다.

```Bash
curl https://api.dgrid.ai/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DGRID_API_KEY" \
  -d '{
  "model": "openai/gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": "삶의 의미는 무엇인가?"
    }
  ]
}'
```

### OpenAI SDK 사용 (DGrid 호환)

DGrid AI 게이트웨이는 OpenAI SDK 사양과 완전히 호환됩니다. `baseURL`을 수정하고(그리고 `DGRID_API_KEY`를 채우면) 빠르게 마이그레이션하거나 통합할 수 있습니다.

#### 선행 조건: OpenAI SDK 설치

먼저, 프로젝트에 OpenAI SDK를 설치합니다:

```Bash
# TypeScript/Node.js용
npm install openai

# Python용
pip install openai
```

#### TypeScript 구현

```TypeScript
import OpenAI from 'openai';

// DGrid AI 게이트웨이 구성으로 OpenAI 클라이언트 초기화
const openai = new OpenAI({
  baseURL: 'https://api.dgrid.ai/api/v1', // DGrid AI 게이트웨이 엔드포인트를 가리킴
  apiKey: '<DGRID_API_KEY>', // 유효한 DGrid API 키로 교체
  defaultHeaders: {
    'HTTP-Referer': '<사이트 URL>', // 선택 사항: 애플리케이션의 사이트 URL
    'X-Title': '<사이트 이름>', // 선택 사항: 애플리케이션의 이름
  },
});

// 채팅 완료 요청을 보내는 비동기 함수
async function getChatCompletion() {
  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o', // 대상 모델 지정 (DGrid 지원 형식)
      messages: [
        {
          role: 'user',
          content: '삶의 의미는 무엇인가?',
        },
      ],
    });

    // 응답 결과 출력
  console.log(completion.choices[0].message);
}

main();
```

#### Python 구현

```Python
from openai import OpenAI

# DGrid AI 게이트웨이 구성으로 OpenAI 클라이언트 초기화
client = OpenAI(
  base_url="https://api.dgrid.ai/api/v1", # DGrid AI 게이트웨이 엔드포인트를 가리킴
  api_key="<DGRID_API_KEY>", # 유효한 DGrid API 키로 교체
)
completion = client.chat.completions.create(
      extra_headers={
        "HTTP-Referer": "<사이트 URL>", # 선택 사항: 애플리케이션의 사이트 URL
        "X-Title": "<사이트 이름>", # 선택 사항: 애플리케이션의 이름
      },
      model="openai/gpt-4o", # 대상 모델 지정 (DGrid 지원 형식)
      messages=[
        {
          "role": "user",
          "content": "삶의 의미는 무엇인가?"
        }
      ]
    )
    
    # 응답 내용 반환 및 출력
print(completion.choices[0].message.content)
```

### 추가 참고사항

1. ​**선택적 헤더**​: `HTTP-Referer`와 `X-Title` 헤더는 선택 사항이지만, 이를 채우면 DGrid에서 애플리케이션을 더 잘 식별하고 보다 최적화된 서비스 지원을 제공하는 데 도움이 됩니다.
2. ​**모델 명명 형식**​: model 매개변수는 `[제공업체]/[모델명]` 형식을 사용합니다 (예: `openai/gpt-4o`). 이는 DGrid에서 지원하는 모든 모델에서 일관되게 적용되어 쉽게 전환할 수 있습니다.
3. ​**SDK 개발 업데이트**​: 공식 DGrid SDK는 개발 중이며, 더 많은 네이티브 기능과 최적화된 성능을 제공할 것입니다 — 출시 정보를 확인하려면 DGrid 공식 문서 업데이트를 주시해 주십시오.
