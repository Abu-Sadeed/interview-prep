import type { Block } from '../types/content';

export const archContent: Block[] = [
  {
    "id": 36,
    "phase": "Architecture & Design",
    "chip": "arch",
    "freq": "high",
    "title": "Design Patterns — Applied to Your Stack",
    "subtitle": "Creational/structural/behavioral patterns mapped to Spring, NestJS, and production code",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Creational Patterns",
            "items": [
              "<b>Singleton:</b> one instance per application. Spring beans are singleton by default. Danger: mutable shared state + threads. Stateless singletons are safe.",
              "<b>Factory Method:</b> subclasses decide which class to instantiate. Spring FactoryBean. When exact type depends on runtime input.",
              "<b>Builder:</b> construct complex objects step-by-step. Lombok @Builder. Avoids telescoping constructors. Immutable objects.",
              "<b>Prototype:</b> clone existing object. Spring prototype scope = new instance per injection. Java: copy constructor preferred over Cloneable."
            ]
          },
          {
            "heading": "Structural Patterns",
            "items": [
              "<b>Proxy:</b> intercept and add behaviour without changing target. Spring AOP (@Transactional, @Cacheable) are proxy-based.",
              "<b>Decorator:</b> add behaviour by wrapping. Chain of decorators. InputStream → BufferedInputStream → GzipInputStream. Adds behaviour, Proxy controls access.",
              "<b>Adapter:</b> make incompatible interfaces work together. Spring MVC HandlerAdapter adapts different controllers.",
              "<b>Facade:</b> simplify complex subsystem with unified interface. Your service layer wrapping multiple repositories is a Facade."
            ]
          },
          {
            "heading": "Behavioral Patterns",
            "items": [
              "<b>Strategy:</b> swap algorithms at runtime. Interface + multiple implementations. Inject different PaymentStrategy.",
              "<b>Observer:</b> notify multiple subscribers. Spring ApplicationEvent + ApplicationEventPublisher.",
              "<b>Chain of Responsibility:</b> pass request through handlers. Spring Security filter chain. NestJS middleware pipeline.",
              "<b>Template Method:</b> algorithm skeleton in base class, steps in subclasses. JdbcTemplate, RestTemplate."
            ]
          }
        ],
        "traps": [
          "Singleton with mutable state = thread-safety bug — stateless singletons only",
          "Decorator vs Proxy: Decorator adds new functionality, Proxy controls access to existing functionality",
          "Observer pattern can cause memory leaks — subscribers not deregistered hold strong references"
        ],
        "checkpoint": [
          "Spring beans are singleton by default. What problem does this cause with mutable state?",
          "What is the difference between Proxy and Decorator patterns? How does Spring use Proxy?",
          "I have a payment service needing Stripe, PayPal, and bank transfer. Which pattern and why?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Pattern Recognition in Your Code",
            "items": [
              "<b>N+1 query anti-pattern:</b> load 100 orders, then load each order's user separately = 101 queries. Fix: JOIN, eager loading, batch loading.",
              "<b>God Object anti-pattern:</b> one class does everything. Break into focused classes with single responsibility.",
              "<b>Anemic Domain Model:</b> service has all logic, entity is just data (getters/setters). Consider rich domain model for complex business logic.",
              "<b>Primitive Obsession:</b> using String for everything (email, phone, currency). Use value objects with validation.",
              "<b>Open/Closed Principle:</b> Strategy + Factory = add new behaviour without modifying existing code. New payment type = new class, not modified switch."
            ]
          },
          {
            "heading": "Concurrency Patterns",
            "items": [
              "<b>Producer-Consumer:</b> BlockingQueue between producers and consumers. Producer blocks when queue full. Consumer blocks when empty. Natural backpressure.",
              "<b>Thread Pool pattern:</b> pre-created threads, task queue. ThreadPoolExecutor. Reuse threads, bounded concurrency.",
              "<b>Read-Write Lock:</b> multiple concurrent readers, exclusive writer. ReentrantReadWriteLock. Read-heavy, write-infrequent data structures.",
              "<b>Immutable Object:</b> thread-safe by design. No shared mutable state. Final fields, no setters, copy-on-mutation."
            ]
          }
        ],
        "traps": [
          "Distributed Monolith anti-pattern: microservices that are tightly coupled, share DB, deploy together — worst of both worlds",
          "Premature optimization: solving performance problems that don't exist yet — profile first",
          "Magic numbers/strings: hardcoded values without meaning — use named constants, enums, or config"
        ],
        "checkpoint": [
          "I have a service class with 12 methods, 800 lines, each method checks 'if type == A do X, if type == B do Y'. What patterns apply? How do you refactor?",
          "What is an Anemic Domain Model? How does it differ from a rich domain model?",
          "Explain Producer-Consumer pattern. How does BlockingQueue implement backpressure?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a candidate.\n\nTOPIC: Design Patterns Applied to Your Stack (Block 36)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Code-level questioning, anti-patterns, refactoring.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 37,
    "phase": "Architecture & Design",
    "chip": "arch",
    "freq": "high",
    "title": "System Design Round",
    "subtitle": "Designing scalable systems, trade-offs, and failure modes from a staff/principal engineer perspective",
    "prereqs": [],
    "tiers": [],
    "grill": "You are a Principal Engineer interviewing a senior candidate.\n\nTOPIC: System Design Round (Block 37)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design Twitter/Facebook/URL shortener. Focus on bottlenecks, cache layers, consistency models, circuit breakers.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 81,
    "phase": "Architecture & Design",
    "chip": "arch",
    "freq": "high",
    "title": "System Design Foundations",
    "subtitle": "Requirements, capacity estimation, bottlenecks, caching, queues, consistency",
    "prereqs": [
      37
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Requirements",
            "items": [
              "<b>Functional requirements:</b> what the system must do. Clarify users, actions, and success criteria.",
              "<b>Non-functional requirements:</b> latency, availability, consistency, durability, security, compliance.",
              "<b>Scope:</b> define what is out of scope before drawing components.",
              "<b>Constraints:</b> team size, budget, legacy systems, regulatory requirements."
            ]
          },
          {
            "heading": "Capacity Estimation",
            "items": [
              "<b>QPS:</b> estimate DAU, requests per user, peak multiplier.",
              "<b>Storage:</b> object size × events per day × retention.",
              "<b>Bandwidth:</b> bytes per response × requests per second.",
              "<b>Back-of-envelope:</b> order-of-magnitude estimates are enough for interviews."
            ]
          }
        ],
        "traps": [
          "Jumping to components before requirements leads to the wrong design",
          "Averaging hides peak traffic and hot keys",
          "Ignoring write amplification underestimates storage and I/O"
        ],
        "checkpoint": [
          "Estimate QPS for a URL shortener with 10M DAU.",
          "What non-functional requirements matter for a payments API?",
          "How do you define scope for a system design interview?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Core Components",
            "items": [
              "<b>Load balancer:</b> distributes traffic and terminates TLS.",
              "<b>Stateless services:</b> scale horizontally behind load balancer.",
              "<b>Cache:</b> reduce read latency and database load. Define invalidation.",
              "<b>Queue:</b> buffer work, smooth bursts, and decouple producers/consumers."
            ]
          },
          {
            "heading": "Bottlenecks",
            "items": [
              "<b>Identify:</b> CPU, memory, disk I/O, network, database locks, external API limits.",
              "<b>Measure:</b> latency percentiles, saturation, error rate, queue depth.",
              "<b>Scale:</b> vertical for simple bottlenecks, horizontal for stateless workloads.",
              "<b>Trade-offs:</b> every scale choice affects cost, complexity, and failure modes."
            ]
          }
        ],
        "traps": [
          "Adding cache without invalidation creates stale data",
          "Horizontal scaling does not help a single database write bottleneck",
          "Queues hide overload but do not remove it"
        ],
        "checkpoint": [
          "Where is the bottleneck in a read-heavy news feed?",
          "How do queues help during traffic spikes?",
          "What metrics reveal cache invalidation problems?"
        ]
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Consistency",
            "items": [
              "<b>Strong consistency:</b> reads see latest write. Higher latency and lower availability under partition.",
              "<b>Eventual consistency:</b> replicas converge over time. Better availability and scale.",
              "<b>Read-your-writes:</b> user sees their own updates immediately.",
              "<b>Consistency model:</b> choose based on user impact and business invariants."
            ]
          },
          {
            "heading": "Failure Modes",
            "items": [
              "<b>Retries:</b> must be bounded and idempotent where side effects exist.",
              "<b>Circuit breakers:</b> stop calling failing dependencies temporarily.",
              "<b>Backpressure:</b> slow producers when consumers or DB cannot keep up.",
              "<b>Graceful degradation:</b> return partial results instead of full outage."
            ]
          }
        ],
        "traps": [
          "Strong consistency everywhere is usually too expensive",
          "Unbounded retries amplify outages",
          "Eventual consistency needs reconciliation and user-visible expectations"
        ],
        "checkpoint": [
          "Design consistency for a social feed.",
          "How do you prevent retry storms?",
          "What does graceful degradation look like for search?"
        ]
      }
    ],
    "grill": "You are a Principal Engineer interviewing a senior candidate.\n\nTOPIC: System Design Foundations (Block 81)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Requirements, estimation, bottlenecks, caching, queues, consistency. 'Design this from scratch', 'where is the bottleneck', 'choose consistency model'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 82,
    "phase": "Architecture & Design",
    "chip": "arch",
    "freq": "high",
    "title": "Microservices + DDD",
    "subtitle": "Bounded contexts, aggregates, service boundaries, distributed transactions",
    "prereqs": [
      81
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Bounded Contexts",
            "items": [
              "<b>Bounded context:</b> explicit boundary where a domain model has a specific meaning.",
              "<b>Ubiquitous language:</b> terms are shared within a context, not necessarily across the whole company.",
              "<b>Context map:</b> shows relationships: partnership, customer-supplier, conformist, anticorruption layer.",
              "<b>Service boundary:</b> align services with cohesive domain responsibilities."
            ]
          },
          {
            "heading": "Aggregates",
            "items": [
              "<b>Aggregate root:</b> entry point that protects invariants.",
              "<b>Consistency boundary:</b> transactional changes should stay inside one aggregate when possible.",
              "<b>References:</b> other aggregates referenced by ID, not object graph.",
              "<b>Small aggregates:</b> reduce contention and lock duration."
            ]
          }
        ],
        "traps": [
          "Microservices are not just small monoliths connected by HTTP",
          "Splitting by technical layer creates distributed monoliths",
          "Large aggregates cause contention and slow transactions"
        ],
        "checkpoint": [
          "Define bounded contexts for an ecommerce system.",
          "What makes a good aggregate boundary?",
          "Why is splitting by database table dangerous?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Service Communication",
            "items": [
              "<b>Synchronous APIs:</b> simple request/response. Good for immediate decisions, risky for long chains.",
              "<b>Events:</b> decouple services and model domain facts. Prefer for cross-context state changes.",
              "<b>Outbox:</b> publish events reliably after local transaction.",
              "<b>API composition:</b> aggregate read models from multiple services for queries."
            ]
          },
          {
            "heading": "Distributed Transactions",
            "items": [
              "<b>Avoid distributed ACID:</b> it couples availability and operations.",
              "<b>Saga:</b> coordinate long-running workflows with compensation.",
              "<b>Idempotency:</b> retries and duplicate events must be safe.",
              "<b>Eventual consistency:</b> design user flows around convergence."
            ]
          }
        ],
        "traps": [
          "Synchronous call chains create cascading failures",
          "Saga compensation is not automatic rollback",
          "Shared database across services breaks bounded contexts"
        ],
        "checkpoint": [
          "Design communication for order and payment services.",
          "When is a saga better than 2PC?",
          "How do you keep read models eventually consistent?"
        ]
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Evolution",
            "items": [
              "<b>Strangler pattern:</b> migrate functionality incrementally behind facades or gateways.",
              "<b>Anti-corruption layer:</b> translate between old and new domain models.",
              "<b>Contract testing:</b> prevent breaking changes between services.",
              "<b>Data migration:</b> expand/contract schema changes for zero-downtime migration."
            ]
          },
          {
            "heading": "Operations",
            "items": [
              "<b>Observability:</b> trace requests across service boundaries.",
              "<b>Deployment autonomy:</b> teams should deploy without coordinating every release.",
              "<b>Ownership:</b> service team owns code, data, operations, and on-call.",
              "<b>Platform guardrails:</b> CI/CD, service templates, secrets, and observability standards."
            ]
          }
        ],
        "traps": [
          "Big-bang rewrites create high risk and low learning",
          "Contract tests do not replace end-to-end smoke tests",
          "Service ownership without operational ownership creates handoff failures"
        ],
        "checkpoint": [
          "How would you migrate a monolith module to a service?",
          "Design expand/contract migration for a shared table.",
          "What platform guardrails enable autonomous teams?"
        ]
      }
    ],
    "grill": "You are a Staff Engineer interviewing a candidate.\n\nTOPIC: Microservices + DDD (Block 82)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Bounded contexts, service boundaries, sagas, migration. 'Split this monolith', 'distributed transaction problem', 'migration strategy'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default archContent;
