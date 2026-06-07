// ============================================================
// INTERVIEW PREP SYLLABUS — DATA PART 1 (Blocks 1–13)
// Covers: Java Fundamentals (1-8) + Spring Ecosystem start (9-13)
// ============================================================

globalThis.BLOCKS_PART1 = [

// ════════════════════════════════════════════════════════════
// PHASE 1 — JAVA FUNDAMENTALS
// ════════════════════════════════════════════════════════════
{
  id: 1, phase: "Java Fundamentals", chip: "java", freq: "high",
  title: "Java — Data Types + Memory",
  subtitle: "Primitives vs objects, autoboxing traps, String pool, pass-by-value, null handling",
  prereqs: [],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Primitive Types",
          items: [
            "<b>8 primitives:</b> <code>byte</code>(1B), <code>short</code>(2B), <code>int</code>(4B), <code>long</code>(8B), <code>float</code>(4B), <code>double</code>(8B), <code>char</code>(2B), <code>boolean</code>.",
            "<b>Stack vs Heap:</b> primitives in methods live on stack. Objects always on heap. A stack variable holds a reference (pointer), not the object itself.",
            "<b>Default values:</b> instance fields — int=0, boolean=false, Object=null. Local variables have NO default — must initialize before use or compiler error.",
            "<b>int vs long:</b> int max ~2.1 billion. Use long for IDs, timestamps (epoch ms), financial amounts. Always suffix: <code>long x = 3_000_000_000L</code>.",
            "<b>float vs double:</b> float ~7 significant digits, double ~15. Default decimal literal is double. Always use double unless memory is extremely tight."
          ]
        },
        {
          heading: "Autoboxing + Wrapper Types",
          items: [
            "<b>Autoboxing:</b> Java silently converts primitive ↔ wrapper (Integer, Long, Double, Boolean etc.) when needed.",
            "<b>Integer cache trap:</b> Integer.valueOf(-128 to 127) returns cached objects. <code>Integer a=127; Integer b=127; a==b</code> → TRUE. <code>Integer a=128; Integer b=128; a==b</code> → FALSE. Always use <code>.equals()</code> for wrapper comparison.",
            "<b>Unboxing NullPointerException:</b> <code>Integer x = null; int y = x;</code> throws NPE. Unboxing null always throws NPE. Common trap in collections returning null.",
            "<b>Performance:</b> autoboxing creates heap objects. In tight loops avoid boxing — use primitive arrays or primitive streams (IntStream)."
          ]
        },
        {
          heading: "Pass-by-Value",
          items: [
            "<b>Java is ALWAYS pass-by-value.</b> For primitives: copy of value. For objects: copy of the reference (pointer). The copy still points to the same object.",
            "<b>Consequence:</b> reassigning a parameter inside a method does NOT affect the caller's variable. But mutating the object the reference points to DOES affect the caller.",
            "<b>String gotcha:</b> String is immutable — 'modifying' inside a method creates a new String. Caller's string is unchanged."
          ]
        }
      ],
      traps: [
        "Integer == comparison above 127 returns false — always use .equals()",
        "Unboxing null throws NPE silently in arithmetic expressions",
        "long literals without L suffix: values > Integer.MAX_VALUE overflow silently",
        "Local variables have no default value — compiler error if used uninitialised"
      ],
      checkpoint: [
        "Why does Integer a=200; Integer b=200; a==b return false?",
        "Pass an ArrayList to a method and add an element inside — does the caller's list change? What if you reassign the parameter?",
        "What is the default value of a local int variable in a method?"
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "String Pool + Immutability",
          items: [
            "<b>String pool:</b> JVM maintains a pool of string literals. <code>String a = \"hello\"</code> reuses pooled instance. <code>String b = new String(\"hello\")</code> always creates new heap object (never pooled automatically).",
            "<b>String.intern():</b> adds string to pool and returns the pooled reference. <code>new String(\"hello\").intern() == \"hello\"</code> is TRUE.",
            "<b>Why strings are immutable:</b> thread safety, hashCode caching (safe as HashMap key), security (paths/URLs can't be modified post-validation), enables string pool.",
            "<b>String comparison:</b> ALWAYS use <code>.equals()</code>. <code>==</code> compares references. Only safe for compile-time literals that are automatically interned."
          ]
        },
        {
          heading: "null in Java",
          items: [
            "<b>null is a reference value</b> meaning 'no object'. Assignable to any reference type.",
            "<b>NullPointerException:</b> accessing any member on null. Java 14+ gives helpful NPE messages naming the exact variable.",
            "<b>null in collections:</b> HashMap allows one null key, multiple null values. HashSet allows one null. TreeMap does NOT allow null keys (compareTo throws NPE).",
            "<b>Optional&lt;T&gt;:</b> Java 8+ container for 'may or may not have a value'. Better API than returning null. Use ofNullable(), orElse(), orElseGet(), map(), ifPresent()."
          ]
        }
      ],
      traps: [
        "String with new String() is NOT in the pool — == with literal returns false",
        "TreeMap null key throws NPE on any operation including containsKey",
        "Optional.get() on empty Optional throws NoSuchElementException — always check first",
        "orElse() always evaluates its argument — orElseGet() is lazy (use for expensive defaults)"
      ],
      checkpoint: [
        "Why does Java use the String pool and what are its memory implications?",
        "A method returns Optional<User>. What are the correct ways to handle it and what is the wrong way?",
        "Why is it unsafe to use == to compare Strings from two different sources?"
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "Memory Implications + JVM Internals",
          items: [
            "<b>Object header overhead:</b> every Java object has a 12–16 byte header (mark word + class pointer). Boxed Integer ≈ 16 bytes vs primitive int's 4 bytes. Matters at millions of objects.",
            "<b>Escape analysis:</b> JIT can allocate short-lived objects on stack instead of heap if they don't 'escape' the method. Reduces GC pressure. Happens automatically.",
            "<b>String deduplication (G1GC):</b> -XX:+UseStringDeduplication — G1 identifies duplicate String objects and merges their char arrays. Reduces heap for string-heavy apps.",
            "<b>Compact strings (Java 9+):</b> String uses byte[] internally. ASCII strings use 1 byte/char instead of 2. ~50% memory reduction for ASCII-heavy apps. Transparent to developer."
          ]
        },
        {
          heading: "Type System Edge Cases",
          items: [
            "<b>Integer overflow is silent:</b> Integer.MAX_VALUE + 1 = Integer.MIN_VALUE. No exception. Use Math.addExact() for overflow detection.",
            "<b>Floating point is inexact:</b> 0.1 + 0.2 ≠ 0.3 in binary. Never use double for money. Use BigDecimal with explicit RoundingMode.",
            "<b>Passwords as char[]:</b> String stays in memory/pool until GC. char[] can be zeroed immediately after use. Why JPasswordField.getPassword() returns char[]."
          ]
        }
      ],
      traps: [
        "Integer.MAX_VALUE + 1 silently wraps to MIN_VALUE — no exception thrown",
        "0.1 + 0.2 == 0.3 is false in Java — floating point imprecision",
        "Storing passwords as String is a security vulnerability — use char[] and zero out"
      ],
      checkpoint: [
        "When would you use BigDecimal over double? What RoundingMode for financial rounding?",
        "What is escape analysis and why does it matter for GC performance?",
        "Why should passwords be stored as char[] rather than String?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend candidate with ~5 years of Java experience.\n\nTOPIC: Java Data Types + Memory (Block 1)\n\nYOUR ROLE: Unpredictable, Socratic interviewer. React to every answer — dig deeper on shallow responses, find the edge case in correct answers, ask for reasoning not just facts.\n\nRULES:\n- Ask ONE question at a time. Wait for full answer before next.\n- Never list multiple questions at once.\n- If they answer correctly, escalate to a harder implication.\n- If wrong, ask them to reason through it — don't just correct.\n- Mix: beginner traps (Integer == comparison), intermediate reasoning (why is String immutable), advanced implications (password security, floating point money).\n- After 6–8 exchanges: give a verdict — PASS (ready for next block), BORDERLINE (review and retry specific areas), FAIL (go back and study). Name exactly what was weak.\n\nBEGIN: Start with one question. No preamble, no introduction."
},

