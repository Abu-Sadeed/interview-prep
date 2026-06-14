import type { Block } from '../../types/content';

export const jsbackendAdvanced: Block[] = [
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
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Advanced DI + Dynamic Modules",
            "items": [
              "<b>forwardRef():</b> resolve circular dependency. <code>@Inject(forwardRef(() =&gt; ServiceB))</code>. Circular deps are a code smell — consider merging modules.",
              "<b>Dynamic modules:</b> static forRoot(options): DynamicModule / forRootAsync(options). Used by @nestjs/config, TypeORM, Mongoose. Returns module definition configured by options.",
              "<b>register() vs forRoot():</b> register() = feature use (multiple instances). forRoot() = global singleton (once at app level).",
              "<b>Interceptors with RxJS:</b> next.handle() returns Observable. tap() for side effects. map() for response transformation. timeout() for request timeout."
            ]
          }
        ],
        "traps": [
          "forwardRef circular dependency is a code smell — if you need it, consider whether modules should be merged",
          "Dynamic module forRootAsync must handle async config — incorrect async factory causes silent failure",
          "RxJS operators in interceptors run per request — expensive operators can cause request storms"
        ],
        "checkpoint": [
          "How do you create a dynamic module that accepts database connection options?",
          "Write a NestJS interceptor that transforms all responses to {data: ..., status: 'success', timestamp: ...}.",
          "What causes circular dependency in NestJS and how does forwardRef() resolve it?"
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "NestJS Microservices",
            "items": [
              "<b>@nestjs/microservices:</b> built-in support. Transporters: TCP, Redis, NATS, Kafka, gRPC, RabbitMQ.",
              "<b>@MessagePattern('user.created'):</b> request-reply handler. @EventPattern: fire-and-forget event handler.",
              "<b>ClientProxy:</b> send messages to other microservices. send() returns Observable. emit() is fire-and-forget.",
              "<b>Hybrid app:</b> HTTP + microservice in same app. Handle both HTTP requests and microservice messages."
            ]
          }
        ],
        "traps": [
          "ClientProxy.send() returns Observable — must subscribe or convert to Promise, cannot just call",
          "@MessagePattern vs @EventPattern — send/reply vs fire-and-forget — wrong choice causes silent failures",
          "Microservice exceptions propagate back to caller as RPC error — handle correctly on both sides"
        ],
        "checkpoint": [
          "What is the difference between @MessagePattern and @EventPattern?",
          "How do you make a hybrid NestJS app handling both HTTP and Kafka messages?",
          "ClientProxy.send() returns Observable — what happens if you don't subscribe to it?"
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
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Error Handling + Process Management",
            "items": [
              "<b>Domains (deprecated) → AsyncLocalStorage (modern):</b> propagate context (trace IDs, user IDs) across async operations without passing explicitly.",
              "<b>Error types:</b> operational (network failure, validation) vs programmer (null dereference, type error). Operational = handle gracefully. Programmer = crash and restart.",
              "<b>Graceful shutdown:</b> SIGTERM → stop accepting new connections → drain in-flight requests → close DB connections → exit. PM2/Kubernetes sends SIGTERM before SIGKILL.",
              "<b>process.on('uncaughtException'):</b> last resort — log, flush, exit. Never recover and continue — process state is unknown.",
              "<b>Memory profiling:</b> --inspect flag + Chrome DevTools. v8.getHeapStatistics(). clinic.js for production profiling."
            ]
          }
        ],
        "traps": [
          "Catching uncaughtException and continuing is dangerous — heap may be corrupted, always exit after logging",
          "AsyncLocalStorage context is lost across certain native callbacks — test explicitly",
          "Not closing DB connections on graceful shutdown causes connection pool exhaustion on next deploy"
        ],
        "checkpoint": [
          "What is the difference between operational errors and programmer errors? How do you handle each?",
          "Walk me through a graceful shutdown implementation for a Node.js HTTP server.",
          "What is AsyncLocalStorage and what problem does it solve?"
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
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Performance + Architecture",
            "items": [
              "<b>Express is not opinionated</b> — you build the architecture. Common pattern: routes → controllers → services → repositories.",
              "<b>Fastify alternative:</b> 2-3x faster than Express. Schema-based validation (JSON Schema). Better TypeScript support. Plugin system.",
              "<b>Response compression:</b> compression() middleware. Gzip/Brotli. Significant bandwidth reduction for JSON APIs.",
              "<b>Keep-alive connections:</b> set server.keepAliveTimeout > load balancer timeout. AWS ALB default is 60s — set Node keepAliveTimeout to 65s.",
              "<b>Graceful shutdown in Express:</b> server.close() stops accepting. Drain active requests. Close DB connections. Then exit."
            ]
          },
          {
            "heading": "Security Hardening Patterns",
            "items": [
              "<b>Helmet deep config:</b> dnsPrefetchControl, expectCt, frameguard, hidePoweredBy, hsts, ieNoOpen, noSniff, referrerPolicy, xssFilter.",
              "<b>CSP policy design:</b> script-src 'self' cdnjs.net; style-src 'unsafe-inline' for CSS-in-JS. Strict CSP = breaking changes.",
              "<b>Request body limits:</b> json({ limit: '10kb' }) prevents large payload attacks. Validate size before processing.",
              "<b>HTTP parameter pollution:</b> req.query.filter can be array or string. Always normalize before use. Validation library handles this.",
              "<b>Security audit:</b> npm audit, Snyk, GHSA. Lock file integrity. Dependabot PRs for vulnerable deps."
            ]
          }
        ],
        "traps": [
          "Node.js keepAliveTimeout < load balancer timeout causes 502 errors — monitor metrics for connection drops",
          "Express without body limits = vulnerability to large payload DoS — always set limits",
          "Strict CSP breaks inline scripts — migrate to nonces or hashes for inline code"
        ],
        "checkpoint": [
          "What is the keepAliveTimeout issue with Express behind AWS ALB and how do you fix it?",
          "How do you design a CSP policy for an app that uses inline scripts and third-party CDNs?",
          "Walk me through securing an Express API against common web vulnerabilities."
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
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "Test Architecture",
            "items": [
              "<b>Testing pyramid:</b> many unit tests → fewer integration tests → fewer E2E tests. Unit tests fast and cheap. E2E slow and expensive.",
              "<b>Test coverage:</b> aim for meaningful coverage not 100%. Branch coverage more useful than line coverage. Coverage is a tool not a goal.",
              "<b>Contract testing (Pact):</b> consumer defines expected API contract. Provider verifies it. Catches breaking changes without E2E tests.",
              "<b>Mutation testing (Stryker):</b> introduces bugs into code, checks if tests catch them. Reveals weak assertions."
            ]
          }
        ],
        "traps": [
          "100% code coverage with weak assertions gives false confidence — tests pass even with bugs",
          "Too many E2E tests = slow, brittle CI pipeline — push tests down the pyramid",
          "Contract tests are not E2E tests — they test the contract/interface, not the full system"
        ],
        "checkpoint": [
          "Explain the testing pyramid. Why do you want more unit tests than E2E tests?",
          "What is contract testing and what problem does it solve that integration tests don't?",
          "I have 80% code coverage but bugs keep reaching production. What is wrong with my testing strategy?"
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Raw Queries + Transactions",
            "items": [
              "<b>Prisma transactions:</b> prisma.$transaction([...]) for interactive transactions. Ensures all-or-none.",
              "<b>Raw queries in Prisma:</b> prisma.$queryRaw`SELECT ...`. Template literal prevents SQL injection. Returns typed result.",
              "<b>TypeORM QueryRunner:</b> manual transaction control. startTransaction(), commitTransaction(), rollbackTransaction(). Use for complex flows.",
              "<b>Mongoose sessions:</b> await session.withTransaction(async () => {}). Requires MongoDB replica set for transactions.",
              "<b>Optimistic locking in TypeORM:</b> @Version() column. Same concept as JPA @Version."
            ]
          }
        ],
        "traps": [
          "Prisma.$queryRaw with string interpolation (not template literal) = SQL injection vulnerability",
          "Mongoose transactions require replica set — won't work on standalone MongoDB",
          "TypeORM interactive transactions lock rows — keep transactions short or risk deadlock"
        ],
        "checkpoint": [
          "How do you implement a transaction in Prisma that involves multiple model operations?",
          "What is the risk of prisma.$queryRaw('SELECT * FROM users WHERE id = ' + id)?",
          "When would you drop down to raw SQL even when using an ORM?"
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
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Testing NestJS Applications",
            "items": [
              "<b>TestBed patterns:</b> TestBed.configureTestingModule({ imports: [TestingModule] }). Use in-memory DB for integration.",
              "<b>e2e testing:</b> SuperTest with app.init() and app.close(). Test full request lifecycle including guards/interceptors.",
              "<b>Custom provider testing:</b> useValue for mocks, useFactory for conditional providers. Test different DI scenarios.",
              "<b>Gateway testing:</b> Create mock WebSocket server. Test message handling without real connections.",
              "<b>Contract testing with Pact:</b> Verify microservice calls match expected contracts. Prevent breaking changes."
            ]
          },
          {
            "heading": "Advanced Guard + Interceptor Patterns",
            "items": [
              "<b>Role-based guards:</b> extend CanActivate. Inject role hierarchy service. Cache role lookups.",
              "<b>Rate limiting interceptor:</b> Redis counter per user/IP. Sliding window or token bucket. Return 429 on exceed.",
              "<b>Logging interceptor:</b> capture request/response, duration, user context. Structured logging with correlation IDs.",
              "<b>Timeout interceptor:</b> AbortController with signal injection. Prevent hanging requests.",
              "<b>Composition pattern:</b> Apply multiple guards that must ALL pass (AND logic) vs ANY pass (OR logic)."
            ]
          }
        ],
        "traps": [
          "Testing with real database = flaky tests and slow CI — use SQLite in-memory or TestContainers",
          "Ignoring request context in interceptors = logs without user/session info — always capture context",
          "Rate limiting without cleanup strategy = Redis memory leak — TTL or periodic cleanup required"
        ],
        "checkpoint": [
          "How do you test a controller that uses JWT authentication without hitting the real auth service?",
          "Implement a rate limiter guard that uses sliding window with Redis. What are the edge cases?",
          "How do you track request processing time across all endpoints using an interceptor?"
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Advanced Microservice Patterns",
            "items": [
              "<b>Saga orchestration in NestJS:</b> Workflow engine with state machine. Event store for saga state. Compensation handlers.",
              "<b>Retry patterns with Redis:</b> Store message + retry count. Exponential backoff. Dead letter queue after max retries.",
              "<b>Event versioning:</b> Add version field to events. Backward compatible handlers. Migration strategy for old events.",
              "<b>Transaction boundaries:</b> Outbox pattern in same DB transaction as business logic. Polling publisher for reliability.",
              "<b>Idempotency in microservices:</b> Idempotency key in message header. Store processed keys with TTL. Deduplication at consumer."
            ]
          }
        ],
        "traps": [
          "Saga compensation not atomic → partial rollback → data inconsistency — design idempotent compensations",
          "Event version upgrades without backward compatibility break existing consumers",
          "Idempotency key lookup without index = slow queries at scale → composite index on (key, consumer)"
        ],
        "checkpoint": [
          "Design a payment processing flow with saga pattern. What are the compensation operations?",
          "How do you implement idempotent Kafka consumer in NestJS?",
          "What is the Outbox pattern and why is it better than dual-write?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a NestJS candidate.\n\nTOPIC: NestJS Advanced Architecture (Block 61)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Distributed systems patterns, event sourcing design decisions, debugging scenarios. 'WebSocket connections drop under load', 'event sourcing migration strategy', 'detect memory leak from metrics'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default jsbackendAdvanced;
