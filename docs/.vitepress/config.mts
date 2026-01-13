import { defineConfig } from 'vitepress'

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
        sidebar: [
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
              { text: 'Academic Research', link: 'Academic-Research' }
            ]
          }
        ]
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
        sidebar: [
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
        ]
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
        sidebar: [
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
        ]
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