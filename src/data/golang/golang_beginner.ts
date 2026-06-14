import type { Block } from '../../types/content';

export const golangBeginner: Block[] = [
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Core Types + Declarations",
            "items": [
              "<b>Strongly typed, inferred:</b> <code>var x int = 5</code>, <code>x := 5</code> (short declaration — function body only).",
              "<b>Zero values:</b> int=0, string=\"\", bool=false, pointers/slices/maps/funcs=nil. No null — zero values prevent null dereference bugs.",
              "<b>Composite types:</b> array [3]int, slice []int (dynamic), map[K]V, struct {x, y int}. Slices are references to underlying arrays.",
              "<b>Type conversion explicit:</b> <code>float64(x)</code> — no implicit conversions. Prevents silent data loss."
            ]
          },
          {
            "heading": "Structs + Methods",
            "items": [
              "<b>Struct:</b> <code>type User struct { Name string; Age int }</code>. Access via dot: <code>u.Name</code>.",
              "<b>Methods:</b> <code>func (u User) Greet()</code> — value receiver (copies). <code>func (u *User) SetAge()</code> — pointer receiver (mutates).",
              "<b>Receiver choice:</b> pointer if mutating, large structs, or implements interface. Value if small and immutable.",
              "<b>Embedding:</b> <code>type Admin struct { User }</code> — not inheritance. Admin 'promotes' User's fields and methods."
            ]
          },
          {
            "heading": "Functions + Control Flow",
            "items": [
              "<b>Multiple return values:</b> <code>func divide(a, b float64) (float64, error)</code>. Go idiom: return (value, error).",
              "<b>Named return values:</b> <code>func foo() (result int)</code> — result can be returned by bare <code>return</code>. Use sparingly.",
              "<b>defer:</b> schedules function call for end of surrounding function. Stack order (LIFO). Used for cleanup: <code>defer file.Close()</code>.",
              "<b>if/for without parens:</b> <code>if err != nil {}</code>, <code>for i := 0; i &lt; n; i++ {}</code>. Parentheses forbidden — braces always required."
            ]
          }
        ],
        "traps": [
          "Short declaration := only works inside functions",
          "Slices and maps are reference types — assigning copies the reference, not the data",
          "defer executes in LIFO order — not FIFO",
          "No implicit type conversions — explicit casting required"
        ],
        "checkpoint": [
          "What is the difference between value receiver and pointer receiver methods? When would you choose each?",
          "Explain Go's approach to error handling vs exceptions. Why does Go return errors as values?",
          "What happens if you assign a slice to a new variable and modify elements?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Fundamentals (Block 1)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with basic syntax and declarations, move to structs and embedding, then probe error handling philosophy. Test understanding of why Go is minimal and how that affects daily coding.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
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
        "level": "Beginner",
        "time": "45 min",
        "sections": [
          {
            "heading": "Goroutines",
            "items": [
              "<b>Goroutine = lightweight thread managed by Go runtime.</b> <code>go f(x)</code> launches f(x) in a new goroutine. Goroutines run in same address space.",
              "<b>Cheap:</b> stacks start at 2KB, grow/shrink dynamically. Can run thousands/millions goroutines on few OS threads.",
              "<b>Non-preemptive (sweet spot for workload context):</b> scheduler preempts at function calls, loops. Long-running computations can block scheduler — insert runtime.Gosched().",
              "<b>Main goroutine exits = program ends.</b> Other goroutines are killed abruptly. Use sync.WaitGroup or channels to coordinate."
            ]
          },
          {
            "heading": "Channels",
            "items": [
              "<b>Channel = typed communication pipe.</b> <code>ch := make(chan int)</code> creates channel of ints.",
              "<b>Send/receive blocks:</b> <code>ch &lt;- v</code> blocks until receiver ready. <code>v := &lt;-ch</code> blocks until sender ready.",
              "<b>Buffered channels:</b> <code>make(chan int, 3)</code> — send doesn't block until buffer full. Receives don't block until buffer empty.",
              "<b>Close channel:</b> <code>close(ch)</code> — no more sends allowed. Receives return zero value + ok=false when empty+closed. Only sender should close."
            ]
          },
          {
            "heading": "select + Context",
            "items": [
              "<b>select:</b> like switch for channels. Waits on multiple channel ops. <b>Multiple ready:</b> random case chosen. <b>None ready:</b> blocks until one ready.",
              "<b>default case:</b> select with default is non-blocking — used for periodic non-blocking polls.",
              "<b>time.Ticker vs time.After:</b> Ticker fires repeatedly. After fires once. For repeated intervals use Ticker and call Stop().",
              "<b>context.Context:</b> carries deadline, cancellation, request-scoped values. <code>ctx, cancel := context.WithCancel(parent)</code>. Always cancel to prevent leaks."
            ]
          }
        ],
        "traps": [
          "Leaking goroutines — always have a termination path (close, cancel, waitgroup)",
          "Closing a channel from receiver side is a race — only sender should close",
          "time.After inside loop creates new timer each iteration — use time.NewTicker or reset"
        ],
        "checkpoint": [
          "What is a goroutine and how is it different from an OS thread?",
          "When would you use a buffered channel vs unbuffered? Give a concrete scenario.",
          "How do you properly propagate cancellation across a chain of goroutines?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Concurrency (Block 2)\n\nYOUR ROLE: Reactive Socratic interviewer. High-signal topic.\n\nAPPROACH: Start with goroutine basics, move to channel patterns, then deadlock scenarios and context propagation. Test understanding of the scheduler and common pitfalls.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-5",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "high",
    "title": "Go — Testing + Quality",
    "subtitle": "Table-driven tests, mocks, testify, fuzz, benchmarks, race detector",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Testing Basics",
            "items": [
              "<b>Built-in testing:</b> <code>go test</code> runs <code>_test.go</code> files. Conventions: TestXxx(t *testing.T), BenchmarkXxx(b *testing.B).",
              "<b>Table-driven tests:</b> Go's idiomatic pattern. Slice of structs {name, args, want}. Loop and call t.Run(name, func(t *testing.T)).",
              "<b>TestMain(m *testing.M):</b> runs before all tests in package. Setup/teardown. Call m.Run() then os.Exit().",
              "<b>Skipping tests:</b> <code>t.Skip(\"reason\")</code>. Use for slow tests, missing dependencies."
            ]
          },
          {
            "heading": "Assertions + Subtests",
            "items": [
              "<b>Standard lib:</b> <code>if got != want { t.Errorf(\"got %v want %v\", got, want) }</code>.",
              "<b>testify (third-party):</b> assertions <code>assert.Equal(t, want, got, \"reason\")</code>. Requires <code>go get github.com/stretchr/testify</code>.",
              "<b>ErrorAs/ErrorIs (Go 1.13+):</b> <code>if !errors.Is(err, ErrNotFound) {}</code>, <code>var target *MyErr; if errors.As(err, &target) {}</code>.",
              "<b>Subtests:</b> <code>t.Run(\"subcase\", func(t *testing.T) { ... })</code> for isolated test cases within a test."
            ]
          }
        ],
        "traps": [
          "t.Parallel() must be called before t.Run subtests — race conditions in parallel subtests are hidden",
          "assert package panics on failure, not t.Errorf — recover if you want graceful failure"
        ],
        "checkpoint": [
          "Why is table-driven testing Go's idiom? Show one in code.",
          "What is the difference between t.Errorf and testify assert.Equal?",
          "How do you clean up resources (DB, temp files) before/after tests?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Testing + Quality (Block 5)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with table-driven tests basics, move to mocking strategies, then fuzz testing and race detection. Test awareness of Go's quality tooling.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-6",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "med",
    "title": "Go — Standard net/http",
    "subtitle": "http.Server, middleware chaining, TLS, graceful shutdown, timeouts",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Server Setup + Handlers",
            "items": [
              "<b>http.HandleFunc</b> registers handler function. <code>http.ListenAndServe(\":8080\", nil)</code> starts server with default ServeMux.",
              "<b>Handle vs HandleFunc:</b> Handle takes http.Handler. HandleFunc takes func(w, r) and wraps it.",
              "<b>Request + Response:</b> r *http.Request (method, URL, headers, body via r.Body). w http.ResponseWriter (write status, headers, body).",
              "<b>Reading body:</b> <code>r.ParseForm()</code> for URL/form data. <code>io.ReadAll(r.Body)</code> for raw body. Always close r.Body."
            ]
          },
          {
            "heading": "Middleware Pattern",
            "items": [
              "<b>Middleware wraps http.Handler.</b> <code>func logging(next http.Handler) http.Handler</code> — takes handler, returns handler.",
              "<b>Chaining:</b> <code>handler = logging(metrics(handler))</code> — wraps in reverse order of execution.",
              "<b>Standard middleware:</b> CORS (set headers), auth (check token), logging (request ID + timestamp), recovery (catch panics).",
              "<b>Recovery middleware:</b> defer recover() inside handler. Logs panic, returns 500. Prevents server crash from panicking handler."
            ]
          },
          {
            "heading": "Graceful Shutdown + Timeouts",
            "items": [
              "<b>Graceful shutdown:</b> <code>srv.Shutdown(ctx)</code> — stops accepting new connections, waits for existing to complete.",
              "<b>Shutdown context:</b> use timeout context: <code>ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second); defer cancel()</code>.",
              "<b>Server timeouts (critical for production):</b> ReadTimeout, WriteTimeout, IdleTimeout on http.Server. Prevents Slowloris attacks.",
              "<b>TLS:</b> <code>http.ListenAndServeTLS</code> or configure tls.Config. Get certs from ACME provider (Let's Encrypt) for production."
            ]
          }
        ],
        "traps": [
          "No ReadTimeout/WriteTimeout = vulnerable to Slowloris — attacker holds connections open",
          "r.Body not closed = leaked connections — always defer r.Body.Close() after reading",
          "Recovery middleware must catch panics inside the handler execution, not in the wrapper itself"
        ],
        "checkpoint": [
          "Design a middleware chain for an HTTP API: logging, auth, recovery. Show the wrapping order and why.",
          "What server timeouts should you set in production and why?",
          "Show a graceful shutdown implementation that waits up to 10s for active requests."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Standard net/http (Block 6)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with basic server setup, move to middleware patterns and the functional options pattern, then production hardening (timeouts, TLS, graceful shutdown). Test if they understand what net/http provides out of the box.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "database/sql Package",
            "items": [
              "<b>Standard library database/sql</b> is DB-agnostic interface. Use driver: <code>_ \"github.com/lib/pq\"</code> for PostgreSQL.",
              "<b>sql.DB:</b> represents a connection pool (NOT a single connection). <code>sql.Open</code> validates config, doesn't create connections.",
              "<b>Ping:</b> <code>db.Ping()</code> creates initial connection and validates. Call after sql.Open.",
              "<b>Query vs Exec:</b> Query returns rows (SELECT). Exec returns Result (INSERT/UPDATE/DELETE). Always check sql.ErrNoRows."
            ]
          },
          {
            "heading": "Transactions",
            "items": [
              "<b>Begin:</b> <code>tx, err := db.Begin()</code>. All statements on tx are in transaction.",
              "<b>Commit or Rollback:</b> <code>tx.Commit()</code> or <code>tx.Rollback()</code>. Always call exactly one.",
              "<b>Deferred rollback:</b> <code>defer tx.Rollback()</code> before operations. If Commit succeeds, rollback becomes no-op. Safe against panics.",
              "<b>Nested transactions:</b> not supported. Use savepoints manually: <code>tx.Exec(\"SAVEPOINT name\")</code>."
            ]
          },
          {
            "heading": "ORM Options",
            "items": [
              "<b>GORM:</b> full-featured ORM. Associations, hooks, migrations. Good productivity. Can hide SQL complexity.",
              "<b>SQLx:</b> extends database/sql with struct scanning. More control, closer to raw SQL. Preferred by teams that want SQL visibility.",
              "<b>sqlc (codegen):</b> generates type-safe Go from SQL. Write SQL, get Go. Best of both worlds — SQL + types.",
              "<b>Connection pool:</b> DB.SetMaxOpenConns(25). Default unlimited = exhaustion under load. Monitor with db.Stats()."
            ]
          }
        ],
        "traps": [
          "sql.Open doesn't create connections — Ping validates. Misunderstanding causes 'works on my machine' bugs",
          "Forgetting tx.Rollback() = hung transaction consuming a connection until context timeout",
          "GORM auto-migrate in production = data loss risk — use reversible migrations"
        ],
        "checkpoint": [
          "What does sql.DB represent — a single connection or a pool?",
          "Show the safe transaction pattern with deferred rollback.",
          "GORM vs SQLx vs raw database/sql — when would you choose each?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Database Access (Block 10)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with database/sql basics, move to transactions and connection pooling, then ORM trade-offs. Test if they understand the 'why' behind Go's minimalist DB interface.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "golang-14",
    "phase": "Go Fundamentals",
    "chip": "golang",
    "freq": "low",
    "title": "Go — Game Dev",
    "subtitle": "Ebiten 2D, game loop, input, audio, sprite sheets, WASM export",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Why Go for Games",
            "items": [
              "<b>Ebiten:</b> simple 2D game library. Single function game loop. <code>ebiten.RunGame(game)</code>.",
              "<b>WASM export:</b> compile to WASM, run in browser. Same codebase for desktop + web.",
              "<b>Not for AAA:</b> Go GC pauses (typically &lt;1ms but noticeable in tight game loops). Fine for 2D, puzzles, casual games.",
              "<b>Alternatives:</b> Pixel (older, less active), Oak (3D experimental). Ebiten is the production choice."
            ]
          },
          {
            "heading": "Game Loop Basics",
            "items": [
              "<b>Update + Draw:</b> Ebiten calls Update(dt) then Draw(screen). dt = time since last frame in seconds (float64).",
              "<b>Input:</b> <code>ebiten.IsKeyPressed(ebiten.KeySpace)</code>. Mouse: <code>ebiten.CursorPosition()</code>.",
              "<b>Image loading:</b> <code>ebiten.NewImageFromFile(\"sprite.png\")</code>. Cached — don't reload every frame.",
              "<b>Positioning:</b> <code>opts.GeoM.Translate(x, y)</code> or <code>opts.GeoM.Scale(sx, sy)</code>. Set via op.GeoM."
            ]
          }
        ],
        "traps": [
          "Loading images every frame kills performance — cache as struct field",
          "GC pauses in game loop can cause frame drops — profile with runtime/pprof",
          "Ebiten's default window size is 640x480 — set explicitly"
        ],
        "checkpoint": [
          "How does Ebiten's game loop work? What is the Update vs Draw separation?",
          "When would Go's GC be a concern in game development?",
          "Show how to handle input and draw a sprite at a position."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go game dev candidate.\n\nTOPIC: Go Game Dev with Ebiten (Block 14)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with why Go for games, move to Ebiten API basics, then game loop, input, and performance considerations. Test practical ability to build a simple game.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Containerisation",
            "items": [
              "<b>Multi-stage Dockerfile:</b> build stage compiles, final stage copies binary. Result: tiny image (~10-20MB).",
              "<b>FROM scratch or FROM alpine:</b> scratch = no shell, minimal. Alpine = small, has package manager. distroless = Google's minimal.",
              "<b>go build flags:</b> <code>CGO_ENABLED=0 go build -ldflags=\"-s -w\"</code>. Strips debug info, static binary.",
              "<b>Run non-root:</b> <code>USER 1000</code> in Dockerfile. Prevents container escape exploitation."
            ]
          },
          {
            "heading": "Logging + Observability",
            "items": [
              "<b>Structured logging:</b> zap (fast, structured), slog (standard library Go 1.21+). Always JSON in production.",
              "<b>Log levels:</b> DEBUG, INFO, WARN, ERROR. Container environments: INFO default, DEBUG env-flagged.",
              "<b>Metrics (Prometheus):</b> prometheus/client_golang. Expose /metrics endpoint. Counters, gauges, histograms.",
              "<b>Traces (OpenTelemetry):</b> go.opentelemetry.io/otel. Trace spans across services. Export to Jaeger/Tempo."
            ]
          },
          {
            "heading": "Health Checks + Config",
            "items": [
              "<b>Health endpoints:</b> /healthz (liveness), /readyz (readiness). Readiness checks DB, cache, downstream. Liveness checks process alive.",
              "<b>Config management:</b> Viper (YAML, env vars, flags). 12-factor app: config via environment, not files.",
              "<b>Graceful shutdown:</b> signal.Notify(os.Signal(os.Interrupt)) — catch SIGINT/SIGTERM. Shutdown HTTP server, drain connections."
            ]
          }
        ],
        "traps": [
          "Logging with fmt.Println = no levels, no JSON, no rotation — never in production",
          "No health check endpoint = Kubernetes can't determine pod health — restarts blind",
          "Storing secrets in config files = secrets in image layers and git — use env or secret managers"
        ],
        "checkpoint": [
          "Write a minimal multi-stage Dockerfile for a Go binary. What is the final image size?",
          "Design logging and metrics for a production microservice.",
          "What is the difference between liveness and readiness probes in Kubernetes?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Go backend candidate.\n\nTOPIC: Go Production Readiness (Block 15)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Start with Docker and containerisation, move to logging and metrics, then distributed tracing and health checks. Test production instincts, not just library knowledge.\n\nRULES: One question. React. Escalate. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default golangBeginner;
