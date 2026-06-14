import type { Block } from '../../types/content';

export const apiAdvanced: Block[] = [
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Advanced API Patterns",
            "items": [
              "<b>Async operations:</b> long-running task → 202 Accepted + Location header pointing to status endpoint. Client polls for completion.",
              "<b>Bulk operations:</b> POST /users/batch. 207 Multi-Status for partial success — per-item status in response.",
              "<b>Conditional requests:</b> ETag + If-None-Match → 304 Not Modified. Last-Modified + If-Modified-Since. Reduces bandwidth for unchanged resources.",
              "<b>Rate limiting headers:</b> X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset. 429 Too Many Requests + Retry-After."
            ]
          }
        ],
        "traps": [
          "202 Accepted without a status endpoint leaves clients with no way to check completion",
          "Bulk partial failures need 207 Multi-Status with per-item status — not a single 400 or 500",
          "ETag changes on any field change — if based on response hash, even timestamp invalidates it"
        ],
        "checkpoint": [
          "Design a report generation API endpoint that triggers a long-running job. Full flow.",
          "What is conditional GET with ETag? Walk me through the complete request/response cycle.",
          "Design a bulk create endpoint that handles partial success correctly."
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Security Headers + Advanced Caching",
            "items": [
              "<b>Content-Security-Policy:</b> restrict resource origins. Prevents XSS.",
              "<b>X-Frame-Options: DENY:</b> prevents clickjacking.",
              "<b>X-Content-Type-Options: nosniff:</b> prevents MIME type sniffing.",
              "<b>Vary header:</b> tells CDN to cache different versions based on request header (Accept-Encoding, Accept-Language). Essential for content negotiation.",
              "<b>Stale-while-revalidate:</b> serve stale content while fetching fresh in background. Zero perceived latency on cache miss.",
              "<b>Cache busting strategies:</b> content-hash in filename (webpack), query param versioning (?v=hash), both common."
            ]
          }
        ],
        "traps": [
          "Vary: * tells CDN not to cache at all — be specific about which headers vary",
          "CDN ignoring Cache-Control: private serves cached user-specific data to wrong users — serious security issue",
          "OCSP stapling reduces TLS handshake latency — without it, browser fetches OCSP separately adding latency"
        ],
        "checkpoint": [
          "What security headers should every API response include and what does each protect against?",
          "Explain stale-while-revalidate and when you would use it.",
          "Your CDN is serving personalized user data to wrong users. What is the likely cause and fix?"
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
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "OAuth2 Security + API Hardening",
            "items": [
              "<b>PKCE:</b> code_verifier (random string) + code_challenge (SHA256 hash). Auth server verifies on token exchange. Prevents authorization code interception for public clients.",
              "<b>Open redirect:</b> redirect_uri not validated → attacker captures authorization code. Always validate exact redirect_uri match.",
              "<b>OAuth2 state parameter:</b> prevents CSRF in auth flow. Random value in request, verified in callback.",
              "<b>Rate limiting:</b> per user, per IP, per endpoint. Prevents brute force, DDoS, scraping.",
              "<b>Sensitive data in logs:</b> mask passwords, PII, card numbers. Structured logging with field-level masking.",
              "<b>Dependency scanning:</b> OWASP dependency-check, Snyk. Monitor CVEs. Pin versions."
            ]
          }
        ],
        "traps": [
          "OAuth2 missing state parameter = CSRF in auth flow — attacker initiates auth on behalf of victim",
          "Logging HTTP request bodies = passwords and sensitive data in logs — never log request bodies by default",
          "JWT signature comparison must be constant-time to prevent timing attacks"
        ],
        "checkpoint": [
          "What is PKCE and why is it required for public clients in OAuth2?",
          "Walk me through security implications of logging HTTP request/response bodies.",
          "Design a complete token rotation strategy for a web app using access + refresh tokens."
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Runtime Concerns",
            "items": [
              "<b>GraphQL N+1:</b> resolver per field can cause many DB calls. Use DataLoader or batching.",
              "<b>Query complexity:</b> limit depth, cost, aliases, and field count to prevent abuse.",
              "<b>gRPC deadlines:</b> set timeouts so cascading calls fail fast.",
              "<b>Gateways:</b> expose gRPC internally and REST/JSON externally when useful."
            ]
          },
          {
            "heading": "Governance",
            "items": [
              "<b>Schema ownership:</b> define who can change public contracts and how.",
              "<b>Breaking changes:</b> require migration plan, deprecation period, and consumer coordination.",
              "<b>Observability:</b> trace operation name, resolver latency, protobuf method, and status codes.",
              "<b>Backward compatibility CI:</b> fail builds on incompatible schema changes."
            ]
          }
        ],
        "traps": [
          "GraphQL flexibility can become unbounded query cost without limits",
          "gRPC deadlines are essential in service chains",
          "Gateway translation can hide useful error semantics if not designed carefully"
        ],
        "checkpoint": [
          "Prevent GraphQL query complexity attacks.",
          "How do you set deadlines across gRPC calls?",
          "Design governance for a public API used by many teams."
        ]
      }
    ],
    "grill": "You are a Senior API Engineer interviewing a candidate.\n\nTOPIC: GraphQL + gRPC + API Contracts (Block 80)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: API contract trade-offs, schema evolution, runtime risks. 'Choose REST vs GraphQL vs gRPC', 'GraphQL N+1', 'protobuf evolution'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default apiAdvanced;
