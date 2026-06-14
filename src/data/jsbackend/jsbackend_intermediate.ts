import type { Block } from '../../types/content';

export const jsbackendIntermediate: Block[] = [
  {
    "id": "jsbackend-1",
    "phase": "JS Backend",
    "chip": "nestjs",
    "freq": "med",
    "title": "NestJS — Core Internals",
    "subtitle": "DI container, module system, provider scopes, request pipeline order, custom providers",
    "prereqs": [
      "java-5"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Request Pipeline Order",
            "items": [
              "<b>Execution order:</b> Middleware → Guards → Interceptors (pre) → Pipes → Route Handler → Interceptors (post) → Exception Filters.",
              "<b>Middleware:</b> Express/Fastify middleware. Access to req/res/next. Logging, token extraction.",
              "<b>Guards:</b> return boolean. false → 403 ForbiddenException. Runs BEFORE interceptors. For auth/authorization.",
              "<b>Interceptors:</b> wrap handler. Before AND after. Observable-based (RxJS). Transform responses, logging, timeout.",
              "<b>Pipes:</b> transform + validate. ValidationPipe uses class-validator.",
              "<b>Exception Filters:</b> catch unhandled exceptions. Transform to HTTP response."
            ]
          },
          {
            "heading": "Provider Scopes",
            "items": [
              "<b>DEFAULT (singleton):</b> one instance per application. Shared. Default.",
              "<b>REQUEST:</b> new instance per HTTP request. Fresh context per request. Expensive — new DI tree per request.",
              "<b>TRANSIENT:</b> new instance per injection point.",
              "<b>Scope propagation:</b> if singleton injects REQUEST-scoped provider → the singleton BECOMES request-scoped. Scope bubbles up the tree."
            ]
          }
        ],
        "traps": [
          "Guard returning false throws ForbiddenException (403) not UnauthorizedException (401) — use specific exceptions",
          "REQUEST scope propagation makes all dependents request-scoped — accidentally makes services expensive",
          "Pipes throw ValidationException by default — override with custom filter for custom error format"
        ],
        "checkpoint": [
          "A request comes in. Walk me through the complete NestJS pipeline in order.",
          "What is scope propagation? If REQUEST-scoped service is injected into singleton — what happens?",
          "Where in the pipeline do you handle JWT validation vs authorization?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a NestJS candidate.\n\nTOPIC: NestJS Core Internals (Block 18)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Module design decisions, pipeline understanding, scope awareness. Scenarios: 'build auth using guards and interceptors', 'why is this service creating new instance every request', 'should this be guard or middleware'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "jsbackend-2",
    "phase": "JS Backend",
    "chip": "nestjs",
    "freq": "med",
    "title": "NestJS — Advanced Patterns",
    "subtitle": "Dynamic modules, TypeORM integration, custom decorators, microservices, performance",
    "prereqs": [
      "jsbackend-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Custom Decorators",
            "items": [
              "<b>Parameter decorators:</b> <code>createParamDecorator((data, ctx) =&gt; ctx.switchToHttp().getRequest().user)</code>. Clean request data extraction.",
              "<b>@CurrentUser():</b> extract user from JWT-populated request. Clean alternative to @Req() everywhere.",
              "<b>applyDecorators():</b> compose multiple decorators. @ApiAuth() = @UseGuards(JwtGuard) + @ApiBearerAuth() + @ApiUnauthorizedResponse().",
              "<b>@SetMetadata + Reflector:</b> store metadata on handler/class, read in Guard. Role-based access control pattern."
            ]
          },
          {
            "heading": "Performance",
            "items": [
              "<b>Fastify adapter:</b> 2-3x faster than Express for high-throughput. FastifyAdapter drop-in. Some Express middleware incompatible.",
              "<b>NODE_ENV=production:</b> enables NestJS optimisations.",
              "<b>Compression middleware:</b> compress responses. Less critical for gRPC.",
              "<b>CPU-bound tasks:</b> Worker Threads or offload to separate service. Never block event loop."
            ]
          }
        ],
        "traps": [
          "Custom parameter decorators don't work with WS/RPC contexts without switching context type",
          "applyDecorators() order matters — decorators applied bottom-up",
          "Fastify adapter incompatibility with Express-specific middleware — test all middleware before switching"
        ],
        "checkpoint": [
          "Build a @Roles('admin') decorator system with a Guard that checks roles from JWT.",
          "What is the performance difference between Express and Fastify adapters? Why?",
          "How do you create @CurrentUser() decorator that extracts user from JWT-populated request?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a NestJS candidate.\n\nTOPIC: NestJS Advanced Patterns (Block 19)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Custom decorator design, microservice communication patterns, TypeORM integration gotchas.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "jsbackend-3",
    "phase": "JS Backend",
    "chip": "messaging",
    "freq": "high",
    "title": "Node.js — Runtime Deep Dive",
    "subtitle": "Event loop phases, libuv, worker threads, streams, error handling, process management",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Worker Threads + Cluster",
            "items": [
              "<b>Worker Threads (Node 12+):</b> true parallelism for CPU-bound JS. Separate V8 instance + event loop per worker. Communicate via postMessage/SharedArrayBuffer.",
              "<b>When to use Worker Threads:</b> image processing, video transcoding, heavy JSON parsing, crypto operations, ML inference.",
              "<b>Cluster module:</b> spawn N child processes (one per CPU). Each is a full Node process. OS distributes incoming connections. Zero-downtime restarts with PM2.",
              "<b>Worker Threads vs Cluster:</b> Threads share memory (SharedArrayBuffer), lower overhead. Cluster = separate processes, full isolation, crash safety."
            ]
          },
          {
            "heading": "Streams",
            "items": [
              "<b>Streams = data processed in chunks.</b> Readable, Writable, Duplex, Transform. Don't load entire file into memory.",
              "<b>Backpressure:</b> if writable is slower than readable, pipe() handles it automatically. Manual: check write() return value, pause readable if false.",
              "<b>pipeline() (Node 10+):</b> use instead of pipe(). Handles cleanup on error. <code>pipeline(readable, transform, writable, callback)</code>.",
              "<b>Common use:</b> file upload → transform → S3. HTTP response → gunzip → parse. Avoids OOM on large files."
            ]
          }
        ],
        "traps": [
          "Worker threads are NOT the same as cluster — threads share memory, cluster processes don't",
          "pipe() doesn't handle errors on intermediate streams — use pipeline() always",
          "UV_THREADPOOL_SIZE defaults to 4 — for high-concurrency file I/O or bcrypt, increase it"
        ],
        "checkpoint": [
          "When would you use Worker Threads vs Cluster module? What does each solve?",
          "What is backpressure in Node.js streams and how does pipeline() handle it?",
          "UV_THREADPOOL_SIZE=4. You have 10 concurrent bcrypt operations. What happens?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Node.js backend candidate.\n\nTOPIC: Node.js Runtime Deep Dive (Block 40)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Event loop execution order questions, production scenarios ('your service is slow under load — diagnose'), worker thread design decisions.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "jsbackend-4",
    "phase": "JS Backend",
    "chip": "api",
    "freq": "high",
    "title": "Express.js — Patterns + Middleware",
    "subtitle": "Middleware chain, error handling, routing, security hardening, common production patterns",
    "prereqs": [
      "jsbackend-3"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Security + Production Patterns",
            "items": [
              "<b>helmet():</b> sets 11 security headers in one call. X-Content-Type-Options, X-Frame-Options, HSTS, CSP etc.",
              "<b>Rate limiting:</b> express-rate-limit middleware. Store in Redis for distributed rate limiting (rate-limit-redis).",
              "<b>Input validation:</b> express-validator or Joi/Zod. Validate and sanitize before processing. Never trust req.body.",
              "<b>CORS configuration:</b> cors({ origin: allowedOrigins, credentials: true }). Whitelist specific origins in production.",
              "<b>Request timeout:</b> connect-timeout or manual setTimeout on req. Prevents hanging connections exhausting pool."
            ]
          },
          {
            "heading": "Error Handling Architecture",
            "items": [
              "<b>Centralized error handler:</b> one 4-argument middleware at end. Classify errors (operational vs programmer), log appropriately, return consistent error shape.",
              "<b>HTTP error classes:</b> create HttpError(statusCode, message). Throw from anywhere. Error handler formats response.",
              "<b>Consistent error response:</b> {error: {code, message, details}}. Never expose stack traces in production.",
              "<b>express-async-errors:</b> patches Express to handle async errors automatically. Require at app top."
            ]
          }
        ],
        "traps": [
          "cors() without origin whitelist allows all origins — always specify allowed origins in production",
          "express-rate-limit without Redis store means each process has separate counter — wrong for multi-process",
          "Not sending a response in error handler causes request to hang forever"
        ],
        "checkpoint": [
          "Design a centralized error handling middleware for an Express API. What does it need to handle?",
          "I have a rate limiter using express-rate-limit. My app runs on 4 CPUs with PM2 cluster mode. What is wrong?",
          "What does helmet() do and why do you always include it?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Node.js/Express backend candidate.\n\nTOPIC: Express.js Patterns (Block 41)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Middleware design patterns, security hardening scenarios, performance debugging. 'Your Express app consumes 100% CPU under load — diagnose it', 'how would you secure this API', 'middleware order causes authentication bypass'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "jsbackend-5",
    "phase": "JS Backend",
    "chip": "api",
    "freq": "med",
    "title": "Node.js — Testing (Jest + Supertest)",
    "subtitle": "Unit testing, integration testing, mocking, Supertest, test architecture",
    "prereqs": [
      "jsbackend-4"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Supertest + Integration Testing",
            "items": [
              "<b>Supertest:</b> HTTP assertions against Express/Fastify apps. No running server needed — passes app directly.",
              "<code>const res = await request(app).get('/users/1').set('Authorization', 'Bearer token').expect(200);</code>",
              "<b>Test database:</b> use separate test DB or in-memory SQLite. Reset between tests. Never test against production DB.",
              "<b>TestContainers (Node):</b> spin up real Postgres/Redis in Docker for integration tests. Slow but accurate.",
              "<b>Seed data:</b> consistent test data per test suite. Factories (fishery, factory-girl) generate test objects."
            ]
          },
          {
            "heading": "Mocking Strategies",
            "items": [
              "<b>Mock vs Stub vs Spy:</b> Mock = replace entirely, verify interactions. Stub = replace with canned response. Spy = wrap real impl, observe calls.",
              "<b>jest.spyOn(object, 'method'):</b> wraps real method, tracks calls. Can mock return value while keeping original.",
              "<b>Manual mocks (__mocks__ folder):</b> automatic mock for modules. Good for third-party services (Stripe, SendGrid).",
              "<b>What to mock:</b> external HTTP calls, database, email/SMS, time (jest.useFakeTimers()). Don't mock what you own."
            ]
          }
        ],
        "traps": [
          "Testing implementation details (internal methods) makes tests brittle — test behaviour not implementation",
          "Shared test state between tests causes flaky tests — always isolate, reset DB, clear mocks",
          "Not awaiting async assertions — test passes before assertion runs, always use await with async matchers"
        ],
        "checkpoint": [
          "What is the difference between a mock and a stub? Give an example of when you'd use each.",
          "Write a Supertest test for a POST /users endpoint that validates email uniqueness.",
          "How do you test code that depends on the current time?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Node.js backend candidate.\n\nTOPIC: Node.js Testing — Jest + Supertest (Block 42)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Test design decisions, mocking strategy, test architecture. Scenarios: 'your tests pass locally but fail in CI', 'how would you test this async function', 'what would you mock here'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "jsbackend-6",
    "phase": "JS Backend",
    "chip": "db",
    "freq": "high",
    "title": "Node.js — Database Libraries",
    "subtitle": "Prisma vs TypeORM vs Mongoose — internals, trade-offs, migration patterns, N+1 in JS ORMs",
    "prereqs": [
      "jsbackend-3"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "N+1 in JS ORMs",
            "items": [
              "<b>N+1 exists in JS ORMs too.</b> Prisma: findMany() then for each result, prisma.post.findMany() inside loop = N+1.",
              "<b>Prisma fix:</b> include: { posts: true } in the original findMany(). One query with JOIN.",
              "<b>DataLoader pattern:</b> batch and cache DB calls. Used heavily in GraphQL. Groups all calls in one tick into a single batched query.",
              "<b>Prisma select vs include:</b> select = projection (only specified fields). include = eager load relations (all fields + relation). Combine for projection of relations."
            ]
          },
          {
            "heading": "Connection Pooling in Node.js",
            "items": [
              "<b>Prisma connection pool:</b> connection_limit in DATABASE_URL. Default 5 * CPU count.",
              "<b>Serverless pooling:</b> Lambda/Vercel creates new connection per invocation. Use PgBouncer or Prisma Data Proxy / Accelerate.",
              "<b>Mongoose connection:</b> mongoose.connect() creates pool. maxPoolSize option.",
              "<b>TypeORM pool:</b> DataSource options: extra.max, extra.min."
            ]
          }
        ],
        "traps": [
          "Prisma in serverless without connection pooler exhausts Postgres connections instantly",
          "DataLoader caches per request only — don't share DataLoader instance between requests",
          "TypeORM query builder skips entity validation — using it for writes bypasses @Column constraints"
        ],
        "checkpoint": [
          "Show me N+1 happening in Prisma code and how you fix it.",
          "Why is Prisma problematic in serverless environments and what are the solutions?",
          "What is the DataLoader pattern and when do you use it?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Node.js backend candidate.\n\nTOPIC: Node.js Database Libraries — Prisma, TypeORM, Mongoose (Block 43)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Trade-off decisions ('which ORM for this project'), N+1 detection ('what is wrong with this code'), and production scenarios ('serverless app hitting connection limit').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "jsbackend-7",
    "phase": "JS Backend",
    "chip": "nestjs",
    "freq": "high",
    "title": "NestJS — Production Patterns",
    "subtitle": "WebSocket scaling, caching strategies, file uploads, microservice patterns, testing approaches",
    "prereqs": [
      "jsbackend-2",
      "jsbackend-3"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "File Upload + Streaming",
            "items": [
              "<b>Multipart upload:</b> @UseInterceptors(FileInterceptor('file')) with Multer configuration. Memory vs disk storage.",
              "<b>Validation pipeline:</b> ParseFilePipe with maxSize, fileMimeType, custom validators. Fail early on invalid uploads.",
              "<b>Stream to S3:</b> Use PassThrough stream with @S3() injection. Avoid loading entire file in memory for large files.",
              "<b>Progress tracking:</b> Custom interceptor wrapping busboy. Emit events for progress percentage.",
              "<b>Image processing pipeline:</b> Sharp integration with streams. Thumbnail generation, format conversion without temporary files."
            ]
          },
          {
            "heading": "Microservice Communication Patterns",
            "items": [
              "<b>Client proxy patterns:</b> ClientProxy.emit() for fire-and-forget, send() for request-response. Observable vs Promise conversion.",
              "<b>Kafka integration:</b> @EventPattern('user.created') with Kafka.js client. Consumer groups, manual offset commits.",
              "<b>gRPC patterns:</b> Unary, server streaming, client streaming, bidirectional streaming. Protobuf versioning strategy.",
              "<b>Message correlation:</b> UUID in message headers for request-response tracing. Async communication tracking.",
              "<b>Retry with exponential backoff:</b> Custom interceptor for retrying failed microservice calls. Circuit breaker integration."
            ]
          }
        ],
        "traps": [
          "Large file uploads in memory exhaust Node.js heap — always stream to disk or cloud storage",
          "Blocking the event loop with synchronous image processing — use Sharp streams or worker threads",
          "Microservice retries without backoff cause thundering herd — exponential backoff with jitter required"
        ],
        "checkpoint": [
          "How do you handle a 5GB file upload without running out of memory?",
          "Implement a Kafka consumer that manually commits offsets only after successful processing.",
          "Design a resilient gRPC client that handles service restarts gracefully."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a NestJS backend candidate.\n\nTOPIC: NestJS Production Patterns (Block 60)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production scenarios — 'WebSocket scaling breaks under load', 'rate limiter causes Redis outage', 'file uploads crash the service'. Test operational knowledge and debugging skills.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "jsbackend-8",
    "phase": "JS Backend",
    "chip": "nestjs",
    "freq": "high",
    "title": "NestJS — Advanced Architecture",
    "subtitle": "CQRS, event sourcing, custom decorators, lifecycle hooks, performance optimization",
    "prereqs": [
      "jsbackend-2",
      "jsbackend-7"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Lifecycle Hooks + Module Configuration",
            "items": [
              "<b>Injectable lifecycle:</b> OnModuleInit, OnModuleDestroy, BeforeApplicationShutdown. Cleanup async resources.",
              "<b>Asynchronous providers:</b> useFactory returning Promise. Module waits for provider resolution before init.",
              "<b>Dynamic module configuration:</b> register() accepts options. Async options via registerAsync().",
              "<b>Module lifecycle events:</b> OnApplicationBootstrap, OnApplicationShutdown. Run migrations, health checks.",
              "<b>Circular dependency resolution:</b> forwardRef() for module imports or provider injection. Breaks true circular deps."
            ]
          },
          {
            "heading": "Performance Optimization Patterns",
            "items": [
              "<b>Request pooling:</b> For external APIs, pool HTTP agents. Reuse connections, reduce TLS handshake overhead.",
              "<b>Response compression:</b> CompressionMiddleware for large JSON responses. Gzip/Brotli based on Accept-Encoding.",
              "<b>Memory leak detection:</b> node --inspect + Chrome DevTools heap snapshots. Monitor event listener growth.",
              "<b>Cluster mode:</b> PM2 or Node.js cluster module. Sticky sessions for WebSocket. Shared state via Redis.",
              "<b>Fastify adapter:</b> 2-3x performance improvement. Use reply.send() instead of res.json(). JSON schema validation."
            ]
          }
        ],
        "traps": [
          "OnModuleDestroy doesn't handle SIGKILL — graceful SIGTERM only",
          "Cluster mode without sticky sessions breaks WebSocket — use primary + workers with connection draining",
          "Fastify adapter changes response API — old code using res.status().json() breaks"
        ],
        "checkpoint": [
          "How do you gracefully close a NestJS application with ongoing requests?",
          "Implement a dynamic module that accepts async configuration from a remote source.",
          "How do you detect and fix a memory leak in a production NestJS service?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a NestJS candidate.\n\nTOPIC: NestJS Advanced Architecture (Block 61)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Distributed systems patterns, event sourcing design decisions, debugging scenarios. 'WebSocket connections drop under load', 'event sourcing migration strategy', 'detect memory leak from metrics'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default jsbackendIntermediate;
