import type { Block } from '../../types/content';

export const apiBeginner: Block[] = [
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
      }
    ],
    "grill": "You are a Senior API Engineer interviewing a candidate.\n\nTOPIC: GraphQL + gRPC + API Contracts (Block 80)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: API contract trade-offs, schema evolution, runtime risks. 'Choose REST vs GraphQL vs gRPC', 'GraphQL N+1', 'protobuf evolution'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default apiBeginner;
