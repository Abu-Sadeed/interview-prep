import type { Block } from '../types/content';

export const databaseContent: Block[] = [
  {
    "id": 20,
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
      },
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
      },
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
    "id": 21,
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "high",
    "title": "PostgreSQL — Query Engine + Indexing",
    "subtitle": "MVCC, B-tree/GIN/BRIN, composite/partial indexes, EXPLAIN ANALYZE, query planner",
    "prereqs": [
      20
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
      },
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
      },
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
    "id": 22,
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "med",
    "title": "PostgreSQL — Advanced + Production",
    "subtitle": "VACUUM, table bloat, partitioning, row locking, replication, connection pooling",
    "prereqs": [
      21
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
      },
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
      },
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
    "id": 23,
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "high",
    "title": "Redis — Internals + Production Patterns",
    "subtitle": "Data structures, persistence, eviction, cluster, distributed lock, rate limiter, pub/sub vs streams",
    "prereqs": [
      20
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
      },
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
      },
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
    "id": 24,
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "med",
    "title": "Elasticsearch — Search Internals",
    "subtitle": "Inverted index, shards/replicas, mapping, BM25 scoring, write path, production issues",
    "prereqs": [
      20
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
      },
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
      },
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
    "id": 25,
    "phase": "Database & Cache",
    "chip": "db",
    "freq": "med",
    "title": "Cassandra — Distribution Model",
    "subtitle": "Wide-column model, consistent hashing, replication, write path, compaction, anti-patterns",
    "prereqs": [
      20
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
      },
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
      },
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
  }
];

export default databaseContent;
