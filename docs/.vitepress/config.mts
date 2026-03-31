import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

type SidebarItem = DefaultTheme.SidebarItem

function withCollapsed(items: SidebarItem[], depth = 0): SidebarItem[] {
  return items.map((item) => {
    if (!item.items?.length) {
      return item
    }

    if (depth === 0) {
      const { collapsed: _collapsed, ...rest } = item

      return {
        ...rest,
        items: withCollapsed(item.items, depth + 1)
      }
    }

    return {
      ...item,
      collapsed: item.collapsed ?? true,
      items: withCollapsed(item.items, depth + 1)
    }
  })
}

export default defineConfig({

  title: "DGrid AI Docs",
  description: "Documentation for DGrid AI: The Decentralized Smart Network of AI",
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/DGrid.png', type: 'image/png' }],
  ],


  locales: {
 
    root: {
      label: 'English',
      lang: 'en',
      description: "Documentation for DGrid AI: The Decentralized AI Inference Network for Open, Low-Cost & Community-Powered AI",
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Docs', link: '/What-we-do' }
        ],
        sidebar: withCollapsed([
          {
            text: 'Introduction',
            items: [
              { text: 'What We Do?', link: '/What-we-do' },
              { text: 'Background', link: '/Background' }
            ]
          },
          {
            text: 'Design',
            items: [
              { text: 'DGrids Solution', link: '/DGrids-Solution' },
              { text: 'Node System', link: '/Node-Operators' }
            ]
          },
          {
            text: 'Economic System',
            items: [
              { text: 'What is $DGAI?', link: '/What-is-$DGAI' },
              { text: 'Core Functions', link: '/Core-Functions' },
              { text: 'Circulation Mechanism', link: '/Circulation-Mechanism' },
              { text: 'Token Distribution', link: '/Token-Distribution' }
            ]
          },
          {
            text: 'Core Products', 
            items: [
              {
                text: 'AI Gateway',
                link: '/AI-Gateway',
                items: [
                  {
                    text: 'Model API',
                    link: '/Model-API',
                    items: [
                      {
                        text: 'Audio',
                        link: '/Model-API-Audio',
                        items: [
                          { text: 'Native Gemini Format', link: '/Model-API-Audio#native-gemini-format' },
                          { text: 'OpenAI Text-to-Speech', link: '/Model-API-Audio#text-to-speech' },
                          { text: 'OpenAI Audio Transcriptions', link: '/Model-API-Audio#audio-transcriptions' },
                          { text: 'OpenAI Audio Translations', link: '/Model-API-Audio#audio-translations' }
                        ]
                      },
                      {
                        text: 'Chat',
                        link: '/Model-API-Chat',
                        items: [
                          { text: 'Native Claude Format', link: '/Model-API-Chat#native-claude-format' },
                          { text: 'Gemini Media Recognition', link: '/Model-API-Chat#gemini-media-recognition' },
                          { text: 'Gemini Text Chat', link: '/Model-API-Chat#gemini-text-chat' },
                          { text: 'OpenAI Chat Completions', link: '/Model-API-Chat#chat-completions' },
                          { text: 'OpenAI Responses', link: '/Model-API-Chat#responses' }
                        ]
                      },
                      {
                        text: 'Completions',
                        link: '/Model-API-Completions',
                        items: [
                          { text: 'Native OpenAI Format', link: '/Model-API-Completions#native-openai-format' }
                        ]
                      },
                      {
                        text: 'Embeddings',
                        link: '/Model-API-Embeddings',
                        items: [
                          { text: 'Native OpenAI Format', link: '/Model-API-Embeddings#native-openai-format' },
                          { text: 'Native Gemini Format', link: '/Model-API-Embeddings#native-gemini-format' }
                        ]
                      },
                      {
                        text: 'Images',
                        link: '/Model-API-Images',
                        items: [
                          { text: 'Gemini Native Format', link: '/Model-API-Images#gemini-native-format' },
                          { text: 'OpenAI Chat Format', link: '/Model-API-Images#openai-chat-format' },
                          { text: 'OpenAI Image Generations', link: '/Model-API-Images#openai-image-generations' },
                          { text: 'OpenAI Image Edits', link: '/Model-API-Images#openai-image-edits' },
                          { text: 'Qwen Image Generations', link: '/Model-API-Images#qwen-image-generations' },
                          { text: 'Qwen Image Edits', link: '/Model-API-Images#qwen-image-edits' }
                        ]
                      },
                      {
                        text: 'Moderations',
                        link: '/Model-API-Moderations',
                        items: [
                          { text: 'OpenAI Moderations', link: '/Model-API-Moderations#moderations' }
                        ]
                      },
                      {
                        text: 'Realtime',
                        link: '/Model-API-Realtime',
                        items: [
                          { text: 'WebSocket Connection', link: '/Model-API-Realtime#websocket-connection' },
                          { text: 'Session Tokens', link: '/Model-API-Realtime#session-tokens' },
                          { text: 'WebSocket Events', link: '/Model-API-Realtime#websocket-events' }
                        ]
                      }
                    ]
                  },
                  { text: 'Integration Tutorials', link: '/AI-Gateway-Integrations' }
                ]
              },
              {
                text: 'AI Arena',
                link: '/AI-Arena', 
                items: [
                  { text: 'Arena for Agent', link: '/Arena-for-Agent' }
                ]
              },
              { text: 'Dori Find Models', link: '/Dori' },
              {
                text: 'x402 API',
                link: '/x402',
                items: [
                  { text: 'API Reference', link: '/x402-api-reference' }
                ]
              }
            ]
         },
         {
            text: 'DGrid Premium',
            items: [
              { text: 'Program Overview', link: '/Program-Overview' },
              { text: 'Exclusive Benefits', link: '/Exclusive-Benefits' },
              { text: 'Purchase & Activation', link: '/Purchase-&-Activation' },
              { text: 'Incentive Mechanism & Rewards', link: '/Incentive-Mechanism-&-Rewards' },
              { text: 'Compliance & Regulatory', link: '/Compliance-and-Regulatory' },
              { text: 'Legal Disclaimer', link: '/Legal-Disclaimer' }
            ]
          },
          {
            text: 'Appendix', 
            items: [
              { text: 'Roadmap', link: '/Roadmap' },
              { text: 'Academic Research', link: '/Academic-Research' }
            ]
          }
        ])
      }
    },
    'zh-TW': {
      label: '繁體中文',
      lang: 'zh-TW', 
      link: '/zh-TW/', 
      description: "DGrid AI 文檔：去中心化 AI 推理網路，為開放、低成本、社群驅動的 AI 提供支援",
      themeConfig: {
        nav: [
          { text: '首頁', link: '/zh-TW/' }, 
          { text: '文檔', link: '/zh-TW/What-we-do' } 
        ],
        sidebar: withCollapsed([
          {
            text: '簡介', 
            items: [
              { text: '我們的使命', link: '/zh-TW/What-we-do' },
              { text: '背景', link: '/zh-TW/Background' }
            ]
          },
          {
            text: '設計架構', 
            items: [
              { text: 'DGrid 解決方案', link: '/zh-TW/DGrids-Solution' },
              { text: '節點系統', link: '/zh-TW/Node-Operators' }
            ]
          },
          {
            text: '經濟體系', 
            items: [
              { text: '什麼是 $DGAI?', link: '/zh-TW/What-is-$DGAI' },
              { text: '核心功能', link: '/zh-TW/Core-Functions' },
              { text: '流通機制', link: '/zh-TW/Circulation-Mechanism' },
              { text: '代幣分配', link: '/zh-TW/Token-Distribution' }
            ]
          },
          {
            text: '核心產品', 
            items: [
              {
                text: 'AI Gateway',
                link: '/zh-TW/AI-Gateway',
                items: [
                  {
                    text: 'Model API',
                    link: '/zh-TW/Model-API',
                    items: [
                      {
                        text: '音訊',
                        link: '/zh-TW/Model-API-Audio',
                        items: [
                          { text: '原生 Gemini 格式', link: '/zh-TW/Model-API-Audio#native-gemini-format' },
                          { text: 'OpenAI 文字轉語音', link: '/zh-TW/Model-API-Audio#text-to-speech' },
                          { text: 'OpenAI 音訊轉錄', link: '/zh-TW/Model-API-Audio#audio-transcriptions' },
                          { text: 'OpenAI 音訊翻譯', link: '/zh-TW/Model-API-Audio#audio-translations' }
                        ]
                      },
                      {
                        text: '聊天',
                        link: '/zh-TW/Model-API-Chat',
                        items: [
                          { text: '原生 Claude 格式', link: '/zh-TW/Model-API-Chat#native-claude-format' },
                          { text: 'Gemini 媒體識別', link: '/zh-TW/Model-API-Chat#gemini-media-recognition' },
                          { text: 'Gemini 文字聊天', link: '/zh-TW/Model-API-Chat#gemini-text-chat' },
                          { text: 'OpenAI Chat Completions', link: '/zh-TW/Model-API-Chat#chat-completions' },
                          { text: 'OpenAI Responses', link: '/zh-TW/Model-API-Chat#responses' }
                        ]
                      },
                      {
                        text: '補全',
                        link: '/zh-TW/Model-API-Completions',
                        items: [
                          { text: '原生 OpenAI 格式', link: '/zh-TW/Model-API-Completions#native-openai-format' }
                        ]
                      },
                      {
                        text: '嵌入',
                        link: '/zh-TW/Model-API-Embeddings',
                        items: [
                          { text: '原生 OpenAI 格式', link: '/zh-TW/Model-API-Embeddings#native-openai-format' },
                          { text: '原生 Gemini 格式', link: '/zh-TW/Model-API-Embeddings#native-gemini-format' }
                        ]
                      },
                      {
                        text: '圖像',
                        link: '/zh-TW/Model-API-Images',
                        items: [
                          { text: 'Gemini 原生格式', link: '/zh-TW/Model-API-Images#gemini-native-format' },
                          { text: 'OpenAI 聊天格式', link: '/zh-TW/Model-API-Images#openai-chat-format' },
                          { text: 'OpenAI 圖像生成', link: '/zh-TW/Model-API-Images#openai-image-generations' },
                          { text: 'OpenAI 圖像編輯', link: '/zh-TW/Model-API-Images#openai-image-edits' },
                          { text: 'Qwen 圖像生成', link: '/zh-TW/Model-API-Images#qwen-image-generations' },
                          { text: 'Qwen 圖像編輯', link: '/zh-TW/Model-API-Images#qwen-image-edits' }
                        ]
                      },
                      {
                        text: '審查',
                        link: '/zh-TW/Model-API-Moderations',
                        items: [
                          { text: 'OpenAI 內容審查', link: '/zh-TW/Model-API-Moderations#moderations' }
                        ]
                      },
                      {
                        text: '即時語音',
                        link: '/zh-TW/Model-API-Realtime',
                        items: [
                          { text: 'WebSocket 連線', link: '/zh-TW/Model-API-Realtime#websocket-connection' },
                          { text: 'Realtime Session Token', link: '/zh-TW/Model-API-Realtime#session-tokens' },
                          { text: 'WebSocket 事件', link: '/zh-TW/Model-API-Realtime#websocket-events' }
                        ]
                      }
                    ]
                  },
                  { text: '整合教學', link: '/zh-TW/AI-Gateway-Integrations' }
                ]
              },
              {
                text: 'AI 競技場',
                link: '/zh-TW/AI-Arena', 
                items: [
                  { text: 'Arena for Agent', link: '/zh-TW/Arena-for-Agent' }
                ]
              },
              { text: 'Dori 尋找模型', link: '/zh-TW/Dori' },
              {
                text: 'x402 API',
                link: '/zh-TW/x402',
                items: [
                  { text: 'API Reference', link: '/zh-TW/x402-api-reference' }
                ]
              }
            ]
          },
         {
            text: 'DGrid Premium', 
            items: [
              { text: '計畫概述', link: '/zh-TW/Program-Overview' },
              { text: '專屬權益', link: '/zh-TW/Exclusive-Benefits' },
              { text: '購買與激活', link: '/zh-TW/Purchase-&-Activation' },
              { text: '激勵機制與獎勵', link: '/zh-TW/Incentive-Mechanism-&-Rewards' },
              { text: '合規與監管', link: '/zh-TW/Compliance-and-Regulatory' },
              { text: '法律免責聲明', link: '/zh-TW/Legal-Disclaimer' }
            ]
          },
          {
            text: '附錄', 
            items: [
              { text: '發展路線圖', link: '/zh-TW/Roadmap' },
              { text: '學術研究', link: '/zh-TW/Academic-Research' }
            ]
          }
        ])
      }
    },
    kr: {
      label: '한국어',
      lang: 'ko-KR',
      link: '/kr/',
      description: "DGrid AI 문서: 탈중앙화 AI 추론 네트워크로 개방적、저비용、커뮤니티 주도型 AI 지원",
      themeConfig: {
        nav: [
          { text: '홈', link: '/kr/' },
          { text: '문서', link: '/kr/What-we-do' }
        ],
        sidebar: withCollapsed([
          {
            text: '소개',
            items: [
              { text: '우리의 임무', link: '/kr/What-we-do' },
              { text: '배경', link: '/kr/Background' }
            ]
          },
          {
            text: '설계',
            items: [
              { text: 'DGrid 솔루션', link: '/kr/DGrids-Solution' },
              { text: '노드 운영자', link: '/kr/Node-Operators' }
            ]
          },
          {
            text: '경제 시스템',
            items: [
              { text: '$DGAI 란 무엇인가?', link: '/kr/What-is-$DGAI' },
              { text: '핵심 기능', link: '/kr/Core-Functions' },
              { text: '순환 메커니즘', link: '/kr/Circulation-Mechanism' },
              { text: '토큰 분배', link: '/kr/Token-Distribution' }
            ]
          },
          {
            text: '핵심 제품', 
            items: [
              {
                text: 'AI 게이트웨이',
                link: '/kr/AI-Gateway',
                items: [
                  {
                    text: 'Model API',
                    link: '/kr/Model-API',
                    items: [
                      {
                        text: '오디오',
                        link: '/kr/Model-API-Audio',
                        items: [
                          { text: '네이티브 Gemini 형식', link: '/kr/Model-API-Audio#native-gemini-format' },
                          { text: 'OpenAI 텍스트 음성 합성', link: '/kr/Model-API-Audio#text-to-speech' },
                          { text: 'OpenAI 오디오 전사', link: '/kr/Model-API-Audio#audio-transcriptions' },
                          { text: 'OpenAI 오디오 번역', link: '/kr/Model-API-Audio#audio-translations' }
                        ]
                      },
                      {
                        text: '채팅',
                        link: '/kr/Model-API-Chat',
                        items: [
                          { text: '네이티브 Claude 형식', link: '/kr/Model-API-Chat#native-claude-format' },
                          { text: 'Gemini 미디어 인식', link: '/kr/Model-API-Chat#gemini-media-recognition' },
                          { text: 'Gemini 텍스트 채팅', link: '/kr/Model-API-Chat#gemini-text-chat' },
                          { text: 'OpenAI Chat Completions', link: '/kr/Model-API-Chat#chat-completions' },
                          { text: 'OpenAI Responses', link: '/kr/Model-API-Chat#responses' }
                        ]
                      },
                      {
                        text: '컴플리션',
                        link: '/kr/Model-API-Completions',
                        items: [
                          { text: '네이티브 OpenAI 형식', link: '/kr/Model-API-Completions#native-openai-format' }
                        ]
                      },
                      {
                        text: '임베딩',
                        link: '/kr/Model-API-Embeddings',
                        items: [
                          { text: '네이티브 OpenAI 형식', link: '/kr/Model-API-Embeddings#native-openai-format' },
                          { text: '네이티브 Gemini 형식', link: '/kr/Model-API-Embeddings#native-gemini-format' }
                        ]
                      },
                      {
                        text: '이미지',
                        link: '/kr/Model-API-Images',
                        items: [
                          { text: 'Gemini 네이티브 형식', link: '/kr/Model-API-Images#gemini-native-format' },
                          { text: 'OpenAI 채팅 형식', link: '/kr/Model-API-Images#openai-chat-format' },
                          { text: 'OpenAI 이미지 생성', link: '/kr/Model-API-Images#openai-image-generations' },
                          { text: 'OpenAI 이미지 편집', link: '/kr/Model-API-Images#openai-image-edits' },
                          { text: 'Qwen 이미지 생성', link: '/kr/Model-API-Images#qwen-image-generations' },
                          { text: 'Qwen 이미지 편집', link: '/kr/Model-API-Images#qwen-image-edits' }
                        ]
                      },
                      {
                        text: '모더레이션',
                        link: '/kr/Model-API-Moderations',
                        items: [
                          { text: 'OpenAI 모더레이션', link: '/kr/Model-API-Moderations#moderations' }
                        ]
                      },
                      {
                        text: '실시간',
                        link: '/kr/Model-API-Realtime',
                        items: [
                          { text: 'WebSocket 연결', link: '/kr/Model-API-Realtime#websocket-connection' },
                          { text: 'Session Tokens', link: '/kr/Model-API-Realtime#session-tokens' },
                          { text: 'WebSocket 이벤트', link: '/kr/Model-API-Realtime#websocket-events' }
                        ]
                      }
                    ]
                  },
                  { text: '통합 튜토리얼', link: '/kr/AI-Gateway-Integrations' }
                ]
              },
              {
                text: 'AI 아레나',
                link: '/kr/AI-Arena', 
                items: [
                  { text: 'Arena for Agent', link: '/kr/Arena-for-Agent' }
                ]
              },
              { text: 'Dori 모델 찾기', link: '/kr/Dori' },
              {
                text: 'x402 API',
                link: '/kr/x402',
                items: [
                  { text: 'API Reference', link: '/kr/x402-api-reference' }
                ]
              }
            ]
          },
          {
            text: 'DGrid Premium',
            items: [
              { text: '프로그램 개요', link: '/kr/Program-Overview' },
              { text: '전용 혜택', link: '/kr/Exclusive-Benefits' },
              { text: '구매 및 활성화', link: '/kr/Purchase-&-Activation' },
              { text: '인센티브 메커니즘 및 보상', link: '/kr/Incentive-Mechanism-&-Rewards' },
              { text: '준수 및 규제', link: '/kr/Compliance-and-Regulatory' },
              { text: '법적 고지', link: '/kr/Legal-Disclaimer' }
            ]
          },
          {
            text: '부록', 
            items: [
              { text: '발전 로드맵', link: '/kr/Roadmap' },
              { text: '학술 연구', link: '/kr/Academic-Research' }
            ]
          }
        ])
      }
    }
  },
  themeConfig: {
    logo: '/DGrid_1024.png',
    search: {
      provider: 'local'
    },
    footer: {
      copyright: 'Open, Low-Cost, Community-Powered | Join the <a href="https://t.me/dgrid_ai" target="_blank" rel="noopener noreferrer">Community</a> for AI Innovation'
    },
    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/dgrid_ai' }
    ],
  }
})
