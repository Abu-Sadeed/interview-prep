// ============================================================
// INTERVIEW PREP SYLLABUS — DATA PART 2 (Blocks 14–27)
// Covers: Spring Ecosystem continued (14-19) + DB/Cache (20-25) + Messaging (26-27)
// ============================================================

globalThis.BLOCKS_PART2 = [

{
  id: 14, phase: "Spring Ecosystem", chip: "spring", freq: "med",
  title: "Spring Data JPA — Advanced",
  subtitle: "Optimistic/pessimistic locking, @Version, auditing, batch operations, second-level cache",
  prereqs: [13],
  tiers: [
    {
      level: "Beginner",
      time: "35 min",
      sections: [
        {
          heading: "Optimistic Locking",
          items: [
            "<b>Problem — lost update:</b> two users read same record, both modify, last write wins — first user's change lost.",
            "<b>@Version field:</b> int, long, or Timestamp. Hibernate adds WHERE version=? to UPDATE. If 0 rows updated (someone else updated) → OptimisticLockException.",
            "<b>Retry:</b> catch OptimisticLockException, re-read, re-apply change, retry. Handle at service layer.",
            "<b>Good for:</b> low-contention scenarios. Web forms where multiple users rarely edit same record simultaneously."
          ]
        },
        {
          heading: "Pessimistic Locking",
          items: [
            "<b>@Lock(LockModeType.PESSIMISTIC_WRITE):</b> SELECT ... FOR UPDATE. Others blocked until lock released.",
            "<b>PESSIMISTIC_READ:</b> shared lock — others can read but not write.",
            "<b>Good for:</b> high-contention, financial transactions, inventory — must prevent double-booking.",
            "<b>Downside:</b> reduces concurrency, deadlock risk if multiple resources locked in different order."
          ]
        }
      ],
      traps: [
        "OptimisticLockException is thrown on transaction commit, not on the update call",
        "Pessimistic lock without timeout — thread waits indefinitely if lock holder dies",
        "@Version field must NEVER be set manually — Hibernate manages it exclusively"
      ],
      checkpoint: [
        "What is the lost update problem and how does @Version solve it?",
        "When would you choose pessimistic locking over optimistic locking?",
        "Where in the code is OptimisticLockException thrown?"
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "Auditing",
          items: [
            "<code>@EnableJpaAuditing</code> on @Configuration. <code>@EntityListeners(AuditingEntityListener.class)</code> on entity.",
            "<code>@CreatedDate, @LastModifiedDate</code> — auto timestamps. <code>@CreatedBy, @LastModifiedBy</code> — auto user.",
            "<b>AuditorAware&lt;T&gt; bean:</b> provides current user (from SecurityContext for Spring Security).",
            "<b>@MappedSuperclass:</b> put audit fields in base class. All entities extend it.",
            "<b>Hibernate Envers:</b> full audit trail in _AUD tables. Query historical state. Heavier but complete."
          ]
        },
        {
          heading: "Batch Operations",
          items: [
            "<b>saveAll() is NOT bulk insert by default.</b> Delegates to save() in a loop — N individual INSERTs.",
            "<b>True batch insert config:</b> spring.jpa.properties.hibernate.jdbc.batch_size=50 + order_inserts=true + order_updates=true. Also requires SEQUENCE id generation.",
            "<b>Bulk @Modifying update:</b> <code>@Query('UPDATE User u SET u.active=false WHERE u.lastLogin &lt; :date') @Modifying @Transactional</code>. Bypasses entity lifecycle — fast.",
            "<b>EntityManager.flush() + clear():</b> during large batch processing to prevent OutOfMemoryError. Flush writes to DB, clear releases from persistence context."
          ]
        }
      ],
      traps: [
        "saveAll() without batch_size config = N individual inserts — configure Hibernate batch properties",
        "Bulk @Modifying queries bypass persistence context — stale entities remain until EntityManager.clear()",
        "@CreatedBy requires AuditorAware bean — if not configured, field stays null with no error thrown"
      ],
      checkpoint: [
        "What configuration is required for Hibernate to actually batch inserts?",
        "I have 10,000 users to deactivate. What's wrong with loading them all and calling save() in a loop? What's better?",
        "How does @EnableJpaAuditing know who the current user is?"
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "Second-Level Cache + OSIV",
          items: [
            "<b>First-level cache:</b> persistence context (EntityManager). Scoped to one transaction. Automatic.",
            "<b>Second-level cache:</b> cross-session, shared. Requires config: @Cache(usage=CacheConcurrencyStrategy.READ_WRITE) + hibernate.cache.use_second_level_cache=true.",
            "<b>When to use:</b> reference data that rarely changes (countries, categories, config). Never for frequently updated entities.",
            "<b>OSIV (Open Session in View):</b> keeps persistence context open for entire HTTP request including view rendering. Spring Boot enables by default. Anti-pattern — causes hidden N+1 in templates/serialisers.",
            "<b>Disable OSIV:</b> spring.jpa.open-in-view=false. Load all data in service layer within transaction."
          ]
        }
      ],
      traps: [
        "OSIV causes N+1 in view/serialisation layer — always disable with spring.jpa.open-in-view=false in production",
        "Second-level cache with READ_WRITE needs careful invalidation — stale after bulk updates",
        "Query cache invalidated by any change to involved tables — near-zero hit rate in write-heavy apps"
      ],
      checkpoint: [
        "What is OSIV and why should it be disabled in production?",
        "When would you use second-level cache and when would you not?",
        "How do you process 1 million entities in a batch without running out of memory in Hibernate?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Spring Data JPA candidate.\n\nTOPIC: JPA Advanced — Locking, Batch, Caching (Block 14)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production incidents — 'your service has a lost update bug under concurrent load, diagnose it', 'batch job takes 6 hours, how do you fix it', 'OSIV causing N+1 in your JSON serialiser'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 15, phase: "Spring Ecosystem", chip: "spring", freq: "high",
  title: "Spring Boot — @Transactional Deep Dive",
  subtitle: "Proxy internals, propagation levels, isolation, self-invocation trap, rollback rules, async+transactional",
  prereqs: [9, 14],
  tiers: [
    {
      level: "Beginner",
      time: "35 min",
      sections: [
        {
          heading: "How @Transactional Works",
          items: [
            "<b>@Transactional is AOP proxy-based.</b> Spring wraps your bean in a proxy. The proxy intercepts method calls, begins transaction, calls your method, commits or rolls back.",
            "<b>Self-invocation trap:</b> <code>this.myTransactionalMethod()</code> from within the same bean calls the real method directly — bypasses the proxy. Transaction does NOT start.",
            "<b>@Transactional on private methods:</b> no effect — proxy cannot intercept private methods.",
            "<b>Default rollback rule:</b> rolls back on RuntimeException (unchecked). Does NOT roll back on checked exceptions. Override: <code>rollbackFor=Exception.class</code>."
          ]
        },
        {
          heading: "Propagation Basics",
          items: [
            "<b>REQUIRED (default):</b> join existing transaction if present, else create new.",
            "<b>REQUIRES_NEW:</b> always create new transaction. Suspend existing. Commits independently — even if outer rolls back.",
            "<b>SUPPORTS:</b> join if present, non-transactional if not.",
            "<b>MANDATORY:</b> must have existing transaction, throw if none.",
            "<b>NEVER:</b> must NOT have transaction, throw if one exists.",
            "<b>NOT_SUPPORTED:</b> always run non-transactional, suspend existing."
          ]
        }
      ],
      traps: [
        "Self-invocation bypasses proxy — @Transactional on method called from same class has no effect",
        "Default rollback only on RuntimeException — checked exceptions silently commit",
        "@Transactional on private method has no effect — proxy cannot intercept private methods"
      ],
      checkpoint: [
        "Why doesn't @Transactional work when you call a transactional method from within the same class?",
        "What is the default rollback rule and how do you change it?",
        "What does REQUIRES_NEW do differently from REQUIRED?"
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "Isolation Levels",
          items: [
            "<b>READ_UNCOMMITTED:</b> can read uncommitted data (dirty reads). Almost never use.",
            "<b>READ_COMMITTED (Postgres default):</b> only read committed data. Prevents dirty reads. Allows non-repeatable reads.",
            "<b>REPEATABLE_READ:</b> same query returns same rows within transaction. Prevents non-repeatable reads. Allows phantoms.",
            "<b>SERIALIZABLE:</b> full isolation. Slowest. Prevents all anomalies.",
            "<b>For most apps:</b> READ_COMMITTED is sufficient. Use higher only when you have proven anomalies."
          ]
        },
        {
          heading: "Read-Only Transactions",
          items: [
            "<b>@Transactional(readOnly=true):</b> Hibernate skips dirty checking. Performance benefit for read operations.",
            "<b>Postgres benefit:</b> read-only transactions can route to read replicas.",
            "<b>Does NOT prevent writes</b> — you can still call save(). It just disables dirty checking optimisation.",
            "<b>Always annotate read service methods</b> with readOnly=true."
          ]
        }
      ],
      traps: [
        "@Transactional(readOnly=true) does NOT prevent writes — only disables dirty checking",
        "SERIALIZABLE dramatically reduces throughput — measure before applying",
        "READ_COMMITTED allows non-repeatable reads — if business logic reads same row twice expecting consistency, use REPEATABLE_READ"
      ],
      checkpoint: [
        "What anomalies does READ_COMMITTED prevent? Which does it NOT prevent?",
        "What exactly does @Transactional(readOnly=true) optimise?",
        "I have REQUIRES_NEW inner method. Outer transaction rolls back. What happens to the inner?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "Transaction Events + Async",
          items: [
            "<b>@TransactionalEventListener:</b> fires AFTER transaction commits. Guarantees data is visible before event handled. AFTER_COMMIT (default), BEFORE_COMMIT, AFTER_ROLLBACK.",
            "<b>Why after commit:</b> event fired during transaction might read data before it's committed.",
            "<b>@Async + @Transactional:</b> async method runs in a different thread with no transaction context from caller. New transaction created with REQUIRED propagation. Completely independent.",
            "<b>If @Async method throws:</b> caller's transaction is unaffected — different thread, different transaction."
          ]
        },
        {
          heading: "Distributed Transactions",
          items: [
            "<b>XA/JTA:</b> two-phase commit across multiple resources. Coordinator is SPOF. Blocking protocol. Operationally complex.",
            "<b>Why avoid XA:</b> network partitions cause heuristic failures. Blocking = availability risk.",
            "<b>Alternatives:</b> Outbox pattern (same DB transaction for data + event). Saga for business-level compensation.",
            "<b>Best-effort 1PC:</b> accept eventual consistency. Design for idempotency and compensating transactions."
          ]
        }
      ],
      traps: [
        "@TransactionalEventListener AFTER_COMMIT — if listener throws, transaction already committed, no rollback possible",
        "@Async + @Transactional: caller's transaction context NOT propagated to async method — new independent transaction",
        "XA/JTA distributed transactions — blocking 2PC means single resource failure blocks coordinator"
      ],
      checkpoint: [
        "What is @TransactionalEventListener and why is it safer than ApplicationEventPublisher inside a transaction?",
        "I write to DB and publish Kafka message in same @Transactional method. What race condition exists and how do you fix it?",
        "What happens when @Async + @Transactional are combined on the same method?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Spring Boot candidate.\n\nTOPIC: @Transactional Deep Dive (Block 15)\n\nYOUR ROLE: Reactive Socratic interviewer. Trap-rich topic.\n\nAPPROACH: Code review scenarios ('what's wrong with this code'), design questions ('implement audit logging that must always commit'), and theory probes.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 16, phase: "Spring Ecosystem", chip: "spring", freq: "high",
  title: "Spring Boot — Security",
  subtitle: "Filter chain, JWT flow, OAuth2 flows, @PreAuthorize, CORS, CSRF configuration",
  prereqs: [9],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Security Filter Chain",
          items: [
            "<b>Spring Security = chain of servlet filters.</b> Every HTTP request passes through all configured filters in order.",
            "<b>Key filters:</b> UsernamePasswordAuthenticationFilter (form login), BasicAuthenticationFilter, BearerTokenAuthenticationFilter (JWT/OAuth2).",
            "<b>AuthenticationManager → AuthenticationProvider → UserDetailsService.</b> Standard delegation chain.",
            "<b>SecurityContextHolder:</b> stores Authentication for current thread. ThreadLocal-based. Cleared after request."
          ]
        },
        {
          heading: "JWT Authentication Flow",
          items: [
            "<b>Login:</b> credentials → AuthenticationManager → generate JWT → return token.",
            "<b>Subsequent requests:</b> JWT in Authorization: Bearer header → custom filter extracts → validates signature + expiry → creates UsernamePasswordAuthenticationToken → sets in SecurityContextHolder.",
            "<b>Custom JWT filter:</b> extend OncePerRequestFilter. Extract token, validate, create authentication, set in SecurityContextHolder.",
            "<b>JWT claims:</b> sub (user id), iat (issued at), exp (expiry in seconds). Sign with secret (HS256) or private key (RS256)."
          ]
        }
      ],
      traps: [
        "JWT filter must run BEFORE UsernamePasswordAuthenticationFilter — wrong order fails authentication",
        "SecurityContextHolder is ThreadLocal — @Async methods lose security context, must propagate explicitly",
        "JWT exp claim is in SECONDS not milliseconds — off-by-1000x is a common bug"
      ],
      checkpoint: [
        "Walk me through the complete Spring Security filter chain for a JWT-authenticated request.",
        "What is SecurityContextHolder and why is it cleared after each request?",
        "What happens if your JWT filter runs AFTER the default authentication filter?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "OAuth2 Flows",
          items: [
            "<b>Authorization Code Flow:</b> user → app → auth server (login) → redirect with code → app exchanges code for token. For user-facing apps. Token never exposed to browser.",
            "<b>Client Credentials Flow:</b> service-to-service. No user. App sends client_id + client_secret → access token. For M2M auth.",
            "<b>PKCE:</b> code_verifier (random) + code_challenge (SHA256 hash). Auth server verifies on token exchange. Prevents code interception. Required for SPAs/mobile.",
            "<b>Spring Security OAuth2 Resource Server:</b> validates JWT from auth server. http.oauth2ResourceServer(oauth2 -&gt; oauth2.jwt(...))"
          ]
        },
        {
          heading: "Authorization",
          items: [
            "<code>@PreAuthorize(\"hasRole('ADMIN')\")</code> — method security. SpEL evaluated before method runs.",
            "<code>@PostAuthorize(\"returnObject.userId == authentication.name\")</code> — check after method returns.",
            "<b>Requires @EnableMethodSecurity (Spring 6+).</b>",
            "<b>hasAuthority vs hasRole:</b> hasRole automatically prepends 'ROLE_'. hasAuthority checks exact string.",
            "<b>@PreAuthorize self-invocation trap:</b> same as @Transactional — calling from same class bypasses proxy."
          ]
        }
      ],
      traps: [
        "hasRole('ADMIN') checks for 'ROLE_ADMIN' — authority must include ROLE_ prefix",
        "@PreAuthorize self-invocation bypasses proxy — same issue as @Transactional",
        "OAuth2 Authorization Code without PKCE vulnerable to code interception for public clients"
      ],
      checkpoint: [
        "What is the difference between Authorization Code flow and Client Credentials? When do you use each?",
        "What is PKCE and why is it needed for SPAs?",
        "hasRole('ADMIN') vs hasAuthority('ADMIN') — what's different?"
      ]
    },
    {
      level: "Advanced",
      time: "40 min",
      sections: [
        {
          heading: "CORS + CSRF",
          items: [
            "<b>CORS:</b> browser security. Prevents JS from making requests to different origin. Spring handles with CorsConfigurationSource.",
            "<b>CSRF:</b> attacker tricks browser into state-changing request using victim's cookies. Mitigated with CSRF token or SameSite cookie.",
            "<b>CSRF for REST APIs with JWT:</b> disable CSRF. JWTs are not sent automatically by browser — CSRF doesn't apply to token-based auth.",
            "<b>Enable CSRF for session-based web apps.</b> SameSite=Strict is an alternative mitigation."
          ]
        },
        {
          heading: "Security Hardening",
          items: [
            "<b>BCryptPasswordEncoder:</b> adaptive cost factor. Never MD5/SHA1. Increase cost factor over time as hardware improves.",
            "<b>JWT secret rotation:</b> use RS256 (key pair) not HS256 (shared secret). Publish JWKS endpoint. Resource servers fetch public key dynamically.",
            "<b>Rate limiting auth endpoints:</b> limit login attempts. Redis-backed attempt counter.",
            "<b>Security headers:</b> X-Content-Type-Options, X-XSS-Protection, X-Frame-Options, HSTS — Spring Security adds defaults."
          ]
        }
      ],
      traps: [
        "Disabling CSRF but still using session cookies = CSRF vulnerability remains",
        "allowedOrigins('*') + allowCredentials(true) is invalid — credentials require specific origin",
        "BCrypt work factor should be increased over time — benchmark on your hardware periodically"
      ],
      checkpoint: [
        "When should you disable CSRF protection in Spring Security?",
        "What is the vulnerability in using HS256 for JWT signing vs RS256?",
        "Walk me through implementing rate limiting on the login endpoint."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Spring Boot candidate on security.\n\nTOPIC: Spring Boot Security (Block 16)\n\nYOUR ROLE: Reactive Socratic interviewer. High-stakes topic.\n\nAPPROACH: Test security thinking, not just configuration knowledge. Show code or system designs with vulnerabilities — ask to identify and fix. Mix attack scenarios with defensive design.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 17, phase: "Spring Ecosystem", chip: "spring", freq: "med",
  title: "Spring Boot — Production Patterns",
  subtitle: "Actuator, circuit breakers, @Async, AOP internals, profiles, config management",
  prereqs: [9],
  tiers: [
    {
      level: "Beginner",
      time: "35 min",
      sections: [
        {
          heading: "Actuator",
          items: [
            "<b>Spring Boot Actuator:</b> production-ready monitoring endpoints built in.",
            "<b>Key endpoints:</b> /actuator/health, /actuator/metrics, /actuator/env, /actuator/loggers (change log levels at runtime), /actuator/threaddump, /actuator/heapdump.",
            "<b>Security:</b> expose only /health publicly. Secure all others behind auth or restrict to internal network.",
            "<b>Custom HealthIndicator:</b> implement bean, return Health.up() or Health.down(withDetail(...)).",
            "<b>Kubernetes:</b> /health/liveness (app alive?) and /health/readiness (can accept traffic?) — configure separately in Spring Boot 2.3+."
          ]
        },
        {
          heading: "Profiles + Configuration",
          items: [
            "<b>application-{profile}.yml overrides application.yml.</b> Activate via SPRING_PROFILES_ACTIVE env var.",
            "<b>@Profile('prod') on @Bean:</b> only active when that profile is active.",
            "<b>@Value:</b> inject single property. <code>@Value('${server.port:8080}')</code> with default.",
            "<b>@ConfigurationProperties:</b> bind entire config prefix to POJO. Type-safe, IDE completion, validation. Prefer over @Value for groups of related config."
          ]
        }
      ],
      traps: [
        "Not securing actuator endpoints exposes internal system information and configuration",
        "@Value injection into static fields doesn't work — Spring can't inject into static context",
        "application-prod.yml properties override application.yml — don't duplicate, only override what differs"
      ],
      checkpoint: [
        "What is the difference between /health/liveness and /health/readiness for Kubernetes?",
        "Why prefer @ConfigurationProperties over @Value?",
        "How do you change the log level of a specific package at runtime without restarting?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Circuit Breakers — Resilience4j",
          items: [
            "<b>States:</b> CLOSED (normal) → OPEN (failing, rejects calls) → HALF_OPEN (test probe) → CLOSED.",
            "<b>@CircuitBreaker(name='svc', fallbackMethod='fallback'):</b> fallback must have same signature + Throwable param.",
            "<b>Sliding window:</b> count-based or time-based. Opens when failure rate exceeds threshold.",
            "<b>@Retry with exponential backoff + jitter:</b> prevents thundering herd on recovery.",
            "<b>Bulkhead:</b> limit concurrent calls to service. Prevents one slow dependency from exhausting all threads."
          ]
        },
        {
          heading: "@Async + CompletableFuture",
          items: [
            "<b>@Async:</b> Spring proxy runs method on thread pool. Must return void, Future, or CompletableFuture.",
            "<b>Self-invocation trap:</b> same as @Transactional — calling from same class runs synchronously.",
            "<b>Always configure custom ThreadPoolTaskExecutor</b> with bounded queue. Default SimpleAsyncTaskExecutor creates new thread per task — production disaster.",
            "<b>CompletableFuture:</b> thenApply (sync transform), thenApplyAsync (async), thenCombine (merge two), allOf (wait all), anyOf (first completes).",
            "<b>Exception in @Async void:</b> use AsyncUncaughtExceptionHandler. In CompletableFuture — .exceptionally() or .handle()."
          ]
        }
      ],
      traps: [
        "@Async self-invocation runs synchronously — same proxy bypass issue as @Transactional",
        "Not configuring custom executor for @Async can create unbounded threads under load",
        "CircuitBreaker fallback wrong signature means fallback is never called — silent failure"
      ],
      checkpoint: [
        "What is the bulkhead pattern and when do you use it?",
        "Walk me through configuring a proper ThreadPoolTaskExecutor for @Async methods.",
        "My circuit breaker is not opening even though 60% of requests are failing. What are the likely causes?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "AOP Deep Dive",
          items: [
            "<b>@Around is most powerful:</b> controls whether original method runs via ProceedingJoinPoint.proceed(). Used by @Transactional, @Cacheable, @CircuitBreaker.",
            "<b>Pointcut expressions:</b> execution(* com.example.service.*.*(..)) — all service methods. @annotation(Transactional) — annotated methods.",
            "<b>Proxy limitations:</b> final classes/methods can't be proxied by CGLIB. Private methods can't be advised. Self-invocation bypasses proxy.",
            "<b>Custom annotation with AOP:</b> @interface + @Aspect + @Around pointing to annotation. Clean cross-cutting concern implementation."
          ]
        }
      ],
      traps: [
        "@Around must call proceed() or the original method never runs — silent no-op",
        "@Cacheable + @Transactional on same method — cache check happens before transaction opens",
        "AOP on final classes throws BeanCreationException — must use interface-based proxy"
      ],
      checkpoint: [
        "Write a custom @ExecutionTime annotation that logs method execution time. Describe the aspect implementation.",
        "What is the order of Spring AOP aspects and how do you control it?",
        "@Cacheable + @Transactional on same method — in what order do they execute?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Spring Boot candidate.\n\nTOPIC: Spring Boot Production Patterns (Block 17)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production scenarios only — 'circuit breaker isn't opening', 'async jobs silently failing', 'add rate limiting without changing controllers', 'service taking down entire JVM when downstream is slow'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
   id: 18, phase: "JS Backend", chip: "nestjs", freq: "med",
   title: "NestJS — Core Internals",
   subtitle: "DI container, module system, provider scopes, request pipeline order, custom providers",
   prereqs: [5],
  tiers: [
    {
      level: "Beginner",
      time: "35 min",
      sections: [
        {
          heading: "Module System",
          items: [
            "<b>NestJS app = tree of modules.</b> Root AppModule at top. Feature modules imported as needed.",
            "<b>@Module:</b> imports (other modules), providers (services, guards etc.), controllers, exports (what this module exposes to importers).",
            "<b>Encapsulation:</b> providers are module-private by default. Must be in exports array to be injectable in other modules.",
            "<b>@Global():</b> module available everywhere without explicit import. Use sparingly — breaks encapsulation.",
            "<b>Feature module pattern:</b> UserModule with UserController, UserService, UserRepository. Self-contained."
          ]
        },
        {
          heading: "Dependency Injection",
          items: [
            "<b>@Injectable():</b> marks class as injectable provider.",
            "<b>Constructor injection:</b> TypeScript metadata drives DI. Types in constructor = what to inject.",
            "<b>Custom providers:</b> useValue (static/mock), useFactory (factory function, can be async), useClass (swap implementation), useExisting (alias).",
            "<b>Async providers with useFactory:</b> return a Promise. NestJS waits for resolution before injecting. For DB connections, config loading."
          ]
        }
      ],
      traps: [
        "Provider not in exports array = not injectable in other modules — silent 'cannot resolve dependency' error at startup",
        "@Global() breaks encapsulation — use only for truly cross-cutting concerns (config, logger)",
        "Circular dependency causes 'Nest cannot resolve dependencies' at startup — use forwardRef()"
      ],
      checkpoint: [
        "What is the difference between providers and exports in a NestJS module?",
        "How do you share a service between two separate modules?",
        "When would you use useFactory vs useClass in a custom provider?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Request Pipeline Order",
          items: [
            "<b>Execution order:</b> Middleware → Guards → Interceptors (pre) → Pipes → Route Handler → Interceptors (post) → Exception Filters.",
            "<b>Middleware:</b> Express/Fastify middleware. Access to req/res/next. Logging, token extraction.",
            "<b>Guards:</b> return boolean. false → 403 ForbiddenException. Runs BEFORE interceptors. For auth/authorization.",
            "<b>Interceptors:</b> wrap handler. Before AND after. Observable-based (RxJS). Transform responses, logging, timeout.",
            "<b>Pipes:</b> transform + validate. ValidationPipe uses class-validator.",
            "<b>Exception Filters:</b> catch unhandled exceptions. Transform to HTTP response."
          ]
        },
        {
          heading: "Provider Scopes",
          items: [
            "<b>DEFAULT (singleton):</b> one instance per application. Shared. Default.",
            "<b>REQUEST:</b> new instance per HTTP request. Fresh context per request. Expensive — new DI tree per request.",
            "<b>TRANSIENT:</b> new instance per injection point.",
            "<b>Scope propagation:</b> if singleton injects REQUEST-scoped provider → the singleton BECOMES request-scoped. Scope bubbles up the tree."
          ]
        }
      ],
      traps: [
        "Guard returning false throws ForbiddenException (403) not UnauthorizedException (401) — use specific exceptions",
        "REQUEST scope propagation makes all dependents request-scoped — accidentally makes services expensive",
        "Pipes throw ValidationException by default — override with custom filter for custom error format"
      ],
      checkpoint: [
        "A request comes in. Walk me through the complete NestJS pipeline in order.",
        "What is scope propagation? If REQUEST-scoped service is injected into singleton — what happens?",
        "Where in the pipeline do you handle JWT validation vs authorization?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "Advanced DI + Dynamic Modules",
          items: [
            "<b>forwardRef():</b> resolve circular dependency. <code>@Inject(forwardRef(() =&gt; ServiceB))</code>. Circular deps are a code smell — consider merging modules.",
            "<b>Dynamic modules:</b> static forRoot(options): DynamicModule / forRootAsync(options). Used by @nestjs/config, TypeORM, Mongoose. Returns module definition configured by options.",
            "<b>register() vs forRoot():</b> register() = feature use (multiple instances). forRoot() = global singleton (once at app level).",
            "<b>Interceptors with RxJS:</b> next.handle() returns Observable. tap() for side effects. map() for response transformation. timeout() for request timeout."
          ]
        }
      ],
      traps: [
        "forwardRef circular dependency is a code smell — if you need it, consider whether modules should be merged",
        "Dynamic module forRootAsync must handle async config — incorrect async factory causes silent failure",
        "RxJS operators in interceptors run per request — expensive operators can cause request storms"
      ],
      checkpoint: [
        "How do you create a dynamic module that accepts database connection options?",
        "Write a NestJS interceptor that transforms all responses to {data: ..., status: 'success', timestamp: ...}.",
        "What causes circular dependency in NestJS and how does forwardRef() resolve it?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a NestJS candidate.\n\nTOPIC: NestJS Core Internals (Block 18)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Module design decisions, pipeline understanding, scope awareness. Scenarios: 'build auth using guards and interceptors', 'why is this service creating new instance every request', 'should this be guard or middleware'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
   id: 19, phase: "JS Backend", chip: "nestjs", freq: "med",
   title: "NestJS — Advanced Patterns",
   subtitle: "Dynamic modules, TypeORM integration, custom decorators, microservices, performance",
   prereqs: [18],
  tiers: [
    {
      level: "Beginner",
      time: "30 min",
      sections: [
        {
          heading: "TypeORM Integration",
          items: [
            "<b>TypeOrmModule.forRoot():</b> global DB connection config.",
            "<b>TypeOrmModule.forFeature([Entity]):</b> register entities per feature module.",
            "<b>@InjectRepository(User):</b> injects TypeORM repository. Use in service for CRUD.",
            "<b>Migrations:</b> TypeORM CLI generates migrations. NEVER use synchronize:true in production — drops/creates columns on entity changes.",
            "<b>Same concepts as JPA:</b> @Entity, @Column, @PrimaryGeneratedColumn, @OneToMany etc."
          ]
        }
      ],
      traps: [
        "synchronize:true in TypeORM production config can drop columns — always use migrations",
        "@InjectRepository requires entity registered in TypeOrmModule.forFeature() in SAME module",
        "TypeOrmModule.forFeature() in wrong module = 'no repository for entity' error"
      ],
      checkpoint: [
        "What is the difference between TypeOrmModule.forRoot() and forFeature()?",
        "Why is synchronize:true dangerous in production?",
        "How do you share a TypeORM repository between two modules?"
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "Custom Decorators",
          items: [
            "<b>Parameter decorators:</b> <code>createParamDecorator((data, ctx) =&gt; ctx.switchToHttp().getRequest().user)</code>. Clean request data extraction.",
            "<b>@CurrentUser():</b> extract user from JWT-populated request. Clean alternative to @Req() everywhere.",
            "<b>applyDecorators():</b> compose multiple decorators. @ApiAuth() = @UseGuards(JwtGuard) + @ApiBearerAuth() + @ApiUnauthorizedResponse().",
            "<b>@SetMetadata + Reflector:</b> store metadata on handler/class, read in Guard. Role-based access control pattern."
          ]
        },
        {
          heading: "Performance",
          items: [
            "<b>Fastify adapter:</b> 2-3x faster than Express for high-throughput. FastifyAdapter drop-in. Some Express middleware incompatible.",
            "<b>NODE_ENV=production:</b> enables NestJS optimisations.",
            "<b>Compression middleware:</b> compress responses. Less critical for gRPC.",
            "<b>CPU-bound tasks:</b> Worker Threads or offload to separate service. Never block event loop."
          ]
        }
      ],
      traps: [
        "Custom parameter decorators don't work with WS/RPC contexts without switching context type",
        "applyDecorators() order matters — decorators applied bottom-up",
        "Fastify adapter incompatibility with Express-specific middleware — test all middleware before switching"
      ],
      checkpoint: [
        "Build a @Roles('admin') decorator system with a Guard that checks roles from JWT.",
        "What is the performance difference between Express and Fastify adapters? Why?",
        "How do you create @CurrentUser() decorator that extracts user from JWT-populated request?"
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "NestJS Microservices",
          items: [
            "<b>@nestjs/microservices:</b> built-in support. Transporters: TCP, Redis, NATS, Kafka, gRPC, RabbitMQ.",
            "<b>@MessagePattern('user.created'):</b> request-reply handler. @EventPattern: fire-and-forget event handler.",
            "<b>ClientProxy:</b> send messages to other microservices. send() returns Observable. emit() is fire-and-forget.",
            "<b>Hybrid app:</b> HTTP + microservice in same app. Handle both HTTP requests and microservice messages."
          ]
        }
      ],
      traps: [
        "ClientProxy.send() returns Observable — must subscribe or convert to Promise, cannot just call",
        "@MessagePattern vs @EventPattern — send/reply vs fire-and-forget — wrong choice causes silent failures",
        "Microservice exceptions propagate back to caller as RPC error — handle correctly on both sides"
      ],
      checkpoint: [
        "What is the difference between @MessagePattern and @EventPattern?",
        "How do you make a hybrid NestJS app handling both HTTP and Kafka messages?",
        "ClientProxy.send() returns Observable — what happens if you don't subscribe to it?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a NestJS candidate.\n\nTOPIC: NestJS Advanced Patterns (Block 19)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Custom decorator design, microservice communication patterns, TypeORM integration gotchas.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

// ════════════════════════════════════════════════════════════
// PHASE 3 — DATABASE & CACHE
// ════════════════════════════════════════════════════════════

{
  id: 20, phase: "Database & Cache", chip: "db", freq: "high",
  title: "PostgreSQL — Data Types + Schema Design",
  subtitle: "int/bigint/UUID, varchar/text, JSONB, arrays, constraints, NULL semantics, normalization",
  prereqs: [],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Numeric + Text Types",
          items: [
            "<b>smallint (2B):</b> -32768 to 32767. Rare. <b>integer (4B):</b> ~2.1B. For most IDs. <b>bigint (8B):</b> for high-volume IDs, timestamps, counters.",
            "<b>GENERATED ALWAYS AS IDENTITY:</b> SQL standard auto-increment. Prefer over serial (legacy).",
            "<b>numeric(precision, scale):</b> exact decimal. For money. Slower than float.",
            "<b>varchar(n) vs text:</b> no performance difference in Postgres. Both use TOAST for long values. Use text unless you want DB-enforced length limit.",
            "<b>timestamptz (timestamp with time zone):</b> stores UTC, displays in session timezone. ALWAYS use over timestamp. Prevents timezone confusion."
          ]
        },
        {
          heading: "Constraints + NULL",
          items: [
            "<b>PRIMARY KEY:</b> unique + not null. Auto B-tree index.",
            "<b>FOREIGN KEY:</b> ON DELETE CASCADE / SET NULL / RESTRICT / NO ACTION.",
            "<b>UNIQUE constraint:</b> CREATE UNIQUE INDEX or inline UNIQUE. Can span multiple columns.",
            "<b>CHECK constraint:</b> CHECK(age &gt;= 0 AND age &lt; 150). Domain rules at DB level.",
            "<b>NULL semantics:</b> NULL = unknown. NULL != NULL. NULL comparisons return NULL. Use IS NULL / IS NOT NULL.",
            "<b>Multiple NULLs in UNIQUE column:</b> allowed in Postgres — NULLs are considered distinct."
          ]
        }
      ],
      traps: [
        "integer overflow at ~2.1B — high-traffic serial ID columns can overflow, use bigint from the start",
        "timestamp (no timezone) stores without TZ info — bugs when app/DB server timezones differ",
        "Multiple NULL values satisfy UNIQUE constraint — if you need at most one NULL, use partial unique index"
      ],
      checkpoint: [
        "Should you use integer or bigint for a user_id? What factors decide?",
        "What is the difference between timestamp and timestamptz? Which should you always use?",
        "When would you use numeric instead of double precision?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "UUID + JSONB",
          items: [
            "<b>UUID:</b> native Postgres type. gen_random_uuid() for v4. Good for distributed systems, no coordination needed.",
            "<b>UUID index fragmentation:</b> random UUIDs cause B-tree page splits → fragmentation → slower inserts. Use UUID v7 (time-ordered), ULID, or bigint for PK.",
            "<b>JSONB:</b> binary JSON. Supports GIN indexing, @&gt; (contains), ? (key exists), -&gt;&gt; (get field). ALWAYS use JSONB over JSON.",
            "<b>JSON vs JSONB:</b> JSON = raw text, no indexing, preserves key order. JSONB = binary, indexed, reordered keys."
          ]
        },
        {
          heading: "Advanced Schema",
          items: [
            "<b>Arrays:</b> native Postgres arrays. int[]. GIN indexing. @&gt; (contains), &amp;&amp; (overlap). For tags, permissions.",
            "<b>Postgres enums:</b> storage-efficient. Adding values easy, removing hard. Prefer varchar + CHECK for frequently changing lists.",
            "<b>Materialized view:</b> stored query result. REFRESH MATERIALIZED VIEW CONCURRENTLY (no lock). For expensive aggregations.",
            "<b>Generated columns (Postgres 12+):</b> GENERATED ALWAYS AS expression STORED. Indexed like regular columns."
          ]
        }
      ],
      traps: [
        "UUID v4 random IDs cause B-tree fragmentation at high insert rates — monitor table/index bloat",
        "REFRESH MATERIALIZED VIEW without CONCURRENTLY locks the view for reads — production outage risk",
        "Postgres enum removing values requires dump/restore — use CHECK constraints for frequently changing lists"
      ],
      checkpoint: [
        "What is the difference between JSON and JSONB? Why always use JSONB?",
        "Design a product catalog schema where products have different attributes per category. What types do you use?",
        "What is a materialized view and when do you use it?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "Normalization + Anti-Patterns",
          items: [
            "<b>1NF:</b> atomic columns. <b>2NF:</b> no partial dependencies. <b>3NF:</b> no transitive dependencies.",
            "<b>When to denormalize:</b> read-heavy queries with many joins. Computed summary columns. Materialized views.",
            "<b>EAV (Entity-Attribute-Value):</b> flexible schema anti-pattern. Terrible query performance, no type safety. Use JSONB instead.",
            "<b>Range types:</b> int4range, tsrange, daterange. Supports &amp;&amp; (overlap), @&gt; (containment). For scheduling, reservations, bookings with no-overlap constraints."
          ]
        }
      ],
      traps: [
        "EAV tables seem flexible but are a query performance nightmare — JSONB is almost always better",
        "Domain types enforce constraints at DML time only — easy to forget they exist during schema evolution",
        "Range type exclusion constraints require GiST index — btree index not sufficient"
      ],
      checkpoint: [
        "When would you use Postgres array type vs a separate junction table?",
        "Design a hotel reservation schema that prevents double-booking at DB level.",
        "What is wrong with EAV (Entity-Attribute-Value) pattern? What should you use instead?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: PostgreSQL Data Types + Schema Design (Block 20)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Schema design decisions — type choice correctness, performance implications, constraint thinking. 'Design this schema', 'what data type', 'what constraint prevents this bug'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 21, phase: "Database & Cache", chip: "db", freq: "high",
  title: "PostgreSQL — Query Engine + Indexing",
  subtitle: "MVCC, B-tree/GIN/BRIN, composite/partial indexes, EXPLAIN ANALYZE, query planner",
  prereqs: [20],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "How Postgres Reads Data",
          items: [
            "<b>Sequential scan:</b> reads all table pages. O(n). Preferred for small tables or when returning &gt;15-20% of rows.",
            "<b>Index scan:</b> B-tree lookup → heap fetch. Good for selective queries.",
            "<b>Index-only scan:</b> all needed columns in index. No heap access. Fastest.",
            "<b>Bitmap scan:</b> builds bitmap of matching pages, scans those. For medium-selectivity or OR conditions.",
            "<b>When Postgres ignores your index:</b> low selectivity, small table, stale statistics, wrong data type comparison."
          ]
        },
        {
          heading: "B-Tree Index",
          items: [
            "<b>Default type.</b> Supports: =, &lt;, &gt;, BETWEEN, IN, LIKE 'prefix%', ORDER BY.",
            "<b>LIKE '%suffix%' does NOT use B-tree</b> — only 'prefix%' works.",
            "<b>Function calls defeat index:</b> WHERE LOWER(email) = 'x' — won't use index on email. Create index on LOWER(email) instead.",
            "<b>Postgres does NOT auto-index foreign keys</b> — create them manually or FK lookups cause seq scans."
          ]
        }
      ],
      traps: [
        "Postgres doesn't auto-index FK columns — must create manually",
        "LIKE '%suffix%' doesn't use B-tree — only 'prefix%' works",
        "Function on indexed column defeats index: WHERE LOWER(col) uses index only if index is on LOWER(col)"
      ],
      checkpoint: [
        "I have a query with email = 'x'. There's an index on email. Why might Postgres still do a seq scan?",
        "What is an index-only scan and when does it happen?",
        "Should you always index a foreign key column? Why or why not?"
      ]
    },
    {
      level: "Intermediate",
      time: "50 min",
      sections: [
        {
          heading: "MVCC",
          items: [
            "<b>MVCC:</b> readers don't block writers, writers don't block readers.",
            "<b>Row versions:</b> xmin (creating transaction) and xmax (deleting transaction). Your transaction sees rows where xmin ≤ your txid AND xmax is null or future.",
            "<b>Dead tuples:</b> old row versions no longer visible. VACUUM reclaims space.",
            "<b>READ_COMMITTED:</b> new snapshot per statement. <b>REPEATABLE_READ:</b> snapshot at transaction start."
          ]
        },
        {
          heading: "Advanced Index Types",
          items: [
            "<b>GIN:</b> full-text search, JSONB, arrays. Inverted index. Faster reads, slower writes.",
            "<b>BRIN:</b> stores min/max per block range. Tiny. For naturally ordered columns (append-only timestamps). Very fast to build.",
            "<b>Partial index:</b> CREATE INDEX ON orders(created_at) WHERE status='pending'. Smaller, faster for specific patterns.",
            "<b>Composite index:</b> (a,b,c). Helps queries on (a), (a,b), (a,b,c). NOT (b) alone. Leading column must be in WHERE."
          ]
        },
        {
          heading: "EXPLAIN ANALYZE",
          items: [
            "<b>EXPLAIN ANALYZE:</b> runs query, shows actual vs estimated rows, execution time, plan.",
            "<b>Look for:</b> large discrepancy estimated vs actual rows (stale stats — run ANALYZE). Seq Scan on large table (missing index). Nested Loop with large outer.",
            "<b>Cost:</b> (startup..total) in relative units. Lower is better.",
            "<b>Rows removed by filter:</b> large = index could help filter."
          ]
        }
      ],
      traps: [
        "BRIN only useful for naturally ordered data — on random-ordered data it's almost useless",
        "Partial index WHERE clause must match query WHERE clause exactly for planner to use it",
        "EXPLAIN without ANALYZE shows estimated plan only — always use ANALYZE for real data (but it runs the query)"
      ],
      checkpoint: [
        "Explain MVCC. What are dead tuples and what happens if VACUUM doesn't run?",
        "I have a JSONB column and need to search by a specific field. What index type?",
        "Walk me through reading EXPLAIN ANALYZE output. What are the key things you look for?"
      ]
    },
    {
      level: "Advanced",
      time: "40 min",
      sections: [
        {
          heading: "Query Planner + Production Tuning",
          items: [
            "<b>Cost model:</b> seq_page_cost=1.0 (reference), random_page_cost=4.0 (HDD). For SSD: set random_page_cost=1.1 — critical for index usage.",
            "<b>Statistics:</b> pg_statistic — column histograms, most common values. ANALYZE updates. Stale stats = bad plans.",
            "<b>effective_cache_size:</b> hint to planner about available OS cache. Set to 75% of RAM.",
            "<b>work_mem:</b> memory per sort/hash operation. Increase for sort-heavy queries. Careful: used multiple times per query × active connections.",
            "<b>autovacuum tuning:</b> lower autovacuum_vacuum_scale_factor for large tables (default 0.2 = 20% dead tuples before vacuum — too high for big tables)."
          ]
        }
      ],
      traps: [
        "random_page_cost=4.0 on SSD causes planner to prefer seq scans — always set to 1.1 on SSD",
        "work_mem is per sort operation not per connection — 100 connections × 3 sorts = 300 × work_mem total",
        "autovacuum_vacuum_scale_factor=0.2 on 100M row table = 20M dead tuples before vacuum — way too high"
      ],
      checkpoint: [
        "What is random_page_cost and what should you set for SSD-backed Postgres?",
        "How does work_mem affect performance and what is the risk of setting it too high?",
        "I have a 500GB table with frequent UPDATEs. What autovacuum tuning do you apply?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend Postgres candidate.\n\nTOPIC: PostgreSQL Query Engine + Indexing (Block 21)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: EXPLAIN ANALYZE reading, index design decisions, MVCC production implications. 'Query is slow, here is the EXPLAIN output' — diagnose and fix. Index design with trade-offs.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 22, phase: "Database & Cache", chip: "db", freq: "med",
  title: "PostgreSQL — Advanced + Production",
  subtitle: "VACUUM, table bloat, partitioning, row locking, replication, connection pooling",
  prereqs: [21],
  tiers: [
    {
      level: "Beginner",
      time: "35 min",
      sections: [
        {
          heading: "VACUUM + Bloat",
          items: [
            "<b>Dead tuples:</b> MVCC creates dead row versions on every UPDATE/DELETE. Without VACUUM, table grows indefinitely.",
            "<b>VACUUM:</b> marks dead tuple space as reusable. Non-blocking. Does NOT return space to OS.",
            "<b>VACUUM FULL:</b> rewrites entire table, returns space to OS. EXCLUSIVE LOCK — blocks all access. Avoid in production.",
            "<b>AUTOVACUUM:</b> background process. Always keep enabled.",
            "<b>Table bloat:</b> tables using more disk than data warrants. Monitor with pgstattuple extension."
          ]
        },
        {
          heading: "Connection Pooling",
          items: [
            "<b>Postgres spawns OS process per connection (~5-10MB).</b> 500 connections = 500 processes.",
            "<b>PgBouncer:</b> most popular pooler. Session mode (no benefit), Transaction mode (most common), Statement mode (breaks transactions).",
            "<b>Transaction mode breaks:</b> LISTEN/NOTIFY, advisory locks, prepared statements, SET LOCAL.",
            "<b>HikariCP (Spring Boot default):</b> in-process JDBC pool. Size = core_count * 2 + effective_spindle_count."
          ]
        }
      ],
      traps: [
        "VACUUM FULL locks table exclusively — causes production outage",
        "PgBouncer transaction mode breaks LISTEN/NOTIFY and advisory locks — know the limitations",
        "Autovacuum not keeping up with write rate = growing bloat — needs manual vacuum or tuning"
      ],
      checkpoint: [
        "What is the difference between VACUUM and VACUUM FULL? Which is safe in production?",
        "PgBouncer transaction mode — what are three things that break?",
        "How does autovacuum decide when to vacuum a table?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Partitioning",
          items: [
            "<b>Range partitioning:</b> by value range. CREATE TABLE orders_2024 PARTITION OF orders FOR VALUES FROM ('2024-01-01') TO ('2025-01-01').",
            "<b>List partitioning:</b> by discrete values. Hash partitioning: even distribution.",
            "<b>Partition pruning:</b> planner skips irrelevant partitions. Partition key MUST be in WHERE clause.",
            "<b>Default partition:</b> catches unmatched rows. Detach old partitions for archival without DROP."
          ]
        },
        {
          heading: "Row-Level Locking",
          items: [
            "<b>SELECT FOR UPDATE:</b> exclusive row lock. Others block.",
            "<b>SELECT FOR UPDATE SKIP LOCKED:</b> skip locked rows. Only immediately available rows returned. Perfect for concurrent job queues.",
            "<b>SELECT FOR UPDATE NOWAIT:</b> fail immediately if row locked.",
            "<b>Advisory locks:</b> pg_try_advisory_lock(key) non-blocking. Application-level locks. Released at session end."
          ]
        }
      ],
      traps: [
        "Partition key must be in WHERE clause for partition pruning — queries without it scan all partitions",
        "SELECT FOR UPDATE in long transaction holds locks for entire duration — other queries queue up",
        "FK on partitioned table must reference root table, not individual partition"
      ],
      checkpoint: [
        "Build a concurrent job queue where multiple workers pick jobs without duplicates — using only Postgres.",
        "What is partition pruning and what must be true for it to work?",
        "SELECT FOR UPDATE vs SELECT FOR UPDATE SKIP LOCKED — when do you use each?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "Replication + TXID Wraparound",
          items: [
            "<b>Streaming replication (physical):</b> byte-level WAL. Replica is exact copy. Read replicas, failover.",
            "<b>Logical replication:</b> row-level changes. Table-selective. Cross-version. For zero-downtime upgrades, CDC (Debezium).",
            "<b>TXID wraparound:</b> 32-bit transaction IDs. After ~2 billion, wraps. VACUUM FREEZE prevents this. Monitor datfrozenxid age.",
            "<b>Long-running transactions block VACUUM</b> — always set statement_timeout and idle_in_transaction_session_timeout.",
            "<b>Replication slot lag:</b> if replica is down, slot accumulates WAL → fills primary disk. Monitor slot lag."
          ]
        }
      ],
      traps: [
        "Logical replication doesn't replicate DDL — schema migrations must be applied to both sides",
        "Replication slot accumulates WAL when replica is down — can fill primary disk",
        "TXID wraparound causes data corruption if not caught — monitor datfrozenxid age religiously"
      ],
      checkpoint: [
        "What is the difference between physical and logical replication? When do you use each?",
        "What is TXID wraparound and what failure does it prevent?",
        "Your Postgres primary disk is filling up with WAL. What is the likely cause?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend Postgres candidate.\n\nTOPIC: PostgreSQL Advanced + Production (Block 22)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production incidents — 'disk full with WAL', 'job queue has race conditions', 'replica 10 minutes behind', 'VACUUM FULL caused outage'. Diagnose and fix.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 23, phase: "Database & Cache", chip: "db", freq: "high",
  title: "Redis — Internals + Production Patterns",
  subtitle: "Data structures, persistence, eviction, cluster, distributed lock, rate limiter, pub/sub vs streams",
  prereqs: [20],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Why Redis is Fast",
          items: [
            "<b>In-memory:</b> RAM ~100ns vs disk ~10ms. 100x faster baseline.",
            "<b>Single-threaded command processing:</b> no locking overhead. Atomic by default. I/O multi-threaded in Redis 6+.",
            "<b>Simple data structures:</b> O(1) string get/set, O(log n) sorted set operations.",
            "<b>Pipelining:</b> batch commands, reduces round-trips."
          ]
        },
        {
          heading: "Data Structures + Use Cases",
          items: [
            "<b>String:</b> cache, counters (INCR atomic), session tokens, distributed locks.",
            "<b>List:</b> LPUSH/RPUSH + LPOP/RPOP. Task queues, activity feeds.",
            "<b>Hash:</b> HSET/HGET. Object storage — user profile fields.",
            "<b>Set:</b> unique members. Tags, unique visitors, social connections.",
            "<b>Sorted Set (ZSet):</b> members + scores. Leaderboards, rate limiting, priority queues.",
            "<b>HyperLogLog:</b> approximate unique count. ~0.81% error. Fixed 12KB memory. Count unique visitors without storing each."
          ]
        }
      ],
      traps: [
        "INCR is atomic but INCR + GET is NOT — use Lua for atomic compound operations",
        "LPUSH multiple elements pushes in reverse order — LPUSH list a b c results in [c, b, a]",
        "SET with EX and separate EXPIRE are not atomic — use SET key value EX seconds NX"
      ],
      checkpoint: [
        "Build a real-time leaderboard for 1M game players. Which structure and which commands?",
        "What is HyperLogLog and when do you use it over a Set?",
        "Why is Redis single-threaded yet still fast?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Persistence + Eviction",
          items: [
            "<b>RDB:</b> periodic snapshots. Fast restart. Risk: data loss since last snapshot.",
            "<b>AOF:</b> log every write. fsync every second (default). Near-zero data loss. Slower restart.",
            "<b>Hybrid (recommended):</b> RDB + AOF. Fast restart + durability.",
            "<b>noeviction (default):</b> returns OOM error on write when full. Breaks service.",
            "<b>allkeys-lru:</b> evict least-recently-used. Good general cache policy.",
            "<b>allkeys-lfu (Redis 4+):</b> least-frequently-used. Better for skewed access patterns.",
            "<b>Always set maxmemory + eviction policy in production.</b>"
          ]
        },
        {
          heading: "Distributed Patterns",
          items: [
            "<b>Distributed lock:</b> SET key value NX EX timeout. NX = only if not exists. Must store unique value — prevents releasing another client's lock.",
            "<b>Sliding window rate limiter:</b> ZADD key now now → ZREMRANGEBYSCORE (remove old) → ZCARD (count). Needs Lua for atomicity.",
            "<b>Pub/Sub:</b> PUBLISH/SUBSCRIBE. Fire-and-forget. Messages lost if subscriber disconnected.",
            "<b>Streams:</b> append-only log. Consumer groups. Persistent. Use instead of Pub/Sub when delivery must be guaranteed."
          ]
        }
      ],
      traps: [
        "Distributed lock without TTL — if holder crashes, lock never released (deadlock)",
        "Pub/Sub messages lost if subscriber disconnects — use Streams for guaranteed delivery",
        "Rate limiter without Lua atomicity has race conditions under concurrency"
      ],
      checkpoint: [
        "Implement a distributed lock in Redis. What are the three required properties of a correct lock?",
        "What is the difference between Redis Pub/Sub and Streams? When does Pub/Sub cause data loss?",
        "Build a sliding window rate limiter in Redis for 100 requests/minute per user."
      ]
    },
    {
      level: "Advanced",
      time: "40 min",
      sections: [
        {
          heading: "Redis Cluster + Lua",
          items: [
            "<b>Hash slots:</b> 16384 slots. CRC16 of key → slot. Slots assigned to master nodes.",
            "<b>Hot key problem:</b> one key → one shard → bottleneck. Fix: key sharding (append {0..N}, read random shard), local in-memory cache.",
            "<b>Multi-key commands:</b> MGET/MSET only work when all keys on same shard. Use hash tags {prefix} to force same slot.",
            "<b>Async replication:</b> master failover can lose recent writes. Not for data you cannot afford to lose.",
            "<b>Lua scripts (EVAL):</b> entire script atomic. No other commands run between Lua lines. For compound atomic operations.",
            "<b>MULTI/EXEC:</b> queue commands, execute atomically. No conditional logic on intermediate results. WATCH for optimistic locking."
          ]
        }
      ],
      traps: [
        "MULTI/EXEC is NOT rollback-capable — runtime errors in EXEC don't abort other commands",
        "Lua scripts block Redis — long-running scripts starve all other commands. Keep scripts short.",
        "WATCH only works in same connection — connection pooling breaks WATCH-based optimistic locking"
      ],
      checkpoint: [
        "What is the hot key problem in Redis Cluster and how do you solve it?",
        "What is the difference between MULTI/EXEC and Lua scripts for atomicity in Redis?",
        "Implement atomic inventory reservation: check stock > 0, decrement, return success/failure."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: Redis Internals + Production (Block 23)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design problems ('build X with Redis') + production scenarios ('Redis master fails mid-lock operation') + internals ('what makes LPUSH multiple elements surprising').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 24, phase: "Database & Cache", chip: "db", freq: "med",
  title: "Elasticsearch — Search Internals",
  subtitle: "Inverted index, shards/replicas, mapping, BM25 scoring, write path, production issues",
  prereqs: [20],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Inverted Index",
          items: [
            "<b>Inverted index:</b> maps terms to documents. 'apple' → [doc1, doc5]. Enables O(1) term lookup.",
            "<b>Text analysis pipeline:</b> raw text → tokenizer → token filters (lowercase, stop words, stemming) → terms stored.",
            "<b>Standard analyzer:</b> tokenize on whitespace/punctuation + lowercase + stop words.",
            "<b>Why faster than SQL LIKE:</b> LIKE '%word%' scans every row. ES looks up term in index instantly."
          ]
        },
        {
          heading: "Index Structure",
          items: [
            "<b>Index:</b> logical namespace. Like a table.",
            "<b>Shard:</b> each index split into N primary shards. Each shard is independent Lucene index. Data distributed across nodes.",
            "<b>Replica:</b> copy of primary shard. Handles reads. Failover.",
            "<b>Primary shard count fixed at creation</b> — cannot change without reindexing. Over-sharding = overhead (~20-40GB per shard is healthy)."
          ]
        }
      ],
      traps: [
        "Primary shard count cannot be changed after index creation — plan carefully",
        "Too many small shards causes overhead — each shard has JVM memory cost",
        "Replica count can be changed anytime — set to 0 during bulk indexing for speed"
      ],
      checkpoint: [
        "Explain how an inverted index enables fast full-text search.",
        "What is a shard? Why can't you change primary shard count after creation?",
        "What is the role of a replica shard?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Mapping + Query Types",
          items: [
            "<b>text:</b> analyzed, tokenized, full-text search. Cannot sort or aggregate.",
            "<b>keyword:</b> exact match, sorting, aggregations.",
            "<b>Multi-field:</b> name.text for search + name.keyword for sort/agg.",
            "<b>Dynamic mapping danger:</b> unbounded field names = mapping explosion. Always define explicit mappings in production.",
            "<b>match query:</b> analyzed search. OR by default. operator:AND for all words required.",
            "<b>term query:</b> exact match, not analyzed. For keyword fields.",
            "<b>bool query:</b> must (AND, scored), should (OR, scored), filter (AND, no score, cached), must_not (NOT).",
            "<b>Filter vs query context:</b> filter = yes/no, cached, no scoring. Always use filter for exact conditions."
          ]
        },
        {
          heading: "Relevance — BM25",
          items: [
            "<b>BM25:</b> term frequency (with saturation) × IDF (rare terms scored higher) × document length normalisation.",
            "<b>Boosting:</b> boost field at query time: {match: {title: {query: 'fox', boost: 3}}}.",
            "<b>explain:true:</b> see scoring breakdown in response."
          ]
        }
      ],
      traps: [
        "Aggregations on text fields throw error — must use keyword field or enable fielddata (memory-intensive)",
        "match query is OR by default — 'quick brown' matches either word unless you add operator:AND",
        "Filter context results are cached, query context are not — put non-scored conditions in filter"
      ],
      checkpoint: [
        "What is the difference between match and term queries?",
        "I need to search product descriptions AND filter by category (exact). How do you structure the query?",
        "What is the difference between must and filter in a bool query? Which is cached?"
      ]
    },
    {
      level: "Advanced",
      time: "40 min",
      sections: [
        {
          heading: "Write Path + Production",
          items: [
            "<b>Write path:</b> document → primary shard → translog (durability) + memory buffer → refresh (1s default) → segment → searchable.",
            "<b>Near-real-time:</b> default 1s refresh interval. Not real-time. Increase for bulk indexing.",
            "<b>Segments:</b> immutable. Merging reduces count. Force merge on read-only indices only.",
            "<b>Heap sizing:</b> max 30-32GB (compressed OOP limit). Never &gt;50% of RAM — OS file cache needed.",
            "<b>split-brain:</b> two masters. Prevented by minimum_master_nodes (ES 6-) or auto in ES 7+.",
            "<b>Scroll vs search_after:</b> scroll holds PIT in memory. search_after is stateless — preferred for deep pagination."
          ]
        }
      ],
      traps: [
        "Scroll holds point-in-time snapshot in memory — too many concurrent scrolls = OOM",
        "Force merge on active write index blocks indexing — only on read-only/historical indices",
        "fielddata on text fields loads into JVM heap — causes OOM, use keyword fields instead"
      ],
      checkpoint: [
        "I need to paginate through 500K results. What is wrong with from/size and what should I use?",
        "Elasticsearch JVM heap at 90%. What are the top causes and how do you diagnose?",
        "Explain the ES write path from document to searchable."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend Elasticsearch candidate.\n\nTOPIC: Elasticsearch Internals (Block 24)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix query design ('how do you build this search'), mapping decisions, and production problems ('JVM at 90%, diagnose it').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 25, phase: "Database & Cache", chip: "db", freq: "med",
  title: "Cassandra — Distribution Model",
  subtitle: "Wide-column model, consistent hashing, replication, write path, compaction, anti-patterns",
  prereqs: [20],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Data Model",
          items: [
            "<b>Design tables around queries.</b> Every query pattern needs its own table.",
            "<b>Partition key:</b> determines which node. High-cardinality. Always in WHERE clause.",
            "<b>Clustering key:</b> sort order within partition. Range queries on clustering columns are fast.",
            "<b>Example:</b> messages: PK=(conversation_id), CK=(sent_at DESC). 'Get last 50 messages for conversation X' = perfect fit."
          ]
        },
        {
          heading: "When to Choose Cassandra",
          items: [
            "<b>Choose Cassandra:</b> massive write throughput, time-series, multi-DC active-active, linear horizontal scale.",
            "<b>Do NOT choose:</b> ad-hoc queries, JOINs, ACID transactions across partitions, small datasets.",
            "<b>AP system:</b> favors availability over consistency under network partition.",
            "<b>ALLOW FILTERING = full cluster scan.</b> Never in production."
          ]
        }
      ],
      traps: [
        "ALLOW FILTERING = full distributed scan across all nodes — extremely expensive",
        "Secondary indexes in Cassandra are LOCAL — querying hits every node",
        "Cassandra is AP — returns stale data under partition rather than failing"
      ],
      checkpoint: [
        "Design a Cassandra table for IoT readings (device_id, timestamp, temperature). What is the partition key?",
        "What is ALLOW FILTERING and why should you avoid it?",
        "When would Cassandra be the wrong choice?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Consistent Hashing + Consistency Levels",
          items: [
            "<b>Ring topology:</b> nodes on a ring. Key hashes to position. First N clockwise nodes store data.",
            "<b>Virtual nodes (vnodes):</b> each node owns multiple token ranges. Better distribution.",
            "<b>ONE:</b> fastest, least consistent. <b>QUORUM:</b> (RF/2)+1 nodes. <b>ALL:</b> all replicas.",
            "<b>QUORUM reads + QUORUM writes = strong consistency</b> for RF=3 (2+2 &gt; 3).",
            "<b>LOCAL_QUORUM:</b> quorum within local datacenter. Use in multi-DC to avoid cross-DC latency."
          ]
        },
        {
          heading: "Write Path",
          items: [
            "<b>Write path:</b> commit log (durability) + memtable (in-memory) → acknowledge → flush memtable to SSTable.",
            "<b>SSTables:</b> immutable sorted files. Writes always create new files.",
            "<b>Compaction:</b> merge SSTables, remove tombstones. SizeTiered (write-heavy), Leveled (read-heavy), TimeWindow (time-series).",
            "<b>Tombstones:</b> deletes = markers. Accumulation → slow reads. gc_grace_seconds controls lifetime."
          ]
        }
      ],
      traps: [
        "Tombstone accumulation degrades read performance — monitor tombstones per query",
        "Hinted handoff: if node is down longer than max_hint_window (3h default), hints are dropped — manual repair needed",
        "QUORUM with RF=3 requires 2 nodes — still works with 1 node down. ALL requires all 3."
      ],
      checkpoint: [
        "Explain Cassandra write path from client to disk.",
        "What is a tombstone? What happens when too many accumulate?",
        "LOCAL_QUORUM vs QUORUM — what is the difference and when do you use LOCAL_QUORUM?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "Advanced Patterns + Anti-Patterns",
          items: [
            "<b>Time-bucketed partition keys:</b> PK=(device_id, month) prevents unbounded partition growth.",
            "<b>Lightweight Transactions (LWT):</b> IF NOT EXISTS, IF condition. Paxos-based. ~4x slower. Single partition only.",
            "<b>Materialized Views:</b> auto-maintained denormalized table. Hidden write amplification. Manual denormalization often better.",
            "<b>Wide row anti-pattern:</b> storing all events forever under one partition key. Partition grows infinitely. Fix: time-bucket the partition key."
          ]
        }
      ],
      traps: [
        "Materialized views have hidden write amplification — each base write also writes to all MVs",
        "LWT is not composable across partitions — no multi-partition atomic operations",
        "Time-bucketed keys require app awareness — queries spanning buckets need multiple queries"
      ],
      checkpoint: [
        "I'm storing user events in Cassandra. After 6 months partitions are huge and queries slow. What's wrong and how to fix?",
        "When would you use a Lightweight Transaction? What is the performance cost?",
        "How does Cassandra guarantee write durability?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Cassandra candidate.\n\nTOPIC: Cassandra Distribution Model (Block 25)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Data modeling scenarios + production operations + consistency level decisions. 'Design this for Cassandra', 'tombstones show 50K per query — diagnose it'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

// ════════════════════════════════════════════════════════════
// PHASE 4 — MESSAGING & EVENTS
// ════════════════════════════════════════════════════════════

{
  id: 26, phase: "Messaging & Events", chip: "messaging", freq: "high",
  title: "Kafka — Internals + Production",
  subtitle: "Log abstraction, consumer groups, delivery semantics, ISR, outbox pattern, tuning",
  prereqs: [20],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Core Concepts",
          items: [
            "<b>Kafka = distributed commit log.</b> Topics are named logs. Producers append. Consumers read from offsets. Reading does NOT delete messages.",
            "<b>Partition key:</b> same key → same partition. Guarantees ordering within a key.",
            "<b>Ordering:</b> guaranteed within partition. NOT across partitions.",
            "<b>Retention:</b> messages kept configurable time (default 7 days). Multiple consumer groups read independently.",
            "<b>Consumer group:</b> each partition assigned to exactly one consumer in group. Max useful consumers = number of partitions."
          ]
        },
        {
          heading: "Kafka vs Alternatives",
          items: [
            "<b>Kafka vs RabbitMQ:</b> Kafka = log, high throughput, replay, fan-out. RabbitMQ = queue, complex routing, message deleted on consume, lower per-message latency.",
            "<b>Kafka vs SQS:</b> SQS = fully managed, no ops, max 14-day retention. Kafka = more control, replay, you operate it.",
            "<b>Kafka is overkill when:</b> simple task queue, &lt;1000 msgs/sec, no replay needed, team lacks Kafka ops experience."
          ]
        }
      ],
      traps: [
        "enable.auto.commit=true with slow processing — offset committed before processing complete = message loss on crash",
        "More consumers than partitions = idle consumers (no partition to assign)",
        "Global ordering requires single partition — kills parallel throughput"
      ],
      checkpoint: [
        "I have a topic with 4 partitions and 6 consumers in a group. What happens?",
        "What is the risk of enable.auto.commit=true?",
        "How do you ensure all events for a specific user are processed in order?"
      ]
    },
    {
      level: "Intermediate",
      time: "50 min",
      sections: [
        {
          heading: "Delivery Semantics",
          items: [
            "<b>At-most-once:</b> commit before processing. Message loss on crash. Lowest latency.",
            "<b>At-least-once:</b> commit after processing. Duplicates on crash. Most common. Requires idempotent consumer.",
            "<b>Exactly-once (EOS):</b> idempotent producer + transactional producer. ~20% throughput cost.",
            "<b>Practical approach:</b> design idempotent consumers with dedup by message ID. Simpler than full EOS."
          ]
        },
        {
          heading: "Replication + ISR + Outbox",
          items: [
            "<b>ISR (In-Sync Replicas):</b> replicas fully caught up with leader. acks=all + min.insync.replicas=2 guarantees 2 copies before ack.",
            "<b>Unclean leader election:</b> false = no data loss but possible unavailability. true = available but possible data loss.",
            "<b>Dual-write problem:</b> write to DB AND Kafka. If Kafka fails after DB commit = inconsistency.",
            "<b>Outbox pattern:</b> write event to outbox table in SAME DB transaction. CDC (Debezium) reads WAL, publishes to Kafka. Eliminates dual-write.",
            "<b>Consumer lag:</b> log end offset - committed offset. Alert on lag growth, not just current value."
          ]
        }
      ],
      traps: [
        "acks=all without min.insync.replicas=2 provides less guarantee than expected",
        "Outbox relay must be idempotent — relay restart may publish same event twice",
        "Kafka transactions (EOS) have 20% throughput cost — measure before applying everywhere"
      ],
      checkpoint: [
        "Explain the dual-write problem and how the Outbox pattern solves it.",
        "What is the relationship between acks=all and min.insync.replicas?",
        "Walk me through exactly-once semantics end-to-end."
      ]
    },
    {
      level: "Advanced",
      time: "40 min",
      sections: [
        {
          heading: "Performance + Log Compaction",
          items: [
            "<b>Producer batching:</b> linger.ms + batch.size. Higher linger = higher throughput, higher latency.",
            "<b>Compression:</b> snappy (fast, moderate), lz4 (fastest), gzip (best ratio, CPU cost). Compress at producer.",
            "<b>max.poll.records + max.poll.interval.ms:</b> process too many records → exceed poll interval → consumer kicked from group.",
            "<b>Log compaction:</b> keep only latest value per key. For changelog topics, event-sourced state.",
            "<b>Cooperative rebalancing (Kafka 2.4+):</b> only reassigns necessary partitions. Reduces processing pause vs eager rebalancing."
          ]
        }
      ],
      traps: [
        "Log compaction doesn't guarantee delivery order for non-key messages — compaction only affects per-key retention",
        "Consumer kicked from group: max.poll.records too high → processing takes too long → exceeds max.poll.interval.ms",
        "Kafka Streams state is local to consumer — if consumer moves hosts, state must rebuild from changelog topic"
      ],
      checkpoint: [
        "What is log compaction? When would you use it over regular retention?",
        "A consumer keeps getting kicked from the consumer group. What are the likely causes and fixes?",
        "Explain cooperative rebalancing and why it's better than eager rebalancing."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend Kafka candidate.\n\nTOPIC: Kafka Internals + Production (Block 26)\n\nYOUR ROLE: Reactive Socratic interviewer. High-signal topic for senior backend roles.\n\nAPPROACH: Architecture decisions (how to use Kafka for X), production ops (consumer lag growing — diagnose), internals (how does exactly-once work), design traps (dual-write problem).\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 27, phase: "Messaging & Events", chip: "messaging", freq: "med",
  title: "ActiveMQ + WebSocket",
  subtitle: "JMS model, queue vs topic, durability, WebSocket upgrade, STOMP, scaling, DLQ",
  prereqs: [],
  tiers: [
    {
      level: "Beginner",
      time: "35 min",
      sections: [
        {
          heading: "JMS + ActiveMQ",
          items: [
            "<b>Queue (point-to-point):</b> one consumer per message. Multiple consumers compete (load balanced). Message consumed and deleted.",
            "<b>Topic (pub-sub):</b> every subscriber gets copy. Ephemeral = miss if offline. Durable subscription = broker stores for offline subscriber.",
            "<b>Durability:</b> persistent (survives broker restart) vs non-persistent (fast, lost on restart).",
            "<b>ActiveMQ vs Kafka:</b> traditional broker + complex routing, lower throughput vs log-based + high throughput + replay. Different problem spaces."
          ]
        },
        {
          heading: "WebSocket Basics",
          items: [
            "<b>Full-duplex TCP over HTTP upgrade.</b> Server pushes to client at any time.",
            "<b>Handshake:</b> HTTP GET + Upgrade: websocket header → 101 Switching Protocols.",
            "<b>STOMP:</b> messaging protocol over WebSocket. Adds subscribe/send/ack. Spring uses STOMP.",
            "<b>WebSocket vs SSE vs Long Polling:</b> bidirectional → WebSocket. Server-push only → SSE (simpler, auto-reconnect). Legacy → long polling."
          ]
        }
      ],
      traps: [
        "WebSocket is stateful — load balancer must use sticky sessions or backplane",
        "SSE is unidirectional — server to client only, cannot send from client",
        "STOMP heartbeat required to detect silent disconnections"
      ],
      checkpoint: [
        "What is the difference between a JMS Queue and a Topic?",
        "Walk me through the WebSocket connection upgrade.",
        "When would you use SSE instead of WebSocket?"
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "Scaling WebSockets",
          items: [
            "<b>Problem:</b> WebSocket is persistent connection to ONE server. Multiple servers need a backplane.",
            "<b>Redis Pub/Sub backplane:</b> all servers subscribe. Message for user on server B published to Redis → server B delivers.",
            "<b>Connection limits:</b> each WebSocket = one file descriptor. Increase ulimit. Tune TCP keepalive.",
            "<b>Spring WebSocket + STOMP:</b> @MessageMapping, SimpMessagingTemplate, @SendToUser for targeted delivery."
          ]
        },
        {
          heading: "Dead Letter Queue",
          items: [
            "<b>DLQ:</b> messages failing after N retries go to Dead Letter Queue. Prevents poison messages blocking queue.",
            "<b>Redelivery policy:</b> max retries + exponential backoff. Prevents storm on retry.",
            "<b>DLQ monitoring:</b> alert on growth. Messages in DLQ = processing failures requiring investigation."
          ]
        }
      ],
      traps: [
        "Redis Pub/Sub backplane: messages published while subscriber disconnected are lost — use Streams for guaranteed delivery",
        "Missing DLQ configuration = poison messages retry indefinitely, blocking queue",
        "ActiveMQ message selectors evaluated at broker — complex selectors at high throughput impact broker performance"
      ],
      checkpoint: [
        "3 WebSocket servers behind a load balancer. User on server 1 sends message to user on server 2. How?",
        "What is a Dead Letter Queue and what happens without one?",
        "What makes WebSocket connections hard to scale horizontally?"
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "Production WebSocket + Nginx",
          items: [
            "<b>Nginx WebSocket config:</b> proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'. Without this: 60s timeout, silent drop.",
            "<b>Memory per connection:</b> ~1-10KB. 100K connections ≈ 1GB. Plan accordingly.",
            "<b>Authentication:</b> JWT in first message or URL param (not Authorization header — browser WebSocket API doesn't allow custom headers).",
            "<b>Graceful shutdown:</b> send close frame to all clients. Allow drain period."
          ]
        }
      ],
      traps: [
        "WebSocket behind Nginx without upgrade headers = silent connection drop after 60s",
        "WebSocket auth via custom header not supported in browser — use token in URL param (HTTPS only) or first-message auth",
        "WebSocket connection counting: each connection = file descriptor — check ulimit before scaling"
      ],
      checkpoint: [
        "What Nginx configuration is required for WebSocket proxying and what breaks without it?",
        "How do you authenticate a WebSocket connection? What are the browser constraints?",
        "Design a presence system (online/offline indicators) for a chat app with 1M concurrent users."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: ActiveMQ + WebSocket (Block 27)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design decisions, scaling challenges, production gotchas. 'Build real-time chat for 50K concurrent users', 'WebSocket connections drop after 60 seconds in production — diagnose it'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
}

]; 
// end BLOCKS_PART2
