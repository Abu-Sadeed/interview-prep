# Content Refactoring Plan

## Overview
Refactor the interview prep content system to use topic-based string IDs, reorganize file structure, and prepare for Golang/Godot additions.

## Current State Analysis

### File Organization
- `src/types/content.ts` - Block interface (id: number)
- `src/data/*.ts` - One file per topic (Java, Spring, JavaScript, etc.)
- Large files with 3 tiers (Beginner, Intermediate, Advanced) in each block

### Current ID System
- Numeric IDs: 1, 2, 3, ..., 87
- Issues: No clear topic association, potential for collisions

### Current Topic Order (in ALL_BLOCKS)
1. Java
2. Spring
3. Spring Boot
4. JavaScript
5. JS Backend
6. Database
7. Messaging
8. API
9. Infra
10. Frontend
11. HTML
12. Arch
13. Behavioral
14. Testing
15. DevOps
16. Cloud
17. TypeScript

## Proposed Changes

### 1. Type System Change
Change Block.id from `number` to `string` in `src/types/content.ts`

### 2. New File Structure
Each topic split into 3 files by tier level:
```
src/data/
├── java_beginner.ts
├── java_intermediate.ts
├── java_advanced.ts
├── spring_beginner.ts
├── spring_intermediate.ts
├── spring_advanced.ts
├── springboot_beginner.ts
├── springboot_intermediate.ts
├── springboot_advanced.ts
├── js_beginner.ts
├── js_intermediate.ts
├── js_advanced.ts
├── typescript_beginner.ts
├── typescript_intermediate.ts
├── typescript_advanced.ts
├── jsbackend_beginner.ts
├── jsbackend_intermediate.ts
├── jsbackend_advanced.ts
├── frontend_beginner.ts
├── frontend_intermediate.ts
├── frontend_advanced.ts
├── database_beginner.ts
├── database_intermediate.ts
├── database_advanced.ts
├── api_beginner.ts
├── api_intermediate.ts
├── api_advanced.ts
├── infra_beginner.ts
├── infra_intermediate.ts
├── infra_advanced.ts
├── arch_beginner.ts
├── arch_intermediate.ts
├── arch_advanced.ts
├── behavioral_beginner.ts
├── behavioral_intermediate.ts
├── behavioral_advanced.ts
├── devops_beginner.ts
├── devops_intermediate.ts
├── devops_advanced.ts
├── cloud_beginner.ts
├── cloud_intermediate.ts
├── cloud_advanced.ts
├── messaging_beginner.ts
├── messaging_intermediate.ts
├── messaging_advanced.ts
├── testing_beginner.ts
├── testing_intermediate.ts
├── testing_advanced.ts
```

### 3. New String ID Format
Format: `{topic}-{sequence}` where sequence is per-topic

| Topic | Current IDs | New IDs |
|-------|-------------|---------|
| Java | 1-8 | java-1, java-2, java-3, etc. |
| Spring | 9-16 | spring-1, spring-2, spring-3, etc. |
| Spring Boot | 17, 68-70 | springboot-1, springboot-2, etc. |
| JavaScript | 62, 65-66 | js-1, js-2, js-3, etc. |
| TypeScript | 64, 87 | typescript-1, typescript-2, etc. |
| JS Backend | 18-20, 40-43, 60-61 | jsbackend-1, jsbackend-2, etc. |
| Database | 20-25, 75-77 | database-1, database-2, etc. |
| API | 28-30, 80 | api-1, api-2, api-3, api-4 |
| Frontend | 33-35, 44-48, 63, 67 | frontend-1, frontend-2, etc. |
| Infra | 31-32 | infra-1, infra-2 |
| DevOps | 50-52, 55-57, 84-85 | devops-1, devops-2, etc. |
| Cloud | 53-54, 83 | cloud-1, cloud-2, cloud-3 |
| Arch | 36-37, 81-82 | arch-1, arch-2, arch-3, arch-4 |
| Behavioral | 38-39, 58 | behavioral-1, behavioral-2, behavioral-3 |
| Testing | 49, 86 | testing-1, testing-2 |
| Messaging | 26-27, 78-79 | messaging-1, messaging-2, messaging-3, messaging-4 |

