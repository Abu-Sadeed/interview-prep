# Interview Prep Project Refactor — Improvement Branch Plan

## Overview
Transform the vanilla JS/HTML/CSS project to TypeScript + React + Vite with Tailwind CSS, restructure data files by topic, and add content editing capabilities.

## Current State
- Single `index.html` with embedded JS and CSS
- 4 data files: `data-part1.js`, `data-part2.js`, `data-part3.js`, `data-part4.js`
- Vanilla JavaScript with manual DOM manipulation
- Custom CSS with CSS variables for dark theme
- Data format: Array of block objects with tiers containing sections, traps, checkpoints

## Target Architecture

### 1. Project Structure
```
/src
  /components          # Reusable React components
  /pages              # Route pages (Overview, BlockDetail, Editor)
  /data               # TypeScript content files by topic
    java_content.ts
    spring_content.ts
    database_content.ts
    messaging_content.ts
    api_content.ts
    infra_content.ts
    frontend_content.ts
    arch_content.ts
    behavior_content.ts
  /types              # TypeScript interfaces
  /utils              # Helper functions (validation, storage)
  /hooks              # Custom React hooks
  App.tsx
  main.tsx
  router.tsx
/public               # Static assets
plan-progress.json    # Offset tracking for resumable work
```

### 2. Data Restructuring
- Extract each block by phase/topic into dedicated TypeScript files
- Export arrays of `Block` type
- Create a registry that merges all content files
- File naming: `{topic}_content.ts` (e.g., `java_content.ts`, `spring_content.ts`)

### 3. Content Type Definition
```typescript
interface Section {
  heading: string;
  items: string[];
}

interface Tier {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  sections: Section[];
  traps: string[];
  checkpoint: string[];
}

interface Block {
  id: number;
  phase: string;
  chip: string;
  freq: 'high' | 'med' | 'low';
  title: string;
  subtitle: string;
  prereqs: number[];
  tiers: Tier[];
  grill: string;
}
```

### 4. Routes
- `/` - Overview page (dashboard)
- `/block/:id` - Block detail view
- `/editor/new` - Content editor for adding new blocks

### 5. Features to Implement

#### Dark/Light Mode Toggle
- Use `useDarkMode` hook to persist preference in localStorage
- Tailwind `dark:` variants for conditional styling
- Toggle button in header

#### Content Editor Page
- Dropdown to select topic (phase/chip)
- Form fields for block data entry
- JSON preview of entered data
- Validation against Block schema
- Direct file export capability (downloads updated content TS file)

#### Progress Tracking
- `plan-progress.json` to track which files have been migrated
- Git branch `improvement` for all changes

## Implementation Steps

### Step 1: Initialize Vite + React + TypeScript project
- Create `package.json` with dependencies:
  - vite, react, react-dom, react-router-dom
  - tailwindcss, postcss, autoprefixer
  - @types/react, @types/react-dom
- Configure `vite.config.ts`
- Configure `tailwind.config.js`

### Step 2: Create TypeScript types
- Define `Block`, `Tier`, `Section` interfaces in `/src/types/content.ts`

### Step 3: Migrate data files (chunk by chunk)
**Progress Tracking File:** `plan-progress.json`
```json
{
  "branchCreated": false,
  "dataMigration": {
    "java": { "file": "data-part1.js", "blocks": [1-8], "migrated": false },
    "spring": { "file": "data-part1.js", "blocks": [9-13], "migrated": false },
    "spring_advanced": { "file": "data-part2.js", "blocks": [14-19], "migrated": false },
    "database": { "file": "data-part2.js", "blocks": [20-25], "migrated": false },
    "messaging": { "file": "data-part2.js", "blocks": [26-27], "migrated": false },
    "api": { "file": "data-part3.js", "blocks": [28-30], "migrated": false },
    "infra": { "file": "data-part3.js", "blocks": [31-32], "migrated": false },
    "frontend": { "file": "data-part3.js", "blocks": [33-35], "migrated": false },
    "arch": { "file": "data-part3.js", "blocks": [36-39], "migrated": false },
    "jsbackend": { "file": "data-part4.js", "blocks": [40-43], "migrated": false },
    "frontend2": { "file": "data-part4.js", "blocks": [44-48], "migrated": false },
    "testing": { "file": "data-part4.js", "blocks": [49], "migrated": false },
    "devops": { "file": "data-part4.js", "blocks": [50-57], "migrated": false },
    "behavioral": { "file": "data-part4.js", "blocks": [58], "migrated": false },
    "systemdesign_fe": { "file": "data-part4.js", "blocks": [59], "migrated": false },
    "typescript": { "file": "data-part4.js", "blocks": [64], "migrated": false }
  },
  "componentsCreated": {
    "Header": false,
    "Sidebar": false,
    "Overview": false,
    "BlockDetail": false,
    "Editor": false,
    "ThemeToggle": false
  }
}
```

