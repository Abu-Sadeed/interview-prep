// ============================================================
// INTERVIEW PREP SYLLABUS — DATA PART 4 (Blocks 40–63)
// Covers: JS Backend (40-43, 60-64) | Frontend (44-48, 63) | Testing (49)
//         DevOps (50-57) | Behavioral (58) | System Design FE (59) | TypeScript (64)
// ============================================================

globalThis.BLOCKS_PART4 = [

// ════════════════════════════════════════════════════════════
// PHASE — JS BACKEND
// ════════════════════════════════════════════════════════════
{
  id:40, phase:"JS Backend", chip:"messaging", freq:"high", role:"backend",
  title:"Node.js — Runtime Deep Dive",
  subtitle:"Event loop phases, libuv, worker threads, streams, error handling, process management",
  prereqs:[],
  tiers:[
    {
      level:"Beginner", time:"40 min",
      sections:[
        { heading:"Event Loop — How Node Actually Works",
          items:[
            "<b>Node.js = V8 (JS engine) + libuv (async I/O, event loop, thread pool).</b> V8 runs your JS. libuv handles everything async.",
            "<b>Single-threaded JS, multi-threaded I/O.</b> File reads, DNS, crypto run in libuv's thread pool (default 4 threads). Callbacks return to JS event loop.",
            "<b>Event loop phases (in order):</b> timers (setTimeout/setInterval) → pending callbacks → idle/prepare → poll (fetch I/O, block if empty) → check (setImmediate) → close callbacks.",
            "<b>Microtasks drain between every phase.</b> process.nextTick() and Promise callbacks run before the event loop moves to the next phase.",
            "<b>When Node blocks:</b> CPU-bound JS (long loops, heavy computation) blocks the event loop — all other requests wait."
          ]
        },
        { heading:"Async Primitives",
          items:[
            "<b>process.nextTick():</b> runs after current operation, before any I/O, before Promises. Can starve I/O if called recursively.",
            "<b>setImmediate():</b> runs in check phase — after I/O callbacks. Always fires before setTimeout(0) inside an I/O callback.",
            "<b>setTimeout(fn,0) vs setImmediate:</b> outside I/O callback — order is non-deterministic. Inside I/O callback — setImmediate always first.",
            "<b>Unhandled rejections:</b> crash process in Node v15+. Always handle Promise rejections or use process.on('unhandledRejection')."
          ]
        }
      ],
      traps:[
        "process.nextTick() runs before Promises (microtasks in V8) — not after as many assume",
        "setImmediate vs setTimeout(0) order is non-deterministic unless inside an I/O callback",
        "CPU-bound work blocks event loop — 2 second loop = all clients wait 2 seconds"
      ],
      checkpoint:[
        "What is the difference between setImmediate, setTimeout(0), and process.nextTick?",
        "Node.js is single-threaded. How does it handle 10,000 concurrent HTTP requests?",
        "What happens to other requests when your Node.js handler runs a 5-second bcrypt hash synchronously?"
      ]
    },
    {
      level:"Intermediate", time:"40 min",
      sections:[
        { heading:"Worker Threads + Cluster",
          items:[
            "<b>Worker Threads (Node 12+):</b> true parallelism for CPU-bound JS. Separate V8 instance + event loop per worker. Communicate via postMessage/SharedArrayBuffer.",
            "<b>When to use Worker Threads:</b> image processing, video transcoding, heavy JSON parsing, crypto operations, ML inference.",
            "<b>Cluster module:</b> spawn N child processes (one per CPU). Each is a full Node process. OS distributes incoming connections. Zero-downtime restarts with PM2.",
            "<b>Worker Threads vs Cluster:</b> Threads share memory (SharedArrayBuffer), lower overhead. Cluster = separate processes, full isolation, crash safety."
          ]
        },
        { heading:"Streams",
          items:[
            "<b>Streams = data processed in chunks.</b> Readable, Writable, Duplex, Transform. Don't load entire file into memory.",
            "<b>Backpressure:</b> if writable is slower than readable, pipe() handles it automatically. Manual: check write() return value, pause readable if false.",
            "<b>pipeline() (Node 10+):</b> use instead of pipe(). Handles cleanup on error. <code>pipeline(readable, transform, writable, callback)</code>.",
            "<b>Common use:</b> file upload → transform → S3. HTTP response → gunzip → parse. Avoids OOM on large files."
          ]
        }
      ],
      traps:[
        "Worker threads are NOT the same as cluster — threads share memory, cluster processes don't",
        "pipe() doesn't handle errors on intermediate streams — use pipeline() always",
        "UV_THREADPOOL_SIZE defaults to 4 — for high-concurrency file I/O or bcrypt, increase it"
      ],
      checkpoint:[
        "When would you use Worker Threads vs Cluster module? What does each solve?",
        "What is backpressure in Node.js streams and how does pipeline() handle it?",
        "UV_THREADPOOL_SIZE=4. You have 10 concurrent bcrypt operations. What happens?"
      ]
    },
    {
      level:"Advanced", time:"35 min",
      sections:[
        { heading:"Error Handling + Process Management",
          items:[
            "<b>Domains (deprecated) → AsyncLocalStorage (modern):</b> propagate context (trace IDs, user IDs) across async operations without passing explicitly.",
            "<b>Error types:</b> operational (network failure, validation) vs programmer (null dereference, type error). Operational = handle gracefully. Programmer = crash and restart.",
            "<b>Graceful shutdown:</b> SIGTERM → stop accepting new connections → drain in-flight requests → close DB connections → exit. PM2/Kubernetes sends SIGTERM before SIGKILL.",
            "<b>process.on('uncaughtException'):</b> last resort — log, flush, exit. Never recover and continue — process state is unknown.",
            "<b>Memory profiling:</b> --inspect flag + Chrome DevTools. v8.getHeapStatistics(). clinic.js for production profiling."
          ]
        }
      ],
      traps:[
        "Catching uncaughtException and continuing is dangerous — heap may be corrupted, always exit after logging",
        "AsyncLocalStorage context is lost across certain native callbacks — test explicitly",
        "Not closing DB connections on graceful shutdown causes connection pool exhaustion on next deploy"
      ],
      checkpoint:[
        "What is the difference between operational errors and programmer errors? How do you handle each?",
        "Walk me through a graceful shutdown implementation for a Node.js HTTP server.",
        "What is AsyncLocalStorage and what problem does it solve?"
      ]
    }
  ],
  grill:`You are a Senior Engineer interviewing a Node.js backend candidate.\n\nTOPIC: Node.js Runtime Deep Dive (Block 40)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Event loop execution order questions, production scenarios ('your service is slow under load — diagnose'), worker thread design decisions.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:41, phase:"JS Backend", chip:"api", freq:"high", role:"backend",
  title:"Express.js — Patterns + Middleware",
  subtitle:"Middleware chain, error handling, routing, security hardening, common production patterns",
  prereqs:[40],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"Middleware Chain",
          items:[
            "<b>Express middleware = function(req, res, next).</b> Runs in order of registration. Call next() to pass to next middleware. Call next(err) to jump to error handler.",
            "<b>Application-level:</b> app.use(fn). Route-level: router.use(fn). Error-handling: function(err, req, res, next) — four arguments.",
            "<b>Order matters critically.</b> Body parser before routes. Auth middleware before protected routes. Error handler last.",
            "<b>Common middleware:</b> express.json() (parse JSON body), express.urlencoded() (parse forms), cors(), helmet() (security headers), morgan (logging)."
          ]
        },
        { heading:"Routing Patterns",
          items:[
            "<b>express.Router():</b> mini-application. Group related routes. Mount at a path: app.use('/api/users', userRouter).",
            "<b>Route parameters:</b> /users/:id — req.params.id. Query strings: /search?q=hello — req.query.q.",
            "<b>Async route handler trap:</b> async errors are NOT caught by Express automatically in older versions. Wrap with try/catch or use express-async-errors package."
          ]
        }
      ],
      traps:[
        "Async errors in route handlers not caught by Express error handler without try/catch or express-async-errors",
        "next(err) skips all regular middleware and goes directly to error handler (4-arg function)",
        "Middleware registered after routes won't run for those routes — order of app.use() is execution order"
      ],
      checkpoint:[
        "What is the difference between next() and next(err) in Express?",
        "I have an async route handler that throws. Does Express catch it automatically?",
        "Where in the middleware stack should authentication go? What about error handling?"
      ]
    },
    {
      level:"Intermediate", time:"35 min",
      sections:[
        { heading:"Security + Production Patterns",
          items:[
            "<b>helmet():</b> sets 11 security headers in one call. X-Content-Type-Options, X-Frame-Options, HSTS, CSP etc.",
            "<b>Rate limiting:</b> express-rate-limit middleware. Store in Redis for distributed rate limiting (rate-limit-redis).",
            "<b>Input validation:</b> express-validator or Joi/Zod. Validate and sanitize before processing. Never trust req.body.",
            "<b>CORS configuration:</b> cors({ origin: allowedOrigins, credentials: true }). Whitelist specific origins in production.",
            "<b>Request timeout:</b> connect-timeout or manual setTimeout on req. Prevents hanging connections exhausting pool."
          ]
        },
        { heading:"Error Handling Architecture",
          items:[
            "<b>Centralized error handler:</b> one 4-argument middleware at end. Classify errors (operational vs programmer), log appropriately, return consistent error shape.",
            "<b>HTTP error classes:</b> create HttpError(statusCode, message). Throw from anywhere. Error handler formats response.",
            "<b>Consistent error response:</b> {error: {code, message, details}}. Never expose stack traces in production.",
            "<b>express-async-errors:</b> patches Express to handle async errors automatically. Require at app top."
          ]
        }
      ],
      traps:[
        "cors() without origin whitelist allows all origins — always specify allowed origins in production",
        "express-rate-limit without Redis store means each process has separate counter — wrong for multi-process",
        "Not sending a response in error handler causes request to hang forever"
      ],
      checkpoint:[
        "Design a centralized error handling middleware for an Express API. What does it need to handle?",
        "I have a rate limiter using express-rate-limit. My app runs on 4 CPUs with PM2 cluster mode. What is wrong?",
        "What does helmet() do and why do you always include it?"
      ]
    },
{
       level:"Advanced", time:"35 min",
       sections:[
         { heading:"Performance + Architecture",
           items:[
             "<b>Express is not opinionated</b> — you build the architecture. Common pattern: routes → controllers → services → repositories.",
             "<b>Fastify alternative:</b> 2-3x faster than Express. Schema-based validation (JSON Schema). Better TypeScript support. Plugin system.",
             "<b>Response compression:</b> compression() middleware. Gzip/Brotli. Significant bandwidth reduction for JSON APIs.",
             "<b>Keep-alive connections:</b> set server.keepAliveTimeout > load balancer timeout. AWS ALB default is 60s — set Node keepAliveTimeout to 65s.",
             "<b>Graceful shutdown in Express:</b> server.close() stops accepting. Drain active requests. Close DB connections. Then exit."
           ]
         },
         { heading:"Security Hardening Patterns",
           items:[
             "<b>Helmet deep config:</b> dnsPrefetchControl, expectCt, frameguard, hidePoweredBy, hsts, ieNoOpen, noSniff, referrerPolicy, xssFilter.",
             "<b>CSP policy design:</b> script-src 'self' cdnjs.net; style-src 'unsafe-inline' for CSS-in-JS. Strict CSP = breaking changes.",
             "<b>Request body limits:</b> json({ limit: '10kb' }) prevents large payload attacks. Validate size before processing.",
             "<b>HTTP parameter pollution:</b> req.query.filter can be array or string. Always normalize before use. Validation library handles this.",
             "<b>Security audit:</b> npm audit, Snyk, GHSA. Lock file integrity. Dependabot PRs for vulnerable deps."
           ]
         }
       ],
       traps:[
         "Node.js keepAliveTimeout < load balancer timeout causes 502 errors — monitor metrics for connection drops",
         "Express without body limits = vulnerability to large payload DoS — always set limits",
         "Strict CSP breaks inline scripts — migrate to nonces or hashes for inline code"
       ],
       checkpoint:[
         "What is the keepAliveTimeout issue with Express behind AWS ALB and how do you fix it?",
         "How do you design a CSP policy for an app that uses inline scripts and third-party CDNs?",
         "Walk me through securing an Express API against common web vulnerabilities."
       ]
     }
   ],
   grill:`You are a Senior Engineer interviewing a Node.js/Express backend candidate.\n\nTOPIC: Express.js Patterns (Block 41)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Middleware design patterns, security hardening scenarios, performance debugging. 'Your Express app consumes 100% CPU under load — diagnose it', 'how would you secure this API', 'middleware order causes authentication bypass'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:42, phase:"JS Backend", chip:"api", freq:"med", role:"backend",
  title:"Node.js — Testing (Jest + Supertest)",
  subtitle:"Unit testing, integration testing, mocking, Supertest, test architecture",
  prereqs:[41],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"Jest Fundamentals",
          items:[
            "<b>Test structure:</b> describe() groups tests. it()/test() defines individual test. beforeEach/afterEach for setup/teardown.",
            "<b>Assertions:</b> expect(value).toBe() (strict equality), .toEqual() (deep equality), .toThrow(), .resolves/.rejects for promises.",
            "<b>jest.fn():</b> create mock function. Tracks calls, arguments, return values. .mockReturnValue(), .mockResolvedValue() for async.",
            "<b>jest.mock('module'):</b> replaces entire module. All exports become jest.fn(). Import the mock to configure it."
          ]
        }
      ],
      traps:[
        "toBe() uses === (reference equality for objects) — use toEqual() for object comparison",
        "jest.mock() is hoisted to top of file — cannot use variables defined in test file",
        "Not clearing mocks between tests causes state leakage — use jest.clearAllMocks() in beforeEach"
      ],
      checkpoint:[
        "What is the difference between toBe() and toEqual()?",
        "How do you mock a module dependency in Jest?",
        "What does jest.clearAllMocks() do and why do you need it?"
      ]
    },
    {
      level:"Intermediate", time:"35 min",
      sections:[
        { heading:"Supertest + Integration Testing",
          items:[
            "<b>Supertest:</b> HTTP assertions against Express/Fastify apps. No running server needed — passes app directly.",
            "<code>const res = await request(app).get('/users/1').set('Authorization', 'Bearer token').expect(200);</code>",
            "<b>Test database:</b> use separate test DB or in-memory SQLite. Reset between tests. Never test against production DB.",
            "<b>TestContainers (Node):</b> spin up real Postgres/Redis in Docker for integration tests. Slow but accurate.",
            "<b>Seed data:</b> consistent test data per test suite. Factories (fishery, factory-girl) generate test objects."
          ]
        },
        { heading:"Mocking Strategies",
          items:[
            "<b>Mock vs Stub vs Spy:</b> Mock = replace entirely, verify interactions. Stub = replace with canned response. Spy = wrap real impl, observe calls.",
            "<b>jest.spyOn(object, 'method'):</b> wraps real method, tracks calls. Can mock return value while keeping original.",
            "<b>Manual mocks (__mocks__ folder):</b> automatic mock for modules. Good for third-party services (Stripe, SendGrid).",
            "<b>What to mock:</b> external HTTP calls, database, email/SMS, time (jest.useFakeTimers()). Don't mock what you own."
          ]
        }
      ],
      traps:[
        "Testing implementation details (internal methods) makes tests brittle — test behaviour not implementation",
        "Shared test state between tests causes flaky tests — always isolate, reset DB, clear mocks",
        "Not awaiting async assertions — test passes before assertion runs, always use await with async matchers"
      ],
      checkpoint:[
        "What is the difference between a mock and a stub? Give an example of when you'd use each.",
        "Write a Supertest test for a POST /users endpoint that validates email uniqueness.",
        "How do you test code that depends on the current time?"
      ]
    },
    {
      level:"Advanced", time:"25 min",
      sections:[
        { heading:"Test Architecture",
          items:[
            "<b>Testing pyramid:</b> many unit tests → fewer integration tests → fewer E2E tests. Unit tests fast and cheap. E2E slow and expensive.",
            "<b>Test coverage:</b> aim for meaningful coverage not 100%. Branch coverage more useful than line coverage. Coverage is a tool not a goal.",
            "<b>Contract testing (Pact):</b> consumer defines expected API contract. Provider verifies it. Catches breaking changes without E2E tests.",
            "<b>Mutation testing (Stryker):</b> introduces bugs into code, checks if tests catch them. Reveals weak assertions."
          ]
        }
      ],
      traps:[
        "100% code coverage with weak assertions gives false confidence — tests pass even with bugs",
        "Too many E2E tests = slow, brittle CI pipeline — push tests down the pyramid",
        "Contract tests are not E2E tests — they test the contract/interface, not the full system"
      ],
      checkpoint:[
        "Explain the testing pyramid. Why do you want more unit tests than E2E tests?",
        "What is contract testing and what problem does it solve that integration tests don't?",
        "I have 80% code coverage but bugs keep reaching production. What is wrong with my testing strategy?"
      ]
    }
  ],
  grill:`You are a Senior Engineer interviewing a Node.js backend candidate.\n\nTOPIC: Node.js Testing — Jest + Supertest (Block 42)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Test design decisions, mocking strategy, test architecture. Scenarios: 'your tests pass locally but fail in CI', 'how would you test this async function', 'what would you mock here'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:43, phase:"JS Backend", chip:"db", freq:"high", role:"backend",
  title:"Node.js — Database Libraries",
  subtitle:"Prisma vs TypeORM vs Mongoose — internals, trade-offs, migration patterns, N+1 in JS ORMs",
  prereqs:[40],
  tiers:[
    {
      level:"Beginner", time:"35 min",
      sections:[
        { heading:"Prisma",
          items:[
            "<b>Prisma = type-safe ORM + query builder.</b> Schema-first: define models in schema.prisma, generate TypeScript client.",
            "<b>Prisma Client:</b> fully typed — autocompletion for all queries, relations, filters. Compile-time safety.",
            "<b>Migrations:</b> prisma migrate dev (development), prisma migrate deploy (production). Version-controlled SQL files.",
            "<b>Relations:</b> include (eager load), select (projection). No lazy loading — explicit fetching.",
            "<b>When Prisma wins:</b> TypeScript-first projects, clean migration workflow, team values type safety."
          ]
        },
        { heading:"TypeORM",
          items:[
            "<b>TypeORM = decorator-based ORM</b> similar to Hibernate. @Entity, @Column, @OneToMany etc.",
            "<b>Repository pattern:</b> getRepository(User).find(), findOne(), save(). Or DataSource.manager.",
            "<b>Lazy vs Eager loading:</b> supports both (unlike Prisma). Lazy = Promise-based getter.",
            "<b>Migrations:</b> typeorm migration:generate, migration:run. Generates from entity diff.",
            "<b>When TypeORM wins:</b> NestJS ecosystem (tight integration), teams coming from Java/Spring, need lazy loading."
          ]
        },
        { heading:"Mongoose",
          items:[
            "<b>Mongoose = ODM for MongoDB.</b> Schema, Model, Document. Not an ORM — MongoDB is document store.",
            "<b>Schema:</b> define shape and validation. Types, required, default, validators.",
            "<b>Middleware (hooks):</b> pre/post save, find, delete. For validation, hashing passwords, audit.",
            "<b>When Mongoose wins:</b> MongoDB, flexible schema, document-centric data model, rapid prototyping."
          ]
        }
      ],
      traps:[
        "Prisma has no lazy loading — forgetting include causes missing relation data with no error",
        "TypeORM synchronize:true in production can drop columns — always use migrations",
        "Mongoose schema validation runs on save() but not on updateOne() by default — use runValidators option"
      ],
      checkpoint:[
        "What is the key difference between Prisma and TypeORM in terms of how you define your data model?",
        "Prisma query returns user but user.posts is undefined. What is wrong?",
        "When would you choose Mongoose over Prisma?"
      ]
    },
    {
      level:"Intermediate", time:"40 min",
      sections:[
        { heading:"N+1 in JS ORMs",
          items:[
            "<b>N+1 exists in JS ORMs too.</b> Prisma: findMany() then for each result, prisma.post.findMany() inside loop = N+1.",
            "<b>Prisma fix:</b> include: { posts: true } in the original findMany(). One query with JOIN.",
            "<b>DataLoader pattern:</b> batch and cache DB calls. Used heavily in GraphQL. Groups all calls in one tick into a single batched query.",
            "<b>Prisma select vs include:</b> select = projection (only specified fields). include = eager load relations (all fields + relation). Combine for projection of relations."
          ]
        },
        { heading:"Connection Pooling in Node.js",
          items:[
            "<b>Prisma connection pool:</b> connection_limit in DATABASE_URL. Default 5 * CPU count.",
            "<b>Serverless pooling:</b> Lambda/Vercel creates new connection per invocation. Use PgBouncer or Prisma Data Proxy / Accelerate.",
            "<b>Mongoose connection:</b> mongoose.connect() creates pool. maxPoolSize option.",
            "<b>TypeORM pool:</b> DataSource options: extra.max, extra.min."
          ]
        }
      ],
      traps:[
        "Prisma in serverless without connection pooler exhausts Postgres connections instantly",
        "DataLoader caches per request only — don't share DataLoader instance between requests",
        "TypeORM query builder skips entity validation — using it for writes bypasses @Column constraints"
      ],
      checkpoint:[
        "Show me N+1 happening in Prisma code and how you fix it.",
        "Why is Prisma problematic in serverless environments and what are the solutions?",
        "What is the DataLoader pattern and when do you use it?"
      ]
    },
    {
      level:"Advanced", time:"30 min",
      sections:[
        { heading:"Raw Queries + Transactions",
          items:[
            "<b>Prisma transactions:</b> prisma.$transaction([...]) for interactive transactions. Ensures all-or-none.",
            "<b>Raw queries in Prisma:</b> prisma.$queryRaw`SELECT ...`. Template literal prevents SQL injection. Returns typed result.",
            "<b>TypeORM QueryRunner:</b> manual transaction control. startTransaction(), commitTransaction(), rollbackTransaction(). Use for complex flows.",
            "<b>Mongoose sessions:</b> await session.withTransaction(async () => {}). Requires MongoDB replica set for transactions.",
            "<b>Optimistic locking in TypeORM:</b> @Version() column. Same concept as JPA @Version."
          ]
        }
      ],
      traps:[
        "Prisma.$queryRaw with string interpolation (not template literal) = SQL injection vulnerability",
        "Mongoose transactions require replica set — won't work on standalone MongoDB",
        "TypeORM interactive transactions lock rows — keep transactions short or risk deadlock"
      ],
      checkpoint:[
        "How do you implement a transaction in Prisma that involves multiple model operations?",
        "What is the risk of prisma.$queryRaw('SELECT * FROM users WHERE id = ' + id)?",
        "When would you drop down to raw SQL even when using an ORM?"
      ]
    }
  ],
  grill:`You are a Senior Engineer interviewing a Node.js backend candidate.\n\nTOPIC: Node.js Database Libraries — Prisma, TypeORM, Mongoose (Block 43)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Trade-off decisions ('which ORM for this project'), N+1 detection ('what is wrong with this code'), and production scenarios ('serverless app hitting connection limit').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

