# Data Syllabus Cleanup Plan

## Goal

Polish `src/data/` into a cleaner interview-prep syllabus:

1. Sort existing blocks into the most appropriate topic files.
2. Fix obvious content quality issues.
3. Add missing or under-focused topic coverage.

This plan keeps the existing app structure and uses the same `Block` schema.

---

## Current Main Topics

These are the main topic files currently present:

| File | Current focus |
|---|---|
| `java_content.ts` | Java fundamentals, collections, streams, concurrency, JVM/GC |
| `spring_content.ts` | Spring Core, JPA, transactions, security, Spring Boot production patterns |
| `jsbackend_content.ts` | NestJS, Node.js, Express, Node testing, JS/Node DB libraries |
| `database_content.ts` | PostgreSQL, Redis, Elasticsearch, Cassandra |
| `messaging_content.ts` | Kafka, ActiveMQ, WebSocket |
| `api_content.ts` | REST, HTTP, API security |
| `infra_content.ts` | Docker, Linux |
| `frontend_content.ts` | React, Next.js, CSS, browser performance, forms/build tools |
| `arch_content.ts` | Design patterns, frontend architecture |
| `behavioral_content.ts` | System design round, conflict/collaboration, ownership, STAR |
| `testing_content.ts` | Testing philosophy and strategies |
| `devops_content.ts` | Kubernetes, CI/CD, AWS, Terraform, observability, Nginx |
| `typescript_content.ts` | Advanced TypeScript type system |

---

## Existing Blocks and Proposed Sorting

### Keep as-is

These are already in the correct files:

| Topic file | Block IDs |
|---|---|
| `java_content.ts` | 1-8 |
| `spring_content.ts` | 9-16 |
| `jsbackend_content.ts` | 18-19, 40-43, 60-61 |
| `database_content.ts` | 20-25 |
| `messaging_content.ts` | 26-27 |
| `api_content.ts` | 28-30 |
| `infra_content.ts` | 31-32 |
| `frontend_content.ts` | 33-35, 44-48, 63 |
| `testing_content.ts` | 49 |
| `devops_content.ts` | 50-52, 55-57 |
| `typescript_content.ts` | 64 |

### Move to better files

| Block ID | Current file | Move to | Reason |
|---|---|---|---|
| 37 | `behavioral_content.ts` | `arch_content.ts` | “System Design Round” is architecture/system design, not behavioral. |
| 38 | `behavioral_content.ts` | `arch_content.ts` | “Conflict & Collaboration” is currently behavioral, but the content is system-design-round focused; move only if content is refactored into soft-skill system-design scenarios. Otherwise keep in behavioral. |
| 39 | `behavioral_content.ts` | `arch_content.ts` | “Ownership & Delivery” is behavioral, so keep in behavioral unless rewritten into architecture ownership stories. Safer default: keep in behavioral. |
| 59 | `arch_content.ts` | `frontend_content.ts` | “System Design — Frontend Architecture” belongs with frontend architecture. |
| 53 | `devops_content.ts` | new `cloud_content.ts` or keep in `devops_content.ts` | AWS is large enough for its own topic file. |
| 54 | `devops_content.ts` | new `cloud_content.ts` or keep in `devops_content.ts` | AWS Networking + Security belongs with AWS. |
| 62 | `jsbackend_content.ts` | new `javascript_content.ts` | “Advanced JavaScript Patterns” is general JavaScript/Node runtime, not NestJS/backend-specific. |
| 17 | `spring_content.ts` | new `springboot_content.ts` | “Spring Boot — Production Patterns” is Boot-specific and should live under Spring Boot. |

Recommended final topic keys/files after sorting:

- `java`
- `spring`
- `springboot`
- `javascript`
- `jsbackend`
- `database`
- `messaging`
- `api`
- `infra`
- `frontend`
- `html`
- `arch`
- `behavioral`
- `testing`
- `devops`
- `cloud`
- `typescript`

If avoiding a larger schema change is preferred, skip `cloud` and `html` files and keep AWS under `devops` and HTML under `frontend`.

---

## Content Quality Fixes Needed Before Adding New Content

1. Fix malformed HTML-like tags:
   - Replace `</arg_key>` and `<b>...:</arg_key>` with valid `<b>...:</b>`.
   - Known affected files:
     - `frontend_content.ts`
     - `jsbackend_content.ts`

2. Normalize duplicate/overlapping topics:
   - React state management appears twice:
     - Block 35: React State Management Patterns
     - Block 46: React — State Management
   - Keep both if one is Redux/modern alternatives and the other is local/global state + RTK/Zustand/React Query.
   - Rename subtitles to make the distinction clearer.

3. Rename Cassandra coverage:
   - Current block 25 is Cassandra only.
   - Rename title/subtitle to “Cassandra + ScyllaDB — Distribution Model”.
   - Add ScyllaDB-specific items later.

4. Fix TypeScript prereq:
   - Block 64 currently has prereq `34`, which points to Next.js.
   - Better prereq should be React/JS/TS basics once those blocks exist.

5. Keep `ALL_BLOCKS` sorted by `id` and ensure every topic file is imported/registered in `content.ts`.

---

## Phase 1 — Sort Existing Content

Implementation steps:

