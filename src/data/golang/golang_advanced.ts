import type { Block } from '../../types/content';

export const golangAdvanced: Block[] = [
  {
    "id": "golang-1",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "high",
    "title": "Go — Fundamentals",
    "subtitle": "Types, structs, interfaces, error handling, defer/panic/recover",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Method Sets + Interface Satisfaction",
            "items": [
              "<b>Method set of value type T</b> includes methods with receiver T. Method set of pointer *T includes methods with T or *T receivers.",
              "<b>Interface satisfaction:</b> <code>var _ io.Reader = (*os.File)(nil)</code> compile-time check. Pointer vs value receiver matters.",
              "<b>Empty interface陷阱:</b> <code>interface{}</code> accepts anything, but type assertion needed to do anything useful. Overuse kills type safety.",
              "<b>Type switches with interfaces:</b> <code>switch v := i.(type) { case int: ... default: ... }</code> — exhaustive handling possible."
            ]
          },
          {
            "heading": "Defer + Panic + Recover",
            "items": [
              "<b>Defer arguments evaluated immediately:</b> <code>defer log(\"value:\", compute())</code> — compute() runs at defer time, not at function end.",
              "<b>Panic unwinds stack:</b> runtime stops current goroutine, runs deferred functions, then terminates. Not for control flow.",
              "<b>Recover only works inside deferred function:</b> <code>func safe() { defer func() { if r := recover(); r != nil { log(r) } }(); panic(\"oh no\") }</code>.",
              "<b>When to recover:</b> HTTP handlers (return 500), goroutine entrypoints (log + continue), RPC handlers. Not: local functions where panic means bug."
            ]
          }
        ],
        "traps": [
          "Defer in loop = all defers run at function exit, not loop iteration — resource exhaustion risk",
          "Recover from all panics silently = bugs masked — log every recovered panic",
          "Method set mismatch: value type T does NOT satisfy interface requiring *T receiver"
        ],
        "checkpoint": [
          "Why does *os.File satisfy io.Reader but os.File (value) does NOT always satisfy it?",
          "Show defer argument evaluation bug: what does this print?",
          "When is recover appropriate vs letting panic kill the goroutine?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a senior Go candidate.\n\nTOPIC: Go Fundamentals Advanced (Block 1)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Probe deep on method sets, interface satisfaction edge cases, defer/panic/recover internals. Test understanding of Go's type system subtleties.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-2",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "high",
    "title": "Go — Concurrency",
    "subtitle": "Goroutines, channels, select, context, sync primitives, worker pools",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "40 min",
        "sections": [
          {
            "heading": "Scheduler Internals",
            "items": [
              "<b>GMP model:</b> Goroutine (G) runs on Machine (OS thread, M) via Processor (P, CPU core abstraction). P count = GOMAXPROCS.",
              "<b>Work stealing:</b> local P queue empty = steal from other P. Balances load without central lock.",
              "<b>Network poller:</b> syscalls (network I/O) offloaded to dedicated thread. P picks new G without blocking.",
              "<b>GOMAXPROCS:</b> defaults to CPU count. Can be increased, rarely needed. Blocking syscalls can cause extra Ms."
            ]
          },
          {
            "heading": "sync Primitives",
            "items": [
              "<b>sync.WaitGroup:</b> Add(n) before goroutines, Done() inside, Wait() blocks until zero.",
              "<b>sync.Mutex vs sync.RWMutex:</b> Mutex exclusive. RWMutex allows multiple readers or single writer. Writes starve if readers always present.",
              "<b>sync.Once:</b> guarantees function executed exactly once. Even if multiple goroutines call Do().",
              "<b>sync.Cond:</b> condition variable. Wait/Signal/Broadcast. For complex wait conditions beyond channels."
            ]
          },
          {
            "heading": "Advanced Channel Patterns",
            "items": [
              "<b>Worker pool:</b> fixed number of goroutines read from jobs chan, write to results chan. Bounded concurrency.",
              "<b>Fan-out/fan-in:</b> multiple workers process, single aggregator collects. Efficient CPU-bound parallelism.",
              "<b>Pipeline:</b> stages connected by channels. Each stage transforms and passes forward. Natural backpressure.",
              "<b>Or-channel:</b> <code>select { case <-ctx.Done(): ... case <-ch1: ... }</code> compose with channel helpers."
            ]
          }
        ],
        "traps": [
          "WaitGroup counter negative panics — always Add before goroutine launch, Done exactly once",
          "RWMutex writer starvation — readers always ready starves writer",
          "Closing channel with WaitGroup still active = panic — order coordination carefully"
        ],
        "checkpoint": [
          "Explain Go's GMP scheduler in one paragraph.",
          "Design a worker pool with bounded concurrency using goroutines and channels.",
          "When would you use sync.Cond over a channel?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate for a high-concurrency systems role.\n\nTOPIC: Go Concurrency Advanced (Block 2)\n\nYOUR ROLE: Rigorous Socratic interviewer.\n\nAPPROACH: Start with scheduler deep dive, move to advanced sync patterns, then design a concurrent system. Test if they can reason about Go's concurrency at production scale.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-3",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "med",
    "title": "Go — Memory + GC",
    "subtitle": "Stack vs heap, escape analysis, GC, profiling, memory leaks",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Escape Analysis Deep Dive",
            "items": [
              "<b>Compiler analysis:</b> <code>go build -gcflag=-m</code> shows escape decisions. \"escapes to heap\" = allocated on heap.",
              "<b>Common escape patterns:</b> returning pointer to local, captured in closure, larger than 64KB (threshold varies), interface conversion.",
              "<b>Reduce escapes:</b> return values not pointers when safe, pass by value for small structs, avoid unnecessary interface conversions."
            ]
          },
          {
            "heading": "GC Tuning",
            "items": [
              "<b>GOGC:</b> target heap growth percentage. GOGC=100: GC when heap doubles. GOGC=50: more frequent, less memory. GOGC=off: disables GC (draining memory, forking).",
              "<b>GOGC trade-off:</b> lower = less memory, more CPU for GC. Higher = more memory, less GC pauses. Benchmark for your workload.",
              "<b>GC pacing:</b> GOGC affects pacer. Pacer calculates assist ratio — how much mutator helps GC. High allocation rate = high assist."
            ]
          },
          {
            "heading": "Production Diagnosis",
            "items": [
              "<b>pprof heap:</b> detect leaks (inuse_space growing over time). <b>alloc_space</b> shows allocation rate.",
              "<b>runtime.ReadMemStats:</b> programmatic memory tracking. HeapAlloc, HeapInuse, StackInuse, NumGC.",
              "<b>signals:</b> OOMKill in container = memory limit exceeded. Check RSS, not just HeapAlloc (stack, off-heap, runtime matter too)."
            ]
          }
        ],
        "traps": [
          "GOGC=off in production risks OOM unless you know exact memory bounds",
          "RSS &gt; HeapAlloc is normal — stack, mmap'd files, runtime internals count",
          "pprof blocking profile shows goroutine blocking, not CPU — use different profiles for different issues"
        ],
        "checkpoint": [
          "Run go build -gcflag=-m. What escape patterns do you look for and how do you reduce escapes?",
          "When would you set GOGC below 100 vs above 200?",
          "How do you diagnose OOM in a containerised Go service?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate focused on performance.\n\nTOPIC: Go Memory + GC Advanced (Block 3)\n\nYOUR ROLE: Rigorous Socratic interviewer.\n\nAPPROACH: Start with escape analysis, move to GC tuning trade-offs, then production diagnosis. Test practical optimization skills.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-7",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "high",
    "title": "Go — Gin Framework",
    "subtitle": "Routing, groups, middleware chain, binding/validation, production patterns",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Production Gin Patterns",
            "items": [
              "<b>Structured handlers:</b> handler function receives *gin.Context. Return handler functions for composition. Keep handlers short — extract business logic to services.",
              "<b>Request validation:</b> struct tags + go-playground/validator. Custom rules via validator.RegisterValidation().",
              "<b>Error responses:</b> standard format: <code>{\"error\":{\"code\":\"VALIDATION\",\"fields\":{\"email\":\"required\"}}}</code>. Never expose internal errors.",
              "<b>Health/debug endpoints:</b> /healthz, /readyz, /debug/pprof. Protect /debug with auth in production."
            ]
          },
          {
            "heading": "Middleware Advanced",
            "items": [
              "<b>Middleware ordering:</b> recovery → logging → auth → business. Recovery last (catch handler panics). Logging captures everything.",
              "<b>Per-route middleware:</b> <code>r.GET(\"/admin\", adminHandler, AuthMiddleware())</code> — after handler, applies to single route.",
              "<b>Context sharing:</b> gin.Context is request-scoped. Set values: <code>c.Set(\"user\", user)</code>. Retrieve: <code>c.Get(\"user\")</code>.",
              "<b>Rate limiting:</b> in-memory for single instance. Redis for distributed. Use leaky bucket or token bucket algorithm."
            ]
          },
          {
            "heading": "Performance + Observability",
            "items": [
              "<b>Benchmark:</b> wrk, vegeta, k6. Measure p50, p95, p99. Gin has low overhead — typical &lt;1µs per request.",
              "<b>Structured logging:</b> zap/slog with request ID (from middleware). Include method, path, status, duration.",
              "<b>OpenTelemetry:</b> otelgin middleware for traces. Propagate trace context via headers. Trace every middleware + handler."
            ]
          }
        ],
        "traps": [
          "Binding struct pointer reused across requests — race condition, clone or allocate per request",
          "Setting status after c.JSON = error — set status before calling JSON",
          "Middleware order wrong — recovery after handler = doesn't catch handler panics"
        ],
        "checkpoint": [
          "Design a production-ready Gin API with structured error handling and request validation.",
          "What middleware order would you use for a public API and why?",
          "How do you rate-limit a Gin API in a multi-instance deployment?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate for a senior role building APIs.\n\nTOPIC: Go Gin Framework Advanced (Block 7)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Focus on production patterns, middleware composition, and operational readiness. Test if they can build battle-tested Gin services, not just hello world.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-10",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "high",
    "title": "Go — Database Access",
    "subtitle": "database/sql, GORM, SQLx, connection pooling, transactions, migrations",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Connection Pool Tuning",
            "items": [
              "<b>MaxOpenConns:</b> total connections across concurrent goroutines. Rule of thumb: (core_count + disk_count) * 2 for mixed workloads.",
              "<b>MaxIdleConns:</b> idle connections kept alive. Default 2. Set to MaxOpenConns to avoid churn. Set lower for bursty load.",
              "<b>ConnMaxLifetime:</b> max time connection kept before recycling. 1h+ (longer than DB timeout). Prevents stale connections.",
              "<b>Context per query:</b> always pass context (with timeout) to query. Prevents stuck queries — <code>db.QueryContext(ctx, ...)</code>."
            ]
          },
          {
            "heading": "ORM Advanced",
            "items": [
              "<b>GORM hooks:</b> BeforeCreate, AfterFind, BeforeSave. Use for audit timestamps, soft deletes. Beware zero-value fields — use pointers or pointers.",
              "<b>Preloading + Joins:</b> <code>db.Preload(\"Orders\").Find(&users)</code> vs <code>db.Joins(\"Orders\").Find(&users)</code>. Preload = separate query. Joins = raw SQL join.",
              "<b>N+1 problem:</b> Preload solves. Without it, range over users and query orders individually = N+1 queries.",
              "<b>Migrations:</b> gormigrate for versioned, reversible migrations. AutoMigrate loses data on column removal."
            ]
          },
          {
            "heading": "Observability + Resilience",
            "items": [
              "<b>Connection stats:</b> <code>db.Stats()</code> — InUse, Idle, WaitCount, WaitDuration. Alert on WaitCount spikes = pool too small.",
              "<b>Circuit breaker:</b> sony/gobreaker for DB failures. Open circuit when failure rate high, half-open to test recovery.",
              "<b>Retry policy:</b> only retry on transient errors (connection reset, 5xx). Never retry on unique constraint violations.",
              "<b>Bulk operations:</b> Batch inserts with <code>db.CreateInBatches(&users, 100)</code>. Balance batch size vs memory."
            ]
          }
        ],
        "traps": [
          "MaxIdleConns default 2 — under load creates constant connection churn — raise to MaxOpenConns",
          "GORM lazy associations = N+1 queries — always Preload when accessing associations",
          "Context-less queries ignore timeouts — stuck queries exhaust pool under DB load"
        ],
        "checkpoint": [
          "Tune database/sql connection pool for service with 8 CPU cores and bursty traffic.",
          "Explain N+1 with example. Show how to fix it in GORM.",
          "What is db.Stats().WaitCount and when would you alert on it?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go candidate for a data-intensive role.\n\nTOPIC: Go Database Access Advanced (Block 10)\n\nYOUR ROLE: Socratic interviewer focused on production databases.\n\nAPPROACH: Start with connection pool internals, move to ORM pitfalls and N+1, then resilience patterns. Test if they understand Go database interfaces, not just GORM API.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-11",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "med",
    "title": "Go — gRPC + Microservices",
    "subtitle": "Protobuf, streaming, interceptors, load balancing, observability",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "40 min",
        "sections": [
          {
            "heading": "Interceptors Deep Dive",
            "items": [
              "<b>Unary interceptor:</b> wraps client/server unary RPCs. Log, auth, retry, metrics. <code>func(ctx, req, info, handler) (resp, err)</code>.",
              "<b>Stream interceptor:</b> wraps streaming RPC. More complex — must forward stream, handle stream errors.",
              "<b>Interceptor chains:</b> execute in order. Multiple can be attached. Server: user-defined list. Client: interceptors added after dial options.",
              "<b>Error handling:</b> status.Errorf(codes.InvalidArgument, ...) — clients get status code + message. RPC errors not retried by default."
            ]
          },
          {
            "heading": "Production gRPC",
            "items": [
              "<b>Load balancing:</b> gRPC is HTTP/2 — L4 load balancer required. Client-side LB (pick-first or round-robin via gRPC-LB) or L7 with ALPN.",
              "<b>Keepalive:</b> enable HTTP/2 ping. <code>kaep := keepalive.ClientParameters{Time: 10s}</code>. Detect dead connections.",
              "<b>Health checking:</b> grpc_health_v1 standard. Graceful shutdown via health probe stop serving.",
              "<b>Observability:</b> OpenCensus/OTel integration. Trace + metric + log correlation via metadata. gRPC status codes as metrics."
            ]
          },
          {
            "heading": "Go-kit + Service Design",
            "items": [
              "<b>Go-kit layers:</b> Transport (HTTP/GRPC/gRPC-web) → Endpoint (business logic abstraction) → Service (interface).",
              "<b>Middleware chain:</b> logging, metrics, circuit breaker on endpoint. Composable, testable.",
              "<b>Enabling gRPC transport:</b> encode/decode request/response, error mapping. go-kit generates server + client stubs.",
              "<b>When Go-kit:</b> multi-transport (HTTP + gRPC), rich middleware ecosystem, explicit boundaries. Overkill for single-transport service."
            ]
          }
        ],
        "traps": [
          "gRPC over L7 load balancer without ALPN = HTTP/2 431 errors — use L4 or configure ALPN",
          "Go-kit adds significant boilerplate for simple services — pure gRPC is fine for single-transport",
          "Streaming interceptors are harder than unary — token bucket refill doesn't work same way"
        ],
        "checkpoint": [
          "Design interceptor chain: auth, logging, rate limiting. In what order and why?",
          "How do you load balance gRPC services in Kubernetes?",
          "When would you choose pure gRPC vs Go-kit?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing for a microservices architect role in Go.\n\nTOPIC: Go gRPC + Microservices Advanced (Block 11)\n\nYOUR ROLE: Rigorous Socratic interviewer.\n\nAPPROACH: Deep on gRPC internals, production patterns, observability, and service design. Test architectural thinking, not just API usage.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-13",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "low",
    "title": "Go — Desktop Apps",
    "subtitle": "Wails (web UI), Fyne (pure Go), packaging, system trays, OS integration",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Why Go Desktop",
            "items": [
              "<b>Wails:</b> wraps web UI (HTML/CSS/JS) in native window. Like Tauri (Rust) but Go backend. Mac/Win/Linux.",
              "<b>Fyne:</b> pure Go GUI. Custom widgets, Material Design. Hardware accelerated (OpenGL). Single binary.",
              "<b>Trade-offs:</b> Wails = web developers comfortable, larger bundle. Fyne = pure Go devs, offline docs, smaller bundle.",
              "<b>Market reality:</b> desktop Go rarely seen. Most Go teams ship Electron or Tauri if desktop needed."
            ]
          },
          {
            "heading": "Wails Architecture",
            "items": [
              "<b>Go backend:</b> struct methods exposed via Wails bind. Called from JS frontend. Standard Go code — web APIs as methods.",
              "<b>JS frontend:</b> any JS framework (React, Vue, Svelte). Communication via go.wails.io bind. Type-safe.",
              "<b>Runtime:</b> <code>wails.Context</code> — access window, filesystem, dialogs. Lifecycle: OnStartup, OnShutdown.",
              "<b>Packaging:</b> <code>wails build</code> — platform-specific bundle. Mac .app, Windows .exe, Linux AppImage. Notarization for macOS."
            ]
          },
          {
            "heading": "Fyne Widgets",
            "items": [
              "<b>App setup:</b> <code>a := app.New(); w := a.NewWindow(\"title\"); w.SetContent(widget.NewLabel(\"hello\"))</code>.",
              "<b>Layouts:</b> container.NewVBox, container.NewHBox, container.NewBorder. Responsive? Uses fixed sizes, manual sizing.",
              "<b>Custom widgets:</b> implement canvas.Object. Draw with canvas.Rect, canvas.Text. More work than web.",
              "<b>Packaging:</b> <code>fyne package</code> produces platform-native installer. <code>fyne icon</code> for app icon."
            ]
          }
        ],
        "traps": [
          "Wails requires Node.js for frontend build — adds toolchain requirement",
          "Fyne's fixed sizing not ideal for responsive design — browser-based (Wails) wins there",
          "Desktop Go apps are niche — rare in interviews unless role is explicitly desktop-Next"
        ],
        "checkpoint": [
          "Compare Wails vs Fyne: architecture, bundle size, target audience.",
          "What is Wails' bind system and how does it work?",
          "When would Go be the wrong choice for a desktop application?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go candidate for a full-stack role that includes desktop tooling.\n\nTOPIC: Go Desktop Apps (Block 13)\n\nYOUR ROLE: Socratic interviewer.\n\nAPPROACH: Start with Wails and Fyne basics, move to architecture and packaging, then realistic positioning of Go in desktop market. Test awareness of tooling trade-offs without expecting deep desktop expertise.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-15",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "high",
    "title": "Go — Production Readiness",
    "subtitle": "Docker, logging (zap/slog), metrics (Prometheus), tracing, health checks",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Container Optimisation",
            "items": [
              "<b>Distroless/dwarf:</b> scratch (no shell, no CA), distroless (no shell, has CA), alpine (musl, small). CGO_ENABLED=0 required for scratch.",
              "<b>Slim images:</b> <code>FROM golang:1.23-alpine AS builder</code>, install ca-certificates if needed for HTTPS during build.",
              "<b>Layer caching:</b> COPY go.mod go.sum first, RUN go mod download, COPY rest. go.mod changes = full rebuild. go.sum changes = cached.",
              "<b>Non-root:</b> adduser, chown. USER directive. Prevents container escape from exploiting root."
            ]
          },
          {
            "heading": "Observability Stack",
            "items": [
              "<b>slog (stdlib Go 1.21+):</b> handler-based, level-aware, structured. <code>log.Info(\"request\", \"id\", id, \"duration\", d)</code>",
              "<b>zap:</b> faster than slog, more config. uberssh/zap. Production choice for high-throughput.",
              "<b>Prometheus:</b> prometheus/client_golang. Histogram, Counter, Gauge. /metrics endpoint auto-scraped.",
              "<b>OpenTelemetry:</b> otelgo, otelhttptrace (HTTP wrapper). Trace context via W3C TraceContext headers. Export to Tempo/Jaeger."
            ]
          },
          {
            "heading": "Production Hardening",
            "items": [
              "<b>Graceful shutdown:</b> signal.Notify + server.Shutdown. Wait for in-flight. Envoy/Ingress detect via SIGTERM.",
              "<b>Health probes:</b> liveness (is process alive?), readiness (can serve traffic?). Kill pod if liveness fails. Don't remove from LB if readiness fails.",
              "<b>Resource limits:</b> CPU request/limit, memory limit. Go runtime doesn't know cgroup limits — set GOMEMLIMIT (Go 1.19+).",
              "<b>GOMEMLIMIT:</b> <code>GOMEMLIMIT=200MiB</code> hints to GC. Go uses soft limit — adjusts GOGC dynamically to stay within limit."
            ]
          }
        ],
        "traps": [
          "Not setting GOMEMLIMIT in containers = Go ignores cgroup memory limit, gets OOMKilled",
          "Logging sensitive data (tokens, passwords) = breach — redact at structured logging layer",
          "Single /healthz endpoint for both liveness and readiness = pod recycled unnecessarily"
        ],
        "checkpoint": [
          "Write a production-ready Dockerfile for a Go API. Include layers, non-root, health checks.",
          "How does GOMEMLIMIT change GC behaviour in a container?",
          "Design liveness and readiness probes for a Go microservice."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go candidate for a platform/SRE-adjacent role.\n\nTOPIC: Go Production Readiness Advanced (Block 15)\n\nYOUR ROLE: Rigorous Socratic interviewer.\n\nAPPROACH: Containerisation deep dive, observability correctness (not just 'use X'), Kubernetes integration, runtime tuning. Test operational readiness.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-16",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "med",
    "title": "Go — Advanced Patterns",
    "subtitle": "Generics deep dive, reflection, unsafe.Pointer, cgo, memory tuning",
    "prereqs": [],
    "tiers": [
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Generics in Depth",
            "items": [
              "<b>Constraints:</b> <code>type Ordered interface { int | int64 | float64 | ~string }</code>. ~ = underlying type. Stringer constraint: <code>type Stringer interface { String() string }</code>.",
              "<b>Type inference:</b> maps, slices generic types. <code>MapKeys[K comparable, V any](m map[K]V) []K</code>.",
              "<b>Comparable constraint:</b> <code>comparable</code> builtin. For == and !=. Also for map keys.",
              "<b>Generic interfaces:</b> <code>type Cache[K comparable, V any] interface { Get(K) V; Set(K, V) }</code>. Constrain at implementation."
            ]
          },
          {
            "heading": "lowalloc Design Patterns",
            "items": [
              "<b>sync.Pool:</b> reusable objects. <code>pool := sync.Pool{ New: func() any { return new(Buffer) } }</code>. Get returns *T, Put recycles.",
              "<b>Arena-style allocation:</b> pre-allocate byte slice, divide manually. Zero GC if referenced. Used in compression, serialization.",
              "<b>Preallocated slices:</b> <code>make([]T, 0, knownSize)</code>. Avoids append reallocations. Critical for hot paths.",
              "<b>Byte buffer reuse:</b> bytes.Buffer + sync.Pool. Reset with b.Reset(), don't b = nil (leaks)."
            ]
          },
          {
            "heading": "Plugin + Extension",
            "items": [
              "<b>Plugins (Go 1.8+):</b> <code>import _ \"plugin\"</code>, build with <code>go build -buildmode=plugin</code>. Load via plugin.Open(). Platform-specific.",
              "<b>Interface-based plugins:</b> simpler, more portable. Define plugin interface, load .so via RPC or embed.",
              "<b>Reflection for plugins:</b> discover plugin types via reflect. Registry pattern: <code>registry.Register(\"driver\", driverPlugin)</code>.",
              "<b>Security:</b> plugin loading same-user only. No sandboxing. Unsafe for untrusted code."
            ]
          }
        ],
        "traps": [
          "sync.Pool objects cleared between GC cycles — must re-initialise after Get",
          "Generics can't use type switches inside generic function — constrain interfaces instead",
          "Plugins incompatible with cgo and not on Windows — limited production utility"
        ],
        "checkpoint": [
          "Explain Go comparable constraint. Show a generic Set type.",
          "When would sync.Pool help vs hurt performance?",
          "What is the functional options pattern in Go? Write one."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go candidate for a platform/library author role.\n\nTOPIC: Go Advanced Patterns Deep (Block 16)\n\nYOUR ROLE: Rigorous Socratic interviewer.\n\nAPPROACH: Start with generics advanced constraints, move to low-level optimisation patterns, then plugin/extension design. Test design skills at the language level.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default golangAdvanced;