// ════════════════════════════════════════════════════════════
// PHASE — FRONTEND
// ════════════════════════════════════════════════════════════
{
  id:44, phase:"Frontend", chip:"frontend", freq:"high", role:"frontend",
  title:"CSS — Box Model, Flexbox, Grid",
  subtitle:"Box model, positioning, Flexbox mental model, Grid layout, responsive design, common patterns",
  prereqs:[],
  tiers:[
    {
      level:"Beginner", time:"35 min",
      sections:[
        { heading:"Box Model",
          items:[
            "<b>Every element = content + padding + border + margin.</b> Box-sizing: content-box (default, width = content only). box-sizing: border-box (width includes padding + border — use this always).",
            "<b>Margin collapse:</b> vertical margins between adjacent blocks collapse to the larger of the two. Horizontal margins never collapse.",
            "<b>display values:</b> block (full width, new line), inline (content width, no top/bottom margin), inline-block (content width + accepts margin/padding), flex, grid, none.",
            "<b>position:</b> static (default, in flow), relative (offset from normal position, still in flow), absolute (removed from flow, positioned relative to nearest positioned ancestor), fixed (relative to viewport), sticky (hybrid)."
          ]
        },
        { heading:"Flexbox",
          items:[
            "<b>Flex container:</b> display:flex. Main axis (flex-direction) and cross axis.",
            "<b>justify-content:</b> alignment on main axis. flex-start, center, flex-end, space-between, space-around.",
            "<b>align-items:</b> alignment on cross axis. stretch (default), center, flex-start, flex-end, baseline.",
            "<b>flex property on child:</b> flex: grow shrink basis. flex:1 = flex:1 1 0 (grow, shrink equally, start from 0).",
            "<b>flex-wrap:</b> nowrap (default, overflow) or wrap (items wrap to next line)."
          ]
        }
      ],
      traps:[
        "box-sizing: content-box by default — adding padding changes element size. Always reset to border-box.",
        "Margin collapse is vertical only — horizontal margins always add",
        "position:absolute removes element from flow — other elements ignore it"
      ],
      checkpoint:[
        "What is box-sizing: border-box and why do most CSS resets include it?",
        "What is the difference between justify-content and align-items in Flexbox?",
        "I set margin-top:20px on two adjacent divs. What is the actual margin between them?"
      ]
    },
    {
      level:"Intermediate", time:"40 min",
      sections:[
        { heading:"CSS Grid",
          items:[
            "<b>Grid = two-dimensional layout.</b> Flexbox = one-dimensional. Use Grid for page layout, Flexbox for component layout.",
            "<b>grid-template-columns:</b> repeat(3, 1fr) = 3 equal columns. repeat(auto-fill, minmax(200px, 1fr)) = responsive without media queries.",
            "<b>grid-column/row:</b> span items across multiple cells. grid-column: 1 / 3 (from line 1 to line 3 = 2 columns).",
            "<b>grid-template-areas:</b> named areas for semantic layout. Place items with grid-area: header."
          ]
        },
        { heading:"Responsive Design",
          items:[
            "<b>Mobile-first:</b> base styles for mobile, media queries add complexity for larger screens. @media (min-width: 768px) {}.",
            "<b>CSS custom properties (variables):</b> --color-primary: #4d9eff. var(--color-primary). Cascade and inherit. Change at :root for theming.",
            "<b>clamp():</b> clamp(min, preferred, max). clamp(1rem, 4vw, 2rem) — fluid typography without media queries.",
            "<b>Specificity order:</b> inline style > ID > class/pseudo-class/attribute > element. !important overrides all (avoid)."
          ]
        }
      ],
      traps:[
        "Grid and Flexbox are not mutually exclusive — use Grid for outer layout, Flexbox for inner component alignment",
        "z-index only works on positioned elements (not static) — common source of layering bugs",
        "CSS specificity: class beats element, ID beats class. Two classes don't beat one ID"
      ],
      checkpoint:[
        "When would you use CSS Grid vs Flexbox? Give a concrete layout example for each.",
        "What is CSS specificity? Which wins: two classes vs one ID?",
        "Implement a responsive 3-column card grid that collapses to 1 column on mobile without media queries."
      ]
    },
    {
      level:"Advanced", time:"30 min",
      sections:[
        { heading:"Performance + Modern CSS",
          items:[
            "<b>Critical rendering path:</b> HTML parsing → DOM → CSS parsing → CSSOM → Render tree → Layout → Paint → Composite.",
            "<b>Reflow (layout):</b> changing width, height, position recalculates layout. Expensive. Batch DOM reads/writes.",
            "<b>Repaint:</b> changing color, background — no layout recalc. Cheaper than reflow.",
            "<b>GPU-accelerated properties:</b> transform, opacity, filter — run on compositor thread, no reflow/repaint. Animate these instead of left/top/width.",
            "<b>CSS containment:</b> contain: layout paint style — tells browser this element's internals don't affect outside. Performance isolation.",
            "<b>Container queries:</b> @container (min-width: 400px) {} — style based on parent container size, not viewport. Modern responsive design."
          ]
        }
      ],
      traps:[
        "Animating left/top instead of transform causes reflow on every frame — use transform:translateX() instead",
        "will-change: transform creates a new stacking context and promotes to GPU — use sparingly, not on every element",
        "Container queries require contain: inline-size on the parent — often forgotten"
      ],
      checkpoint:[
        "What is the difference between reflow and repaint? Which is more expensive and why?",
        "Why should you animate transform instead of left/top for smooth animations?",
        "What are container queries and how do they differ from media queries?"
      ]
    }
  ],
  grill:`You are a Senior Engineer interviewing a frontend candidate.\n\nTOPIC: CSS — Box Model, Flexbox, Grid (Block 44)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix concept questions with layout design tasks. 'Implement this layout using CSS', 'why is your animation janky', 'what is wrong with this CSS specificity'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:45, phase:"Frontend", chip:"frontend", freq:"med", role:"frontend",
  title:"Browser — Rendering Pipeline + Performance",
  subtitle:"Critical rendering path, Web Vitals, lazy loading, code splitting, memory leaks, DevTools",
  prereqs:[44],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"Critical Rendering Path",
          items:[
            "<b>Steps:</b> Download HTML → parse DOM → download + parse CSS → build CSSOM → combine DOM+CSSOM into Render Tree → Layout (calculate positions) → Paint (pixels) → Composite (layers).",
            "<b>Render-blocking resources:</b> CSS in &lt;head&gt; blocks rendering until parsed. JS in &lt;head&gt; without async/defer blocks HTML parsing.",
            "<b>async vs defer on scripts:</b> async = download in parallel, execute as soon as downloaded (order not guaranteed). defer = download in parallel, execute after HTML parsed (order preserved).",
            "<b>Preload, prefetch, preconnect:</b> &lt;link rel='preload'&gt; = fetch resource now, high priority. prefetch = fetch for next navigation. preconnect = establish connection early."
          ]
        }
      ],
      traps:[
        "&lt;script&gt; without async or defer blocks HTML parsing — always add one for external scripts",
        "async scripts don't execute in order — for dependent scripts use defer",
        "Preloading too many resources competes with critical path resources"
      ],
      checkpoint:[
        "What is the difference between async and defer on a script tag?",
        "What does 'render-blocking' mean? How do you eliminate render-blocking CSS?",
        "What is the Critical Rendering Path and which step is most expensive?"
      ]
    },
    {
      level:"Intermediate", time:"40 min",
      sections:[
        { heading:"Core Web Vitals",
          items:[
            "<b>LCP (Largest Contentful Paint):</b> time until largest content element rendered. Target &lt;2.5s. Affected by: slow server, render-blocking resources, slow images.",
            "<b>CLS (Cumulative Layout Shift):</b> visual stability. Elements moving unexpectedly. Target &lt;0.1. Fix: size attributes on images/video, avoid inserting content above fold.",
            "<b>INP (Interaction to Next Paint):</b> responsiveness to clicks/taps. Target &lt;200ms. Caused by: long JS tasks, heavy event handlers.",
            "<b>TTFB (Time to First Byte):</b> server response time. Not a Core Web Vital but foundational. Fix: CDN, server optimisation, caching."
          ]
        },
        { heading:"Performance Optimisation",
          items:[
            "<b>Lazy loading images:</b> &lt;img loading='lazy'&gt;. Native browser support. Images below fold load on scroll.",
            "<b>Code splitting:</b> dynamic import() creates separate chunks. Load only what current route needs. React.lazy() + Suspense for component-level splitting.",
            "<b>Bundle analysis:</b> webpack-bundle-analyzer, Vite rollup-plugin-visualizer. Find large dependencies.",
            "<b>Tree shaking:</b> dead code elimination. Requires ES modules (import/export). CommonJS (require) blocks tree shaking."
          ]
        }
      ],
      traps:[
        "Images without explicit width/height cause CLS — browser doesn't know how much space to reserve",
        "Tree shaking requires ES modules — barrel files (index.js that re-exports everything) often defeat tree shaking",
        "Code splitting too aggressively creates waterfall of small requests — balance chunk size"
      ],
      checkpoint:[
        "What are the three Core Web Vitals and what does each measure?",
        "My page has images that cause layout shift on load. What is causing this and how do you fix it?",
        "What is tree shaking? What prevents it from working?"
      ]
    },
    {
      level:"Advanced", time:"30 min",
      sections:[
        { heading:"Memory + DevTools",
          items:[
            "<b>Memory leaks in browser:</b> detached DOM nodes (reference to removed element), event listeners not removed, closures capturing large objects, timers not cleared.",
            "<b>Chrome DevTools Performance tab:</b> record page activity. Identify long tasks (red marks), layout thrashing, scripting time vs rendering time.",
            "<b>Chrome DevTools Memory tab:</b> heap snapshot, allocation timeline. Find retained object count. Compare snapshots before/after action.",
            "<b>requestAnimationFrame:</b> for animations — synced with browser paint cycle (~60fps). Never setTimeout for animations.",
            "<b>Virtualization:</b> only render visible items (react-window, react-virtual). For 10K+ item lists — full render causes OOM and jank."
          ]
        }
      ],
      traps:[
        "Detached DOM nodes are the most common browser memory leak — storing references to removed elements",
        "setTimeout for animations causes jank because it's not synced with paint cycle — use requestAnimationFrame",
        "Long tasks block main thread and hurt INP — break them up with setTimeout(fn,0) or scheduler.postTask()"
      ],
      checkpoint:[
        "How do you find a memory leak in a browser application using DevTools?",
        "What is layout thrashing and how do you prevent it?",
        "I have a list of 50,000 items causing the page to freeze on render. What is the solution?"
      ]
    }
  ],
  grill:`You are a Senior Engineer interviewing a frontend candidate.\n\nTOPIC: Browser Rendering + Performance (Block 45)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Performance diagnosis scenarios — 'your CLS score is 0.4, fix it', 'users report slow interactions on mobile', 'your bundle is 3MB'. Test tooling knowledge and decision-making.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:46, phase:"Frontend", chip:"frontend", freq:"high", role:"frontend",
  title:"React — State Management",
  subtitle:"useState vs useReducer, Context, Redux Toolkit, Zustand, React Query — when each wins",
  prereqs:[35],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"Local vs Global State",
          items:[
            "<b>Local state (useState):</b> component-specific. Form inputs, toggle, modal open state. Default choice.",
            "<b>useReducer:</b> complex state logic with multiple sub-values, or next state depends on previous in complex ways. Same as useState but with Redux-like dispatch pattern.",
            "<b>Context API:</b> share state without prop drilling. NOT a performance solution — all consumers re-render on any context change. For infrequently changing values (theme, locale, auth user).",
            "<b>Context + memo:</b> split context (UserContext for user data, ThemeContext for theme). Memoize values with useMemo to reduce re-renders."
          ]
        }
      ],
      traps:[
        "Context re-renders ALL consumers on every change — don't put frequently changing state in Context",
        "useReducer is not Redux — no middleware, no devtools, no global state",
        "Context API is for sharing state, not for managing complex state logic"
      ],
      checkpoint:[
        "When would you use useReducer over useState?",
        "What is the performance problem with Context API and how do you mitigate it?",
        "When is Context the right tool and when is it not?"
      ]
    },
    {
      level:"Intermediate", time:"40 min",
      sections:[
        { heading:"Redux Toolkit",
          items:[
            "<b>Redux Toolkit (RTK):</b> official recommended Redux. createSlice generates actions + reducers. createAsyncThunk for async. configureStore wires it up.",
            "<b>Immer inside RTK:</b> write mutating logic in reducers — Immer converts to immutable updates. No more spread hell.",
            "<b>RTK Query:</b> data fetching + caching built into RTK. defineEndpoints, auto-generated hooks (useGetUsersQuery). Cache invalidation via tags.",
            "<b>When Redux:</b> large app with complex shared state, need time-travel debugging, multiple teams, strict predictability required."
          ]
        },
        { heading:"Zustand + React Query",
          items:[
            "<b>Zustand:</b> minimal, no boilerplate. create(set => ({count:0, inc:()=>set(s=>({count:s.count+1}))}). 1KB. No Provider needed.",
            "<b>When Zustand over Redux:</b> smaller apps, less boilerplate needed, team prefers simplicity, no need for RTK Query's caching.",
            "<b>React Query (TanStack Query):</b> server state management. Fetching, caching, background refetch, stale-while-revalidate, optimistic updates.",
            "<b>Server state vs client state:</b> server state (API data) = React Query. Client state (UI state, user preferences) = Zustand/Redux. Don't use Redux to store API responses — use React Query."
          ]
        }
      ],
      traps:[
        "Storing server data in Redux and manually managing loading/error/refetch = reinventing React Query",
        "Zustand without Immer = must return new state object — easy to accidentally mutate",
        "React Query cache key must include all variables — missing a key variable = stale cache served"
      ],
      checkpoint:[
        "When would you choose Zustand over Redux Toolkit? What are you giving up?",
        "What problem does React Query solve that Redux doesn't?",
        "I'm using Redux to store API response data and managing loading/error states manually. What's the better approach?"
      ]
    },
    {
      level:"Advanced", time:"30 min",
      sections:[
        { heading:"Performance + Architecture",
          items:[
            "<b>React Query optimistic updates:</b> update cache immediately, revert on error. Best UX for mutations.",
            "<b>Jotai/Recoil (atomic state):</b> fine-grained reactivity — only components using specific atom re-render. Alternative to Context for granular shared state.",
            "<b>State colocation:</b> keep state as close to where it's used as possible. Lift state only when needed. Avoid premature global state.",
            "<b>Selector pattern (Redux/Zustand):</b> memoized derived state. useSelector with reselect. Prevents re-render when unrelated state changes."
          ]
        }
      ],
      traps:[
        "Lifting all state to global store is an anti-pattern — start local, lift only when needed",
        "useSelector without memoized selector causes re-render on every store change — use reselect createSelector",
        "Optimistic update without rollback logic = UI shows wrong data on error"
      ],
      checkpoint:[
        "What is state colocation and why is it important?",
        "Explain optimistic updates in React Query. What happens if the mutation fails?",
        "When would atomic state management (Jotai) be better than a global store?"
      ]
    }
  ],
  grill:`You are a Senior Engineer interviewing a React frontend candidate.\n\nTOPIC: React State Management (Block 46)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Trade-off decisions ('which state management for this app'), performance diagnosis ('your app re-renders on every keystroke'), and architecture ('where should this state live').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:47, phase:"Frontend", chip:"frontend", freq:"med", role:"frontend",
  title:"React — Testing + Accessibility",
  subtitle:"React Testing Library, Vitest, a11y principles, ARIA, semantic HTML, keyboard navigation",
  prereqs:[46],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"React Testing Library",
          items:[
            "<b>RTL philosophy:</b> test behaviour not implementation. Query by what the user sees, not internal component details.",
            "<b>Queries priority:</b> getByRole (best — matches accessibility tree) → getByLabelText → getByPlaceholderText → getByText → getByTestId (last resort).",
            "<b>userEvent vs fireEvent:</b> userEvent simulates real user interactions (typing, clicking with all browser events). fireEvent is lower-level and less realistic.",
            "<b>screen:</b> use screen.getByRole() instead of component.getByRole(). Global queries, no need to destructure render result."
          ]
        },
        { heading:"Accessibility Basics",
          items:[
            "<b>Semantic HTML first:</b> &lt;button&gt; not &lt;div onClick&gt;. &lt;nav&gt;, &lt;main&gt;, &lt;header&gt;, &lt;article&gt;. Screen readers understand semantic elements.",
            "<b>ARIA (Accessible Rich Internet Applications):</b> roles, properties, states for non-semantic elements. Add only when semantic HTML insufficient.",
            "<b>aria-label:</b> text alternative for elements without visible label. aria-labelledby: points to existing element as label.",
            "<b>Keyboard navigation:</b> all interactive elements must be focusable and operable by keyboard. Tab order must be logical."
          ]
        }
      ],
      traps:[
        "getByTestId is an anti-pattern — it tests implementation not user experience. Use getByRole first.",
        "Using ARIA on semantic elements incorrectly overrides native semantics — role='button' on &lt;button&gt; is redundant and can cause issues",
        "fireEvent.click does not trigger hover states or focus — use userEvent.click for realistic simulation"
      ],
      checkpoint:[
        "What is the RTL query priority and why is getByRole preferred?",
        "What is the difference between userEvent.click and fireEvent.click?",
        "I have a custom dropdown built with divs. What do I need for it to be accessible?"
      ]
    },
    {
      level:"Intermediate", time:"35 min",
      sections:[
        { heading:"Testing Async + Patterns",
          items:[
            "<b>waitFor():</b> retries assertion until it passes or times out. For async state updates after user interaction.",
            "<b>MSW (Mock Service Worker):</b> intercepts HTTP requests at network level. Realistic mock without changing application code. Works in browser and Node.",
            "<b>Testing custom hooks:</b> renderHook() from RTL. Test the hook directly without a component wrapper.",
            "<b>act():</b> wraps code that causes React state updates. RTL wraps most interactions in act automatically — only needed for manual state updates."
          ]
        },
        { heading:"Accessibility Testing",
          items:[
            "<b>jest-axe:</b> automated accessibility testing. toHaveNoViolations(). Catches ~30% of a11y issues automatically.",
            "<b>Color contrast:</b> WCAG AA requires 4.5:1 for normal text, 3:1 for large text. Use Lighthouse or axe DevTools.",
            "<b>Focus management:</b> modal open → move focus inside. Modal close → return focus to trigger. Use useRef + .focus().",
            "<b>Reduced motion:</b> prefers-reduced-motion media query. Disable/reduce animations for users who configured this in OS."
          ]
        }
      ],
      traps:[
        "waitFor with side effects (clicking inside waitFor) can cause flaky tests — only put assertions inside waitFor",
        "MSW not reset between tests causes test pollution — call server.resetHandlers() in afterEach",
        "jest-axe catches automated violations only — manual testing with keyboard and screen reader still required"
      ],
      checkpoint:[
        "What is MSW and why is it better than mocking fetch/axios directly?",
        "How do you test focus management in a modal dialog?",
        "What does jest-axe test and what doesn't it test?"
      ]
    },
    {
      level:"Advanced", time:"25 min",
      sections:[
        { heading:"Advanced Accessibility + Testing Strategy",
          items:[
            "<b>WCAG levels:</b> A (minimum), AA (standard target), AAA (enhanced). Most organisations target AA.",
            "<b>Screen reader testing:</b> NVDA (Windows, free), JAWS (Windows, paid), VoiceOver (macOS/iOS built-in), TalkBack (Android). Test with real screen readers.",
            "<b>Live regions (aria-live):</b> announce dynamic content changes to screen readers. polite = waits for quiet. assertive = interrupts immediately.",
            "<b>Component testing vs E2E:</b> RTL covers component behaviour. Playwright/Cypress for critical user journeys. Don't duplicate."
          ]
        }
      ],
      traps:[
        "aria-live='assertive' is disruptive — use 'polite' for most cases, 'assertive' only for errors or urgent alerts",
        "Automated a11y tests give false confidence — 70% of issues require manual testing",
        "Testing too many implementation details makes refactoring painful — test the contract not the internals"
      ],
      checkpoint:[
        "What is the difference between WCAG A, AA, and AAA? Which should you target and why?",
        "When would you use aria-live? What is the difference between polite and assertive?",
        "How do you decide what to test with RTL vs Playwright?"
      ]
    }
  ],
  grill:`You are a Senior Engineer interviewing a React frontend candidate.\n\nTOPIC: React Testing + Accessibility (Block 47)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix testing strategy ('how would you test this component'), a11y design ('make this modal accessible'), and tooling ('why MSW over mocking').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:48, phase:"Frontend", chip:"frontend", freq:"med", role:"frontend",
  title:"React — Build Tools + Forms",
  subtitle:"Vite vs Webpack, bundling concepts, React Hook Form, Zod validation, TypeScript in React",
  prereqs:[35],
  tiers:[
    {
      level:"Beginner", time:"25 min",
      sections:[
        { heading:"Build Tools",
          items:[
            "<b>Vite:</b> dev server uses native ES modules (no bundling in dev = instant HMR). Production: Rollup. Default for new React projects.",
            "<b>Webpack:</b> bundles everything including in dev. Slower HMR. More configurable. Legacy but still dominant in enterprise.",
            "<b>HMR (Hot Module Replacement):</b> updates changed module without full page reload. Preserves state.",
            "<b>Environment variables:</b> .env files. Vite: VITE_ prefix. CRA: REACT_APP_ prefix. Never commit secrets — they are bundled into client JS."
          ]
        },
        { heading:"React Hook Form",
          items:[
            "<b>RHF philosophy:</b> uncontrolled inputs by default. No re-render on every keystroke. register() connects input to form.",
            "<b>handleSubmit:</b> wraps your submit handler, calls preventDefault, validates before calling your fn.",
            "<b>formState:</b> errors, isSubmitting, isDirty, isValid. Subscribe to only what you need.",
            "<b>Controller:</b> for controlled components (Select, DatePicker, custom inputs) that don't accept ref."
          ]
        }
      ],
      traps:[
        "Environment variables are bundled into client JS — never put secrets in .env for frontend apps",
        "RHF Controller required for controlled third-party components — register() doesn't work for them",
        "Vite VITE_ prefix is required — variables without it are not exposed to client code"
      ],
      checkpoint:[
        "Why is Vite faster than Webpack in development? What is the trade-off?",
        "What is the difference between controlled and uncontrolled inputs? Which does RHF use by default?",
        "I put my API key in VITE_API_KEY in a .env file. Is it safe?"
      ]
    },
    {
      level:"Intermediate", time:"35 min",
      sections:[
        { heading:"Zod + Schema Validation",
          items:[
            "<b>Zod:</b> TypeScript-first schema validation. Define schema, infer TypeScript type from it. No duplication.",
            "<code>const UserSchema = z.object({ name: z.string().min(2), email: z.string().email(), age: z.number().int().min(18) });</code>",
            "<b>Type inference:</b> <code>type User = z.infer&lt;typeof UserSchema&gt;</code> — TypeScript type derived from schema.",
            "<b>RHF + Zod:</b> zodResolver(@hookform/resolvers) connects Zod schema to RHF. Type-safe form values.",
            "<b>Server-side validation:</b> always validate on server too. Client validation is UX, server validation is security."
          ]
        },
        { heading:"TypeScript in React",
          items:[
            "<b>Component props:</b> interface Props {} then React.FC&lt;Props&gt; or (props: Props) =&gt; JSX.Element.",
            "<b>Event types:</b> React.ChangeEvent&lt;HTMLInputElement&gt;, React.MouseEvent&lt;HTMLButtonElement&gt;.",
            "<b>useState with type:</b> useState&lt;User | null&gt;(null) — generic when initial value doesn't reveal type.",
            "<b>useRef types:</b> useRef&lt;HTMLInputElement&gt;(null) — typed ref for DOM elements."
          ]
        }
      ],
      traps:[
        "Zod .parse() throws on invalid data — use .safeParse() in try/catch or when you don't want exceptions",
        "Client-side validation is UX only — never trust it for security. Always validate server-side.",
        "React.FC adds implicit children prop (pre-React 18) — use (props: Props) => JSX.Element for explicit typing"
      ],
      checkpoint:[
        "What is Zod and how does it eliminate TypeScript type duplication?",
        "I validate a form with Zod on the client. Do I still need server-side validation?",
        "How do you type an onChange handler for an HTML input in TypeScript?"
      ]
    },
    {
      level:"Advanced", time:"25 min",
      sections:[
        { heading:"Advanced Build + Optimisation",
          items:[
            "<b>Module federation (Webpack 5):</b> share code between separate bundled apps at runtime. Micro-frontend architecture.",
            "<b>Monorepo tooling:</b> Turborepo, Nx — shared code, build caching, task orchestration across packages.",
            "<b>Storybook:</b> develop and document components in isolation. Visual testing. Component library documentation.",
            "<b>Import aliases:</b> @/components/Button instead of ../../../components/Button. Configure in vite.config.ts and tsconfig.json paths.",
            "<b>Bundle size budget:</b> set size limits in bundler config. Fail CI when bundle exceeds budget. Prevents gradual bloat."
          ]
        }
      ],
      traps:[
        "Module federation version mismatches between apps cause runtime errors — pin shared dependency versions",
        "Storybook and production app can diverge — keep stories close to component files, run visual regression tests",
        "Import aliases must be configured in BOTH tsconfig.json AND vite.config.ts — configuring only one causes runtime or compile errors"
      ],
      checkpoint:[
        "What is Module Federation and what problem does it solve?",
        "How do you prevent bundle size from gradually growing over time?",
        "What is the benefit of developing components in Storybook isolation?"
      ]
    }
  ],
  grill:`You are a Senior Engineer interviewing a React frontend candidate.\n\nTOPIC: Build Tools + Forms (Block 48)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical questions — 'why is your dev server slow', 'how would you validate this form', 'I see you stored an API key in .env — is that safe'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

// ════════════════════════════════════════════════════════════
// PHASE — CROSS-CUTTING
// ════════════════════════════════════════════════════════════
{
  id:49, phase:"Cross-Cutting", chip:"arch", freq:"high", role:"fullstack",
  title:"Testing — Philosophy + Strategies",
  subtitle:"Testing pyramid, TDD, test doubles, integration vs unit, test containers, what not to test",
  prereqs:[],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"Testing Pyramid",
          items:[
            "<b>Unit tests:</b> test one unit in isolation. Fast (&lt;1ms). No I/O, no network. Most tests should be here.",
            "<b>Integration tests:</b> test multiple units together including real dependencies (DB, HTTP). Slower. Fewer than unit tests.",
            "<b>E2E tests:</b> test full user journey through browser. Slow, brittle, expensive. Only for critical paths.",
            "<b>Wrong pyramid (ice cream cone):</b> many E2E, few unit. Slow CI, brittle tests, hard to debug failures.",
            "<b>Rule of thumb:</b> 70% unit, 20% integration, 10% E2E."
          ]
        },
        { heading:"Test Doubles",
          items:[
            "<b>Dummy:</b> passed but never used. Fills parameter list.",
            "<b>Stub:</b> returns hardcoded response. No verification of calls.",
            "<b>Mock:</b> pre-programmed with expectations. Verified after test. Fails if expected calls not made.",
            "<b>Spy:</b> wraps real implementation. Observes calls without replacing behaviour.",
            "<b>Fake:</b> working implementation but simplified (in-memory DB instead of real Postgres)."
          ]
        }
      ],
      traps:[
        "Too many mocks = testing your mocks not your code. Mock at the boundary (HTTP, DB) not internally.",
        "E2E tests that cover the same paths as integration tests = wasted effort and slow CI",
        "Stub and mock are often confused — stub = canned response, mock = verified interactions"
      ],
      checkpoint:[
        "What is the difference between a stub and a mock?",
        "Why is an 'ice cream cone' test distribution (many E2E, few unit) a problem?",
        "What is a fake and when would you use one over a stub?"
      ]
    },
    {
      level:"Intermediate", time:"35 min",
      sections:[
        { heading:"TDD + What to Test",
          items:[
            "<b>TDD (Test-Driven Development):</b> Red (write failing test) → Green (write minimum code to pass) → Refactor (improve code, tests still pass).",
            "<b>TDD benefits:</b> forces small, testable functions. Documents intended behaviour. Catches regressions. Reduces over-engineering.",
            "<b>What to test:</b> business logic, edge cases, error paths, integration points. NOT: framework code, simple getters/setters, trivial functions.",
            "<b>Test naming:</b> describe what the code DOES not how it works. 'returns 404 when user not found' not 'calls findById with correct params'."
          ]
        },
        { heading:"TestContainers",
          items:[
            "<b>TestContainers:</b> start real Docker containers in tests. Real Postgres, Redis, Kafka. Accurate integration tests.",
            "<b>vs in-memory alternatives:</b> H2/SQLite miss Postgres-specific features (JSONB, CTEs, window functions). TestContainers uses the real thing.",
            "<b>Lifecycle:</b> start container in beforeAll, run migrations, seed data in beforeEach, teardown in afterAll.",
            "<b>Reuse containers:</b> withReuse() — don't recreate between test runs. Massive speed improvement in local development."
          ]
        }
      ],
      traps:[
        "TDD is not about writing tests after — it is about writing tests first to drive design",
        "TestContainers without container reuse = slow test suite — enable reuse for local development",
        "Seeding test data in beforeAll causes test pollution if tests modify it — use beforeEach or transactions"
      ],
      checkpoint:[
        "Walk me through the TDD cycle. What is the purpose of each step?",
        "Why would you use TestContainers instead of an in-memory database for integration tests?",
        "How do you prevent test pollution when multiple tests share a database?"
      ]
    },
    {
      level:"Advanced", time:"25 min",
      sections:[
        { heading:"Advanced Testing Strategy",
          items:[
            "<b>Contract testing (Pact):</b> consumer defines expected API contract. Provider verifies against it in CI. Catches breaking changes without E2E.",
            "<b>Property-based testing (fast-check):</b> generate random inputs, test invariants hold. 'For any valid email, parsing should succeed'. Finds edge cases humans miss.",
            "<b>Mutation testing (Stryker):</b> introduce code mutations, check if tests catch them. Reveals weak assertions and coverage gaps.",
            "<b>Flaky test strategies:</b> retry logic (last resort), quarantine flaky tests, fix root cause (shared state, timing, external deps). Never ignore flaky tests."
          ]
        }
      ],
      traps:[
        "Contract testing is not integration testing — it tests the contract/schema not the full system behaviour",
        "Property-based testing needs careful invariant design — testing wrong invariant gives false confidence",
        "Retrying flaky tests masks real problems — always investigate and fix root cause"
      ],
      checkpoint:[
        "What is contract testing and how is it different from integration testing?",
        "What is property-based testing and what kinds of bugs does it find that example-based tests miss?",
        "You have 10 flaky tests in CI. What is your strategy?"
      ]
    }
  ],
  grill:`You are a Senior Engineer interviewing a candidate on testing philosophy.\n\nTOPIC: Testing Philosophy + Strategies (Block 49)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Test strategy decisions ('how would you test this system'), philosophy probes ('what should you not test'), and production scenarios ('CI is slow, tests are flaky — what do you do').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