### Step 4: Create React components
- `Header.tsx` - App header with theme toggle and progress
- `Sidebar.tsx` - Navigation with search and filters
- `Overview.tsx` - Dashboard with stats and phase cards
- `BlockDetail.tsx` - Block view with tiers, grill prompt
- `Editor.tsx` - Content editor with validation

### Step 5: Implement dark/light mode
- Tailwind CSS configuration for dark mode
- Theme context/provider
- Toggle component in header

### Step 6: Build Editor with Validation
- Topic dropdown (populated from available phases)
- Dynamic form based on Block schema
- JSON schema validation using Zod or custom validator
- Preview and download generated content file

## Data File Mapping (by phase)

| Phase | Chip | Source File | Block IDs | Target File |
|-------|------|-------------|-----------|-------------|
| Java Fundamentals | java | data-part1.js | 1-8 | java_content.ts |
| Spring Ecosystem | spring | data-part1.js | 9-13 | spring_content.ts |
| Spring Ecosystem | spring | data-part2.js | 14-19 | spring_content.ts |
| Database & Cache | db | data-part2.js | 20-25 | database_content.ts |
| Messaging | messaging | data-part2.js | 26-27 | messaging_content.ts |
| API + HTTP + Security | api | data-part3.js | 28-30 | api_content.ts |
| Infrastructure & Tooling | infra | data-part3.js | 31-32 | infra_content.ts |
| Frontend | frontend | data-part3.js | 33-35 | frontend_content.ts |
| Architecture | arch | data-part3.js | 36-39 | arch_content.ts |
| JS Backend (NestJS) | nestjs | data-part4.js | 40-43 | jsbackend_content.ts |
| Testing | testing | data-part4.js | 49 | testing_content.ts |
| DevOps | infra | data-part4.js | 50-57 | devops_content.ts |
| Behavioral | arch | data-part4.js | 58 | behavioral_content.ts |
| System Design FE | arch | data-part4.js | 59 | systemdesign_content.ts |

## Progress Tracking File

**File:** `plan-progress.json`

1. **Tailwind CSS**: Use utility classes instead of custom CSS variables
2. **LocalStorage**: Persist done blocks, theme preference, editor state
3. **No Database**: Content edits download as TS files for manual merging
4. **Validation**: Use Zod schema validation for editor data
5. **React Router v6**: For SPA routing between overview and block views

## Questions for User
1. For the editor, should new content be appended to existing files or create new topic files?

## Implementation Order

1. Create `improvement` branch
2. Initialize Vite + React + TypeScript + Tailwind project
3. Create TypeScript type definitions
4. Migrate data files one by one (start with java_content.ts as prototype)
5. Build components: Header → Sidebar → Overview → BlockDetail
6. Add React Router for navigation
7. Implement dark/light mode toggle
8. Build Editor page with validation
9. Test and validate all features

## Progress Tracking (to be maintained during implementation)

| Topic | Source File(s) | Block IDs | Target File | Status | Notes |
|-------|----------------|-----------|-------------|--------|-------|
| java | data-part1.js | 1-8 | java_content.ts | NOT STARTED | 8 blocks |
| spring | data-part1.js, data-part2.js | 9-19 | spring_content.ts | NOT STARTED | 5 + 6 blocks |
| database | data-part2.js | 20-25 | database_content.ts | NOT STARTED | 6 blocks |
| messaging | data-part2.js | 26-27 | messaging_content.ts | NOT STARTED | 2 blocks |
| api | data-part3.js | 28-30 | api_content.ts | NOT STARTED | 3 blocks |
| infra | data-part3.js | 31-32 | infra_content.ts | NOT STARTED | 2 blocks |
| frontend | data-part3.js, data-part4.js | 33-35, 44-48 | frontend_content.ts | NOT STARTED | 3 + 5 blocks |
| arch | data-part3.js, data-part4.js | 36-39, 59 | arch_content.ts | NOT STARTED | 4 + 1 blocks (from diff files) |
| jsbackend | data-part4.js | 40-43, 60-61 | jsbackend_content.ts | NOT STARTED | 4 + 2 blocks |
| testing | data-part4.js | 49 | testing_content.ts | NOT STARTED | 1 block |
| devops | data-part4.js | 50-57 | devops_content.ts | NOT STARTED | 8 blocks |
| behavioral | data-part4.js | 58 | behavioral_content.ts | NOT STARTED | 1 block |
| typescript | data-part4.js | 64 | typescript_content.ts | NOT STARTED | 1 block |