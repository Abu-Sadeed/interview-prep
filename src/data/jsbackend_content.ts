import type { Block } from '../types/content';

export const jsbackendContent: Block[] = [
  {
    "id": 18,
    "phase": "JS Backend",
    "chip": "nestjs",
    "freq": "med",
    "title": "NestJS — Core Internals",
    "subtitle": "DI container, module system, provider scopes, request pipeline order, custom providers",
    "prereqs": [
      5
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Module System",
            "items": [
              "<b>NestJS app = tree of modules.</b> Root AppModule at top. Feature modules imported as needed.",
              "<b>@Module:</b> imports (other modules), providers (services, guards etc.), controllers, exports (what this module exposes to importers).",
              "<b>Encapsulation:</b> providers are module-private by default. Must be in exports array to be injectable in other modules.",
              "<b>@Global():</b> module available everywhere without explicit import. Use sparingly — breaks encapsulation.",
              "<b>Feature module pattern:</b> UserModule with UserController, UserService, UserRepository. Self-contained."
            ]
          },
          {
            "heading": "Dependency Injection",
            "items": [
              "<b>@Injectable():</b> marks class as injectable provider.",
              "<b>Constructor injection:</b> TypeScript metadata drives DI. Types in constructor = what to inject.",
              "<b>Custom providers:</b> useValue (static/mock), useFactory (factory function, can be async), useClass (swap implementation), useExisting (alias).",
              "<b>Async providers with useFactory:</b> return a Promise. NestJS waits for resolution before injecting. For DB connections, config loading."
            ]
          }
        ],
        "traps": [
          "Provider not in exports array = not injectable in other modules — silent 'cannot resolve dependency' error at startup",
          "@Global() breaks encapsulation — use only for truly cross-cutting concerns (config, logger)",
          "Circular dependency causes 'Nest cannot resolve dependencies' at startup — use forwardRef()"
        ],
        "checkpoint": [
          "What is the difference between providers and exports in a NestJS module?",
          "How do you share a service between two separate modules?",
          "When would you use useFactory vs useClass in a custom provider?"
        ]
      },
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
      },
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
    "id": 19,
    "phase": "JS Backend",
    "chip": "nestjs",
    "freq": "med",
    "title": "NestJS — Advanced Patterns",
    "subtitle": "Dynamic modules, TypeORM integration, custom decorators, microservices, performance",
    "prereqs": [
      18
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "TypeORM Integration",
            "items": [
              "<b>TypeOrmModule.forRoot():</b> global DB connection config.",
              "<b>TypeOrmModule.forFeature([Entity]):</b> register entities per feature module.",
              "<b>@InjectRepository(User):</b> injects TypeORM repository. Use in service for CRUD.",
              "<b>Migrations:</b> TypeORM CLI generates migrations. NEVER use synchronize:true in production — drops/creates columns on entity changes.",
              "<b>Same concepts as JPA:</b> @Entity, @Column, @PrimaryGeneratedColumn, @OneToMany etc."
            ]
          }
        ],
        "traps": [
          "synchronize:true in TypeORM production config can drop columns — always use migrations",
          "@InjectRepository requires entity registered in TypeOrmModule.forFeature() in SAME module",
          "TypeOrmModule.forFeature() in wrong module = 'no repository for entity' error"
        ],
        "checkpoint": [
          "What is the difference between TypeOrmModule.forRoot() and forFeature()?",
          "Why is synchronize:true dangerous in production?",
          "How do you share a TypeORM repository between two modules?"
        ]
      },
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
      },
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
    "id": 40,
    "phase": "JS Backend",
    "chip": "messaging",
    "freq": "high",
    "title": "Node.js — Runtime Deep Dive",
    "subtitle": "Event loop phases, libuv, worker threads, streams, error handling, process management",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Event Loop — How Node Actually Works",
            "items": [
              "<b>Node.js = V8 (JS engine) + libuv (async I/O, event loop, thread pool).</b> V8 runs your JS. libuv handles everything async.",
              "<b>Single-threaded JS, multi-threaded I/O.</b> File reads, DNS, crypto run in libuv's thread pool (default 4 threads). Callbacks return to JS event loop.",
              "<b>Event loop phases (in order):</b> timers (setTimeout/setInterval) → pending callbacks → idle/prepare → poll (fetch I/O, block if empty) → check (setImmediate) → close callbacks.",
              "<b>Microtasks drain between every phase.</b> process.nextTick() and Promise callbacks run before the event loop moves to the next phase.",
              "<b>When Node blocks:</b> CPU-bound JS (long loops, heavy computation) blocks the event loop — all other requests wait."
            ]
          },
          {
            "heading": "Async Primitives",
            "items": [
              "<b>process.nextTick():</b> runs after current operation, before any I/O, before Promises. Can starve I/O if called recursively.",
              "<b>setImmediate():</b> runs in check phase — after I/O callbacks. Always fires before setTimeout(0) inside an I/O callback.",
              "<b>setTimeout(fn,0) vs setImmediate:</b> outside I/O callback — order is non-deterministic. Inside I/O callback — setImmediate always first.",
              "<b>Unhandled rejections:</b> crash process in Node v15+. Always handle Promise rejections or use process.on('unhandledRejection')."
            ]
          }
        ],
        "traps": [
          "process.nextTick() runs before Promises (microtasks in V8) — not after as many assume",
          "setImmediate vs setTimeout(0) order is non-deterministic unless inside an I/O callback",
          "CPU-bound work blocks event loop — 2 second loop = all clients wait 2 seconds"
        ],
        "checkpoint": [
          "What is the difference between setImmediate, setTimeout(0), and process.nextTick?",
          "Node.js is single-threaded. How does it handle 10,000 concurrent HTTP requests?",
          "What happens to other requests when your Node.js handler runs a 5-second bcrypt hash synchronously?"
        ]
      },
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
      },
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
    "id": 41,
    "phase": "JS Backend",
    "chip": "api",
    "freq": "high",
    "title": "Express.js — Patterns + Middleware",
    "subtitle": "Middleware chain, error handling, routing, security hardening, common production patterns",
    "prereqs": [
      40
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Middleware Chain",
            "items": [
              "<b>Express middleware = function(req, res, next).</b> Runs in order of registration. Call next() to pass to next middleware. Call next(err) to jump to error handler.",
              "<b>Application-level:</b> app.use(fn). Route-level: router.use(fn). Error-handling: function(err, req, res, next) — four arguments.",
              "<b>Order matters critically.</b> Body parser before routes. Auth middleware before protected routes. Error handler last.",
              "<b>Common middleware:</b> express.json() (parse JSON body), express.urlencoded() (parse forms), cors(), helmet() (security headers), morgan (logging)."
            ]
          },
          {
            "heading": "Routing Patterns",
            "items": [
              "<b>express.Router():</b> mini-application. Group related routes. Mount at a path: app.use('/api/users', userRouter).",
              "<b>Route parameters:</b> /users/:id — req.params.id. Query strings: /search?q=hello — req.query.q.",
              "<b>Async route handler trap:</b> async errors are NOT caught by Express automatically in older versions. Wrap with try/catch or use express-async-errors package."
            ]
          }
        ],
        "traps": [
          "Async errors in route handlers not caught by Express error handler without try/catch or express-async-errors",
          "next(err) skips all regular middleware and goes directly to error handler (4-arg function)",
          "Middleware registered after routes won't run for those routes — order of app.use() is execution order"
        ],
        "checkpoint": [
          "What is the difference between next() and next(err) in Express?",
          "I have an async route handler that throws. Does Express catch it automatically?",
          "Where in the middleware stack should authentication go? What about error handling?"
        ]
      },
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
      },
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
    "id": 42,
    "phase": "JS Backend",
    "chip": "api",
    "freq": "med",
    "title": "Node.js — Testing (Jest + Supertest)",
    "subtitle": "Unit testing, integration testing, mocking, Supertest, test architecture",
    "prereqs": [
      41
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Jest Fundamentals",
            "items": [
              "<b>Test structure:</b> describe() groups tests. it()/test() defines individual test. beforeEach/afterEach for setup/teardown.",
              "<b>Assertions:</b> expect(value).toBe() (strict equality), .toEqual() (deep equality), .toThrow(), .resolves/.rejects for promises.",
              "<b>jest.fn():</b> create mock function. Tracks calls, arguments, return values. .mockReturnValue(), .mockResolvedValue() for async.",
              "<b>jest.mock('module'):</b> replaces entire module. All exports become jest.fn(). Import the mock to configure it."
            ]
          }
        ],
        "traps": [
          "toBe() uses === (reference equality for objects) — use toEqual() for object comparison",
          "jest.mock() is hoisted to top of file — cannot use variables defined in test file",
          "Not clearing mocks between tests causes state leakage — use jest.clearAllMocks() in beforeEach"
        ],
        "checkpoint": [
          "What is the difference between toBe() and toEqual()?",
          "How do you mock a module dependency in Jest?",
          "What does jest.clearAllMocks() do and why do you need it?"
        ]
      },
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
      },
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
    "id": 43,
    "phase": "JS Backend",
    "chip": "db",
    "freq": "high",
    "title": "Node.js — Database Libraries",
    "subtitle": "Prisma vs TypeORM vs Mongoose — internals, trade-offs, migration patterns, N+1 in JS ORMs",
    "prereqs": [
      40
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Prisma",
            "items": [
              "<b>Prisma = type-safe ORM + query builder.</b> Schema-first: define models in schema.prisma, generate TypeScript client.",
              "<b>Prisma Client:</b> fully typed — autocompletion for all queries, relations, filters. Compile-time safety.",
              "<b>Migrations:</b> prisma migrate dev (development), prisma migrate deploy (production). Version-controlled SQL files.",
              "<b>Relations:</b> include (eager load), select (projection). No lazy loading — explicit fetching.",
              "<b>When Prisma wins:</b> TypeScript-first projects, clean migration workflow, team values type safety."
            ]
          },
          {
            "heading": "TypeORM",
            "items": [
              "<b>TypeORM = decorator-based ORM</b> similar to Hibernate. @Entity, @Column, @OneToMany etc.",
              "<b>Repository pattern:</b> getRepository(User).find(), findOne(), save(). Or DataSource.manager.",
              "<b>Lazy vs Eager loading:</b> supports both (unlike Prisma). Lazy = Promise-based getter.",
              "<b>Migrations:</b> typeorm migration:generate, migration:run. Generates from entity diff.",
              "<b>When TypeORM wins:</b> NestJS ecosystem (tight integration), teams coming from Java/Spring, need lazy loading."
            ]
          },
          {
            "heading": "Mongoose",
            "items": [
              "<b>Mongoose = ODM for MongoDB.</b> Schema, Model, Document. Not an ORM — MongoDB is document store.",
              "<b>Schema:</b> define shape and validation. Types, required, default, validators.",
              "<b>Middleware (hooks):</b> pre/post save, find, delete. For validation, hashing passwords, audit.",
              "<b>When Mongoose wins:</b> MongoDB, flexible schema, document-centric data model, rapid prototyping."
            ]
          }
        ],
        "traps": [
          "Prisma has no lazy loading — forgetting include causes missing relation data with no error",
          "TypeORM synchronize:true in production can drop columns — always use migrations",
          "Mongoose schema validation runs on save() but not on updateOne() by default — use runValidators option"
        ],
        "checkpoint": [
          "What is the key difference between Prisma and TypeORM in terms of how you define your data model?",
          "Prisma query returns user but user.posts is undefined. What is wrong?",
          "When would you choose Mongoose over Prisma?"
        ]
      },
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
      },
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
    "id": 60,
    "phase": "JS Backend",
    "chip": "nestjs",
    "freq": "high",
    "title": "NestJS — Production Patterns",
    "subtitle": "WebSocket scaling, caching strategies, file uploads, microservice patterns, testing approaches",
    "prereqs": [
      19,
      40
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "WebSocket Scaling + Gateway Patterns",
            "items": [
              "<b>Scaling gateways:</b> WebSocket state must be externalized (Redis adapter) for multi-instance deployments.",
              "<b>Rate limiting:</b> @UseGuards(WsRateLimitGuard) with Redis sliding window. Connection flood prevention.",
              "<b>Connection lifecycle:</b> handleConnection with user auth. handleDisconnect with cleanup. Exceptions disconnect client."
            ]
          },
          {
            "heading": "Caching + Redis Integration",
            "items": [
              "<b>CacheModule:</b> @Cacheable(), @CacheEvict(), @CacheClear() decorators. TTL, cache manager configuration.",
              "<b>Redis store:</b> configureCache({ store: redisStore, host, port, ttl }). All instances share cache.",
              "<b>Cache invalidation strategy:</b> Update DTO → evict related cache keys → next request hits fresh data.",
              "<b>Cache aside pattern:</b> Check cache → miss → fetch DB → populate cache. Never cache exceptions.",
              "<b>Multi-instance cache consistency:</b> Redis pub/sub for cache invalidation events across gateway instances."
            ]
          }
        ],
        "traps": [
          "WebSocket state stored in memory breaks horizontal scaling — use Redis adapter",
          "Cache stampede on cache miss → multiple requests hit DB simultaneously — use mutex or early recomputation",
          "Redis connection pool exhaustion → configure pool size and reuse connections"
        ],
        "checkpoint": [
          "How do you scale a WebSocket gateway across multiple NestJS instances?",
          "Implement a cache-aside pattern for a user profile endpoint with Redis.",
          "When would you evict a cache entry vs letting it expire naturally?"
        ]
      },
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
      },
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
    "id": 61,
    "phase": "JS Backend",
    "chip": "nestjs",
    "freq": "high",
    "title": "NestJS — Advanced Architecture",
    "subtitle": "CQRS, event sourcing, custom decorators, lifecycle hooks, performance optimization",
    "prereqs": [
      19,
      60
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "CQRS Pattern Implementation",
            "items": [
              "<b>CQRS setup:</b> Commands change state, Queries read state. Separate models for writes vs reads.",
              "<b>Commands:</b> @CommandHandler() with CommandBus. One command = one operation.",
              "<b>Events:</b> @EventsHandler() with EventBus. Multiple handlers can react to same event.",
              "<b>Event sourcing:</b> Store events, not state. Rebuild state by replaying events. Audit trail built-in.",
              "<b>CommandBus vs EventBus:</b> Commands expect exactly one handler, return result. Events broadcast to all handlers."
            ]
          },
          {
            "heading": "Custom Decorator Factory Patterns",
            "items": [
              "<b>Factory vs decorator:</b> createDecorator() creates injectable decorator with metadata. NoParamDecorator returns void.",
              "<b>User context decorator:</b> createDecorator<{ userId: string }>('User'). Pass request-scoped data to services.",
              "<b>Config decorator:</b> Inject configuration values based on runtime context. Environment-aware injection.",
              "<b>Role-based decorator:</b> @Roles('admin', 'manager') sets metadata. Guard reads and validates.",
              "<b>Performance:</b> SetMetadata + Reflector faster than parsing token in each guard."
            ]
          }
        ],
        "traps": [
          "CQRS without event sourcing still requires separate write/read models — not just commands and handlers",
          "Custom decorators without proper cleanup leak memory in long-running processes",
          "Roles decorator checked at runtime but metadata set at compile-time — order matters in DI"
        ],
        "checkpoint": [
          "When would you choose CQRS over a simple service pattern?",
          "How does a custom decorator transfer data from a guard to a service?",
          "What is the difference between CommandBus and EventBus in NestJS CQRS?"
        ]
      },
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
      },
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

export default jsbackendContent;
