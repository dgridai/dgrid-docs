---
title: Model API
aside: false
outline: false
---

# Model API

The DGrid Model API consolidates DGrid's model-facing endpoints into a single reference section. It covers Gemini-compatible, OpenAI-compatible, Claude-compatible, and realtime interfaces so teams can choose the protocol that matches their application stack while keeping DGrid as the unified backend.

<div class="api-mini-note">
  Looking for tool-specific onboarding instead of endpoint reference? See <a href="/AI-Gateway-Integrations">Integration Tutorials</a>.
</div>

<div class="api-link-grid">
  <a class="api-link-card" href="/Model-API-Audio">
    <strong>Audio</strong>
    <span>Speech generation, transcription, translation, and Gemini-native audio understanding.</span>
  </a>
  <a class="api-link-card" href="/Model-API-Chat">
    <strong>Chat</strong>
    <span>Claude Messages, Gemini multimodal chat, OpenAI Chat Completions, and Responses API.</span>
  </a>
  <a class="api-link-card" href="/Model-API-Completions">
    <strong>Completions</strong>
    <span>Legacy OpenAI-compatible text completion requests for prompt-based generation.</span>
  </a>
  <a class="api-link-card" href="/Model-API-Embeddings">
    <strong>Embeddings</strong>
    <span>OpenAI-compatible and Gemini-native embedding endpoints for retrieval and semantic search.</span>
  </a>
  <a class="api-link-card" href="/Model-API-Images">
    <strong>Images</strong>
    <span>Generate and edit images through Gemini, OpenAI image APIs, or Qwen-compatible endpoints.</span>
  </a>
  <a class="api-link-card" href="/Model-API-Moderations">
    <strong>Moderations</strong>
    <span>Run content safety checks against text inputs before or after generation.</span>
  </a>
  <a class="api-link-card" href="/Model-API-Realtime">
    <strong>Realtime</strong>
    <span>OpenAI-compatible websocket sessions for low-latency text and audio conversations.</span>
  </a>
</div>

## Quickstart

Use the OpenAI-compatible chat endpoint for the fastest first integration:

```bash
curl https://api.dgrid.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DGRID_API_KEY" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "Hello from DGrid."
      }
    ]
  }'
```

## Authentication Formats

### OpenAI-Compatible

```http
Authorization: Bearer <DGRID_API_KEY>
Content-Type: application/json
```

Use this format for Chat Completions, Responses, Completions, Embeddings, Images, Moderations, audio speech endpoints, and realtime session creation.

### Claude-Compatible

```http
Authorization: Bearer <DGRID_API_KEY>
anthropic-version: 2023-06-01
Content-Type: application/json
```

Use this format for the `POST /v1/messages` interface.

### Gemini-Compatible

```http
Authorization: Bearer <DGRID_API_KEY>
Content-Type: application/json
```

Use this format for `generateContent` and `embedContent` requests.

## Endpoint Families

| Family | Primary Base Path | Best For |
| --- | --- | --- |
| Audio | `/v1/audio/*` and `/v1/models/*:generateContent` | Speech synthesis, transcription, translation, and multimodal audio understanding |
| Chat | `/v1/messages`, `/v1/chat/completions`, `/v1/responses`, `/v1/models/*:generateContent` | Conversational apps, multimodal assistants, tool calling |
| Completions | `/v1/completions` | Prompt-only text generation and legacy integrations |
| Embeddings | `/v1/embeddings`, `/v1/models/*:embedContent` | Search, clustering, retrieval, ranking |
| Images | `/v1/images/*`, `/v1/chat/completions`, `/v1/models/*:generateContent` | Image generation and editing across multiple model formats |
| Moderations | `/v1/moderations` | Content safety filtering and policy checks |
| Realtime | `/v1/realtime`, `/v1/realtime/sessions` | Low-latency streaming conversations over websocket |

## Best Practices

1. Store the DGrid API key on the server side and never expose it in public clients or repositories.
2. Prefer the OpenAI-compatible format when you want the broadest SDK compatibility with minimal migration effort.
3. Use provider-native formats only when you need provider-specific payload features such as Gemini multimodal parts or Claude tool payloads.
4. Keep request and response examples in sync with your target model family, because parameter names differ between OpenAI, Claude, and Gemini styles.
