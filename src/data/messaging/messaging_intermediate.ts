import type { Block } from '../../types/content';

export const messagingIntermediate: Block[] = [
  {
    "id": "messaging-1",
    "phase": "Messaging & Events",
    "chip": "messaging",
    "freq": "high",
    "title": "Kafka — Internals + Production",
    "subtitle": "Log abstraction, consumer groups, delivery semantics, ISR, outbox pattern, tuning",
    "prereqs": [
      "database-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "50 min",
        "sections": [
          {
            "heading": "Delivery Semantics",
            "items": [
              "<b>At-most-once:</b> commit before processing. Message loss on crash. Lowest latency.",
              "<b>At-least-once:</b> commit after processing. Duplicates on crash. Most common. Requires idempotent consumer.",
              "<b>Exactly-once (EOS):</b> idempotent producer + transactional producer. ~20% throughput cost.",
              "<b>Practical approach:</b> design idempotent consumers with dedup by message ID. Simpler than full EOS."
            ]
          },
          {
            "heading": "Replication + ISR + Outbox",
            "items": [
              "<b>ISR (In-Sync Replicas):</b> replicas fully caught up with leader. acks=all + min.insync.replicas=2 guarantees 2 copies before ack.",
              "<b>Unclean leader election:</b> false = no data loss but possible unavailability. true = available but possible data loss.",
              "<b>Dual-write problem:</b> write to DB AND Kafka. If Kafka fails after DB commit = inconsistency.",
              "<b>Outbox pattern:</b> write event to outbox table in SAME DB transaction. CDC (Debezium) reads WAL, publishes to Kafka. Eliminates dual-write.",
              "<b>Consumer lag:</b> log end offset - committed offset. Alert on lag growth, not just current value."
            ]
          }
        ],
        "traps": [
          "acks=all without min.insync.replicas=2 provides less guarantee than expected",
          "Outbox relay must be idempotent — relay restart may publish same event twice",
          "Kafka transactions (EOS) have 20% throughput cost — measure before applying everywhere"
        ],
        "checkpoint": [
          "Explain the dual-write problem and how the Outbox pattern solves it.",
          "What is the relationship between acks=all and min.insync.replicas?",
          "Walk me through exactly-once semantics end-to-end."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend Kafka candidate.\n\nTOPIC: Kafka Internals + Production (Block 26)\n\nYOUR ROLE: Reactive Socratic interviewer. High-signal topic for senior backend roles.\n\nAPPROACH: Architecture decisions (how to use Kafka for X), production ops (consumer lag growing — diagnose), internals (how does exactly-once work), design traps (dual-write problem).\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "messaging-2",
    "phase": "Messaging & Events",
    "chip": "messaging",
    "freq": "med",
    "title": "ActiveMQ + WebSocket",
    "subtitle": "JMS model, queue vs topic, durability, WebSocket upgrade, STOMP, scaling, DLQ",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Scaling WebSockets",
            "items": [
              "<b>Problem:</b> WebSocket is persistent connection to ONE server. Multiple servers need a backplane.",
              "<b>Redis Pub/Sub backplane:</b> all servers subscribe. Message for user on server B published to Redis → server B delivers.",
              "<b>Connection limits:</b> each WebSocket = one file descriptor. Increase ulimit. Tune TCP keepalive.",
              "<b>Spring WebSocket + STOMP:</b> @MessageMapping, SimpMessagingTemplate, @SendToUser for targeted delivery."
            ]
          },
          {
            "heading": "Dead Letter Queue",
            "items": [
              "<b>DLQ:</b> messages failing after N retries go to Dead Letter Queue. Prevents poison messages blocking queue.",
              "<b>Redelivery policy:</b> max retries + exponential backoff. Prevents storm on retry.",
              "<b>DLQ monitoring:</b> alert on growth. Messages in DLQ = processing failures requiring investigation."
            ]
          }
        ],
        "traps": [
          "Redis Pub/Sub backplane: messages published while subscriber disconnected are lost — use Streams for guaranteed delivery",
          "Missing DLQ configuration = poison messages retry indefinitely, blocking queue",
          "ActiveMQ message selectors evaluated at broker — complex selectors at high throughput impact broker performance"
        ],
        "checkpoint": [
          "3 WebSocket servers behind a load balancer. User on server 1 sends message to user on server 2. How?",
          "What is a Dead Letter Queue and what happens without one?",
          "What makes WebSocket connections hard to scale horizontally?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: ActiveMQ + WebSocket (Block 27)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design decisions, scaling challenges, production gotchas. 'Build real-time chat for 50K concurrent users', 'WebSocket connections drop after 60 seconds in production — diagnose it'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "messaging-3",
    "phase": "Messaging & Events",
    "chip": "messaging",
    "freq": "high",
    "title": "Kafka Operations + Schema Registry",
    "subtitle": "KRaft, schema evolution, Avro/Protobuf, dead-letter topics, monitoring",
    "prereqs": [
      "messaging-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Schema Evolution",
            "items": [
              "<b>Additive changes:</b> add fields with defaults for backward compatibility.",
              "<b>Renaming fields:</b> usually breaking. Prefer aliases or versioned event types.",
              "<b>Deleting fields:</b> can break consumers. Deprecate first, then remove after rollout.",
              "<b>Contract tests:</b> verify producers and consumers agree before deployment."
            ]
          },
          {
            "heading": "Dead-Letter Topics",
            "items": [
              "<b>DLT:</b> topic for messages that cannot be processed after retries.",
              "<b>Envelope:</b> include original key/value, error, stack trace, retry count, and source topic.",
              "<b>Replay:</b> fix consumer, then replay DLT selectively with controls.",
              "<b>Monitoring:</b> alert on DLT growth and poison message patterns."
            ]
          }
        ],
        "traps": [
          "Breaking schema changes require coordinated deployments",
          "DLT without replay tooling becomes operational debt",
          "Schema Registry outage can block producers if caching is insufficient"
        ],
        "checkpoint": [
          "Design a backward-compatible event schema change.",
          "What belongs in a Kafka dead-letter message?",
          "How do you safely replay failed events?"
        ]
      }
    ],
    "grill": "You are a Senior Data Platform Engineer interviewing a candidate.\n\nTOPIC: Kafka Operations + Schema Registry (Block 78)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Kafka operations, schema evolution, DLTs, monitoring. 'Schema change broke consumers', 'DLT growing', 'KRaft migration plan'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "messaging-4",
    "phase": "Messaging & Events",
    "chip": "messaging",
    "freq": "high",
    "title": "Event-Driven Architecture Patterns",
    "subtitle": "Outbox, saga, idempotency, consumer-driven contracts, retry design",
    "prereqs": [
      "messaging-3"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Saga Pattern",
            "items": [
              "<b>Saga:</b> long-running transaction split into local transactions and events.",
              "<b>Orchestration:</b> central coordinator tells participants what to do.",
              "<b>Choreography:</b> services react to events without central coordinator.",
              "<b>Compensation:</b> undo or mitigate previous steps when later step fails."
            ]
          },
          {
            "heading": "Idempotency + Contracts",
            "items": [
              "<b>Idempotency key:</b> deduplicate repeated commands or events by business key.",
              "<b>Consumer-driven contracts:</b> consumers define expected events; providers verify compatibility.",
              "<b>Retry policy:</b> exponential backoff, jitter, max attempts, DLT.",
              "<b>Poison messages:</b> isolate malformed events before they block the queue."
            ]
          }
        ],
        "traps": [
          "Choreography can become hard to trace as services grow",
          "Compensation is not the same as rollback",
          "Retrying without idempotency can duplicate side effects"
        ],
        "checkpoint": [
          "Design an order fulfillment saga.",
          "When choose orchestration vs choreography?",
          "How do consumer-driven contracts prevent breaking changes?"
        ]
      }
    ],
    "grill": "You are a Senior Distributed Systems Engineer interviewing a candidate.\n\nTOPIC: Event-Driven Architecture Patterns (Block 79)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Outbox, saga, idempotency, contracts, retries. 'Dual-write bug', 'saga compensation failure', 'event schema breaks consumers'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default messagingIntermediate;
