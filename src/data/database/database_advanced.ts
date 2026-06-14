import type { Block } from '../../types/content';

export const databaseAdvanced: Block[] = [
  {
    "id": "database-1",
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "high",
    "title": "PostgreSQL — Data Types + Schema Design",
    "subtitle": "int/bigint/UUID, varchar/text, JSONB, arrays, constraints, NULL semantics, normalization",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Normalization + Anti-Patterns",
            "items": [
              "<b>1NF:</b> atomic columns. <b>2NF:</b> no partial dependencies. <b>3NF:</b> no transitive dependencies.",
              "<b>When to denormalize:</b> read-heavy queries with many joins. Computed summary columns. Materialized views.",
              "<b>EAV (Entity-Attribute-Value):</b> flexible schema anti-pattern. Terrible query performance, no type safety. Use JSONB instead.",
              "<b>Range types:</b> int4range, tsrange, daterange. Supports &amp;&amp; (overlap), @&gt; (containment). For scheduling, reservations, bookings with no-overlap constraints."
            ]
          }
        ],
        "traps": [
          "EAV tables seem flexible but are a query performance nightmare — JSONB is almost always better",
          "Domain types enforce constraints at DML time only — easy to forget they exist during schema evolution",
          "Range type exclusion constraints require GiST index — btree index not sufficient"
        ],
        "checkpoint": [
          "When would you use Postgres array type vs a separate junction table?",
          "Design a hotel reservation schema that prevents double-booking at DB level.",
          "What is wrong with EAV (Entity-Attribute-Value) pattern? What should you use instead?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: PostgreSQL Data Types + Schema Design (Block 20)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Schema design decisions — type choice correctness, performance implications, constraint thinking. 'Design this schema', 'what data type', 'what constraint prevents this bug'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "database-2",
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "high",
    "title": "PostgreSQL — Query Engine + Indexing",
    "subtitle": "MVCC, B-tree/GIN/BRIN, composite/partial indexes, EXPLAIN ANALYZE, query planner",
    "prereqs": [
      "database-1"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "40 min",
        "sections": [
          {
            "heading": "Query Planner + Production Tuning",
            "items": [
              "<b>Cost model:</b> seq_page_cost=1.0 (reference), random_page_cost=4.0 (HDD). For SSD: set random_page_cost=1.1 — critical for index usage.",
              "<b>Statistics:</b> pg_statistic — column histograms, most common values. ANALYZE updates. Stale stats = bad plans.",
              "<b>effective_cache_size:</b> hint to planner about available OS cache. Set to 75% of RAM.",
              "<b>work_mem:</b> memory per sort/hash operation. Increase for sort-heavy queries. Careful: used multiple times per query × active connections.",
              "<b>autovacuum tuning:</b> lower autovacuum_vacuum_scale_factor for large tables (default 0.2 = 20% dead tuples before vacuum — too high for big tables)."
            ]
          }
        ],
        "traps": [
          "random_page_cost=4.0 on SSD causes planner to prefer seq scans — always set to 1.1 on SSD",
          "work_mem is per sort operation not per connection — 100 connections × 3 sorts = 300 × work_mem total",
          "autovacuum_vacuum_scale_factor=0.2 on 100M row table = 20M dead tuples before vacuum — way too high"
        ],
        "checkpoint": [
          "What is random_page_cost and what should you set for SSD-backed Postgres?",
          "How does work_mem affect performance and what is the risk of setting it too high?",
          "I have a 500GB table with frequent UPDATEs. What autovacuum tuning do you apply?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend Postgres candidate.\n\nTOPIC: PostgreSQL Query Engine + Indexing (Block 21)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: EXPLAIN ANALYZE reading, index design decisions, MVCC production implications. 'Query is slow, here is the EXPLAIN output' — diagnose and fix. Index design with trade-offs.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "database-3",
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "med",
    "title": "PostgreSQL — Advanced + Production",
    "subtitle": "VACUUM, table bloat, partitioning, row locking, replication, connection pooling",
    "prereqs": [
      "database-2"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Replication + TXID Wraparound",
            "items": [
              "<b>Streaming replication (physical):</b> byte-level WAL. Replica is exact copy. Read replicas, failover.",
              "<b>Logical replication:</b> row-level changes. Table-selective. Cross-version. For zero-downtime upgrades, CDC (Debezium).",
              "<b>TXID wraparound:</b> 32-bit transaction IDs. After ~2 billion, wraps. VACUUM FREEZE prevents this. Monitor datfrozenxid age.",
              "<b>Long-running transactions block VACUUM</b> — always set statement_timeout and idle_in_transaction_session_timeout.",
              "<b>Replication slot lag:</b> if replica is down, slot accumulates WAL → fills primary disk. Monitor slot lag."
            ]
          }
        ],
        "traps": [
          "Logical replication doesn't replicate DDL — schema migrations must be applied to both sides",
          "Replication slot accumulates WAL when replica is down — can fill primary disk",
          "TXID wraparound causes data corruption if not caught — monitor datfrozenxid age religiously"
        ],
        "checkpoint": [
          "What is the difference between physical and logical replication? When do you use each?",
          "What is TXID wraparound and what failure does it prevent?",
          "Your Postgres primary disk is filling up with WAL. What is the likely cause?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend Postgres candidate.\n\nTOPIC: PostgreSQL Advanced + Production (Block 22)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production incidents — 'disk full with WAL', 'job queue has race conditions', 'replica 10 minutes behind', 'VACUUM FULL caused outage'. Diagnose and fix.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "database-4",
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "high",
    "title": "Redis — Internals + Production Patterns",
    "subtitle": "Data structures, persistence, eviction, cluster, distributed lock, rate limiter, pub/sub vs streams",
    "prereqs": [
      "database-1"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "40 min",
        "sections": [
          {
            "heading": "Redis Cluster + Lua",
            "items": [
              "<b>Hash slots:</b> 16384 slots. CRC16 of key → slot. Slots assigned to master nodes.",
              "<b>Hot key problem:</b> one key → one shard → bottleneck. Fix: key sharding (append {0..N}, read random shard), local in-memory cache.",
              "<b>Multi-key commands:</b> MGET/MSET only work when all keys on same shard. Use hash tags {prefix} to force same slot.",
              "<b>Async replication:</b> master failover can lose recent writes. Not for data you cannot afford to lose.",
              "<b>Lua scripts (EVAL):</b> entire script atomic. No other commands run between Lua lines. For compound atomic operations.",
              "<b>MULTI/EXEC:</b> queue commands, execute atomically. No conditional logic on intermediate results. WATCH for optimistic locking."
            ]
          }
        ],
        "traps": [
          "MULTI/EXEC is NOT rollback-capable — runtime errors in EXEC don't abort other commands",
          "Lua scripts block Redis — long-running scripts starve all other commands. Keep scripts short.",
          "WATCH only works in same connection — connection pooling breaks WATCH-based optimistic locking"
        ],
        "checkpoint": [
          "What is the hot key problem in Redis Cluster and how do you solve it?",
          "What is the difference between MULTI/EXEC and Lua scripts for atomicity in Redis?",
          "Implement atomic inventory reservation: check stock > 0, decrement, return success/failure."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: Redis Internals + Production (Block 23)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design problems ('build X with Redis') + production scenarios ('Redis master fails mid-lock operation') + internals ('what makes LPUSH multiple elements surprising').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "database-5",
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "med",
    "title": "Elasticsearch — Search Internals",
    "subtitle": "Inverted index, shards/replicas, mapping, BM25 scoring, write path, production issues",
    "prereqs": [
      "database-1"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "40 min",
        "sections": [
          {
            "heading": "Write Path + Production",
            "items": [
              "<b>Write path:</b> document → primary shard → translog (durability) + memory buffer → refresh (1s default) → segment → searchable.",
              "<b>Near-real-time:</b> default 1s refresh interval. Not real-time. Increase for bulk indexing.",
              "<b>Segments:</b> immutable. Merging reduces count. Force merge on read-only indices only.",
              "<b>Heap sizing:</b> max 30-32GB (compressed OOP limit). Never &gt;50% of RAM — OS file cache needed.",
              "<b>split-brain:</b> two masters. Prevented by minimum_master_nodes (ES 6-) or auto in ES 7+.",
              "<b>Scroll vs search_after:</b> scroll holds PIT in memory. search_after is stateless — preferred for deep pagination."
            ]
          }
        ],
        "traps": [
          "Scroll holds point-in-time snapshot in memory — too many concurrent scrolls = OOM",
          "Force merge on active write index blocks indexing — only on read-only/historical indices",
          "fielddata on text fields loads into JVM heap — causes OOM, use keyword fields instead"
        ],
        "checkpoint": [
          "I need to paginate through 500K results. What is wrong with from/size and what should I use?",
          "Elasticsearch JVM heap at 90%. What are the top causes and how do you diagnose?",
          "Explain the ES write path from document to searchable."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend Elasticsearch candidate.\n\nTOPIC: Elasticsearch Internals (Block 24)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix query design ('how do you build this search'), mapping decisions, and production problems ('JVM at 90%, diagnose it').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "database-6",
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "med",
    "title": "Cassandra + ScyllaDB — Distribution Model",
    "subtitle": "Cassandra and ScyllaDB wide-column model, consistent hashing, replication, write path, compaction, anti-patterns",
    "prereqs": [
      "database-1"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Advanced Patterns + Anti-Patterns",
            "items": [
              "<b>Time-bucketed partition keys:</b> PK=(device_id, month) prevents unbounded partition growth.",
              "<b>Lightweight Transactions (LWT):</b> IF NOT EXISTS, IF condition. Paxos-based. ~4x slower. Single partition only.",
              "<b>Materialized Views:</b> auto-maintained denormalized table. Hidden write amplification. Manual denormalization often better.",
              "<b>Wide row anti-pattern:</b> storing all events forever under one partition key. Partition grows infinitely. Fix: time-bucket the partition key."
            ]
          }
        ],
        "traps": [
          "Materialized views have hidden write amplification — each base write also writes to all MVs",
          "LWT is not composable across partitions — no multi-partition atomic operations",
          "Time-bucketed keys require app awareness — queries spanning buckets need multiple queries"
        ],
        "checkpoint": [
          "I'm storing user events in Cassandra. After 6 months partitions are huge and queries slow. What's wrong and how to fix?",
          "When would you use a Lightweight Transaction? What is the performance cost?",
          "How does Cassandra guarantee write durability?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Cassandra candidate.\n\nTOPIC: Cassandra Distribution Model (Block 25)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Data modeling scenarios + production operations + consistency level decisions. 'Design this for Cassandra', 'tombstones show 50K per query — diagnose it'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "database-7",
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "high",
    "title": "Database Transactions + Isolation",
    "subtitle": "ACID, isolation levels, locking, deadlocks, lost updates",
    "prereqs": [
      "database-1"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Concurrency Control",
            "items": [
              "<b>MVCC:</b> readers see snapshots while writers create new row versions.",
              "<b>Serializable snapshot isolation:</b> detects dangerous read/write patterns instead of blocking everything.",
              "<b>Advisory locks:</b> application-level locks for business invariants not expressible as row locks.",
              "<b>Outbox:</b> keep domain write and event publish in one transaction when cross-system consistency matters."
            ]
          },
          {
            "heading": "Distributed Limits",
            "items": [
              "<b>2PC:</b> coordinates multiple resources. Correct but blocking and operationally complex.",
              "<b>Saga:</b> compensating transactions for long-running workflows.",
              "<b>Idempotency keys:</b> make retries safe across network failures.",
              "<b>Eventual consistency:</b> accept temporary divergence with reconciliation and observability."
            ]
          }
        ],
        "traps": [
          "Distributed transactions hide availability problems until production",
          "Advisory locks are only respected by code that uses them",
          "Saga compensation must be idempotent and safe to retry"
        ],
        "checkpoint": [
          "When is 2PC worth the operational cost?",
          "Design a saga for order fulfillment.",
          "How do you make retries safe across service boundaries?"
        ]
      }
    ],
    "grill": "You are a Senior Backend Engineer interviewing a candidate.\n\nTOPIC: Database Transactions + Isolation (Block 75)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Concurrency bugs, isolation trade-offs, locking, and distributed consistency. 'Lost update in checkout', 'deadlocks under load', 'choose isolation level'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "database-8",
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "med",
    "title": "Cassandra + ScyllaDB Production",
    "subtitle": "Scylla architecture, shard-aware drivers, compaction, tuning differences",
    "prereqs": [
      "database-6"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "Production Operations",
            "items": [
              "<b>Repair:</b> anti-entropy repair keeps replicas consistent. Automate and monitor.",
              "<b>Backpressure:</b> monitor coordinator CPU, shard queue depth, and dropped mutations.",
              "<b>Hot partitions:</b> shard imbalance causes one core to bottleneck the node.",
              "<b>Upgrades:</b> test driver and protocol compatibility before rolling upgrades."
            ]
          },
          {
            "heading": "Failure Modes",
            "items": [
              "<b>Hinted handoff limits:</b> missed hints require repair after long outages.",
              "<b>Consistency mismatch:</b> RF, CL, and DC topology must align with availability goals.",
              "<b>Compaction backlog:</b> causes write stalls and high read amplification.",
              "<b>Observability:</b> per-shard metrics are essential for Scylla debugging."
            ]
          }
        ],
        "traps": [
          "Cluster-level metrics hide per-shard hot spots",
          "Repair is not optional in multi-node deployments",
          "Changing consistency levels without understanding RF can reduce guarantees"
        ],
        "checkpoint": [
          "How do you detect a hot partition in Scylla?",
          "What causes compaction backlog and how do you recover?",
          "Design repair and monitoring for a multi-DC cluster."
        ]
      }
    ],
    "grill": "You are a Senior Database Engineer interviewing a candidate.\n\nTOPIC: Cassandra + ScyllaDB Production (Block 76)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Scylla architecture, compaction, shard-aware drivers, production tuning. 'One shard is hot', 'tombstones slow reads', 'choose compaction strategy'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "database-9",
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "med",
    "title": "Elasticsearch Query Design",
    "subtitle": "Relevance tuning, analyzers, synonyms, filtering, aggregations",
    "prereqs": [
      "database-5"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Aggregations",
            "items": [
              "<b>Terms aggregation:</b> top categories, facets, buckets. Limit shard_size and size.",
              "<b>Nested aggregations:</b> combine filters, date histograms, metrics, and sub-buckets.",
              "<b>Composite aggregation:</b> paginate large aggregation results safely.",
              "<b>Cardinality:</b> approximate unique counts with HLL. Not exact."
            ]
          },
          {
            "heading": "Production Query Design",
            "items": [
              "<b>Request cache:</b> helps repeated filter-heavy searches, not highly variable text queries.",
              "<b>Search after:</b> deep pagination without from/size cost.",
              "<b>Point-in-time:</b> consistent view for scroll-like workflows.",
              "<b>A/B relevance:</b> measure click-through, conversion, and zero-result rate."
            ]
          }
        ],
        "traps": [
          "Large aggregations can exhaust heap",
          "from/size deep pagination scans many documents",
          "Relevance tuning without product metrics is guesswork"
        ],
        "checkpoint": [
          "Design faceted search with category, price range, and sort.",
          "How do you paginate 1 million aggregation buckets?",
          "What metrics prove search relevance improved?"
        ]
      }
    ],
    "grill": "You are a Senior Search Engineer interviewing a candidate.\n\nTOPIC: Elasticsearch Query Design (Block 77)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Search relevance, mapping, analyzers, aggregations. 'Products don't rank correctly', 'facet aggregation OOM', 'design synonym strategy'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default databaseAdvanced;
