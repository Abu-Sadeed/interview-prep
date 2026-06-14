# Remove "Add Content" Editor Feature

## Changes

1. **Delete `src/pages/Editor.tsx`** — remove the content editor page entirely.
2. **Update `src/router.tsx`** — remove the `Editor` import and the `/editor/new` route.
3. **Update `src/components/layout/Header.tsx`** — remove the "+ Add Content" button/link.
4. **Update `src/styles/app.css`** — remove editor-specific styles only: `.editor-layout` (~1587), `.editor-title` (~1602), `.editor-subtitle` (~1609), and `.dark .editor-title` (~431). **Keep `.editor-panel`** — it is used by `StudyStrategy.tsx` and `BlockDetail.tsx` so its CSS should remain.
