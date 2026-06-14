# Golang Content Addition Plan

## Goal
Add Go content covering the full ecosystem: core language, web frameworks (Gin/Echo/Fiber), CLI, desktop, game dev, gRPC/microservices, and production observability.

## Scope
- Add `src/data/golang/` with three tier files: `golang_beginner.ts`, `golang_intermediate.ts`, `golang_advanced.ts`.
- Use string IDs `golang-1` through `golang-16`.
- Register in `src/data/content.ts` aggregator.
- No changes needed to `types/content.ts` — `TopicKey` already includes `'golang'`.

## Does Go Have a "Spring Boot"?

Short answer: **no single dominant equivalent**. Go's web framework landscape is fragmented.

- **Gin** (78k GitHub stars): de facto standard. Fastest, very popular. Used by many companies.
- **Echo** (30k stars): enterprise-focused, more structured, built-in middleware.
- **Fiber** (Express.js-inspired): fastest benchmarks, familiar API for JS developers.
- **Chi** and **HttpRouter**: minimalist routers used by some teams.
- **Beego** (31k stars, docs down): full MVC like Spring Boot, but not widely adopted.

**Why no Spring Boot equivalent?** Go's philosophy values minimalism and explicitness. The standard library `net/http` is production-capable, so frameworks stay small and composable. Companies typically pick one (Gin > Echo > Fiber) rather than having an "official" leader. This means interviewers test Go + one framework specifically.

## Go's Full Ecosystem Use Cases

Beyond web/microservices, Go is widely used for:

| Use case | Primary tool/library | Why Go |
|----------|---------------------|--------|
| **CLI tools** | Cobra + Viper | Fast compile, single binary, great for DevOps tools |
| **Desktop apps** | Wails, Fyne | Wails wraps web UI (Electron alternative); Fyne is pure Go GUI |
| **Game dev** | Ebiten, Pixel | 2D game engine, WASM output, simple API |
| **Web / REST** | Gin, Echo, Fiber | High throughput, low latency |
| **Microservices** | Go-kit, gRPC | Native RPC, excellent concurrency, small binary |
| **Observability** | OpenTelemetry Go SDK | First-class OTEL support, used in CNCF projects |
| **Infrastructure / CLI** | Docker, kubectl, Terraform, Helm | Written in Go for precisely these reasons |

This plan covers the most interview-relevant slices: core language, web frameworks, CLI, desktop (Wails), game dev (Ebiten), gRPC/microservices, and production readiness.

## Block Definitions

| ID | Title | Subtitle | Freq | Prereqs |
|----|-------|----------|------|---------|
| golang-1 | Go — Fundamentals | Types, structs, interfaces, error handling, defer/panic/recover | high | |
| golang-2 | Go — Concurrency | Goroutines, channels, select, context, sync primitives, worker pools | high | |
| golang-3 | Go — Memory + GC | Stack vs heap, escape analysis, GC, profiling, memory leaks | med | |
| golang-4 | Go — Interfaces + Generics | Structural typing, embedding, generics (Go 1.18+), constraints | med | |
| golang-5 | Go — Testing + Quality | Table-driven tests, mocks, testify, fuzz, benchmarks, race detector | high | |
| golang-6 | Go — Standard net/http | http.Server, middleware chaining, TLS, graceful shutdown, timeouts | med | |
| golang-7 | Go — Gin Framework | Routing, groups, middleware chain, binding/validation, production patterns | high | |
| golang-8 | Go — Echo Framework | Context API, middleware, validation, graceful shutdown, extensibility | med | golang-6 |
| golang-9 | Go — Fiber Framework | Express-style API, routing, middleware, app groups, performance | low | golang-6 |
| golang-10 | Go — Database Access | database/sql, GORM, SQLx, connection pooling, transactions, migrations | high | |
| golang-11 | Go — gRPC + Microservices | Protobuf, streaming, interceptors, service mesh, Go-kit patterns | med | golang-2 |
| golang-12 | Go — CLI Tooling | Cobra, Viper, flags, subcommands, shell completion, distribution | med | |
| golang-13 | Go — Desktop Apps | Wails (web UI), Fyne (pure Go), packaging, system trays, OS integration | low | |
| golang-14 | Go — Game Dev | Ebiten 2D, game loop, input, audio, sprite sheets, WASM export | low | |
| golang-15 | Go — Production Readiness | Docker, logging (zap/slog), metrics (Prometheus), tracing, health checks | high | |
| golang-16 | Go — Advanced Patterns | Generics deep dive, reflection, unsafe.Pointer, cgo, memory tuning | med | golang-3 |

## Tier Distribution
Each block's `tiers` array contains up to 3 entries (Beginner/Intermediate/Advanced). Tier files will extract matching levels.

- **Beginner** (golang_beginner.ts): golang-1 (Beginner), golang-2 (Beginner), golang-5 (Beginner), golang-6 (Beginner), golang-10 (Beginner), golang-14 (Beginner), golang-15 (Beginner)
- **Intermediate** (golang_intermediate.ts): golang-3 (Intermediate), golang-4 (Intermediate), golang-7 (Intermediate), golang-8 (Intermediate), golang-9 (Intermediate), golang-11 (Intermediate), golang-12 (Intermediate), golang-16 (Intermediate)
- **Advanced** (golang_advanced.ts): golang-1 (Advanced), golang-2 (Advanced), golang-3 (Advanced), golang-5 (Advanced), golang-7 (Advanced), golang-10 (Advanced), golang-11 (Advanced), golang-13 (Advanced), golang-15 (Advanced), golang-16 (Advanced)

## Cross-topic Prerequisites
- `golang-6` (net/http) depends on `api-1` (REST fundamentals)
- `golang-7` (Gin) depends on `golang-6` (net/http)
- `golang-8` (Echo) depends on `golang-6` (net/http)
- `golang-9` (Fiber) depends on `golang-6` (net/http)
- `golang-10` (DB) depends on `database-1` (SQL basics)
- `golang-11` (gRPC) depends on `golang-2` (Concurrency)
- `golang-12` (CLI) depends on `golang-1` (Fundamentals)
- `golang-15` (Production) depends on `infra-1` (Docker) and `devops-1` (Kubernetes)
- `golang-16` (Advanced) depends on `golang-3` (Memory/GC)

## Implementation Steps
1. Create `src/data/golang/golang_beginner.ts`, `_intermediate.ts`, `_advanced.ts` following existing tier-file pattern (see `src/data/java/java_beginner.ts` for reference).
2. Update `src/data/content.ts` to:
   - Add golang imports
   - Add `mergeTierBlocks` call, placed after TypeScript in existing topic order
   - Add `golang` to `TOPIC_CONTENT`
3. Run `npx tsc --noEmit` to verify compilation passes.
4. Verify overview page renders golang phase/cards correctly.
5. **Cross-topic prereqs**: ensure existing `api-1`, `database-1`, `infra-1`, etc. have string IDs as prereq references.

## Godot
Deferred to a separate follow-up plan. Go blocks first.

