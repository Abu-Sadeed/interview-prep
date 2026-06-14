import type { Block } from '../../types/content';

export const apiIntermediate: Block[] = [
  {
    "id": "api-1",
    "phase": "API + HTTP + Security",
    "chip": "api",
    "freq": "high",
    "title": "REST API Design",
    "subtitle": "Resource naming, HTTP verbs, status codes, idempotency, versioning, pagination patterns",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Idempotency + Pagination",
            "items": [
              "<b>Idempotency key pattern:</b> client sends UUID in header. Server stores key → result mapping. Duplicate request returns stored result. Prevents double-charge on payment retry.",
              "<b>Offset pagination:</b> ?page=2&size=20. Simple. Degrades at scale. Page drift on inserts.",
              "<b>Cursor pagination:</b> ?cursor=base64token. Stable. Scales. Cannot jump to arbitrary page. Best for infinite scroll.",
              "<b>Keyset pagination:</b> WHERE id &gt; lastId ORDER BY id LIMIT n. Most efficient. No COUNT, no OFFSET. Manual implementation.",
              "<b>Response envelope:</b> {data: [...], pagination: {nextCursor: '...', hasMore: true}}."
            ]
          },
          {
            "heading": "API Versioning",
            "items": [
              "<b>URL versioning:</b> /api/v1/users. Simple, cache-friendly, visible. Pollutes URLs.",
              "<b>Header versioning:</b> Accept: application/vnd.api+json;version=1. Cleaner URLs. Harder to test in browser.",
              "<b>Best practice:</b> URL versioning for major breaking changes. Maintain previous version for deprecation window. Sunset header to inform clients."
            ]
          }
        ],
        "traps": [
          "Offset pagination causes page drift — item inserted at top shifts page 2 results, user sees duplicates",
          "Cursor must be opaque to client — never expose raw internal IDs directly",
          "Fine-grained API versioning per endpoint = maintenance nightmare — version the resource representation"
        ],
        "checkpoint": [
          "Building a social feed with infinite scroll. Which pagination strategy and why?",
          "What is an idempotency key? When and how do you use it?",
          "Trade-offs between URL versioning vs header versioning?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: REST API Design (Block 28)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design questions (design this API), correctness (what status code for X), trade-offs (which pagination strategy and why). Test decision-making not just knowledge.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "api-2",
    "phase": "API + HTTP + Security",
    "chip": "api",
    "freq": "high",
    "title": "HTTP Fundamentals",
    "subtitle": "Request/response lifecycle, caching headers, HTTP/2 vs HTTP/1.1, TLS handshake, HTTPS",
    "prereqs": [
      "api-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "HTTP/2 vs HTTP/1.1",
            "items": [
              "<b>HTTP/1.1 head-of-line blocking:</b> requests in one connection are sequential. Browser opens 6 parallel connections per domain as workaround.",
              "<b>HTTP/2 multiplexing:</b> multiple streams over ONE TCP connection. No HTTP-level head-of-line blocking.",
              "<b>HTTP/2 header compression (HPACK):</b> repeated headers (Cookie, Authorization) compressed. Significant bandwidth reduction.",
              "<b>HTTP/2 requires TLS</b> in all major browsers (h2 = HTTPS only).",
              "<b>HTTP/3 (QUIC):</b> UDP-based. Eliminates TCP head-of-line blocking too. Better on mobile/lossy networks."
            ]
          },
          {
            "heading": "HTTPS + TLS",
            "items": [
              "<b>TLS 1.3 handshake:</b> client hello (cipher suites, random) → server hello (chosen cipher, certificate) → key exchange (ECDHE) → both derive session keys → encrypted.",
              "<b>Certificate validation:</b> signature chain to trusted CA, expiry, hostname (SAN), revocation (OCSP).",
              "<b>HSTS:</b> tells browser to always use HTTPS. max-age + includeSubDomains + preload.",
              "<b>mTLS:</b> both client and server present certificates. For service-to-service auth. No API keys needed."
            ]
          }
        ],
        "traps": [
          "HTTP/2 multiplexing reduces connections but TCP head-of-line blocking still exists at transport layer — HTTP/3 (QUIC) solves this",
          "HSTS preload is permanent — once in browser preload list, removing takes months. Don't add preload unless committed to HTTPS forever",
          "mTLS certificate rotation is operationally complex — automate with cert-manager in Kubernetes"
        ],
        "checkpoint": [
          "What is HTTP/2 multiplexing and what problem does it solve?",
          "What is HSTS and what is the risk of the preload directive?",
          "Walk me through TLS 1.3 handshake at a high level."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: HTTP Fundamentals (Block 29)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix protocol questions with practical scenarios (debug this caching bug, explain this TLS error) and security implications.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "api-3",
    "phase": "API + HTTP + Security",
    "chip": "api",
    "freq": "high",
    "title": "Security — OWASP + Authentication",
    "subtitle": "OWASP Top 10, SQL injection, XSS, CSRF, JWT security, OAuth2 flows, API hardening",
    "prereqs": [
      "api-1",
      "api-2"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "XSS + CSRF",
            "items": [
              "<b>XSS (Cross-Site Scripting):</b> attacker injects script into page, executes in victim's browser. Steals cookies/tokens, performs actions as victim.",
              "<b>Stored XSS:</b> script saved to DB, served to all visitors. <b>Reflected XSS:</b> script in URL parameter reflected in response.",
              "<b>Fix XSS:</b> output-encode all user content. Content-Security-Policy header. HttpOnly cookies.",
              "<b>CSRF:</b> attacker page triggers state-changing request using victim's cookies.",
              "<b>Fix CSRF:</b> CSRF token (double-submit cookie), SameSite=Strict cookie. Disable for stateless JWT APIs."
            ]
          },
          {
            "heading": "JWT Security",
            "items": [
              "<b>JWT structure:</b> header.payload.signature. Base64 encoded. NOT encrypted — anyone can read payload.",
              "<b>alg:none attack:</b> attacker changes alg to 'none', removes signature. Server accepts if it doesn't validate algorithm. Always enforce expected algorithm explicitly.",
              "<b>Weak secret:</b> HS256 with short secret = brute-forceable offline. Use 256+ bit random secret or RS256/ES256.",
              "<b>Token storage:</b> localStorage = XSS risk (JS readable). HttpOnly cookie = CSRF risk (auto-sent). HttpOnly + SameSite=Strict = best combination.",
              "<b>Token revocation:</b> JWTs are stateless. Revoke via Redis blocklist or short expiry + refresh tokens."
            ]
          }
        ],
        "traps": [
          "JWT payload is base64 encoded not encrypted — never put sensitive data in payload unless using JWE",
          "HttpOnly cookie prevents JS access but NOT CSRF — combine with SameSite=Strict",
          "Refresh tokens with long expiry in localStorage are as risky as long-lived access tokens"
        ],
        "checkpoint": [
          "What is the alg:none JWT attack and how do you prevent it?",
          "Where should you store JWT tokens in a browser? Why is each option a trade-off?",
          "Difference between XSS and CSRF? Best mitigation for each?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend candidate on application security.\n\nTOPIC: Security — OWASP + Authentication (Block 30)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Security thinking not just knowledge. Show designs with vulnerabilities — ask to find and fix. Mix attack scenarios with defensive design. 'Find the security bug in this code.'\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "api-4",
    "phase": "API + HTTP + Security",
    "chip": "api",
    "freq": "med",
    "title": "GraphQL + gRPC + API Contracts",
    "subtitle": "GraphQL schema/resolvers, gRPC protobuf, API contracts, versioning trade-offs",
    "prereqs": [
      "api-3"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Contracts",
            "items": [
              "<b>OpenAPI:</b> HTTP/REST contracts with paths, schemas, auth, and examples.",
              "<b>GraphQL schema:</b> contract for queries, mutations, subscriptions, and types.",
              "<b>Protobuf:</b> contract for messages, services, and streaming behavior.",
              "<b>Contract tests:</b> verify provider behavior against consumer expectations."
            ]
          },
          {
            "heading": "Versioning",
            "items": [
              "<b>REST:</b> URI/header/media-type versioning or backward-compatible evolution.",
              "<b>GraphQL:</b> deprecate fields, add fields, avoid breaking type changes.",
              "<b>gRPC:</b> add fields with new numbers, reserve old numbers, keep services additive.",
              "<b>Compatibility:</b> choose strategy based on public clients and deployment cadence."
            ]
          }
        ],
        "traps": [
          "Contracts without tests drift from implementation",
          "GraphQL deprecations need a removal window and monitoring",
          "Reusing protobuf field numbers breaks binary compatibility"
        ],
        "checkpoint": [
          "Compare OpenAPI, GraphQL schema, and protobuf as contracts.",
          "How do you deprecate a GraphQL field safely?",
          "What is the safest gRPC schema evolution?"
        ]
      }
    ],
    "grill": "You are a Senior API Engineer interviewing a candidate.\n\nTOPIC: GraphQL + gRPC + API Contracts (Block 80)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: API contract trade-offs, schema evolution, runtime risks. 'Choose REST vs GraphQL vs gRPC', 'GraphQL N+1', 'protobuf evolution'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default apiIntermediate;
