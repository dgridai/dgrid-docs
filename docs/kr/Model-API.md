---
title: Model API
aside: false
outline: false
---

# Model API

DGrid Model API는 DGrid에서 제공하는 모델 인터페이스를 하나의 참조 섹션으로 정리한 문서입니다. Gemini 호환, OpenAI 호환, Claude 호환, 그리고 realtime websocket 인터페이스까지 포함해 기존 애플리케이션 스택에 맞는 프로토콜을 선택하면서도 DGrid를 공통 백엔드로 유지할 수 있습니다.

<div class="api-mini-note">
  엔드포인트 레퍼런스가 아니라 도구 통합 가이드가 필요하다면 <a href="/kr/AI-Gateway-Integrations">통합 튜토리얼</a>을 참고하세요.
</div>

<div class="api-link-grid">
  <a class="api-link-card" href="/kr/Model-API-Audio">
    <strong>오디오</strong>
    <span>음성 합성, 전사, 번역, Gemini 네이티브 오디오 이해를 다룹니다.</span>
  </a>
  <a class="api-link-card" href="/kr/Model-API-Chat">
    <strong>채팅</strong>
    <span>Claude Messages, Gemini 멀티모달 채팅, OpenAI Chat Completions, Responses API를 포함합니다.</span>
  </a>
  <a class="api-link-card" href="/kr/Model-API-Completions">
    <strong>컴플리션</strong>
    <span>프롬프트 기반 생성 워크플로를 위한 전통적인 OpenAI 호환 텍스트 컴플리션을 제공합니다.</span>
  </a>
  <a class="api-link-card" href="/kr/Model-API-Embeddings">
    <strong>임베딩</strong>
    <span>OpenAI 호환 및 Gemini 네이티브 벡터 생성을 지원하여 검색과 의미 기반 워크로드에 적합합니다.</span>
  </a>
  <a class="api-link-card" href="/kr/Model-API-Images">
    <strong>이미지</strong>
    <span>Gemini, OpenAI 이미지 API, Qwen 호환 형식으로 이미지 생성과 편집을 수행할 수 있습니다.</span>
  </a>
  <a class="api-link-card" href="/kr/Model-API-Moderations">
    <strong>모더레이션</strong>
    <span>사용자 입력이나 모델 출력에 대해 콘텐츠 안전 검사를 수행합니다.</span>
  </a>
  <a class="api-link-card" href="/kr/Model-API-Realtime">
    <strong>실시간</strong>
    <span>websocket 기반의 저지연 텍스트 및 음성 상호작용 워크플로를 지원합니다.</span>
  </a>
</div>

## 빠른 시작

가장 빠르게 통합하려면 OpenAI 호환 채팅 엔드포인트부터 사용하는 것이 좋습니다.

```bash
curl https://api.dgrid.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DGRID_API_KEY" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "안녕하세요, DGrid입니다."
      }
    ]
  }'
```

## 인증 형식

### OpenAI 호환 형식

```http
Authorization: Bearer <DGRID_API_KEY>
Content-Type: application/json
```

Chat Completions, Responses, Completions, Embeddings, Images, Moderations, 오디오 speech 엔드포인트, realtime session 생성에 사용합니다.

### Claude 호환 형식

```http
Authorization: Bearer <DGRID_API_KEY>
anthropic-version: 2023-06-01
Content-Type: application/json
```

`POST /v1/messages` 인터페이스에 사용합니다.

### Gemini 호환 형식

```http
Authorization: Bearer <DGRID_API_KEY>
Content-Type: application/json
```

`generateContent` 와 `embedContent` 요청에 사용합니다.

## 엔드포인트 패밀리

| 패밀리 | 주요 Base Path | 적합한 용도 |
| --- | --- | --- |
| 오디오 | `/v1/audio/*` 및 `/v1/models/*:generateContent` | 음성 합성, 전사, 번역, 멀티모달 오디오 이해 |
| 채팅 | `/v1/messages`, `/v1/chat/completions`, `/v1/responses`, `/v1/models/*:generateContent` | 대화형 앱, 멀티모달 어시스턴트, 도구 호출 |
| 컴플리션 | `/v1/completions` | 프롬프트 기반 텍스트 생성과 레거시 통합 |
| 임베딩 | `/v1/embeddings`, `/v1/models/*:embedContent` | 검색, 클러스터링, 검색 증강, 유사도 계산 |
| 이미지 | `/v1/images/*`, `/v1/chat/completions`, `/v1/models/*:generateContent` | 다양한 모델 형식으로 이미지 생성과 편집 |
| 모더레이션 | `/v1/moderations` | 콘텐츠 안전 및 정책 검사 |
| 실시간 | `/v1/realtime`, `/v1/realtime/sessions` | 저지연 스트리밍 텍스트 및 음성 상호작용 |

## 모범 사례

1. DGrid API 키는 서버 측에 보관하고 공개 클라이언트나 저장소에 노출하지 마세요.
2. SDK 호환성과 빠른 마이그레이션이 중요하면 OpenAI 호환 형식을 우선 사용하세요.
3. Gemini 멀티모달 parts나 Claude 도구 페이로드 같은 기능이 필요할 때만 공급자 네이티브 형식을 사용하세요.
4. OpenAI, Claude, Gemini는 필드 이름이 다르므로 요청과 응답 예제를 목표 모델 패밀리에 맞춰 유지하세요.
