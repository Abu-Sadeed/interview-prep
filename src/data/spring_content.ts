import type { Block } from '../types/content';

export const springContent: Block[] = [
  {
    "id": 9,
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Core — IoC + Bean Lifecycle",
    "subtitle": "Container internals, bean scopes, auto-configuration, @Conditional, extension points",
    "prereqs": [
      7,
      8
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
      },
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
      },
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
    "id": 10,
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Data JPA — Entity Mapping",
    "subtitle": "@Entity, ID generation, @Embedded, @Enumerated, inheritance strategies, schema management",
    "prereqs": [
      9
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
      },
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
      },
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
    "id": 11,
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Data JPA — Relationships",
    "subtitle": "@OneToMany, @ManyToOne, fetch types, cascades, orphanRemoval, N+1 problem and ALL fixes",
    "prereqs": [
      10
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
      },
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
      },
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
    "id": 12,
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Data JPA — Querying",
    "subtitle": "Derived methods, JPQL, native queries, projections, pagination, @Query",
    "prereqs": [
      11
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
      },
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
      },
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
    "id": 13,
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Data JPA — Criteria API + Specifications",
    "subtitle": "CriteriaBuilder, Predicate, Specification pattern, QueryDSL comparison, dynamic filter design",
    "prereqs": [
      12
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
      },
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
      },
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
    "id": 14,
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "med",
    "title": "Spring Data JPA — Advanced",
    "subtitle": "Optimistic/pessimistic locking, @Version, auditing, batch operations, second-level cache",
    "prereqs": [
      13
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
      },
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
      },
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
    "id": 15,
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Boot — @Transactional Deep Dive",
    "subtitle": "Proxy internals, propagation levels, isolation, self-invocation trap, rollback rules, async+transactional",
    "prereqs": [
      9,
      14
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
      },
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
      },
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
    "id": 16,
    "phase": "Spring Ecosystem",
    "chip": "spring",
    "freq": "high",
    "title": "Spring Boot — Security",
    "subtitle": "Filter chain, JWT flow, OAuth2 flows, @PreAuthorize, CORS, CSRF configuration",
    "prereqs": [
      9
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
      },
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
      },
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

export default springContent;
