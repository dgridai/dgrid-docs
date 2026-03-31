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

完整教學（Blog）：[How to Configure and Use DGrid AI Gateway in Cursor](https://blog.dgrid.ai/posts/2026-02-18/)

## OpenAI SDK（Node.js / Python）

- 請參考：[AI Gateway 快速入門](/zh-TW/AI-Gateway#快速入門)

## OpenClaw

你可以在 OpenClaw 中透過 **DGrid AI Gateway** 的 OpenAI 相容端點完成模型連線設定。

1. 開啟 OpenClaw 的模型或 provider 設定頁面。
2. 將 API Base URL 設為 `https://api.dgrid.ai/v1`。
3. 在 API Key 欄位填入 `DGRID_API_KEY`。
4. 選擇一個 DGrid 支援的模型 ID。
5. 儲存設定後，送出一個測試請求確認連線正常。

<video controls preload="metadata" style="width: 100%; border-radius: 12px; margin-top: 12px;">
  <source src="/dgrid-openclaw-demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## Blog 整合教學彙整

- **AI as Workspace (AIaW)**：[Step-by-Step Guide: Configure DGrid AI Gateway in AI as Workspace (AIaW)](https://blog.dgrid.ai/posts/2026-03-10/)
- **AnythingLLM**：[Tutorial: Using DGrid AI Gateway with AnythingLLM](https://blog.dgrid.ai/posts/2026-01-30/)
- **Chatbox**：[Step-by-Step Guide: Configure DGrid AI Gateway in Chatbox](https://blog.dgrid.ai/posts/2026-03-09/)
- **Claude Code**：[Use Claude Code with DGrid](https://blog.dgrid.ai/posts/2026-03-12/)
- **Codex CLI**：[Using Codex CLI with DGrid: A Complete Guide](https://blog.dgrid.ai/posts/2026-03-23/)
- **LibreChat**：[Using DGrid with LibreChat: A Step-by-Step Guide](https://blog.dgrid.ai/posts/2026-01-28/)
- **LobeChat**：[Configuring and Utilizing DGrid AI Gateway in LobeChat: A Full Guide](https://blog.dgrid.ai/posts/2026-02-09/)
- **Open WebUI**：[Using DGrid AI Gateway with Open WebUI: A Comprehensive Guide](https://blog.dgrid.ai/posts/2026-01-22_2/)
- **OpenClaw（Agent 平台）**：[Supercharging OpenClaw with DGrid: The Ultimate AI Agent Setup](https://blog.dgrid.ai/posts/2026-02-02/)
- **OpenClaw（免寫程式）**：[Step-by-Step Guide: OpenClaw Installation & DGrid AI Gateway Setup (No Code Required)](https://blog.dgrid.ai/posts/2026-02-27/)
- **Vercel AI SDK**：[How to Use DGrid AI Gateway with the Vercel AI SDK](https://blog.dgrid.ai/posts/2026-03-26/)
