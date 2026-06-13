import type { Block } from '../../types/content';

export const archBeginner: Block[] = [
  {
    "id": "arch-1",
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
      }
    ],
    "grill": "You are a Senior Engineer interviewing a candidate.\n\nTOPIC: Design Patterns Applied to Your Stack (Block 36)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Code-level questioning, anti-patterns, refactoring.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "arch-2",
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
    "id": "arch-3",
    "phase": "Architecture & Design",
    "chip": "arch",
    "freq": "high",
    "title": "System Design Foundations",
    "subtitle": "Requirements, capacity estimation, bottlenecks, caching, queues, consistency",
    "prereqs": [
      "arch-2"
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
      }
    ],
    "grill": "You are a Principal Engineer interviewing a senior candidate.\n\nTOPIC: System Design Foundations (Block 81)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Requirements, estimation, bottlenecks, caching, queues, consistency. 'Design this from scratch', 'where is the bottleneck', 'choose consistency model'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "arch-4",
    "phase": "Architecture & Design",
    "chip": "arch",
    "freq": "high",
    "title": "Microservices + DDD",
    "subtitle": "Bounded contexts, aggregates, service boundaries, distributed transactions",
    "prereqs": [
      "arch-3"
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
      }
    ],
    "grill": "You are a Staff Engineer interviewing a candidate.\n\nTOPIC: Microservices + DDD (Block 82)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Bounded contexts, service boundaries, sagas, migration. 'Split this monolith', 'distributed transaction problem', 'migration strategy'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default archBeginner;
