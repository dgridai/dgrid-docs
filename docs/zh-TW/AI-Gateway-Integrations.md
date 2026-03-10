# AI Gateway 整合教學

本頁彙整各種常見工具/SDK 的 **DGrid AI Gateway** 整合教學，方便你在同一頁面快速跳轉與查找。

## Cursor（覆寫 OpenAI Base URL）

1. 取得你的 `DGRID_API_KEY`（請先看 [AI Gateway](/zh-TW/AI-Gateway) 的先決條件）。
2. 開啟 **Cursor Settings** → **Models**。
3. 在 **API Keys** 區塊啟用 **Override OpenAI Base URL**。
4. 將 Base URL 設為：
   - `https://api.dgrid.ai/v1`
5. 在 **OpenAI API Key** 貼上你的 `DGRID_API_KEY`。
6. 模型名稱使用 DGrid 統一格式（例如：`openai/gpt-4o`）。

![Cursor settings example](/2_SJd0fdj09dfjKLDFk.png)

完整教學（Blog）：[How to Configure and Use DGrid RPC API in Cursor](https://blog.dgrid.ai/posts/2026-02-18/)

## OpenAI SDK（Node.js / Python）

- 請參考：[AI Gateway 快速入門](/zh-TW/AI-Gateway#快速入門)

## Blog 整合教學彙整

- **Open WebUI**：[Using DGrid RPC with Open WebUI: A Comprehensive Guide](https://blog.dgrid.ai/posts/2026-01-22_2/)
- **LibreChat**：[Using DGrid with LibreChat: A Step-by-Step Guide](https://blog.dgrid.ai/posts/2026-01-28/)
- **AnythingLLM**：[Tutorial: Using DGrid RPC API with AnythingLLM](https://blog.dgrid.ai/posts/2026-01-30/)
- **Openclaw（Agent 平台）**：[Supercharging Openclaw with DGrid: The Ultimate AI Agent Setup](https://blog.dgrid.ai/posts/2026-02-02/)
- **LobeChat**：[Configuring and Utilizing DGrid RPC Service in LobeChat: A Full Guide](https://blog.dgrid.ai/posts/2026-02-09/)
- **OpenClaw（免寫程式）**：[Step-by-Step Guide: OpenClaw Installation & DGrid AI RPC Service Setup (No Code Required)](https://blog.dgrid.ai/posts/2026-02-27/)


