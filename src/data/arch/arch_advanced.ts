import type { Block } from '../../types/content';

export const archAdvanced: Block[] = [
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

export default archAdvanced;
