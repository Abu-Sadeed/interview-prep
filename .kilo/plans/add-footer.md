# Add Footer to Application

## Overview
Add a footer component visible on all pages with trademark, copyright, and contact information.

## Implementation Plan

### 1. Create Footer Component (`src/components/layout/Footer.tsx`)
- Create a new functional component with the following content:
  - Copyright notice: "© 2026 SeniorPrep. All rights reserved."
  - Contact email: `sadeedabu99@gmail.com`
  - Phone/WhatsApp: `+8801833184115` (marked as WhatsApp)
  - Location: `Dhaka, Bangladesh`
  - LinkedIn link: `https://www.linkedin.com/in/abusadeed/`

### 2. Add Footer Styles (`src/styles/layout.css`)
- Add styles for `.app-footer` class:
  - Fixed position at bottom or use flex layout push
  - Background and border styling consistent with header
  - Font styling matching the app's monospace aesthetic
  - Responsive design for mobile

### 3. Integrate Footer in App.tsx
- Import and render the Footer component inside `.app-layout` after the `.app` div
- Ensure footer pushes to bottom using flex layout

## Files to Modify
1. `src/components/layout/Footer.tsx` (create)
2. `src/styles/layout.css` (add footer styles)
3. `src/App.tsx` (integrate footer)

## Footer Content
```
© 2026 SeniorPrep. All rights reserved.
📧 sadeedabu99@gmail.com | 📱 +8801833184115 (WhatsApp) | 📍 Dhaka, Bangladesh
🔗 LinkedIn: https://www.linkedin.com/in/abusadeed/
```