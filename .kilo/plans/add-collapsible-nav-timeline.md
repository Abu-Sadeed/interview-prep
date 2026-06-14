# Collapsible Sidebar + Mobile Navigation

## Goal
- Animated sidebar collapse/expand toggle
- Mobile responsive with hamburger menu overlay

## Changes

### `src/App.tsx`
- Lift sidebar collapse state into `Layout`
- Pass props: `collapsed`, `onToggle`, `visible` (mobile only)
- Add overlay for mobile open state

### `src/components/layout/Header.tsx`
- Add hamburger button (mobile only)
- Forward toggle to parent

### `src/components/layout/Sidebar.tsx`
- Accept collapsed state + toggle callback
- Wrap content in animated container
- Hide on mobile when overlay not visible

### `src/styles/layout.css`
- Add sidebar width transition, collapsed width
- Hamburger button styles, overlay (mobile)
- Mobile breakpoint 768px

### `src/styles/dark.css`
- Dark mode for hamburger and overlay
