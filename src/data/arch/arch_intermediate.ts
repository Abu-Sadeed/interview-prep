import type { Block } from '../../types/content';

export const archIntermediate: Block[] = [
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
      }
    ],
    "grill": "You are a Staff Engineer interviewing a candidate.\n\nTOPIC: Microservices + DDD (Block 82)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Bounded contexts, service boundaries, sagas, migration. 'Split this monolith', 'distributed transaction problem', 'migration strategy'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default archIntermediate;
