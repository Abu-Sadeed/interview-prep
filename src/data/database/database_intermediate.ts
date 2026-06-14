import type { Block } from '../../types/content';

export const databaseIntermediate: Block[] = [
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "UUID + JSONB",
            "items": [
              "<b>UUID:</b> native Postgres type. gen_random_uuid() for v4. Good for distributed systems, no coordination needed.",
              "<b>UUID index fragmentation:</b> random UUIDs cause B-tree page splits → fragmentation → slower inserts. Use UUID v7 (time-ordered), ULID, or bigint for PK.",
              "<b>JSONB:</b> binary JSON. Supports GIN indexing, @&gt; (contains), ? (key exists), -&gt;&gt; (get field). ALWAYS use JSONB over JSON.",
              "<b>JSON vs JSONB:</b> JSON = raw text, no indexing, preserves key order. JSONB = binary, indexed, reordered keys."
            ]
          },
          {
            "heading": "Advanced Schema",
            "items": [
              "<b>Arrays:</b> native Postgres arrays. int[]. GIN indexing. @&gt; (contains), &amp;&amp; (overlap). For tags, permissions.",
              "<b>Postgres enums:</b> storage-efficient. Adding values easy, removing hard. Prefer varchar + CHECK for frequently changing lists.",
              "<b>Materialized view:</b> stored query result. REFRESH MATERIALIZED VIEW CONCURRENTLY (no lock). For expensive aggregations.",
              "<b>Generated columns (Postgres 12+):</b> GENERATED ALWAYS AS expression STORED. Indexed like regular columns."
            ]
          }
        ],
        "traps": [
          "UUID v4 random IDs cause B-tree fragmentation at high insert rates — monitor table/index bloat",
          "REFRESH MATERIALIZED VIEW without CONCURRENTLY locks the view for reads — production outage risk",
          "Postgres enum removing values requires dump/restore — use CHECK constraints for frequently changing lists"
        ],
        "checkpoint": [
          "What is the difference between JSON and JSONB? Why always use JSONB?",
          "Design a product catalog schema where products have different attributes per category. What types do you use?",
          "What is a materialized view and when do you use it?"
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
        "level": "Intermediate",
        "time": "50 min",
        "sections": [
          {
            "heading": "MVCC",
            "items": [
              "<b>MVCC:</b> readers don't block writers, writers don't block readers.",
              "<b>Row versions:</b> xmin (creating transaction) and xmax (deleting transaction). Your transaction sees rows where xmin ≤ your txid AND xmax is null or future.",
              "<b>Dead tuples:</b> old row versions no longer visible. VACUUM reclaims space.",
              "<b>READ_COMMITTED:</b> new snapshot per statement. <b>REPEATABLE_READ:</b> snapshot at transaction start."
            ]
          },
          {
            "heading": "Advanced Index Types",
            "items": [
              "<b>GIN:</b> full-text search, JSONB, arrays. Inverted index. Faster reads, slower writes.",
              "<b>BRIN:</b> stores min/max per block range. Tiny. For naturally ordered columns (append-only timestamps). Very fast to build.",
              "<b>Partial index:</b> CREATE INDEX ON orders(created_at) WHERE status='pending'. Smaller, faster for specific patterns.",
              "<b>Composite index:</b> (a,b,c). Helps queries on (a), (a,b), (a,b,c). NOT (b) alone. Leading column must be in WHERE."
            ]
          },
          {
            "heading": "EXPLAIN ANALYZE",
            "items": [
              "<b>EXPLAIN ANALYZE:</b> runs query, shows actual vs estimated rows, execution time, plan.",
              "<b>Look for:</b> large discrepancy estimated vs actual rows (stale stats — run ANALYZE). Seq Scan on large table (missing index). Nested Loop with large outer.",
              "<b>Cost:</b> (startup..total) in relative units. Lower is better.",
              "<b>Rows removed by filter:</b> large = index could help filter."
            ]
          }
        ],
        "traps": [
          "BRIN only useful for naturally ordered data — on random-ordered data it's almost useless",
          "Partial index WHERE clause must match query WHERE clause exactly for planner to use it",
          "EXPLAIN without ANALYZE shows estimated plan only — always use ANALYZE for real data (but it runs the query)"
        ],
        "checkpoint": [
          "Explain MVCC. What are dead tuples and what happens if VACUUM doesn't run?",
          "I have a JSONB column and need to search by a specific field. What index type?",
          "Walk me through reading EXPLAIN ANALYZE output. What are the key things you look for?"
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Partitioning",
            "items": [
              "<b>Range partitioning:</b> by value range. CREATE TABLE orders_2024 PARTITION OF orders FOR VALUES FROM ('2024-01-01') TO ('2025-01-01').",
              "<b>List partitioning:</b> by discrete values. Hash partitioning: even distribution.",
              "<b>Partition pruning:</b> planner skips irrelevant partitions. Partition key MUST be in WHERE clause.",
              "<b>Default partition:</b> catches unmatched rows. Detach old partitions for archival without DROP."
            ]
          },
          {
            "heading": "Row-Level Locking",
            "items": [
              "<b>SELECT FOR UPDATE:</b> exclusive row lock. Others block.",
              "<b>SELECT FOR UPDATE SKIP LOCKED:</b> skip locked rows. Only immediately available rows returned. Perfect for concurrent job queues.",
              "<b>SELECT FOR UPDATE NOWAIT:</b> fail immediately if row locked.",
              "<b>Advisory locks:</b> pg_try_advisory_lock(key) non-blocking. Application-level locks. Released at session end."
            ]
          }
        ],
        "traps": [
          "Partition key must be in WHERE clause for partition pruning — queries without it scan all partitions",
          "SELECT FOR UPDATE in long transaction holds locks for entire duration — other queries queue up",
          "FK on partitioned table must reference root table, not individual partition"
        ],
        "checkpoint": [
          "Build a concurrent job queue where multiple workers pick jobs without duplicates — using only Postgres.",
          "What is partition pruning and what must be true for it to work?",
          "SELECT FOR UPDATE vs SELECT FOR UPDATE SKIP LOCKED — when do you use each?"
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Persistence + Eviction",
            "items": [
              "<b>RDB:</b> periodic snapshots. Fast restart. Risk: data loss since last snapshot.",
              "<b>AOF:</b> log every write. fsync every second (default). Near-zero data loss. Slower restart.",
              "<b>Hybrid (recommended):</b> RDB + AOF. Fast restart + durability.",
              "<b>noeviction (default):</b> returns OOM error on write when full. Breaks service.",
              "<b>allkeys-lru:</b> evict least-recently-used. Good general cache policy.",
              "<b>allkeys-lfu (Redis 4+):</b> least-frequently-used. Better for skewed access patterns.",
              "<b>Always set maxmemory + eviction policy in production.</b>"
            ]
          },
          {
            "heading": "Distributed Patterns",
            "items": [
              "<b>Distributed lock:</b> SET key value NX EX timeout. NX = only if not exists. Must store unique value — prevents releasing another client's lock.",
              "<b>Sliding window rate limiter:</b> ZADD key now now → ZREMRANGEBYSCORE (remove old) → ZCARD (count). Needs Lua for atomicity.",
              "<b>Pub/Sub:</b> PUBLISH/SUBSCRIBE. Fire-and-forget. Messages lost if subscriber disconnected.",
              "<b>Streams:</b> append-only log. Consumer groups. Persistent. Use instead of Pub/Sub when delivery must be guaranteed."
            ]
          }
        ],
        "traps": [
          "Distributed lock without TTL — if holder crashes, lock never released (deadlock)",
          "Pub/Sub messages lost if subscriber disconnects — use Streams for guaranteed delivery",
          "Rate limiter without Lua atomicity has race conditions under concurrency"
        ],
        "checkpoint": [
          "Implement a distributed lock in Redis. What are the three required properties of a correct lock?",
          "What is the difference between Redis Pub/Sub and Streams? When does Pub/Sub cause data loss?",
          "Build a sliding window rate limiter in Redis for 100 requests/minute per user."
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Mapping + Query Types",
            "items": [
              "<b>text:</b> analyzed, tokenized, full-text search. Cannot sort or aggregate.",
              "<b>keyword:</b> exact match, sorting, aggregations.",
              "<b>Multi-field:</b> name.text for search + name.keyword for sort/agg.",
              "<b>Dynamic mapping danger:</b> unbounded field names = mapping explosion. Always define explicit mappings in production.",
              "<b>match query:</b> analyzed search. OR by default. operator:AND for all words required.",
              "<b>term query:</b> exact match, not analyzed. For keyword fields.",
              "<b>bool query:</b> must (AND, scored), should (OR, scored), filter (AND, no score, cached), must_not (NOT).",
              "<b>Filter vs query context:</b> filter = yes/no, cached, no scoring. Always use filter for exact conditions."
            ]
          },
          {
            "heading": "Relevance — BM25",
            "items": [
              "<b>BM25:</b> term frequency (with saturation) × IDF (rare terms scored higher) × document length normalisation.",
              "<b>Boosting:</b> boost field at query time: {match: {title: {query: 'fox', boost: 3}}}.",
              "<b>explain:true:</b> see scoring breakdown in response."
            ]
          }
        ],
        "traps": [
          "Aggregations on text fields throw error — must use keyword field or enable fielddata (memory-intensive)",
          "match query is OR by default — 'quick brown' matches either word unless you add operator:AND",
          "Filter context results are cached, query context are not — put non-scored conditions in filter"
        ],
        "checkpoint": [
          "What is the difference between match and term queries?",
          "I need to search product descriptions AND filter by category (exact). How do you structure the query?",
          "What is the difference between must and filter in a bool query? Which is cached?"
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Consistent Hashing + Consistency Levels",
            "items": [
              "<b>Ring topology:</b> nodes on a ring. Key hashes to position. First N clockwise nodes store data.",
              "<b>Virtual nodes (vnodes):</b> each node owns multiple token ranges. Better distribution.",
              "<b>ONE:</b> fastest, least consistent. <b>QUORUM:</b> (RF/2)+1 nodes. <b>ALL:</b> all replicas.",
              "<b>QUORUM reads + QUORUM writes = strong consistency</b> for RF=3 (2+2 &gt; 3).",
              "<b>LOCAL_QUORUM:</b> quorum within local datacenter. Use in multi-DC to avoid cross-DC latency."
            ]
          },
          {
            "heading": "Write Path",
            "items": [
              "<b>Write path:</b> commit log (durability) + memtable (in-memory) → acknowledge → flush memtable to SSTable.",
              "<b>SSTables:</b> immutable sorted files. Writes always create new files.",
              "<b>Compaction:</b> merge SSTables, remove tombstones. SizeTiered (write-heavy), Leveled (read-heavy), TimeWindow (time-series).",
              "<b>Tombstones:</b> deletes = markers. Accumulation → slow reads. gc_grace_seconds controls lifetime."
            ]
          }
        ],
        "traps": [
          "Tombstone accumulation degrades read performance — monitor tombstones per query",
          "Hinted handoff: if node is down longer than max_hint_window (3h default), hints are dropped — manual repair needed",
          "QUORUM with RF=3 requires 2 nodes — still works with 1 node down. ALL requires all 3."
        ],
        "checkpoint": [
          "Explain Cassandra write path from client to disk.",
          "What is a tombstone? What happens when too many accumulate?",
          "LOCAL_QUORUM vs QUORUM — what is the difference and when do you use LOCAL_QUORUM?"
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
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Isolation Levels",
            "items": [
              "<b>Read Uncommitted:</b> dirty reads allowed. Rarely useful.",
              "<b>Read Committed:</b> no dirty reads. Non-repeatable reads possible.",
              "<b>Repeatable Read:</b> same rows stable in transaction. Phantom behavior depends on engine.",
              "<b>Serializable:</b> strongest isolation. Lowest concurrency."
            ]
          },
          {
            "heading": "Locks + Deadlocks",
            "items": [
              "<b>Shared locks:</b> multiple readers. <b>Exclusive locks:</b> one writer.",
              "<b>Deadlock:</b> T1 waits for T2 while T2 waits for T1. Database aborts one transaction.",
              "<b>Prevention:</b> acquire locks in consistent order, keep transactions short, index lookup keys.",
              "<b>Diagnosis:</b> lock wait graphs, slow query logs, transaction timing."
            ]
          }
        ],
        "traps": [
          "Higher isolation is not free — it can reduce throughput",
          "Deadlocks are normal under contention; design retries with backoff",
          "Missing indexes turn row locks into broader lock contention"
        ],
        "checkpoint": [
          "Compare READ COMMITTED and REPEATABLE READ.",
          "How do you prevent deadlocks in a bank transfer flow?",
          "What metrics reveal transaction lock contention?"
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
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Compaction Strategies",
            "items": [
              "<b>SizeTiered:</b> good write-heavy workloads, more read amplification.",
              "<b>Leveled:</b> lower read amplification, more write amplification.",
              "<b>TimeWindow:</b> good for time-series with TTL. Drops old windows efficiently.",
              "<b>Tombstones:</b> monitor per-query tombstone scans and gc_grace_seconds."
            ]
          },
          {
            "heading": "Tuning",
            "items": [
              "<b>CPU pinning:</b> Scylla can pin shards to cores for predictable latency.",
              "<b>Memory:</b> reserve memory for OS cache and avoid overcommit.",
              "<b>Consistency:</b> LOCAL_QUORUM often preferred in multi-DC to avoid cross-DC latency.",
              "<b>Driver retries:</b> tune idempotence awareness and retry policies."
            ]
          }
        ],
        "traps": [
          "Leveled compaction can amplify writes on write-heavy tables",
          "Over-tight memory limits starve OS page cache",
          "QUORUM across distant datacenters increases latency and failure domains"
        ],
        "checkpoint": [
          "Choose a compaction strategy for time-series telemetry.",
          "How do tombstones affect read latency?",
          "What tuning changes make Scylla different from Cassandra?"
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
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Relevance",
            "items": [
              "<b>BM25:</b> term frequency, inverse document frequency, and field length normalization.",
              "<b>Boosting:</b> boost title over description, exact phrase over token match.",
              "<b>Function score:</b> combine relevance with business signals like popularity or freshness.",
              "<b>Explain API:</b> inspect why a document matched and scored."
            ]
          },
          {
            "heading": "Analyzers + Synonyms",
            "items": [
              "<b>Analyzer pipeline:</b> character filters, tokenizer, token filters.",
              "<b>Custom analyzers:</b> lowercase, stem, synonym, shingle filters based on search behavior.",
              "<b>Synonyms:</b> expand or equivalent synonyms. Test before deploying.",
              "<b>Index-time vs search-time:</b> index-time synonyms affect indexing; search-time synonyms are more flexible."
            ]
          }
        ],
        "traps": [
          "Synonym changes often require reindexing depending on analyzer design",
          "Over-boosting can make irrelevant documents rank first",
          "Function score without guardrails can hide poor text relevance"
        ],
        "checkpoint": [
          "Tune search so title matches outrank description matches.",
          "How do you test synonym quality?",
          "Explain BM25 in practical terms."
        ]
      }
    ],
    "grill": "You are a Senior Search Engineer interviewing a candidate.\n\nTOPIC: Elasticsearch Query Design (Block 77)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Search relevance, mapping, analyzers, aggregations. 'Products don't rank correctly', 'facet aggregation OOM', 'design synonym strategy'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default databaseIntermediate;