// ════════════════════════════════════════════════════════════
// PHASE — DEVOPS
// ════════════════════════════════════════════════════════════
{
  id:50, phase:"DevOps", chip:"infra", freq:"high", role:"devops",
  title:"Kubernetes — Core Concepts",
  subtitle:"Pods, Deployments, Services, ConfigMaps, Secrets, Namespaces, kubectl basics",
  prereqs:[31],
  tiers:[
    {
      level:"Beginner", time:"40 min",
      sections:[
        { heading:"Core Objects",
          items:[
            "<b>Pod:</b> smallest deployable unit. One or more containers sharing network namespace and storage. Ephemeral — don't attach to specific pods.",
            "<b>Deployment:</b> manages ReplicaSet. Desired state declaration. Handles rolling updates, rollbacks. Always use Deployment, not bare Pod.",
            "<b>Service:</b> stable network endpoint for pods. Types: ClusterIP (internal only), NodePort (exposes on node port), LoadBalancer (cloud LB), ExternalName.",
            "<b>Namespace:</b> virtual cluster. Resource isolation. Default namespace for unspecified resources. kube-system for cluster components.",
            "<b>ConfigMap:</b> non-sensitive config. Mounted as env vars or volume files. <b>Secret:</b> sensitive data (base64 encoded — NOT encrypted by default). Use external secrets manager in production."
          ]
        },
        { heading:"kubectl Essentials",
          items:[
            "<code>kubectl get pods -n namespace</code> — list pods. <code>kubectl describe pod name</code> — events and status.",
            "<code>kubectl logs pod-name -f</code> — follow logs. <code>kubectl logs pod-name -c container-name</code> — specific container.",
            "<code>kubectl exec -it pod-name -- /bin/sh</code> — shell into container.",
            "<code>kubectl apply -f manifest.yaml</code> — apply config. <code>kubectl rollout status deployment/name</code> — watch rollout.",
            "<code>kubectl rollout undo deployment/name</code> — rollback to previous version."
          ]
        }
      ],
      traps:[
        "Kubernetes Secrets are base64 encoded not encrypted — anyone with cluster access can read them. Use Vault or external-secrets-operator.",
        "Bare Pods are not rescheduled if node fails — always use Deployment",
        "ClusterIP is not accessible from outside the cluster — use Ingress or LoadBalancer for external traffic"
      ],
      checkpoint:[
        "What is the difference between a Pod and a Deployment?",
        "Kubernetes Secrets are secure by default. True or false? Explain.",
        "How do you debug a pod that is stuck in CrashLoopBackOff?"
      ]
    },
    {
      level:"Intermediate", time:"45 min",
      sections:[
        { heading:"Networking + Ingress",
          items:[
            "<b>Ingress:</b> HTTP/HTTPS routing into cluster. Path-based or host-based routing. Requires Ingress Controller (nginx-ingress, Traefik, AWS ALB).",
            "<b>Ingress vs Service LoadBalancer:</b> one LoadBalancer per Service = expensive. Ingress = one LB for all services, route by path/host.",
            "<b>ClusterDNS:</b> pods reach services by name: http://service-name.namespace.svc.cluster.local. Within same namespace: http://service-name.",
            "<b>NetworkPolicy:</b> firewall rules between pods. Default = allow all. Restrict ingress/egress per pod selector."
          ]
        },
        { heading:"Resource Management",
          items:[
            "<b>requests:</b> guaranteed resources. Used for scheduling decisions. Pod won't start if no node has enough.",
            "<b>limits:</b> maximum allowed. CPU throttled at limit. Memory OOM killed at limit.",
            "<b>Always set both requests and limits.</b> No requests = pod scheduled anywhere. No limits = pod can starve other pods.",
            "<b>QoS classes:</b> Guaranteed (requests=limits), Burstable (limits &gt; requests), BestEffort (no requests/limits). Guaranteed pods evicted last."
          ]
        }
      ],
      traps:[
        "CPU throttling at limit causes slow response even when CPU is available — set CPU limits carefully or omit",
        "OOMKilled with no memory limit = pod using unbounded memory. Set limits.",
        "Not setting resource requests = scheduler has no data, places pods randomly = noisy neighbor problems"
      ],
      checkpoint:[
        "What is the difference between resource requests and limits in Kubernetes?",
        "What is an Ingress and why use it instead of a LoadBalancer Service for every deployment?",
        "A pod is OOMKilled repeatedly. Walk me through diagnosing and fixing it."
      ]
    },
    {
      level:"Advanced", time:"35 min",
      sections:[
        { heading:"Health Probes + Rolling Updates",
          items:[
            "<b>Liveness probe:</b> is container alive? Fail = restart container. For detecting deadlocks.",
            "<b>Readiness probe:</b> is container ready for traffic? Fail = remove from Service endpoints. For startup and temporary unavailability.",
            "<b>Startup probe:</b> for slow-starting containers. Disables liveness until startup probe passes. Prevents restart during long JVM startup.",
            "<b>Rolling update strategy:</b> maxSurge (extra pods during update), maxUnavailable (pods allowed down during update). Zero-downtime: maxUnavailable=0.",
            "<b>PodDisruptionBudget (PDB):</b> minimum available pods during voluntary disruption (node drain, upgrade). Required for production availability."
          ]
        }
      ],
      traps:[
        "Liveness probe failing during startup causes infinite restart loop — use startupProbe for slow-starting apps",
        "Readiness probe not configured = pod receives traffic before app is ready = 502 errors during rollout",
        "maxUnavailable=0 + maxSurge=0 = deployment stuck (no pods can be updated) — always set at least one"
      ],
      checkpoint:[
        "What is the difference between liveness and readiness probes? When does each cause action?",
        "Why do you need a startup probe for Java applications in Kubernetes?",
        "Design a zero-downtime rolling update strategy for a stateless web service."
      ]
    }
  ],
  grill:`You are a Senior Engineer interviewing a DevOps/Platform candidate.\n\nTOPIC: Kubernetes Core Concepts (Block 50)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production scenarios — 'pod is CrashLoopBackOff, diagnose it', 'deployment is stuck, what do you check', 'pod getting OOMKilled'. Test kubectl knowledge and Kubernetes mental model.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:51, phase:"DevOps", chip:"infra", freq:"med", role:"devops",
  title:"Kubernetes — Production Patterns",
  subtitle:"HPA, RBAC, StatefulSets, PersistentVolumes, service mesh basics, multi-tenancy",
  prereqs:[50],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"Auto-scaling + Storage",
          items:[
            "<b>HPA (Horizontal Pod Autoscaler):</b> scale pods based on CPU/memory/custom metrics. Requires metrics-server. Min/max replicas + target CPU%.",
            "<b>VPA (Vertical Pod Autoscaler):</b> adjust requests/limits automatically. Not for production pods in-place — restarts pods.",
            "<b>StatefulSet:</b> for stateful applications (databases, Kafka, Zookeeper). Stable network identity (pod-0, pod-1). Ordered start/stop. PVC per pod.",
            "<b>PersistentVolume (PV) + PVC:</b> PV = storage resource. PVC = claim for storage. StorageClass = dynamic provisioning (auto-creates PV)."
          ]
        }
      ],
      traps:[
        "HPA requires metrics-server installed — HPA shows 'unknown' metrics without it",
        "StatefulSet pods must stop in reverse order — configure terminationGracePeriodSeconds appropriately",
        "Deleting a StatefulSet does NOT delete PVCs — data persists (usually desirable but can cause orphaned storage costs)"
      ],
      checkpoint:[
        "What is the difference between a StatefulSet and a Deployment?",
        "HPA is configured but pods aren't scaling. What are the first things you check?",
        "What happens to PersistentVolumeClaims when you delete a StatefulSet?"
      ]
    },
    {
      level:"Intermediate", time:"40 min",
      sections:[
        { heading:"RBAC + Security",
          items:[
            "<b>RBAC:</b> Role + RoleBinding (namespace scope). ClusterRole + ClusterRoleBinding (cluster scope).",
            "<b>ServiceAccount:</b> identity for pods. Mounted as token. Used to call Kubernetes API from within pod.",
            "<b>Principle of least privilege:</b> default ServiceAccount has no permissions. Create specific SA with minimal Role.",
            "<b>Pod Security:</b> runAsNonRoot, readOnlyRootFilesystem, allowPrivilegeEscalation: false. Enforce via PodSecurityAdmission or OPA/Gatekeeper."
          ]
        },
        { heading:"Multi-tenancy + Namespaces",
          items:[
            "<b>Namespace-based isolation:</b> team A in namespace team-a, team B in namespace team-b. NetworkPolicy restricts cross-namespace traffic.",
            "<b>ResourceQuota:</b> limit total resources per namespace. Prevents one team consuming all cluster resources.",
            "<b>LimitRange:</b> set default requests/limits for pods in namespace. Ensures all pods have resource constraints.",
            "<b>Soft multi-tenancy:</b> namespaces + RBAC + NetworkPolicy. Hard multi-tenancy = separate clusters (fully isolated)."
          ]
        }
      ],
      traps:[
        "RBAC Role is namespace-scoped — use ClusterRole for cluster-wide permissions",
        "Default ServiceAccount token is mounted automatically — disable if pod doesn't need API access (automountServiceAccountToken: false)",
        "ResourceQuota without LimitRange = pods without requests/limits still count as 0 toward quota"
      ],
      checkpoint:[
        "What is the difference between Role and ClusterRole in Kubernetes RBAC?",
        "How would you prevent one team's workloads from consuming all cluster resources?",
        "A pod needs to read Secrets from the Kubernetes API. Walk me through the RBAC setup."
      ]
    },
    {
      level:"Advanced", time:"30 min",
      sections:[
        { heading:"Operators + Advanced Patterns",
          items:[
            "<b>Kubernetes Operator:</b> extends Kubernetes with custom resources (CRD). Controller loop watches resources, reconciles state. Examples: cert-manager, Strimzi (Kafka), Prometheus Operator.",
            "<b>CRD (Custom Resource Definition):</b> define your own Kubernetes object types. Operator manages their lifecycle.",
            "<b>Helm:</b> package manager for Kubernetes. Chart = templated manifests. values.yaml overrides. helm upgrade --install for idempotent deploys.",
            "<b>GitOps (ArgoCD, Flux):</b> Git as single source of truth. Controller syncs cluster state to Git. Drift detection and auto-remediation."
          ]
        }
      ],
      traps:[
        "Helm chart updates without --atomic can leave cluster in partially-upgraded state — use --atomic for rollback on failure",
        "GitOps controllers need cluster-admin access — scope permissions carefully or use multi-tenant ArgoCD",
        "CRD versioning: removing fields from CRD schema can break existing resources — use deprecation and migration"
      ],
      checkpoint:[
        "What is a Kubernetes Operator and what problem does it solve over plain Deployments?",
        "What is GitOps and how is it different from running kubectl apply in CI?",
        "Walk me through deploying a Helm chart with zero-downtime and automatic rollback on failure."
      ]
    }
  ],
  grill:`You are a Senior DevOps/Platform Engineer interviewing a candidate.\n\nTOPIC: Kubernetes Production Patterns (Block 51)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production architecture decisions, security hardening, scaling challenges. 'Design the namespace strategy for a 10-team org', 'your HPA isn't scaling — diagnose it'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:52, phase:"DevOps", chip:"infra", freq:"high", role:"devops",
  title:"CI/CD — GitHub Actions + Pipeline Design",
  subtitle:"Pipeline stages, GitHub Actions syntax, secrets management, deployment strategies, rollback",
  prereqs:[31, 33],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"GitHub Actions Basics",
          items:[
            "<b>Workflow:</b> .github/workflows/ci.yml. Triggered by events: push, pull_request, schedule, workflow_dispatch.",
            "<b>Job:</b> runs on a runner (ubuntu-latest, windows-latest, macos-latest). Steps run sequentially. Jobs run in parallel by default.",
            "<b>Step:</b> uses: (action) or run: (shell command). Actions are reusable steps from marketplace.",
            "<b>needs:</b> job dependency. job-b: needs: [job-a] — job-b waits for job-a.",
            "<b>env + secrets:</b> env: MY_VAR: value. Secrets: ${{ secrets.MY_SECRET }}. Secrets are masked in logs."
          ]
        },
        { heading:"Pipeline Stages",
          items:[
            "<b>Standard pipeline:</b> lint → test → build → security scan → push image → deploy to staging → smoke test → deploy to prod.",
            "<b>Fail fast:</b> cheapest checks first (lint, format). Don't run slow integration tests if lint fails.",
            "<b>Artifacts:</b> upload-artifact / download-artifact to pass files between jobs.",
            "<b>Caching:</b> actions/cache for npm/maven/pip dependencies. Massive CI speed improvement."
          ]
        }
      ],
      traps:[
        "Secrets are available to all steps in a job — limit secret scope to only jobs that need them",
        "Not caching dependencies means downloading them on every run — always cache node_modules or ~/.m2",
        "Jobs run in parallel by default — if job-b needs job-a's output, add needs: [job-a]"
      ],
      checkpoint:[
        "What is the difference between a job and a step in GitHub Actions?",
        "How do you pass a built Docker image between the build job and the deploy job?",
        "Your CI pipeline takes 20 minutes. What are the first optimizations you make?"
      ]
    },
    {
      level:"Intermediate", time:"40 min",
      sections:[
        { heading:"Deployment Strategies",
          items:[
            "<b>Blue-Green:</b> two identical environments. Switch traffic from Blue to Green instantly. Easy rollback (switch back). Requires 2x infrastructure.",
            "<b>Canary:</b> route small % of traffic to new version. Monitor. Gradually increase. Rollback = reduce canary weight to 0.",
            "<b>Rolling (Kubernetes default):</b> replace pods one-by-one. Zero infrastructure cost. Rollback takes time. Mixed versions in-flight.",
            "<b>Feature flags:</b> deploy code without enabling feature. Enable per user/% rollout. Separate deployment from release."
          ]
        },
        { heading:"Security in CI/CD",
          items:[
            "<b>SAST (Static Application Security Testing):</b> scan source code. Semgrep, CodeQL, SonarQube.",
            "<b>SCA (Software Composition Analysis):</b> scan dependencies for CVEs. Dependabot, Snyk, OWASP dependency-check.",
            "<b>Container scanning:</b> Trivy, Grype — scan Docker images for CVEs before push.",
            "<b>Secret scanning:</b> detect hardcoded secrets before merge. GitHub Secret Scanning, trufflehog, gitleaks.",
            "<b>OIDC for cloud auth:</b> GitHub Actions → AWS/GCP/Azure without storing long-lived credentials. Federated identity."
          ]
        }
      ],
      traps:[
        "Storing cloud credentials as GitHub secrets = long-lived credentials risk. Use OIDC federation instead.",
        "Canary deployment without monitoring = deploying blind. Must have metrics alerting before increasing canary %.",
        "Feature flags without cleanup = flag debt accumulates. Set expiry dates on feature flags."
      ],
      checkpoint:[
        "What is the difference between blue-green and canary deployment? When would you use each?",
        "What is OIDC federation for GitHub Actions and why is it better than storing AWS credentials as secrets?",
        "Walk me through a complete CI/CD pipeline for a microservice from PR to production."
      ]
    },
    {
      level:"Advanced", time:"30 min",
      sections:[
        { heading:"Advanced Pipeline Patterns",
          items:[
            "<b>Reusable workflows:</b> workflow_call trigger. Call from other workflows. DRY principle for CI.",
            "<b>Matrix builds:</b> test across multiple versions/OSes simultaneously. matrix: node: [18, 20, 22].",
            "<b>Environment protection rules:</b> required reviewers, wait timer before deploying to production. Manual gates.",
            "<b>Durable deployments:</b> idempotent deploy scripts. Deploy same version twice = same result. Helm --atomic. Terraform plan before apply.",
            "<b>Deployment rollback strategy:</b> automatic (health check fails → rollback), manual trigger, previous image tag always available."
          ]
        }
      ],
      traps:[
        "Matrix builds multiply runner minutes — expensive for private repos. Only matrix what you must.",
        "Environment protection rules require GitHub Environments configured — not the default setup",
        "Terraform apply in CI without state locking = concurrent applies corrupt state — use remote backend with locking (S3 + DynamoDB)"
      ],
      checkpoint:[
        "What are reusable workflows in GitHub Actions and when would you use them?",
        "How do you implement automatic rollback in a Kubernetes-based CI/CD pipeline?",
        "What is Terraform state locking and why is it critical in CI/CD?"
      ]
    }
  ],
  grill:`You are a Senior DevOps Engineer interviewing a candidate.\n\nTOPIC: CI/CD — GitHub Actions + Pipeline Design (Block 52)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Pipeline design ('design CI/CD for this system'), security ('I see you store AWS keys as secrets — problem?'), incident scenarios ('production deploy failed halfway through — what now').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:53, phase:"DevOps", chip:"infra", freq:"high", role:"devops",
  title:"AWS — Compute + Storage",
  subtitle:"EC2, S3, RDS, Lambda, ECS/Fargate — core services, decision model, SAA-aligned",
  prereqs:[31],
  tiers:[
    {
      level:"Beginner", time:"40 min",
      sections:[
        { heading:"EC2 + Auto Scaling",
          items:[
            "<b>EC2:</b> virtual machine on AWS. Instance types: t3 (burstable, cheap dev/test), m5 (general purpose), c5 (compute), r5 (memory), p3 (GPU).",
            "<b>AMI (Amazon Machine Image):</b> OS + software snapshot. Launch EC2 from AMI. Custom AMI for pre-configured instances.",
            "<b>Auto Scaling Group (ASG):</b> maintain desired capacity. Scale out/in based on CloudWatch alarms or target tracking (target CPU 70%).",
            "<b>Launch Template:</b> defines EC2 config (AMI, instance type, SG, user-data). Used by ASG.",
            "<b>ELB types:</b> ALB (HTTP/HTTPS, path/host routing, WebSocket), NLB (TCP/UDP, ultra-low latency, static IP), GLB (security appliances)."
          ]
        },
        { heading:"S3",
          items:[
            "<b>Object storage.</b> Virtually unlimited. 99.999999999% (11 nines) durability. Not a filesystem.",
            "<b>Storage classes:</b> Standard (frequent access), Standard-IA (infrequent, cheaper), Glacier (archive, retrieval minutes-hours), Intelligent-Tiering (auto-moves between tiers).",
            "<b>Presigned URLs:</b> temporary access to private object. Generate server-side, share URL. Time-limited. Correct for private file download.",
            "<b>S3 + CloudFront:</b> serve static assets globally from CDN. Origin Access Control (OAC) restricts S3 to only CloudFront access."
          ]
        }
      ],
      traps:[
        "S3 bucket public access must be explicitly enabled — ACLs alone don't make objects public",
        "EC2 without ASG = manual scaling = single point of failure. Always use ASG in production.",
        "ALB vs NLB: ALB for HTTP workloads (most web apps). NLB for TCP, static IP, ultra-low latency requirements."
      ],
      checkpoint:[
        "When would you use NLB instead of ALB?",
        "What is a presigned URL? When do you use it over a public S3 URL?",
        "Design auto-scaling for a web application that handles 10x traffic spikes."
      ]
    },
    {
      level:"Intermediate", time:"45 min",
      sections:[
        { heading:"Lambda + ECS/Fargate",
          items:[
            "<b>Lambda:</b> serverless functions. Event-driven. Pay per invocation + duration. Max 15 min execution. No server management.",
            "<b>Cold start:</b> first invocation initializes runtime (~100ms-1s). Mitigate: provisioned concurrency, minimize package size, avoid VPC if possible.",
            "<b>Lambda concurrency:</b> account limit 1000 (default). Reserved concurrency = guarantee for one function. Throttling = 429 errors.",
            "<b>ECS (Elastic Container Service):</b> managed container orchestration. EC2 launch type (you manage instances) or Fargate (serverless containers — AWS manages instances).",
            "<b>ECS vs Lambda:</b> Lambda for event-driven, short-running, variable load. ECS/Fargate for long-running, HTTP services, predictable load, need more control."
          ]
        },
        { heading:"RDS",
          items:[
            "<b>RDS:</b> managed relational DB. Postgres, MySQL, MariaDB, SQL Server, Oracle. Automated backups, patching, Multi-AZ.",
            "<b>Multi-AZ:</b> synchronous replication to standby in another AZ. Automatic failover (~60s). For HA, not read scaling.",
            "<b>Read Replicas:</b> asynchronous replication. Up to 15 replicas. For read scaling. Can promote to standalone DB.",
            "<b>Aurora:</b> AWS-managed compatible with MySQL/Postgres. 3-6 copies across AZs. Up to 15 read replicas. Aurora Serverless v2 for variable workloads.",
            "<b>RDS Proxy:</b> connection pooler in front of RDS. Critical for Lambda (Lambda creates new connection per invocation)."
          ]
        }
      ],
      traps:[
        "Lambda in VPC = cold start adds ~500ms for ENI attachment — avoid VPC unless accessing private resources",
        "RDS Multi-AZ is for HA not read scaling — use Read Replicas for read scaling",
        "Lambda without Reserved Concurrency can consume entire account concurrency limit — starving other functions"
      ],
      checkpoint:[
        "What is the difference between RDS Multi-AZ and Read Replicas?",
        "Why does Lambda in a VPC have slower cold starts and when is it worth it?",
        "I'm using Lambda to process API requests. Lambda keeps hitting RDS connection limits. What is the solution?"
      ]
    },
    {
      level:"Advanced", time:"35 min",
      sections:[
        { heading:"Cost + Performance Optimisation",
          items:[
            "<b>Spot Instances:</b> up to 90% cheaper than On-Demand. Can be interrupted with 2-min warning. For fault-tolerant, stateless, batch workloads.",
            "<b>Savings Plans / Reserved Instances:</b> 1-3 year commitment. 40-72% savings. Compute Savings Plans most flexible.",
            "<b>S3 Transfer Acceleration:</b> upload via CloudFront edge nodes. Faster for global users uploading large files.",
            "<b>ElastiCache (Redis/Memcached):</b> fully managed cache. Read-heavy workloads, session storage, leaderboards. In-memory, sub-millisecond latency.",
            "<b>DynamoDB:</b> fully managed NoSQL. Single-digit ms at any scale. DAX for in-memory cache. On-demand or provisioned capacity."
          ]
        }
      ],
      traps:[
        "Spot Instances interrupted without warning if capacity needed — always design for interruption (checkpointing, graceful shutdown)",
        "DynamoDB hot partition from bad key design limits throughput — design partition key for even distribution",
        "ElastiCache in same VPC as application — cross-AZ access adds latency, place in same AZ as primary app instances"
      ],
      checkpoint:[
        "When would you use DynamoDB instead of RDS Postgres? What are you giving up?",
        "Design a cost-optimized architecture for a batch processing workload that runs 6 hours daily.",
        "What is the difference between ElastiCache and RDS Read Replicas for reducing database load?"
      ]
    }
  ],
  grill:`You are a Senior AWS Solutions Architect interviewing a candidate.\n\nTOPIC: AWS Compute + Storage (Block 53)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Architecture decision scenarios ('design this system on AWS'), service selection ('RDS vs DynamoDB for this use case'), cost optimization ('this architecture costs $50K/month — how do you cut it in half').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:54, phase:"DevOps", chip:"infra", freq:"high", role:"devops",
  title:"AWS — Networking + Security",
  subtitle:"VPC, subnets, security groups, IAM, CloudFront, Route 53, WAF — SAA-aligned",
  prereqs:[53],
  tiers:[
    {
      level:"Beginner", time:"40 min",
      sections:[
        { heading:"VPC Fundamentals",
          items:[
            "<b>VPC (Virtual Private Cloud):</b> isolated network. CIDR block (10.0.0.0/16). You control routing, subnets, gateways.",
            "<b>Public subnet:</b> has route to Internet Gateway (IGW). Resources with public IP accessible from internet.",
            "<b>Private subnet:</b> no route to IGW. Resources NOT directly accessible from internet. Access internet via NAT Gateway.",
            "<b>NAT Gateway:</b> allows private subnet resources to initiate outbound internet connections. Managed, highly available. NAT Instance = EC2 you manage (cheaper, less scalable).",
            "<b>Security Groups:</b> stateful firewall at instance level. Inbound + outbound rules. Allow only — no deny rules. Changes apply immediately."
          ]
        },
        { heading:"IAM",
          items:[
            "<b>IAM Users:</b> human identities. Long-lived credentials. Use only for humans and break-glass scenarios.",
            "<b>IAM Roles:</b> assumed by AWS services, EC2, Lambda, ECS tasks. Temporary credentials. Preferred over users for services.",
            "<b>IAM Policies:</b> JSON documents. Effect (Allow/Deny), Action (s3:GetObject), Resource (arn:aws:s3:::bucket/*).",
            "<b>Least privilege:</b> grant minimum permissions required. Start with Deny All, add only needed permissions.",
            "<b>Instance Profile:</b> attaches IAM Role to EC2. Application on EC2 uses instance metadata to get credentials — no hardcoded keys."
          ]
        }
      ],
      traps:[
        "Security Groups are stateful — if inbound is allowed, response traffic is automatically allowed outbound",
        "NACLs are stateless — must allow both inbound AND outbound explicitly. Common source of confusion.",
        "Hardcoding AWS credentials in application code = critical security vulnerability. Use IAM Roles always."
      ],
      checkpoint:[
        "What is the difference between a public and private subnet?",
        "What is the difference between Security Groups and NACLs?",
        "Why should you use IAM Roles instead of IAM User access keys for EC2 applications?"
      ]
    },
    {
      level:"Intermediate", time:"45 min",
      sections:[
        { heading:"Route 53 + CloudFront",
          items:[
            "<b>Route 53:</b> AWS DNS. Record types: A (IPv4), AAAA (IPv6), CNAME (alias to another name), Alias (AWS-specific, free for apex domain).",
            "<b>Routing policies:</b> Simple, Weighted (A/B testing, gradual migration), Latency (lowest latency), Failover (active-passive HA), Geolocation, Geoproximity.",
            "<b>CloudFront:</b> CDN. 400+ PoPs. Caches at edge. Reduces origin load. Supports Lambda@Edge and CloudFront Functions for edge compute.",
            "<b>CloudFront + S3:</b> private bucket + OAC. Only CloudFront can access S3. Signed URLs/cookies for private content distribution."
          ]
        },
        { heading:"WAF + Shield + Security Services",
          items:[
            "<b>WAF (Web Application Firewall):</b> L7 rules. Block SQL injection, XSS, bad bots, rate limiting by IP. Attach to CloudFront, ALB, API Gateway.",
            "<b>Shield Standard:</b> free, automatic DDoS protection for all AWS resources.",
            "<b>Shield Advanced:</b> paid. Enhanced DDoS protection, cost protection, 24/7 DDoS response team.",
            "<b>GuardDuty:</b> threat detection. Analyzes CloudTrail, VPC Flow Logs, DNS logs. ML-based anomaly detection.",
            "<b>AWS Secrets Manager vs SSM Parameter Store:</b> Secrets Manager = auto-rotation, costs $0.40/secret/month. SSM = free for standard, manual rotation."
          ]
        }
      ],
      traps:[
        "CNAME cannot be used for apex/root domain (example.com) — use Route 53 Alias record instead",
        "CloudFront cache not invalidated after S3 update — either use versioned filenames or explicit invalidation",
        "WAF is not a Silver Bullet — inspect and tune rules, log all blocked requests"
      ],
      checkpoint:[
        "When would you use Weighted routing vs Latency routing in Route 53?",
        "What is the difference between CloudFront and an ALB for serving a web application?",
        "Design a multi-region active-passive failover using Route 53."
      ]
    },
    {
      level:"Advanced", time:"35 min",
      sections:[
        { heading:"Advanced Networking + Compliance",
          items:[
            "<b>VPC Peering:</b> connect two VPCs. Non-transitive — A↔B, B↔C doesn't mean A↔C. No overlapping CIDR blocks.",
            "<b>Transit Gateway:</b> hub-and-spoke. Connect many VPCs and on-prem. Transitive routing. Simpler than full mesh peering.",
            "<b>PrivateLink:</b> expose service to other VPCs/accounts without VPC peering. Traffic stays in AWS network. For SaaS, cross-account services.",
            "<b>CloudTrail:</b> audit log of all API calls. Who did what, when, from where. Enable in all regions. S3 + CloudWatch Logs.",
            "<b>Config:</b> track resource configuration changes over time. Compliance rules. 'Was this S3 bucket ever public?' "
          ]
        }
      ],
      traps:[
        "VPC Peering is not transitive — misunderstanding this causes network design failures in multi-VPC architectures",
        "CloudTrail is not real-time — events appear with ~15 min delay. Use EventBridge for real-time API event reactions",
        "Disabling CloudTrail logging leaves no audit trail — enable in all regions including regions you don't use"
      ],
      checkpoint:[
        "What is the difference between VPC Peering and Transit Gateway? When do you use each?",
        "What is AWS PrivateLink and how is it different from VPC Peering?",
        "Design the networking for a 10-VPC AWS organisation with on-premises connectivity."
      ]
    }
  ],
  grill:`You are a Senior AWS Solutions Architect interviewing a candidate.\n\nTOPIC: AWS Networking + Security (Block 54)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Architecture scenarios ('your EC2 in private subnet can't reach internet — diagnose'), security audits ('find the security issues in this VPC design'), service selection ('VPC Peering vs Transit Gateway for this topology').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:55, phase:"DevOps", chip:"infra", freq:"med", role:"devops",
  title:"Terraform — IaC Fundamentals",
  subtitle:"HCL syntax, state management, modules, plan/apply workflow, best practices",
  prereqs:[54],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"Core Concepts",
          items:[
            "<b>Terraform = Infrastructure as Code.</b> Declare desired infrastructure state in HCL. Terraform computes diff and applies.",
            "<b>Provider:</b> plugin for AWS/GCP/Azure/Kubernetes etc. Translates HCL to API calls.",
            "<b>Resource:</b> infrastructure object. <code>resource 'aws_instance' 'web' { ami = '...' instance_type = 't3.micro' }</code>",
            "<b>terraform init:</b> download providers. <b>plan:</b> show what will change. <b>apply:</b> make changes. <b>destroy:</b> delete everything.",
            "<b>State file (terraform.tfstate):</b> maps your config to real infrastructure. Source of truth for Terraform. Never edit manually."
          ]
        }
      ],
      traps:[
        "terraform apply without plan = surprise changes. Always plan first, review before apply.",
        "Storing state file locally means no team collaboration and no locking — use remote backend (S3 + DynamoDB)",
        "terraform destroy deletes ALL resources in state — destructive, use with extreme caution in production"
      ],
      checkpoint:[
        "What is Terraform state and why is it important?",
        "What is the workflow for making a change to existing infrastructure with Terraform?",
        "I run terraform plan and see a resource will be replaced (forces replacement). What does that mean?"
      ]
    },
    {
      level:"Intermediate", time:"40 min",
      sections:[
        { heading:"Remote State + Modules",
          items:[
            "<b>Remote backend (S3 + DynamoDB):</b> shared state file in S3. DynamoDB for state locking (prevents concurrent applies). Enable versioning on S3 bucket.",
            "<b>Modules:</b> reusable Terraform configuration. Input variables, output values. DRY principle. Call module: <code>module 'vpc' { source = './modules/vpc' }</code>",
            "<b>Variables:</b> var.region, tfvars files, environment variables (TF_VAR_region). Sensitive = true for secrets (masked in output).",
            "<b>Outputs:</b> expose values from module/root. Reference with module.vpc.vpc_id.",
            "<b>Data sources:</b> read existing infrastructure. <code>data 'aws_ami' 'ubuntu' { ... }</code> — fetch latest AMI without hardcoding."
          ]
        },
        { heading:"Workspaces + Environments",
          items:[
            "<b>Workspaces:</b> multiple state files from same config. terraform workspace new staging. Separate state per environment.",
            "<b>Workspace vs directories:</b> separate directories (dev/, staging/, prod/) is cleaner for environments with different configs. Workspaces for identical configs with different state.",
            "<b>Terragrunt:</b> thin wrapper around Terraform. DRY backend config, dependency management, remote state references across modules."
          ]
        }
      ],
      traps:[
        "Remote state without locking = concurrent applies corrupt state — always use DynamoDB locking with S3 backend",
        "Sensitive variables marked sensitive=true still appear in state file — encrypt state at rest (S3 SSE)",
        "Module versions not pinned = upstream module change breaks your infra — always pin module versions"
      ],
      checkpoint:[
        "Why do you need DynamoDB alongside S3 for Terraform remote state?",
        "When would you use Terraform workspaces vs separate directories for environments?",
        "Walk me through creating a reusable VPC module in Terraform."
      ]
    },
    {
      level:"Advanced", time:"30 min",
      sections:[
        { heading:"Production Terraform Practices",
          items:[
            "<b>Import existing resources:</b> terraform import aws_instance.web i-1234567890. Bring unmanaged infra under Terraform control.",
            "<b>Lifecycle rules:</b> create_before_destroy (zero-downtime replacement), prevent_destroy (protect critical resources), ignore_changes (for externally managed attributes).",
            "<b>Atlantis / Terraform Cloud:</b> PR-based Terraform workflow. Plan on PR open, apply on merge. Audit trail, access control.",
            "<b>Policy as code (Sentinel/OPA):</b> enforce policies before terraform apply. 'All S3 buckets must have encryption enabled'. Prevents misconfiguration."
          ]
        }
      ],
      traps:[
        "create_before_destroy requires no naming conflicts — if name is fixed (not random), new resource creation fails",
        "terraform import only imports state — does not generate HCL. Must write resource config manually first.",
        "prevent_destroy blocks terraform destroy but not manual deletion via console — it's a Terraform guardrail only"
      ],
      checkpoint:[
        "What does create_before_destroy do and when do you need it?",
        "I have existing AWS infrastructure not managed by Terraform. How do I bring it under Terraform control?",
        "What is policy-as-code in Terraform context and why does it matter?"
      ]
    }
  ],
  grill:`You are a Senior DevOps Engineer interviewing a Terraform candidate.\n\nTOPIC: Terraform IaC Fundamentals (Block 55)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical scenarios — 'your team's Terraform state is corrupted — what happened and how do you recover', 'how do you structure Terraform for 5 environments', 'teammate applied and broke prod — what controls prevent this'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:56, phase:"DevOps", chip:"infra", freq:"med", role:"devops",
  title:"Observability — Prometheus, Grafana, Alerting",
  subtitle:"Metrics, logs, traces — the three pillars, Prometheus internals, Grafana dashboards, alert design",
  prereqs:[50],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"Three Pillars of Observability",
          items:[
            "<b>Metrics:</b> numeric measurements over time. CPU %, request rate, error rate, latency percentiles. Low cardinality. Cheap to store.",
            "<b>Logs:</b> discrete events with context. Error details, audit trail. High cardinality. Expensive at scale.",
            "<b>Traces:</b> request flow across services. Span tree. Latency breakdown by service. Medium cardinality.",
            "<b>When to use each:</b> metrics for alerting and dashboards (is something wrong?). Logs for debugging (what exactly happened?). Traces for distributed latency (where is the slowness?)."
          ]
        },
        { heading:"Prometheus Basics",
          items:[
            "<b>Pull-based model:</b> Prometheus scrapes /metrics endpoints on your services. Services expose metrics, Prometheus collects.",
            "<b>Metric types:</b> Counter (monotonically increasing: request count), Gauge (can go up/down: memory usage), Histogram (bucketed observations: request latency), Summary (similar to Histogram, client-side quantiles).",
            "<b>PromQL:</b> query language. rate(http_requests_total[5m]) = per-second rate over 5 min. histogram_quantile(0.99, ...) = p99 latency.",
            "<b>Labels:</b> key-value dimensions on metrics. {service='api', method='POST', status='500'}. Enable filtering and aggregation."
          ]
        }
      ],
      traps:[
        "Counter vs Gauge: counter only goes up (use rate() to get rate of increase). Gauge goes up and down.",
        "High-cardinality labels (user_id, request_id) cause metric explosion — Prometheus runs OOM. Use logs for high-cardinality.",
        "rate() requires at least 2 scrapes — for counters that reset (restart), rate() handles this correctly"
      ],
      checkpoint:[
        "What are the three pillars of observability and when do you use each?",
        "What is the difference between a Prometheus Counter and a Gauge? Give an example of each.",
        "Why should you never use user_id as a Prometheus label?"
      ]
    },
    {
      level:"Intermediate", time:"40 min",
      sections:[
        { heading:"Grafana + Alerting",
          items:[
            "<b>Grafana:</b> visualisation layer. Connects to Prometheus, Loki (logs), Tempo (traces), CloudWatch, Datadog etc.",
            "<b>Dashboard design:</b> USE method (Utilisation, Saturation, Errors) for resources. RED method (Rate, Errors, Duration) for services.",
            "<b>Alerting principles:</b> alert on symptoms (user-facing impact) not causes. 'Error rate > 1%' not 'CPU > 80%'.",
            "<b>Alert fatigue:</b> too many alerts → engineers ignore them all. Only page on things requiring immediate human action.",
            "<b>Alertmanager:</b> routes Prometheus alerts to Slack, PagerDuty, email. Grouping, inhibition, silencing."
          ]
        },
        { heading:"Loki + Structured Logging",
          items:[
            "<b>Loki:</b> log aggregation, indexes labels only (not log content). Cheap. Query with LogQL.",
            "<b>Structured logging:</b> JSON logs with consistent fields. {level:'error', service:'api', trace_id:'abc', message:'DB timeout'}.",
            "<b>Log levels:</b> ERROR (page someone), WARN (investigate), INFO (normal ops), DEBUG (development only). Don't log DEBUG in production.",
            "<b>Correlation:</b> trace_id in every log line links logs to distributed traces. requestId in every API log links to incoming request."
          ]
        }
      ],
      traps:[
        "Alerting on CPU > 80% is a cause not symptom — users don't care about CPU, they care about slow responses",
        "Logging sensitive data (passwords, PII, tokens) in application logs = compliance violation",
        "DEBUG logging in production = massive log volume = high storage cost + performance impact"
      ],
      checkpoint:[
        "What is the RED method for service monitoring? What metrics does it cover?",
        "Design an alerting strategy for an API service. What do you alert on and what do you not?",
        "What is the difference between Prometheus and Loki? When do you use each?"
      ]
    },
    {
      level:"Advanced", time:"30 min",
      sections:[
        { heading:"SLOs + Error Budgets",
          items:[
            "<b>SLI (Service Level Indicator):</b> metric measuring service quality. Request success rate, p99 latency.",
            "<b>SLO (Service Level Objective):</b> target for SLI. 99.9% availability, p99 latency &lt;200ms.",
            "<b>SLA (Service Level Agreement):</b> contractual commitment with consequences. Based on SLOs.",
            "<b>Error budget:</b> 1 - SLO. 99.9% availability = 0.1% error budget = 43.8 min/month downtime allowed.",
            "<b>Error budget policy:</b> when budget exhausted: freeze non-critical features, focus on reliability. When budget healthy: ship features fast."
          ]
        }
      ],
      traps:[
        "SLO too high (99.999%) = zero error budget = no deployments possible. Balance reliability with velocity.",
        "Measuring availability as uptime not success rate misses partial outages (service up but returning 500s)",
        "Error budget resets monthly — an exhausted budget doesn't carry over penalties"
      ],
      checkpoint:[
        "What is the relationship between SLI, SLO, and SLA?",
        "What is an error budget and how does it change engineering decisions?",
        "My service's SLO is 99.9% availability. How much downtime is that per month? Per year?"
      ]
    }
  ],
  grill:`You are a Senior SRE/DevOps Engineer interviewing a candidate.\n\nTOPIC: Observability — Prometheus, Grafana, Alerting (Block 56)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Monitoring design scenarios ('design observability for this microservice'), alert critique ('what is wrong with this alert rule'), SLO concepts ('calculate the error budget for this SLO').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

{
  id:57, phase:"DevOps", chip:"infra", freq:"med", role:"devops",
  title:"Nginx — Reverse Proxy + Load Balancing",
  subtitle:"Reverse proxy config, load balancing, SSL termination, caching, WebSocket, rate limiting",
  prereqs:[29],
  tiers:[
    {
      level:"Beginner", time:"25 min",
      sections:[
        { heading:"Nginx as Reverse Proxy",
          items:[
            "<b>Reverse proxy:</b> Nginx sits in front of backend servers. Clients connect to Nginx, Nginx forwards to backends. Hides backend topology.",
            "<b>Basic proxy config:</b> <code>location / { proxy_pass http://backend:8080; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; }</code>",
            "<b>upstream block:</b> define backend pool. <code>upstream backend { server app1:8080; server app2:8080; }</code> then proxy_pass http://backend.",
            "<b>Load balancing methods:</b> round-robin (default), least_conn (least connections), ip_hash (sticky sessions by client IP)."
          ]
        }
      ],
      traps:[
        "Forgetting proxy_set_header X-Real-IP — backend sees Nginx IP not client IP for all requests",
        "ip_hash for WebSocket sticky sessions — client must always hit same backend. ip_hash achieves this.",
        "proxy_pass with trailing slash changes URL: proxy_pass http://backend/ strips location prefix. Without slash: passes full path."
      ],
      checkpoint:[
        "What is a reverse proxy and why do you use Nginx in front of your application?",
        "How do you configure Nginx to load balance across 3 backend servers?",
        "What is the difference between ip_hash and least_conn load balancing?"
      ]
    },
    {
      level:"Intermediate", time:"35 min",
      sections:[
        { heading:"SSL + WebSocket + Caching",
          items:[
            "<b>SSL termination:</b> Nginx handles HTTPS, backends use HTTP. Certificate at Nginx only. listen 443 ssl; ssl_certificate; ssl_certificate_key.",
            "<b>Let's Encrypt + Certbot:</b> free SSL certificates. Certbot auto-renews. Certbot --nginx for automatic config.",
            "<b>WebSocket proxy:</b> <code>proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade';</code> Without this: 60s timeout.",
            "<b>Nginx caching:</b> proxy_cache_path, proxy_cache, proxy_cache_valid. Cache static assets at Nginx layer. Bypass cache with proxy_cache_bypass."
          ]
        },
        { heading:"Rate Limiting + Security",
          items:[
            "<b>Rate limiting:</b> limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s. limit_req zone=api burst=20 nodelay.",
            "<b>limit_req burst:</b> allow burst above rate, queue up to burst, nodelay = serve burst immediately without queueing.",
            "<b>Return 444:</b> silently close connection with no response. For malicious clients.",
            "<b>deny/allow:</b> whitelist/blacklist IPs. deny all except allow specific IPs. Good for internal admin paths."
          ]
        }
      ],
      traps:[
        "WebSocket behind Nginx drops after 60s without upgrade headers — always add proxy_http_version 1.1 and Upgrade headers",
        "proxy_cache caches 301/302 redirects — set proxy_cache_valid to not cache redirects",
        "limit_req without burst = even small traffic spikes hit 503 — always configure burst"
      ],
      checkpoint:[
        "What Nginx config enables WebSocket proxying and what breaks without it?",
        "Design a rate limiting config that allows 10 req/s normally but allows bursts of 50.",
        "How do you configure SSL termination in Nginx with Let's Encrypt?"
      ]
    },
    {
      level:"Advanced", time:"25 min",
      sections:[
        { heading:"Performance Tuning",
          items:[
            "<b>worker_processes auto:</b> one worker per CPU core. <b>worker_connections 1024:</b> per worker. Total connections = workers * worker_connections.",
            "<b>keepalive:</b> upstream keepalive connections. keepalive 64; in upstream block — reuse connections to backends (reduce TCP overhead).",
            "<b>sendfile on:</b> serve static files via kernel (zero-copy). Huge performance gain for static file serving.",
            "<b>gzip compression:</b> gzip on; gzip_types text/plain application/json. Reduce response size.",
            "<b>access_log off:</b> for high-traffic static assets. Log is I/O bottleneck at scale. Or buffer: access_log /path buffer=32k."
          ]
        }
      ],
      traps:[
        "worker_connections is per worker not total — total = worker_processes * worker_connections",
        "keepalive upstream requires proxy_http_version 1.1 and proxy_set_header Connection '' — without this keepalive doesn't work",
        "gzip on text/html only by default — must specify gzip_types for JSON, CSS, JS"
      ],
      checkpoint:[
        "How do you calculate maximum concurrent connections in Nginx?",
        "What is upstream keepalive and why does it improve performance?",
        "Your Nginx is CPU-bound serving static files. What is the most impactful config change?"
      ]
    }
  ],
  grill:`You are a Senior DevOps Engineer interviewing a candidate on Nginx.\n\nTOPIC: Nginx Reverse Proxy + Load Balancing (Block 57)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Config review ('what is wrong with this Nginx config'), production issues ('WebSocket connections drop after 60 seconds'), and design ('configure Nginx for a high-traffic API with rate limiting and SSL').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},

