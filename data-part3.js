// ============================================================
// INTERVIEW PREP SYLLABUS — DATA PART 3 (Blocks 28–39)
// Covers: API+HTTP+Security (28-30) + Infrastructure (31-32) + Frontend (33-35) + Architecture (36-39)
// ============================================================

globalThis.BLOCKS_PART3 = [

// ════════════════════════════════════════════════════════════
// PHASE 5 — API + HTTP + SECURITY
// ════════════════════════════════════════════════════════════

{
  id: 28, phase: "API + HTTP + Security", chip: "api", freq: "high",
  title: "REST API Design",
  subtitle: "Resource naming, HTTP verbs, status codes, idempotency, versioning, pagination patterns",
  prereqs: [],
  tiers: [
    {
      level: "Beginner",
      time: "30 min",
      sections: [
        {
          heading: "REST Principles + HTTP Verbs",
          items: [
            "<b>Resource-based URLs:</b> nouns not verbs. /users not /getUsers. /orders/{id} not /getOrderById.",
            "<b>GET:</b> read, safe, idempotent. <b>POST:</b> create, NOT idempotent. <b>PUT:</b> replace entirely, idempotent. <b>PATCH:</b> partial update. <b>DELETE:</b> remove, idempotent.",
            "<b>Nested resources:</b> /users/{id}/orders for a user's orders. Max 2-3 levels deep.",
            "<b>Plural nouns:</b> /users not /user. /products/{id} not /product/{id}."
          ]
        },
        {
          heading: "HTTP Status Codes",
          items: [
            "<b>2xx:</b> 200 OK, 201 Created (POST + Location header), 204 No Content (DELETE success).",
            "<b>3xx:</b> 301 Moved Permanently, 302 Found (temporary), 304 Not Modified (caching).",
            "<b>4xx:</b> 400 Bad Request (validation), 401 Unauthorized (not authenticated), 403 Forbidden (authenticated, no permission), 404 Not Found, 409 Conflict, 422 Unprocessable Entity.",
            "<b>5xx:</b> 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.",
            "<b>401 vs 403:</b> 401 = not authenticated (no valid credentials). 403 = authenticated but not authorized."
          ]
        }
      ],
      traps: [
        "401 vs 403 confusion — 401 = not authenticated, 403 = authenticated but forbidden",
        "Using 200 OK for errors with error body — incorrect, use proper 4xx/5xx codes",
        "POST is NOT idempotent — calling twice creates two resources"
      ],
      checkpoint: [
        "What HTTP method to partially update a user profile?",
        "What is the difference between 401 and 403? Concrete scenario for each.",
        "Is DELETE idempotent? What should a second DELETE of the same resource return?"
      ]
    },
    {
      level: "Intermediate",
      time: "35 min",
      sections: [
        {
          heading: "Idempotency + Pagination",
          items: [
            "<b>Idempotency key pattern:</b> client sends UUID in header. Server stores key → result mapping. Duplicate request returns stored result. Prevents double-charge on payment retry.",
            "<b>Offset pagination:</b> ?page=2&size=20. Simple. Degrades at scale. Page drift on inserts.",
            "<b>Cursor pagination:</b> ?cursor=base64token. Stable. Scales. Cannot jump to arbitrary page. Best for infinite scroll.",
            "<b>Keyset pagination:</b> WHERE id &gt; lastId ORDER BY id LIMIT n. Most efficient. No COUNT, no OFFSET. Manual implementation.",
            "<b>Response envelope:</b> {data: [...], pagination: {nextCursor: '...', hasMore: true}}."
          ]
        },
        {
          heading: "API Versioning",
          items: [
            "<b>URL versioning:</b> /api/v1/users. Simple, cache-friendly, visible. Pollutes URLs.",
            "<b>Header versioning:</b> Accept: application/vnd.api+json;version=1. Cleaner URLs. Harder to test in browser.",
            "<b>Best practice:</b> URL versioning for major breaking changes. Maintain previous version for deprecation window. Sunset header to inform clients."
          ]
        }
      ],
      traps: [
        "Offset pagination causes page drift — item inserted at top shifts page 2 results, user sees duplicates",
        "Cursor must be opaque to client — never expose raw internal IDs directly",
        "Fine-grained API versioning per endpoint = maintenance nightmare — version the resource representation"
      ],
      checkpoint: [
        "Building a social feed with infinite scroll. Which pagination strategy and why?",
        "What is an idempotency key? When and how do you use it?",
        "Trade-offs between URL versioning vs header versioning?"
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "Advanced API Patterns",
          items: [
            "<b>Async operations:</b> long-running task → 202 Accepted + Location header pointing to status endpoint. Client polls for completion.",
            "<b>Bulk operations:</b> POST /users/batch. 207 Multi-Status for partial success — per-item status in response.",
            "<b>Conditional requests:</b> ETag + If-None-Match → 304 Not Modified. Last-Modified + If-Modified-Since. Reduces bandwidth for unchanged resources.",
            "<b>Rate limiting headers:</b> X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset. 429 Too Many Requests + Retry-After."
          ]
        }
      ],
      traps: [
        "202 Accepted without a status endpoint leaves clients with no way to check completion",
        "Bulk partial failures need 207 Multi-Status with per-item status — not a single 400 or 500",
        "ETag changes on any field change — if based on response hash, even timestamp invalidates it"
      ],
      checkpoint: [
        "Design a report generation API endpoint that triggers a long-running job. Full flow.",
        "What is conditional GET with ETag? Walk me through the complete request/response cycle.",
        "Design a bulk create endpoint that handles partial success correctly."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: REST API Design (Block 28)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design questions (design this API), correctness (what status code for X), trade-offs (which pagination strategy and why). Test decision-making not just knowledge.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 29, phase: "API + HTTP + Security", chip: "api", freq: "high",
  title: "HTTP Fundamentals",
  subtitle: "Request/response lifecycle, caching headers, HTTP/2 vs HTTP/1.1, TLS handshake, HTTPS",
  prereqs: [28],
  tiers: [
    {
      level: "Beginner",
      time: "30 min",
      sections: [
        {
          heading: "HTTP Request/Response",
          items: [
            "<b>Stateless protocol:</b> each request independent. Server has no memory of previous requests. State via cookies, sessions, JWT.",
            "<b>Request structure:</b> method + URL + version + headers + body.",
            "<b>Common request headers:</b> Content-Type (body format), Accept (expected response format), Authorization, Cookie, Origin (CORS).",
            "<b>Common response headers:</b> Content-Type, Set-Cookie, Cache-Control, ETag, Location, WWW-Authenticate.",
            "<b>HEAD:</b> same as GET but no body. Check headers without downloading. <b>OPTIONS:</b> discover supported methods, CORS preflight."
          ]
        },
        {
          heading: "HTTP Caching",
          items: [
            "<b>Cache-Control: max-age=3600:</b> cache for 3600 seconds.",
            "<b>no-cache:</b> cache but always revalidate with server. NOT the same as 'don't cache'.",
            "<b>no-store:</b> truly don't cache at all.",
            "<b>ETag:</b> resource version hash. Server returns in response. Client sends If-None-Match. If unchanged → 304 Not Modified (no body).",
            "<b>CDN:</b> Cache-Control: public = CDN cacheable. private = browser only. s-maxage overrides max-age for CDN."
          ]
        }
      ],
      traps: [
        "Cache-Control: no-cache does NOT mean 'don't cache' — it means 'cache but always revalidate'. no-store means actually don't cache.",
        "HTTP is stateless — session state must be maintained externally",
        "304 Not Modified has no body — if your code expects body on all 2xx/3xx it will break"
      ],
      checkpoint: [
        "What is the difference between Cache-Control: no-cache and no-store?",
        "I have a CSS file I want CDN to cache for 1 year but force refresh on change. How?",
        "Walk me through a request/response cycle with ETag-based caching."
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "HTTP/2 vs HTTP/1.1",
          items: [
            "<b>HTTP/1.1 head-of-line blocking:</b> requests in one connection are sequential. Browser opens 6 parallel connections per domain as workaround.",
            "<b>HTTP/2 multiplexing:</b> multiple streams over ONE TCP connection. No HTTP-level head-of-line blocking.",
            "<b>HTTP/2 header compression (HPACK):</b> repeated headers (Cookie, Authorization) compressed. Significant bandwidth reduction.",
            "<b>HTTP/2 requires TLS</b> in all major browsers (h2 = HTTPS only).",
            "<b>HTTP/3 (QUIC):</b> UDP-based. Eliminates TCP head-of-line blocking too. Better on mobile/lossy networks."
          ]
        },
        {
          heading: "HTTPS + TLS",
          items: [
            "<b>TLS 1.3 handshake:</b> client hello (cipher suites, random) → server hello (chosen cipher, certificate) → key exchange (ECDHE) → both derive session keys → encrypted.",
            "<b>Certificate validation:</b> signature chain to trusted CA, expiry, hostname (SAN), revocation (OCSP).",
            "<b>HSTS:</b> tells browser to always use HTTPS. max-age + includeSubDomains + preload.",
            "<b>mTLS:</b> both client and server present certificates. For service-to-service auth. No API keys needed."
          ]
        }
      ],
      traps: [
        "HTTP/2 multiplexing reduces connections but TCP head-of-line blocking still exists at transport layer — HTTP/3 (QUIC) solves this",
        "HSTS preload is permanent — once in browser preload list, removing takes months. Don't add preload unless committed to HTTPS forever",
        "mTLS certificate rotation is operationally complex — automate with cert-manager in Kubernetes"
      ],
      checkpoint: [
        "What is HTTP/2 multiplexing and what problem does it solve?",
        "What is HSTS and what is the risk of the preload directive?",
        "Walk me through TLS 1.3 handshake at a high level."
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "Security Headers + Advanced Caching",
          items: [
            "<b>Content-Security-Policy:</b> restrict resource origins. Prevents XSS.",
            "<b>X-Frame-Options: DENY:</b> prevents clickjacking.",
            "<b>X-Content-Type-Options: nosniff:</b> prevents MIME type sniffing.",
            "<b>Vary header:</b> tells CDN to cache different versions based on request header (Accept-Encoding, Accept-Language). Essential for content negotiation.",
            "<b>Stale-while-revalidate:</b> serve stale content while fetching fresh in background. Zero perceived latency on cache miss.",
            "<b>Cache busting strategies:</b> content-hash in filename (webpack), query param versioning (?v=hash), both common."
          ]
        }
      ],
      traps: [
        "Vary: * tells CDN not to cache at all — be specific about which headers vary",
        "CDN ignoring Cache-Control: private serves cached user-specific data to wrong users — serious security issue",
        "OCSP stapling reduces TLS handshake latency — without it, browser fetches OCSP separately adding latency"
      ],
      checkpoint: [
        "What security headers should every API response include and what does each protect against?",
        "Explain stale-while-revalidate and when you would use it.",
        "Your CDN is serving personalized user data to wrong users. What is the likely cause and fix?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: HTTP Fundamentals (Block 29)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix protocol questions with practical scenarios (debug this caching bug, explain this TLS error) and security implications.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 30, phase: "API + HTTP + Security", chip: "api", freq: "high",
  title: "Security — OWASP + Authentication",
  subtitle: "OWASP Top 10, SQL injection, XSS, CSRF, JWT security, OAuth2 flows, API hardening",
  prereqs: [28, 29],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "OWASP Top 10 Core",
          items: [
            "<b>Injection (SQL, LDAP, OS):</b> unsanitized input sent to interpreter. Fix: parameterized queries, ORMs, input validation.",
            "<b>Broken Authentication:</b> weak credentials, insecure sessions, exposed tokens. Fix: MFA, secure session handling.",
            "<b>Sensitive Data Exposure:</b> storing/transmitting unencrypted. Fix: HTTPS everywhere, encrypt at rest, don't log sensitive data.",
            "<b>Broken Access Control (IDOR):</b> accessing resources beyond permissions. Fix: enforce server-side, check ownership on every request.",
            "<b>Security Misconfiguration:</b> default creds, unnecessary features, verbose errors in prod, open S3 buckets."
          ]
        },
        {
          heading: "SQL Injection",
          items: [
            "<b>SQL injection:</b> unsanitized input breaks query. Classic: ' OR '1'='1.",
            "<b>Fix: parameterized queries always.</b> Never string-concatenate user input into SQL.",
            "<b>ORM safety:</b> Spring Data JPA named parameters are safe. Native SQL with string concat is NOT.",
            "<b>IDOR:</b> checking authentication ≠ checking authorization. Must verify this user is allowed to access this specific resource."
          ]
        }
      ],
      traps: [
        "ORM doesn't prevent SQL injection if you use native queries with string concatenation",
        "IDOR — authentication (are you logged in?) is not authorization (can YOU access THIS resource?)",
        "Verbose error messages in production reveal internal structure — attacker maps your system"
      ],
      checkpoint: [
        "What is SQL injection and how do you prevent it in a Spring application?",
        "What is IDOR? Give a concrete example.",
        "Why is returning stack traces in production error responses a security risk?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "XSS + CSRF",
          items: [
            "<b>XSS (Cross-Site Scripting):</b> attacker injects script into page, executes in victim's browser. Steals cookies/tokens, performs actions as victim.",
            "<b>Stored XSS:</b> script saved to DB, served to all visitors. <b>Reflected XSS:</b> script in URL parameter reflected in response.",
            "<b>Fix XSS:</b> output-encode all user content. Content-Security-Policy header. HttpOnly cookies.",
            "<b>CSRF:</b> attacker page triggers state-changing request using victim's cookies.",
            "<b>Fix CSRF:</b> CSRF token (double-submit cookie), SameSite=Strict cookie. Disable for stateless JWT APIs."
          ]
        },
        {
          heading: "JWT Security",
          items: [
            "<b>JWT structure:</b> header.payload.signature. Base64 encoded. NOT encrypted — anyone can read payload.",
            "<b>alg:none attack:</b> attacker changes alg to 'none', removes signature. Server accepts if it doesn't validate algorithm. Always enforce expected algorithm explicitly.",
            "<b>Weak secret:</b> HS256 with short secret = brute-forceable offline. Use 256+ bit random secret or RS256/ES256.",
            "<b>Token storage:</b> localStorage = XSS risk (JS readable). HttpOnly cookie = CSRF risk (auto-sent). HttpOnly + SameSite=Strict = best combination.",
            "<b>Token revocation:</b> JWTs are stateless. Revoke via Redis blocklist or short expiry + refresh tokens."
          ]
        }
      ],
      traps: [
        "JWT payload is base64 encoded not encrypted — never put sensitive data in payload unless using JWE",
        "HttpOnly cookie prevents JS access but NOT CSRF — combine with SameSite=Strict",
        "Refresh tokens with long expiry in localStorage are as risky as long-lived access tokens"
      ],
      checkpoint: [
        "What is the alg:none JWT attack and how do you prevent it?",
        "Where should you store JWT tokens in a browser? Why is each option a trade-off?",
        "Difference between XSS and CSRF? Best mitigation for each?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "OAuth2 Security + API Hardening",
          items: [
            "<b>PKCE:</b> code_verifier (random string) + code_challenge (SHA256 hash). Auth server verifies on token exchange. Prevents authorization code interception for public clients.",
            "<b>Open redirect:</b> redirect_uri not validated → attacker captures authorization code. Always validate exact redirect_uri match.",
            "<b>OAuth2 state parameter:</b> prevents CSRF in auth flow. Random value in request, verified in callback.",
            "<b>Rate limiting:</b> per user, per IP, per endpoint. Prevents brute force, DDoS, scraping.",
            "<b>Sensitive data in logs:</b> mask passwords, PII, card numbers. Structured logging with field-level masking.",
            "<b>Dependency scanning:</b> OWASP dependency-check, Snyk. Monitor CVEs. Pin versions."
          ]
        }
      ],
      traps: [
        "OAuth2 missing state parameter = CSRF in auth flow — attacker initiates auth on behalf of victim",
        "Logging HTTP request bodies = passwords and sensitive data in logs — never log request bodies by default",
        "JWT signature comparison must be constant-time to prevent timing attacks"
      ],
      checkpoint: [
        "What is PKCE and why is it required for public clients in OAuth2?",
        "Walk me through security implications of logging HTTP request/response bodies.",
        "Design a complete token rotation strategy for a web app using access + refresh tokens."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend candidate on application security.\n\nTOPIC: Security — OWASP + Authentication (Block 30)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Security thinking not just knowledge. Show designs with vulnerabilities — ask to find and fix. Mix attack scenarios with defensive design. 'Find the security bug in this code.'\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

// ════════════════════════════════════════════════════════════
// PHASE 6 — INFRASTRUCTURE & TOOLING
// ════════════════════════════════════════════════════════════

{
  id: 31, phase: "Infrastructure & Tooling", chip: "infra", freq: "high",
  title: "Docker — Internals + Best Practices",
  subtitle: "Namespaces, cgroups, Dockerfile optimisation, multi-stage builds, networking, Compose",
  prereqs: [],
  tiers: [
    {
      level: "Beginner",
      time: "30 min",
      sections: [
        {
          heading: "What Containers Actually Are",
          items: [
            "<b>Containers ≠ VMs.</b> Containers share the host OS kernel. VMs have fully separate OS.",
            "<b>Linux namespaces:</b> isolate process view. PID (process tree), network (interfaces), mount (filesystem), UTS (hostname), IPC, user.",
            "<b>cgroups (control groups):</b> limit resource usage. --memory=512m, --cpus=1.0.",
            "<b>Container image:</b> read-only layered filesystem (Union FS). Running container adds thin writable layer on top.",
            "<b>Container vs image:</b> image = blueprint. Container = running instance. Multiple containers from one image."
          ]
        },
        {
          heading: "Dockerfile Basics",
          items: [
            "<b>FROM:</b> base image. <b>COPY/ADD:</b> copy files. <b>RUN:</b> execute during build (creates layer). <b>CMD:</b> default command at run time. <b>ENTRYPOINT:</b> fixed executable.",
            "<b>Layer caching:</b> each instruction creates a cached layer. Unchanged instructions use cache. Put frequently changing instructions LAST.",
            "<b>Dependency install before code:</b> COPY pom.xml → RUN mvn dependency:go-offline → COPY src → RUN mvn build. Dependencies cached until pom.xml changes.",
            "<b>.dockerignore:</b> exclude files from build context. Reduces build time and image size."
          ]
        }
      ],
      traps: [
        "CMD can be overridden at docker run — ENTRYPOINT cannot (easily). CMD provides default args to ENTRYPOINT when both specified",
        "COPY . . before RUN npm install invalidates dependency cache on every code change — expensive rebuild",
        "Running as root in container is a security risk — add USER directive to run as non-root"
      ],
      checkpoint: [
        "What is the difference between a container and a VM at the OS level?",
        "Why should you install dependencies before copying source code in a Dockerfile?",
        "What is the difference between CMD and ENTRYPOINT?"
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "Multi-Stage Builds",
          items: [
            "<b>Multiple FROM in one Dockerfile.</b> Each stage independent. COPY --from=stage to copy artifacts between stages.",
            "<b>Java example:</b> Stage 1: Maven + JDK build. Stage 2: JRE only (smaller) + COPY jar from Stage 1. Final image has zero build tools.",
            "<b>Node.js example:</b> Stage 1: npm install + build. Stage 2: production deps only + built files.",
            "<b>Size reduction:</b> from 800MB+ with build tools → 150MB with JRE only. Smaller = faster pull, smaller attack surface."
          ]
        },
        {
          heading: "Networking + Compose",
          items: [
            "<b>Bridge network (default):</b> containers on same bridge can communicate by container name (DNS). Isolated from host.",
            "<b>Host network:</b> container shares host network stack. No isolation. Best performance. Linux only.",
            "<b>Overlay network:</b> multi-host networking (Swarm, Kubernetes).",
            "<b>Docker Compose:</b> define multi-container apps in YAML. Services, networks, volumes. <code>docker compose up -d</code>.",
            "<b>Compose service discovery:</b> services refer to each other by service name. spring.datasource.url=jdbc:postgresql://db:5432/mydb where 'db' is Compose service name."
          ]
        }
      ],
      traps: [
        "Multi-stage build --from=0 references stage by index — use named stages (AS builder) for clarity",
        "Docker Compose service name != hostname in all contexts — use service name as hostname in connection strings",
        "Volumes not defined in Compose = data lost on container recreation — always define named volumes for persistent data"
      ],
      checkpoint: [
        "Walk me through a multi-stage Docker build for a Spring Boot application.",
        "How do containers on the same Docker Compose network communicate?",
        "What is the difference between COPY and ADD in a Dockerfile? When would you use ADD?"
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "Security + Production Best Practices",
          items: [
            "<b>Run as non-root:</b> USER 1001:1001 in Dockerfile. Most container security policies require this.",
            "<b>Read-only filesystem:</b> --read-only + tmpfs for /tmp. Prevents runtime modification.",
            "<b>Minimal base image:</b> distroless, alpine, scratch. Fewer packages = smaller attack surface.",
            "<b>Secret management:</b> never bake secrets into image. Use env vars, Docker secrets, Kubernetes secrets, or secret management tools (Vault).",
            "<b>Image scanning:</b> Trivy, Snyk, Grype. Scan for CVEs in base image and dependencies. Integrate into CI."
          ]
        },
        {
          heading: "Container Resource Limits",
          items: [
            "<b>--memory limit:</b> hard limit. OOM killer terminates container if exceeded.",
            "<b>--memory-swap:</b> total memory + swap. Set equal to --memory to disable swap.",
            "<b>--cpus:</b> CPU share. --cpus=0.5 = 50% of one CPU.",
            "<b>Kubernetes equivalent:</b> resources.limits.memory/cpu + resources.requests.memory/cpu. Requests = guaranteed. Limits = maximum.",
            "<b>JVM in container:</b> use -XX:+UseContainerSupport (default Java 10+). JVM reads cgroup limits, not host memory. Without it, JVM sees host RAM and over-allocates."
          ]
        }
      ],
      traps: [
        "JVM without UseContainerSupport reads host memory not container limit — OOM kill with no warning",
        "Building images with secrets in RUN commands — secrets appear in layer history even if deleted later",
        "Memory limit without --memory-swap enables swap = slow but no OOM kill — set both to prevent swap"
      ],
      checkpoint: [
        "What is UseContainerSupport and why is it critical for Java in Docker?",
        "How do you pass secrets to a container without baking them into the image?",
        "Walk me through building a minimal, secure Docker image for a Java microservice."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: Docker Internals + Best Practices (Block 31)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical scenarios — 'your Docker build is slow and image is 1GB, fix it', 'your Java container OOM kills despite having 4GB host RAM', 'you need secrets in your container at runtime'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 32, phase: "Infrastructure & Tooling", chip: "infra", freq: "med",
  title: "Linux — Engineer Essentials",
  subtitle: "Process management, file permissions, networking tools, logs, shell scripting basics",
  prereqs: [],
  tiers: [
    {
      level: "Beginner",
      time: "30 min",
      sections: [
        {
          heading: "Process Management",
          items: [
            "<b>ps aux:</b> all processes with user, CPU, mem. <b>top/htop:</b> interactive, real-time. <b>kill PID:</b> SIGTERM (graceful). <b>kill -9 PID:</b> SIGKILL (force, cannot be caught).",
            "<b>systemctl status service:</b> service status. <b>systemctl restart/start/stop service.</b>",
            "<b>Background processes:</b> command & (background). fg (bring to foreground). Ctrl+Z (suspend). nohup command & (survive terminal close).",
            "<b>Process priority:</b> nice -n 10 command (lower priority). renice -n 5 -p PID (change running process)."
          ]
        },
        {
          heading: "File Permissions",
          items: [
            "<b>Permission format:</b> rwxrwxrwx = owner/group/other. r=4, w=2, x=1.",
            "<b>chmod 755 file:</b> owner=rwx, group=rx, other=rx. <b>chmod +x file:</b> add execute for all.",
            "<b>chown user:group file:</b> change owner/group.",
            "<b>sudo:</b> run as superuser. /etc/sudoers controls who can sudo what.",
            "<b>umask:</b> default permission mask for new files. umask 022 = new files are 644, directories 755."
          ]
        }
      ],
      traps: [
        "kill -9 cannot be caught by the process — use kill (SIGTERM) first and give app time to gracefully shutdown",
        "chmod 777 is a security risk — never in production",
        "Forgetting execute permission on a script — chmod +x script.sh"
      ],
      checkpoint: [
        "How do you find and kill a process using a specific port?",
        "What does chmod 755 mean in terms of permissions?",
        "What is the difference between kill and kill -9?"
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "Networking Tools",
          items: [
            "<b>netstat -tulpn / ss -tulpn:</b> listening ports and which process. ss is faster.",
            "<b>curl -v URL:</b> verbose HTTP request. See headers, TLS, redirect chain.",
            "<b>curl -I URL:</b> headers only (HEAD request).",
            "<b>dig domain:</b> DNS lookup. dig @8.8.8.8 domain — use specific DNS server.",
            "<b>tcpdump -i eth0 port 8080:</b> capture packets on interface + port. For debugging network issues.",
            "<b>lsof -i :8080:</b> which process is using port 8080.",
            "<b>nmap -sV host:</b> port scan with service detection. Know it exists; careful in production."
          ]
        },
        {
          heading: "Logs + File Operations",
          items: [
            "<b>tail -f /var/log/app.log:</b> follow log in real-time.",
            "<b>grep -r 'ERROR' /var/log/:</b> recursive search. grep -i (case insensitive).",
            "<b>journalctl -u service -f:</b> follow systemd service logs.",
            "<b>awk '{print $5}' file:</b> print 5th column. <b>sed 's/old/new/g' file:</b> replace text.",
            "<b>find /path -name '*.log' -mtime +7 -delete:</b> delete log files older than 7 days.",
            "<b>df -h:</b> disk usage. <b>du -sh /path:</b> directory size. <b>free -h:</b> memory usage."
          ]
        }
      ],
      traps: [
        "tail -f doesn't work on log-rotated files — use tail -F (capital F) to follow by name",
        "grep searches file content not filenames — use find for filename search",
        "Disk space full but du shows space — deleted files held open by processes. Check lsof | grep deleted"
      ],
      checkpoint: [
        "How do you find which process is listening on port 8080?",
        "Your disk is 100% full but du shows only 60% used. What is the likely cause?",
        "How do you grep for errors in logs from the last hour?"
]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "Performance Optimization",
          items: [
            "<b>CPU affinity:</b> taskset -c 0-1 command to bind to specific cores. Useful for NUMA systems.",
            "<b>iostat / iotop:</b> disk I/O monitoring. Identify processes causing disk saturation.",
            "<b>strace -p PID:</b> trace system calls of running process. For debugging hangs or unusual behavior.",
            "<b>perf top:</b> live CPU profiling. Shows hot functions. Similar to top but for code profiling."
          ]
        }
      ],
      traps: [
        "iostat without -x shows utilization % which maxes at 100% — use -x for detailed per-device stats",
        "perf record without proper permissions returns permission denied — run with sudo",
        "CPU affinity without considering NUMA can actually hurt performance — pin to correct socket nodes"
      ],
      checkpoint: [
        "Your application is slow. How do you identify if it's CPU-bound or I/O-bound using Linux tools?",
        "How do you check if a process is stuck in uninterruptible sleep?",
        "Your container shows 100% CPU but top shows only 20% on host. What explains this?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend/SRE candidate.\n\nTOPIC: Linux Engineer Essentials (Block 32)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical debugging scenarios — 'your app is slow on production', 'disk full but du shows space', 'find the process using port 8080'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

// ════════════════════════════════════════════════════════════
// PHASE 8 — ARCHITECTURE + DESIGN
// ════════════════════════════════════════════════════════════

{
  id: 36, phase: "Architecture & Design", chip: "arch", freq: "high",
  title: "Design Patterns — Applied to Your Stack",
  subtitle: "Creational/structural/behavioral patterns mapped to Spring, NestJS, and production code",
  prereqs: [],
  tiers: [
    {
      level: "Beginner",
      time: "35 min",
      sections: [
        {
          heading: "Creational Patterns",
          items: [
            "<b>Singleton:</b> one instance per application. Spring beans are singleton by default. Danger: mutable shared state + threads. Stateless singletons are safe.",
            "<b>Factory Method:</b> subclasses decide which class to instantiate. Spring FactoryBean. When exact type depends on runtime input.",
            "<b>Builder:</b> construct complex objects step-by-step. Lombok @Builder. Avoids telescoping constructors. Immutable objects.",
            "<b>Prototype:</b> clone existing object. Spring prototype scope = new instance per injection. Java: copy constructor preferred over Cloneable."
          ]
        },
        {
          heading: "Structural Patterns",
          items: [
            "<b>Proxy:</b> intercept and add behaviour without changing target. Spring AOP (@Transactional, @Cacheable) are proxy-based.",
            "<b>Decorator:</b> add behaviour by wrapping. Chain of decorators. InputStream → BufferedInputStream → GzipInputStream. Adds behaviour, Proxy controls access.",
            "<b>Adapter:</b> make incompatible interfaces work together. Spring MVC HandlerAdapter adapts different controllers.",
            "<b>Facade:</b> simplify complex subsystem with unified interface. Your service layer wrapping multiple repositories is a Facade."
          ]
        },
        {
          heading: "Behavioral Patterns",
          items: [
            "<b>Strategy:</b> swap algorithms at runtime. Interface + multiple implementations. Inject different PaymentStrategy.",
            "<b>Observer:</b> notify multiple subscribers. Spring ApplicationEvent + ApplicationEventPublisher.",
            "<b>Chain of Responsibility:</b> pass request through handlers. Spring Security filter chain. NestJS middleware pipeline.",
            "<b>Template Method:</b> algorithm skeleton in base class, steps in subclasses. JdbcTemplate, RestTemplate."
          ]
        }
      ],
      traps: [
        "Singleton with mutable state = thread-safety bug — stateless singletons only",
        "Decorator vs Proxy: Decorator adds new functionality, Proxy controls access to existing functionality",
        "Observer pattern can cause memory leaks — subscribers not deregistered hold strong references"
      ],
      checkpoint: [
        "Spring beans are singleton by default. What problem does this cause with mutable state?",
        "What is the difference between Proxy and Decorator patterns? How does Spring use Proxy?",
        "I have a payment service needing Stripe, PayPal, and bank transfer. Which pattern and why?"
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "Pattern Recognition in Your Code",
          items: [
            "<b>N+1 query anti-pattern:</b> load 100 orders, then load each order's user separately = 101 queries. Fix: JOIN, eager loading, batch loading.",
            "<b>God Object anti-pattern:</b> one class does everything. Break into focused classes with single responsibility.",
            "<b>Anemic Domain Model:</b> service has all logic, entity is just data (getters/setters). Consider rich domain model for complex business logic.",
            "<b>Primitive Obsession:</b> using String for everything (email, phone, currency). Use value objects with validation.",
            "<b>Open/Closed Principle:</b> Strategy + Factory = add new behaviour without modifying existing code. New payment type = new class, not modified switch."
          ]
        },
        {
          heading: "Concurrency Patterns",
          items: [
            "<b>Producer-Consumer:</b> BlockingQueue between producers and consumers. Producer blocks when queue full. Consumer blocks when empty. Natural backpressure.",
            "<b>Thread Pool pattern:</b> pre-created threads, task queue. ThreadPoolExecutor. Reuse threads, bounded concurrency.",
            "<b>Read-Write Lock:</b> multiple concurrent readers, exclusive writer. ReentrantReadWriteLock. Read-heavy, write-infrequent data structures.",
"<b>Immutable Object:</b> thread-safe by design. No shared mutable state. Final fields, no setters, copy-on-mutation."
           ]
         }
       ],
       traps: [
         "Distributed Monolith anti-pattern: microservices that are tightly coupled, share DB, deploy together — worst of both worlds",
         "Premature optimization: solving performance problems that don't exist yet — profile first",
         "Magic numbers/strings: hardcoded values without meaning — use named constants, enums, or config"
       ],
       checkpoint: [
         "I have a service class with 12 methods, 800 lines, each method checks 'if type == A do X, if type == B do Y'. What patterns apply? How do you refactor?",
         "What is an Anemic Domain Model? How does it differ from a rich domain model?",
         "Explain Producer-Consumer pattern. How does BlockingQueue implement backpressure?"
       ]
     }
   ],
   grill: "You are a Senior Engineer interviewing a candidate.\n\nTOPIC: Design Patterns Applied to Your Stack (Block 36)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Code-level questioning, anti-patterns, refactoring.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
 },

// ════════════════════════════════════════════════════════════
// PHASE 7 — FRONTEND ENGINEERING
// ════════════════════════════════════════════════════════════

{
  id: 33, phase: "Frontend", chip: "frontend", freq: "high",
  title: "React Essentials",
  subtitle: "Hooks deep dive, state management, performance optimization, testing",
  prereqs: [],
  tiers: [
    {
      level: "Beginner",
      time: "45 min",
      sections: [
        {
          heading: "Hooks Fundamentals",
          items: [
            "<b>useState:</b> triggers re-render on state change. Lazy init: useState(() => expensiveOp()).",
            "<b>useEffect:</b> runs after render. Dependency array controls when. Empty array = componentDidMount + componentWillUnmount.",
            "<b>useRef:</b> persistent mutable value across renders. DOM access via ref={myRef}. Does NOT trigger re-render.",
            "<b>useCallback:</b> memoize function between renders. Prevents unnecessary re-renders of child components.",
            "<b>useMemo:</b> expensive computation memoization. Only re-computes when deps change. Returns value, not function."
          ]
        },
        {
          heading: "Custom Hooks",
          items: [
            "<b>Extract logic:</b> share stateful logic between components. Prefix with 'use'.",
            "<b>Lifecycle abstraction:</b> useWindowSize, useLocalStorage, useApi.",
            "<b>Rules of Hooks:</b> only call in React components or custom hooks. Only at top level (no loops/guard clauses)."
          ]
        }
      ],
      traps: [
        "Calling hooks conditionally breaks the rules — always at top level",
        "Missing dependencies in useEffect causes stale closures — use ESLint plugin",
        "Object/array dependencies in useEffect cause infinite loops — memoize deps or use ref pattern"
      ],
      checkpoint: [
        "Why does my effect run twice in development? What are strategies to fix it?",
        "Explain the difference between useEffect and useLayoutEffect. When do you use each?",
        "How do you share state between components without lifting state up?"
      ]
    },
    {
      level: "Intermediate",
      time: "50 min",
      sections: [
        {
          heading: "Performance Patterns",
          items: [
            "<b>Memoization:</b> React.memo for component, useMemo/useCallback for values/functions.",
            "<b>Virtualization:</b> react-window, react-virtualized for long lists. Only render visible items.",
            "<b>Code splitting:</b> React.lazy + Suspense for route-level splitting. Dynamic imports for component-level.",
            "<b>Error boundaries:</b> catch render errors. Use class component (no hooks for this yet). Log and fallback UI."
          ]
        },
        {
          heading: "State Management",
          items: [
            "<b>Lifting state up:</b> share state between parents and children. Single source of truth.",
            "<b>Context + useReducer:</b> state management without external library. useReducer for complex state logic.",
            "<b>Redux patterns:</b> selectors (reselect), action creators, thunk for async. Normalizr for nested data.",
            "<b>Zustand/Jotai:</b> minimal boilerplate alternatives. Hooks-based API."
          ]
        }
      ],
      traps: [
        "Context causes re-renders of ALL consumers — split contexts by concern",
        "Redux useSelector shallow compares by default — memoize selectors with reselect",
        "async actions without thunk/saga cause dispatch to receive Promise — handle properly"
      ],
      checkpoint: [
        "My app re-renders too often. How do I diagnose and fix it?",
        "When do you choose Redux vs Context vs Zustand?",
        "How do you handle derived state that depends on props?"
      ]
    }
  ],
  grill: "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: React Essentials (Block 33)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Hooks patterns, state management, performance debugging. 'Why does this component render twice?', 'how do you share state between unrelated components', 'debug this re-render issue'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 34, phase: "Frontend", chip: "frontend", freq: "high",
  title: "Next.js — Fullstack React Framework",
  subtitle: "SSG/SSR/ISR/RSC patterns, App Router, middleware, optimization",
  prereqs: ["33"],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Rendering Patterns",
          items: [
            "<b>CSR (Client-Side Rendering):</b> traditional React. JS bundle downloads, then hydrates. Fast dev, slower first paint.",
            "<b>SSG (Static Site Generation):</b> pre-render at build time. getStaticProps. Fast first paint, less up-to-date.",
            "<b>SSR (Server-Side Rendering):</b> render on each request. getServerSideProps. Fresh data, slower response.",
            "<b>ISR (Incremental Static Regeneration):</b> SSG with periodic revalidation. revalidate: 60 in getStaticProps.",
            "<b>RSC (React Server Components):</b> render on server, stream to client. Zero bundle size for server code. No client interactivity."
          ]
        },
        {
          heading: "App Router",
          items: [
            "<b>file/system routing:</b> folder structure = routes. app/users/page.tsx = /users route.",
            "<b>layout.tsx:</b> shared UI for segment and children. Persistent across navigation.",
            "<b>loading.tsx:</b> loading UI while segment loads. Parallel routes for complex loading states.",
            "<b>error.tsx:</b> error boundary at route level. Catches errors from same segment.",
            "<b>server components by default:</b> no 'use client' needed until you need interactivity."
          ]
        }
      ],
      traps: [
        "page.tsx becomes server component by default — add 'use client' for hooks/state",
        "layout.tsx wraps ALL children — performance impact on every navigation",
        "ISR only works with path-based static generation — not dynamic routes without fallback"
      ],
      checkpoint: [
        "When do you choose SSG vs SSR vs ISR for a blog? What changes if it's user dashboard?",
        "How does Next.js decide whether to render server or client component?",
        "Explain the tradeoff between RSC and traditional client components?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Optimization",
          items: [
            "<b>Image optimization:</b> next/image auto-sizes, lazy loads, serves WebP. fill for background images.",
            "<b>Font optimization:</b> next/font eliminates layout shift. Self-host Google Fonts.",
            "<b>Middleware:</b> intercept requests at edge. Rewrite, redirect, auth, geo-based routing.",
            "<b>Server actions:</b> form submissions without client JS. Progressive enhancement."
          ]
        },
        {
          heading: "Advanced Patterns",
          items: [
            "<b>Parallel routes:</b> slot-based routing. @modal for modal UI, @sidebar for persistent sidebar.",
            "<b>Catch-all routes:</b> [...slug].js for dynamic catch-all. Optional catch-all: [[...slug]].js.",
            "<b>Route handlers:</b> app/api/route.ts for API endpoints. GET, POST, etc as exported functions.",
            "<b>Middleware limitations:</b> no Node.js APIs, 1MB body size limit, runs on edge runtime."
          ]
        }
      ],
      traps: [
        "Middleware runs on every request — keep it lightweight",
        "Server components can't use useState — needs 'use client'",
        "Large images in public/ are NOT optimized — use next/image for optimization"
      ],
      checkpoint: [
        "My page takes 5 seconds to render. How do I optimize with Next.js features?",
        "How do you implement authentication check in middleware?",
        "Explain how SSR differs from RSC in terms of bundle size and initial load?"
      ]
    }
  ],
  grill: "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: Next.js Fullstack Framework (Block 34)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Rendering strategies, optimization, fullstack patterns. 'Why is SEO slow on my SPA?', 'optimize this image-heavy page', 'decide SSG vs SSR for this use case'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 35, phase: "Frontend", chip: "frontend", freq: "mid",
  title: "React State Management Patterns",
  subtitle: "Redux patterns, Context + useReducer, Zustand, Jotai, React Query",
  prereqs: ["33"],
  tiers: [
    {
      level: "Beginner",
      time: "35 min",
      sections: [
        {
          heading: "Redux Core",
          items: [
            "<b>Single source of truth:</b> entire app state in one store object. Predictable state updates.",
            "<b>Actions are payloads:</b> { type: 'ADD_TODO', payload: {...} }. Describe what happened.",
            "<b>Reducers are pure functions:</b> (state, action) => newState. No side effects, same input same output.",
            "<b>Dispatch triggers updates:</b> store.dispatch(action). Synchronous state change.",
            "<b>Selectors read state:</b> useSelector(state => state.todos) or reselect for memoized selectors."
          ]
        },
        {
          heading: "Redux Toolkit",
          items: [
            "<b>createSlice:</b> generates action creators and reducer from one place. Immer makes mutations safe.",
            "<b>configureStore:</b> Redux store setup. Adds redux-thunk, redux-devtools by default.",
            "<b>createAsyncThunk:</b> async actions with pending/fulfilled/rejected lifecycle. No manual promise handling.",
            "<b>RTK Query:</b> data fetching and caching. Auto-generated hooks. Built-in cache invalidation."
          ]
        }
      ],
      traps: [
        "Mutating state directly in reducer breaks time-travel debugging — use createSlice for safety",
        "Storing derived data causes consistency issues — selectors with reselect",
        "Dispatching in render causes infinite loops — useEffect or event handlers only"
      ],
      checkpoint: [
        "How do you handle async API calls in Redux without RTK Query?",
        "What problem does Redux solve that Context API doesn't?",
        "Explain why slices make it easier to organize large Redux state?"
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "Modern Alternatives",
          items: [
            "<b>Zustand:</b> minimal boilerplate, hook-based API. No middleware needed. Good for simple state.",
            "<b>Jotai:</arg_key> atoms are minimal state units. Composable, TypeScript-friendly. No provider wrapper.",
            "<b>React Query:</b> server state management. Caching, background refetch, pagination. Not for UI state.",
            "<b>Recoil:</b> atomic state, selector-based derived state. Facebook-backed but beta."
          ]
        },
        {
          heading: "When to Use What",
          items: [
            "<b>Redux:</b> large complex state, team familiarity, middleware needs (logger, persistence).",
            "<b>Zustand/Jotai:</b> small-medium state, preference for hooks, minimal boilerplate.",
            "<b>React Query:</b> async data fetching, caching, pagination, optimistic updates.",
            "<b>Context + useReducer:</b> state needed by few components, no persistence/serialization needed."
          ]
        }
      ],
      traps: [
        "React Query is NOT for UI state — use for server data only",
        "Zustand selector subscription needs careful memoization",
        "Jotai atoms should be defined outside component to prevent re-creation"
      ],
      checkpoint: [
        "My Redux store is getting huge. When do I split into multiple stores?",
        "When do you reach for React Query over Redux for data fetching?",
        "Compare Zustand and Redux for a simple todo app. Tradeoffs?"
      ]
    }
  ],
  grill: "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: React State Management (Block 35)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: State patterns, Redux vs alternatives, performance. 'App re-renders on every action', 'manage server state vs UI state', 'debug stale data issue'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

