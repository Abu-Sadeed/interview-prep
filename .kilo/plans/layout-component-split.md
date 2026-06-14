# Layout Component Refactor Plan

## Goal
Refactor `src/components/layout/` so layout-related React components are split into readable, single-component files while preserving current behavior.

## Scope
- Refactor `Header.tsx`, `Sidebar.tsx`, and `ThemeToggle.tsx`.
- Keep existing styling class names, routing behavior, progress display, theme toggle behavior, search/filter behavior, and navigation state intact.
- Remove debug `console.log` statements during the refactor.
- Do not change data, hooks, utilities, or CSS unless required for TypeScript compatibility.

## Proposed Component Split

### Keep
- `Header.tsx`
  - Export `Header`.
  - Keep existing props: `completed`, `total`, `percent`.
- `ThemeToggle.tsx`
  - Export `ThemeToggle`.
  - Keep using `useDarkMode`.

### Split from `Sidebar.tsx`
- `Sidebar.tsx`
  - Becomes the container/orchestrator only.
  - Owns `useLocation`, `useProgress`, `query`, and `activeFreq` state.
  - Uses `useMemo` for grouped phases, filtered phases, and visible count.
  - Renders search input, filter bar, filter count, and phase groups.
- `SidebarSearch.tsx`
  - Single component for the search input.
  - Props: `value`, `onChange`, `placeholder`.
- `FilterBar.tsx`
  - Single component for the frequency filter buttons.
  - Props: `activeFreq`, `onChange`.
  - Renders the existing `filters` array and button UI.
- `FilterButton.tsx`
  - Single component for one filter button.
  - Props: `filter`, `isActive`, `onClick`.
  - Contains the existing label/dot rendering and active class mapping.
- `FilterCount.tsx`
  - Single component for the “N block(s) shown” count.
  - Props: `visibleCount`.
- `PhaseGroup.tsx`
  - Single component for one phase section.
  - Props: `phase`, `blocks`, `done`, `activePath`.
  - Keeps existing nav link rendering, done state, active path logic, and frequency class usage.

## Implementation Steps
1. Create the new component files under `src/components/layout/`.
2. Move the relevant JSX and props from `Sidebar.tsx` into those files.
3. Update `Sidebar.tsx` imports and render tree to use the new components.
4. Remove debug logging from `Sidebar.tsx`, `FilterBar.tsx`, and `PhaseGroup.tsx`.
5. Check TypeScript imports for relative paths and type correctness.
6. Run the project build script: `npm run build`.

## Validation
- `npm run build` should pass.
- Manual verification should confirm:
  - Search still filters block titles and subtitles.
  - Frequency filters still work.
  - Active nav link still highlights the current route.
  - Completed blocks still show the done styling.
  - Header progress and theme toggle remain unchanged.
