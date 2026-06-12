import type { Block } from '../types/content';

export const messagingContent: Block[] = [
  {
    "id": 26,
    "phase": "Messaging & Events",
    "chip": "messaging",
    "freq": "high",
    "title": "Kafka — Internals + Production",
    "subtitle": "Log abstraction, consumer groups, delivery semantics, ISR, outbox pattern, tuning",
    "prereqs": [
      20
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
      },
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
      },
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
    "id": 27,
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
      },
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
      },
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
  }
];

export default messagingContent;
