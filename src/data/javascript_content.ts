import type { Block } from '../types/content';

export const javascriptContent: Block[] = [
  {
    "id": 62,
    "phase": "JavaScript",
    "chip": "javascript",
    "freq": "high",
    "title": "Advanced JavaScript Patterns",
    "subtitle": "Event loop mastery, memory management, async patterns, V8 optimizations, error handling",
    "prereqs": [
      65
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Event Loop Production Patterns",
            "items": [
              "<b>Event loop phases:</b> timers→pending→idle/prepare→poll→check→close. Each phase fully drains before next.",
              "<b>setImmediate vs setTimeout(0):</b> Inside I/O callback, setImmediate fires first. Outside, order indeterminate. Use setImmediate for immediate next-tick.",
              "<b>process.nextTick:</b> Runs before promise resolution. Starves I/O if called in loop → infinite nextTick loop danger.",
              "<b>Event loop monitoring:</b> monitorEventLoopDelay() from 'perf_hooks'. Alert on >200ms delays. Indicates blocking code.",
              "<b>Unref timers:</b> timer.unref() allows process to exit even if timer pending. For optional cleanup tasks."
            ]
          },
          {
            "heading": "Async/Await Error Patterns",
            "items": [
              "<b>Central error catching:</b> AsyncLocalStorage for request context across async boundaries without passing through parameters.",
              "<b>Error boundary patterns:</b> Express error middleware catches sync throws and rejected promises. Multiple handlers for different error types.",
              "<b>Deadlock prevention:</b> Promise.all with timeout wrapper. Mutex with TTL to prevent stuck locks.",
              "<b>Async resource cleanup:</b> using 'using' proposal or finally blocks. Cleanup must happen regardless of success/failure.",
              "<b>Error propagation:</b> Re-throwing loses context. Wrap with new Error(message, { cause: originalError })."
            ]
          }
        ],
        "traps": [
          "process.nextTick starves I/O — infinite loop of nextTick calls = no timers/event handlers run",
          "AsyncLocalStorage context lost across native async operations — test carefully",
          "Double error handling (throw then catch) = redundant and confusing"
        ],
        "checkpoint": [
          "What is process.nextTick and when does it run relative to setImmediate?",
          "How do you propagate request context (trace ID) through async/await code?",
          "You see event loop delay of 5 seconds. What are the likely causes?"
        ]
      },
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
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Worker Threads + Performance Isolation",
            "items": [
              "<b>When to use Workers:</b> CPU-bound (image processing, crypto), not I/O bound. I/O uses libuv thread pool already.",
              "<b>SharedArrayBuffer:</b> Share memory between main and worker. Atomics for synchronization. Race condition prevention.",
              "<b>ParentPort communication:</b> parentPort.postMessage({ heavyTask: data }). Main thread routes work to available workers.",
              "<b>Worker pool pattern:</b> pool = new WorkerPool({ maxWorkers: 4 }). Distributes work, tracks completion. shutdown() waits for workers.",
              "<b>Performance comparison:</b> Single thread with streams > Worker threads for I/O. Workers only for CPU-heavy tasks."
            ]
          }
        ],
        "traps": [
          "Worker threads for I/O = worse than single thread — libuv handles I/O already",
          "SharedArrayBuffer without Atomics = race conditions — always use Atomics for writes",
          "Worker pool without proper cleanup = zombie workers on reload — implement shutdown signals"
        ],
        "checkpoint": [
          "When would you use Worker threads instead of cluster module?",
          "How do you share data between main thread and worker thread efficiently?",
          "What causes a Worker thread to block the event loop?"
        ]
      }
    ],
    "grill": "You are a Senior Backend Engineer interviewing a Node.js candidate.\n\nTOPIC: Advanced JavaScript Patterns (Block 62)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production debugging scenarios, performance optimization, event loop mastery. 'Event loop blocked for 5 seconds', 'why is this code slow', 'memory leak investigation'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 65,
    "phase": "JavaScript",
    "chip": "javascript",
    "freq": "high",
    "title": "JavaScript Core Fundamentals",
    "subtitle": "Primitives, objects, prototypes, closures, this, modules, and event loop basics",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Values + Types",
            "items": [
              "<b>Primitives:</b> string, number, bigint, boolean, null, undefined, symbol. Primitive assignment copies value.",
              "<b>Objects:</b> reference values. Two objects are equal only when they reference the same object.",
              "<b>Coercion:</b> == performs coercion; === does not. Prefer explicit conversion with Number(), String(), Boolean().",
              "<b>Truthy/falsy:</b> 0, '', null, undefined, NaN, false are falsy. Everything else is truthy."
            ]
          },
          {
            "heading": "Scope + Functions",
            "items": [
              "<b>Lexical scope:</b> functions capture variables from where they are defined, not where they are called.",
              "<b>Closures:</b> function plus captured lexical environment. Useful for encapsulation, factories, iterators.",
              "<b>this:</b> determined by call site. Methods use receiver, plain calls use undefined/global, arrow functions capture this.",
              "<b>Modules:</b> ESM import/export are static. One module instance per URL. Side effects run once."
            ]
          }
        ],
        "traps": [
          "Mutating a shared object is visible through every reference to it",
          "Arrow functions do not have their own this, arguments, or new.target",
          "Default parameters create a new scope and can reference earlier parameters"
        ],
        "checkpoint": [
          "Explain why two empty objects are not equal with ===.",
          "What does a closure capture and when is it garbage collected?",
          "When does this refer to the caller instead of the object before the dot?"
        ]
      },
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
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Engine Optimisation + Pitfalls",
            "items": [
              "<b>Hidden classes:</b> engines optimize objects with stable shapes. Add properties in the same order.",
              "<b>Deoptimization:</b> changing property types or shapes can move code from optimized to baseline.",
              "<b>Memory:</b> closures keep referenced variables alive. Avoid capturing large objects longer than needed.",
              "<b>StructuredClone:</b> deep clone supported types without JSON.stringify limitations."
            ]
          },
          {
            "heading": "Module Boundaries",
            "items": [
              "<b>Circular imports:</b> ESM can handle some cycles, but live bindings may be uninitialized during evaluation.",
              "<b>Barrel files:</b> convenient exports can increase bundle size and slow tooling if they re-export everything.",
              "<b>Dynamic import:</b> returns a promise and enables code splitting by route or feature.",
              "<b>Side effects:</b> imported modules execute once. Keep module top-level work minimal and explicit."
            ]
          }
        ],
        "traps": [
          "JSON.stringify drops undefined, functions, symbols, and circular references",
          "Dynamic import still downloads the module when executed, not when declared",
          "Circular imports are legal but hard to reason about during initialization"
        ],
        "checkpoint": [
          "What causes JavaScript object shape deoptimization?",
          "How do you split a route with dynamic import?",
          "What are the risks of top-level side effects in modules?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a JavaScript candidate.\n\nTOPIC: JavaScript Core Fundamentals (Block 65)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Language fundamentals, traps, and debugging. 'Why is this closure leaking?', 'what does this refer to?', 'explain prototype lookup'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 66,
    "phase": "JavaScript",
    "chip": "javascript",
    "freq": "high",
    "title": "JavaScript Async Patterns",
    "subtitle": "Callbacks, promises, async/await, concurrency, AbortController, fetch, and error handling",
    "prereqs": [
      65
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Promise Basics",
            "items": [
              "<b>Promise states:</b> pending, fulfilled, rejected. A promise settles once and keeps its result.",
              "<b>then/catch/finally:</b> then handles fulfillment, catch handles rejection, finally runs regardless.",
              "<b>async/await:</b> syntax over promises. await pauses the async function and yields to the event loop.",
              "<b>Error handling:</b> wrap awaits in try/catch or attach catch at call boundaries."
            ]
          },
          {
            "heading": "Fetch",
            "items": [
              "<b>fetch resolves:</b> network response arrives, not necessarily HTTP success. Check res.ok and res.status.",
              "<b>Headers:</b> Content-Type, Accept, Authorization. Credentials and CORS matter for cross-origin requests.",
              "<b>JSON:</b> res.json() reads and parses the body stream. It can be called only once.",
              "<b>Timeouts:</b> fetch has no built-in timeout. Use AbortController or a wrapper promise."
            ]
          }
        ],
        "traps": [
          "fetch does not reject on HTTP 404 or 500",
          "Calling await inside a loop serializes requests unless you intentionally need ordering",
          "Uncaught promise rejections can crash Node.js or cause silent UI failures"
        ],
        "checkpoint": [
          "How do you handle HTTP 500 from fetch?",
          "Why does await in a for...of loop run sequentially?",
          "What happens if you call res.json() twice?"
        ]
      },
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
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Async Architecture",
            "items": [
              "<b>Request context:</b> AsyncLocalStorage propagates trace IDs across awaits without passing parameters.",
              "<b>Cancellation:</b> cooperative cancellation checks signal.aborted and cleans up resources.",
              "<b>Backpressure:</b> streams and queues prevent producers from overwhelming consumers.",
              "<b>Observability:</b> log promise rejection reasons, duration, retry count, and correlation IDs."
            ]
          },
          {
            "heading": "Pitfalls",
            "items": [
              "<b>Mixed callback/promise APIs:</b> promisify carefully. Avoid double-calling callbacks.",
              "<b>Unhandled rejections:</b> attach catch handlers or centralize rejection handling.",
              "<b>Resource cleanup:</b> close streams, abort timers, and release locks in finally blocks.",
              "<b>Speculative requests:</b> cancel outdated in-flight requests when user input changes."
            ]
          }
        ],
        "traps": [
          "AsyncLocalStorage does not automatically cross every native boundary",
          "Cancellation must be honored by the underlying operation",
          "finally does not receive the fulfilled value or rejection reason"
        ],
        "checkpoint": [
          "How do you cancel stale search requests?",
          "What should be cleaned up in a finally block?",
          "How do you trace an async request across awaits?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a JavaScript candidate.\n\nTOPIC: JavaScript Async Patterns (Block 66)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Async debugging, fetch traps, retry/cancellation design. 'This API call hangs', 'retry caused duplicates', 'implement timeout'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default javascriptContent;
