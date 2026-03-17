# AI Gateway Integration Tutorials

This page collects practical integration tutorials for using **DGrid AI Gateway** in common developer tools and SDKs.

## Cursor (Override OpenAI Base URL)

1. Get your `DGRID_API_KEY` (see the prerequisite in [AI Gateway](/AI-Gateway)).
2. Open **Cursor Settings** → **Models**.
3. Under **API Keys**, enable **Override OpenAI Base URL**.
4. Set the base URL to:
   - `https://api.dgrid.ai/v1`
5. Paste your `DGRID_API_KEY` into **OpenAI API Key**.
6. Pick any supported model name using the DGrid format (for example: `openai/gpt-4o`).

![Cursor settings example](/2_SJd0fdj09dfjKLDFk.png)

Full tutorial: [How to Configure and Use DGrid RPC API in Cursor](https://blog.dgrid.ai/posts/2026-02-18/)

## OpenAI SDK (Node.js / Python)

- See: [AI Gateway Quickstart](/AI-Gateway#quickstart)

## OpenClaw

You can configure OpenClaw to route requests through **DGrid AI Gateway** using the OpenAI-compatible endpoint.

1. Open your OpenClaw model/provider settings.
2. Set the API base URL to `https://api.dgrid.ai/v1`.
3. Paste your `DGRID_API_KEY` into the API key field.
4. Select a supported DGrid model ID.
5. Save the configuration and run a quick test request.

<video controls preload="metadata" style="width: 100%; border-radius: 12px; margin-top: 12px;">
  <source src="/dgrid-openclaw-demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## Blog integration tutorials (collected)

- **AI as Workspace (AIaW)**: [Step-by-Step Guide: Configure DGrid RPC in AI as Workspace (AIaW)](https://blog.dgrid.ai/posts/2026-03-10/)
- **Chatbox**: [Step-by-Step Guide: Configure DGrid RPC in Chatbox](https://blog.dgrid.ai/posts/2026-03-09/)
- **Claude Code**: [Use Claude Code with DGrid](https://blog.dgrid.ai/posts/2026-03-12/)
- **Open WebUI**: [Using DGrid RPC with Open WebUI: A Comprehensive Guide](https://blog.dgrid.ai/posts/2026-01-22_2/)
- **LibreChat**: [Using DGrid with LibreChat: A Step-by-Step Guide](https://blog.dgrid.ai/posts/2026-01-28/)
- **AnythingLLM**: [Tutorial: Using DGrid RPC API with AnythingLLM](https://blog.dgrid.ai/posts/2026-01-30/)
- **Openclaw (agent platform)**: [Supercharging Openclaw with DGrid: The Ultimate AI Agent Setup](https://blog.dgrid.ai/posts/2026-02-02/)
- **LobeChat**: [Configuring and Utilizing DGrid RPC Service in LobeChat: A Full Guide](https://blog.dgrid.ai/posts/2026-02-09/)
- **OpenClaw (no-code)**: [Step-by-Step Guide: OpenClaw Installation & DGrid AI RPC Service Setup (No Code Required)](https://blog.dgrid.ai/posts/2026-02-27/)
