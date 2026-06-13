import type { Block } from '../../types/content';

export const htmlIntermediate: Block[] = [
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
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: HTML + Web Semantics (Block 67)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Markup review, accessibility trade-offs, SEO and performance decisions. 'Fix this component markup', 'make this form accessible', 'what metadata belongs here'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default htmlIntermediate;
