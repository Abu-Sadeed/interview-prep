import type { Block } from '../../types/content';

export const javaIntermediate: Block[] = [
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
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "String Pool + Immutability",
            "items": [
              "<b>String pool:</b> JVM maintains a pool of string literals. <code>String a = \"hello\"</code> reuses pooled instance. <code>String b = new String(\"hello\")</code> always creates new heap object (never pooled automatically).",
              "<b>String.intern():</b> adds string to pool and returns the pooled reference. <code>new String(\"hello\").intern() == \"hello\"</code> is TRUE.",
              "<b>Why strings are immutable:</b> thread safety, hashCode caching (safe as HashMap key), security (paths/URLs can't be modified post-validation), enables string pool.",
              "<b>String comparison:</b> ALWAYS use <code>.equals()</code>. <code>==</code> compares references. Only safe for compile-time literals that are automatically interned."
            ]
          },
          {
            "heading": "null in Java",
            "items": [
              "<b>null is a reference value</b> meaning 'no object'. Assignable to any reference type.",
              "<b>NullPointerException:</b> accessing any member on null. Java 14+ gives helpful NPE messages naming the exact variable.",
              "<b>null in collections:</b> HashMap allows one null key, multiple null values. HashSet allows one null. TreeMap does NOT allow null keys (compareTo throws NPE).",
              "<b>Optional&lt;T&gt;:</b> Java 8+ container for 'may or may not have a value'. Better API than returning null. Use ofNullable(), orElse(), orElseGet(), map(), ifPresent()."
            ]
          }
        ],
        "traps": [
          "String with new String() is NOT in the pool — == with literal returns false",
          "TreeMap null key throws NPE on any operation including containsKey",
          "Optional.get() on empty Optional throws NoSuchElementException — always check first",
          "orElse() always evaluates its argument — orElseGet() is lazy (use for expensive defaults)"
        ],
        "checkpoint": [
          "Why does Java use the String pool and what are its memory implications?",
          "A method returns Optional<User>. What are the correct ways to handle it and what is the wrong way?",
          "Why is it unsafe to use == to compare Strings from two different sources?"
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
        "level": "Intermediate",
        "time": "30 min",
        "sections": [
          {
            "heading": "Compiler Optimisation of Concatenation",
            "items": [
              "<b>Java 9+ compiler:</b> uses invokedynamic + StringConcatFactory for + concatenation. Single-expression concatenation optimised automatically.",
              "<b>Loops are NOT optimised.</b> Each iteration still creates intermediate objects without StringBuilder. Compiler optimisation only applies within a single expression.",
              "<b>String.format() performance:</b> slower than StringBuilder due to regex parsing of format string. For high-frequency logging use parameterised SLF4J: <code>log.debug(\"User {}\", id)</code> — not evaluated unless debug enabled.",
              "<b>intern() trade-off:</b> intern() adds to pool and returns pooled reference. Useful when many duplicate strings (e.g. parsing CSV with repeated country codes). Risk: pool in heap — too many interned strings = memory pressure."
            ]
          },
          {
            "heading": "String in Data Structures",
            "items": [
              "<b>String as HashMap key:</b> hashCode cached after first call (lazy init). Safe — hashCode never changes. char[] is NOT safe as key — hashCode based on identity.",
              "<b>Regex performance:</b> Pattern.compile() is expensive. Cache compiled Pattern as static final. Never compile inside a loop.",
              "<b>CharSequence interface:</b> String, StringBuilder, StringBuffer all implement it. Method accepting CharSequence is more flexible."
            ]
          }
        ],
        "traps": [
          "Pattern.compile() inside a loop is a classic performance bug — always cache as static final",
          "String.format() in tight loops is slow — use StringBuilder or SLF4J parameterised logging",
          "intern() misuse causes metaspace bloat"
        ],
        "checkpoint": [
          "What optimisation does Java 9+ apply to + concatenation and when does it NOT apply?",
          "Why is it safe to use String as HashMap key but dangerous to use char[]?",
          "You're parsing a CSV with millions of rows and 50 repeated country codes. How do you optimise string memory?"
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "HashMap Internals",
            "items": [
              "<b>Bucketing:</b> array of buckets. hashCode() → bucket index. Collisions stored as linked list in bucket.",
              "<b>Java 8 treeification:</b> bucket with &gt;8 entries converts linked list → Red-Black tree. O(n) bucket → O(log n). Reverts below 6 entries.",
              "<b>Load factor (default 0.75):</b> when 75% capacity filled → resize (double + rehash). Pre-size if capacity known: <code>new HashMap&lt;&gt;(expectedSize, 0.75f)</code>.",
              "<b>equals() + hashCode() contract:</b> equal objects MUST have equal hashCodes. Breaking this breaks HashMap. hashCode() should spread values uniformly."
            ]
          },
          {
            "heading": "Iteration + ConcurrentModification",
            "items": [
              "<b>ConcurrentModificationException:</b> structural modification during iteration via iterator. for-each + list.remove() inside triggers this.",
              "<b>Safe removal:</b> iterator.remove(), removeIf(predicate), or collect-then-removeAll.",
              "<b>CopyOnWriteArrayList:</b> writes copy entire array. Zero-lock reads. Use only when reads vastly outnumber writes (listener lists).",
              "<b>List.of() vs Collections.unmodifiableList():</b> List.of() (Java 9+) truly immutable — throws on any mutation attempt. unmodifiableList() wraps — underlying list can still change."
            ]
          },
          {
            "heading": "Comparable vs Comparator",
            "items": [
              "<b>Comparable:</b> natural ordering. Class implements compareTo(). String, Integer, Date all implement Comparable.",
              "<b>Comparator:</b> external ordering. Passed to sort/TreeSet/TreeMap. <code>Comparator.comparing(User::getAge).thenComparing(User::getName).reversed()</code>.",
              "<b>nullsFirst/nullsLast:</b> Comparator.nullsFirst(naturalOrder()) — handle null-safe sorting."
            ]
          }
        ],
        "traps": [
          "Mutable object as HashMap key — if hashCode changes after insertion, object can't be found",
          "ConcurrentModificationException on for-each + remove — use iterator.remove()",
          "List.of() throws UnsupportedOperationException on add — truly immutable unlike unmodifiableList()"
        ],
        "checkpoint": [
          "What happens in a HashMap when two keys have the same hashCode? What happens in Java 8+ when one bucket exceeds 8 entries?",
          "I have a HashMap<User, String> where User equals/hashCode uses id. I change a user's id after insertion. What happens?",
          "What is the difference between Collections.unmodifiableList() and List.of()?"
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
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Type Erasure",
            "items": [
              "<b>Type erasure:</b> generic type info removed at compile time. List&lt;String&gt; and List&lt;Integer&gt; are both just List at runtime.",
              "<b>Consequence:</b> can't do <code>instanceof List&lt;String&gt;</code> — always just <code>instanceof List</code>. Can't create generic arrays: <code>new T[]</code> fails.",
              "<b>Bridge methods:</b> compiler generates synthetic bridge methods to maintain polymorphism after erasure. Visible in bytecode, invisible in source.",
              "<b>Reifiable types:</b> types with full info available at runtime — primitives, raw types, List&lt;?&gt;. List&lt;String&gt; is NOT reifiable."
            ]
          },
          {
            "heading": "PECS Rule",
            "items": [
              "<b>PECS: Producer Extends, Consumer Super.</b>",
              "<b>Use &lt;? extends T&gt; when reading (producing) from collection:</b> <code>void process(List&lt;? extends Number&gt; list)</code>.",
              "<b>Use &lt;? super T&gt; when writing (consuming) to collection:</b> <code>void fill(List&lt;? super Integer&gt; list)</code>.",
              "<b>Classic example:</b> <code>Collections.copy(List&lt;? super T&gt; dest, List&lt;? extends T&gt; src)</code> — src produces, dest consumes."
            ]
          }
        ],
        "traps": [
          "PECS is commonly reversed under pressure — producer = extends, consumer = super",
          "Type erasure means generic type info is gone at runtime — requires TypeToken workaround",
          "Casting generic types generates 'unchecked cast' warning — suppress only when you've verified safety"
        ],
        "checkpoint": [
          "Explain type erasure. What practical problem does it cause?",
          "Apply PECS: design a method that copies elements from one List to another of a different but compatible type.",
          "Why can't you create a generic array like new T[10]?"
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Collectors + Grouping",
            "items": [
              "<b>groupingBy():</b> <code>groupingBy(Order::getStatus)</code> → Map&lt;Status, List&lt;Order&gt;&gt;. Second arg = downstream collector.",
              "<b>Downstream collectors:</b> <code>groupingBy(key, counting())</code> → Map&lt;K,Long&gt;. <code>groupingBy(key, toSet())</code>. <code>groupingBy(key, summingInt(Order::getTotal))</code>.",
              "<b>partitioningBy():</b> split into {true, false} by predicate. Returns Map&lt;Boolean, List&lt;T&gt;&gt;.",
              "<b>joining():</b> <code>joining(\", \", \"[\", \"]\")</code> with delimiter, prefix, suffix.",
              "<b>toMap() duplicate key trap:</b> throws IllegalStateException on duplicate keys by default. Third arg = merge function: <code>toMap(k, v, (a, b) -&gt; b)</code>."
            ]
          },
          {
            "heading": "Optional — Correct Usage",
            "items": [
              "<b>Optional is for return types ONLY.</b> Not for fields, not for method parameters.",
              "<b>Never use Optional.get() without checking.</b> Use orElse(), orElseGet(), orElseThrow(), ifPresent(), map().",
              "<b>orElse vs orElseGet:</b> orElse always evaluates its argument. orElseGet(Supplier) is lazy — only evaluated if empty. Always use orElseGet for expensive defaults.",
              "<b>Optional.map() chaining:</b> <code>optional.map(User::getAddress).map(Address::getCity).orElse(\"Unknown\")</code> — clean null-safe chain.",
              "<b>Anti-pattern:</b> Optional.isPresent() + get() = null check in disguise. Defeats the purpose."
            ]
          },
          {
            "heading": "Parallel Streams",
            "items": [
              "<b>parallelStream():</b> splits work across ForkJoinPool.commonPool() threads.",
              "<b>Use when:</b> large data (&gt;10K elements), CPU-bound, no shared mutable state, easily splittable source.",
              "<b>Do NOT use when:</b> I/O operations, small data (overhead &gt; gain), side effects, operations that must stay ordered.",
              "<b>Blocking in parallel stream starves ForkJoinPool</b> — affects all other parallelStream() calls in same JVM."
            ]
          }
        ],
        "traps": [
          "orElse() always evaluates — orElseGet() is lazy, critical for expensive defaults",
          "Collectors.toMap() throws on duplicate keys — always provide merge function for real-world data",
          "Parallel streams use common ForkJoinPool — blocking I/O operations starve the pool"
        ],
        "checkpoint": [
          "What is the difference between orElse() and orElseGet()? When does the choice matter?",
          "Group a list of orders by customer, then for each customer get total order value. Write this pipeline.",
          "When would parallel stream make things SLOWER? Give a concrete scenario."
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Happens-Before Guarantee",
            "items": [
              "<b>happens-before:</b> formal guarantee that all effects of action A are visible to action B.",
              "<b>What establishes it:</b> synchronized block exit→entry on same lock. volatile write→read. Thread.start()→first action in thread. Thread.join()→subsequent action in joining thread.",
              "<b>Without happens-before:</b> no visibility guarantee even if operations seem ordered in time.",
              "<b>Double-checked locking:</b> broken without volatile on the field. Object reference can be seen before constructor finishes (reordering). volatile prevents this."
            ]
          },
          {
            "heading": "Atomic Classes",
            "items": [
              "<b>java.util.concurrent.atomic:</b> AtomicInteger, AtomicLong, AtomicBoolean, AtomicReference.",
              "<b>CAS (Compare-And-Swap):</b> hardware instruction. compareAndSet(expected, update) — atomically checks if current==expected, if yes sets to update. Returns boolean.",
              "<b>Non-blocking:</b> CAS doesn't use OS locks. Much faster than synchronized for single-variable operations under moderate contention.",
              "<b>LongAdder:</b> better than AtomicLong under high contention. Multiple cells reduce contention. Use for counters/statistics."
            ]
          },
          {
            "heading": "ReentrantLock",
            "items": [
              "<b>tryLock():</b> non-blocking attempt. <b>lockInterruptibly():</b> interruptible wait. <b>Fair mode:</b> longest-waiting thread gets lock first (reduces starvation but reduces throughput).",
              "<b>Must unlock in finally:</b> <code>lock.lock(); try { ... } finally { lock.unlock(); }</code>. Missing unlock = permanent deadlock.",
              "<b>Condition variables:</b> lock.newCondition(). More flexible than wait/notify — multiple conditions per lock."
            ]
          }
        ],
        "traps": [
          "Forgetting unlock() in finally causes permanent deadlock — most common ReentrantLock bug",
          "AtomicReference.set() alone is not enough for compound check-then-act operations",
          "LongAdder.sum() is approximate under concurrent modification — not atomic"
        ],
        "checkpoint": [
          "What is the happens-before relationship and why does it matter?",
          "When would you use ReentrantLock over synchronized?",
          "What is CAS and why is it faster than synchronized for counters?"
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "ThreadPoolExecutor Configuration",
            "items": [
              "<b>Core parameters:</b> corePoolSize (min threads kept alive), maximumPoolSize (max under load), keepAliveTime (idle thread timeout), workQueue (pending tasks).",
              "<b>Thread creation logic:</b> active &lt; core → new thread. active &gt;= core → queue. Queue full → new thread up to max. Queue full + at max → rejection.",
              "<b>Queue type matters critically:</b> LinkedBlockingQueue (unbounded — maxPoolSize never reached!), ArrayBlockingQueue (bounded — maxPoolSize can be reached), SynchronousQueue (no queue — direct to new thread or reject).",
              "<b>RejectedExecutionHandler:</b> AbortPolicy (throw, default), CallerRunsPolicy (caller executes = natural backpressure), DiscardPolicy (silently drop), DiscardOldestPolicy."
            ]
          },
          {
            "heading": "ThreadLocal",
            "items": [
              "<b>ThreadLocal&lt;T&gt;:</b> per-thread storage. Each thread gets its own copy. No synchronisation needed.",
              "<b>Use cases:</b> request context (user ID, trace ID in MDC), database connections, SimpleDateFormat (not thread-safe).",
              "<b>Memory leak in thread pools:</b> threads are reused. If ThreadLocal not removed after task, next task on that thread sees stale data. Always call <code>remove()</code> in finally.",
              "<b>Virtual threads + ThreadLocal:</b> millions of virtual threads = millions of ThreadLocal instances. Use ScopedValues (Java 21) instead."
            ]
          }
        ],
        "traps": [
          "ThreadLocal in thread pool without remove() causes stale data for next task on same thread",
          "LinkedBlockingQueue with ThreadPoolExecutor means maximumPoolSize is NEVER reached — queue grows infinitely",
          "CallerRunsPolicy is backpressure — submitting thread executes the task itself when pool is saturated"
        ],
        "checkpoint": [
          "Explain ThreadPoolExecutor thread creation logic. When does it create a new thread vs queue vs reject?",
          "What is the ThreadLocal memory leak and how do you prevent it?",
          "How do you size a thread pool for I/O-bound vs CPU-bound tasks?"
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
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "GC Algorithms",
            "items": [
              "<b>Serial GC:</b> single thread, stop-the-world. Tiny apps only.",
              "<b>Parallel GC:</b> multi-thread GC, still stop-the-world. High throughput. For batch jobs where pause time is acceptable.",
              "<b>G1GC (default Java 9+):</b> divides heap into equal regions. Collects highest-garbage regions first. Predictable pause target (default 200ms). Best for 4GB+ heaps with latency requirements.",
              "<b>ZGC:</b> sub-millisecond pauses. Concurrent marking + relocation. For latency-critical services. Handles TB-scale heaps.",
              "<b>Choose by what you can't afford:</b> latency → ZGC. Throughput → Parallel. Balance → G1."
            ]
          },
          {
            "heading": "GC Tuning",
            "items": [
              "<b>-Xms/-Xmx:</b> initial/max heap. Set equal to avoid resizing pauses: <code>-Xms4g -Xmx4g</code>.",
              "<b>-XX:MaxGCPauseMillis=200:</b> G1 pause target. G1 adjusts which regions to collect.",
              "<b>GC logging (Java 9+):</b> <code>-Xlog:gc*:file=gc.log:time,uptime:filecount=5,filesize=10m</code>. Essential for diagnosis.",
              "<b>Signs of GC problems:</b> frequent Full GCs, growing Old Gen (memory leak), long pause times, high allocation rate."
            ]
          }
        ],
        "traps": [
          "-Xms != -Xmx causes heap resizing pauses under load — always set equal in production",
          "G1GC pause target is a target not a guarantee — large Old Gen regions may cause longer pauses",
          "ZGC trades throughput for latency — wrong choice for batch processing"
        ],
        "checkpoint": [
          "When would you choose ZGC over G1GC?",
          "What does -Xms4g -Xmx4g do and why should Xms equal Xmx in production?",
          "Your application has frequent Full GC pauses. What are the top 3 causes and how do you diagnose each?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Java backend candidate.\n\nTOPIC: JVM Internals + Garbage Collection (Block 8)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix production scenarios (app has long GC pauses, diagnose it), internals (how does G1 decide which regions to collect), and tooling (what JVM flags/tools would you use).\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default javaIntermediate;