// ════════════════════════════════════════════════════════════
// PHASE — BEHAVIORAL + CAREER
// ════════════════════════════════════════════════════════════
{
  id:58, phase:"Behavioral & Career", chip:"arch", freq:"high", role:"fullstack",
  title:"Behavioral — STAR Bank + Interview Patterns",
  subtitle:"STAR framework, 10 must-have stories, common behavioral questions, how to handle 'I don't know'",
  prereqs:[],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"STAR Framework",
          items:[
            "<b>Situation:</b> context. Team size, company, what was happening. 1-2 sentences max.",
            "<b>Task:</b> your specific responsibility. What were YOU accountable for. Not the team.",
            "<b>Action:</b> what YOU specifically did. Use 'I' not 'we'. Technical decisions, tradeoffs, leadership moves.",
            "<b>Result:</b> measurable outcome. Numbers where possible. Business impact, not just technical completion.",
            "<b>Common mistake:</b> spending 80% on Situation/Task, 20% on Action/Result. Reverse it. Interviewers care about what YOU did and what happened."
          ]
        },
        { heading:"10 Must-Have Stories",
          items:[
            "1. Took ownership of a broken or failing system",
            "2. Disagreed with a technical decision — how you handled it",
            "3. Delivered under a hard deadline with incomplete information",
            "4. Found and fixed a production incident",
            "5. Worked across teams with no direct authority",
            "6. Made a significant technical mistake and recovered",
            "7. Improved a process, system, or architecture",
            "8. Mentored or unblocked a teammate",
            "9. Pushed back on scope or requirements with data",
            "10. Chose simplicity over complexity when it mattered"
          ]
        }
      ],
      traps:[
        "Using 'we' throughout — interviewers want to know YOUR contribution not the team's",
        "No measurable result — 'it went better' is not a result. 'Reduced p99 latency from 800ms to 120ms' is.",
        "Stories that make you the hero and everyone else incompetent — shows lack of self-awareness"
      ],
      checkpoint:[
        "Tell me about a time you disagreed with a technical decision. (Practice the full STAR in writing first.)",
        "Tell me about a production incident you handled. What did you personally do?",
        "Tell me about a time you delivered under pressure. What trade-offs did you make?"
      ]
    },
    {
      level:"Intermediate", time:"35 min",
      sections:[
        { heading:"Common Behavioral Patterns",
          items:[
            "<b>'Tell me about yourself':</b> 90-second pitch. Current role + key achievement + what you're looking for + why this company. Not your CV.",
            "<b>'Why are you leaving?':</b> never complain about current employer. Growth, scope, new challenge, team, technology. Always forward-looking.",
            "<b>'Where do you see yourself in 5 years?':</b> honest but aligned with the role. Senior/Staff engineer, technical lead. Show ambition without being vague.",
            "<b>'What is your biggest weakness?':</b> real weakness (not 'I work too hard'). What you're actively doing about it. Shows self-awareness.",
            "<b>Salary question:</b> never give first. 'What is the budgeted range for this role?' If pressed: give a range with your target at the lower end."
          ]
        },
        { heading:"Handling 'I Don't Know'",
          items:[
            "<b>Never bluff.</b> Experienced interviewers know when you're making things up. It disqualifies you faster than not knowing.",
            "<b>Framework for unknown topics:</b> 'I haven't worked with X directly, but here's how I'd think about it based on [related knowledge]'.",
            "<b>Show learning process:</b> 'I don't know the exact answer but I would look at [specific things] to figure it out. My instinct is [reasoning]'.",
            "<b>Redirect to strength:</b> 'I'm less familiar with X, but I have deep experience with Y which solves similar problems in [way]'.",
            "<b>What NOT to do:</b> long silence, 'ummm', starting sentences you can't finish, pretending to know and making up answers."
          ]
        }
      ],
      traps:[
        "Oversharing in behavioral answers — 2-3 minutes max per answer, not a 10-minute story",
        "Bluffing technical knowledge — always better to admit you don't know than to fabricate",
        "Badmouthing previous employer — always sounds worse than the situation actually was"
      ],
      checkpoint:[
        "Write your 90-second 'tell me about yourself' answer. Time it. Is it under 90 seconds?",
        "Practice 'I don't know' for: 'How does Raft consensus work?' (assuming you don't know)",
        "What is your real weakness as an engineer? What are you actively doing about it?"
      ]
    },
    {
      level:"Advanced", time:"25 min",
      sections:[
        { heading:"Senior-Level Behavioral Signals",
          items:[
            "<b>Scope:</b> senior candidates talk about problems beyond their immediate team. Impact on org, cross-team influence, systems thinking.",
            "<b>Ambiguity:</b> 'I didn't have all the information so I did [X] to reduce uncertainty, then made a call'. Senior engineers decide under uncertainty.",
            "<b>Trade-offs:</b> 'We chose [A] over [B] because [reasons]. We accepted the downside of [C]'. Shows engineering judgment.",
            "<b>Failure stories:</b> strongest candidates have clear, honest failure stories. What went wrong, your role in it, what you changed afterward.",
            "<b>Leadership without authority:</b> getting engineers from other teams to adopt your approach, build consensus, drive without mandate."
          ]
        }
      ],
      traps:[
        "No failure stories = lack of self-awareness or hiding. Every senior engineer has made costly mistakes.",
        "Vague impact ('the project was successful') at senior level = red flag. Quantify everything.",
        "Stories where you single-handedly saved the company = sounds fictional. Show complexity and collaboration."
      ],
      checkpoint:[
        "Tell me about your biggest technical mistake. What did it cost? What changed afterward?",
        "Tell me about a time you influenced a technical decision without having direct authority.",
        "Tell me about a time you had to make a decision with incomplete information under time pressure."
      ]
    }
  ],
  grill:`You are a Senior Engineering Manager conducting a behavioral interview.\n\nTOPIC: Behavioral Interview — STAR Bank (Block 58)\n\nYOUR ROLE: Realistic behavioral interviewer. Ask one question, listen to full answer, then probe deeper.\n\nRULES:\n- Ask one behavioral question from the categories: ownership, conflict, failure, delivery, cross-team, improvement, mentorship.\n- After their answer: probe the Action and Result specifically. Ask 'what did YOU specifically do?' and 'what was the measurable impact?'\n- Flag if they say 'we' instead of 'I'.\n- Flag vague results ('it went better') and ask for specifics.\n- After 3-4 questions: give verdict — are their stories Senior-level? What signals are strong/weak?\n\nBEGIN: Ask your first behavioral question.`
},

