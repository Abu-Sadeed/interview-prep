# Add Collapsible Phase Dropdowns in Sidebar

## Status: ✓ Complete

## Goal
Make each phase group in the sidebar a collapsible dropdown so users can expand/collapse the list of blocks under each phase header.

## Implementation

### `src/components/layout/PhaseGroup.tsx`
- Added local `useState(true)` for expanded state (default: expanded)
- Wrapped `phase-label` in a `<button>` with chevron indicator
- Added `aria-label` and `aria-expanded` for accessibility
- Block links conditionally rendered: `{expanded && blocks.map(...)}`

### `src/styles/layout.css`
- Added `.phase-header` with flex layout, cursor pointer, and hover states
- Added `.phase-chevron` with 150ms transform transition
- Added `.phase-chevron.expanded { transform: rotate(180deg); }`
- Added `.app-sidebar.collapsed .phase-header` to hide in collapsed sidebar

### `src/styles/dark.css`
- Added dark mode hover styles for `.phase-header` and `.phase-chevron`

## Validation
- Build verified: `npm run build` ✓
- Test manually: clicking phase header toggles block visibility with chevron rotation