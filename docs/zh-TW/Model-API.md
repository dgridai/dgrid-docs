---
title: Model API
aside: false
outline: false
---

# Model API

DGrid Model API 將各類模型介面整理為統一的參考區塊，涵蓋 Gemini 相容、OpenAI 相容、Claude 相容，以及即時語音 websocket 介面，讓團隊可以依照既有技術棧選擇對應協定，同時仍以 DGrid 作為統一後端。

<div class="api-mini-note">
  如果您現在要找的是工具整合教學，而不是端點參考，請改看 <a href="/zh-TW/AI-Gateway-Integrations">整合教學</a>。
</div>

<div class="api-link-grid">
  <a class="api-link-card" href="/zh-TW/Model-API-Audio">
    <strong>音訊</strong>
    <span>涵蓋語音生成、音訊轉錄、音訊翻譯，以及 Gemini 原生音訊理解。</span>
  </a>
  <a class="api-link-card" href="/zh-TW/Model-API-Chat">
    <strong>聊天</strong>
    <span>包含 Claude Messages、Gemini 多模態聊天、OpenAI Chat Completions 與 Responses API。</span>
  </a>
  <a class="api-link-card" href="/zh-TW/Model-API-Completions">
    <strong>補全</strong>
    <span>提供傳統 OpenAI 相容文字補全介面，適合 prompt 導向生成流程。</span>
  </a>
  <a class="api-link-card" href="/zh-TW/Model-API-Embeddings">
    <strong>嵌入</strong>
    <span>支援 OpenAI 相容與 Gemini 原生向量生成，適用於檢索與語意搜尋。</span>
  </a>
  <a class="api-link-card" href="/zh-TW/Model-API-Images">
    <strong>圖像</strong>
    <span>可透過 Gemini、OpenAI 圖像介面或 Qwen 相容格式生成與編輯圖像。</span>
  </a>
  <a class="api-link-card" href="/zh-TW/Model-API-Moderations">
    <strong>審查</strong>
    <span>在生成前後針對文字內容進行安全審查與策略判定。</span>
  </a>
  <a class="api-link-card" href="/zh-TW/Model-API-Realtime">
    <strong>即時語音</strong>
    <span>透過 websocket 建立即時文字與語音互動工作流。</span>
  </a>
</div>

## 快速開始

若要最快完成第一個整合，建議先使用 OpenAI 相容聊天端點：

```bash
curl https://api.dgrid.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DGRID_API_KEY" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "你好，這裡是 DGrid。"
      }
    ]
  }'
```

## 認證格式

### OpenAI 相容格式

```http
Authorization: Bearer <DGRID_API_KEY>
Content-Type: application/json
```

適用於 Chat Completions、Responses、Completions、Embeddings、Images、Moderations、音訊 speech 端點，以及 realtime session 建立。

### Claude 相容格式

```http
Authorization: Bearer <DGRID_API_KEY>
anthropic-version: 2023-06-01
Content-Type: application/json
```

適用於 `POST /v1/messages`。

### Gemini 相容格式

```http
Authorization: Bearer <DGRID_API_KEY>
Content-Type: application/json
```

適用於 `generateContent` 與 `embedContent` 類型請求。

## 端點家族

| 類別 | 主要 Base Path | 適用情境 |
| --- | --- | --- |
| 音訊 | `/v1/audio/*` 與 `/v1/models/*:generateContent` | 語音生成、轉錄、翻譯，以及多模態音訊理解 |
| 聊天 | `/v1/messages`、`/v1/chat/completions`、`/v1/responses`、`/v1/models/*:generateContent` | 對話式應用、多模態助理、工具調用 |
| 補全 | `/v1/completions` | 純 prompt 文字生成與舊版整合 |
| 嵌入 | `/v1/embeddings`、`/v1/models/*:embedContent` | 搜尋、分群、檢索與相似度計算 |
| 圖像 | `/v1/images/*`、`/v1/chat/completions`、`/v1/models/*:generateContent` | 跨模型生成與編輯圖像 |
| 審查 | `/v1/moderations` | 內容安全與策略檢查 |
| 即時語音 | `/v1/realtime`、`/v1/realtime/sessions` | 低延遲串流文字與語音互動 |

## 最佳實踐

1. 請將 DGrid API 金鑰保存在伺服器端，不要暴露在公開前端或程式碼倉庫中。
2. 若您重視 SDK 相容性與最小遷移成本，優先採用 OpenAI 相容格式。
3. 若您需要 Gemini 多模態 parts 或 Claude 工具載荷等特定能力，再使用供應商原生格式。
4. 請讓請求與回應範例與目標模型家族保持一致，因為 OpenAI、Claude、Gemini 的欄位命名不同。