{
  id:59, phase:"Architecture & Design", chip:"arch", freq:"med", role:"frontend",
  title:"System Design — Frontend Architecture",
  subtitle:"Micro-frontends, design systems, performance budgets, SSR vs CSR trade-offs, monorepo structure",
  prereqs:[35, 48],
  tiers:[
    {
      level:"Beginner", time:"30 min",
      sections:[
        { heading:"Frontend Architecture Patterns",
          items:[
            "<b>Monolithic frontend:</b> one app, one deployment. Simple. Fine for most applications.",
            "<b>Micro-frontends:</b> independently deployed frontend modules. Each team owns their section. Compose at runtime (Module Federation) or build time.",
            "<b>When micro-frontends:</b> multiple teams working on same frontend, different deployment cadences needed, different tech stacks. Not for small apps.",
            "<b>Design system:</b> shared component library + design tokens + documentation. Single source of visual truth. Storybook for development + documentation.",
            "<b>Monorepo:</b> all frontend packages in one repo. Shared code easy. Turborepo/Nx for build caching and task orchestration."
          ]
        }
      ],
      traps:[
        "Micro-frontends add complexity — don't adopt without clear multi-team problem to solve",
        "Design system without governance = diverges from production UI over time — need dedicated ownership",
        "Monorepo without build caching = CI time grows with every added package — always add Turborepo/Nx"
      ],
      checkpoint:[
        "When would you choose micro-frontends over a monolithic frontend?",
        "What is a design system and how is it different from a component library?",
        "What problem does Turborepo solve in a monorepo?"
      ]
    },
    {
      level:"Intermediate", time:"40 min",
      sections:[
        { heading:"Rendering Strategy at Scale",
          items:[
            "<b>CSR (Client-Side Rendering):</b> empty HTML, JS fetches data, renders. Slow initial load, fast navigation. Poor SEO without SSR.",
            "<b>SSR (Server-Side Rendering):</b> HTML from server per request. Good SEO, fast initial paint. Server load, complex caching.",
            "<b>SSG (Static Generation):</b> HTML at build time. CDN-served. Fastest. Not for dynamic per-user content.",
            "<b>Islands Architecture:</b> mostly static HTML, small interactive islands hydrated independently. Astro. Best performance, SEO + interactivity.",
            "<b>Decision framework:</b> public marketing content → SSG. User-specific dashboard → CSR. Mixed content + SEO → Next.js SSR/ISR."
          ]
        },
        { heading:"Performance Architecture",
          items:[
            "<b>Performance budget:</b> set limits on JS bundle size, LCP, CLS, INP before development. Fail CI when exceeded. Prevents gradual bloat.",
            "<b>Critical CSS:</b> inline CSS for above-the-fold content. Eliminate render-blocking external stylesheets for first paint.",
            "<b>Font loading strategy:</b> font-display: swap (show fallback immediately). Preload critical fonts. Subset fonts (only include used characters).",
            "<b>Image optimization:</b> WebP/AVIF formats. Next.js next/image for automatic optimisation. Responsive images with srcset."
          ]
        }
      ],
      traps:[
        "SSR without caching = every request hits the server = expensive and slow. Cache SSR output at CDN or in-process.",
        "Inlining too much CSS defeats the point — only critical above-the-fold CSS. Lazy load the rest.",
        "Font flash of invisible text (FOIT) vs flash of unstyled text (FOUT) — font-display: swap causes FOUT which is usually preferable"
      ],
      checkpoint:[
        "I have a SaaS dashboard with user-specific data and a public marketing site. Which rendering strategy for each and why?",
        "What is the Islands Architecture and when does it make sense over Next.js?",
        "How do you prevent JavaScript bundle size from growing over time?"
      ]
    },
    {
      level:"Advanced", time:"30 min",
      sections:[
        { heading:"Advanced Frontend System Design",
          items:[
            "<b>State sync at scale:</b> multiple browser tabs sharing state. BroadcastChannel API for cross-tab messaging. SharedWorker for shared computation.",
            "<b>Offline-first (PWA):</b> Service Worker caches assets and API responses. Background sync for offline actions. Works without network.",
            "<b>Feature flags at frontend:</b> server-driven flags (fetch on load), SDK-based (LaunchDarkly), edge-based (Vercel Edge Config). Separate deploy from release.",
"<b>A/B testing architecture:</b> variant assignment at edge (no flash). Analytics event tracking. Statistical significance before declaring winner.",
             "<b>Web security for frontends:</b> CSP headers, Subresource Integrity (SRI) for CDN scripts, iframe sandboxing, postMessage origin validation."
           ]
          }
        ],
        traps:[
          "Service Worker update not propagating — users stuck on old version. Use skipWaiting() + clients.claim() with care.",
          "Feature flags evaluated on client = user can see which features are hidden. Server-side evaluation for sensitive features.",
          "postMessage without origin validation = cross-origin script injection. Always validate event.origin."
        ],
        checkpoint:[
          "How do you implement a PWA that works completely offline?",
          "Design a feature flag system for a React frontend. What are the options and trade-offs?",
          "What is Subresource Integrity (SRI) and when do you use it?"
        ]
      }
    ],
    grill:`You are a Senior Frontend/Fullstack Engineer interviewing a candidate on frontend architecture.\n\nTOPIC: Frontend System Design (Block 59)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design scenarios ('design the frontend architecture for a large SaaS product with 5 teams'), trade-off probes ('why SSR here and not SSG'), and performance design ('how do you ensure this stays fast as the team grows').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
   },

// ════════════════════════════════════════════════════════════
// PHASE — NESTJS ADVANCED
// ════════════════════════════════════════════════════════════

{
   id:60, phase:"JS Backend", chip:"nestjs", freq:"high", role:"backend",
   title:"NestJS — Production Patterns",
   subtitle:"WebSocket scaling, caching strategies, file uploads, microservice patterns, testing approaches",
   prereqs:[19,40],
   tiers:[
      {
        level:"Beginner", time:"30 min",
        sections:[
          { heading:"WebSocket Scaling + Gateway Patterns",
            items:[
              "<b>Scaling gateways:</b> WebSocket state must be externalized (Redis adapter) for multi-instance deployments.",
              "<b>Rate limiting:</b> @UseGuards(WsRateLimitGuard) with Redis sliding window. Connection flood prevention.",
              "<b>Connection lifecycle:</b> handleConnection with user auth. handleDisconnect with cleanup. Exceptions disconnect client."
            ]
          },
          { heading:"Caching + Redis Integration",
            items:[
              "<b>CacheModule:</b> @Cacheable(), @CacheEvict(), @CacheClear() decorators. TTL, cache manager configuration.",
              "<b>Redis store:</b> configureCache({ store: redisStore, host, port, ttl }). All instances share cache.",
              "<b>Cache invalidation strategy:</b> Update DTO → evict related cache keys → next request hits fresh data.",
              "<b>Cache aside pattern:</b> Check cache → miss → fetch DB → populate cache. Never cache exceptions.",
              "<b>Multi-instance cache consistency:</b> Redis pub/sub for cache invalidation events across gateway instances."
            ]
          }
        ],
        traps:[
          "WebSocket state stored in memory breaks horizontal scaling — use Redis adapter",
          "Cache stampede on cache miss → multiple requests hit DB simultaneously — use mutex or early recomputation",
          "Redis connection pool exhaustion → configure pool size and reuse connections"
        ],
        checkpoint:[
          "How do you scale a WebSocket gateway across multiple NestJS instances?",
          "Implement a cache-aside pattern for a user profile endpoint with Redis.",
          "When would you evict a cache entry vs letting it expire naturally?"
        ]
      },
      {
        level:"Intermediate", time:"40 min",
        sections:[
          { heading:"File Upload + Streaming",
            items:[
              "<b>Multipart upload:</b> @UseInterceptors(FileInterceptor('file')) with Multer configuration. Memory vs disk storage.",
              "<b>Validation pipeline:</b> ParseFilePipe with maxSize, fileMimeType, custom validators. Fail early on invalid uploads.",
              "<b>Stream to S3:</b> Use PassThrough stream with @S3() injection. Avoid loading entire file in memory for large files.",
              "<b>Progress tracking:</b> Custom interceptor wrapping busboy. Emit events for progress percentage.",
              "<b>Image processing pipeline:</b> Sharp integration with streams. Thumbnail generation, format conversion without temporary files."
            ]
          },
          { heading:"Microservice Communication Patterns",
            items:[
              "<b>Client proxy patterns:</b> ClientProxy.emit() for fire-and-forget, send() for request-response. Observable vs Promise conversion.",
              "<b>Kafka integration:</b> @EventPattern('user.created') with Kafka.js client. Consumer groups, manual offset commits.",
              "<b>gRPC patterns:</b> Unary, server streaming, client streaming, bidirectional streaming. Protobuf versioning strategy.",
              "<b>Message correlation:</b> UUID in message headers for request-response tracing. Async communication tracking.",
              "<b>Retry with exponential backoff:</b> Custom interceptor for retrying failed microservice calls. Circuit breaker integration."
            ]
          }
        ],
        traps:[
          "Large file uploads in memory exhaust Node.js heap — always stream to disk or cloud storage",
          "Blocking the event loop with synchronous image processing — use Sharp streams or worker threads",
          "Microservice retries without backoff cause thundering herd — exponential backoff with jitter required"
        ],
        checkpoint:[
          "How do you handle a 5GB file upload without running out of memory?",
          "Implement a Kafka consumer that manually commits offsets only after successful processing.",
          "Design a resilient gRPC client that handles service restarts gracefully."
        ]
      },
      {
        level:"Advanced", time:"35 min",
        sections:[
          { heading:"Testing NestJS Applications",
            items:[
              "<b>TestBed patterns:</b> TestBed.configureTestingModule({ imports: [TestingModule] }). Use in-memory DB for integration.",
              "<b>e2e testing:</b> SuperTest with app.init() and app.close(). Test full request lifecycle including guards/interceptors.",
              "<b>Custom provider testing:</b> useValue for mocks, useFactory for conditional providers. Test different DI scenarios.",
              "<b>Gateway testing:</b> Create mock WebSocket server. Test message handling without real connections.",
              "<b>Contract testing with Pact:</b> Verify microservice calls match expected contracts. Prevent breaking changes."
            ]
          },
          { heading:"Advanced Guard + Interceptor Patterns",
            items:[
              "<b>Role-based guards:</b> extend CanActivate. Inject role hierarchy service. Cache role lookups.",
              "<b>Rate limiting interceptor:</b> Redis counter per user/IP. Sliding window or token bucket. Return 429 on exceed.",
              "<b>Logging interceptor:</b> capture request/response, duration, user context. Structured logging with correlation IDs.",
              "<b>Timeout interceptor:</b> AbortController with signal injection. Prevent hanging requests.",
              "<b>Composition pattern:</b> Apply multiple guards that must ALL pass (AND logic) vs ANY pass (OR logic)."
            ]
          }
        ],
        traps:[
          "Testing with real database = flaky tests and slow CI — use SQLite in-memory or TestContainers",
          "Ignoring request context in interceptors = logs without user/session info — always capture context",
          "Rate limiting without cleanup strategy = Redis memory leak — TTL or periodic cleanup required"
        ],
        checkpoint:[
          "How do you test a controller that uses JWT authentication without hitting the real auth service?",
          "Implement a rate limiter guard that uses sliding window with Redis. What are the edge cases?",
          "How do you track request processing time across all endpoints using an interceptor?"
        ]
      }
   ],
   grill:`You are a Senior Engineer interviewing a NestJS backend candidate.\n\nTOPIC: NestJS Production Patterns (Block 60)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production scenarios — 'WebSocket scaling breaks under load', 'rate limiter causes Redis outage', 'file uploads crash the service'. Test operational knowledge and debugging skills.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
},
 