{
  id: 2, phase: "Java Fundamentals", chip: "java", freq: "high",
  title: "Java — String + StringBuilder",
  subtitle: "Immutability internals, pool, concatenation performance, StringBuilder vs StringBuffer",
  prereqs: [1],
  tiers: [
    {
      level: "Beginner",
      time: "30 min",
      sections: [
        {
          heading: "String Immutability",
          items: [
            "<b>String objects cannot be changed after creation.</b> Any 'modification' returns a new String object.",
            "<code>String s = \"hello\"; s = s + \" world\";</code> — original \"hello\" object still exists in memory. <code>s</code> now points to new \"hello world\" object.",
            "<b>Why immutable:</b> thread-safe (no sync needed), safe as HashMap key (hashCode never changes after creation), security (paths/URLs can't be tampered post-validation), enables string pool.",
            "<b>Methods return new Strings:</b> toUpperCase(), trim(), replace() all return new objects. Classic mistake: <code>s.trim();</code> without reassigning — does nothing useful."
          ]
        },
        {
          heading: "String vs StringBuilder vs StringBuffer",
          items: [
            "<b>String:</b> immutable. Use for values you do not modify repeatedly.",
            "<b>StringBuilder:</b> mutable, NOT thread-safe. Use for building strings dynamically in a single thread. Much faster than + concatenation in loops.",
            "<b>StringBuffer:</b> mutable, thread-safe (synchronized). Slower than StringBuilder. Rarely the right choice — if you need thread-safe string building, your design is likely wrong.",
            "<b>The golden rule:</b> never concatenate strings in a loop with +. <code>String s = \"\"; for(int i=0;i&lt;1000;i++) s += i;</code> creates 1000+ intermediate String objects."
          ]
        },
        {
          heading: "Common String Methods",
          items: [
            "<code>length()</code>, <code>charAt(i)</code>, <code>substring(start, end)</code> — end is exclusive.",
            "<code>indexOf(str)</code> returns -1 if not found. <code>contains()</code>, <code>startsWith()</code>, <code>endsWith()</code>.",
            "<code>split(regex)</code> returns String[]. <code>String.join(delimiter, parts)</code> joins with delimiter.",
            "<code>String.format()</code> for printf-style. Java 15+ text blocks (triple quotes) for multiline strings."
          ]
        }
      ],
      traps: [
        "s.trim() without assignment does nothing — String is immutable",
        "String + in a loop creates O(n²) intermediate objects",
        "StringBuffer is slower than StringBuilder in single-threaded code"
      ],
      checkpoint: [
        "What does this print and why: String a = \"test\"; String b = a; a = a.toUpperCase(); System.out.println(b);",
        "Why is StringBuilder faster than String concatenation in a loop?",
        "When would you actually choose StringBuffer over StringBuilder?"
      ]
    },
    {
      level: "Intermediate",
      time: "30 min",
      sections: [
        {
          heading: "Compiler Optimisation of Concatenation",
          items: [
            "<b>Java 9+ compiler:</b> uses invokedynamic + StringConcatFactory for + concatenation. Single-expression concatenation optimised automatically.",
            "<b>Loops are NOT optimised.</b> Each iteration still creates intermediate objects without StringBuilder. Compiler optimisation only applies within a single expression.",
            "<b>String.format() performance:</b> slower than StringBuilder due to regex parsing of format string. For high-frequency logging use parameterised SLF4J: <code>log.debug(\"User {}\", id)</code> — not evaluated unless debug enabled.",
            "<b>intern() trade-off:</b> intern() adds to pool and returns pooled reference. Useful when many duplicate strings (e.g. parsing CSV with repeated country codes). Risk: pool in heap — too many interned strings = memory pressure."
          ]
        },
        {
          heading: "String in Data Structures",
          items: [
            "<b>String as HashMap key:</b> hashCode cached after first call (lazy init). Safe — hashCode never changes. char[] is NOT safe as key — hashCode based on identity.",
            "<b>Regex performance:</b> Pattern.compile() is expensive. Cache compiled Pattern as static final. Never compile inside a loop.",
            "<b>CharSequence interface:</b> String, StringBuilder, StringBuffer all implement it. Method accepting CharSequence is more flexible."
          ]
        }
      ],
      traps: [
        "Pattern.compile() inside a loop is a classic performance bug — always cache as static final",
        "String.format() in tight loops is slow — use StringBuilder or SLF4J parameterised logging",
        "intern() misuse causes metaspace bloat"
      ],
      checkpoint: [
        "What optimisation does Java 9+ apply to + concatenation and when does it NOT apply?",
        "Why is it safe to use String as HashMap key but dangerous to use char[]?",
        "You're parsing a CSV with millions of rows and 50 repeated country codes. How do you optimise string memory?"
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "String Memory Internals",
          items: [
            "<b>Compact strings (Java 9+):</b> String uses byte[] not char[]. ASCII strings use 1 byte/char instead of 2. ~50% memory reduction for ASCII-heavy applications. Completely transparent to developer.",
            "<b>String pool sizing:</b> -XX:StringTableSize controls hash table size (default 65536+ buckets). Increase for apps with millions of unique strings.",
            "<b>Passwords and security:</b> Strings stay in memory until GCed and may appear in heap dumps. For passwords use char[] and zero it out after use with Arrays.fill(password, '\\0')."
          ]
        },
        {
          heading: "StringBuilder Internals",
          items: [
            "<b>Internal char[] with initial capacity 16.</b> When full: new array of (2*current + 2), copy old. Amortized O(1) append.",
            "<b>Pre-sizing:</b> if you know approximate length: <code>new StringBuilder(estimatedLength)</code> avoids reallocation entirely.",
            "<b>StringBuilder.reverse():</b> in-place O(n) reversal. Know it exists for interview questions.",
            "<b>Thread-safe string building:</b> thread-local StringBuilder (one per thread, cleared and reused) is faster than StringBuffer."
          ]
        }
      ],
      traps: [
        "StringBuilder initial capacity 16 — pre-size for known-length outputs to avoid reallocation",
        "Compact strings (Java 9+) use byte[] — code using reflection to access String internals breaks",
        "Passwords as String = security vulnerability + no way to zero out from memory"
      ],
      checkpoint: [
        "How does StringBuilder grow its internal buffer and what is the performance implication?",
        "What is the memory difference between a String in Java 8 vs Java 9+ for ASCII content?",
        "Why should passwords be char[] not String? How do you safely clear a char[]?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a backend Java candidate.\n\nTOPIC: Java String + StringBuilder (Block 2)\n\nYOUR ROLE: Reactive Socratic interviewer. No script. React to every answer.\n\nRULES:\n- One question at a time.\n- If correct: find the edge case or production implication.\n- If wrong: ask them to reason through it step by step.\n- Cover: immutability implications, concatenation performance, compiler optimisation limits, intern() trade-offs, security implications.\n- 6–8 exchanges then verdict: PASS / BORDERLINE / FAIL with specific reasoning.\n\nBEGIN: Start with a question that seems simple but has a non-obvious answer. No preamble."
},

{
  id: 3, phase: "Java Fundamentals", chip: "java", freq: "high",
  title: "Java — Collections Deep Dive",
  subtitle: "List/Set/Map internals, time complexity, thread-safety, iteration traps",
  prereqs: [1, 2],
  tiers: [
    {
      level: "Beginner",
      time: "45 min",
      sections: [
        {
          heading: "List Implementations",
          items: [
            "<b>ArrayList:</b> backed by array. O(1) get by index. O(n) insert/delete in middle. Amortized O(1) append. Default capacity 10, grows by 50% when full.",
            "<b>LinkedList:</b> doubly-linked list. O(1) insert/delete at known position. O(n) get by index (must traverse). Higher memory (two pointers + header per node).",
            "<b>When ArrayList wins:</b> random access, iteration, most real-world use. CPU cache-friendly (contiguous memory).",
            "<b>When LinkedList wins:</b> frequent insert/delete at both ends. But ArrayDeque is even faster for deque operations — LinkedList is rarely the right answer."
          ]
        },
        {
          heading: "Map Implementations",
          items: [
            "<b>HashMap:</b> hash table. O(1) average get/put. One null key. NOT ordered. NOT thread-safe.",
            "<b>LinkedHashMap:</b> HashMap + doubly-linked list. Maintains insertion order (or access order). O(1) operations. Classic LRU cache base.",
            "<b>TreeMap:</b> Red-Black tree. O(log n). Sorted by key. No null keys. Use for range queries (subMap, headMap, tailMap).",
            "<b>Hashtable:</b> legacy, synchronized on all methods, doesn't allow null. Never use. Use ConcurrentHashMap instead."
          ]
        },
        {
          heading: "Set Implementations",
          items: [
            "<b>HashSet:</b> backed by HashMap. O(1) add/contains/remove. No duplicates. No order. One null allowed.",
            "<b>LinkedHashSet:</b> insertion-ordered HashSet. Slightly more memory.",
            "<b>TreeSet:</b> sorted unique elements backed by TreeMap. O(log n). No null."
          ]
        }
      ],
      traps: [
        "LinkedList.get(n) is O(n) not O(1) — random access is slow",
        "HashMap is not thread-safe — ConcurrentModificationException if modified during iteration",
        "TreeMap/TreeSet does not allow null keys — throws NPE"
      ],
      checkpoint: [
        "When would you choose LinkedList over ArrayList? Be specific.",
        "What is the difference between HashMap and LinkedHashMap? Give a real use case for LinkedHashMap.",
        "I need to store 1 million unique user IDs with fast membership checks. Which collection?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "HashMap Internals",
          items: [
            "<b>Bucketing:</b> array of buckets. hashCode() → bucket index. Collisions stored as linked list in bucket.",
            "<b>Java 8 treeification:</b> bucket with &gt;8 entries converts linked list → Red-Black tree. O(n) bucket → O(log n). Reverts below 6 entries.",
            "<b>Load factor (default 0.75):</b> when 75% capacity filled → resize (double + rehash). Pre-size if capacity known: <code>new HashMap&lt;&gt;(expectedSize, 0.75f)</code>.",
            "<b>equals() + hashCode() contract:</b> equal objects MUST have equal hashCodes. Breaking this breaks HashMap. hashCode() should spread values uniformly."
          ]
        },
        {
          heading: "Iteration + ConcurrentModification",
          items: [
            "<b>ConcurrentModificationException:</b> structural modification during iteration via iterator. for-each + list.remove() inside triggers this.",
            "<b>Safe removal:</b> iterator.remove(), removeIf(predicate), or collect-then-removeAll.",
            "<b>CopyOnWriteArrayList:</b> writes copy entire array. Zero-lock reads. Use only when reads vastly outnumber writes (listener lists).",
            "<b>List.of() vs Collections.unmodifiableList():</b> List.of() (Java 9+) truly immutable — throws on any mutation attempt. unmodifiableList() wraps — underlying list can still change."
          ]
        },
        {
          heading: "Comparable vs Comparator",
          items: [
            "<b>Comparable:</b> natural ordering. Class implements compareTo(). String, Integer, Date all implement Comparable.",
            "<b>Comparator:</b> external ordering. Passed to sort/TreeSet/TreeMap. <code>Comparator.comparing(User::getAge).thenComparing(User::getName).reversed()</code>.",
            "<b>nullsFirst/nullsLast:</b> Comparator.nullsFirst(naturalOrder()) — handle null-safe sorting."
          ]
        }
      ],
      traps: [
        "Mutable object as HashMap key — if hashCode changes after insertion, object can't be found",
        "ConcurrentModificationException on for-each + remove — use iterator.remove()",
        "List.of() throws UnsupportedOperationException on add — truly immutable unlike unmodifiableList()"
      ],
      checkpoint: [
        "What happens in a HashMap when two keys have the same hashCode? What happens in Java 8+ when one bucket exceeds 8 entries?",
        "I have a HashMap<User, String> where User equals/hashCode uses id. I change a user's id after insertion. What happens?",
        "What is the difference between Collections.unmodifiableList() and List.of()?"
      ]
    },
    {
      level: "Advanced",
      time: "45 min",
      sections: [
        {
          heading: "Concurrent Collections",
          items: [
            "<b>ConcurrentHashMap:</b> CAS + per-bucket synchronisation (Java 8+). putIfAbsent(), computeIfAbsent() are atomic. size() is approximate under concurrency.",
            "<b>computeIfAbsent vs putIfAbsent:</b> computeIfAbsent lazily creates value only if absent. putIfAbsent requires value pre-created. computeIfAbsent is better for expensive value creation.",
            "<b>BlockingQueue:</b> ArrayBlockingQueue (bounded), LinkedBlockingQueue (optionally bounded), PriorityBlockingQueue (sorted), SynchronousQueue (no storage — direct handoff). Used internally by ThreadPoolExecutor."
          ]
        },
        {
          heading: "Specialised Collections",
          items: [
            "<b>EnumMap:</b> fastest Map for enum keys. Array-backed, O(1), no hashing. Always use when key is an enum.",
            "<b>EnumSet:</b> fastest Set for enums. Bit-vector. RegularEnumSet for ≤64 enum constants.",
            "<b>ArrayDeque:</b> resizable array deque. Faster than LinkedList for stack/queue operations. No null allowed.",
            "<b>WeakHashMap:</b> keys held by weak references. GC can collect entries when no strong reference to key exists. For memory-sensitive caches."
          ]
        }
      ],
      traps: [
        "ConcurrentHashMap.size() is not guaranteed accurate under concurrent modification",
        "putIfAbsent returns the EXISTING value if present, not the new value",
        "EnumMap requires non-null keys — throws NPE on null key"
      ],
      checkpoint: [
        "What is the difference between computeIfAbsent and putIfAbsent? Which is better for a cache and why?",
        "When would you use WeakHashMap? What problem does it solve?",
        "You need a thread-safe sorted map. What are your options and their trade-offs?"
      ]
    }
  ],
  grill: "You are a Senior Engineer doing a live theory + design interview.\n\nTOPIC: Java Collections (Block 3)\n\nYOUR ROLE: Reactive Socratic interviewer. No fixed question list.\n\nAPPROACH: Mix theory (internals, complexity), scenario questions (which collection for this problem), and trap questions (edge cases that catch people off guard).\n\nRULES:\n- One question at a time. React to their answer.\n- If correct answer: ask for implementation detail or edge case.\n- If wrong: ask them to reason through it.\n- Cover: HashMap internals, ConcurrentModificationException, thread-safe collections, complexity decisions, Comparable vs Comparator.\n- 6–8 exchanges then verdict: PASS / BORDERLINE / FAIL.\n\nBEGIN immediately. No preamble."
},

{
  id: 4, phase: "Java Fundamentals", chip: "java", freq: "med",
  title: "Java — Generics + Type System",
  subtitle: "Type erasure, wildcards, PECS rule, bounded types, generic methods",
  prereqs: [3],
  tiers: [
    {
      level: "Beginner",
      time: "30 min",
      sections: [
        {
          heading: "What Generics Are",
          items: [
            "<b>Generics = parameterised types.</b> Write once, work with any type safely. <code>List&lt;String&gt;</code> only accepts Strings — caught at compile time, not runtime.",
            "<b>Without generics:</b> collections stored Object. Required casting everywhere. ClassCastException at runtime. Generics move this to compile time.",
            "<b>Generic class:</b> <code>class Box&lt;T&gt; { T value; }</code>. T replaced at usage time.",
            "<b>Generic method:</b> <code>&lt;T&gt; T identity(T input) { return input; }</code>. Type inferred from argument.",
            "<b>Bounded type:</b> <code>&lt;T extends Comparable&lt;T&gt;&gt;</code> — T must implement Comparable. Enables calling compareTo()."
          ]
        },
        {
          heading: "Wildcards",
          items: [
            "<b>&lt;?&gt; unbounded:</b> unknown type. Can read as Object. Cannot add anything (except null).",
            "<b>&lt;? extends T&gt; upper bound:</b> T or subtype. Can read as T. Cannot add (which subtype exactly?).",
            "<b>&lt;? super T&gt; lower bound:</b> T or supertype. Can add T. Reads as Object.",
            "<b>List&lt;Object&gt; is NOT a supertype of List&lt;String&gt;.</b> Generics are invariant. Arrays are covariant (and less safe)."
          ]
        }
      ],
      traps: [
        "List<Object> is NOT a supertype of List<String> — generics are invariant",
        "Cannot do new T() — type erasure means T is unknown at runtime",
        "List<?> cannot have elements added — only null is allowed"
      ],
      checkpoint: [
        "Why can't you pass a List<String> where a List<Object> is expected?",
        "What is the difference between List<?> and List<Object>?",
        "When would you use <? extends T> vs <? super T>?"
      ]
    },
    {
      level: "Intermediate",
      time: "35 min",
      sections: [
        {
          heading: "Type Erasure",
          items: [
            "<b>Type erasure:</b> generic type info removed at compile time. List&lt;String&gt; and List&lt;Integer&gt; are both just List at runtime.",
            "<b>Consequence:</b> can't do <code>instanceof List&lt;String&gt;</code> — always just <code>instanceof List</code>. Can't create generic arrays: <code>new T[]</code> fails.",
            "<b>Bridge methods:</b> compiler generates synthetic bridge methods to maintain polymorphism after erasure. Visible in bytecode, invisible in source.",
            "<b>Reifiable types:</b> types with full info available at runtime — primitives, raw types, List&lt;?&gt;. List&lt;String&gt; is NOT reifiable."
          ]
        },
        {
          heading: "PECS Rule",
          items: [
            "<b>PECS: Producer Extends, Consumer Super.</b>",
            "<b>Use &lt;? extends T&gt; when reading (producing) from collection:</b> <code>void process(List&lt;? extends Number&gt; list)</code>.",
            "<b>Use &lt;? super T&gt; when writing (consuming) to collection:</b> <code>void fill(List&lt;? super Integer&gt; list)</code>.",
            "<b>Classic example:</b> <code>Collections.copy(List&lt;? super T&gt; dest, List&lt;? extends T&gt; src)</code> — src produces, dest consumes."
          ]
        }
      ],
      traps: [
        "PECS is commonly reversed under pressure — producer = extends, consumer = super",
        "Type erasure means generic type info is gone at runtime — requires TypeToken workaround",
        "Casting generic types generates 'unchecked cast' warning — suppress only when you've verified safety"
      ],
      checkpoint: [
        "Explain type erasure. What practical problem does it cause?",
        "Apply PECS: design a method that copies elements from one List to another of a different but compatible type.",
        "Why can't you create a generic array like new T[10]?"
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "Advanced Generic Patterns",
          items: [
            "<b>Recursive type bound:</b> <code>&lt;T extends Comparable&lt;T&gt;&gt;</code> — T comparable to itself. Used in max/min/sort methods.",
            "<b>Generic singleton factory:</b> one instance for all types via unchecked cast — safe because type erased. <code>@SuppressWarnings('unchecked') return (UnaryOperator&lt;T&gt;) IDENTITY;</code>",
            "<b>TypeToken pattern (Guava):</b> capture generic type at runtime by creating anonymous subclass. <code>new TypeToken&lt;List&lt;String&gt;&gt;(){}</code>. Workaround for type erasure in frameworks.",
            "<b>Variance in Java:</b> arrays are covariant (String[] is Object[]) — ArrayStoreException at runtime. Generics are invariant — caught at compile time. Generics are safer."
          ]
        }
      ],
      traps: [
        "Java arrays are covariant — Object[] arr = new String[3]; arr[0] = 42; compiles but throws ArrayStoreException",
        "TypeToken is a workaround for erasure, not a language feature — Guava/Jackson specific",
        "Heap pollution: when you mix raw types and generic types, runtime type safety breaks"
      ],
      checkpoint: [
        "What is the difference between array covariance vs generic invariance in Java?",
        "How would you capture generic type information at runtime?",
        "Write a type-safe heterogeneous container (map where each key has a type token, value must match type)."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Java backend candidate.\n\nTOPIC: Java Generics + Type System (Block 4)\n\nYOUR ROLE: Reactive Socratic interviewer. No predetermined questions.\n\nFOCUS: Wildcard usage and decision-making, PECS rule application, type erasure implications, invariance vs covariance, generic design patterns.\n\nRULES: One question. React. Escalate on correct answers. Probe reasoning on wrong ones. Mix conceptual questions with 'design a method' requests. 6–8 exchanges then PASS/BORDERLINE/FAIL verdict with specific areas.\n\nBEGIN."
},

{
  id: 5, phase: "Java Fundamentals", chip: "java", freq: "high",
  title: "Java — Streams + Functional API",
  subtitle: "Stream pipeline internals, lazy evaluation, terminal ops, collectors, Optional patterns",
  prereqs: [3, 4],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Stream Basics",
          items: [
            "<b>Stream = lazy pipeline on a data source.</b> Source → intermediate ops (filter, map, sorted) → terminal op (collect, count, forEach). Nothing executes until terminal op.",
            "<b>Streams don't store data.</b> They process elements from a source. Original collection unchanged.",
            "<b>Streams are consumed once.</b> After terminal operation, stream is closed. IllegalStateException on reuse.",
            "<b>Intermediate ops are lazy:</b> <code>stream.filter(...).map(...)</code> does nothing until .collect() is called. Important for short-circuit operations and infinite streams."
          ]
        },
        {
          heading: "Common Operations",
          items: [
            "<code>filter(Predicate)</code> — keep matching. <code>map(Function)</code> — transform each. <code>flatMap(Function)</code> — flatten nested streams.",
            "<code>sorted()</code> natural order. <code>sorted(Comparator)</code> custom. <code>distinct()</code> uses equals/hashCode.",
            "<code>limit(n)</code> take first n. <code>skip(n)</code> skip first n. Both short-circuit.",
            "<code>collect(Collectors.toList())</code>, <code>toSet()</code>, <code>toMap()</code>, <code>groupingBy()</code>, <code>joining()</code>.",
            "<code>forEach(Consumer)</code> — terminal, side-effect only. Never use forEach to build a result — use collect."
          ]
        }
      ],
      traps: [
        "forEach to build results is wrong — use collect",
        "Stream reuse causes IllegalStateException — create new stream for each operation",
        "distinct() uses equals/hashCode — broken implementation = wrong results"
      ],
      checkpoint: [
        "When do the intermediate operations actually execute in a stream pipeline?",
        "What is the difference between map() and flatMap()? Give an example.",
        "I build a stream, call forEach to add to a list, then call count() on the same stream. What happens?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Collectors + Grouping",
          items: [
            "<b>groupingBy():</b> <code>groupingBy(Order::getStatus)</code> → Map&lt;Status, List&lt;Order&gt;&gt;. Second arg = downstream collector.",
            "<b>Downstream collectors:</b> <code>groupingBy(key, counting())</code> → Map&lt;K,Long&gt;. <code>groupingBy(key, toSet())</code>. <code>groupingBy(key, summingInt(Order::getTotal))</code>.",
            "<b>partitioningBy():</b> split into {true, false} by predicate. Returns Map&lt;Boolean, List&lt;T&gt;&gt;.",
            "<b>joining():</b> <code>joining(\", \", \"[\", \"]\")</code> with delimiter, prefix, suffix.",
            "<b>toMap() duplicate key trap:</b> throws IllegalStateException on duplicate keys by default. Third arg = merge function: <code>toMap(k, v, (a, b) -&gt; b)</code>."
          ]
        },
        {
          heading: "Optional — Correct Usage",
          items: [
            "<b>Optional is for return types ONLY.</b> Not for fields, not for method parameters.",
            "<b>Never use Optional.get() without checking.</b> Use orElse(), orElseGet(), orElseThrow(), ifPresent(), map().",
            "<b>orElse vs orElseGet:</b> orElse always evaluates its argument. orElseGet(Supplier) is lazy — only evaluated if empty. Always use orElseGet for expensive defaults.",
            "<b>Optional.map() chaining:</b> <code>optional.map(User::getAddress).map(Address::getCity).orElse(\"Unknown\")</code> — clean null-safe chain.",
            "<b>Anti-pattern:</b> Optional.isPresent() + get() = null check in disguise. Defeats the purpose."
          ]
        },
        {
          heading: "Parallel Streams",
          items: [
            "<b>parallelStream():</b> splits work across ForkJoinPool.commonPool() threads.",
            "<b>Use when:</b> large data (&gt;10K elements), CPU-bound, no shared mutable state, easily splittable source.",
            "<b>Do NOT use when:</b> I/O operations, small data (overhead &gt; gain), side effects, operations that must stay ordered.",
            "<b>Blocking in parallel stream starves ForkJoinPool</b> — affects all other parallelStream() calls in same JVM."
          ]
        }
      ],
      traps: [
        "orElse() always evaluates — orElseGet() is lazy, critical for expensive defaults",
        "Collectors.toMap() throws on duplicate keys — always provide merge function for real-world data",
        "Parallel streams use common ForkJoinPool — blocking I/O operations starve the pool"
      ],
      checkpoint: [
        "What is the difference between orElse() and orElseGet()? When does the choice matter?",
        "Group a list of orders by customer, then for each customer get total order value. Write this pipeline.",
        "When would parallel stream make things SLOWER? Give a concrete scenario."
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "Stream Internals",
          items: [
            "<b>Spliterator:</b> the interface behind stream sources. Knows how to split for parallel processing and iterate. ArrayList has efficient Spliterator; LinkedList less so.",
            "<b>Characteristic flags:</b> ORDERED, DISTINCT, SORTED, SIZED. Stream tracks these — distinct() on a Set is a no-op (already DISTINCT).",
            "<b>Short-circuit operations:</b> findFirst(), anyMatch(), limit() stop processing early. Essential for infinite streams.",
            "<b>Infinite streams:</b> Stream.iterate(0, n-&gt;n+1), Stream.generate(Math::random). Always terminal with short-circuit or limit."
          ]
        },
        {
          heading: "Custom Collectors",
          items: [
            "<b>Collector interface:</b> supplier (create container) + accumulator (add element) + combiner (merge parallel results) + finisher (transform) + characteristics.",
            "<b>Collectors.teeing() (Java 12+):</b> apply two collectors simultaneously, merge results. One-pass computation of multiple aggregations.",
            "<b>Collector.of():</b> build custom collector. E.g., collect to ImmutableList or compute running statistics."
          ]
        }
      ],
      traps: [
        "Stream.iterate() without limit/takeWhile is infinite — hangs the program",
        "Spliterator.trySplit() returning null means source can't be split — parallel stream degrades to sequential",
        "Collectors.teeing() requires Java 12+ — check compatibility"
      ],
      checkpoint: [
        "How do parallel streams split work? What is a Spliterator?",
        "Write a custom Collector that collects strings into a comma-separated string without using Collectors.joining(). Describe the four required components.",
        "What is Collectors.teeing() and when would you use it?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Java candidate.\n\nTOPIC: Java Streams + Functional API (Block 5)\n\nYOUR ROLE: Reactive Socratic interviewer. No fixed questions.\n\nAPPROACH: Start accessible (what does this stream pipeline do), escalate to design (write a stream for X), then advanced (why does parallelStream fail here, explain lazy evaluation implication in this context).\n\nRULES: One question. React. Mix code questions with concept questions. 6–8 exchanges. PASS/BORDERLINE/FAIL verdict with specifics.\n\nBEGIN."
},