### 4. Revised Topic Order
Reordering to logical flow:
1. **Java** (Fundamentals → Collections → Generics → Streams → Concurrency → Threading)
2. **Spring** (Core → Data JPA Entity → Relationships → Querying → Criteria → Security → Advanced)
3. **Spring Boot** (Fundamentals → REST → Production)
4. **JavaScript** (Core → Async)
5. **TypeScript** (Core → Advanced)
6. **JS Backend** (NestJS → Node.js → Express → Database)
7. **Frontend** (React → Next.js → CSS → Browser → Advanced)
8. **HTML**
9. **Database** (Postgres → Redis → ES → Cassandra → Transactions)
10. **API**
11. **Messaging** (Kafka → ActiveMQ → Operations → Patterns)
12. **Infra**
13. **DevOps** (Kubernetes → CI/CD → Terraform → Observability → Nginx → Docker Compose)
14. **Cloud** (AWS Compute → Networking → Event-Driven)
15. **Arch**
16. **Behavioral**
17. **Testing**

### 5. Prerequisite Updates
Update all `prereqs` arrays to use new string IDs instead of numbers.

## Golang Content Addition Plan

### Topic: Go Backend Development
- **go-1**: Go Fundamentals — Types, Structs, Interfaces, Goroutines
- **go-2**: Go Concurrency — Channels, Select, Context, Sync Primitives
- **go-3**: Go Testing — Table-driven tests, Mocks, Testify
- **go-4**: Go Web — Gin/Gin internals, Middleware, Request lifecycle
- **go-5**: Go Database — GORM, SQLx patterns, connection pooling
- **go-6**: Go API — REST, gRPC, Protocol Buffers, middleware patterns
- **go-7**: Go Production — Deployment, Docker, Monitoring, Tracing
- **go-8**: Go Advanced — Generics, Reflection, Memory management

## Godot Engine Content Addition Plan

### Topic: Godot Game Development
- **godot-1**: Godot Fundamentals — Nodes, Scene Tree, GDScript Basics
- **godot-2**: Godot Scripting — GDScript, C# in Godot, signals
- **godot-3**: Godot Physics — RigidBody, Collision, Physics materials
- **godot-4**: Godot Animation — AnimationPlayer, State machines
- **godot-5**: Godot UI — Control nodes, Theme, Input handling
- **godot-6**: Godot Performance — Object pooling, draw calls, profiling
- **godot-7**: Godot Multiplayer — High-level multiplayer API, RPCs, synchronization
- **godot-8**: Godot Production — Export, optimization, asset management

## Implementation Steps

### Phase 1: Type System & Structure (High Priority)
1. Update `Block` interface to use `id: string`
2. Create directory structure for split files
3. Split each existing file into beginner/intermediate/advanced
4. Update `content.ts` to import from new file locations

### Phase 2: ID Migration (High Priority)
1. Update all block IDs to string format
2. Update all prerequisite references
3. Verify no broken references

### Phase 3: Reorder (Medium Priority)
1. Reorder imports in `content.ts`
2. Update TopicKey union if needed

### Phase 4: New Content (Future)
1. Create golang content files with planned structure
2. Create godot content files with planned structure
3. Add to TOPIC_CONTENT map

## Questions for User

1. **Should I split files by level (beginner/intermediate/advanced) or keep them as-is?** This will create ~50 small files vs keeping ~18 large files. The benefit is easier maintenance, but the cost is more files to manage.

2. **For prerequisite references, should I use string-based references (e.g., "java-1") or keep numeric IDs?** String references are more discoverable but require updating all prereq arrays.

3. **For the Golang and Godot content, do you have specific focus areas or topics in mind?** The above is a general outline - please indicate if you want different emphasis.

4. **Should the "grill" text be part of the data files or extracted to separate template files?** Currently it's embedded in each block.

5. **Any preference on file naming convention?** Options:
   - `java_beginner.ts` / `spring_intermediate.ts`
   - `java-beginner.ts` / `spring-intermediate.ts`
   - `java/beginner.ts` / `spring/intermediate.ts` (subdirectories)