{
   id:61, phase:"JS Backend", chip:"nestjs", freq:"high", role:"backend",
   title:"NestJS — Advanced Architecture",
   subtitle:"CQRS, event sourcing, custom decorators, lifecycle hooks, performance optimization",
   prereqs:[19,60],
   tiers:[
     {
       level:"Beginner", time:"30 min",
       sections:[
         { heading:"CQRS Pattern Implementation",
           items:[
             "<b>CQRS setup:</b> Commands change state, Queries read state. Separate models for writes vs reads.",
             "<b>Commands:</b> @CommandHandler() with CommandBus. One command = one operation.",
             "<b>Events:</b> @EventsHandler() with EventBus. Multiple handlers can react to same event.",
             "<b>Event sourcing:</b> Store events, not state. Rebuild state by replaying events. Audit trail built-in.",
             "<b>CommandBus vs EventBus:</b> Commands expect exactly one handler, return result. Events broadcast to all handlers."
           ]
         },
         { heading:"Custom Decorator Factory Patterns",
           items:[
             "<b>Factory vs decorator:</b> createDecorator() creates injectable decorator with metadata. NoParamDecorator returns void.",
             "<b>User context decorator:</b> createDecorator<{ userId: string }>('User'). Pass request-scoped data to services.",
             "<b>Config decorator:</b> Inject configuration values based on runtime context. Environment-aware injection.",
             "<b>Role-based decorator:</b> @Roles('admin', 'manager') sets metadata. Guard reads and validates.",
             "<b>Performance:</b> SetMetadata + Reflector faster than parsing token in each guard."
           ]
         }
       ],
       traps:[
         "CQRS without event sourcing still requires separate write/read models — not just commands and handlers",
         "Custom decorators without proper cleanup leak memory in long-running processes",
         "Roles decorator checked at runtime but metadata set at compile-time — order matters in DI"
       ],
       checkpoint:[
         "When would you choose CQRS over a simple service pattern?",
         "How does a custom decorator transfer data from a guard to a service?",
         "What is the difference between CommandBus and EventBus in NestJS CQRS?"
       ]
     },
     {
       level:"Intermediate", time:"40 min",
       sections:[
         { heading:"Lifecycle Hooks + Module Configuration",
           items:[
             "<b>Injectable lifecycle:</b> OnModuleInit, OnModuleDestroy, BeforeApplicationShutdown. Cleanup async resources.",
             "<b>Asynchronous providers:</b> useFactory returning Promise. Module waits for provider resolution before init.",
             "<b>Dynamic module configuration:</b> register() accepts options. Async options via registerAsync().",
             "<b>Module lifecycle events:</b> OnApplicationBootstrap, OnApplicationShutdown. Run migrations, health checks.",
             "<b>Circular dependency resolution:</b> forwardRef() for module imports or provider injection. Breaks true circular deps."
           ]
         },
         { heading:"Performance Optimization Patterns",
           items:[
             "<b>Request pooling:</b> For external APIs, pool HTTP agents. Reuse connections, reduce TLS handshake overhead.",
             "<b>Response compression:</b> CompressionMiddleware for large JSON responses. Gzip/Brotli based on Accept-Encoding.",
             "<b>Memory leak detection:</b> node --inspect + Chrome DevTools heap snapshots. Monitor event listener growth.",
             "<b>Cluster mode:</b> PM2 or Node.js cluster module. Sticky sessions for WebSocket. Shared state via Redis.",
             "<b>Fastify adapter:</b> 2-3x performance improvement. Use reply.send() instead of res.json(). JSON schema validation."
           ]
         }
       ],
       traps:[
         "OnModuleDestroy doesn't handle SIGKILL — graceful SIGTERM only",
         "Cluster mode without sticky sessions breaks WebSocket — use primary + workers with connection draining",
         "Fastify adapter changes response API — old code using res.status().json() breaks"
       ],
       checkpoint:[
         "How do you gracefully close a NestJS application with ongoing requests?",
         "Implement a dynamic module that accepts async configuration from a remote source.",
         "How do you detect and fix a memory leak in a production NestJS service?"
       ]
     },
     {
       level:"Advanced", time:"30 min",
       sections:[
         { heading:"Advanced Microservice Patterns",
           items:[
             "<b>Saga orchestration in NestJS:</b> Workflow engine with state machine. Event store for saga state. Compensation handlers.",
             "<b>Retry patterns with Redis:</b> Store message + retry count. Exponential backoff. Dead letter queue after max retries.",
             "<b>Event versioning:</b> Add version field to events. Backward compatible handlers. Migration strategy for old events.",
             "<b>Transaction boundaries:</b> Outbox pattern in same DB transaction as business logic. Polling publisher for reliability.",
             "<b>Idempotency in microservices:</b> Idempotency key in message header. Store processed keys with TTL. Deduplication at consumer."
           ]
         }
       ],
       traps:[
         "Saga compensation not atomic → partial rollback → data inconsistency — design idempotent compensations",
         "Event version upgrades without backward compatibility break existing consumers",
         "Idempotency key lookup without index = slow queries at scale → composite index on (key, consumer)"
       ],
       checkpoint:[
         "Design a payment processing flow with saga pattern. What are the compensation operations?",
         "How do you implement idempotent Kafka consumer in NestJS?",
         "What is the Outbox pattern and why is it better than dual-write?"
       ]
     }
   ],
   grill:`You are a Senior Engineer interviewing a NestJS candidate.\n\nTOPIC: NestJS Advanced Architecture (Block 61)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Distributed systems patterns, event sourcing design decisions, debugging scenarios. 'WebSocket connections drop under load', 'event sourcing migration strategy', 'detect memory leak from metrics'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
   },
 
// ════════════════════════════════════════════════════════════
// PHASE — ADVANCED JAVASCRIPT PATTERNS
// ════════════════════════════════════════════════════════════
// Deepen existing JavaScript coverage for senior-level interviews
 
{
    id:62, phase:"JS Backend", chip:"nodejs", freq:"high", role:"fullstack",
    title:"Advanced JavaScript Patterns",
    subtitle:"Event loop mastery, memory management, async patterns, V8 optimizations, error handling",
    prereqs:[34],
    tiers:[
     {
       level:"Beginner", time:"30 min",
       sections:[
         { heading:"Event Loop Production Patterns",
           items:[
             "<b>Event loop phases:</b> timers→pending→idle/prepare→poll→check→close. Each phase fully drains before next.",
             "<b>setImmediate vs setTimeout(0):</b> Inside I/O callback, setImmediate fires first. Outside, order indeterminate. Use setImmediate for immediate next-tick.",
             "<b>process.nextTick:</b> Runs before promise resolution. Starves I/O if called in loop → infinite nextTick loop danger.",
             "<b>Event loop monitoring:</b> monitorEventLoopDelay() from 'perf_hooks'. Alert on >200ms delays. Indicates blocking code.",
             "<b>Unref timers:</b> timer.unref() allows process to exit even if timer pending. For optional cleanup tasks."
           ]
         },
         { heading:"Async/Await Error Patterns",
           items:[
             "<b>Central error catching:</b> AsyncLocalStorage for request context across async boundaries without passing through parameters.",
             "<b>Error boundary patterns:</b> Express error middleware catches sync throws and rejected promises. Multiple handlers for different error types.",
             "<b>Deadlock prevention:</b> Promise.all with timeout wrapper. Mutex with TTL to prevent stuck locks.",
             "<b>Async resource cleanup:</b> using 'using' proposal or finally blocks. Cleanup must happen regardless of success/failure.",
             "<b>Error propagation:</b> Re-throwing loses context. Wrap with new Error(message, { cause: originalError })."
           ]
         }
       ],
       traps:[
         "process.nextTick starves I/O — infinite loop of nextTick calls = no timers/event handlers run",
         "AsyncLocalStorage context lost across native async operations — test carefully",
         "Double error handling (throw then catch) = redundant and confusing"
       ],
       checkpoint:[
         "What is process.nextTick and when does it run relative to setImmediate?",
         "How do you propagate request context (trace ID) through async/await code?",
         "You see event loop delay of 5 seconds. What are the likely causes?"
       ]
     },
     {
       level:"Intermediate", time:"40 min",
       sections:[
         { heading:"V8 Memory + Performance",
           items:[
             "<b>V8 heap organization:</b> New space (young generation, 1-8MB, frequent GC), Old space (old generation, survives GC, expensive to collect).",
             "<b>Memory leak detection:</b> --inspect flag + Chrome DevTools heap snapshot. Compare before/after operation. Look for growing retained size.",
             "<b>Hidden classes danger:</b> Adding properties in different order creates different hidden classes → deoptimization. Always add properties in same order.",
             "<b>Array literal vs push:</b> [1,2,3] creates packed array (fast). arr.push(1);arr.push(2) creates holey array (slower).",
             "<b>Object shape changes:</b> Changing property types (string→number) creates new hidden class → megamorphic → slow property access."
           ]
         },
         { heading:"Buffer + Binary Data",
           items:[
             "<b>Buffer pool:</b> Allocating many small buffers = memory fragmentation. Use pre-allocated pool or Buffer.allocUnsafe for performance.",
             "<b>Encoding performance:</b> Buffer.from(string, 'utf8') allocates. Reusing buffers = 0 allocations. pool.map(chunk→toString()) = many allocations.",
             "<b>Binary protocol parsing:</b> Use Buffer.readUInt32BE(offset) instead of parseInt. Avoid buffer → string → number conversion.",
             "<b>Stream backpressure:</b> stream.write() returns false when buffer full. Wait for 'drain' event. pause() / resume() for flow control.",
             "<b>File descriptor limits:</b> Default 1024 open files. ulimit -n 65536 for high-concurrency servers. Monitor with lsof."
           ]
         }
       ],
       traps:[
         "Changing object property types after creation causes deoptimization — keep shapes consistent",
         "Buffer.from() in hot loop = GC pressure — pre-allocate or use pools",
         "Ignoring backpressure = memory exhaustion — always handle drain event"
       ],
       checkpoint:[
         "How do you detect a memory leak in a Node.js application?",
         "What are hidden classes in V8 and why do they matter for performance?",
         "How do you handle backpressure when piping a fast readable stream to a slow writable stream?"
       ]
     },
     {
       level:"Advanced", time:"30 min",
       sections:[
         { heading:"Worker Threads + Performance Isolation",
           items:[
             "<b>When to use Workers:</b> CPU-bound (image processing, crypto), not I/O bound. I/O uses libuv thread pool already.",
             "<b>SharedArrayBuffer:</b> Share memory between main and worker. Atomics for synchronization. Race condition prevention.",
             "<b>ParentPort communication:</b> parentPort.postMessage({ heavyTask: data }). Main thread routes work to available workers.",
             "<b>Worker pool pattern:</arg_key> pool = new WorkerPool({ maxWorkers: 4 }). Distributes work, tracks completion. shutdown() waits for workers.",
             "<b>Performance comparison:</b> Single thread with streams > Worker threads for I/O. Workers only for CPU-heavy tasks."
           ]
         }
       ],
       traps:[
         "Worker threads for I/O = worse than single thread — libuv handles I/O already",
         "SharedArrayBuffer without Atomics = race conditions — always use Atomics for writes",
         "Worker pool without proper cleanup = zombie workers on reload — implement shutdown signals"
       ],
       checkpoint:[
         "When would you use Worker threads instead of cluster module?",
         "How do you share data between main thread and worker thread efficiently?",
         "What causes a Worker thread to block the event loop?"
       ]
     }
   ],
   grill:`You are a Senior Backend Engineer interviewing a Node.js candidate.\n\nTOPIC: Advanced JavaScript Patterns (Block 62)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production debugging scenarios, performance optimization, event loop mastery. 'Event loop blocked for 5 seconds', 'why is this code slow', 'memory leak investigation'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
   },
 