// ════════════════════════════════════════════════════════════
// PHASE 9 — BEHAVIOURAL
// ════════════════════════════════════════════════════════════

{
  id: 37, phase: "Behaviourial", chip: "soft", freq: "high",
  title: "System Design Round",
  subtitle: "Designing scalable systems, trade-offs, and failure modes from a staff/principal engineer perspective",
  prereqs: [],
  tiers: [],
  grill: "You are a Principal Engineer interviewing a senior candidate.\n\nTOPIC: System Design Round (Block 37)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design Twitter/Facebook/URL shortener. Focus on bottlenecks, cache layers, consistency models, circuit breakers.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 38, phase: "Behaviourial", chip: "soft", freq: "high",
  title: "Conflict & Collaboration",
  subtitle: "Handling disagreements, mentoring juniors, navigating technical debt decisions in production",
  prereqs: [],
  tiers: [],
  grill: "You are a Tech Lead interviewing a senior candidate.\n\nTOPIC: Conflict & Collaboration (Block 38)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Real scenarios — disagreeing with tech lead, handling underperforming teammate, pushing back on unrealistic deadlines.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 39, phase: "Behaviourial", chip: "soft", freq: "high",
  title: "Ownership & Delivery",
  subtitle: "Shipping production code, incident response, and post-mortem culture",
  prereqs: [],
  tiers: [],
  grill: "You are a Staff Engineer interviewing a candidate.\n\nTOPIC: Ownership & Delivery (Block 39)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production incidents, shipping culture, learning from failures.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
}
];