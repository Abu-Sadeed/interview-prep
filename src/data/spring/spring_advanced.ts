import type { Block } from '../../types/content';

export const springAdvanced: Block[] = [
  {
    "id": "spring-1",
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Core — IoC + Bean Lifecycle",
    "subtitle": "Container internals, bean scopes, auto-configuration, @Conditional, extension points",
    "prereqs": [
      "java-7",
      "java-8"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Extension Points",
            "items": [
              "<b>BeanPostProcessor:</b> intercepts all bean creation. postProcessBeforeInitialization() before @PostConstruct. postProcessAfterInitialization() after. This is where Spring AOP proxy creation happens.",
              "<b>BeanFactoryPostProcessor:</b> runs before beans are instantiated. Can modify bean definitions. PropertySourcesPlaceholderConfigurer resolves @Value placeholders here.",
              "<b>ImportBeanDefinitionRegistrar:</b> programmatically register bean definitions. Used by @EnableJpaRepositories to register repository proxy beans.",
              "<b>FactoryBean&lt;T&gt;:</b> bean that produces another bean. getObject() returns actual bean. Used for SqlSessionFactory, ConnectionFactory."
            ]
          },
          {
            "heading": "Circular Dependencies + Scope Proxies",
            "items": [
              "<b>Circular dependency:</b> A→B, B→A. Spring breaks cycles with early-exposure proxy for singleton beans. Constructor-injection cycles always fail (cannot be broken).",
              "<b>@Lazy:</b> inject lazy proxy that initialises on first use. Breaks circular dependency cycle. Also delays expensive initialisation.",
              "<b>Scoped proxy:</b> @Scope(proxyMode=ScopedProxyMode.TARGET_CLASS). Singleton gets proxy that delegates to correct scope (request/session) at runtime."
            ]
          }
        ],
        "traps": [
          "Constructor injection circular dependencies cannot be resolved by Spring — must refactor",
          "Scoped proxy requires CGLIB — final classes cannot be proxied this way",
          "BeanFactoryPostProcessor runs before instantiation — cannot inject regular beans into it via @Autowired"
        ],
        "checkpoint": [
          "What is a BeanPostProcessor and how does Spring AOP use it?",
          "How does Spring resolve a circular dependency between two singleton beans? When does it fail?",
          "What is a scoped proxy and when do you need one?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Boot backend candidate.\n\nTOPIC: Spring Core — IoC + Bean Lifecycle (Block 9)\n\nYOUR ROLE: Reactive Socratic interviewer. High-signal topic — deep probe.\n\nAPPROACH: Mix 'explain how X works' with 'what happens when Y' scenarios and 'debug this' cases. Test auto-configuration understanding, scope mismatches, circular dependencies.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "spring-2",
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Data JPA — Entity Mapping",
    "subtitle": "@Entity, ID generation, @Embedded, @Enumerated, inheritance strategies, schema management",
    "prereqs": [
      "spring-1"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Custom Type Mapping + Schema Management",
            "items": [
              "<b>AttributeConverter&lt;X,Y&gt;:</b> X = Java type, Y = DB type. Convert in both directions. @Converter(autoApply=true) applies to all fields of that type.",
              "<b>JSONB with Hibernate 6:</b> @JdbcTypeCode(SqlTypes.JSON) for JSONB columns in Postgres.",
              "<b>spring.jpa.hibernate.ddl-auto:</b> none (production), validate (check schema), update (risky — can drop columns), create-drop (tests only).",
              "<b>Never use update in production.</b> Use Flyway or Liquibase for versioned migrations.",
              "<b>Physical vs implicit naming strategy:</b> physical = final DB name. Implicit = Java→DB name conversion logic."
            ]
          }
        ],
        "traps": [
          "ddl-auto=update in production can drop columns or cause data loss — always use none + migration tool",
          "@Table(indexes) only works with schema generation — doesn't add indexes to existing databases",
          "@Column(columnDefinition='jsonb') breaks portability but sometimes necessary for Postgres-specific types"
        ],
        "checkpoint": [
          "Why should you never use ddl-auto=update in production?",
          "How would you map a Postgres JSONB column in a Spring entity?",
          "Write an AttributeConverter that encrypts a String field before storing and decrypts on read."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Boot backend candidate.\n\nTOPIC: Spring Data JPA — Entity Mapping (Block 10)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Entity design scenarios ('model this domain'), internals probes (why is ORDINAL dangerous), production awareness (what ddl-auto in prod and why).\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "spring-3",
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Data JPA — Relationships",
    "subtitle": "@OneToMany, @ManyToOne, fetch types, cascades, orphanRemoval, N+1 problem and ALL fixes",
    "prereqs": [
      "spring-2"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "40 min",
        "sections": [
          {
            "heading": "Performance + Bidirectional Sync",
            "items": [
              "<b>MultipleBagFetchException:</b> cannot JOIN FETCH two @OneToMany collections simultaneously. Fix: use Set for one, or fetch separately with @BatchSize.",
              "<b>DTO projections with JPQL:</b> <code>SELECT new com.example.OrderDTO(o.id, o.total) FROM Order o</code>. No entity, no persistence context overhead.",
              "<b>Bidirectional helper methods:</b> addChild(child) sets child's parent AND adds to collection. Keeps object graph consistent. Critical for correctness.",
              "<b>equals/hashCode in entities:</b> don't base on @Id for new (unpersisted) entities (null ID). Use business key or UUID assigned in constructor."
            ]
          },
          {
            "heading": "Read-Only + @Transactional(readOnly=true)",
            "items": [
              "<b>@Transactional(readOnly=true) on repository methods:</b> Hibernate skips dirty checking (no snapshot comparison at flush). Performance benefit for read-heavy operations.",
              "<b>Read replica routing:</b> readOnly transactions can route to read replicas via Spring's LazyConnectionDataSourceProxy.",
              "<b>Does NOT prevent writes</b> — you can still call save() inside a readOnly transaction. It just disables dirty checking optimisation."
            ]
          }
        ],
        "traps": [
          "Hibernate proxy instanceof returns false for proxied entities — use Hibernate.getClass(entity)",
          "equals/hashCode based on @Id breaks for new unpersisted entities with null ID",
          "@Transactional(readOnly=true) does NOT prevent writes — only disables dirty checking"
        ],
        "checkpoint": [
          "What is MultipleBagFetchException and how do you fix it?",
          "How should you implement equals/hashCode for a JPA entity? What's wrong with using database ID?",
          "What exactly does @Transactional(readOnly=true) do differently from a regular transaction?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Data JPA candidate.\n\nTOPIC: JPA Relationships (Block 11)\n\nYOUR ROLE: Reactive Socratic interviewer. N+1 is a must-know — probe deeply. Test cascade understanding, fetch type decisions, bidirectional relationship gotchas.\n\nAPPROACH: Code analysis ('what's wrong with this entity design'), design scenarios, production diagnosis.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "spring-4",
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Data JPA — Querying",
    "subtitle": "Derived methods, JPQL, native queries, projections, pagination, @Query",
    "prereqs": [
      "spring-3"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Custom Repository Implementations",
            "items": [
              "<b>Custom fragment:</b> interface UserRepositoryCustom + class UserRepositoryCustomImpl. Both extended in UserRepository.",
              "<b>EntityManager injection:</b> inject EntityManager in custom impl. Build CriteriaQuery or native queries directly.",
              "<b>Stored procedures:</b> @NamedStoredProcedureQuery or @Procedure on repository method.",
              "<b>QueryDSL:</b> QuerydslPredicateExecutor&lt;T&gt; + Q-classes from APT. Type-safe queries. More refactor-safe than string-based approaches."
            ]
          }
        ],
        "traps": [
          "Custom impl class must end in 'Impl' by default — Spring Data convention, configurable via repositoryImplementationPostfix",
          "QueryDSL Q-classes must be regenerated after entity changes — easy to miss in CI if APT not configured",
          "Specifications don't work with @Query — use EntityManager or QueryDSL for complex dynamic queries"
        ],
        "checkpoint": [
          "Walk me through creating a custom repository implementation that uses EntityManager directly.",
          "What is QueryDSL and how does it improve on string-based queries?",
          "When would you write a native SQL @Query vs JPQL vs Specification vs QueryDSL?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Data JPA candidate.\n\nTOPIC: JPA Querying (Block 12)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix 'write this query' tasks, 'which approach' decisions, and 'what goes wrong' traps. Test when to use each approach, not just that they exist.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "spring-5",
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Data JPA — Criteria API + Specifications",
    "subtitle": "CriteriaBuilder, Predicate, Specification pattern, QueryDSL comparison, dynamic filter design",
    "prereqs": [
      "spring-4"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "QueryDSL vs Specifications",
            "items": [
              "<b>QueryDSL generates Q-classes</b> at compile time via APT. <code>QPerson.person.name.eq(name)</code> vs <code>root.get(\"name\")</code>.",
              "<b>Type-safe:</b> renaming field → Q-class regenerated → compile error. String-based Specifications fail at runtime.",
              "<b>QuerydslPredicateExecutor&lt;T&gt;:</b> repository extension. Accepts <code>com.querydsl.core.types.Predicate</code>.",
              "<b>Trade-off:</b> QueryDSL requires APT build config and Q-class regeneration. More setup, better safety and readability for complex queries."
            ]
          },
          {
            "heading": "Fetch Inside Specification + Subqueries",
            "items": [
              "<b>Fetch with Specification:</b> use Root.fetch() inside toPredicate for JOIN FETCH. But: causes issues in count queries. Check <code>query.getResultType() != Long.class</code> before adding fetch.",
              "<b>Subquery:</b> <code>Subquery&lt;Long&gt; subquery = query.subquery(Long.class)</code>. Use for EXISTS checks.",
              "<b>Full search API:</b> combine Specification with Pageable and Sort: <code>findAll(spec, PageRequest.of(0, 20, Sort.by(\"name\")))</code>."
            ]
          }
        ],
        "traps": [
          "Root.fetch() in Specification breaks COUNT queries for pagination — check result type before adding fetch",
          "QueryDSL BooleanBuilder is mutable — not thread-safe, create new instance per request",
          "Q-classes not regenerated after entity field change — compile errors, ensure APT runs in CI"
        ],
        "checkpoint": [
          "What is the main advantage of QueryDSL over Criteria API Specifications?",
          "How do you handle JOIN FETCH inside a Specification without breaking the count query for pagination?",
          "Design a search API with 10 optional filter parameters. Walk me through Specification design from controller to repository."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Data JPA candidate.\n\nTOPIC: Criteria API + Specifications (Block 13)\n\nYOUR ROLE: Reactive Socratic interviewer. Design-heavy topic.\n\nAPPROACH: Ask them to build. 'Build a dynamic product search with 8 optional filters.' Probe internals as they describe. Test edge cases: null handling, pagination, JOINs.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "spring-6",
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "med",
    "title": "Spring Data JPA — Advanced",
    "subtitle": "Optimistic/pessimistic locking, @Version, auditing, batch operations, second-level cache",
    "prereqs": [
      "spring-5"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Second-Level Cache + OSIV",
            "items": [
              "<b>First-level cache:</b> persistence context (EntityManager). Scoped to one transaction. Automatic.",
              "<b>Second-level cache:</b> cross-session, shared. Requires config: @Cache(usage=CacheConcurrencyStrategy.READ_WRITE) + hibernate.cache.use_second_level_cache=true.",
              "<b>When to use:</b> reference data that rarely changes (countries, categories, config). Never for frequently updated entities.",
              "<b>OSIV (Open Session in View):</b> keeps persistence context open for entire HTTP request including view rendering. Spring Boot enables by default. Anti-pattern — causes hidden N+1 in templates/serialisers.",
              "<b>Disable OSIV:</b> spring.jpa.open-in-view=false. Load all data in service layer within transaction."
            ]
          }
        ],
        "traps": [
          "OSIV causes N+1 in view/serialisation layer — always disable with spring.jpa.open-in-view=false in production",
          "Second-level cache with READ_WRITE needs careful invalidation — stale after bulk updates",
          "Query cache invalidated by any change to involved tables — near-zero hit rate in write-heavy apps"
        ],
        "checkpoint": [
          "What is OSIV and why should it be disabled in production?",
          "When would you use second-level cache and when would you not?",
          "How do you process 1 million entities in a batch without running out of memory in Hibernate?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Data JPA candidate.\n\nTOPIC: JPA Advanced — Locking, Batch, Caching (Block 14)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production incidents — 'your service has a lost update bug under concurrent load, diagnose it', 'batch job takes 6 hours, how do you fix it', 'OSIV causing N+1 in your JSON serialiser'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "spring-7",
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Boot — @Transactional Deep Dive",
    "subtitle": "Proxy internals, propagation levels, isolation, self-invocation trap, rollback rules, async+transactional",
    "prereqs": [
      "spring-1",
      "spring-6"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Transaction Events + Async",
            "items": [
              "<b>@TransactionalEventListener:</b> fires AFTER transaction commits. Guarantees data is visible before event handled. AFTER_COMMIT (default), BEFORE_COMMIT, AFTER_ROLLBACK.",
              "<b>Why after commit:</b> event fired during transaction might read data before it's committed.",
              "<b>@Async + @Transactional:</b> async method runs in a different thread with no transaction context from caller. New transaction created with REQUIRED propagation. Completely independent.",
              "<b>If @Async method throws:</b> caller's transaction is unaffected — different thread, different transaction."
            ]
          },
          {
            "heading": "Distributed Transactions",
            "items": [
              "<b>XA/JTA:</b> two-phase commit across multiple resources. Coordinator is SPOF. Blocking protocol. Operationally complex.",
              "<b>Why avoid XA:</b> network partitions cause heuristic failures. Blocking = availability risk.",
              "<b>Alternatives:</b> Outbox pattern (same DB transaction for data + event). Saga for business-level compensation.",
              "<b>Best-effort 1PC:</b> accept eventual consistency. Design for idempotency and compensating transactions."
            ]
          }
        ],
        "traps": [
          "@TransactionalEventListener AFTER_COMMIT — if listener throws, transaction already committed, no rollback possible",
          "@Async + @Transactional: caller's transaction context NOT propagated to async method — new independent transaction",
          "XA/JTA distributed transactions — blocking 2PC means single resource failure blocks coordinator"
        ],
        "checkpoint": [
          "What is @TransactionalEventListener and why is it safer than ApplicationEventPublisher inside a transaction?",
          "I write to DB and publish Kafka message in same @Transactional method. What race condition exists and how do you fix it?",
          "What happens when @Async + @Transactional are combined on the same method?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Boot candidate.\n\nTOPIC: @Transactional Deep Dive (Block 15)\n\nYOUR ROLE: Reactive Socratic interviewer. Trap-rich topic.\n\nAPPROACH: Code review scenarios ('what's wrong with this code'), design questions ('implement audit logging that must always commit'), and theory probes.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "spring-8",
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Boot — Security",
    "subtitle": "Filter chain, JWT flow, OAuth2 flows, @PreAuthorize, CORS, CSRF configuration",
    "prereqs": [
      "spring-1"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "40 min",
        "sections": [
          {
            "heading": "CORS + CSRF",
            "items": [
              "<b>CORS:</b> browser security. Prevents JS from making requests to different origin. Spring handles with CorsConfigurationSource.",
              "<b>CSRF:</b> attacker tricks browser into state-changing request using victim's cookies. Mitigated with CSRF token or SameSite cookie.",
              "<b>CSRF for REST APIs with JWT:</b> disable CSRF. JWTs are not sent automatically by browser — CSRF doesn't apply to token-based auth.",
              "<b>Enable CSRF for session-based web apps.</b> SameSite=Strict is an alternative mitigation."
            ]
          },
          {
            "heading": "Security Hardening",
            "items": [
              "<b>BCryptPasswordEncoder:</b> adaptive cost factor. Never MD5/SHA1. Increase cost factor over time as hardware improves.",
              "<b>JWT secret rotation:</b> use RS256 (key pair) not HS256 (shared secret). Publish JWKS endpoint. Resource servers fetch public key dynamically.",
              "<b>Rate limiting auth endpoints:</b> limit login attempts. Redis-backed attempt counter.",
              "<b>Security headers:</b> X-Content-Type-Options, X-XSS-Protection, X-Frame-Options, HSTS — Spring Security adds defaults."
            ]
          }
        ],
        "traps": [
          "Disabling CSRF but still using session cookies = CSRF vulnerability remains",
          "allowedOrigins('*') + allowCredentials(true) is invalid — credentials require specific origin",
          "BCrypt work factor should be increased over time — benchmark on your hardware periodically"
        ],
        "checkpoint": [
          "When should you disable CSRF protection in Spring Security?",
          "What is the vulnerability in using HS256 for JWT signing vs RS256?",
          "Walk me through implementing rate limiting on the login endpoint."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Boot candidate on security.\n\nTOPIC: Spring Boot Security (Block 16)\n\nYOUR ROLE: Reactive Socratic interviewer. High-stakes topic.\n\nAPPROACH: Test security thinking, not just configuration knowledge. Show code or system designs with vulnerabilities — ask to identify and fix. Mix attack scenarios with defensive design.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default springAdvanced;