// ════════════════════════════════════════════════════════════
// PHASE — ADVANCED REACT PATTERNS
// ════════════════════════════════════════════════════════════
 
{
   id:63, phase:"Frontend", chip:"frontend", freq:"high", role:"frontend",
   title:"Advanced React Patterns",
   subtitle:"Composition patterns, performance optimization, custom hooks, error boundaries, concurrent features",
   prereqs:[35],
   tiers:[
     {
       level:"Beginner", time:"30 min",
       sections:[
         { heading:"Compound Components + Controlled Props",
           items:[
             "<b>Compound pattern:</b> Parent provides context, children consume. Menu + MenuItem + MenuOverlay. Implicit state sharing.",
             "<b>Controlled props:</b> Component accepts value prop + onChange. Parent controls state. Uncontrolled: internal state, ref access.",
             "<b>Flexible APIs:</b> accept both controlled and uncontrolled. Use useState for initial state. Controlled wins if provided.",
             "<b>Use case:</b> Dropdown component where consumer can control open state OR let component manage it internally.",
             "<b>Implementation:</b> context.Provider + context.Consumer in compound children. Cloning props to children for controlled."
           ]
         },
         { heading:"Error Boundaries + Suspense",
           items:[
             "<b>Error boundaries:</b> class component with componentDidError(required) + getDerivedStateFromError(or static). Catch render phase errors.",
             "<b>Boundary placement:</b> Place above route level for page-wide errors. Individual boundaries for component isolation.",
             "<b>Suspense boundaries:</b> Suspense catches thrown promises. Show fallback while promise resolves. Can nest.",
             "<b>Error boundary fallback:</b> 'Something went wrong' → 'Retry button' → reset error state. Log error via callback.",
             "<b>What errors don't catch:</b> event handlers, async code, server-side errors. Catch those with try/catch."
           ]
         }
       ],
       traps:[
         "Error boundary must be class component in React 17 — hooks version experimental",
         "Suspense without boundary shows nothing — always wrap suspending component in Suspense",
         "Error boundary catches render errors but not event handler errors — wrap handlers in try/catch too"
       ],
       checkpoint:[
         "Why must error boundaries be class components in React 17?",
         "How do you handle errors in event handlers if error boundaries don't catch them?",
         "Design a compound component for a modal with header, body, and footer."
       ]
     },
     {
       level:"Intermediate", time:"40 min",
       sections:[
         { heading:"Custom Hook Patterns",
           items:[
             "<b>Data fetching hook:</b> useEffect with abort controller. Cleanup on unmount. Stale response prevention.",
             "<b>Subscription hook:</b> Encapsulate event emitter logic. Return latest value. Cleanup on unmount. useEffectEvent alternative.",
             "<b>State reducer pattern:</b> expose dispatch(action) for state changes. Allow caller to override reducer for control.",
             "<b>Props getter pattern:</arg_key> Hook returns props to spread onto elements. Abstract complex event handlers. useMediaQuery example.",
             "<b>Factory hook pattern:</arg_key> Hook that generates other hooks. Create reusable async hook factories with default config."
           ]
         },
         { heading:"Performance Optimization Patterns",
           items:[
             "<b>Bundle splitting:</b> lazy() + Suspense for route-level. Loadable components for component-level. Prefetch on hover.",
             "<b>Virtual list:</b> react-window for large lists. Only render visible + buffer items. Variable item heights = complex.",
             "<b>Context splitting:</arg_key> Multiple contexts vs single context. Frequent changes = own context to prevent re-renders.",
             "<b>Memo pitfalls:</arg_key> useMemo for expensive calculations only. useCallback for stable function identity. Over-memoizing = worse performance.",
             "<b>Rerender debugging:</arg_key> why-did-you-render in dev. Identify unnecessary re-renders. Profiler for performance bottlenecks."
           ]
         }
       ],
       traps:[
         "useMemo without dependency array = stale values — always include dependencies",
         "Virtual list with variable heights = complex calculations — measure manually or use estimatedHeight",
         "Multiple small bundles = waterfall loading — balance between big and too-small bundles"
       ],
       checkpoint:[
         "How do you debug unnecessary re-renders in a React component?",
         "What is the props getter pattern and when do you use it?",
         "How do you implement a reusable data fetching hook that handles abort and race conditions?"
       ]
     },
     {
       level:"Advanced", time:"30 min",
sections:[
          { heading:"Concurrent React Patterns",
            items:[
              "<b>useTransition:</b> mark state update as non-urgent. Urgent = typing, click. Non-urgent = tab switch, list filter.",
              "<b>useDeferredValue:</arg_key> defer re-render of non-critical parts. Slow list filter while typing stays responsive.",
              "<b>startTransition:</arg_key> programmatic transition. Wrap non-urgent updates. Does NOT work for DOM updates inside.",
              "<b>Suspense for data:</arg_key> throw promise in render. React caches resolved value. Error boundaries work here too.",
              "<b>Concurrent mode gotchas:</arg_key> Effects run twice in dev = breaking bugs. Cleanup + re-run. Not production bug."
            ]
          },
          { heading:"Micro-Frontend Patterns",
            items:[
              "<b>Module Federation:</b> Webpack 5 feature. Share code between builds. Remote + Host configuration. Version conflicts.",
              "<b>iframe isolation:</b> Strongest isolation. Communication via postMessage. Style leakage prevention.",
              "<b>Custom elements:</b> Wrap React component as web component. Framework agnostic. Bundle size tradeoff.",
              "<b>Runtime integration:</b> Single SPA, import maps. Orchestrate multiple micro-apps. Shared dependencies."
            ]
          }
        ],
        traps:[
          "Concurrent mode effects run twice = expected behavior, not bug — test with strict mode",
          "Module federation without shared dependencies = bundle duplication — configure shared carefully",
          "Micro-frontend CSS isolation = not automatic — need shadow DOM or CSS-in-JS with scoping"
        ],
        checkpoint:[
          "What is useTransition and why is it needed in concurrent mode?",
          "How do you handle CSS isolation in a micro-frontend architecture?",
          "What happens to useEffect when running in React concurrent mode?"
        ]
      }
    ],
grill:`You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: Advanced React Patterns (Block 63)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Pattern recognition, refactoring suggestions, performance diagnosis. 'This component re-renders too often — fix it', 'implement this compound component', 'concurrent mode debugging'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
   },
 
// ════════════════════════════════════════════════════════════
// PHASE — TYPESCRIPT ADVANCED
// ════════════════════════════════════════════════════════════

{
   id:64, phase:"JS Backend", chip:"ts", freq:"high", role:"fullstack",
   title:"TypeScript — Advanced Type System",
   subtitle:"Conditional types, mapped types, generic constraints, type inference, utility types, branding",
   prereqs:[34],
   tiers:[
      {
        level:"Beginner", time:"30 min",
        sections:[
          { heading:"TypeScript Utility Types Deep Dive",
            items:[
              "<b>Readonly&lt;T&gt;:</b> makes all properties readonly. Use for immutable data structures. deep: readonly nested objects.",
              "<b>Partial&lt;T&gt;:</b> all properties optional. Use for PATCH operations. Deep partial requires custom implementation.",
              "<b>Pick&lt;T, K&gt;:</b> select subset of properties. Omit&lt;T, K&gt; removes properties. Useful for DTOs.",
              "<b>Record&lt;K, T&gt;:</b> object with keys K and values T. Better than index signature with explicit key types.",
              "<b>Extract&lt;T, U&gt; and Exclude&lt;T, U&gt;:</b> set operations on union types. Extract matching, exclude matching."
            ]
          },
          { heading:"Variance in TypeScript",
            items:[
              "<b>Covariance:</b> Array&lt;Dog&gt; is Array&lt;Animal&gt; — subtype → supertype. Safe for read-only access.",
              "<b>Contravariance:</b> callback(Animal) is callback(Dog) — function accepts wider types. Function parameters are contravariant.",
              "<b>Invariance:</b> Array&lt;Dog&gt; is NOT Array&lt;Animal&gt; — mutations would break type safety. Mutable containers are invariant.",
              "<b>in operator and keyof:</b> obj[keyof obj] is union of all value types. obj[0] is T extends array ? never : T."
            ]
          }
        ],
        traps:[
          "Readonly doesn't prevent mutation in nested objects — needs deep readonly helper",
          "Array assignment variance breaks at runtime — TypeScript only catches read-only violations at compile",
          "Record&lt;K, T&gt; with K = string is too wide — narrow to specific keys or use 'as const' for literal types"
        ],
        checkpoint:[
          "Implement DeepPartial&lt;T&gt; that makes nested properties optional.",
          "What is the difference between Pick and Omit? When do you use each?",
          "Explain covariance vs contravariance in TypeScript with examples."
        ]
      },
      {
        level:"Intermediate", time:"40 min",
        sections:[
          { heading:"Conditional Types + infer",
            items:[
              "<b>infer keyword:</b> T extends (...args: any) => infer R ? R : never. Extract return type, parameter types, element type.",
              "<b>Distributive conditional types:</b> T extends U ? X : Y distributes over union. Wrap in [] to prevent distribution.",
              "<b>Exclude vs Omit:</b> Exclude removes from union. Omit removes property keys then remaps. Exclude 'a'|'b'|'c' = 'b'|'c'.",
              "<b>Template literal types:</b> `Hello ${Capitalize&lt;Lowercase&lt;T&gt;&gt;}` - string manipulation at type level. Uppercase, Lowercase, Capitalize, Uncapitalize.",
              "<b>Recursive types:</b> Tree&lt;T&gt; = { value: T; children: Tree&lt;T&gt;[] }. Natural for data structures, risky for deeply nested."
            ]
          },
          { heading:"Mapped Types + Key Remapping",
            items:[
              "<b>Key remapping (TS 4.1+):</b> type Getters&lt;T&gt; = { [K in keyof T as `get${Capitalize&lt;string & K&gt;`]: () => T[K] }.",
              "<b>Conditional modifiers:</b> Remove readonly/optional with - modifier. Add with + modifier.",
              "<b>Filtering keys:</b> { [K in keyof T as T[K] extends Function ? K : never]: T[K] } - extract method keys only.",
              "<b>Generic constraints:</b> &lt;T extends Record&lt;string, any&gt;&gt; ensures object type. &lt;T extends { id: string }&gt; for specific shape."
            ]
          }
        ],
        traps:[
          "Conditional types distribute over unions by default — wrap in [] to prevent unwanted behavior",
          "Key remapping with Capitalize requires string & K to avoid union keys",
          "Recursive types hit infinite expansion limit — add depth constraint with conditional type"
        ],
        checkpoint:[
          "Write a mapped type that converts all properties to functions returning that type.",
          "Implement a type that extracts function names from an object type.",
          "What does 'distributive conditional types' mean? Give an example."
        ]
      },
      {
        level:"Advanced", time:"30 min",
        sections:[
          { heading:"Type Branding + Nominal Typing",
            items:[
              "<b>Branding pattern:</b> type USD = number & { _brand: 'USD' }. Brand prevents accidental interchange of similar types.",
              "<b>Nominal typing:</b> class implements Brand&lt;'Email'&gt;. Runtime check + compile-time uniqueness.",
              "<b>Type predicates:</b> function isDog(x: Animal | Dog): x is Dog { return 'bark' in x; }. Narrow union in if blocks.",
              "<b>User-defined type guards:</b> 'pet is Fish'. Guard string for 'Fish' | 'Bird'. Less common but valid.",
              "<b>Polymorphic this:</b> class Chain { chain(): this { return this; } }. Fluent API preserves exact type."
            ]
          },
          { heading:"Template Literal Types",
            items:[
              "<b>String pattern matching:</b> `Query${string | number}` - prefix + any string/number. `user.${'id'|'name'}` for specific patterns.",
              "<b>Dynamic route types:</b> '/users/:id' → extract ID param. Combine with keyof for route parameter safety.",
              "<b>SQL query typing:</b> template literals for query strings with interpolated parameters. Runtime validation still needed.",
              "<b>CSS-in-TS:</b> template literals for class names with style property validation. clsx typed with CSS properties."
            ]
          }
        ],
        traps:[
          "Branding is erased at runtime — still need runtime validation for external data",
          "Template literal types hit recursion limit with complex patterns",
          "Polymorphic this doesn't work with arrow methods — loses 'this' binding"
        ],
        checkpoint:[
          "Design a branded type for Email that prevents passing raw strings to functions expecting Email.",
          "How do you use template literal types to create a type-safe SQL query builder?",
          "What is 'in' keyword used for in type guards and lookups?"
        ]
      }
   ],
   grill:`You are a Senior TypeScript Engineer interviewing a candidate.\n\nTOPIC: TypeScript Advanced Type System (Block 64)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Type system puzzles, conditional type challenges, branding patterns. 'Design a type-safe builder', 'why won't this type constraint work', 'branding for safety'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN.`
   }
]; // end BLOCKS_PART4
