import type { Block } from '../../types/content';

export const javaBeginner: Block[] = [
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Primitive Types",
            "items": [
              "<b>8 primitives:</b> <code>byte</code>(1B), <code>short</code>(2B), <code>int</code>(4B), <code>long</code>(8B), <code>float</code>(4B), <code>double</code>(8B), <code>char</code>(2B), <code>boolean</code>.",
              "<b>Stack vs Heap:</b> primitives in methods live on stack. Objects always on heap. A stack variable holds a reference (pointer), not the object itself.",
              "<b>Default values:</b> instance fields — int=0, boolean=false, Object=null. Local variables have NO default — must initialize before use or compiler error.",
              "<b>int vs long:</b> int max ~2.1 billion. Use long for IDs, timestamps (epoch ms), financial amounts. Always suffix: <code>long x = 3_000_000_000L</code>.",
              "<b>float vs double:</b> float ~7 significant digits, double ~15. Default decimal literal is double. Always use double unless memory is extremely tight."
            ]
          },
          {
            "heading": "Autoboxing + Wrapper Types",
            "items": [
              "<b>Autoboxing:</b> Java silently converts primitive ↔ wrapper (Integer, Long, Double, Boolean etc.) when needed.",
              "<b>Integer cache trap:</b> Integer.valueOf(-128 to 127) returns cached objects. <code>Integer a=127; Integer b=127; a==b</code> → TRUE. <code>Integer a=128; Integer b=128; a==b</code> → FALSE. Always use <code>.equals()</code> for wrapper comparison.",
              "<b>Unboxing NullPointerException:</b> <code>Integer x = null; int y = x;</code> throws NPE. Unboxing null always throws NPE. Common trap in collections returning null.",
              "<b>Performance:</b> autoboxing creates heap objects. In tight loops avoid boxing — use primitive arrays or primitive streams (IntStream)."
            ]
          },
          {
            "heading": "Pass-by-Value",
            "items": [
              "<b>Java is ALWAYS pass-by-value.</b> For primitives: copy of value. For objects: copy of the reference (pointer). The copy still points to the same object.",
              "<b>Consequence:</b> reassigning a parameter inside a method does NOT affect the caller's variable. But mutating the object the reference points to DOES affect the caller.",
              "<b>String gotcha:</b> String is immutable — 'modifying' inside a method creates a new String. Caller's string is unchanged."
            ]
          }
        ],
        "traps": [
          "Integer == comparison above 127 returns false — always use .equals()",
          "Unboxing null throws NPE silently in arithmetic expressions",
          "long literals without L suffix: values > Integer.MAX_VALUE overflow silently",
          "Local variables have no default value — compiler error if used uninitialised"
        ],
        "checkpoint": [
          "Why does Integer a=200; Integer b=200; a==b return false?",
          "Pass an ArrayList to a method and add an element inside — does the caller's list change? What if you reassign the parameter?",
          "What is the default value of a local int variable in a method?"
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "String Immutability",
            "items": [
              "<b>String objects cannot be changed after creation.</b> Any 'modification' returns a new String object.",
              "<code>String s = \"hello\"; s = s + \" world\";</code> — original \"hello\" object still exists in memory. <code>s</code> now points to new \"hello world\" object.",
              "<b>Why immutable:</b> thread-safe (no sync needed), safe as HashMap key (hashCode never changes after creation), security (paths/URLs can't be tampered post-validation), enables string pool.",
              "<b>Methods return new Strings:</b> toUpperCase(), trim(), replace() all return new objects. Classic mistake: <code>s.trim();</code> without reassigning — does nothing useful."
            ]
          },
          {
            "heading": "String vs StringBuilder vs StringBuffer",
            "items": [
              "<b>String:</b> immutable. Use for values you do not modify repeatedly.",
              "<b>StringBuilder:</b> mutable, NOT thread-safe. Use for building strings dynamically in a single thread. Much faster than + concatenation in loops.",
              "<b>StringBuffer:</b> mutable, thread-safe (synchronized). Slower than StringBuilder. Rarely the right choice — if you need thread-safe string building, your design is likely wrong.",
              "<b>The golden rule:</b> never concatenate strings in a loop with +. <code>String s = \"\"; for(int i=0;i&lt;1000;i++) s += i;</code> creates 1000+ intermediate String objects."
            ]
          },
          {
            "heading": "Common String Methods",
            "items": [
              "<code>length()</code>, <code>charAt(i)</code>, <code>substring(start, end)</code> — end is exclusive.",
              "<code>indexOf(str)</code> returns -1 if not found. <code>contains()</code>, <code>startsWith()</code>, <code>endsWith()</code>.",
              "<code>split(regex)</code> returns String[]. <code>String.join(delimiter, parts)</code> joins with delimiter.",
              "<code>String.format()</code> for printf-style. Java 15+ text blocks (triple quotes) for multiline strings."
            ]
          }
        ],
        "traps": [
          "s.trim() without assignment does nothing — String is immutable",
          "String + in a loop creates O(n²) intermediate objects",
          "StringBuffer is slower than StringBuilder in single-threaded code"
        ],
        "checkpoint": [
          "What does this print and why: String a = \"test\"; String b = a; a = a.toUpperCase(); System.out.println(b);",
          "Why is StringBuilder faster than String concatenation in a loop?",
          "When would you actually choose StringBuffer over StringBuilder?"
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
        "level": "Beginner",
        "time": "45 min",
        "sections": [
          {
            "heading": "List Implementations",
            "items": [
              "<b>ArrayList:</b> backed by array. O(1) get by index. O(n) insert/delete in middle. Amortized O(1) append. Default capacity 10, grows by 50% when full.",
              "<b>LinkedList:</b> doubly-linked list. O(1) insert/delete at known position. O(n) get by index (must traverse). Higher memory (two pointers + header per node).",
              "<b>When ArrayList wins:</b> random access, iteration, most real-world use. CPU cache-friendly (contiguous memory).",
              "<b>When LinkedList wins:</b> frequent insert/delete at both ends. But ArrayDeque is even faster for deque operations — LinkedList is rarely the right answer."
            ]
          },
          {
            "heading": "Map Implementations",
            "items": [
              "<b>HashMap:</b> hash table. O(1) average get/put. One null key. NOT ordered. NOT thread-safe.",
              "<b>LinkedHashMap:</b> HashMap + doubly-linked list. Maintains insertion order (or access order). O(1) operations. Classic LRU cache base.",
              "<b>TreeMap:</b> Red-Black tree. O(log n). Sorted by key. No null keys. Use for range queries (subMap, headMap, tailMap).",
              "<b>Hashtable:</b> legacy, synchronized on all methods, doesn't allow null. Never use. Use ConcurrentHashMap instead."
            ]
          },
          {
            "heading": "Set Implementations",
            "items": [
              "<b>HashSet:</b> backed by HashMap. O(1) add/contains/remove. No duplicates. No order. One null allowed.",
              "<b>LinkedHashSet:</b> insertion-ordered HashSet. Slightly more memory.",
              "<b>TreeSet:</b> sorted unique elements backed by TreeMap. O(log n). No null."
            ]
          }
        ],
        "traps": [
          "LinkedList.get(n) is O(n) not O(1) — random access is slow",
          "HashMap is not thread-safe — ConcurrentModificationException if modified during iteration",
          "TreeMap/TreeSet does not allow null keys — throws NPE"
        ],
        "checkpoint": [
          "When would you choose LinkedList over ArrayList? Be specific.",
          "What is the difference between HashMap and LinkedHashMap? Give a real use case for LinkedHashMap.",
          "I need to store 1 million unique user IDs with fast membership checks. Which collection?"
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "What Generics Are",
            "items": [
              "<b>Generics = parameterised types.</b> Write once, work with any type safely. <code>List&lt;String&gt;</code> only accepts Strings — caught at compile time, not runtime.",
              "<b>Without generics:</b> collections stored Object. Required casting everywhere. ClassCastException at runtime. Generics move this to compile time.",
              "<b>Generic class:</b> <code>class Box&lt;T&gt; { T value; }</code>. T replaced at usage time.",
              "<b>Generic method:</b> <code>&lt;T&gt; T identity(T input) { return input; }</code>. Type inferred from argument.",
              "<b>Bounded type:</b> <code>&lt;T extends Comparable&lt;T&gt;&gt;</code> — T must implement Comparable. Enables calling compareTo()."
            ]
          },
          {
            "heading": "Wildcards",
            "items": [
              "<b>&lt;?&gt; unbounded:</b> unknown type. Can read as Object. Cannot add anything (except null).",
              "<b>&lt;? extends T&gt; upper bound:</b> T or subtype. Can read as T. Cannot add (which subtype exactly?).",
              "<b>&lt;? super T&gt; lower bound:</b> T or supertype. Can add T. Reads as Object.",
              "<b>List&lt;Object&gt; is NOT a supertype of List&lt;String&gt;.</b> Generics are invariant. Arrays are covariant (and less safe)."
            ]
          }
        ],
        "traps": [
          "List<Object> is NOT a supertype of List<String> — generics are invariant",
          "Cannot do new T() — type erasure means T is unknown at runtime",
          "List<?> cannot have elements added — only null is allowed"
        ],
        "checkpoint": [
          "Why can't you pass a List<String> where a List<Object> is expected?",
          "What is the difference between List<?> and List<Object>?",
          "When would you use <? extends T> vs <? super T>?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Stream Basics",
            "items": [
              "<b>Stream = lazy pipeline on a data source.</b> Source → intermediate ops (filter, map, sorted) → terminal op (collect, count, forEach). Nothing executes until terminal op.",
              "<b>Streams don't store data.</b> They process elements from a source. Original collection unchanged.",
              "<b>Streams are consumed once.</b> After terminal operation, stream is closed. IllegalStateException on reuse.",
              "<b>Intermediate ops are lazy:</b> <code>stream.filter(...).map(...)</code> does nothing until .collect() is called. Important for short-circuit operations and infinite streams."
            ]
          },
          {
            "heading": "Common Operations",
            "items": [
              "<code>filter(Predicate)</code> — keep matching. <code>map(Function)</code> — transform each. <code>flatMap(Function)</code> — flatten nested streams.",
              "<code>sorted()</code> natural order. <code>sorted(Comparator)</code> custom. <code>distinct()</code> uses equals/hashCode.",
              "<code>limit(n)</code> take first n. <code>skip(n)</code> skip first n. Both short-circuit.",
              "<code>collect(Collectors.toList())</code>, <code>toSet()</code>, <code>toMap()</code>, <code>groupingBy()</code>, <code>joining()</code>.",
              "<code>forEach(Consumer)</code> — terminal, side-effect only. Never use forEach to build a result — use collect."
            ]
          }
        ],
        "traps": [
          "forEach to build results is wrong — use collect",
          "Stream reuse causes IllegalStateException — create new stream for each operation",
          "distinct() uses equals/hashCode — broken implementation = wrong results"
        ],
        "checkpoint": [
          "When do the intermediate operations actually execute in a stream pipeline?",
          "What is the difference between map() and flatMap()? Give an example.",
          "I build a stream, call forEach to add to a list, then call count() on the same stream. What happens?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Why Concurrency is Hard",
            "items": [
              "<b>CPU caches:</b> each CPU core has its own cache. Changes in one core's cache are not immediately visible to others.",
              "<b>Instruction reordering:</b> CPU and JIT reorder instructions for performance. Single-threaded result preserved, but multi-threaded behaviour can be unexpected.",
              "<b>Three problems:</b> atomicity (operation isn't one indivisible step), visibility (change not seen by other threads), ordering (operations happen in unexpected order).",
              "<b>Race condition:</b> two threads read the same counter, both increment, both write — one increment is lost."
            ]
          },
          {
            "heading": "synchronized",
            "items": [
              "<b>synchronized block/method:</b> only one thread executes at a time. Others block until lock released.",
              "<b>On instance method:</b> locks 'this'. On static method: locks the Class object.",
              "<b>Guarantees:</b> mutual exclusion (atomicity) + memory visibility (happens-before). Changes inside synchronized visible to next thread that acquires the same lock.",
              "<b>Intrinsic lock (monitor):</b> every Java object has one. synchronized(obj) acquires obj's monitor."
            ]
          },
          {
            "heading": "volatile",
            "items": [
              "<b>volatile field:</b> writes flush to main memory immediately. Reads always from main memory. Guarantees visibility.",
              "<b>volatile does NOT guarantee atomicity.</b> <code>volatile int i; i++</code> is still a race condition (read-modify-write = three operations).",
              "<b>Use volatile for:</b> simple published references, status flags read by one thread written by another.",
              "<b>Not for:</b> compound operations (check-then-act, read-modify-write)."
            ]
          }
        ],
        "traps": [
          "volatile i++ is still a race condition — volatile ensures visibility not atomicity",
          "synchronized on different objects = no mutual exclusion between those threads",
          "static synchronized methods lock the Class object, not 'this' — different lock than instance synchronized"
        ],
        "checkpoint": [
          "What three problems does concurrent programming face?",
          "What is the difference between volatile and synchronized?",
          "Why is volatile int i; i++ still not thread-safe?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Thread Basics",
            "items": [
              "<b>Thread creation:</b> extend Thread (override run()) or implement Runnable. Prefer Runnable — doesn't waste inheritance.",
              "<b>Thread states:</b> NEW → RUNNABLE → (BLOCKED | WAITING | TIMED_WAITING) → TERMINATED.",
              "<b>BLOCKED:</b> waiting for monitor lock. <b>WAITING:</b> indefinitely (wait(), join()). <b>TIMED_WAITING:</b> with timeout (sleep, wait(ms)).",
              "<b>Thread.sleep(ms):</b> pauses current thread. Does NOT release held locks.",
              "<b>Object.wait():</b> releases lock and waits for notify(). Must be called inside synchronized block."
            ]
          },
          {
            "heading": "ExecutorService",
            "items": [
              "<b>Never create raw threads in production.</b> Use ExecutorService — thread reuse, lifecycle management.",
              "<b>newFixedThreadPool(n):</b> n threads, unbounded queue. Risk: queue grows indefinitely under sustained load.",
              "<b>newCachedThreadPool():</b> creates threads as needed, reuses idle. Risk: unbounded thread creation — never use for server-side request handling.",
              "<b>newSingleThreadExecutor():</b> one thread, ordered execution. For sequential background tasks.",
              "<b>Always shutdown executor:</b> executor.shutdown() (graceful) or shutdownNow() (interrupt running). Without shutdown, JVM stays alive."
            ]
          }
        ],
        "traps": [
          "Thread.sleep() does NOT release held locks — common misconception",
          "newCachedThreadPool() can create thousands of threads under load — never use for server request handling",
          "Not calling shutdown() on ExecutorService prevents JVM exit"
        ],
        "checkpoint": [
          "What is the difference between Thread.sleep() and Object.wait()?",
          "What are the risks of Executors.newCachedThreadPool() in a server application?",
          "What happens to in-progress ExecutorService tasks when you call shutdown() vs shutdownNow()?"
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "JVM Memory Regions",
            "items": [
              "<b>Heap:</b> all objects. Young Gen (Eden + Survivor S0/S1) + Old Gen (Tenured). Shared across threads. GC-managed.",
              "<b>Stack:</b> per-thread. Stack frames = local vars + method calls + operand stack. StackOverflowError = unbounded recursion.",
              "<b>Metaspace (Java 8+):</b> class metadata, static vars, interned strings. Not on heap. Grows dynamically. OOM in metaspace = classloader leak or reflection abuse.",
              "<b>Code Cache:</b> JIT-compiled native code. Fixed size by default. If full, JIT stops compiling — performance degrades silently."
            ]
          },
          {
            "heading": "Garbage Collection Basics",
            "items": [
              "<b>Minor GC:</b> collects Young Gen. Fast (small), stop-the-world but brief.",
              "<b>Major/Full GC:</b> collects Old Gen. Slow, long pause. Triggered when Old Gen fills.",
              "<b>Object lifecycle:</b> new object → Eden → (survives Minor GC) → Survivor → (survives N GCs, default ~15) → Old Gen.",
              "<b>GC roots:</b> stack vars, static fields, JNI refs. Anything reachable from roots = alive. Unreachable = eligible for collection."
            ]
          }
        ],
        "traps": [
          "StackOverflowError is from stack not heap — different from OutOfMemoryError",
          "Metaspace OOM cannot be fixed by increasing heap size (-Xmx)",
          "Minor GC still causes stop-the-world — just shorter than Major GC"
        ],
        "checkpoint": [
          "What is the difference between heap and stack in the JVM?",
          "When does an object move from Young Gen to Old Gen?",
          "What is a GC root?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Java backend candidate.\n\nTOPIC: JVM Internals + Garbage Collection (Block 8)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix production scenarios (app has long GC pauses, diagnose it), internals (how does G1 decide which regions to collect), and tooling (what JVM flags/tools would you use).\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default javaBeginner;
