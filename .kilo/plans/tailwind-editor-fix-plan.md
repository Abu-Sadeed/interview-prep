# Interview Prep Project Refactor — Plain CSS Migration Plan

## Goal
Remove Tailwind CSS entirely and migrate to plain CSS, ensuring the dark/light theme toggle is visible and the content editor is discoverable from the app UI.

## Current State
Tailwind v4 is currently active:
- `src/styles/content.css` uses `@import "tailwindcss"`, `@theme` for custom colors, and `@custom-variant dark`
- All components use Tailwind utility classes (`flex`, `grid`, `px-4`, `text-text`, `dark:bg-slate-900`, etc.)
- `src/utils/classes.ts` returns raw Tailwind class strings for `freqClass` and `chipClass`
- Dark mode is toggled via `useDarkMode` adding `.dark` class to `<html>`
- `tailwind.config.js` defines the custom color palette
- `postcss.config.js` uses `@tailwindcss/postcss` plugin

## Migration Strategy

### 1. Plain CSS Architecture
Create a new `src/styles/app.css` with:
- CSS custom properties for all colors (matching current Tailwind palette)
- Component-level semantic class names (`.header`, `.sidebar`, `.card`, `.btn-primary`, `.tag`, etc.)
- `.dark` class on `<html>` → dark-mode variable overrides
- Import Google Fonts (Inter, JetBrains Mono)

### 2. Rewrite `src/utils/classes.ts`
Replace Tailwind class string generation with plain CSS class names:
- `freqClass()` → returns `.tag-high`, `.tag-medium`, `.tag-low`
- `chipClass()` → returns `.chip-java`, `.chip-spring`, etc.

### 3. Component Migration (replace all Tailwind classes)
Each component gets semantic CSS classes:

| File | Key classes to replace |
|------|----------------------|
| `src/App.tsx` | `min-h-screen`, `bg-bg`, `text-text`, `grid-cols-[272px_minmax(0,1fr)]` → `.app`, `.app-layout` |
| `src/components/Header.tsx` | `sticky`, `h-13`, `border-border`, progress bar → `.app-header`, `.progress-track`, `.progress-fill` |
| `src/components/Sidebar.tsx` | `h-[calc(100vh-3.25rem)]`, filters, nav links → `.app-sidebar`, `.filter-btn`, `.nav-link` |
| `src/components/ThemeToggle.tsx` | theme button → `.btn` |
| `src/components/Overview.tsx` | `grid-cols-4`, cards → `.stats-grid`, `.card`, `.frequency-card` |
| `src/components/BlockDetail.tsx` | tier accordion, grill section, action buttons → `.tier-panel`, `.grill-section`, `.btn-primary` |
| `src/pages/Editor.tsx` | form grid, inputs, preview → `.editor-layout`, `.form-group`, `.input`, `.json-preview` |
| `src/components/RichHtml.tsx` | no classes from JS, uses `.rich-html` in CSS |

### 4. Remove Tailwind Files & Dependencies
- Delete `tailwind.config.js`
- Delete `postcss.config.js`
- Remove `tailwindcss` and `@tailwindcss/postcss` from `package.json` devDependencies
- Remove `autoprefixer` (no longer needed for plain CSS)

### 5. Update Styles
- Replace `src/styles/content.css` with plain `src/styles/app.css`
- Remove `@import "tailwindcss"`, `@theme`, `@tailwind base/components/utilities`
- Keep scrollbar styles and `.rich-html` styles
- Add all new component styles

### 6. Light Mode Overrides
Since the current Tailwind config only defines dark-mode palette, the light theme uses browser defaults. Need to verify what light mode should look like before finalizing the CSS variables.

## Implementation Order
1. Create `src/styles/app.css` with CSS custom properties and all component styles
2. Rewrite `src/utils/classes.ts` to return plain CSS class names
3. Update all 8 `.tsx` component files with semantic CSS classes
4. Delete `tailwind.config.js` and `postcss.config.js`
5. Update `package.json` to remove Tailwind dependencies
6. Verify `npm run build` passes
7. Verify dark/light toggle, editor navigation, progress, tier accordion all work

## Open Question
**Light mode color palette**: The Tailwind config only extends the dark palette (`bg: '#090c10'`, `text: '#dde4f0'`, etc.). These are dark theme values. For light mode, what should the background/text/border colors be? Current `content.css` has some light scrollbar colors (`#f4f7fb`, `#c7d2e3`). 

Options:
- A) Use Tailwind slate defaults for light (gray-50 background, gray-900 text) — needs confirmation
- B) Define custom light palette in CSS custom properties — need color values from user

This needs clarification before step 1 is implemented, as it affects all CSS variable definitions.