import type { Block } from '../../types/content';

export const htmlAdvanced: Block[] = [
  {
    "id": "html-1",
    "phase": "Frontend",
    "chip": "html",
    "freq": "high",
    "title": "HTML + Web Semantics",
    "subtitle": "Semantic HTML, forms, accessibility, SEO, metadata, document structure",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "Performance + Resilience",
            "items": [
              "<b>Critical HTML:</b> keep above-the-fold markup small. Defer non-critical scripts and CSS where possible.",
              "<b>Preconnect/preload:</b> use link hints for fonts, critical images, and third-party origins. Too many hints hurt performance.",
              "<b>Progressive enhancement:</b> core content works without JavaScript. Enhance with JS instead of requiring it.",
              "<b>Internationalization:</b> lang attributes, dir='rtl', datetime formatting, text expansion, locale-aware inputs."
            ]
          },
          {
            "heading": "Advanced Patterns",
            "items": [
              "<b>Dialog:</b> native dialog/modal with focus trapping and backdrop handling. Prefer native dialog when browser support fits.",
              "<b>Details/summary:</b> disclosure widgets without custom JavaScript. Style carefully for accessibility.",
              "<b>Picture/srcset:</b> serve responsive images by viewport and pixel density. Pair with width/height to prevent CLS.",
              "<b>Content security:</b> avoid inline event handlers. CSP nonce/hash strategy for scripts when needed."
            ]
          }
        ],
        "traps": [
          "Native dialog support varies — test focus restoration and backdrop behavior",
          "Preloading every font/image competes with the critical path",
          "Progressive enhancement is not a separate app — it is the same app with layered capabilities"
        ],
        "checkpoint": [
          "Design a resilient form flow that works without JavaScript.",
          "How do you choose img, picture, srcset, and sizes?",
          "What HTML choices reduce layout shift and improve accessibility?"
        ]
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: HTML + Web Semantics (Block 67)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Markup review, accessibility trade-offs, SEO and performance decisions. 'Fix this component markup', 'make this form accessible', 'what metadata belongs here'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default htmlAdvanced;
