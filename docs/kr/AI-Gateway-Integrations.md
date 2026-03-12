# AI 게이트웨이 통합 튜토리얼

이 페이지는 **DGrid AI 게이트웨이**를 다양한 개발 도구/SDK에 연결하는 실전 튜토리얼을 한 곳에 모아 둔 목록입니다.

## Cursor (OpenAI Base URL 재정의)

1. `DGRID_API_KEY`를 준비합니다 (선행 조건은 [AI 게이트웨이](/kr/AI-Gateway) 참고).
2. **Cursor Settings** → **Models**로 이동합니다.
3. **API Keys**에서 **Override OpenAI Base URL**을 활성화합니다.
4. Base URL을 아래처럼 설정합니다:
   - `https://api.dgrid.ai/v1`
5. **OpenAI API Key**에 `DGRID_API_KEY`를 입력합니다.
6. 모델 이름은 DGrid 형식으로 사용합니다 (예: `openai/gpt-4o`).

![Cursor settings example](/2_SJd0fdj09dfjKLDFk.png)

전체 가이드(블로그): [How to Configure and Use DGrid RPC API in Cursor](https://blog.dgrid.ai/posts/2026-02-18/)

## OpenAI SDK (Node.js / Python)

- 참고: [AI 게이트웨이 빠른 시작](/kr/AI-Gateway#%EB%B9%A0%EB%A5%B8-%EC%8B%9C%EC%9E%91)

## 블로그 통합 튜토리얼 모음

- **AI as Workspace (AIaW)**: [Step-by-Step Guide: Configure DGrid RPC in AI as Workspace (AIaW)](https://blog.dgrid.ai/posts/2026-03-10/)
- **Chatbox**: [Step-by-Step Guide: Configure DGrid RPC in Chatbox](https://blog.dgrid.ai/posts/2026-03-09/)
- **Claude Code**: [Use Claude Code with DGrid](https://blog.dgrid.ai/posts/2026-03-12/)
- **Open WebUI**: [Using DGrid RPC with Open WebUI: A Comprehensive Guide](https://blog.dgrid.ai/posts/2026-01-22_2/)
- **LibreChat**: [Using DGrid with LibreChat: A Step-by-Step Guide](https://blog.dgrid.ai/posts/2026-01-28/)
- **AnythingLLM**: [Tutorial: Using DGrid RPC API with AnythingLLM](https://blog.dgrid.ai/posts/2026-01-30/)
- **Openclaw (에이전트 플랫폼)**: [Supercharging Openclaw with DGrid: The Ultimate AI Agent Setup](https://blog.dgrid.ai/posts/2026-02-02/)
- **LobeChat**: [Configuring and Utilizing DGrid RPC Service in LobeChat: A Full Guide](https://blog.dgrid.ai/posts/2026-02-09/)
- **OpenClaw (노코드)**: [Step-by-Step Guide: OpenClaw Installation & DGrid AI RPC Service Setup (No Code Required)](https://blog.dgrid.ai/posts/2026-02-27/)
