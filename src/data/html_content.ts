import type { Block } from '../types/content';

export const htmlContent: Block[] = [
  {
    "id": 67,
    "phase": "Frontend",
    "chip": "html",
    "freq": "high",
    "title": "HTML + Web Semantics",
    "subtitle": "Semantic HTML, forms, accessibility, SEO, metadata, document structure",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Document Structure",
            "items": [
              "<b>HTML document:</b> <!doctype html>, html lang, head metadata, body content. lang helps browsers and screen readers.",
              "<b>Semantic landmarks:</b> header, nav, main, section, article, aside, footer. Landmarks replace many generic div wrappers.",
              "<b>Metadata:</b> title, description, viewport, canonical URL, Open Graph/Twitter cards for sharing.",
              "<b>SEO basics:</b> one meaningful h1 per page, logical heading hierarchy, descriptive link text, crawlable content."
            ]
          },
          {
            "heading": "Forms",
            "items": [
              "<b>Labels:</b> label for/id or wrap input. Every control needs an accessible name.",
              "<b>Input types:</b> email, tel, url, number, date, search. Use native types for mobile keyboards and validation.",
              "<b>Validation attributes:</b> required, minlength, maxlength, pattern, min, max. Pair with server validation.",
              "<b>Fieldsets:</b> group related controls with legend. Useful for radio groups and accessibility."
            ]
          }
        ],
        "traps": [
          "Divs with onClick are not buttons — use button or anchor with correct semantics",
          "Placeholder is not a label — it disappears when the user types",
          "Multiple h1 tags are allowed but one clear page title is usually best"
        ],
        "checkpoint": [
          "Convert a div-based navbar into semantic nav markup.",
          "What metadata belongs in head for an SEO-friendly page?",
          "Why is a real button better than a styled div?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Accessibility Semantics",
            "items": [
              "<b>Screen reader tree:</b> browsers expose semantic elements as landmarks, roles, names, states, and relationships.",
              "<b>ARIA rule:</b> use native HTML first. Add ARIA only when native semantics are insufficient.",
              "<b>Focus order:</b> DOM order should match visual order. Avoid tabindex values greater than 0.",
              "<b>Live regions:</b> aria-live=polite/assertive announces dynamic updates such as form errors or toasts."
            ]
          },
          {
            "heading": "Content Models",
            "items": [
              "<b>Interactive content:</b> do not nest button inside button or interactive element inside anchor.",
              "<b>Sections:</b> section needs an accessible name when used as a landmark. article is self-contained content.",
              "<b>Lists:</b> use ul/ol/li for lists. Definition lists dl/dt/dd describe terms and descriptions.",
              "<b>Tables:</b> use table for tabular data, caption/th scope for headers. Do not use tables for layout."
            ]
          }
        ],
        "traps": [
          "role='button' on a div still needs keyboard handling and focus management",
          "aria-hidden on focused content traps or confuses assistive technology",
          "Nested interactive elements create unpredictable browser behavior"
        ],
        "checkpoint": [
          "How would you mark up a product card with image, title, price, and actions?",
          "When is ARIA appropriate and when is native HTML enough?",
          "What makes a form accessible to keyboard and screen reader users?"
        ]
      },
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

export default htmlContent;
