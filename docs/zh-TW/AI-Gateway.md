# DGrid AI Gateway 
DGrid AI Gateway 提供單一、整合式的 API，可存取 200 多種頂級 AI 模型。使用者可直接將自有 API 金鑰接入 Claude Code、Codex 及 Moltbot（Clawdbot）等工具，大幅降低整合複雜度與營運成本。

# 快速入門

DGrid AI Gateway 整合了數百種 AI 模型的介面。您無需在程式碼中處理不同模型的相容性調適——透過單一 API 端點與標準化的 API 請求格式，即可自由切換並存取 DGrid 提供的數百種模型。

> DGrid 官方 SDK 目前正積極開發中，敬請期待其正式發布。以下是可用的臨時請求方法，用於與 DGrid AI Gateway 互動。

### 先決條件

開始之前，您需要：

1. 取得有效的 `DGRID_API_KEY`（[操作指南](https://blog.dgrid.ai/posts/2026-01-04/)）。
2. 確保您的開發環境具備存取 `https://api.dgrid.ai` 的網路權限。
3. 若使用 SDK，請在專案中安裝對應的 OpenAI SDK 套件。

### 透過 cURL 直接發送 API 請求

您可透過 cURL 向 DGrid AI Gateway 端點發送 HTTP POST 請求。

```Bash
curl https://api.dgrid.ai/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DGRID_API_KEY" \
  -d '{
  "model": "openai/gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": "生命的意義是什麼？"
    }
  ]
}'
```

### 使用 OpenAI SDK（相容 DGrid）

DGrid AI Gateway 完全相容於 OpenAI SDK 規範。您只需修改 `baseURL` (並填入 `DGRID_API_KEY`), 即可快速遷移或整合。

#### 先決條件：安裝 OpenAI SDK

首先，在您的專案中安裝 OpenAI SDK：

```Bash
# 適用於 TypeScript/Node.js
npm install openai

# 適用於 Python
pip install openai
```

#### TypeScript 實作

```TypeScript
import OpenAI from 'openai';

// 透過 DGrid AI Gateway 設定初始化 OpenAI 用戶端
const openai = new OpenAI({
  baseURL: 'https://api.dgrid.ai/api/v1', // 指向 DGrid AI Gateway 端點
  apiKey: '<DGRID_API_KEY>', // 替換為您有效的 DGrid API 金鑰
  defaultHeaders: {
    'HTTP-Referer': '<您的網站網址>', // 選擇性：您應用程式的網站網址
    'X-Title': '<您的網站名稱>', // 選擇性：您應用程式的名稱
  },
});

// 發送聊天完成請求的非同步函式
async function getChatCompletion() {
  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o', // 指定目標模型（DGrid 支援格式）
      messages: [
        {
          role: 'user',
          content: '生命的意義是什麼？',
        },
      ],
    });

    // 列印回應結果
  console.log(completion.choices[0].message);
}

main();
```

#### Python 實作

```Python
from openai import OpenAI

# 透過 DGrid AI Gateway 設定初始化 OpenAI 用戶端
client = OpenAI(
  base_url="https://api.dgrid.ai/api/v1", # 指向 DGrid AI Gateway 端點
  api_key="<DGRID_API_KEY>", # 替換為您有效的 DGrid API 金鑰
)
completion = client.chat.completions.create(
      extra_headers={
        "HTTP-Referer": "<您的網站網址>", # 選擇性：您應用程式的網站網址
        "X-Title": "<您的網站名稱>", # 選擇性：您應用程式的名稱
      },
      model="openai/gpt-4o", # 指定目標模型（DGrid 支援格式）
      messages=[
        {
          "role": "user",
          "content": "生命的意義是什麼？"
        }
      ]
    )
    
    # 回傳並列印回應內容
print(completion.choices[0].message.content)
```

### 補充說明

1. ​**選擇性表頭**​：`HTTP-Referer` 與 `X-Title` 表頭為選擇性填寫，但填寫後有助於 DGrid 更好地識別您的應用程式，並提供更優化的服務支援。
2. ​**模型命名格式**​：model 參數採用 `[供應商]/[模型名稱]` 格式（例如 `openai/gpt-4o`），所有 DGrid 支援的模型均採用此統一格式，便於切換使用。
3. ​**SDK 開發更新**​：DGrid 官方 SDK 仍在開發中，未來將提供更多原生功能與優化效能 —— 敬請關注 DGrid 官方文件更新，以取得發布資訊。

