import type { Block } from '../../types/content';

export const springBeginner: Block[] = [
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "IoC + Dependency Injection",
            "items": [
              "<b>IoC:</b> you don't create dependencies, the container does. You declare what you need, Spring provides it.",
              "<b>DI types:</b> constructor injection (recommended — immutable, testable, explicit deps), setter injection (optional deps), field injection (@Autowired on field — hard to test, avoid).",
              "<b>Why constructor injection:</b> dependencies explicit in signature, object always in valid state, easy unit testing without Spring.",
              "<b>@Component, @Service, @Repository, @Controller:</b> all auto-detected by component scan. @Repository adds exception translation. @Service is semantic only.",
              "<b>@Bean in @Configuration:</b> explicit instantiation. More control. Use for third-party classes you can't annotate."
            ]
          },
          {
            "heading": "Bean Scopes",
            "items": [
              "<b>singleton (default):</b> one instance per ApplicationContext. Shared. All injections get same instance.",
              "<b>prototype:</b> new instance per injection/lookup. Not managed after creation (@PreDestroy not called).",
              "<b>request:</b> one per HTTP request. Web contexts only.",
              "<b>session:</b> one per HTTP session.",
              "<b>Scope mismatch trap:</b> injecting prototype into singleton = prototype becomes singleton (same instance forever). Fix: ObjectProvider&lt;T&gt; or @Lookup method."
            ]
          }
        ],
        "traps": [
          "Field injection with @Autowired creates hidden dependencies and makes unit testing without Spring impossible",
          "Prototype bean injected into singleton behaves like singleton — prototype's new instance never created again",
          "@Repository adds exception translation — plain @Component on a repository misses this"
        ],
        "checkpoint": [
          "Why is constructor injection preferred over field injection?",
          "What happens when you inject a prototype-scoped bean into a singleton bean?",
          "What is the difference between @Component and @Bean?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Basic Entity Mapping",
            "items": [
              "<code>@Entity</code> marks class as JPA entity. <code>@Table(name='...')</code> overrides table name.",
              "<code>@Id</code> marks primary key. <code>@GeneratedValue</code> strategies: IDENTITY (DB auto-increment), SEQUENCE (DB sequence, better for batch), AUTO (JPA decides), TABLE (portable but slow).",
              "<code>@Column(name='...', nullable=false, length=255)</code> — override column name and constraints. Constraints affect schema generation NOT runtime validation.",
              "<code>@Transient</code> — field not persisted. <code>@Lob</code> maps to CLOB/BLOB.",
              "<b>Naming convention:</b> camelCase field → snake_case column by default (SpringPhysicalNamingStrategy). <code>userId</code> → <code>user_id</code>."
            ]
          },
          {
            "heading": "ID Generation",
            "items": [
              "<b>IDENTITY (most common with Postgres/MySQL):</b> DB auto-increment. Hibernate cannot batch inserts — each insert needs round trip for generated ID.",
              "<b>SEQUENCE (best for Postgres):</b> DB sequence. Hibernate fetches ID range in advance (allocationSize=50 default). Enables batch insert.",
              "<b>UUID as ID:</b> globally unique. Random UUIDs fragment B-tree index. Use UUID v7 (time-ordered) or ULID for better index locality.",
              "<b>@UuidGenerator(style=TIME):</b> Hibernate 6+ generates time-ordered UUIDs automatically."
            ]
          }
        ],
        "traps": [
          "@Column(nullable=false) only affects schema generation — use @NotNull for runtime validation",
          "IDENTITY strategy prevents Hibernate batch inserts — use SEQUENCE for write-heavy tables",
          "Random UUID as PK causes B-tree fragmentation — use time-ordered UUID or ULID"
        ],
        "checkpoint": [
          "What is the difference between @Column(nullable=false) and @NotNull?",
          "Why is SEQUENCE generation strategy better than IDENTITY for batch inserts?",
          "What is the downside of using random UUID as primary key?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Relationship Annotations",
            "items": [
              "<code>@ManyToOne:</code> FK in owning entity. Most common relationship. Default EAGER (problem).",
              "<code>@OneToMany(mappedBy='field'):</code> mappedBy points to @ManyToOne field on child side. Default LAZY.",
              "<code>@OneToOne:</code> FK in either table. Use @PrimaryKeyJoinColumn for shared PK.",
              "<code>@ManyToMany:</code> requires join table via @JoinTable.",
              "<b>Owning side = the side with FK or @JoinTable. Inverse side has mappedBy. Only changes to owning side affect the database.</b>"
            ]
          },
          {
            "heading": "Fetch Types",
            "items": [
              "<b>FetchType.LAZY (default @OneToMany, @ManyToMany):</b> loaded on first access. Better performance when related data not always needed.",
              "<b>FetchType.EAGER (default @ManyToOne, @OneToOne):</b> loaded with parent. Convenient but causes performance issues at scale.",
              "<b>LazyInitializationException:</b> accessing lazy collection after transaction closes. Hibernate session closed. Fix: load within transaction, use DTO, or JOIN FETCH.",
              "<b>Always use LAZY everywhere.</b> Fetch eagerly only for the specific query that needs it."
            ]
          }
        ],
        "traps": [
          "LazyInitializationException — accessing lazy collection after transaction closes",
          "Bidirectional relationship — must update BOTH sides or DB and object graph become inconsistent",
          "@ManyToOne defaults to EAGER — causes unexpected extra queries"
        ],
        "checkpoint": [
          "What is a LazyInitializationException and how do you prevent it?",
          "I have bidirectional @OneToMany/@ManyToOne. I add a child to the parent's list but don't set the parent on the child. What happens in the DB?",
          "Why should you prefer LAZY fetching by default?"
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
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Derived Query Methods",
            "items": [
              "<b>Spring Data auto-generates queries from method names.</b> <code>findByEmail(String email)</code> → SELECT ... WHERE email = ?",
              "<b>Keywords:</b> findBy, countBy, deleteBy. Conditions: And, Or, Between, LessThan, GreaterThan, Like, In, IsNull, OrderBy.",
              "<code>findByFirstNameAndLastName(String first, String last)</code> — AND condition.",
              "<code>findByAgeGreaterThanOrderByNameAsc(int age)</code> — comparison + sort.",
              "<code>findTop3ByOrderByCreatedAtDesc()</code> — top 3 most recent."
            ]
          },
          {
            "heading": "@Query Annotation",
            "items": [
              "<code>@Query(\"SELECT u FROM User u WHERE u.email = :email\")</code> — JPQL. References entity class name, not table name.",
              "<code>@Query(value=\"SELECT * FROM users WHERE email = :email\", nativeQuery=true)</code> — native SQL.",
              "<b>Named parameters:</b> :paramName with @Param(\"paramName\") on method argument.",
              "<code>@Modifying + @Transactional</code> required for UPDATE/DELETE queries. Without @Modifying, Spring throws exception."
            ]
          }
        ],
        "traps": [
          "@Modifying required for update/delete @Query — forgetting it throws InvalidDataAccessApiUsageException",
          "JPQL uses entity class names not table names — common mistake from SQL background",
          "nativeQuery=true returns Object[] not entities unless you use interface projection"
        ],
        "checkpoint": [
          "Write a derived query to find all users with age > 18 ordered by name ascending.",
          "What is wrong with: @Query(\"SELECT * FROM user WHERE id = :id\")?",
          "What annotations do you need for a @Query that updates records?"
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
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Why Criteria API Exists",
            "items": [
              "<b>Problem:</b> @Query strings can't conditionally include/exclude WHERE clauses. Dynamic filters need programmatic query building.",
              "<b>Criteria API = type-safe, programmatic query builder.</b> Build queries as objects instead of strings.",
              "<b>Three core objects:</b> CriteriaBuilder (factory for predicates and expressions), CriteriaQuery (SELECT, WHERE, ORDER BY), Root&lt;T&gt; (the FROM clause, path to entity fields).",
              "<b>Predicate:</b> a WHERE condition. Combined with cb.and(), cb.or(), cb.not()."
            ]
          },
          {
            "heading": "Basic Criteria Query",
            "items": [
              "<code>CriteriaBuilder cb = em.getCriteriaBuilder();</code>",
              "<code>CriteriaQuery&lt;User&gt; cq = cb.createQuery(User.class);</code>",
              "<code>Root&lt;User&gt; user = cq.from(User.class);</code>",
              "<code>cq.select(user).where(cb.equal(user.get(\"email\"), email));</code>",
              "<code>em.createQuery(cq).getResultList();</code>",
              "<b>Verbose but powerful.</b> Spring Specifications wrap this and make it composable."
            ]
          }
        ],
        "traps": [
          "Root.get('fieldName') uses strings — typos cause runtime errors, not compile errors",
          "CriteriaBuilder and CriteriaQuery are not thread-safe — create new instances per query",
          "Criteria API strings are not validated at compile time — use Metamodel or QueryDSL for type safety"
        ],
        "checkpoint": [
          "Why can't you solve dynamic filtering with @Query strings?",
          "What are CriteriaBuilder, CriteriaQuery, and Root — what is each responsible for?",
          "Write a Criteria query that finds users with email matching a parameter."
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
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Optimistic Locking",
            "items": [
              "<b>Problem — lost update:</b> two users read same record, both modify, last write wins — first user's change lost.",
              "<b>@Version field:</b> int, long, or Timestamp. Hibernate adds WHERE version=? to UPDATE. If 0 rows updated (someone else updated) → OptimisticLockException.",
              "<b>Retry:</b> catch OptimisticLockException, re-read, re-apply change, retry. Handle at service layer.",
              "<b>Good for:</b> low-contention scenarios. Web forms where multiple users rarely edit same record simultaneously."
            ]
          },
          {
            "heading": "Pessimistic Locking",
            "items": [
              "<b>@Lock(LockModeType.PESSIMISTIC_WRITE):</b> SELECT ... FOR UPDATE. Others blocked until lock released.",
              "<b>PESSIMISTIC_READ:</b> shared lock — others can read but not write.",
              "<b>Good for:</b> high-contention, financial transactions, inventory — must prevent double-booking.",
              "<b>Downside:</b> reduces concurrency, deadlock risk if multiple resources locked in different order."
            ]
          }
        ],
        "traps": [
          "OptimisticLockException is thrown on transaction commit, not on the update call",
          "Pessimistic lock without timeout — thread waits indefinitely if lock holder dies",
          "@Version field must NEVER be set manually — Hibernate manages it exclusively"
        ],
        "checkpoint": [
          "What is the lost update problem and how does @Version solve it?",
          "When would you choose pessimistic locking over optimistic locking?",
          "Where in the code is OptimisticLockException thrown?"
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
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "How @Transactional Works",
            "items": [
              "<b>@Transactional is AOP proxy-based.</b> Spring wraps your bean in a proxy. The proxy intercepts method calls, begins transaction, calls your method, commits or rolls back.",
              "<b>Self-invocation trap:</b> <code>this.myTransactionalMethod()</code> from within the same bean calls the real method directly — bypasses the proxy. Transaction does NOT start.",
              "<b>@Transactional on private methods:</b> no effect — proxy cannot intercept private methods.",
              "<b>Default rollback rule:</b> rolls back on RuntimeException (unchecked). Does NOT roll back on checked exceptions. Override: <code>rollbackFor=Exception.class</code>."
            ]
          },
          {
            "heading": "Propagation Basics",
            "items": [
              "<b>REQUIRED (default):</b> join existing transaction if present, else create new.",
              "<b>REQUIRES_NEW:</b> always create new transaction. Suspend existing. Commits independently — even if outer rolls back.",
              "<b>SUPPORTS:</b> join if present, non-transactional if not.",
              "<b>MANDATORY:</b> must have existing transaction, throw if none.",
              "<b>NEVER:</b> must NOT have transaction, throw if one exists.",
              "<b>NOT_SUPPORTED:</b> always run non-transactional, suspend existing."
            ]
          }
        ],
        "traps": [
          "Self-invocation bypasses proxy — @Transactional on method called from same class has no effect",
          "Default rollback only on RuntimeException — checked exceptions silently commit",
          "@Transactional on private method has no effect — proxy cannot intercept private methods"
        ],
        "checkpoint": [
          "Why doesn't @Transactional work when you call a transactional method from within the same class?",
          "What is the default rollback rule and how do you change it?",
          "What does REQUIRES_NEW do differently from REQUIRED?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Security Filter Chain",
            "items": [
              "<b>Spring Security = chain of servlet filters.</b> Every HTTP request passes through all configured filters in order.",
              "<b>Key filters:</b> UsernamePasswordAuthenticationFilter (form login), BasicAuthenticationFilter, BearerTokenAuthenticationFilter (JWT/OAuth2).",
              "<b>AuthenticationManager → AuthenticationProvider → UserDetailsService.</b> Standard delegation chain.",
              "<b>SecurityContextHolder:</b> stores Authentication for current thread. ThreadLocal-based. Cleared after request."
            ]
          },
          {
            "heading": "JWT Authentication Flow",
            "items": [
              "<b>Login:</b> credentials → AuthenticationManager → generate JWT → return token.",
              "<b>Subsequent requests:</b> JWT in Authorization: Bearer header → custom filter extracts → validates signature + expiry → creates UsernamePasswordAuthenticationToken → sets in SecurityContextHolder.",
              "<b>Custom JWT filter:</b> extend OncePerRequestFilter. Extract token, validate, create authentication, set in SecurityContextHolder.",
              "<b>JWT claims:</b> sub (user id), iat (issued at), exp (expiry in seconds). Sign with secret (HS256) or private key (RS256)."
            ]
          }
        ],
        "traps": [
          "JWT filter must run BEFORE UsernamePasswordAuthenticationFilter — wrong order fails authentication",
          "SecurityContextHolder is ThreadLocal — @Async methods lose security context, must propagate explicitly",
          "JWT exp claim is in SECONDS not milliseconds — off-by-1000x is a common bug"
        ],
        "checkpoint": [
          "Walk me through the complete Spring Security filter chain for a JWT-authenticated request.",
          "What is SecurityContextHolder and why is it cleared after each request?",
          "What happens if your JWT filter runs AFTER the default authentication filter?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Boot candidate on security.\n\nTOPIC: Spring Boot Security (Block 16)\n\nYOUR ROLE: Reactive Socratic interviewer. High-stakes topic.\n\nAPPROACH: Test security thinking, not just configuration knowledge. Show code or system designs with vulnerabilities — ask to identify and fix. Mix attack scenarios with defensive design.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default springBeginner;
