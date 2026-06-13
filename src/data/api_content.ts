import type { Block } from '../types/content';

export const apiContent: Block[] = [
  {
    "id": 28,
    "phase": "API + HTTP + Security",
    "chip": "api",
    "freq": "high",
    "title": "REST API Design",
    "subtitle": "Resource naming, HTTP verbs, status codes, idempotency, versioning, pagination patterns",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "REST Principles + HTTP Verbs",
            "items": [
              "<b>Resource-based URLs:</b> nouns not verbs. /users not /getUsers. /orders/{id} not /getOrderById.",
              "<b>GET:</b> read, safe, idempotent. <b>POST:</b> create, NOT idempotent. <b>PUT:</b> replace entirely, idempotent. <b>PATCH:</b> partial update. <b>DELETE:</b> remove, idempotent.",
              "<b>Nested resources:</b> /users/{id}/orders for a user's orders. Max 2-3 levels deep.",
              "<b>Plural nouns:</b> /users not /user. /products/{id} not /product/{id}."
            ]
          },
          {
            "heading": "HTTP Status Codes",
            "items": [
              "<b>2xx:</b> 200 OK, 201 Created (POST + Location header), 204 No Content (DELETE success).",
              "<b>3xx:</b> 301 Moved Permanently, 302 Found (temporary), 304 Not Modified (caching).",
              "<b>4xx:</b> 400 Bad Request (validation), 401 Unauthorized (not authenticated), 403 Forbidden (authenticated, no permission), 404 Not Found, 409 Conflict, 422 Unprocessable Entity.",
              "<b>5xx:</b> 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.",
              "<b>401 vs 403:</b> 401 = not authenticated (no valid credentials). 403 = authenticated but not authorized."
            ]
          }
        ],
        "traps": [
          "401 vs 403 confusion — 401 = not authenticated, 403 = authenticated but forbidden",
          "Using 200 OK for errors with error body — incorrect, use proper 4xx/5xx codes",
          "POST is NOT idempotent — calling twice creates two resources"
        ],
        "checkpoint": [
          "What HTTP method to partially update a user profile?",
          "What is the difference between 401 and 403? Concrete scenario for each.",
          "Is DELETE idempotent? What should a second DELETE of the same resource return?"
        ]
      },
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
      },
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
    "id": 29,
    "phase": "API + HTTP + Security",
    "chip": "api",
    "freq": "high",
    "title": "HTTP Fundamentals",
    "subtitle": "Request/response lifecycle, caching headers, HTTP/2 vs HTTP/1.1, TLS handshake, HTTPS",
    "prereqs": [
      28
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "HTTP Request/Response",
            "items": [
              "<b>Stateless protocol:</b> each request independent. Server has no memory of previous requests. State via cookies, sessions, JWT.",
              "<b>Request structure:</b> method + URL + version + headers + body.",
              "<b>Common request headers:</b> Content-Type (body format), Accept (expected response format), Authorization, Cookie, Origin (CORS).",
              "<b>Common response headers:</b> Content-Type, Set-Cookie, Cache-Control, ETag, Location, WWW-Authenticate.",
              "<b>HEAD:</b> same as GET but no body. Check headers without downloading. <b>OPTIONS:</b> discover supported methods, CORS preflight."
            ]
          },
          {
            "heading": "HTTP Caching",
            "items": [
              "<b>Cache-Control: max-age=3600:</b> cache for 3600 seconds.",
              "<b>no-cache:</b> cache but always revalidate with server. NOT the same as 'don't cache'.",
              "<b>no-store:</b> truly don't cache at all.",
              "<b>ETag:</b> resource version hash. Server returns in response. Client sends If-None-Match. If unchanged → 304 Not Modified (no body).",
              "<b>CDN:</b> Cache-Control: public = CDN cacheable. private = browser only. s-maxage overrides max-age for CDN."
            ]
          }
        ],
        "traps": [
          "Cache-Control: no-cache does NOT mean 'don't cache' — it means 'cache but always revalidate'. no-store means actually don't cache.",
          "HTTP is stateless — session state must be maintained externally",
          "304 Not Modified has no body — if your code expects body on all 2xx/3xx it will break"
        ],
        "checkpoint": [
          "What is the difference between Cache-Control: no-cache and no-store?",
          "I have a CSS file I want CDN to cache for 1 year but force refresh on change. How?",
          "Walk me through a request/response cycle with ETag-based caching."
        ]
      },
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
      },
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
    "id": 30,
    "phase": "API + HTTP + Security",
    "chip": "api",
    "freq": "high",
    "title": "Security — OWASP + Authentication",
    "subtitle": "OWASP Top 10, SQL injection, XSS, CSRF, JWT security, OAuth2 flows, API hardening",
    "prereqs": [
      28,
      29
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "OWASP Top 10 Core",
            "items": [
              "<b>Injection (SQL, LDAP, OS):</b> unsanitized input sent to interpreter. Fix: parameterized queries, ORMs, input validation.",
              "<b>Broken Authentication:</b> weak credentials, insecure sessions, exposed tokens. Fix: MFA, secure session handling.",
              "<b>Sensitive Data Exposure:</b> storing/transmitting unencrypted. Fix: HTTPS everywhere, encrypt at rest, don't log sensitive data.",
              "<b>Broken Access Control (IDOR):</b> accessing resources beyond permissions. Fix: enforce server-side, check ownership on every request.",
              "<b>Security Misconfiguration:</b> default creds, unnecessary features, verbose errors in prod, open S3 buckets."
            ]
          },
          {
            "heading": "SQL Injection",
            "items": [
              "<b>SQL injection:</b> unsanitized input breaks query. Classic: ' OR '1'='1.",
              "<b>Fix: parameterized queries always.</b> Never string-concatenate user input into SQL.",
              "<b>ORM safety:</b> Spring Data JPA named parameters are safe. Native SQL with string concat is NOT.",
              "<b>IDOR:</b> checking authentication ≠ checking authorization. Must verify this user is allowed to access this specific resource."
            ]
          }
        ],
        "traps": [
          "ORM doesn't prevent SQL injection if you use native queries with string concatenation",
          "IDOR — authentication (are you logged in?) is not authorization (can YOU access THIS resource?)",
          "Verbose error messages in production reveal internal structure — attacker maps your system"
        ],
        "checkpoint": [
          "What is SQL injection and how do you prevent it in a Spring application?",
          "What is IDOR? Give a concrete example.",
          "Why is returning stack traces in production error responses a security risk?"
        ]
      },
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
      },
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
    "id": 80,
    "phase": "API + HTTP + Security",
    "chip": "api",
    "freq": "med",
    "title": "GraphQL + gRPC + API Contracts",
    "subtitle": "GraphQL schema/resolvers, gRPC protobuf, API contracts, versioning trade-offs",
    "prereqs": [
      30
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "GraphQL",
            "items": [
              "<b>Schema:</b> types, fields, inputs, enums, unions. Schema is the API contract.",
              "<b>Queries:</b> client asks for fields it needs. Reduces over-fetching.",
              "<b>Mutations:</b> write operations with input types and predictable errors.",
              "<b>Resolvers:</b> functions that fetch or compute each field."
            ]
          },
          {
            "heading": "gRPC",
            "items": [
              "<b>Protobuf:</b> strongly typed schema for messages and services.",
              "<b>HTTP/2:</b> multiplexed streams, binary framing, efficient transport.",
              "<b>RPC types:</b> unary, server streaming, client streaming, bidirectional streaming.",
              "<b>Code generation:</b> clients and servers generated from .proto files."
            ]
          }
        ],
        "traps": [
          "GraphQL can under-fetch or over-fetch at the resolver level if designed poorly",
          "gRPC is not browser-friendly without gateways or web implementations",
          "Protobuf field numbers are part of the contract and should not be reused casually"
        ],
        "checkpoint": [
          "When does GraphQL reduce over-fetching?",
          "What are the four gRPC RPC types?",
          "Why are protobuf field numbers stable API surface?"
        ]
      },
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
      },
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

export default apiContent;
