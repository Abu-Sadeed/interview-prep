import type { Block } from '../../types/content';

export const javaAdvanced: Block[] = [
  {
    "id": "java-1",
    "phase": "Java Fundamentals",
    "chip": "java",
    "freq": "high",
    "title": "Java — Data Types + Memory",
    "subtitle": "Primitives vs objects, autoboxing traps, String pool, pass-by-value, null handling",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Memory Implications + JVM Internals",
            "items": [
              "<b>Object header overhead:</b> every Java object has a 12–16 byte header (mark word + class pointer). Boxed Integer ≈ 16 bytes vs primitive int's 4 bytes. Matters at millions of objects.",
              "<b>Escape analysis:</b> JIT can allocate short-lived objects on stack instead of heap if they don't 'escape' the method. Reduces GC pressure. Happens automatically.",
              "<b>String deduplication (G1GC):</b> -XX:+UseStringDeduplication — G1 identifies duplicate String objects and merges their char arrays. Reduces heap for string-heavy apps.",
              "<b>Compact strings (Java 9+):</b> String uses byte[] internally. ASCII strings use 1 byte/char instead of 2. ~50% memory reduction for ASCII-heavy apps. Transparent to developer."
            ]
          },
          {
            "heading": "Type System Edge Cases",
            "items": [
              "<b>Integer overflow is silent:</b> Integer.MAX_VALUE + 1 = Integer.MIN_VALUE. No exception. Use Math.addExact() for overflow detection.",
              "<b>Floating point is inexact:</b> 0.1 + 0.2 ≠ 0.3 in binary. Never use double for money. Use BigDecimal with explicit RoundingMode.",
              "<b>Passwords as char[]:</b> String stays in memory/pool until GC. char[] can be zeroed immediately after use. Why JPasswordField.getPassword() returns char[]."
            ]
          }
        ],
        "traps": [
          "Integer.MAX_VALUE + 1 silently wraps to MIN_VALUE — no exception thrown",
          "0.1 + 0.2 == 0.3 is false in Java — floating point imprecision",
          "Storing passwords as String is a security vulnerability — use char[] and zero out"
        ],
        "checkpoint": [
          "When would you use BigDecimal over double? What RoundingMode for financial rounding?",
          "What is escape analysis and why does it matter for GC performance?",
          "Why should passwords be stored as char[] rather than String?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend candidate with ~5 years of Java experience.\n\nTOPIC: Java Data Types + Memory (Block 1)\n\nYOUR ROLE: Unpredictable, Socratic interviewer. React to every answer — dig deeper on shallow responses, find the edge case in correct answers, ask for reasoning not just facts.\n\nRULES:\n- Ask ONE question at a time. Wait for full answer before next.\n- Never list multiple questions at once.\n- If they answer correctly, escalate to a harder implication.\n- If wrong, ask them to reason through it — don't just correct.\n- Mix: beginner traps (Integer == comparison), intermediate reasoning (why is String immutable), advanced implications (password security, floating point money).\n- After 6–8 exchanges: give a verdict — PASS (ready for next block), BORDERLINE (review and retry specific areas), FAIL (go back and study). Name exactly what was weak.\n\nBEGIN: Start with one question. No preamble, no introduction."
  },
  {
    "id": "java-2",
    "phase": "Java Fundamentals",
    "chip": "java",
    "freq": "high",
    "title": "Java — String + StringBuilder",
    "subtitle": "Immutability internals, pool, concatenation performance, StringBuilder vs StringBuffer",
    "prereqs": [
      "java-1"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "String Memory Internals",
            "items": [
              "<b>Compact strings (Java 9+):</b> String uses byte[] not char[]. ASCII strings use 1 byte/char instead of 2. ~50% memory reduction for ASCII-heavy applications. Completely transparent to developer.",
              "<b>String pool sizing:</b> -XX:StringTableSize controls hash table size (default 65536+ buckets). Increase for apps with millions of unique strings.",
              "<b>Passwords and security:</b> Strings stay in memory until GCed and may appear in heap dumps. For passwords use char[] and zero it out after use with Arrays.fill(password, '\\0')."
            ]
          },
          {
            "heading": "StringBuilder Internals",
            "items": [
              "<b>Internal char[] with initial capacity 16.</b> When full: new array of (2*current + 2), copy old. Amortized O(1) append.",
              "<b>Pre-sizing:</b> if you know approximate length: <code>new StringBuilder(estimatedLength)</code> avoids reallocation entirely.",
              "<b>StringBuilder.reverse():</b> in-place O(n) reversal. Know it exists for interview questions.",
              "<b>Thread-safe string building:</b> thread-local StringBuilder (one per thread, cleared and reused) is faster than StringBuffer."
            ]
          }
        ],
        "traps": [
          "StringBuilder initial capacity 16 — pre-size for known-length outputs to avoid reallocation",
          "Compact strings (Java 9+) use byte[] — code using reflection to access String internals breaks",
          "Passwords as String = security vulnerability + no way to zero out from memory"
        ],
        "checkpoint": [
          "How does StringBuilder grow its internal buffer and what is the performance implication?",
          "What is the memory difference between a String in Java 8 vs Java 9+ for ASCII content?",
          "Why should passwords be char[] not String? How do you safely clear a char[]?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend Java candidate.\n\nTOPIC: Java String + StringBuilder (Block 2)\n\nYOUR ROLE: Reactive Socratic interviewer. No script. React to every answer.\n\nRULES:\n- One question at a time.\n- If correct: find the edge case or production implication.\n- If wrong: ask them to reason through it step by step.\n- Cover: immutability implications, concatenation performance, compiler optimisation limits, intern() trade-offs, security implications.\n- 6–8 exchanges then verdict: PASS / BORDERLINE / FAIL with specific reasoning.\n\nBEGIN: Start with a question that seems simple but has a non-obvious answer. No preamble."
  },
  {
    "id": "java-3",
    "phase": "Java Fundamentals",
    "chip": "java",
    "freq": "high",
    "title": "Java — Collections Deep Dive",
    "subtitle": "List/Set/Map internals, time complexity, thread-safety, iteration traps",
    "prereqs": [
      "java-1",
      "java-2"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "45 min",
        "sections": [
          {
            "heading": "Concurrent Collections",
            "items": [
              "<b>ConcurrentHashMap:</b> CAS + per-bucket synchronisation (Java 8+). putIfAbsent(), computeIfAbsent() are atomic. size() is approximate under concurrency.",
              "<b>computeIfAbsent vs putIfAbsent:</b> computeIfAbsent lazily creates value only if absent. putIfAbsent requires value pre-created. computeIfAbsent is better for expensive value creation.",
              "<b>BlockingQueue:</b> ArrayBlockingQueue (bounded), LinkedBlockingQueue (optionally bounded), PriorityBlockingQueue (sorted), SynchronousQueue (no storage — direct handoff). Used internally by ThreadPoolExecutor."
            ]
          },
          {
            "heading": "Specialised Collections",
            "items": [
              "<b>EnumMap:</b> fastest Map for enum keys. Array-backed, O(1), no hashing. Always use when key is an enum.",
              "<b>EnumSet:</b> fastest Set for enums. Bit-vector. RegularEnumSet for ≤64 enum constants.",
              "<b>ArrayDeque:</b> resizable array deque. Faster than LinkedList for stack/queue operations. No null allowed.",
              "<b>WeakHashMap:</b> keys held by weak references. GC can collect entries when no strong reference to key exists. For memory-sensitive caches."
            ]
          }
        ],
        "traps": [
          "ConcurrentHashMap.size() is not guaranteed accurate under concurrent modification",
          "putIfAbsent returns the EXISTING value if present, not the new value",
          "EnumMap requires non-null keys — throws NPE on null key"
        ],
        "checkpoint": [
          "What is the difference between computeIfAbsent and putIfAbsent? Which is better for a cache and why?",
          "When would you use WeakHashMap? What problem does it solve?",
          "You need a thread-safe sorted map. What are your options and their trade-offs?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer doing a live theory + design interview.\n\nTOPIC: Java Collections (Block 3)\n\nYOUR ROLE: Reactive Socratic interviewer. No fixed question list.\n\nAPPROACH: Mix theory (internals, complexity), scenario questions (which collection for this problem), and trap questions (edge cases that catch people off guard).\n\nRULES:\n- One question at a time. React to their answer.\n- If correct answer: ask for implementation detail or edge case.\n- If wrong: ask them to reason through it.\n- Cover: HashMap internals, ConcurrentModificationException, thread-safe collections, complexity decisions, Comparable vs Comparator.\n- 6–8 exchanges then verdict: PASS / BORDERLINE / FAIL.\n\nBEGIN immediately. No preamble."
  },
  {
    "id": "java-4",
    "phase": "Java Fundamentals",
    "chip": "java",
    "freq": "med",
    "title": "Java — Generics + Type System",
    "subtitle": "Type erasure, wildcards, PECS rule, bounded types, generic methods",
    "prereqs": [
      "java-3"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Advanced Generic Patterns",
            "items": [
              "<b>Recursive type bound:</b> <code>&lt;T extends Comparable&lt;T&gt;&gt;</code> — T comparable to itself. Used in max/min/sort methods.",
              "<b>Generic singleton factory:</b> one instance for all types via unchecked cast — safe because type erased. <code>@SuppressWarnings('unchecked') return (UnaryOperator&lt;T&gt;) IDENTITY;</code>",
              "<b>TypeToken pattern (Guava):</b> capture generic type at runtime by creating anonymous subclass. <code>new TypeToken&lt;List&lt;String&gt;&gt;(){}</code>. Workaround for type erasure in frameworks.",
              "<b>Variance in Java:</b> arrays are covariant (String[] is Object[]) — ArrayStoreException at runtime. Generics are invariant — caught at compile time. Generics are safer."
            ]
          }
        ],
        "traps": [
          "Java arrays are covariant — Object[] arr = new String[3]; arr[0] = 42; compiles but throws ArrayStoreException",
          "TypeToken is a workaround for erasure, not a language feature — Guava/Jackson specific",
          "Heap pollution: when you mix raw types and generic types, runtime type safety breaks"
        ],
        "checkpoint": [
          "What is the difference between array covariance vs generic invariance in Java?",
          "How would you capture generic type information at runtime?",
          "Write a type-safe heterogeneous container (map where each key has a type token, value must match type)."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Java backend candidate.\n\nTOPIC: Java Generics + Type System (Block 4)\n\nYOUR ROLE: Reactive Socratic interviewer. No predetermined questions.\n\nFOCUS: Wildcard usage and decision-making, PECS rule application, type erasure implications, invariance vs covariance, generic design patterns.\n\nRULES: One question. React. Escalate on correct answers. Probe reasoning on wrong ones. Mix conceptual questions with 'design a method' requests. 6–8 exchanges then PASS/BORDERLINE/FAIL verdict with specific areas.\n\nBEGIN."
  },
  {
    "id": "java-5",
    "phase": "Java Fundamentals",
    "chip": "java",
    "freq": "high",
    "title": "Java — Streams + Functional API",
    "subtitle": "Stream pipeline internals, lazy evaluation, terminal ops, collectors, Optional patterns",
    "prereqs": [
      "java-3",
      "java-4"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Stream Internals",
            "items": [
              "<b>Spliterator:</b> the interface behind stream sources. Knows how to split for parallel processing and iterate. ArrayList has efficient Spliterator; LinkedList less so.",
              "<b>Characteristic flags:</b> ORDERED, DISTINCT, SORTED, SIZED. Stream tracks these — distinct() on a Set is a no-op (already DISTINCT).",
              "<b>Short-circuit operations:</b> findFirst(), anyMatch(), limit() stop processing early. Essential for infinite streams.",
              "<b>Infinite streams:</b> Stream.iterate(0, n-&gt;n+1), Stream.generate(Math::random). Always terminal with short-circuit or limit."
            ]
          },
          {
            "heading": "Custom Collectors",
            "items": [
              "<b>Collector interface:</b> supplier (create container) + accumulator (add element) + combiner (merge parallel results) + finisher (transform) + characteristics.",
              "<b>Collectors.teeing() (Java 12+):</b> apply two collectors simultaneously, merge results. One-pass computation of multiple aggregations.",
              "<b>Collector.of():</b> build custom collector. E.g., collect to ImmutableList or compute running statistics."
            ]
          }
        ],
        "traps": [
          "Stream.iterate() without limit/takeWhile is infinite — hangs the program",
          "Spliterator.trySplit() returning null means source can't be split — parallel stream degrades to sequential",
          "Collectors.teeing() requires Java 12+ — check compatibility"
        ],
        "checkpoint": [
          "How do parallel streams split work? What is a Spliterator?",
          "Write a custom Collector that collects strings into a comma-separated string without using Collectors.joining(). Describe the four required components.",
          "What is Collectors.teeing() and when would you use it?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Java candidate.\n\nTOPIC: Java Streams + Functional API (Block 5)\n\nYOUR ROLE: Reactive Socratic interviewer. No fixed questions.\n\nAPPROACH: Start accessible (what does this stream pipeline do), escalate to design (write a stream for X), then advanced (why does parallelStream fail here, explain lazy evaluation implication in this context).\n\nRULES: One question. React. Mix code questions with concept questions. 6–8 exchanges. PASS/BORDERLINE/FAIL verdict with specifics.\n\nBEGIN."
  },
  {
    "id": "java-6",
    "phase": "Java Fundamentals",
    "chip": "java",
    "freq": "high",
    "title": "Java — Concurrency Primitives",
    "subtitle": "JMM, volatile, synchronized, happens-before, Atomic classes, ReentrantLock",
    "prereqs": [
      "java-1"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "40 min",
        "sections": [
          {
            "heading": "Java Memory Model Deep Dive",
            "items": [
              "<b>JMM defines legal executions.</b> Not what CPUs do, but what Java guarantees programmers.",
              "<b>Final field semantics:</b> JMM guarantees all threads see correctly initialised final fields after constructor returns — without synchronisation. Basis of immutable object thread safety.",
              "<b>Safe publication:</b> patterns for safely making an object visible to other threads: static initialiser, volatile field, final field, synchronized block, concurrent collection."
            ]
          },
          {
            "heading": "Deadlock + Livelock + Starvation",
            "items": [
              "<b>Deadlock:</b> Thread A holds lock1, waits for lock2. Thread B holds lock2, waits for lock1. Neither progresses.",
              "<b>Prevention:</b> always acquire locks in consistent order. Use tryLock() with timeout. Lock ordering by ID.",
              "<b>Detection:</b> thread dump (jstack) shows BLOCKED threads waiting on same lock chain.",
              "<b>Livelock:</b> threads keep responding to each other, neither blocked but neither completing.",
              "<b>Starvation:</b> thread never gets CPU time. Fair locks prevent starvation."
            ]
          }
        ],
        "traps": [
          "Immutable objects are thread-safe ONLY if the reference is safely published",
          "Lock ordering for deadlock prevention must be consistent across ALL code paths",
          "tryLock() without timeout can still cause livelock — use tryLock(timeout, unit)"
        ],
        "checkpoint": [
          "What makes an immutable object thread-safe and what does 'safe publication' mean?",
          "Describe a classic deadlock scenario and three ways to prevent it.",
          "What is the difference between deadlock and livelock?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing for a concurrent systems role.\n\nTOPIC: Java Concurrency Primitives (Block 6)\n\nYOUR ROLE: Reactive Socratic interviewer. High-signal topic — probe deeply.\n\nAPPROACH: Mix scenarios (two threads doing X — what's wrong?), internals (how does CAS work?), and design (fix this race condition).\n\nRULES: One question. React. If guessing, ask them to reason through it. If correct, find the edge case. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "java-7",
    "phase": "Java Fundamentals",
    "chip": "java",
    "freq": "med",
    "title": "Java — Threading + Virtual Threads",
    "subtitle": "Thread lifecycle, thread pools, ThreadLocal traps, Java 21 virtual threads, executor framework",
    "prereqs": [
      "java-6"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Virtual Threads (Java 21)",
            "items": [
              "<b>Virtual threads = JVM-managed lightweight threads.</b> Not OS threads. JVM can create millions.",
              "<b>How it works:</b> virtual thread runs on a carrier OS thread. When virtual thread blocks (I/O, sleep), it unmounts — carrier is freed to run another virtual thread. On unblock, remounts (possibly different carrier).",
              "<b>Impact:</b> WebFlux/reactive was needed to avoid blocking OS threads. Virtual threads achieve the same with blocking code. Simpler code, same scalability.",
              "<b>Create:</b> <code>Thread.ofVirtual().start(runnable)</code> or <code>Executors.newVirtualThreadPerTaskExecutor()</code>.",
              "<b>Pinning:</b> virtual thread cannot unmount when inside a <code>synchronized</code> block or native frame. Use ReentrantLock instead of synchronized in virtual-thread-heavy code."
            ]
          },
          {
            "heading": "Structured Concurrency (Java 21 Preview)",
            "items": [
              "<b>StructuredTaskScope:</b> treat concurrent tasks as a unit. Automatic cleanup — if one fails, others cancelled.",
              "<b>ShutdownOnFailure:</b> cancel all tasks if any fails. <b>ShutdownOnSuccess:</b> cancel remaining when first succeeds.",
              "<b>Why it's better than CompletableFuture:</b> no manual tracking, automatic cleanup, clear error propagation."
            ]
          }
        ],
        "traps": [
          "synchronized blocks pin virtual threads to carrier — prevents unmounting, defeats scalability benefit",
          "Virtual threads do NOT help CPU-bound work — only blocking I/O benefits from virtual threads",
          "Millions of virtual threads with ThreadLocal = millions of instances — use ScopedValues"
        ],
        "checkpoint": [
          "What is 'pinning' in virtual threads and why is it a problem?",
          "When would virtual threads NOT improve performance over platform threads?",
          "What problem does structured concurrency solve that CompletableFuture doesn't?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Java backend candidate.\n\nTOPIC: Java Threading + Virtual Threads (Block 7)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with thread pool design decisions, move to ThreadLocal traps, then probe virtual thread understanding. Test when virtual threads help vs don't.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "java-8",
    "phase": "Java Fundamentals",
    "chip": "java",
    "freq": "med",
    "title": "Java — JVM Internals + GC",
    "subtitle": "Memory regions, GC algorithms, JIT compilation, class loading, production tuning",
    "prereqs": [
      "java-1"
    ],
    "tiers": [
      {
        "level": "Advanced",
        "time": "40 min",
        "sections": [
          {
            "heading": "JIT Compilation",
            "items": [
              "<b>JIT:</b> JVM interprets bytecode initially, profiles hot methods, then JIT-compiles to native code.",
              "<b>Tiered compilation:</b> C1 (fast compile, light optimisation) → C2 (heavy optimisation: inlining, loop unrolling, escape analysis).",
              "<b>Warmup period:</b> JVM needs time for JIT. Cold start = slow. Warmed up = fast. Why microbenchmarks need JMH.",
              "<b>GraalVM native image:</b> ahead-of-time compilation. No JIT. Fast startup (&lt;100ms). Lower peak throughput. Reflection needs explicit config."
            ]
          },
          {
            "heading": "Memory Leaks + Diagnosis",
            "items": [
              "<b>Common leak patterns:</b> static collections holding objects, listeners not deregistered, ThreadLocal not cleaned, inner class holding outer class reference.",
              "<b>Diagnosis tools:</b> jmap -histo (object histogram), heap dump (jmap -dump or -XX:+HeapDumpOnOutOfMemoryError), Eclipse MAT / VisualVM to analyse dump, JFR for continuous profiling.",
              "<b>WeakReference vs SoftReference:</b> WeakReference — collected at any GC when no strong refs. SoftReference — collected only under memory pressure. PhantomReference — post-GC cleanup.",
              "<b>Heap dump at OOM:</b> use <code>-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/heap.hprof</code> in production — captures state at the moment of OOM."
            ]
          }
        ],
        "traps": [
          "GraalVM native image doesn't support all Java features — reflection needs registration",
          "Heap dump at OOM may be incomplete if JVM is in bad state — enable HeapDumpOnOutOfMemoryError in advance",
          "SoftReference is cleared before OOM, not at first GC — don't rely on it for deterministic memory management"
        ],
        "checkpoint": [
          "What is tiered compilation and why does it matter for application startup?",
          "Walk me through diagnosing a memory leak in production using JVM tooling.",
          "What is the difference between WeakReference and SoftReference? Give a use case for each."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Java backend candidate.\n\nTOPIC: JVM Internals + Garbage Collection (Block 8)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix production scenarios (app has long GC pauses, diagnose it), internals (how does G1 decide which regions to collect), and tooling (what JVM flags/tools would you use).\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default javaAdvanced;
