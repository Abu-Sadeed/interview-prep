import type { Block } from '../../types/content';

export const messagingBeginner: Block[] = [
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Core Concepts",
            "items": [
              "<b>Kafka = distributed commit log.</b> Topics are named logs. Producers append. Consumers read from offsets. Reading does NOT delete messages.",
              "<b>Partition key:</b> same key → same partition. Guarantees ordering within a key.",
              "<b>Ordering:</b> guaranteed within partition. NOT across partitions.",
              "<b>Retention:</b> messages kept configurable time (default 7 days). Multiple consumer groups read independently.",
              "<b>Consumer group:</b> each partition assigned to exactly one consumer in group. Max useful consumers = number of partitions."
            ]
          },
          {
            "heading": "Kafka vs Alternatives",
            "items": [
              "<b>Kafka vs RabbitMQ:</b> Kafka = log, high throughput, replay, fan-out. RabbitMQ = queue, complex routing, message deleted on consume, lower per-message latency.",
              "<b>Kafka vs SQS:</b> SQS = fully managed, no ops, max 14-day retention. Kafka = more control, replay, you operate it.",
              "<b>Kafka is overkill when:</b> simple task queue, &lt;1000 msgs/sec, no replay needed, team lacks Kafka ops experience."
            ]
          }
        ],
        "traps": [
          "enable.auto.commit=true with slow processing — offset committed before processing complete = message loss on crash",
          "More consumers than partitions = idle consumers (no partition to assign)",
          "Global ordering requires single partition — kills parallel throughput"
        ],
        "checkpoint": [
          "I have a topic with 4 partitions and 6 consumers in a group. What happens?",
          "What is the risk of enable.auto.commit=true?",
          "How do you ensure all events for a specific user are processed in order?"
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
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "JMS + ActiveMQ",
            "items": [
              "<b>Queue (point-to-point):</b> one consumer per message. Multiple consumers compete (load balanced). Message consumed and deleted.",
              "<b>Topic (pub-sub):</b> every subscriber gets copy. Ephemeral = miss if offline. Durable subscription = broker stores for offline subscriber.",
              "<b>Durability:</b> persistent (survives broker restart) vs non-persistent (fast, lost on restart).",
              "<b>ActiveMQ vs Kafka:</b> traditional broker + complex routing, lower throughput vs log-based + high throughput + replay. Different problem spaces."
            ]
          },
          {
            "heading": "WebSocket Basics",
            "items": [
              "<b>Full-duplex TCP over HTTP upgrade.</b> Server pushes to client at any time.",
              "<b>Handshake:</b> HTTP GET + Upgrade: websocket header → 101 Switching Protocols.",
              "<b>STOMP:</b> messaging protocol over WebSocket. Adds subscribe/send/ack. Spring uses STOMP.",
              "<b>WebSocket vs SSE vs Long Polling:</b> bidirectional → WebSocket. Server-push only → SSE (simpler, auto-reconnect). Legacy → long polling."
            ]
          }
        ],
        "traps": [
          "WebSocket is stateful — load balancer must use sticky sessions or backplane",
          "SSE is unidirectional — server to client only, cannot send from client",
          "STOMP heartbeat required to detect silent disconnections"
        ],
        "checkpoint": [
          "What is the difference between a JMS Queue and a Topic?",
          "Walk me through the WebSocket connection upgrade.",
          "When would you use SSE instead of WebSocket?"
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
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "KRaft + Brokers",
            "items": [
              "<b>KRaft:</b> Kafka metadata stored in Kafka itself, no separate ZooKeeper ensemble.",
              "<b>Controller quorum:</b> KRaft controllers manage metadata and broker membership.",
              "<b>Broker roles:</b> leaders serve partition traffic; followers replicate logs.",
              "<b>Operational benefit:</b> simpler deployment and fewer moving parts than ZooKeeper mode."
            ]
          },
          {
            "heading": "Schema Registry",
            "items": [
              "<b>Registry:</b> stores schema versions and ids. Producers/consumers fetch schemas by id.",
              "<b>Avro/Protobuf:</b> compact binary formats with schema evolution support.",
              "<b>Compatibility:</b> backward, forward, full, none. Choose based on producer/consumer rollout order.",
              "<b>Subject:</b> usually topic-name-value or topic-name-key. Strategy must be consistent."
            ]
          }
        ],
        "traps": [
          "KRaft removes ZooKeeper but not the need for quorum and backups",
          "Schema compatibility mode must match deployment strategy",
          "Consumers cannot decode messages without the correct schema version"
        ],
        "checkpoint": [
          "Why did Kafka move to KRaft?",
          "How does Schema Registry avoid sending full schemas with every message?",
          "What compatibility mode allows old consumers to read new events?"
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
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Event Design",
            "items": [
              "<b>Event:</b> fact that happened. Use past tense: OrderPlaced, PaymentAuthorized.",
              "<b>Command:</b> request to do something. Use imperative: PlaceOrder, AuthorizePayment.",
              "<b>Envelope:</b> id, type, source, occurredAt, correlationId, causationId, schemaVersion, payload.",
              "<b>Immutable events:</b> do not mutate published events. Publish new versioned events instead."
            ]
          },
          {
            "heading": "Outbox Pattern",
            "items": [
              "<b>Outbox table:</b> write domain change and event in the same DB transaction.",
              "<b>Relay:</b> polls outbox and publishes to broker with idempotent publishing.",
              "<b>Benefit:</b> avoids dual-write inconsistency between database and message broker.",
              "<b>Failure:</b> relay retries until event is published and acknowledged."
            ]
          }
        ],
        "traps": [
          "Publishing after DB commit is still a dual-write race",
          "Events should describe facts, not internal implementation details",
          "Outbox relay must be idempotent to avoid duplicate events"
        ],
        "checkpoint": [
          "Difference between event and command?",
          "How does outbox prevent dual-write problems?",
          "What fields belong in an event envelope?"
        ]
      }
    ],
    "grill": "You are a Senior Distributed Systems Engineer interviewing a candidate.\n\nTOPIC: Event-Driven Architecture Patterns (Block 79)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Outbox, saga, idempotency, contracts, retries. 'Dual-write bug', 'saga compensation failure', 'event schema breaks consumers'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default messagingBeginner;
