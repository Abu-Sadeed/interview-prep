# Fix Sidebar Frequency Filter

## Goal
Make the side navigation frequency filter actually hide/show block links based on the selected frequency while preserving search filtering and phase grouping.

## Root Cause
`src/components/layout/Sidebar.tsx` computes `visibleCount` from `ALL_BLOCKS` using `activeFreq`, but the rendered phase groups still receive unfiltered `blocks` from `phases`:

- `visibleCount` is calculated correctly at `src/components/layout/Sidebar.tsx:20`.
- `PhaseGroup` receives `blocks={blocks}` at `src/components/layout/Sidebar.tsx:88`, where `blocks` comes from `groupBlocksByPhase(ALL_BLOCKS)`.
- No frequency predicate is applied before rendering links.

## Proposed Fix
1. Add a reusable filtering predicate in `Sidebar`:
   - Match search against `block.title`, ideally also `block.subtitle` if available.
   - Match frequency when `activeFreq !== 'all'`.
2. Use the predicate to compute:
   - `visibleCount`
   - filtered phase groups passed to `PhaseGroup`
3. Keep empty phase groups hidden so the sidebar only shows phases with matching blocks.
4. Pass filtered blocks to `PhaseGroup`:
   - `blocks={blocks.filter(matchesFilter)}`
5. Preserve existing active/done styling and frequency labels.

## Validation
- Run the app and verify:
  - `All` shows all blocks.
  - `High`, `Med`, and `Low` show only matching frequency links.
  - Search still filters by text.
  - Search + frequency filter combine correctly.
  - Empty phases are not displayed.
- Run available project checks if configured:
  - `npm run build`
  - any existing lint/typecheck script from `package.json` if present.
