# AI Gateway Integration Tutorials

This page collects practical integration tutorials for using **DGrid AI Gateway** in common developer tools and SDKs.

## Cursor (Override OpenAI Base URL)

1. Get your `DGRID_API_KEY` (see the prerequisite in [AI Gateway](/AI-Gateway)).
2. Open **Cursor Settings** → **Models**.
3. Under **API Keys**, enable **Override OpenAI Base URL**.
4. Set the base URL to:
   - `https://api.dgrid.ai/api/v1`
5. Paste your `DGRID_API_KEY` into **OpenAI API Key**.
6. Pick any supported model name using the DGrid format (for example: `openai/gpt-4o`).

![Cursor settings example](/2_SJd0fdj09dfjKLDFk.png)

Full tutorial: [How to Configure and Use DGrid RPC API in Cursor](https://blog.dgrid.ai/posts/2026-02-18/)

## OpenAI SDK (Node.js / Python)

- See: [AI Gateway Quickstart](/AI-Gateway#quickstart)

## Blog integration tutorials (collected)

- **Open WebUI**: [Using DGrid RPC with Open WebUI: A Comprehensive Guide](https://blog.dgrid.ai/posts/2026-01-22_2/)
- **LibreChat**: [Using DGrid with LibreChat: A Step-by-Step Guide](https://blog.dgrid.ai/posts/2026-01-28/)
- **AnythingLLM**: [Tutorial: Using DGrid RPC API with AnythingLLM](https://blog.dgrid.ai/posts/2026-01-30/)
- **Openclaw (agent platform)**: [Supercharging Openclaw with DGrid: The Ultimate AI Agent Setup](https://blog.dgrid.ai/posts/2026-02-02/)
- **LobeChat**: [Configuring and Utilizing DGrid RPC Service in LobeChat: A Full Guide](https://blog.dgrid.ai/posts/2026-02-09/)
- **OpenClaw (no-code)**: [Step-by-Step Guide: OpenClaw Installation & DGrid AI RPC Service Setup (No Code Required)](https://blog.dgrid.ai/posts/2026-02-27/)


