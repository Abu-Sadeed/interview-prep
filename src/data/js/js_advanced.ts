import type { Block } from '../../types/content';

export const jsAdvanced: Block[] = [
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
    "id": "javascript-2",
    "phase": "JavaScript",
    "chip": "javascript",
    "freq": "high",
    "title": "JavaScript Core Fundamentals",
    "subtitle": "Primitives, objects, prototypes, closures, this, modules, and event loop basics",
    "prereqs": [],
    "tiers": [
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

export default jsAdvanced;
