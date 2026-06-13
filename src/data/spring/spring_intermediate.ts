import type { Block } from '../../types/content';

export const springIntermediate: Block[] = [
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Auto-Configuration Mechanism",
            "items": [
              "<b>@SpringBootApplication = @Configuration + @ComponentScan + @EnableAutoConfiguration.</b>",
              "<b>Auto-configuration:</b> Spring Boot reads META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. Each entry is a @Configuration with conditional annotations.",
              "<b>@ConditionalOnClass:</b> activate only if class is on classpath. <b>@ConditionalOnMissingBean:</b> only if no user-defined bean of that type. <b>@ConditionalOnProperty:</b> only if property set.",
              "<b>Why it works:</b> add spring-boot-starter-data-jpa → JPA classes on classpath → JPA auto-config activates. Define your own DataSource → Spring's default backs off.",
              "<b>Debug:</b> --debug flag shows which auto-configurations activated/skipped and why."
            ]
          },
          {
            "heading": "Application Context Lifecycle",
            "items": [
              "<b>Lifecycle:</b> load bean definitions → instantiate singletons → inject dependencies → @PostConstruct callbacks → context ready.",
              "<b>@PostConstruct:</b> runs after all dependencies injected. If throws, bean creation fails — app may not start.",
              "<b>@PreDestroy:</b> runs before container shuts down. For cleanup (close connections, flush buffers).",
              "<b>ApplicationContextAware:</b> anti-pattern for most cases — use DI instead. Legitimate for plugin/extension systems."
            ]
          }
        ],
        "traps": [
          "Auto-configuration backs off when you define your own bean — @ConditionalOnMissingBean is why",
          "@PostConstruct throwing an exception fails the bean creation and may prevent application startup",
          "ApplicationContextAware creates tight coupling to Spring framework — avoid"
        ],
        "checkpoint": [
          "How does Spring Boot know to auto-configure a DataSource when you add the JPA starter?",
          "@ConditionalOnProperty(name='feature.x', havingValue='true') — when does the configuration activate and when not?",
          "What happens if @PostConstruct throws an exception?"
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
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "@Embeddable + @Enumerated",
            "items": [
              "<code>@Embeddable</code> + <code>@Embedded</code> — embed value object into entity. Columns in same table. Use for Address (street, city, zip) in User entity.",
              "<code>@AttributeOverride</code> — override column names when embedding same type twice.",
              "<code>@Enumerated(EnumType.ORDINAL)</code> — stores 0,1,2... DANGEROUS: adding enum values in middle changes ordinals. Never use.",
              "<code>@Enumerated(EnumType.STRING)</code> — stores enum name. Safer. But renaming constant breaks DB data.",
              "<b>Best practice:</b> use AttributeConverter. Store stable code (not name) in DB. Enum rename doesn't break data."
            ]
          },
          {
            "heading": "Inheritance Strategies",
            "items": [
              "<b>SINGLE_TABLE (default):</b> all subclasses in one table. @DiscriminatorColumn. Simple, fast queries. Nullable columns for subclass fields.",
              "<b>TABLE_PER_CLASS:</b> each concrete class has own table. No joins. No polymorphic queries, duplicate columns.",
              "<b>JOINED:</b> parent table + subclass tables. Joined on PK. Normalised. JOIN on every query.",
              "<b>Use SINGLE_TABLE for simple hierarchies. JOINED for complex with many subclass fields. Avoid TABLE_PER_CLASS.</b>"
            ]
          }
        ],
        "traps": [
          "EnumType.ORDINAL breaks when you insert new enum value between existing ones — always use STRING or converter",
          "SINGLE_TABLE has nullable columns for subclass fields — DB constraints can't enforce subclass-specific rules",
          "@AttributeOverride required when embedding same @Embeddable twice — otherwise column name conflict"
        ],
        "checkpoint": [
          "Why is EnumType.ORDINAL dangerous? What is the best approach?",
          "When would you choose JOINED inheritance over SINGLE_TABLE?",
          "Design a Vehicle hierarchy (Car, Truck). Which inheritance strategy and why?"
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
        "level": "Intermediate",
        "time": "50 min",
        "sections": [
          {
            "heading": "Cascade Types + orphanRemoval",
            "items": [
              "<b>CascadeType.PERSIST:</b> saving parent saves children. <b>MERGE:</b> merging parent merges children. <b>REMOVE:</b> deleting parent deletes children.",
              "<b>CascadeType.ALL:</b> all cascades. Use carefully — REMOVE on @ManyToMany can delete shared entities.",
              "<b>orphanRemoval=true:</b> removing child from parent's collection triggers child deletion in DB. Stronger than REMOVE.",
              "<b>Rule:</b> cascade only within aggregate root → component relationships. Never cascade across aggregate boundaries."
            ]
          },
          {
            "heading": "The N+1 Problem — All Fixes",
            "items": [
              "<b>N+1:</b> load N entities, then load each entity's association with separate query = 1 + N queries.",
              "<b>Fix 1 — JOIN FETCH:</b> <code>SELECT o FROM Order o JOIN FETCH o.items</code>. Single query. Use DISTINCT or Set for multiple collections.",
              "<b>Fix 2 — @EntityGraph:</b> <code>@EntityGraph(attributePaths = {'items', 'customer'})</code> on repository method. Overrides fetch type per query.",
              "<b>Fix 3 — @BatchSize:</b> loads in batches of N rather than one-by-one. Reduces N+1 to N/batchSize+1.",
              "<b>Fix 4 — DTO projection:</b> select only what you need. No entity. Best for read-only.",
              "<b>Detect N+1:</b> p6spy, spring.jpa.show-sql=true, Hibernate Statistics, query count assertions in tests."
            ]
          }
        ],
        "traps": [
          "JOIN FETCH with @OneToMany produces duplicate parent rows — use DISTINCT or collect to Set",
          "CascadeType.REMOVE on @ManyToMany deletes shared entities — only orphanRemoval on exclusive relationships",
          "@EntityGraph doesn't work with sorting in Spring Data — combine with @Query if sorting needed"
        ],
        "checkpoint": [
          "Explain N+1 with a concrete example. What are the four ways to fix it?",
          "When would you use @BatchSize instead of JOIN FETCH?",
          "What is the difference between CascadeType.REMOVE and orphanRemoval=true?"
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Projections",
            "items": [
              "<b>Interface projection:</b> interface with getters. Spring Data returns proxy. Only selected fields fetched. <code>interface UserSummary { String getName(); String getEmail(); }</code>",
              "<b>DTO projection with @Query:</b> <code>SELECT new com.example.UserDTO(u.name, u.email) FROM User u</code>. Requires DTO constructor. Explicit.",
              "<b>Dynamic projections:</b> <code>&lt;T&gt; T findById(Long id, Class&lt;T&gt; type)</code> — caller specifies type.",
              "<b>When to use:</b> read-only use cases. Reduces persistence context overhead and data transfer."
            ]
          },
          {
            "heading": "Pagination",
            "items": [
              "<b>Pageable parameter:</b> add to any method. Returns Page&lt;T&gt; (with total count) or Slice&lt;T&gt; (no total count).",
              "<code>PageRequest.of(page, size, Sort.by(\"createdAt\").descending())</code>",
              "<b>Page vs Slice:</b> Page runs COUNT(*) — expensive on large tables. Slice only fetches next page. Use Slice for infinite scroll.",
              "<b>Keyset pagination:</b> WHERE id &gt; lastId ORDER BY id LIMIT n. No COUNT, no OFFSET. Scales to millions of rows. Manual implementation."
            ]
          }
        ],
        "traps": [
          "Page<T> runs an additional COUNT query — expensive on large tables, use Slice<T> for infinite scroll",
          "OFFSET pagination degrades linearly — OFFSET 9,999,000 in a 10M row table scans 10M rows",
          "Interface projections with SpEL expressions can trigger additional queries — check generated SQL"
        ],
        "checkpoint": [
          "What is the difference between Page&lt;T&gt; and Slice&lt;T&gt;? When do you use each?",
          "I have a 50 million row table and users can page through results. What pagination strategy and why?",
          "What is an interface projection and how does it differ from a DTO projection?"
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Specification Pattern",
            "items": [
              "<b>Specification&lt;T&gt;:</b> functional interface: <code>Predicate toPredicate(Root&lt;T&gt; root, CriteriaQuery&lt;?&gt; query, CriteriaBuilder cb)</code>.",
              "<b>JpaSpecificationExecutor&lt;T&gt;:</b> extend in repository. Gains findAll(Specification), findOne(Specification), count(Specification).",
              "<b>Composing:</b> spec1.and(spec2), spec1.or(spec2), Specification.not(spec).",
              "<b>Dynamic filter pattern:</b> <code>Specification&lt;User&gt; spec = Specification.where(null); if(name != null) spec = spec.and(hasName(name));</code>",
              "<b>Null-safe:</b> returning null from toPredicate = no restriction (TRUE predicate — matches everything). Use for optional filters."
            ]
          },
          {
            "heading": "Readable Factory Methods",
            "items": [
              "<code>static Specification&lt;User&gt; hasName(String name) { return name == null ? null : (root, query, cb) -&gt; cb.equal(root.get(\"name\"), name); }</code>",
              "<b>Compose at service layer:</b> clean separation between specification building and business logic.",
              "<b>Testing:</b> unit test with @DataJpaTest + real Specifications against test DB."
            ]
          }
        ],
        "traps": [
          "Null-returning toPredicate = no restriction (matches everything), NOT zero results — common logical error",
          "Specifications with JOINs — calling root.join() multiple times creates multiple JOINs causing duplicates. Use CriteriaQuery.distinct(true)",
          "JpaSpecificationExecutor.findAll(Spec, Pageable) runs COUNT query — can be slow on complex Specifications"
        ],
        "checkpoint": [
          "Build UserSpec with: name contains (optional), age between (optional), active=true. Show composition at service layer.",
          "What happens when toPredicate returns null?",
          "How do you prevent duplicate results when Specifications involve JOINs?"
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
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Auditing",
            "items": [
              "<code>@EnableJpaAuditing</code> on @Configuration. <code>@EntityListeners(AuditingEntityListener.class)</code> on entity.",
              "<code>@CreatedDate, @LastModifiedDate</code> — auto timestamps. <code>@CreatedBy, @LastModifiedBy</code> — auto user.",
              "<b>AuditorAware&lt;T&gt; bean:</b> provides current user (from SecurityContext for Spring Security).",
              "<b>@MappedSuperclass:</b> put audit fields in base class. All entities extend it.",
              "<b>Hibernate Envers:</b> full audit trail in _AUD tables. Query historical state. Heavier but complete."
            ]
          },
          {
            "heading": "Batch Operations",
            "items": [
              "<b>saveAll() is NOT bulk insert by default.</b> Delegates to save() in a loop — N individual INSERTs.",
              "<b>True batch insert config:</b> spring.jpa.properties.hibernate.jdbc.batch_size=50 + order_inserts=true + order_updates=true. Also requires SEQUENCE id generation.",
              "<b>Bulk @Modifying update:</b> <code>@Query('UPDATE User u SET u.active=false WHERE u.lastLogin &lt; :date') @Modifying @Transactional</code>. Bypasses entity lifecycle — fast.",
              "<b>EntityManager.flush() + clear():</b> during large batch processing to prevent OutOfMemoryError. Flush writes to DB, clear releases from persistence context."
            ]
          }
        ],
        "traps": [
          "saveAll() without batch_size config = N individual inserts — configure Hibernate batch properties",
          "Bulk @Modifying queries bypass persistence context — stale entities remain until EntityManager.clear()",
          "@CreatedBy requires AuditorAware bean — if not configured, field stays null with no error thrown"
        ],
        "checkpoint": [
          "What configuration is required for Hibernate to actually batch inserts?",
          "I have 10,000 users to deactivate. What's wrong with loading them all and calling save() in a loop? What's better?",
          "How does @EnableJpaAuditing know who the current user is?"
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
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Isolation Levels",
            "items": [
              "<b>READ_UNCOMMITTED:</b> can read uncommitted data (dirty reads). Almost never use.",
              "<b>READ_COMMITTED (Postgres default):</b> only read committed data. Prevents dirty reads. Allows non-repeatable reads.",
              "<b>REPEATABLE_READ:</b> same query returns same rows within transaction. Prevents non-repeatable reads. Allows phantoms.",
              "<b>SERIALIZABLE:</b> full isolation. Slowest. Prevents all anomalies.",
              "<b>For most apps:</b> READ_COMMITTED is sufficient. Use higher only when you have proven anomalies."
            ]
          },
          {
            "heading": "Read-Only Transactions",
            "items": [
              "<b>@Transactional(readOnly=true):</b> Hibernate skips dirty checking. Performance benefit for read operations.",
              "<b>Postgres benefit:</b> read-only transactions can route to read replicas.",
              "<b>Does NOT prevent writes</b> — you can still call save(). It just disables dirty checking optimisation.",
              "<b>Always annotate read service methods</b> with readOnly=true."
            ]
          }
        ],
        "traps": [
          "@Transactional(readOnly=true) does NOT prevent writes — only disables dirty checking",
          "SERIALIZABLE dramatically reduces throughput — measure before applying",
          "READ_COMMITTED allows non-repeatable reads — if business logic reads same row twice expecting consistency, use REPEATABLE_READ"
        ],
        "checkpoint": [
          "What anomalies does READ_COMMITTED prevent? Which does it NOT prevent?",
          "What exactly does @Transactional(readOnly=true) optimise?",
          "I have REQUIRES_NEW inner method. Outer transaction rolls back. What happens to the inner?"
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "OAuth2 Flows",
            "items": [
              "<b>Authorization Code Flow:</b> user → app → auth server (login) → redirect with code → app exchanges code for token. For user-facing apps. Token never exposed to browser.",
              "<b>Client Credentials Flow:</b> service-to-service. No user. App sends client_id + client_secret → access token. For M2M auth.",
              "<b>PKCE:</b> code_verifier (random) + code_challenge (SHA256 hash). Auth server verifies on token exchange. Prevents code interception. Required for SPAs/mobile.",
              "<b>Spring Security OAuth2 Resource Server:</b> validates JWT from auth server. http.oauth2ResourceServer(oauth2 -&gt; oauth2.jwt(...))"
            ]
          },
          {
            "heading": "Authorization",
            "items": [
              "<code>@PreAuthorize(\"hasRole('ADMIN')\")</code> — method security. SpEL evaluated before method runs.",
              "<code>@PostAuthorize(\"returnObject.userId == authentication.name\")</code> — check after method returns.",
              "<b>Requires @EnableMethodSecurity (Spring 6+).</b>",
              "<b>hasAuthority vs hasRole:</b> hasRole automatically prepends 'ROLE_'. hasAuthority checks exact string.",
              "<b>@PreAuthorize self-invocation trap:</b> same as @Transactional — calling from same class bypasses proxy."
            ]
          }
        ],
        "traps": [
          "hasRole('ADMIN') checks for 'ROLE_ADMIN' — authority must include ROLE_ prefix",
          "@PreAuthorize self-invocation bypasses proxy — same issue as @Transactional",
          "OAuth2 Authorization Code without PKCE vulnerable to code interception for public clients"
        ],
        "checkpoint": [
          "What is the difference between Authorization Code flow and Client Credentials? When do you use each?",
          "What is PKCE and why is it needed for SPAs?",
          "hasRole('ADMIN') vs hasAuthority('ADMIN') — what's different?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Boot candidate on security.\n\nTOPIC: Spring Boot Security (Block 16)\n\nYOUR ROLE: Reactive Socratic interviewer. High-stakes topic.\n\nAPPROACH: Test security thinking, not just configuration knowledge. Show code or system designs with vulnerabilities — ask to identify and fix. Mix attack scenarios with defensive design.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default springIntermediate;
