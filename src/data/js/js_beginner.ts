import type { Block } from '../../types/content';

export const jsBeginner: Block[] = [
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
      }
    ],
    "grill": "You are a Senior Engineer interviewing a JavaScript candidate.\n\nTOPIC: JavaScript Async Patterns (Block 66)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Async debugging, fetch traps, retry/cancellation design. 'This API call hangs', 'retry caused duplicates', 'implement timeout'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default jsBeginner;
