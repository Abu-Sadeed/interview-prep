import type { Block } from '../../types/content';

export const jsIntermediate: Block[] = [
  {
    "id": "javascript-1",
    "phase": "JavaScript",
    "chip": "javascript",
    "freq": "high",
    "title": "Advanced JavaScript Patterns",
    "subtitle": "Event loop mastery, memory management, async patterns, V8 optimizations, error handling",
    "prereqs": [
      "javascript-2"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "V8 Memory + Performance",
            "items": [
              "<b>V8 heap organization:</b> New space (young generation, 1-8MB, frequent GC), Old space (old generation, survives GC, expensive to collect).",
              "<b>Memory leak detection:</b> --inspect flag + Chrome DevTools heap snapshot. Compare before/after operation. Look for growing retained size.",
              "<b>Hidden classes danger:</b> Adding properties in different order creates different hidden classes → deoptimization. Always add properties in same order.",
              "<b>Array literal vs push:</b> [1,2,3] creates packed array (fast). arr.push(1);arr.push(2) creates holey array (slower).",
              "<b>Object shape changes:</b> Changing property types (string→number) creates new hidden class → megamorphic → slow property access."
            ]
          },
          {
            "heading": "Buffer + Binary Data",
            "items": [
              "<b>Buffer pool:</b> Allocating many small buffers = memory fragmentation. Use pre-allocated pool or Buffer.allocUnsafe for performance.",
              "<b>Encoding performance:</b> Buffer.from(string, 'utf8') allocates. Reusing buffers = 0 allocations. pool.map(chunk→toString()) = many allocations.",
              "<b>Binary protocol parsing:</b> Use Buffer.readUInt32BE(offset) instead of parseInt. Avoid buffer → string → number conversion.",
              "<b>Stream backpressure:</b> stream.write() returns false when buffer full. Wait for 'drain' event. pause() / resume() for flow control.",
              "<b>File descriptor limits:</b> Default 1024 open files. ulimit -n 65536 for high-concurrency servers. Monitor with lsof."
            ]
          }
        ],
        "traps": [
          "Changing object property types after creation causes deoptimization — keep shapes consistent",
          "Buffer.from() in hot loop = GC pressure — pre-allocate or use pools",
          "Ignoring backpressure = memory exhaustion — always handle drain event"
        ],
        "checkpoint": [
          "How do you detect a memory leak in a Node.js application?",
          "What are hidden classes in V8 and why do they matter for performance?",
          "How do you handle backpressure when piping a fast readable stream to a slow writable stream?"
        ]
      }
    ],
    "grill": "You are a Senior Backend Engineer interviewing a Node.js candidate.\n\nTOPIC: Advanced JavaScript Patterns (Block 62)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production debugging scenarios, performance optimization, event loop mastery. 'Event loop blocked for 5 seconds', 'why is this code slow', 'memory leak investigation'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "javascript-2",
    "phase": "JavaScript",
    "chip": "javascript",
    "freq": "high",
    "title": "JavaScript Core Fundamentals",
    "subtitle": "Primitives, objects, prototypes, closures, this, modules, and event loop basics",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Prototypes + Inheritance",
            "items": [
              "<b>Prototype chain:</b> property lookup checks the object, then its prototype, then the prototype's prototype.",
              "<b>Object.create(null):</b> creates an object without Object.prototype. Avoids inherited keys like toString.",
              "<b>class syntax:</b> syntactic sugar over prototypes and constructor functions. new.target is set during construction.",
              "<b>Composition:</b> prefer small functions, factories, and composition over deep inheritance hierarchies."
            ]
          },
          {
            "heading": "Event Loop Basics",
            "items": [
              "<b>Call stack:</b> synchronous JavaScript runs on one stack. Long work blocks the main thread.",
              "<b>Task queue:</b> macrotasks such as timers, I/O callbacks, and UI events run between stack drains.",
              "<b>Microtasks:</b> Promise callbacks and queueMicrotask run before the next macrotask.",
              "<b>Rendering:</b> browsers can render between tasks, so long tasks cause jank."
            ]
          }
        ],
        "traps": [
          "Prototype lookup happens on every property access unless optimized by the engine",
          "Putting heavy work in Promise.then does not make it non-blocking",
          "class methods are not automatically bound to the instance"
        ],
        "checkpoint": [
          "Trace property lookup through a prototype chain.",
          "Why does Promise.then run before setTimeout(0)?",
          "When is class inheritance the wrong tool?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a JavaScript candidate.\n\nTOPIC: JavaScript Core Fundamentals (Block 65)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Language fundamentals, traps, and debugging. 'Why is this closure leaking?', 'what does this refer to?', 'explain prototype lookup'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "javascript-3",
    "phase": "JavaScript",
    "chip": "javascript",
    "freq": "high",
    "title": "JavaScript Async Patterns",
    "subtitle": "Callbacks, promises, async/await, concurrency, AbortController, fetch, and error handling",
    "prereqs": [
      "javascript-2"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Concurrency",
            "items": [
              "<b>Promise.all:</b> wait for all. One rejection rejects the whole group.",
              "<b>Promise.allSettled:</b> wait for all outcomes. Useful when partial success is acceptable.",
              "<b>Promise.race:</b> first settled promise wins. Often used for timeouts.",
              "<b>AbortController:</b> abort fetch, timers, or worker work. Always pass signal into the operation."
            ]
          },
          {
            "heading": "Retry + Backoff",
            "items": [
              "<b>Retry only safe operations:</b> idempotent GETs or operations with idempotency keys.",
              "<b>Exponential backoff:</b> delay grows after each failure. Add jitter to avoid thundering herd.",
              "<b>Circuit breaker:</b> stop trying a failing dependency temporarily. Protects downstream and your app.",
              "<b>Deadlines:</b> set a total timeout so retries cannot run forever."
            ]
          }
        ],
        "traps": [
          "Retrying non-idempotent writes can duplicate side effects",
          "Promise.all fails fast and abandons still-running promises",
          "Backoff without jitter can synchronize retries across many clients"
        ],
        "checkpoint": [
          "Implement a fetch with timeout using AbortController.",
          "When should you use allSettled instead of all?",
          "Design retry logic for an idempotent API call."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a JavaScript candidate.\n\nTOPIC: JavaScript Async Patterns (Block 66)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Async debugging, fetch traps, retry/cancellation design. 'This API call hangs', 'retry caused duplicates', 'implement timeout'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default jsIntermediate;
