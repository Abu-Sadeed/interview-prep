import type { Block } from '../../types/content';

export const jsbackendBeginner: Block[] = [
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
      }
    ],
    "grill": "You are a Senior Engineer interviewing a NestJS candidate.\n\nTOPIC: NestJS Advanced Architecture (Block 61)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Distributed systems patterns, event sourcing design decisions, debugging scenarios. 'WebSocket connections drop under load', 'event sourcing migration strategy', 'detect memory leak from metrics'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default jsbackendBeginner;
