import type { Block } from '../../types/content';

export const databaseBeginner: Block[] = [
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Numeric + Text Types",
            "items": [
              "<b>smallint (2B):</b> -32768 to 32767. Rare. <b>integer (4B):</b> ~2.1B. For most IDs. <b>bigint (8B):</b> for high-volume IDs, timestamps, counters.",
              "<b>GENERATED ALWAYS AS IDENTITY:</b> SQL standard auto-increment. Prefer over serial (legacy).",
              "<b>numeric(precision, scale):</b> exact decimal. For money. Slower than float.",
              "<b>varchar(n) vs text:</b> no performance difference in Postgres. Both use TOAST for long values. Use text unless you want DB-enforced length limit.",
              "<b>timestamptz (timestamp with time zone):</b> stores UTC, displays in session timezone. ALWAYS use over timestamp. Prevents timezone confusion."
            ]
          },
          {
            "heading": "Constraints + NULL",
            "items": [
              "<b>PRIMARY KEY:</b> unique + not null. Auto B-tree index.",
              "<b>FOREIGN KEY:</b> ON DELETE CASCADE / SET NULL / RESTRICT / NO ACTION.",
              "<b>UNIQUE constraint:</b> CREATE UNIQUE INDEX or inline UNIQUE. Can span multiple columns.",
              "<b>CHECK constraint:</b> CHECK(age &gt;= 0 AND age &lt; 150). Domain rules at DB level.",
              "<b>NULL semantics:</b> NULL = unknown. NULL != NULL. NULL comparisons return NULL. Use IS NULL / IS NOT NULL.",
              "<b>Multiple NULLs in UNIQUE column:</b> allowed in Postgres — NULLs are considered distinct."
            ]
          }
        ],
        "traps": [
          "integer overflow at ~2.1B — high-traffic serial ID columns can overflow, use bigint from the start",
          "timestamp (no timezone) stores without TZ info — bugs when app/DB server timezones differ",
          "Multiple NULL values satisfy UNIQUE constraint — if you need at most one NULL, use partial unique index"
        ],
        "checkpoint": [
          "Should you use integer or bigint for a user_id? What factors decide?",
          "What is the difference between timestamp and timestamptz? Which should you always use?",
          "When would you use numeric instead of double precision?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "How Postgres Reads Data",
            "items": [
              "<b>Sequential scan:</b> reads all table pages. O(n). Preferred for small tables or when returning &gt;15-20% of rows.",
              "<b>Index scan:</b> B-tree lookup → heap fetch. Good for selective queries.",
              "<b>Index-only scan:</b> all needed columns in index. No heap access. Fastest.",
              "<b>Bitmap scan:</b> builds bitmap of matching pages, scans those. For medium-selectivity or OR conditions.",
              "<b>When Postgres ignores your index:</b> low selectivity, small table, stale statistics, wrong data type comparison."
            ]
          },
          {
            "heading": "B-Tree Index",
            "items": [
              "<b>Default type.</b> Supports: =, &lt;, &gt;, BETWEEN, IN, LIKE 'prefix%', ORDER BY.",
              "<b>LIKE '%suffix%' does NOT use B-tree</b> — only 'prefix%' works.",
              "<b>Function calls defeat index:</b> WHERE LOWER(email) = 'x' — won't use index on email. Create index on LOWER(email) instead.",
              "<b>Postgres does NOT auto-index foreign keys</b> — create them manually or FK lookups cause seq scans."
            ]
          }
        ],
        "traps": [
          "Postgres doesn't auto-index FK columns — must create manually",
          "LIKE '%suffix%' doesn't use B-tree — only 'prefix%' works",
          "Function on indexed column defeats index: WHERE LOWER(col) uses index only if index is on LOWER(col)"
        ],
        "checkpoint": [
          "I have a query with email = 'x'. There's an index on email. Why might Postgres still do a seq scan?",
          "What is an index-only scan and when does it happen?",
          "Should you always index a foreign key column? Why or why not?"
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
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "VACUUM + Bloat",
            "items": [
              "<b>Dead tuples:</b> MVCC creates dead row versions on every UPDATE/DELETE. Without VACUUM, table grows indefinitely.",
              "<b>VACUUM:</b> marks dead tuple space as reusable. Non-blocking. Does NOT return space to OS.",
              "<b>VACUUM FULL:</b> rewrites entire table, returns space to OS. EXCLUSIVE LOCK — blocks all access. Avoid in production.",
              "<b>AUTOVACUUM:</b> background process. Always keep enabled.",
              "<b>Table bloat:</b> tables using more disk than data warrants. Monitor with pgstattuple extension."
            ]
          },
          {
            "heading": "Connection Pooling",
            "items": [
              "<b>Postgres spawns OS process per connection (~5-10MB).</b> 500 connections = 500 processes.",
              "<b>PgBouncer:</b> most popular pooler. Session mode (no benefit), Transaction mode (most common), Statement mode (breaks transactions).",
              "<b>Transaction mode breaks:</b> LISTEN/NOTIFY, advisory locks, prepared statements, SET LOCAL.",
              "<b>HikariCP (Spring Boot default):</b> in-process JDBC pool. Size = core_count * 2 + effective_spindle_count."
            ]
          }
        ],
        "traps": [
          "VACUUM FULL locks table exclusively — causes production outage",
          "PgBouncer transaction mode breaks LISTEN/NOTIFY and advisory locks — know the limitations",
          "Autovacuum not keeping up with write rate = growing bloat — needs manual vacuum or tuning"
        ],
        "checkpoint": [
          "What is the difference between VACUUM and VACUUM FULL? Which is safe in production?",
          "PgBouncer transaction mode — what are three things that break?",
          "How does autovacuum decide when to vacuum a table?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Why Redis is Fast",
            "items": [
              "<b>In-memory:</b> RAM ~100ns vs disk ~10ms. 100x faster baseline.",
              "<b>Single-threaded command processing:</b> no locking overhead. Atomic by default. I/O multi-threaded in Redis 6+.",
              "<b>Simple data structures:</b> O(1) string get/set, O(log n) sorted set operations.",
              "<b>Pipelining:</b> batch commands, reduces round-trips."
            ]
          },
          {
            "heading": "Data Structures + Use Cases",
            "items": [
              "<b>String:</b> cache, counters (INCR atomic), session tokens, distributed locks.",
              "<b>List:</b> LPUSH/RPUSH + LPOP/RPOP. Task queues, activity feeds.",
              "<b>Hash:</b> HSET/HGET. Object storage — user profile fields.",
              "<b>Set:</b> unique members. Tags, unique visitors, social connections.",
              "<b>Sorted Set (ZSet):</b> members + scores. Leaderboards, rate limiting, priority queues.",
              "<b>HyperLogLog:</b> approximate unique count. ~0.81% error. Fixed 12KB memory. Count unique visitors without storing each."
            ]
          }
        ],
        "traps": [
          "INCR is atomic but INCR + GET is NOT — use Lua for atomic compound operations",
          "LPUSH multiple elements pushes in reverse order — LPUSH list a b c results in [c, b, a]",
          "SET with EX and separate EXPIRE are not atomic — use SET key value EX seconds NX"
        ],
        "checkpoint": [
          "Build a real-time leaderboard for 1M game players. Which structure and which commands?",
          "What is HyperLogLog and when do you use it over a Set?",
          "Why is Redis single-threaded yet still fast?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Inverted Index",
            "items": [
              "<b>Inverted index:</b> maps terms to documents. 'apple' → [doc1, doc5]. Enables O(1) term lookup.",
              "<b>Text analysis pipeline:</b> raw text → tokenizer → token filters (lowercase, stop words, stemming) → terms stored.",
              "<b>Standard analyzer:</b> tokenize on whitespace/punctuation + lowercase + stop words.",
              "<b>Why faster than SQL LIKE:</b> LIKE '%word%' scans every row. ES looks up term in index instantly."
            ]
          },
          {
            "heading": "Index Structure",
            "items": [
              "<b>Index:</b> logical namespace. Like a table.",
              "<b>Shard:</b> each index split into N primary shards. Each shard is independent Lucene index. Data distributed across nodes.",
              "<b>Replica:</b> copy of primary shard. Handles reads. Failover.",
              "<b>Primary shard count fixed at creation</b> — cannot change without reindexing. Over-sharding = overhead (~20-40GB per shard is healthy)."
            ]
          }
        ],
        "traps": [
          "Primary shard count cannot be changed after index creation — plan carefully",
          "Too many small shards causes overhead — each shard has JVM memory cost",
          "Replica count can be changed anytime — set to 0 during bulk indexing for speed"
        ],
        "checkpoint": [
          "Explain how an inverted index enables fast full-text search.",
          "What is a shard? Why can't you change primary shard count after creation?",
          "What is the role of a replica shard?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Data Model",
            "items": [
              "<b>Design tables around queries.</b> Every query pattern needs its own table.",
              "<b>Partition key:</b> determines which node. High-cardinality. Always in WHERE clause.",
              "<b>Clustering key:</b> sort order within partition. Range queries on clustering columns are fast.",
              "<b>Example:</b> messages: PK=(conversation_id), CK=(sent_at DESC). 'Get last 50 messages for conversation X' = perfect fit."
            ]
          },
          {
            "heading": "When to Choose Cassandra",
            "items": [
              "<b>Choose Cassandra:</b> massive write throughput, time-series, multi-DC active-active, linear horizontal scale.",
              "<b>Do NOT choose:</b> ad-hoc queries, JOINs, ACID transactions across partitions, small datasets.",
              "<b>AP system:</b> favors availability over consistency under network partition.",
              "<b>ALLOW FILTERING = full cluster scan.</b> Never in production."
            ]
          }
        ],
        "traps": [
          "ALLOW FILTERING = full distributed scan across all nodes — extremely expensive",
          "Secondary indexes in Cassandra are LOCAL — querying hits every node",
          "Cassandra is AP — returns stale data under partition rather than failing"
        ],
        "checkpoint": [
          "Design a Cassandra table for IoT readings (device_id, timestamp, temperature). What is the partition key?",
          "What is ALLOW FILTERING and why should you avoid it?",
          "When would Cassandra be the wrong choice?"
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
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "ACID",
            "items": [
              "<b>Atomicity:</b> transaction commits all changes or none. Partial failure rolls back.",
              "<b>Consistency:</b> database moves from one valid state to another. Constraints enforce invariants.",
              "<b>Isolation:</b> concurrent transactions do not corrupt each other's view.",
              "<b>Durability:</b> committed data survives crashes after WAL/redo flush."
            ]
          },
          {
            "heading": "Lost Updates",
            "items": [
              "<b>Lost update:</b> two transactions read the same value, both modify, last write wins.",
              "<b>Optimistic locking:</b> version column detects stale writes.",
              "<b>Pessimistic locking:</b> SELECT FOR UPDATE prevents concurrent modification.",
              "<b>Idempotency:</b> retry-safe operations reduce duplicate-write risk."
            ]
          }
        ],
        "traps": [
          "ACID applies per database transaction, not across unrelated services",
          "Long transactions increase lock duration and bloat",
          "Retrying a non-idempotent write can duplicate side effects"
        ],
        "checkpoint": [
          "Explain lost update with two concurrent balance updates.",
          "When do you choose optimistic vs pessimistic locking?",
          "What does durability require from the storage engine?"
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "ScyllaDB Basics",
            "items": [
              "<b>ScyllaDB:</b> Cassandra-compatible NoSQL database written in C++ for lower latency and higher throughput.",
              "<b>Shared-nothing architecture:</b> each CPU core owns memory, shards, and compaction work.",
              "<b>Compatibility:</b> CQL, drivers, and data model map closely to Cassandra.",
              "<b>Operational model:</b> still tune partitions, consistency levels, compaction, and repair."
            ]
          },
          {
            "heading": "Shard-Aware Drivers",
            "items": [
              "<b>Shard-aware driver:</b> sends requests directly to the shard owning the token range.",
              "<b>Benefit:</b> avoids cross-shard forwarding and reduces CPU overhead.",
              "<b>Connection pools:</b> maintain connections per shard when supported.",
              "<b>Driver config:</b> match load balancing and consistency settings to cluster topology."
            ]
          }
        ],
        "traps": [
          "Scylla is faster but does not remove bad partition design",
          "Non-shard-aware drivers lose much of Scylla's performance advantage",
          "Repair and compaction still matter in production"
        ],
        "checkpoint": [
          "Why is ScyllaDB Cassandra-compatible but faster?",
          "What does a shard-aware driver change?",
          "How does bad partition design hurt Scylla?"
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Mapping for Search",
            "items": [
              "<b>text vs keyword:</b> text for full-text search, keyword for exact match, sorting, and aggregations.",
              "<b>Multi-fields:</b> name.text for search and name.keyword for sort/agg.",
              "<b>Dynamic mapping:</b> convenient but dangerous at scale. Define mappings explicitly for production indices.",
              "<b>Nested objects:</b> use nested type when arrays of objects must be queried independently."
            ]
          },
          {
            "heading": "Query Structure",
            "items": [
              "<b>match:</b> analyzed full-text query. <b>term:</b> exact keyword query.",
              "<b>bool query:</b> must/should/filter/must_not combine clauses.",
              "<b>filter context:</b> cached yes/no conditions, no scoring.",
              "<b>sort:</b> sort on keyword/numeric/date fields, not analyzed text."
            ]
          }
        ],
        "traps": [
          "Aggregating on text fields requires fielddata and can cause OOM",
          "Dynamic mapping can create mapping explosion",
          "Scoring queries and filters have different performance characteristics"
        ],
        "checkpoint": [
          "Design mapping for product title, category, price, and tags.",
          "When do you use match vs term?",
          "Why put category in filter context?"
        ]
      }
    ],
    "grill": "You are a Senior Search Engineer interviewing a candidate.\n\nTOPIC: Elasticsearch Query Design (Block 77)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Search relevance, mapping, analyzers, aggregations. 'Products don't rank correctly', 'facet aggregation OOM', 'design synonym strategy'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default databaseBeginner;
