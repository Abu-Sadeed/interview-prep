import type { Block } from '../../types/content';

export const messagingAdvanced: Block[] = [
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
        "level": "Advanced",
        "time": "40 min",
        "sections": [
          {
            "heading": "Performance + Log Compaction",
            "items": [
              "<b>Producer batching:</b> linger.ms + batch.size. Higher linger = higher throughput, higher latency.",
              "<b>Compression:</b> snappy (fast, moderate), lz4 (fastest), gzip (best ratio, CPU cost). Compress at producer.",
              "<b>max.poll.records + max.poll.interval.ms:</b> process too many records → exceed poll interval → consumer kicked from group.",
              "<b>Log compaction:</b> keep only latest value per key. For changelog topics, event-sourced state.",
              "<b>Cooperative rebalancing (Kafka 2.4+):</b> only reassigns necessary partitions. Reduces processing pause vs eager rebalancing."
            ]
          }
        ],
        "traps": [
          "Log compaction doesn't guarantee delivery order for non-key messages — compaction only affects per-key retention",
          "Consumer kicked from group: max.poll.records too high → processing takes too long → exceeds max.poll.interval.ms",
          "Kafka Streams state is local to consumer — if consumer moves hosts, state must rebuild from changelog topic"
        ],
        "checkpoint": [
          "What is log compaction? When would you use it over regular retention?",
          "A consumer keeps getting kicked from the consumer group. What are the likely causes and fixes?",
          "Explain cooperative rebalancing and why it's better than eager rebalancing."
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Production WebSocket + Nginx",
            "items": [
              "<b>Nginx WebSocket config:</b> proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'. Without this: 60s timeout, silent drop.",
              "<b>Memory per connection:</b> ~1-10KB. 100K connections ≈ 1GB. Plan accordingly.",
              "<b>Authentication:</b> JWT in first message or URL param (not Authorization header — browser WebSocket API doesn't allow custom headers).",
              "<b>Graceful shutdown:</b> send close frame to all clients. Allow drain period."
            ]
          }
        ],
        "traps": [
          "WebSocket behind Nginx without upgrade headers = silent connection drop after 60s",
          "WebSocket auth via custom header not supported in browser — use token in URL param (HTTPS only) or first-message auth",
          "WebSocket connection counting: each connection = file descriptor — check ulimit before scaling"
        ],
        "checkpoint": [
          "What Nginx configuration is required for WebSocket proxying and what breaks without it?",
          "How do you authenticate a WebSocket connection? What are the browser constraints?",
          "Design a presence system (online/offline indicators) for a chat app with 1M concurrent users."
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Monitoring",
            "items": [
              "<b>Consumer lag:</b> track per consumer group and partition, not only cluster average.",
              "<b>Under-replicated partitions:</b> early warning for broker or network issues.",
              "<b>Request latency:</b> produce/fetch latency by broker and topic.",
              "<b>Controller health:</b> active controller, quorum latency, metadata operation latency."
            ]
          },
          {
            "heading": "Operations",
            "items": [
              "<b>Partition reassignment:</b> move partitions deliberately with throttling.",
              "<b>Retention policies:</b> balance replay window, storage cost, and compliance.",
              "<b>Security:</b> ACLs per topic/group, TLS between clients and brokers, audit changes.",
              "<b>Disaster recovery:</b> mirror maker, backup topics, and documented replay procedures."
            ]
          }
        ],
        "traps": [
          "Average consumer lag hides one hot partition",
          "Reassignment without throttling can destabilize the cluster",
          "ACLs must cover both topic access and consumer group membership"
        ],
        "checkpoint": [
          "Design Kafka monitoring for a critical payments topic.",
          "How do you safely rebalance partitions?",
          "What is your disaster recovery plan for Kafka?"
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Reliability Architecture",
            "items": [
              "<b>Exactly-once perception:</b> achieved with idempotent writes, dedup tables, and transactional outbox.",
              "<b>Event versioning:</b> schemaVersion plus additive evolution and deprecation windows.",
              "<b>Replay:</b> design consumers to be replayable from old events.",
              "<b>Observability:</b> trace event flow across services with correlation and causation IDs."
            ]
          },
          {
            "heading": "Failure Modes",
            "items": [
              "<b>Partial failure:</b> some saga steps succeed, others fail. Compensation must handle partial state.",
              "<b>Out-of-order delivery:</b> design consumers to ignore stale events or enforce per-key ordering.",
              "<b>Schema drift:</b> detect incompatible schemas before production deploy.",
              "<b>Backpressure:</b> slow consumers must not overwhelm producers or databases."
            ]
          }
        ],
        "traps": [
          "Exactly-once is a system property, not a single broker setting",
          "Out-of-order events break naive event-sourced projections",
          "Replay requires consumers to be idempotent and side-effect safe"
        ],
        "checkpoint": [
          "Design a replayable event-driven order system.",
          "How do you handle out-of-order events?",
          "What makes saga compensation correct?"
        ]
      }
    ],
    "grill": "You are a Senior Distributed Systems Engineer interviewing a candidate.\n\nTOPIC: Event-Driven Architecture Patterns (Block 79)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Outbox, saga, idempotency, contracts, retries. 'Dual-write bug', 'saga compensation failure', 'event schema breaks consumers'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default messagingAdvanced;