1. Update `src/types/content.ts`:
   - Add topic keys if new files are created:
     - `javascript`
     - `html`
     - `springboot`
     - `cloud`

2. Update `src/data/content.ts`:
   - Import new topic files.
   - Add them to `ALL_BLOCKS`.
   - Add them to `TOPIC_CONTENT`.

3. Move blocks:
   - Move block 59 from `arch_content.ts` to `frontend_content.ts`.
   - Move block 62 from `jsbackend_content.ts` to `javascript_content.ts`.
   - Move block 17 from `spring_content.ts` to `springboot_content.ts`.
   - Move blocks 53-54 from `devops_content.ts` to `cloud_content.ts`, or keep in `devops_content.ts` if avoiding a new topic key.

4. Fix malformed tags in affected files.

5. Validate:
   - No duplicate IDs.
   - No missing IDs from `ALL_BLOCKS`.
   - `prereqs` point to existing or soon-to-be-existing blocks.
   - `npm run build` passes.

---

## Phase 2 — Add Missing / Under-Focused Content

Add new blocks using the same `Block` structure: beginner/intermediate/advanced tiers, traps, checkpoints, and grill prompt.

### JavaScript

Create `javascript_content.ts` if block 62 is moved there.

Add:

| Proposed ID | Title | Focus |
|---|---|---|
| 65 | JavaScript Core Fundamentals | primitives, objects, prototypes, closures, `this`, modules, event loop basics |
| 66 | JavaScript Async Patterns | callbacks, promises, async/await, concurrency, AbortController, fetch, error handling |

### HTML

Create `html_content.ts`.

| Proposed ID | Title | Focus |
|---|---|---|
| 67 | HTML + Web Semantics | semantic HTML, forms, accessibility, SEO, metadata, document structure |

### Spring Boot

Create `springboot_content.ts`.

| Proposed ID | Title | Focus |
|---|---|---|
| 68 | Spring Boot Fundamentals | starters, auto-configuration, profiles, config binding, externalized config |
| 69 | Spring Boot REST + Validation | controllers, DTOs, Bean Validation, exception handling, OpenAPI |
| 70 | Spring Boot Production Readiness | Actuator, health checks, metrics, graceful shutdown, logging, config security |

Existing block 17 can be moved here and expanded with missing Boot-specific production details.

### React / Frontend

Add only where coverage is thin:

| Proposed ID | Title | Focus |
|---|---|---|
| 71 | React Performance Internals | rendering lifecycle, reconciliation, memoization pitfalls, profiler workflow |
| 72 | React Router + App Structure | route layout, loaders/actions, protected routes, code splitting by route |
| 73 | CSS Architecture + Design Tokens | BEM, utility-first CSS, tokens, responsive systems, dark mode |

### Next.js

| Proposed ID | Title | Focus |
|---|---|---|
| 74 | Next.js Security + Authentication | auth patterns, middleware, route protection, cookies, CSRF/CORS |

### Database

| Proposed ID | Title | Focus |
|---|---|---|
| 75 | Database Transactions + Isolation | ACID, isolation levels, locking, deadlocks, lost updates |
| 76 | Cassandra + ScyllaDB Production | Scylla architecture, shard-aware drivers, compaction, tuning differences |
| 77 | Elasticsearch Query Design | relevance tuning, analyzers, synonyms, filtering, aggregations |

### Messaging

| Proposed ID | Title | Focus |
|---|---|---|
| 78 | Kafka Operations + Schema Registry | KRaft, schema evolution, Avro/Protobuf, dead-letter topics, monitoring |
| 79 | Event-Driven Architecture Patterns | outbox, saga, idempotency, consumer-driven contracts, retry design |

### API

| Proposed ID | Title | Focus |
|---|---|---|
| 80 | GraphQL + gRPC + API Contracts | GraphQL schema/resolvers, gRPC protobuf, API contracts, versioning trade-offs |

### Architecture

| Proposed ID | Title | Focus |
|---|---|---|
| 81 | System Design Foundations | requirements, capacity estimation, bottlenecks, caching, queues, consistency |
| 82 | Microservices + DDD | bounded contexts, aggregates, service boundaries, distributed transactions |

### DevOps / Cloud / Infra

| Proposed ID | Title | Focus |
|---|---|---|
| 83 | AWS Event-Driven Architecture | S3 events, SNS/SQS, EventBridge, Lambda, IAM boundaries |
| 84 | Docker Compose + Local Development | local stacks, env files, healthchecks, volumes, dev/prod parity |
| 85 | CI/CD Security + Release Engineering | OIDC, approvals, rollback, artifacts, provenance |

### Testing

| Proposed ID | Title | Focus |
|---|---|---|
| 86 | Testing Implementation Patterns | unit/integration/e2e setup, mocks vs fakes, Testcontainers, CI test strategy |

### TypeScript

| Proposed ID | Title | Focus |
|---|---|---|
| 87 | TypeScript Practical Usage | interfaces vs types, narrowing, generics basics, API response typing, React props |

---

## Recommended Order of Work

1. Sort existing blocks only.
2. Fix malformed tags and duplicate/overlap labels.
3. Add missing topic files and blocks.
4. Update `TOPIC_CONTENT` and UI-facing topic labels if needed.
5. Run `npm run build`.
6. Review generated syllabus order in the app.
