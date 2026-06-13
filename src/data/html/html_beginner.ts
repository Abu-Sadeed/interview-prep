import type { Block } from '../../types/content';

export const htmlBeginner: Block[] = [
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
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: HTML + Web Semantics (Block 67)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Markup review, accessibility trade-offs, SEO and performance decisions. 'Fix this component markup', 'make this form accessible', 'what metadata belongs here'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default htmlBeginner;
