# Split `src/styles/app.css` Into Focused Files

## Problem
- `src/styles/app.css` is 1796 lines, making it hard to navigate and maintain
- No logical grouping: layout, overview, block detail, editor, and dark mode styles are all interleaved

## Solution
Split into 7 files by **concern**, with `app.css` as a single import entry point.

---

## New File Structure

```
src/styles/
├── app.css          (entry point — imports all others)
├── variables.css    (CSS custom properties + reset + base)
├── layout.css       (header, sidebar, navigation, filters, scrollbar)
├── overview.css     (overview page: stats, cards, chips, tags, sidebar nav)
├── block.css        (block detail: tiers, grill prompt, nav buttons, done button)
├── editor.css       (editor panel, forms, JSON preview, rich html)
└── dark.css         (all .dark-mode overrides)
```

---

## What Goes Where

### `app.css` (~5 lines)
```css
@import './variables.css';
@import './layout.css';
@import './overview.css';
@import './block.css';
@import './editor.css';
@import './dark.css';
```

### `variables.css` (~40 lines)
- Font import
- `:root` custom properties (colors)
- `.dark` custom properties (colors)
- `* { box-sizing }`
- `html { scroll-behavior }`
- `body` reset
- Scrollbar styles

### `layout.css` (~180 lines)
- `.app-header`, `.app-header-brand`, `.app-header-brand-muted`
- `.progress-track`, `.progress-fill`
- `.app-header-text`
- `.app-sidebar`, `.app-sidebar-header`, `.app-search`
- `.filter-bar`
- `.filter-btn`, `.filter-dot-*`
- `.app-layout`, `.app`
- `.main-content`
- `.app-btn`
- General hover states for these

### `overview.css` (~250 lines)
- `.stat-card`, `.stat-card-value`, `.stat-card-label`
- `.card`, `.card:hover`, `.card-title`, `.card-meta`
- `.chip` + all chip variants (`chip-java`, `chip-spring`, etc.)
- `.tag` + all tag variants (`tag-high`, `tag-medium`, `tag-low`)
- `.nav`, `.nav-link`, `.nav-link-active`, `.nav-link-done`, `.nav-link-id`
- `.nav-link-title`, `.nav-link-freq`, `.nav-link-dot-*`
- `.phase-group`, `.phase-label`
- `.filter-btn-active-*`, `.filter-count`
- `.tone-red`, `.tone-amber`, `.tone-slate`

### `block.css` (~220 lines)
- `.block-detail-container`, `.block-detail-header-row`
- `.block-detail-title`, `.block-detail-subtitle`
- `.prereq-link`, `.prereq-link:hover`
- `.tier-panel`, `.tier-t1`/`t2`/`t3` (without .dark)
- `.tier-hdr`, `.tier-header`, `.tier-left`, `.tier-badge`
- `.tier-*`.badge color variants for T1/T2/T3 (without .dark)
- `.tier-label`, `.tier-title`, `.tier-meta`
- `.tier-chevron`, `.tier-chevron-open`
- `.tier-body`, `.tier-section`, `.tier-section:last-child`
- `.tier-section-heading`
- `.tier-list`, `ul.tier-list`, `ul.tier-list > .rich-html`
- `.tier-traps`, `.tier-traps-title`, `.tier-traps-list`
- `.tier-checkpoint`, `.tier-checkpoint-title`, `.tier-checkpoint-list`
- `.tier-checkpoint-hint`
- `.grill-section`, `.grill-header`, `.grill-title`, `.grill-subtitle`
- `.grill-tabs`, `.grill-tab`, `.grill-tab-active`
- `.grill-body`, `.grill-prompt`, `.grill-copy-btn`, `.grill-copy-btn-success`
- `.grill-footer`
- `.done-btn`, `.done-btn-done`
- `.nav-buttons`, `.nav-btn`, `.nav-btn-next`

### `editor.css` (~130 lines)
- `.editor-panel` (used by `StudyStrategy.tsx` and `BlockDetail.tsx`)
- `.editor-layout` (currently unused by components, retained)
- `.form-group`, `.form-group label`
- `.form-input`, `.form-input:focus`, `textarea.form-input`
- `.form-actions`
- `.form-btn`, `.form-btn-primary`, `.form-btn-success`, `.form-btn-ghost`
- `.form-errors`
- `.json-preview`, `.json-preview-label`, `.json-preview-hint`
- `.json-preview-hint code`
- `.rich-html` and children (`b`, `code`, `li`, `li::before`)

### `dark.css` (~200 lines)
- All existing `.dark` prefixed rules from current `app.css`
- Grouped logically but since selectors target many components,
  keep flat under `.dark` class for simplicity

---

## Implementation Steps

1. **Create** `src/styles/variables.css` with custom properties, reset, scrollbar
2. **Create** `src/styles/layout.css` with header/sidebar/app/filter/nav styles
3. **Create** `src/styles/overview.css` with stats/cards/chips/tags/nav-link styles
4. **Create** `src/styles/block.css` with tier/grill/done/nav-btn styles
5. **Create** `src/styles/editor.css` with editor/form/json-preview/rich-html styles
6. **Create** `src/styles/dark.css` with all `.dark` overrides
7. **Create** `src/styles/app.css` as the entry point that imports all files
8. **Verify** — run `npm run dev` and smoke-test every page (overview, block detail, dark mode toggle)

---

## What Stays The Same
- `src/main.tsx` still imports `./styles/app.css`
- No component JSX changes needed
- No JavaScript/TypeScript changes needed
- All class names remain identical

---

## Notes
- `!important` rules in `.grill-copy-btn-success` (dark variants) and `.grill-copy-btn-success` (light) stay as-is — they are intentional overrides for copy-feedback state
- Tailwind v4 is in `devDependencies` but not actively used in this codebase; no changes to its config needed