{
  id: 6, phase: "Java Fundamentals", chip: "java", freq: "high",
  title: "Java — Concurrency Primitives",
  subtitle: "JMM, volatile, synchronized, happens-before, Atomic classes, ReentrantLock",
  prereqs: [1],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Why Concurrency is Hard",
          items: [
            "<b>CPU caches:</b> each CPU core has its own cache. Changes in one core's cache are not immediately visible to others.",
            "<b>Instruction reordering:</b> CPU and JIT reorder instructions for performance. Single-threaded result preserved, but multi-threaded behaviour can be unexpected.",
            "<b>Three problems:</b> atomicity (operation isn't one indivisible step), visibility (change not seen by other threads), ordering (operations happen in unexpected order).",
            "<b>Race condition:</b> two threads read the same counter, both increment, both write — one increment is lost."
          ]
        },
        {
          heading: "synchronized",
          items: [
            "<b>synchronized block/method:</b> only one thread executes at a time. Others block until lock released.",
            "<b>On instance method:</b> locks 'this'. On static method: locks the Class object.",
            "<b>Guarantees:</b> mutual exclusion (atomicity) + memory visibility (happens-before). Changes inside synchronized visible to next thread that acquires the same lock.",
            "<b>Intrinsic lock (monitor):</b> every Java object has one. synchronized(obj) acquires obj's monitor."
          ]
        },
        {
          heading: "volatile",
          items: [
            "<b>volatile field:</b> writes flush to main memory immediately. Reads always from main memory. Guarantees visibility.",
            "<b>volatile does NOT guarantee atomicity.</b> <code>volatile int i; i++</code> is still a race condition (read-modify-write = three operations).",
            "<b>Use volatile for:</b> simple published references, status flags read by one thread written by another.",
            "<b>Not for:</b> compound operations (check-then-act, read-modify-write)."
          ]
        }
      ],
      traps: [
        "volatile i++ is still a race condition — volatile ensures visibility not atomicity",
        "synchronized on different objects = no mutual exclusion between those threads",
        "static synchronized methods lock the Class object, not 'this' — different lock than instance synchronized"
      ],
      checkpoint: [
        "What three problems does concurrent programming face?",
        "What is the difference between volatile and synchronized?",
        "Why is volatile int i; i++ still not thread-safe?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Happens-Before Guarantee",
          items: [
            "<b>happens-before:</b> formal guarantee that all effects of action A are visible to action B.",
            "<b>What establishes it:</b> synchronized block exit→entry on same lock. volatile write→read. Thread.start()→first action in thread. Thread.join()→subsequent action in joining thread.",
            "<b>Without happens-before:</b> no visibility guarantee even if operations seem ordered in time.",
            "<b>Double-checked locking:</b> broken without volatile on the field. Object reference can be seen before constructor finishes (reordering). volatile prevents this."
          ]
        },
        {
          heading: "Atomic Classes",
          items: [
            "<b>java.util.concurrent.atomic:</b> AtomicInteger, AtomicLong, AtomicBoolean, AtomicReference.",
            "<b>CAS (Compare-And-Swap):</b> hardware instruction. compareAndSet(expected, update) — atomically checks if current==expected, if yes sets to update. Returns boolean.",
            "<b>Non-blocking:</b> CAS doesn't use OS locks. Much faster than synchronized for single-variable operations under moderate contention.",
            "<b>LongAdder:</b> better than AtomicLong under high contention. Multiple cells reduce contention. Use for counters/statistics."
          ]
        },
        {
          heading: "ReentrantLock",
          items: [
            "<b>tryLock():</b> non-blocking attempt. <b>lockInterruptibly():</b> interruptible wait. <b>Fair mode:</b> longest-waiting thread gets lock first (reduces starvation but reduces throughput).",
            "<b>Must unlock in finally:</b> <code>lock.lock(); try { ... } finally { lock.unlock(); }</code>. Missing unlock = permanent deadlock.",
            "<b>Condition variables:</b> lock.newCondition(). More flexible than wait/notify — multiple conditions per lock."
          ]
        }
      ],
      traps: [
        "Forgetting unlock() in finally causes permanent deadlock — most common ReentrantLock bug",
        "AtomicReference.set() alone is not enough for compound check-then-act operations",
        "LongAdder.sum() is approximate under concurrent modification — not atomic"
      ],
      checkpoint: [
        "What is the happens-before relationship and why does it matter?",
        "When would you use ReentrantLock over synchronized?",
        "What is CAS and why is it faster than synchronized for counters?"
      ]
    },
    {
      level: "Advanced",
      time: "40 min",
      sections: [
        {
          heading: "Java Memory Model Deep Dive",
          items: [
            "<b>JMM defines legal executions.</b> Not what CPUs do, but what Java guarantees programmers.",
            "<b>Final field semantics:</b> JMM guarantees all threads see correctly initialised final fields after constructor returns — without synchronisation. Basis of immutable object thread safety.",
            "<b>Safe publication:</b> patterns for safely making an object visible to other threads: static initialiser, volatile field, final field, synchronized block, concurrent collection."
          ]
        },
        {
          heading: "Deadlock + Livelock + Starvation",
          items: [
            "<b>Deadlock:</b> Thread A holds lock1, waits for lock2. Thread B holds lock2, waits for lock1. Neither progresses.",
            "<b>Prevention:</b> always acquire locks in consistent order. Use tryLock() with timeout. Lock ordering by ID.",
            "<b>Detection:</b> thread dump (jstack) shows BLOCKED threads waiting on same lock chain.",
            "<b>Livelock:</b> threads keep responding to each other, neither blocked but neither completing.",
            "<b>Starvation:</b> thread never gets CPU time. Fair locks prevent starvation."
          ]
        }
      ],
      traps: [
        "Immutable objects are thread-safe ONLY if the reference is safely published",
        "Lock ordering for deadlock prevention must be consistent across ALL code paths",
        "tryLock() without timeout can still cause livelock — use tryLock(timeout, unit)"
      ],
      checkpoint: [
        "What makes an immutable object thread-safe and what does 'safe publication' mean?",
        "Describe a classic deadlock scenario and three ways to prevent it.",
        "What is the difference between deadlock and livelock?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing for a concurrent systems role.\n\nTOPIC: Java Concurrency Primitives (Block 6)\n\nYOUR ROLE: Reactive Socratic interviewer. High-signal topic — probe deeply.\n\nAPPROACH: Mix scenarios (two threads doing X — what's wrong?), internals (how does CAS work?), and design (fix this race condition).\n\nRULES: One question. React. If guessing, ask them to reason through it. If correct, find the edge case. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 7, phase: "Java Fundamentals", chip: "java", freq: "med",
  title: "Java — Threading + Virtual Threads",
  subtitle: "Thread lifecycle, thread pools, ThreadLocal traps, Java 21 virtual threads, executor framework",
  prereqs: [6],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Thread Basics",
          items: [
            "<b>Thread creation:</b> extend Thread (override run()) or implement Runnable. Prefer Runnable — doesn't waste inheritance.",
            "<b>Thread states:</b> NEW → RUNNABLE → (BLOCKED | WAITING | TIMED_WAITING) → TERMINATED.",
            "<b>BLOCKED:</b> waiting for monitor lock. <b>WAITING:</b> indefinitely (wait(), join()). <b>TIMED_WAITING:</b> with timeout (sleep, wait(ms)).",
            "<b>Thread.sleep(ms):</b> pauses current thread. Does NOT release held locks.",
            "<b>Object.wait():</b> releases lock and waits for notify(). Must be called inside synchronized block."
          ]
        },
        {
          heading: "ExecutorService",
          items: [
            "<b>Never create raw threads in production.</b> Use ExecutorService — thread reuse, lifecycle management.",
            "<b>newFixedThreadPool(n):</b> n threads, unbounded queue. Risk: queue grows indefinitely under sustained load.",
            "<b>newCachedThreadPool():</b> creates threads as needed, reuses idle. Risk: unbounded thread creation — never use for server-side request handling.",
            "<b>newSingleThreadExecutor():</b> one thread, ordered execution. For sequential background tasks.",
            "<b>Always shutdown executor:</b> executor.shutdown() (graceful) or shutdownNow() (interrupt running). Without shutdown, JVM stays alive."
          ]
        }
      ],
      traps: [
        "Thread.sleep() does NOT release held locks — common misconception",
        "newCachedThreadPool() can create thousands of threads under load — never use for server request handling",
        "Not calling shutdown() on ExecutorService prevents JVM exit"
      ],
      checkpoint: [
        "What is the difference between Thread.sleep() and Object.wait()?",
        "What are the risks of Executors.newCachedThreadPool() in a server application?",
        "What happens to in-progress ExecutorService tasks when you call shutdown() vs shutdownNow()?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "ThreadPoolExecutor Configuration",
          items: [
            "<b>Core parameters:</b> corePoolSize (min threads kept alive), maximumPoolSize (max under load), keepAliveTime (idle thread timeout), workQueue (pending tasks).",
            "<b>Thread creation logic:</b> active &lt; core → new thread. active &gt;= core → queue. Queue full → new thread up to max. Queue full + at max → rejection.",
            "<b>Queue type matters critically:</b> LinkedBlockingQueue (unbounded — maxPoolSize never reached!), ArrayBlockingQueue (bounded — maxPoolSize can be reached), SynchronousQueue (no queue — direct to new thread or reject).",
            "<b>RejectedExecutionHandler:</b> AbortPolicy (throw, default), CallerRunsPolicy (caller executes = natural backpressure), DiscardPolicy (silently drop), DiscardOldestPolicy."
          ]
        },
        {
          heading: "ThreadLocal",
          items: [
            "<b>ThreadLocal&lt;T&gt;:</b> per-thread storage. Each thread gets its own copy. No synchronisation needed.",
            "<b>Use cases:</b> request context (user ID, trace ID in MDC), database connections, SimpleDateFormat (not thread-safe).",
            "<b>Memory leak in thread pools:</b> threads are reused. If ThreadLocal not removed after task, next task on that thread sees stale data. Always call <code>remove()</code> in finally.",
            "<b>Virtual threads + ThreadLocal:</b> millions of virtual threads = millions of ThreadLocal instances. Use ScopedValues (Java 21) instead."
          ]
        }
      ],
      traps: [
        "ThreadLocal in thread pool without remove() causes stale data for next task on same thread",
        "LinkedBlockingQueue with ThreadPoolExecutor means maximumPoolSize is NEVER reached — queue grows infinitely",
        "CallerRunsPolicy is backpressure — submitting thread executes the task itself when pool is saturated"
      ],
      checkpoint: [
        "Explain ThreadPoolExecutor thread creation logic. When does it create a new thread vs queue vs reject?",
        "What is the ThreadLocal memory leak and how do you prevent it?",
        "How do you size a thread pool for I/O-bound vs CPU-bound tasks?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "Virtual Threads (Java 21)",
          items: [
            "<b>Virtual threads = JVM-managed lightweight threads.</b> Not OS threads. JVM can create millions.",
            "<b>How it works:</b> virtual thread runs on a carrier OS thread. When virtual thread blocks (I/O, sleep), it unmounts — carrier is freed to run another virtual thread. On unblock, remounts (possibly different carrier).",
            "<b>Impact:</b> WebFlux/reactive was needed to avoid blocking OS threads. Virtual threads achieve the same with blocking code. Simpler code, same scalability.",
            "<b>Create:</b> <code>Thread.ofVirtual().start(runnable)</code> or <code>Executors.newVirtualThreadPerTaskExecutor()</code>.",
            "<b>Pinning:</b> virtual thread cannot unmount when inside a <code>synchronized</code> block or native frame. Use ReentrantLock instead of synchronized in virtual-thread-heavy code."
          ]
        },
        {
          heading: "Structured Concurrency (Java 21 Preview)",
          items: [
            "<b>StructuredTaskScope:</b> treat concurrent tasks as a unit. Automatic cleanup — if one fails, others cancelled.",
            "<b>ShutdownOnFailure:</b> cancel all tasks if any fails. <b>ShutdownOnSuccess:</b> cancel remaining when first succeeds.",
            "<b>Why it's better than CompletableFuture:</b> no manual tracking, automatic cleanup, clear error propagation."
          ]
        }
      ],
      traps: [
        "synchronized blocks pin virtual threads to carrier — prevents unmounting, defeats scalability benefit",
        "Virtual threads do NOT help CPU-bound work — only blocking I/O benefits from virtual threads",
        "Millions of virtual threads with ThreadLocal = millions of instances — use ScopedValues"
      ],
      checkpoint: [
        "What is 'pinning' in virtual threads and why is it a problem?",
        "When would virtual threads NOT improve performance over platform threads?",
        "What problem does structured concurrency solve that CompletableFuture doesn't?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Java backend candidate.\n\nTOPIC: Java Threading + Virtual Threads (Block 7)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with thread pool design decisions, move to ThreadLocal traps, then probe virtual thread understanding. Test when virtual threads help vs don't.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 8, phase: "Java Fundamentals", chip: "java", freq: "med",
  title: "Java — JVM Internals + GC",
  subtitle: "Memory regions, GC algorithms, JIT compilation, class loading, production tuning",
  prereqs: [1],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "JVM Memory Regions",
          items: [
            "<b>Heap:</b> all objects. Young Gen (Eden + Survivor S0/S1) + Old Gen (Tenured). Shared across threads. GC-managed.",
            "<b>Stack:</b> per-thread. Stack frames = local vars + method calls + operand stack. StackOverflowError = unbounded recursion.",
            "<b>Metaspace (Java 8+):</b> class metadata, static vars, interned strings. Not on heap. Grows dynamically. OOM in metaspace = classloader leak or reflection abuse.",
            "<b>Code Cache:</b> JIT-compiled native code. Fixed size by default. If full, JIT stops compiling — performance degrades silently."
          ]
        },
        {
          heading: "Garbage Collection Basics",
          items: [
            "<b>Minor GC:</b> collects Young Gen. Fast (small), stop-the-world but brief.",
            "<b>Major/Full GC:</b> collects Old Gen. Slow, long pause. Triggered when Old Gen fills.",
            "<b>Object lifecycle:</b> new object → Eden → (survives Minor GC) → Survivor → (survives N GCs, default ~15) → Old Gen.",
            "<b>GC roots:</b> stack vars, static fields, JNI refs. Anything reachable from roots = alive. Unreachable = eligible for collection."
          ]
        }
      ],
      traps: [
        "StackOverflowError is from stack not heap — different from OutOfMemoryError",
        "Metaspace OOM cannot be fixed by increasing heap size (-Xmx)",
        "Minor GC still causes stop-the-world — just shorter than Major GC"
      ],
      checkpoint: [
        "What is the difference between heap and stack in the JVM?",
        "When does an object move from Young Gen to Old Gen?",
        "What is a GC root?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "GC Algorithms",
          items: [
            "<b>Serial GC:</b> single thread, stop-the-world. Tiny apps only.",
            "<b>Parallel GC:</b> multi-thread GC, still stop-the-world. High throughput. For batch jobs where pause time is acceptable.",
            "<b>G1GC (default Java 9+):</b> divides heap into equal regions. Collects highest-garbage regions first. Predictable pause target (default 200ms). Best for 4GB+ heaps with latency requirements.",
            "<b>ZGC:</b> sub-millisecond pauses. Concurrent marking + relocation. For latency-critical services. Handles TB-scale heaps.",
            "<b>Choose by what you can't afford:</b> latency → ZGC. Throughput → Parallel. Balance → G1."
          ]
        },
        {
          heading: "GC Tuning",
          items: [
            "<b>-Xms/-Xmx:</b> initial/max heap. Set equal to avoid resizing pauses: <code>-Xms4g -Xmx4g</code>.",
            "<b>-XX:MaxGCPauseMillis=200:</b> G1 pause target. G1 adjusts which regions to collect.",
            "<b>GC logging (Java 9+):</b> <code>-Xlog:gc*:file=gc.log:time,uptime:filecount=5,filesize=10m</code>. Essential for diagnosis.",
            "<b>Signs of GC problems:</b> frequent Full GCs, growing Old Gen (memory leak), long pause times, high allocation rate."
          ]
        }
      ],
      traps: [
        "-Xms != -Xmx causes heap resizing pauses under load — always set equal in production",
        "G1GC pause target is a target not a guarantee — large Old Gen regions may cause longer pauses",
        "ZGC trades throughput for latency — wrong choice for batch processing"
      ],
      checkpoint: [
        "When would you choose ZGC over G1GC?",
        "What does -Xms4g -Xmx4g do and why should Xms equal Xmx in production?",
        "Your application has frequent Full GC pauses. What are the top 3 causes and how do you diagnose each?"
      ]
    },
    {
      level: "Advanced",
      time: "40 min",
      sections: [
        {
          heading: "JIT Compilation",
          items: [
            "<b>JIT:</b> JVM interprets bytecode initially, profiles hot methods, then JIT-compiles to native code.",
            "<b>Tiered compilation:</b> C1 (fast compile, light optimisation) → C2 (heavy optimisation: inlining, loop unrolling, escape analysis).",
            "<b>Warmup period:</b> JVM needs time for JIT. Cold start = slow. Warmed up = fast. Why microbenchmarks need JMH.",
            "<b>GraalVM native image:</b> ahead-of-time compilation. No JIT. Fast startup (&lt;100ms). Lower peak throughput. Reflection needs explicit config."
          ]
        },
        {
          heading: "Memory Leaks + Diagnosis",
          items: [
            "<b>Common leak patterns:</b> static collections holding objects, listeners not deregistered, ThreadLocal not cleaned, inner class holding outer class reference.",
            "<b>Diagnosis tools:</b> jmap -histo (object histogram), heap dump (jmap -dump or -XX:+HeapDumpOnOutOfMemoryError), Eclipse MAT / VisualVM to analyse dump, JFR for continuous profiling.",
            "<b>WeakReference vs SoftReference:</b> WeakReference — collected at any GC when no strong refs. SoftReference — collected only under memory pressure. PhantomReference — post-GC cleanup.",
            "<b>Heap dump at OOM:</b> use <code>-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/heap.hprof</code> in production — captures state at the moment of OOM."
          ]
        }
      ],
      traps: [
        "GraalVM native image doesn't support all Java features — reflection needs registration",
        "Heap dump at OOM may be incomplete if JVM is in bad state — enable HeapDumpOnOutOfMemoryError in advance",
        "SoftReference is cleared before OOM, not at first GC — don't rely on it for deterministic memory management"
      ],
      checkpoint: [
        "What is tiered compilation and why does it matter for application startup?",
        "Walk me through diagnosing a memory leak in production using JVM tooling.",
        "What is the difference between WeakReference and SoftReference? Give a use case for each."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Java backend candidate.\n\nTOPIC: JVM Internals + Garbage Collection (Block 8)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix production scenarios (app has long GC pauses, diagnose it), internals (how does G1 decide which regions to collect), and tooling (what JVM flags/tools would you use).\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

// ════════════════════════════════════════════════════════════
// PHASE 2 — SPRING ECOSYSTEM (start)
// ════════════════════════════════════════════════════════════

{
  id: 9, phase: "Spring Ecosystem", chip: "spring", freq: "high",
  title: "Spring Core — IoC + Bean Lifecycle",
  subtitle: "Container internals, bean scopes, auto-configuration, @Conditional, extension points",
  prereqs: [7, 8],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "IoC + Dependency Injection",
          items: [
            "<b>IoC:</b> you don't create dependencies, the container does. You declare what you need, Spring provides it.",
            "<b>DI types:</b> constructor injection (recommended — immutable, testable, explicit deps), setter injection (optional deps), field injection (@Autowired on field — hard to test, avoid).",
            "<b>Why constructor injection:</b> dependencies explicit in signature, object always in valid state, easy unit testing without Spring.",
            "<b>@Component, @Service, @Repository, @Controller:</b> all auto-detected by component scan. @Repository adds exception translation. @Service is semantic only.",
            "<b>@Bean in @Configuration:</b> explicit instantiation. More control. Use for third-party classes you can't annotate."
          ]
        },
        {
          heading: "Bean Scopes",
          items: [
            "<b>singleton (default):</b> one instance per ApplicationContext. Shared. All injections get same instance.",
            "<b>prototype:</b> new instance per injection/lookup. Not managed after creation (@PreDestroy not called).",
            "<b>request:</b> one per HTTP request. Web contexts only.",
            "<b>session:</b> one per HTTP session.",
            "<b>Scope mismatch trap:</b> injecting prototype into singleton = prototype becomes singleton (same instance forever). Fix: ObjectProvider&lt;T&gt; or @Lookup method."
          ]
        }
      ],
      traps: [
        "Field injection with @Autowired creates hidden dependencies and makes unit testing without Spring impossible",
        "Prototype bean injected into singleton behaves like singleton — prototype's new instance never created again",
        "@Repository adds exception translation — plain @Component on a repository misses this"
      ],
      checkpoint: [
        "Why is constructor injection preferred over field injection?",
        "What happens when you inject a prototype-scoped bean into a singleton bean?",
        "What is the difference between @Component and @Bean?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Auto-Configuration Mechanism",
          items: [
            "<b>@SpringBootApplication = @Configuration + @ComponentScan + @EnableAutoConfiguration.</b>",
            "<b>Auto-configuration:</b> Spring Boot reads META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. Each entry is a @Configuration with conditional annotations.",
            "<b>@ConditionalOnClass:</b> activate only if class is on classpath. <b>@ConditionalOnMissingBean:</b> only if no user-defined bean of that type. <b>@ConditionalOnProperty:</b> only if property set.",
            "<b>Why it works:</b> add spring-boot-starter-data-jpa → JPA classes on classpath → JPA auto-config activates. Define your own DataSource → Spring's default backs off.",
            "<b>Debug:</b> --debug flag shows which auto-configurations activated/skipped and why."
          ]
        },
        {
          heading: "Application Context Lifecycle",
          items: [
            "<b>Lifecycle:</b> load bean definitions → instantiate singletons → inject dependencies → @PostConstruct callbacks → context ready.",
            "<b>@PostConstruct:</b> runs after all dependencies injected. If throws, bean creation fails — app may not start.",
            "<b>@PreDestroy:</b> runs before container shuts down. For cleanup (close connections, flush buffers).",
            "<b>ApplicationContextAware:</b> anti-pattern for most cases — use DI instead. Legitimate for plugin/extension systems."
          ]
        }
      ],
      traps: [
        "Auto-configuration backs off when you define your own bean — @ConditionalOnMissingBean is why",
        "@PostConstruct throwing an exception fails the bean creation and may prevent application startup",
        "ApplicationContextAware creates tight coupling to Spring framework — avoid"
      ],
      checkpoint: [
        "How does Spring Boot know to auto-configure a DataSource when you add the JPA starter?",
        "@ConditionalOnProperty(name='feature.x', havingValue='true') — when does the configuration activate and when not?",
        "What happens if @PostConstruct throws an exception?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "Extension Points",
          items: [
            "<b>BeanPostProcessor:</b> intercepts all bean creation. postProcessBeforeInitialization() before @PostConstruct. postProcessAfterInitialization() after. This is where Spring AOP proxy creation happens.",
            "<b>BeanFactoryPostProcessor:</b> runs before beans are instantiated. Can modify bean definitions. PropertySourcesPlaceholderConfigurer resolves @Value placeholders here.",
            "<b>ImportBeanDefinitionRegistrar:</b> programmatically register bean definitions. Used by @EnableJpaRepositories to register repository proxy beans.",
            "<b>FactoryBean&lt;T&gt;:</b> bean that produces another bean. getObject() returns actual bean. Used for SqlSessionFactory, ConnectionFactory."
          ]
        },
        {
          heading: "Circular Dependencies + Scope Proxies",
          items: [
            "<b>Circular dependency:</b> A→B, B→A. Spring breaks cycles with early-exposure proxy for singleton beans. Constructor-injection cycles always fail (cannot be broken).",
            "<b>@Lazy:</b> inject lazy proxy that initialises on first use. Breaks circular dependency cycle. Also delays expensive initialisation.",
            "<b>Scoped proxy:</b> @Scope(proxyMode=ScopedProxyMode.TARGET_CLASS). Singleton gets proxy that delegates to correct scope (request/session) at runtime."
          ]
        }
      ],
      traps: [
        "Constructor injection circular dependencies cannot be resolved by Spring — must refactor",
        "Scoped proxy requires CGLIB — final classes cannot be proxied this way",
        "BeanFactoryPostProcessor runs before instantiation — cannot inject regular beans into it via @Autowired"
      ],
      checkpoint: [
        "What is a BeanPostProcessor and how does Spring AOP use it?",
        "How does Spring resolve a circular dependency between two singleton beans? When does it fail?",
        "What is a scoped proxy and when do you need one?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Spring Boot backend candidate.\n\nTOPIC: Spring Core — IoC + Bean Lifecycle (Block 9)\n\nYOUR ROLE: Reactive Socratic interviewer. High-signal topic — deep probe.\n\nAPPROACH: Mix 'explain how X works' with 'what happens when Y' scenarios and 'debug this' cases. Test auto-configuration understanding, scope mismatches, circular dependencies.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 10, phase: "Spring Ecosystem", chip: "spring", freq: "high",
  title: "Spring Data JPA — Entity Mapping",
  subtitle: "@Entity, ID generation, @Embedded, @Enumerated, inheritance strategies, schema management",
  prereqs: [9],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Basic Entity Mapping",
          items: [
            "<code>@Entity</code> marks class as JPA entity. <code>@Table(name='...')</code> overrides table name.",
            "<code>@Id</code> marks primary key. <code>@GeneratedValue</code> strategies: IDENTITY (DB auto-increment), SEQUENCE (DB sequence, better for batch), AUTO (JPA decides), TABLE (portable but slow).",
            "<code>@Column(name='...', nullable=false, length=255)</code> — override column name and constraints. Constraints affect schema generation NOT runtime validation.",
            "<code>@Transient</code> — field not persisted. <code>@Lob</code> maps to CLOB/BLOB.",
            "<b>Naming convention:</b> camelCase field → snake_case column by default (SpringPhysicalNamingStrategy). <code>userId</code> → <code>user_id</code>."
          ]
        },
        {
          heading: "ID Generation",
          items: [
            "<b>IDENTITY (most common with Postgres/MySQL):</b> DB auto-increment. Hibernate cannot batch inserts — each insert needs round trip for generated ID.",
            "<b>SEQUENCE (best for Postgres):</b> DB sequence. Hibernate fetches ID range in advance (allocationSize=50 default). Enables batch insert.",
            "<b>UUID as ID:</b> globally unique. Random UUIDs fragment B-tree index. Use UUID v7 (time-ordered) or ULID for better index locality.",
            "<b>@UuidGenerator(style=TIME):</b> Hibernate 6+ generates time-ordered UUIDs automatically."
          ]
        }
      ],
      traps: [
        "@Column(nullable=false) only affects schema generation — use @NotNull for runtime validation",
        "IDENTITY strategy prevents Hibernate batch inserts — use SEQUENCE for write-heavy tables",
        "Random UUID as PK causes B-tree fragmentation — use time-ordered UUID or ULID"
      ],
      checkpoint: [
        "What is the difference between @Column(nullable=false) and @NotNull?",
        "Why is SEQUENCE generation strategy better than IDENTITY for batch inserts?",
        "What is the downside of using random UUID as primary key?"
      ]
    },
    {
      level: "Intermediate",
      time: "40 min",
      sections: [
        {
          heading: "@Embeddable + @Enumerated",
          items: [
            "<code>@Embeddable</code> + <code>@Embedded</code> — embed value object into entity. Columns in same table. Use for Address (street, city, zip) in User entity.",
            "<code>@AttributeOverride</code> — override column names when embedding same type twice.",
            "<code>@Enumerated(EnumType.ORDINAL)</code> — stores 0,1,2... DANGEROUS: adding enum values in middle changes ordinals. Never use.",
            "<code>@Enumerated(EnumType.STRING)</code> — stores enum name. Safer. But renaming constant breaks DB data.",
            "<b>Best practice:</b> use AttributeConverter. Store stable code (not name) in DB. Enum rename doesn't break data."
          ]
        },
        {
          heading: "Inheritance Strategies",
          items: [
            "<b>SINGLE_TABLE (default):</b> all subclasses in one table. @DiscriminatorColumn. Simple, fast queries. Nullable columns for subclass fields.",
            "<b>TABLE_PER_CLASS:</b> each concrete class has own table. No joins. No polymorphic queries, duplicate columns.",
            "<b>JOINED:</b> parent table + subclass tables. Joined on PK. Normalised. JOIN on every query.",
            "<b>Use SINGLE_TABLE for simple hierarchies. JOINED for complex with many subclass fields. Avoid TABLE_PER_CLASS.</b>"
          ]
        }
      ],
      traps: [
        "EnumType.ORDINAL breaks when you insert new enum value between existing ones — always use STRING or converter",
        "SINGLE_TABLE has nullable columns for subclass fields — DB constraints can't enforce subclass-specific rules",
        "@AttributeOverride required when embedding same @Embeddable twice — otherwise column name conflict"
      ],
      checkpoint: [
        "Why is EnumType.ORDINAL dangerous? What is the best approach?",
        "When would you choose JOINED inheritance over SINGLE_TABLE?",
        "Design a Vehicle hierarchy (Car, Truck). Which inheritance strategy and why?"
      ]
    },
    {
      level: "Advanced",
      time: "30 min",
      sections: [
        {
          heading: "Custom Type Mapping + Schema Management",
          items: [
            "<b>AttributeConverter&lt;X,Y&gt;:</b> X = Java type, Y = DB type. Convert in both directions. @Converter(autoApply=true) applies to all fields of that type.",
            "<b>JSONB with Hibernate 6:</b> @JdbcTypeCode(SqlTypes.JSON) for JSONB columns in Postgres.",
            "<b>spring.jpa.hibernate.ddl-auto:</b> none (production), validate (check schema), update (risky — can drop columns), create-drop (tests only).",
            "<b>Never use update in production.</b> Use Flyway or Liquibase for versioned migrations.",
            "<b>Physical vs implicit naming strategy:</b> physical = final DB name. Implicit = Java→DB name conversion logic."
          ]
        }
      ],
      traps: [
        "ddl-auto=update in production can drop columns or cause data loss — always use none + migration tool",
        "@Table(indexes) only works with schema generation — doesn't add indexes to existing databases",
        "@Column(columnDefinition='jsonb') breaks portability but sometimes necessary for Postgres-specific types"
      ],
      checkpoint: [
        "Why should you never use ddl-auto=update in production?",
        "How would you map a Postgres JSONB column in a Spring entity?",
        "Write an AttributeConverter that encrypts a String field before storing and decrypts on read."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Spring Boot backend candidate.\n\nTOPIC: Spring Data JPA — Entity Mapping (Block 10)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Entity design scenarios ('model this domain'), internals probes (why is ORDINAL dangerous), production awareness (what ddl-auto in prod and why).\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 11, phase: "Spring Ecosystem", chip: "spring", freq: "high",
  title: "Spring Data JPA — Relationships",
  subtitle: "@OneToMany, @ManyToOne, fetch types, cascades, orphanRemoval, N+1 problem and ALL fixes",
  prereqs: [10],
  tiers: [
    {
      level: "Beginner",
      time: "40 min",
      sections: [
        {
          heading: "Relationship Annotations",
          items: [
            "<code>@ManyToOne:</code> FK in owning entity. Most common relationship. Default EAGER (problem).",
            "<code>@OneToMany(mappedBy='field'):</code> mappedBy points to @ManyToOne field on child side. Default LAZY.",
            "<code>@OneToOne:</code> FK in either table. Use @PrimaryKeyJoinColumn for shared PK.",
            "<code>@ManyToMany:</code> requires join table via @JoinTable.",
            "<b>Owning side = the side with FK or @JoinTable. Inverse side has mappedBy. Only changes to owning side affect the database.</b>"
          ]
        },
        {
          heading: "Fetch Types",
          items: [
            "<b>FetchType.LAZY (default @OneToMany, @ManyToMany):</b> loaded on first access. Better performance when related data not always needed.",
            "<b>FetchType.EAGER (default @ManyToOne, @OneToOne):</b> loaded with parent. Convenient but causes performance issues at scale.",
            "<b>LazyInitializationException:</b> accessing lazy collection after transaction closes. Hibernate session closed. Fix: load within transaction, use DTO, or JOIN FETCH.",
            "<b>Always use LAZY everywhere.</b> Fetch eagerly only for the specific query that needs it."
          ]
        }
      ],
      traps: [
        "LazyInitializationException — accessing lazy collection after transaction closes",
        "Bidirectional relationship — must update BOTH sides or DB and object graph become inconsistent",
        "@ManyToOne defaults to EAGER — causes unexpected extra queries"
      ],
      checkpoint: [
        "What is a LazyInitializationException and how do you prevent it?",
        "I have bidirectional @OneToMany/@ManyToOne. I add a child to the parent's list but don't set the parent on the child. What happens in the DB?",
        "Why should you prefer LAZY fetching by default?"
      ]
    },
    {
      level: "Intermediate",
      time: "50 min",
      sections: [
        {
          heading: "Cascade Types + orphanRemoval",
          items: [
            "<b>CascadeType.PERSIST:</b> saving parent saves children. <b>MERGE:</b> merging parent merges children. <b>REMOVE:</b> deleting parent deletes children.",
            "<b>CascadeType.ALL:</b> all cascades. Use carefully — REMOVE on @ManyToMany can delete shared entities.",
            "<b>orphanRemoval=true:</b> removing child from parent's collection triggers child deletion in DB. Stronger than REMOVE.",
            "<b>Rule:</b> cascade only within aggregate root → component relationships. Never cascade across aggregate boundaries."
          ]
        },
        {
          heading: "The N+1 Problem — All Fixes",
          items: [
            "<b>N+1:</b> load N entities, then load each entity's association with separate query = 1 + N queries.",
            "<b>Fix 1 — JOIN FETCH:</b> <code>SELECT o FROM Order o JOIN FETCH o.items</code>. Single query. Use DISTINCT or Set for multiple collections.",
            "<b>Fix 2 — @EntityGraph:</b> <code>@EntityGraph(attributePaths = {'items', 'customer'})</code> on repository method. Overrides fetch type per query.",
            "<b>Fix 3 — @BatchSize:</b> loads in batches of N rather than one-by-one. Reduces N+1 to N/batchSize+1.",
            "<b>Fix 4 — DTO projection:</b> select only what you need. No entity. Best for read-only.",
            "<b>Detect N+1:</b> p6spy, spring.jpa.show-sql=true, Hibernate Statistics, query count assertions in tests."
          ]
        }
      ],
      traps: [
        "JOIN FETCH with @OneToMany produces duplicate parent rows — use DISTINCT or collect to Set",
        "CascadeType.REMOVE on @ManyToMany deletes shared entities — only orphanRemoval on exclusive relationships",
        "@EntityGraph doesn't work with sorting in Spring Data — combine with @Query if sorting needed"
      ],
      checkpoint: [
        "Explain N+1 with a concrete example. What are the four ways to fix it?",
        "When would you use @BatchSize instead of JOIN FETCH?",
        "What is the difference between CascadeType.REMOVE and orphanRemoval=true?"
      ]
    },
    {
      level: "Advanced",
      time: "40 min",
      sections: [
        {
          heading: "Performance + Bidirectional Sync",
          items: [
            "<b>MultipleBagFetchException:</b> cannot JOIN FETCH two @OneToMany collections simultaneously. Fix: use Set for one, or fetch separately with @BatchSize.",
            "<b>DTO projections with JPQL:</b> <code>SELECT new com.example.OrderDTO(o.id, o.total) FROM Order o</code>. No entity, no persistence context overhead.",
            "<b>Bidirectional helper methods:</b> addChild(child) sets child's parent AND adds to collection. Keeps object graph consistent. Critical for correctness.",
            "<b>equals/hashCode in entities:</b> don't base on @Id for new (unpersisted) entities (null ID). Use business key or UUID assigned in constructor."
          ]
        },
        {
          heading: "Read-Only + @Transactional(readOnly=true)",
          items: [
            "<b>@Transactional(readOnly=true) on repository methods:</b> Hibernate skips dirty checking (no snapshot comparison at flush). Performance benefit for read-heavy operations.",
            "<b>Read replica routing:</b> readOnly transactions can route to read replicas via Spring's LazyConnectionDataSourceProxy.",
            "<b>Does NOT prevent writes</b> — you can still call save() inside a readOnly transaction. It just disables dirty checking optimisation."
          ]
        }
      ],
      traps: [
        "Hibernate proxy instanceof returns false for proxied entities — use Hibernate.getClass(entity)",
        "equals/hashCode based on @Id breaks for new unpersisted entities with null ID",
        "@Transactional(readOnly=true) does NOT prevent writes — only disables dirty checking"
      ],
      checkpoint: [
        "What is MultipleBagFetchException and how do you fix it?",
        "How should you implement equals/hashCode for a JPA entity? What's wrong with using database ID?",
        "What exactly does @Transactional(readOnly=true) do differently from a regular transaction?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Spring Data JPA candidate.\n\nTOPIC: JPA Relationships (Block 11)\n\nYOUR ROLE: Reactive Socratic interviewer. N+1 is a must-know — probe deeply. Test cascade understanding, fetch type decisions, bidirectional relationship gotchas.\n\nAPPROACH: Code analysis ('what's wrong with this entity design'), design scenarios, production diagnosis.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 12, phase: "Spring Ecosystem", chip: "spring", freq: "high",
  title: "Spring Data JPA — Querying",
  subtitle: "Derived methods, JPQL, native queries, projections, pagination, @Query",
  prereqs: [11],
  tiers: [
    {
      level: "Beginner",
      time: "35 min",
      sections: [
        {
          heading: "Derived Query Methods",
          items: [
            "<b>Spring Data auto-generates queries from method names.</b> <code>findByEmail(String email)</code> → SELECT ... WHERE email = ?",
            "<b>Keywords:</b> findBy, countBy, deleteBy. Conditions: And, Or, Between, LessThan, GreaterThan, Like, In, IsNull, OrderBy.",
            "<code>findByFirstNameAndLastName(String first, String last)</code> — AND condition.",
            "<code>findByAgeGreaterThanOrderByNameAsc(int age)</code> — comparison + sort.",
            "<code>findTop3ByOrderByCreatedAtDesc()</code> — top 3 most recent."
          ]
        },
        {
          heading: "@Query Annotation",
          items: [
            "<code>@Query(\"SELECT u FROM User u WHERE u.email = :email\")</code> — JPQL. References entity class name, not table name.",
            "<code>@Query(value=\"SELECT * FROM users WHERE email = :email\", nativeQuery=true)</code> — native SQL.",
            "<b>Named parameters:</b> :paramName with @Param(\"paramName\") on method argument.",
            "<code>@Modifying + @Transactional</code> required for UPDATE/DELETE queries. Without @Modifying, Spring throws exception."
          ]
        }
      ],
      traps: [
        "@Modifying required for update/delete @Query — forgetting it throws InvalidDataAccessApiUsageException",
        "JPQL uses entity class names not table names — common mistake from SQL background",
        "nativeQuery=true returns Object[] not entities unless you use interface projection"
      ],
      checkpoint: [
        "Write a derived query to find all users with age > 18 ordered by name ascending.",
        "What is wrong with: @Query(\"SELECT * FROM user WHERE id = :id\")?",
        "What annotations do you need for a @Query that updates records?"
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Projections",
          items: [
            "<b>Interface projection:</b> interface with getters. Spring Data returns proxy. Only selected fields fetched. <code>interface UserSummary { String getName(); String getEmail(); }</code>",
            "<b>DTO projection with @Query:</b> <code>SELECT new com.example.UserDTO(u.name, u.email) FROM User u</code>. Requires DTO constructor. Explicit.",
            "<b>Dynamic projections:</b> <code>&lt;T&gt; T findById(Long id, Class&lt;T&gt; type)</code> — caller specifies type.",
            "<b>When to use:</b> read-only use cases. Reduces persistence context overhead and data transfer."
          ]
        },
        {
          heading: "Pagination",
          items: [
            "<b>Pageable parameter:</b> add to any method. Returns Page&lt;T&gt; (with total count) or Slice&lt;T&gt; (no total count).",
            "<code>PageRequest.of(page, size, Sort.by(\"createdAt\").descending())</code>",
            "<b>Page vs Slice:</b> Page runs COUNT(*) — expensive on large tables. Slice only fetches next page. Use Slice for infinite scroll.",
            "<b>Keyset pagination:</b> WHERE id &gt; lastId ORDER BY id LIMIT n. No COUNT, no OFFSET. Scales to millions of rows. Manual implementation."
          ]
        }
      ],
      traps: [
        "Page<T> runs an additional COUNT query — expensive on large tables, use Slice<T> for infinite scroll",
        "OFFSET pagination degrades linearly — OFFSET 9,999,000 in a 10M row table scans 10M rows",
        "Interface projections with SpEL expressions can trigger additional queries — check generated SQL"
      ],
      checkpoint: [
        "What is the difference between Page&lt;T&gt; and Slice&lt;T&gt;? When do you use each?",
        "I have a 50 million row table and users can page through results. What pagination strategy and why?",
        "What is an interface projection and how does it differ from a DTO projection?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "Custom Repository Implementations",
          items: [
            "<b>Custom fragment:</b> interface UserRepositoryCustom + class UserRepositoryCustomImpl. Both extended in UserRepository.",
            "<b>EntityManager injection:</b> inject EntityManager in custom impl. Build CriteriaQuery or native queries directly.",
            "<b>Stored procedures:</b> @NamedStoredProcedureQuery or @Procedure on repository method.",
            "<b>QueryDSL:</b> QuerydslPredicateExecutor&lt;T&gt; + Q-classes from APT. Type-safe queries. More refactor-safe than string-based approaches."
          ]
        }
      ],
      traps: [
        "Custom impl class must end in 'Impl' by default — Spring Data convention, configurable via repositoryImplementationPostfix",
        "QueryDSL Q-classes must be regenerated after entity changes — easy to miss in CI if APT not configured",
        "Specifications don't work with @Query — use EntityManager or QueryDSL for complex dynamic queries"
      ],
      checkpoint: [
        "Walk me through creating a custom repository implementation that uses EntityManager directly.",
        "What is QueryDSL and how does it improve on string-based queries?",
        "When would you write a native SQL @Query vs JPQL vs Specification vs QueryDSL?"
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Spring Data JPA candidate.\n\nTOPIC: JPA Querying (Block 12)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix 'write this query' tasks, 'which approach' decisions, and 'what goes wrong' traps. Test when to use each approach, not just that they exist.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
},

{
  id: 13, phase: "Spring Ecosystem", chip: "spring", freq: "high",
  title: "Spring Data JPA — Criteria API + Specifications",
  subtitle: "CriteriaBuilder, Predicate, Specification pattern, QueryDSL comparison, dynamic filter design",
  prereqs: [12],
  tiers: [
    {
      level: "Beginner",
      time: "35 min",
      sections: [
        {
          heading: "Why Criteria API Exists",
          items: [
            "<b>Problem:</b> @Query strings can't conditionally include/exclude WHERE clauses. Dynamic filters need programmatic query building.",
            "<b>Criteria API = type-safe, programmatic query builder.</b> Build queries as objects instead of strings.",
            "<b>Three core objects:</b> CriteriaBuilder (factory for predicates and expressions), CriteriaQuery (SELECT, WHERE, ORDER BY), Root&lt;T&gt; (the FROM clause, path to entity fields).",
            "<b>Predicate:</b> a WHERE condition. Combined with cb.and(), cb.or(), cb.not()."
          ]
        },
        {
          heading: "Basic Criteria Query",
          items: [
            "<code>CriteriaBuilder cb = em.getCriteriaBuilder();</code>",
            "<code>CriteriaQuery&lt;User&gt; cq = cb.createQuery(User.class);</code>",
            "<code>Root&lt;User&gt; user = cq.from(User.class);</code>",
            "<code>cq.select(user).where(cb.equal(user.get(\"email\"), email));</code>",
            "<code>em.createQuery(cq).getResultList();</code>",
            "<b>Verbose but powerful.</b> Spring Specifications wrap this and make it composable."
          ]
        }
      ],
      traps: [
        "Root.get('fieldName') uses strings — typos cause runtime errors, not compile errors",
        "CriteriaBuilder and CriteriaQuery are not thread-safe — create new instances per query",
        "Criteria API strings are not validated at compile time — use Metamodel or QueryDSL for type safety"
      ],
      checkpoint: [
        "Why can't you solve dynamic filtering with @Query strings?",
        "What are CriteriaBuilder, CriteriaQuery, and Root — what is each responsible for?",
        "Write a Criteria query that finds users with email matching a parameter."
      ]
    },
    {
      level: "Intermediate",
      time: "45 min",
      sections: [
        {
          heading: "Specification Pattern",
          items: [
            "<b>Specification&lt;T&gt;:</b> functional interface: <code>Predicate toPredicate(Root&lt;T&gt; root, CriteriaQuery&lt;?&gt; query, CriteriaBuilder cb)</code>.",
            "<b>JpaSpecificationExecutor&lt;T&gt;:</b> extend in repository. Gains findAll(Specification), findOne(Specification), count(Specification).",
            "<b>Composing:</b> spec1.and(spec2), spec1.or(spec2), Specification.not(spec).",
            "<b>Dynamic filter pattern:</b> <code>Specification&lt;User&gt; spec = Specification.where(null); if(name != null) spec = spec.and(hasName(name));</code>",
            "<b>Null-safe:</b> returning null from toPredicate = no restriction (TRUE predicate — matches everything). Use for optional filters."
          ]
        },
        {
          heading: "Readable Factory Methods",
          items: [
            "<code>static Specification&lt;User&gt; hasName(String name) { return name == null ? null : (root, query, cb) -&gt; cb.equal(root.get(\"name\"), name); }</code>",
            "<b>Compose at service layer:</b> clean separation between specification building and business logic.",
            "<b>Testing:</b> unit test with @DataJpaTest + real Specifications against test DB."
          ]
        }
      ],
      traps: [
        "Null-returning toPredicate = no restriction (matches everything), NOT zero results — common logical error",
        "Specifications with JOINs — calling root.join() multiple times creates multiple JOINs causing duplicates. Use CriteriaQuery.distinct(true)",
        "JpaSpecificationExecutor.findAll(Spec, Pageable) runs COUNT query — can be slow on complex Specifications"
      ],
      checkpoint: [
        "Build UserSpec with: name contains (optional), age between (optional), active=true. Show composition at service layer.",
        "What happens when toPredicate returns null?",
        "How do you prevent duplicate results when Specifications involve JOINs?"
      ]
    },
    {
      level: "Advanced",
      time: "35 min",
      sections: [
        {
          heading: "QueryDSL vs Specifications",
          items: [
            "<b>QueryDSL generates Q-classes</b> at compile time via APT. <code>QPerson.person.name.eq(name)</code> vs <code>root.get(\"name\")</code>.",
            "<b>Type-safe:</b> renaming field → Q-class regenerated → compile error. String-based Specifications fail at runtime.",
            "<b>QuerydslPredicateExecutor&lt;T&gt;:</b> repository extension. Accepts <code>com.querydsl.core.types.Predicate</code>.",
            "<b>Trade-off:</b> QueryDSL requires APT build config and Q-class regeneration. More setup, better safety and readability for complex queries."
          ]
        },
        {
          heading: "Fetch Inside Specification + Subqueries",
          items: [
            "<b>Fetch with Specification:</b> use Root.fetch() inside toPredicate for JOIN FETCH. But: causes issues in count queries. Check <code>query.getResultType() != Long.class</code> before adding fetch.",
            "<b>Subquery:</b> <code>Subquery&lt;Long&gt; subquery = query.subquery(Long.class)</code>. Use for EXISTS checks.",
            "<b>Full search API:</b> combine Specification with Pageable and Sort: <code>findAll(spec, PageRequest.of(0, 20, Sort.by(\"name\")))</code>."
          ]
        }
      ],
      traps: [
        "Root.fetch() in Specification breaks COUNT queries for pagination — check result type before adding fetch",
        "QueryDSL BooleanBuilder is mutable — not thread-safe, create new instance per request",
        "Q-classes not regenerated after entity field change — compile errors, ensure APT runs in CI"
      ],
      checkpoint: [
        "What is the main advantage of QueryDSL over Criteria API Specifications?",
        "How do you handle JOIN FETCH inside a Specification without breaking the count query for pagination?",
        "Design a search API with 10 optional filter parameters. Walk me through Specification design from controller to repository."
      ]
    }
  ],
  grill: "You are a Senior Engineer interviewing a Spring Data JPA candidate.\n\nTOPIC: Criteria API + Specifications (Block 13)\n\nYOUR ROLE: Reactive Socratic interviewer. Design-heavy topic.\n\nAPPROACH: Ask them to build. 'Build a dynamic product search with 8 optional filters.' Probe internals as they describe. Test edge cases: null handling, pagination, JOINs.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
}

]; 
// end BLOCKS_PART1
