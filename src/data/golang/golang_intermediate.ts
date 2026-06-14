import type { Block } from '../../types/content';

export const golangIntermediate: Block[] = [
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
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Stack vs Heap Allocation",
            "items": [
              "<b>Stack:</b> function arguments, local variables. Fast allocation, zero cleanup cost. Grows/shrinks with goroutine stack.",
              "<b>Heap:</b> escapes the function. Lives until GC collects. Slower allocation, GC pressure.",
              "<b>Escape analysis:</b> compiler decides stack vs heap. <code>go build -gcflag=-m</code> shows decisions. Commonly escapes: returned pointers, captured in closures, large structs."
            ]
          },
          {
            "heading": "Go Garbage Collector",
            "items": [
              "<b>Non-generational, concurrent, tri-color:</b> no generational promotion. Mark-and-sweep concurrent with mutator.",
              "<b>GC target:</b> GOGC (default 100). 100 = heap doubles before GC. 200 = heap doubles + 100%. Lower = more frequent GC, less memory.",
              "<b>STW phases:</b> very short (typically &lt;1ms). Mostly concurrent with program execution. Mark termination and mark termination are STW.",
              "<b>Write barriers:</b> during concurrent marking, goroutine writes to heap trigger write barriers to maintain tri-color invariant."
            ]
          },
          {
            "heading": "Memory Leaks + Profiling",
            "items": [
              "<b>Common leaks:</b> goroutines that never exit (waiting on channel no one sends to), Growing slices (append without bounds), Unbounded caches.",
              "<b>pprof:</b> <code>import _ \"net/http/pprof\"</code>. Endpoints: /debug/pprof/heap, /debug/pprof/goroutine. Go tool pprof.",
              "<b> GODEBUG=gctrace=1:</b> GC events to stderr. Shows heap before/after, GC duration, goroutines stopped.",
              "<b>Alloc vs InUse:</b> Alloc = allocated and not yet freed. InUse = live objects. Large InUse = leak. Large Alloc = allocation rate issue."
            ]
          }
        ],
        "traps": [
          "append growing slice indefinitely without bounds = OOM over time",
          "Goroutines blocked forever on channel never released = memory leak (goroutine stack retained)",
          "Default GOGC=100 — high-throughput services often benefit from raising to 200 or higher"
        ],
        "checkpoint": [
          "Explain Go's GC algorithm in 2 sentences.",
          "Read a pprof heap profile: what indicates a memory leak vs high allocation rate?",
          "How do you find a goroutine leak in production?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Memory + GC (Block 3)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with escape analysis basics, move to GC internals, then profiling and leak diagnosis. Test practical ability to diagnose memory issues in Go services.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-4",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "med",
    "title": "Go — Interfaces + Embedding",
    "subtitle": "Structural typing, embedding, interface composition, empty interface, type assertions",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "30 min",
        "sections": [
          {
            "heading": "Structural Typing",
            "items": [
              "<b>Go interfaces are satisfied implicitly.</b> No 'implements' keyword. If type has all methods, it satisfies.",
              "<b>Small interfaces:</b> <code>io.Reader</code> (Read), <code>io.Writer</code> (Write), <code>error</code> (Error). Smaller = more reusable.",
              "<b>Interface segregation:</b> prefer many small interfaces over one large. <code>io.ReadWriter</code> embeds both.",
              "<b>Empty interface:</b> <code>interface{}</code> accepts any type. Use sparingly — loses type safety."
            ]
          },
          {
            "heading": "Composition + Embedding",
            "items": [
              "<b>Type embedding:</b> <code>type Server struct { http.Handler; Logger *zap.Logger }</code>. Promotes embedded type's methods.",
              "<b>Interface embedding:</b> <code>type ReadWriter interface { io.Reader; io.Writer }</code>.",
              "<b>Dependency injection:</b> accept interfaces, return structs. Testability without frameworks.",
              "<b>Functional options:</b> alternative to constructor explosion. <code>WithTimeout(5 * time.Second)</code>."
            ]
          },
          {
            "heading": "Type Assertions + Reflection",
            "items": [
              "<b>Type assertion:</b> <code>x.(int)</code> — returns value and ok bool. <code>val, ok := x.(int)</code>.",
              "<b>Type switch:</b> <code>switch v := x.(type) { case int: ... case string: ... }</code>.",
              "<b>reflect package:</b> runtime type inspection. <code>reflect.TypeOf(x)</code>, <code>reflect.ValueOf(x)</code>. Slow — avoid in hot paths."
            ]
          }
        ],
        "traps": [
          "Large interfaces = hard to test, hard to satisfy — keep small",
          "Type assertions panic on mismatch — use ,ok form",
          "reflect is slow — escape hatches for libraries, not application code"
        ],
        "checkpoint": [
          "Why does Go use structural typing for interfaces? What problem does it solve?",
          "Demonstrate dependency injection using interfaces without a framework.",
          "What is the difference between type assertion and type switch?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Interfaces + Embedding (Block 4)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with interface basics and implicit satisfaction, move to composition patterns, then test if they understand why Go's interface design enables clean architecture.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
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
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Gin Basics",
            "items": [
              "<b>Setup:</b> <code>r := gin.Default()</code> — includes Logger and Recovery middleware. <code>r.Run(\":8080\")</code>.",
              "<b>Routing:</b> <code>r.GET(\"/\", handler)</code>, <code>r.POST(\"/\", handler)</code>. Parameters: <code>r.GET(\"/user/:id\", handler)</code> and <code>r.Param(\"id\")</code>.",
              "<b>Query params:</b> <code>c.Query(\"page\")</code>, <code>c.DefaultQuery(\"page\", \"1\")</code>.",
              "<b>Context:</b> gin.Context wraps http.Request/ResponseWriter. Thread-safe for current request only."
            ]
          },
          {
            "heading": "Groups + Middleware",
            "items": [
              "<b>Route groups:</b> <code>api := r.Group(\"/api\")</code>, <code>api.Use(AuthMiddleware())</code> — applies to all in group.",
              "<b>Middleware signature:</b> <code>func AuthMiddleware() gin.HandlerFunc { return func(c *gin.Context) { ... c.Next() } }</code>.",
              "<b>c.Next() / c.Abort():</b> Next proceeds to next middleware. Abort stops chain. AbortWithStatus(401) sets response and stops.",
              "<b>Built-in middleware:</b> Logger, Recovery. Third-party: gin-jwt, cors, limiter (gin-contrib)."
            ]
          },
          {
            "heading": "Validation + Error Handling",
            "items": [
              "<b>Binding:</b> <code>c.ShouldBindJSON(&input)</code> — validates and binds. Returns error if JSON invalid or struct validation fails.",
              "<b>Validation tags:</b> <code>binding:\"required,min=1,max=100\"</code> on struct fields. Use go-playground/validator.",
              "<b>Custom validators:</b> register custom validation functions. Common: password strength, email format.",
              "<b>Error responses:</b> never return raw errors to clients. Standardise: <code>{\"error\":\"E001\",\"message\":\"invalid input\"}</code>."
            ]
          }
        ],
        "traps": [
          "ShouldBindJSON on GET request = 400 bad request — check method or use Bind",
          "Never mutate Context — it's request-scoped, not for sharing state between handlers",
          "Global middleware order matters — recovery should be early, auth early, logging late"
        ],
        "checkpoint": [
          "Route an API with /api/v1/users (GET list, POST create) using Gin groups.",
          "Implement auth middleware that returns 401 if no Bearer token.",
          "Design a request validation flow with binding and custom rules."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Gin Framework (Block 7)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with basic routing and context, move to middleware patterns, then input validation and production error handling. Test practical ability to build APIs with Gin.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-8",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "med",
    "title": "Go — Echo Framework",
    "subtitle": "Context API, middleware, validation, graceful shutdown, extensibility",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Echo Basics",
            "items": [
              "<b>Setup:</b> <code>e := echo.New()</code>, <code>e.Start(\":8080\")</code>. Logger and Recover pre-registered.",
              "<b>Routing:</b> <code>e.GET(\"/\", handler)</code>, <code>e.POST(\"/\", handler)</code>. Parameters: <code>e.GET(\"/users/:id\", handler)</code>.",
              "<b>Path parameters:</b> <code>c.Param(\"id\")</code>. Query: <code>c.QueryParam(\"q\")</code>.",
              "<b>Request/Response:</b> c.Request() / c.Response(). Helper methods: c.Bind(), c.JSON(), c.String()."
            ]
          },
          {
            "heading": "Middleware in Echo",
            "items": [
              "<b>Add:</b> <code>e.Use(middleware.Logger())</code>, <code>e.Use(middleware.Recover())</code>.",
              "<b>Custom middleware:</b> <code>func MyMiddleware(next echo.HandlerFunc) echo.HandlerFunc { return func(c echo.Context) error { ... return next(c) } }</code>.",
              "<b>Skipper:</b> middleware can have Skipper func(c echo.Context) bool to skip. E.g., skip /health for logging.",
              "<b>Group middleware:</b> <code>g := e.Group(\"/admin\", adminMiddleware)</code>."
            ]
          },
          {
            "heading": "Extensibility",
            "items": [
              "<b>Binder:</b> custom binder via echo.Binder. Default binds JSON/XML/form. Replace with custom struct tag logic.",
              "<b>Renderer:</b> implement echo.Renderer for template rendering. Only needed for server-rendered HTML.",
              "<b>HTTP error handling:</b> <code>e.HTTPErrorHandler</code> replaceable. Centralises error formatting.",
              "<b>Validator:</b> register via <code>e.Validator = &CustomValidator{}</code>. Returns error if validation fails."
            ]
          }
        ],
        "traps": [
          "Echo context is request-scoped — don't store in global variables",
          "Multiple c.JSON calls in one handler = panic — each handler should return exactly once",
          "echo.Echo#Close vs Shutdown — Close is hard stop, Shutdown is graceful"
        ],
        "checkpoint": [
          "Build an Echo API with /api/tasks (CRUD) using path params and JSON binding.",
          "Write a logging middleware that logs method, path, status, and duration.",
          "Compare Echo and Gin middleware signatures. Why is Echo's Next() return an error?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Echo Framework (Block 8)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with Echo basics and context, move to middleware differences from Gin, then when to choose Echo over Gin. Test understanding of framework design trade-offs.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-9",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "low",
    "title": "Go — Fiber Framework",
    "subtitle": "Express-style API, routing, middleware, app groups, performance",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "30 min",
        "sections": [
          {
            "heading": "Fiber Basics",
            "items": [
              "<b>Express.js-inspired:</b> <code>app := fiber.New()</code>, <code>app.Get(\"/\", handler)</code>. Callback signature: <code>func(c *fiber.Ctx) error</code>.",
              "<b>Routing:</b> route params <code>/user/:id</code>, c.Params(\"id\"). Query: c.Query(\"page\"). Body: c.Body() / c.BodyParser(&input).",
              "<b>Responses:</b> c.Status(200).JSON(map), c.SendString(\"ok\"), c.SendFile(\"file.pdf\"). Chainable.",
              "<b>Error handling:</b> return nil = 200. Return error = 500. Check err != nil and set status accordingly."
            ]
          },
          {
            "heading": "Middleware + Groups",
            "items": [
              "<b>Use:</b> <code>app.Use(middleware.Logger())</code> — global. <code>app.Use(\"/api\", apiMiddleware)</code> — path-prefixed.",
              "<b>Route group:</b> <code>api := app.Group(\"/api\")</code>, <code>v1 := api.Group(\"/v1\")</code>. Inherits parent middleware.",
              "<b>Next:</b> call c.Next() to continue chain. Skip by returning.",
              "<b>Built-in:</b> Logger, Recover, CORS, JWT, Basic Auth, Rate Limiter, Compress, Timeout."
            ]
          },
          {
            "heading": "Performance Context",
            "items": [
              "<b>Benchmarks:</b> Fiber fastest in some benchmarks. Uses fasthttp (not net/http). Zero allocation for routing claimed.",
              "<b>fasthttp:</b> drops net/http compatibility. No http.Handler interface. Better for raw performance.",
              "<b>Trade-offs:</b> ecosystem smaller than Gin. Fewer middlewares. Less community docs. Performance edge rarely matters at <10K RPS.",
              "<b>Use case:</b> high-throughput API, familiarity with Express migration, minimalism."
            ]
          }
        ],
        "traps": [
          "Fiber uses fasthttp, not net/http — middleware expecting http.Handler won't work",
          "c.Next() required in middleware or chain stops — unlike Gin's Next() being implicit",
          "Error handling model differs from standard http — must understand fiber.Ctx error flow"
        ],
        "checkpoint": [
          "Build a Fiber route group /api/v1 that requires auth middleware.",
          "What is fasthttp and why does Fiber choose it over net/http?",
          "When would you choose Fiber over Gin in a production project?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Fiber Framework (Block 9)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with Fiber's Express-style API, move to middleware and routing, then when you'd pick Fiber vs Gin. Test awareness of fasthttp trade-offs.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-11",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "med",
    "title": "Go — gRPC + Microservices",
    "subtitle": "Protobuf, streaming, interceptors, service mesh, Go-kit patterns",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Protocol Buffers",
            "items": [
              "<b>Proto definition:</b> <code>syntax = \"proto3\"; service User { rpc Get (GetReq) returns (GetResp); }</code>.",
              "<b>Code generation:</b> <code>protoc --go_out=. --go-grpc_out=. user.proto</code>. Generates interfaces and messages.",
              "<b>Message types:</b> scalar (int32, string, bool), repeated (slice), map, oneof, enum. Default values: zero values.",
              "<b>Packages:</b> <code>option go_package = \";user\"</code>. Controls generated Go package path."
            ]
          },
          {
            "heading": "gRPC Server + Streaming",
            "items": [
              "<b>Unary:</b> standard request/response. Most common. Simpler than REST in many cases.",
              "<b>Server streaming:</b> <code>rpc ListUsers (ListReq) returns (stream User);</code>. Server sends multiple responses.",
              "<b>Client streaming:</b> <code>rpc Upload (stream Chunk) returns (UploadResp);</code>. Client sends multiple.",
              "<b>Bidirectional:</b> <code>rpc Chat (stream Msg) returns (stream Msg);</code>. Both sides stream."
            ]
          },
          {
            "heading": "Interceptors + Go-kit",
            "items": [
              "<b>Unary interceptor:</b> <code>func (s *Server) Get(ctx context.Context, req *GetReq) (*GetResp, error)</code>.",
              "<b>Interceptors:</b> auth, logging, metrics, tracing wrap handlers. <code>grpc.UnaryInterceptor(loggingInterceptor)</code>.",
              "<b>Go-kit:</b> declarative microservice toolkit. Add transport layer (HTTP/gRPC), endpoints, service. More structure than pure gRPC.",
              "<b>Service mesh:</b> Istio/Linkerd handle gRPC traffic natively. Sidecar proxies handle retries, mTLS, observability."
            ]
          }
        ],
        "traps": [
          "proto3 doesn't distinguish absent vs zero — use wrapper types or oneof for nullable fields",
          "Streaming requires context cancellation handling — unary handles this more gracefully",
          "gRPC over HTTP/2 — must use port 50051+ or configure proxy support"
        ],
        "checkpoint": [
          "Write a proto definition for User service with Get and List methods.",
          "When would you use server streaming vs unary? Give a real scenario.",
          "What is the Go-kit approach and when is grpc-go alone sufficient?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go gRPC + Microservices (Block 11)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with protobuf basics, move to streaming types, then interceptors and when to use Go-kit. Test depth of microservices knowledge in Go ecosystem.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-12",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "med",
    "title": "Go — CLI Tooling",
    "subtitle": "Cobra, Viper, flags, subcommands, shell completion, distribution",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "CLI Framework Overview",
            "items": [
              "<b>Cobra:</b> commands + subcommands. <code>rootCmd</code> with <code>rootCmd.AddCommand(subCmd)</code>. Cli framework powering kubectl, docker, hugo.",
              "<b>Viper:</b> configuration (flags + env + config file). Often paired with Cobra. Unified config resolution.",
              "<b>urfave/cli:</b> lighter alternative. Action-based. Less boilerplate for simple tools.",
              "<b>flag (stdlib):</b> sufficient for trivial tools. No subcommands. <code>flag.String(\"port\", \"8080\", \"port\")</code>."
            ]
          },
          {
            "heading": "Cobra Commands + Flags",
            "items": [
              "<b>Command:</b> <code>cmd := &cobra.Command{ Use: \"serve\", Short: \"start server\", Run: func(cmd *cobra.Command, args []string) {} }</code>.",
              "<b>Flags:</b> <code>cmd.Flags().StringP(\"port\", \"p\", \"8080\", \"port\")</code>. Persistent flags available to subcommands.",
              "<b>Args validation:</b> <code>cmd.Args = cobra.MinimumNArgs(1)</code> or custom <code>func([]string) error</code>.",
              "<b>Help usage:</b> auto-generated. <code>--help</code> shows usage, flags, subcommands. Customise with Short/Long/LExample."
            ]
          },
          {
            "heading": "Viper + Distribution",
            "items": [
              "<b>Viper reads:</b> config file (JSON/YAML/TOML), env vars, flags. Priority: flags &gt; env &gt; config &gt; defaults.",
              "<b>Bind flags:</b> <code>viper.BindPFlag(\"port\", cmd.Flags().Lookup(\"port\"))</code>.",
              "<b>Shell completion:</b> Cobra generates bash/zsh/fish/powershell. <code>rootCmd.GenBashCompletion</code>.",
              "<b>Distribution:</b> <code>go build</code> produces single binary. No dependencies. goreleaser for cross-compiled releases."
            ]
          }
        ],
        "traps": [
          "Set cmd.Args after Use — overrides built-in validation",
          "Viper with too many config sources creates confusion — pick one source of truth",
          "Not handling os.Exit(1) in errors — Cobra does this, don't repeat"
        ],
        "checkpoint": [
          "Design a CLI tool with subcommands: init (create config), deploy (apply config), status (show current).",
          "How does Viper resolve config when the same key exists in file, env, and flag?",
          "What is goreleaser and why is it useful for distributing Go CLI tools?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go CLI Tooling (Block 12)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with CLI framework choice and Cobra basics, move to flags and Viper config, then distribution and real-world CLI tooling patterns. Test ability to build maintainable CLIs.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-16",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "med",
    "title": "Go — Advanced Patterns",
    "subtitle": "Reflection, cgo, memory tuning, plugin system, build constraints",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Reflection",
            "items": [
              "<b>reflect.Type:</b> <code>reflect.TypeOf(x)</code> — describe type. Methods: Kind(), Name(), NumField().",
              "<b>reflect.Value:</b> <code>reflect.ValueOf(x)</code> — access/mutate value. methods: Int(), String(), SetInt(), SetString().",
              "<b>Struct field access:</b> <code>v.NumField()</code>, <code>v.Field(i)</code>, <code>t.Field(i).Name</code>. Enables generic JSON-like operations.",
              "<b>Performance:</b> reflection is slow. Avoid in hot paths. Prefer generics (Go 1.18+) for type-safe alternatives."
            ]
          },
          {
            "heading": "cgo + Unsafe",
            "items": [
              "<b>cgo:</b> call C code from Go. <code>import \"C\"</code> enables. Requires C compiler. Adds build complexity.",
              "<b>Use cases:</b> OS-specific syscalls, C library bindings. Not for cross-platform tools.",
              "<b>unsafe.Pointer:</b> bypasses type safety. <b>extreme caution.</b> Use for: memory-mapped I/O, serialization, interop. Document thoroughly.",
              "<b>Avoid unless necessary:</b> cgo breaks transparency (no cross-compile), increases binary size, introduces C bugs."
            ]
          },
          {
            "heading": "Build + Optimisation",
            "items": [
              "<b>Build tags:</b> <code>//go:build linux</code> or <code>// +build linux</code> for platform-specific compilation.",
              "<b>CGO_ENABLED:</b> <code>CGO_ENABLED=0</code> for static binary. Must disable for Windows/Plan9 targets.",
              "<b>LD flags:</b> <code>-ldflags=\"-s -w\"</code> strips debug info. <code>-ldflags=-X main.version=1.2.3</code> injects variable.",
              "<b>Race detector:</b> <code>go test -race</code> — data race detection. Significant overhead but catches non-obvious bugs."
            ]
          }
        ],
        "traps": [
          "cgo prevents pure Go static binary — breaks distroless containers",
          "unsafe.Pointer casts can break on architecture changes — never assume pointer size",
          "Build tags disorienting — name clearly, document why platform-specific"
        ],
        "checkpoint": [
          "When would you use reflection vs generics in Go?",
          "Explain the risks of cgo and when you'd accept them.",
          "How do you create a platform-specific binary using build tags?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a senior Go candidate.\n\nTOPIC: Go Advanced Patterns (Block 16)\n\nYOUR ROLE: Reactive Socratic interviewer. Hearing-based, rigorous.\n\nAPPROACH: Start with reflection use cases and trade-offs, move to cgo/unsafe risks, then build optimisation. Test if they make pragmatic choices rather than using advanced features for show.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default golangIntermediate;
