import type { Block } from '../types/content';

export const frontendContent: Block[] = [
  {
    "id": 33,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "React Essentials",
    "subtitle": "Hooks deep dive, state management, performance optimization, testing",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "45 min",
        "sections": [
          {
            "heading": "Hooks Fundamentals",
            "items": [
              "<b>useState:</b> triggers re-render on state change. Lazy init: useState(() => expensiveOp()).",
              "<b>useEffect:</b> runs after render. Dependency array controls when. Empty array = componentDidMount + componentWillUnmount.",
              "<b>useRef:</b> persistent mutable value across renders. DOM access via ref={myRef}. Does NOT trigger re-render.",
              "<b>useCallback:</b> memoize function between renders. Prevents unnecessary re-renders of child components.",
              "<b>useMemo:</b> expensive computation memoization. Only re-computes when deps change. Returns value, not function."
            ]
          },
          {
            "heading": "Custom Hooks",
            "items": [
              "<b>Extract logic:</b> share stateful logic between components. Prefix with 'use'.",
              "<b>Lifecycle abstraction:</b> useWindowSize, useLocalStorage, useApi.",
              "<b>Rules of Hooks:</b> only call in React components or custom hooks. Only at top level (no loops/guard clauses)."
            ]
          }
        ],
        "traps": [
          "Calling hooks conditionally breaks the rules — always at top level",
          "Missing dependencies in useEffect causes stale closures — use ESLint plugin",
          "Object/array dependencies in useEffect cause infinite loops — memoize deps or use ref pattern"
        ],
        "checkpoint": [
          "Why does my effect run twice in development? What are strategies to fix it?",
          "Explain the difference between useEffect and useLayoutEffect. When do you use each?",
          "How do you share state between components without lifting state up?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "50 min",
        "sections": [
          {
            "heading": "Performance Patterns",
            "items": [
              "<b>Memoization:</b> React.memo for component, useMemo/useCallback for values/functions.",
              "<b>Virtualization:</b> react-window, react-virtualized for long lists. Only render visible items.",
              "<b>Code splitting:</b> React.lazy + Suspense for route-level splitting. Dynamic imports for component-level.",
              "<b>Error boundaries:</b> catch render errors. Use class component (no hooks for this yet). Log and fallback UI."
            ]
          },
          {
            "heading": "State Management",
            "items": [
              "<b>Lifting state up:</b> share state between parents and children. Single source of truth.",
              "<b>Context + useReducer:</b> state management without external library. useReducer for complex state logic.",
              "<b>Redux patterns:</b> selectors (reselect), action creators, thunk for async. Normalizr for nested data.",
              "<b>Zustand/Jotai:</b> minimal boilerplate alternatives. Hooks-based API."
            ]
          }
        ],
        "traps": [
          "Context causes re-renders of ALL consumers — split contexts by concern",
          "Redux useSelector shallow compares by default — memoize selectors with reselect",
          "async actions without thunk/saga cause dispatch to receive Promise — handle properly"
        ],
        "checkpoint": [
          "My app re-renders too often. How do I diagnose and fix it?",
          "When do you choose Redux vs Context vs Zustand?",
          "How do you handle derived state that depends on props?"
        ]
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: React Essentials (Block 33)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Hooks patterns, state management, performance debugging. 'Why does this component render twice?', 'how do you share state between unrelated components', 'debug this re-render issue'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 34,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "Next.js — Fullstack React Framework",
    "subtitle": "SSG/SSR/ISR/RSC patterns, App Router, middleware, optimization",
    "prereqs": [
      33
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Rendering Patterns",
            "items": [
              "<b>CSR (Client-Side Rendering):</b> traditional React. JS bundle downloads, then hydrates. Fast dev, slower first paint.",
              "<b>SSG (Static Site Generation):</b> pre-render at build time. getStaticProps. Fast first paint, less up-to-date.",
              "<b>SSR (Server-Side Rendering):</b> render on each request. getServerSideProps. Fresh data, slower response.",
              "<b>ISR (Incremental Static Regeneration):</b> SSG with periodic revalidation. revalidate: 60 in getStaticProps.",
              "<b>RSC (React Server Components):</b> render on server, stream to client. Zero bundle size for server code. No client interactivity."
            ]
          },
          {
            "heading": "App Router",
            "items": [
              "<b>file/system routing:</b> folder structure = routes. app/users/page.tsx = /users route.",
              "<b>layout.tsx:</b> shared UI for segment and children. Persistent across navigation.",
              "<b>loading.tsx:</b> loading UI while segment loads. Parallel routes for complex loading states.",
              "<b>error.tsx:</b> error boundary at route level. Catches errors from same segment.",
              "<b>server components by default:</b> no 'use client' needed until you need interactivity."
            ]
          }
        ],
        "traps": [
          "page.tsx becomes server component by default — add 'use client' for hooks/state",
          "layout.tsx wraps ALL children — performance impact on every navigation",
          "ISR only works with path-based static generation — not dynamic routes without fallback"
        ],
        "checkpoint": [
          "When do you choose SSG vs SSR vs ISR for a blog? What changes if it's user dashboard?",
          "How does Next.js decide whether to render server or client component?",
          "Explain the tradeoff between RSC and traditional client components?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Optimization",
            "items": [
              "<b>Image optimization:</b> next/image auto-sizes, lazy loads, serves WebP. fill for background images.",
              "<b>Font optimization:</b> next/font eliminates layout shift. Self-host Google Fonts.",
              "<b>Middleware:</b> intercept requests at edge. Rewrite, redirect, auth, geo-based routing.",
              "<b>Server actions:</b> form submissions without client JS. Progressive enhancement."
            ]
          },
          {
            "heading": "Advanced Patterns",
            "items": [
              "<b>Parallel routes:</b> slot-based routing. @modal for modal UI, @sidebar for persistent sidebar.",
              "<b>Catch-all routes:</b> [...slug].js for dynamic catch-all. Optional catch-all: [[...slug]].js.",
              "<b>Route handlers:</b> app/api/route.ts for API endpoints. GET, POST, etc as exported functions.",
              "<b>Middleware limitations:</b> no Node.js APIs, 1MB body size limit, runs on edge runtime."
            ]
          }
        ],
        "traps": [
          "Middleware runs on every request — keep it lightweight",
          "Server components can't use useState — needs 'use client'",
          "Large images in public/ are NOT optimized — use next/image for optimization"
        ],
        "checkpoint": [
          "My page takes 5 seconds to render. How do I optimize with Next.js features?",
          "How do you implement authentication check in middleware?",
          "Explain how SSR differs from RSC in terms of bundle size and initial load?"
        ]
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: Next.js Fullstack Framework (Block 34)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Rendering strategies, optimization, fullstack patterns. 'Why is SEO slow on my SPA?', 'optimize this image-heavy page', 'decide SSG vs SSR for this use case'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 35,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "React State Management — Redux Toolkit + External Stores",
    "subtitle": "Redux Toolkit, middleware, selectors, and external state stores",
    "prereqs": [
      33
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Redux Core",
            "items": [
              "<b>Single source of truth:</b> entire app state in one store object. Predictable state updates.",
              "<b>Actions are payloads:</b> { type: 'ADD_TODO', payload: {...} }. Describe what happened.",
              "<b>Reducers are pure functions:</b> (state, action) => newState. No side effects, same input same output.",
              "<b>Dispatch triggers updates:</b> store.dispatch(action). Synchronous state change.",
              "<b>Selectors read state:</b> useSelector(state => state.todos) or reselect for memoized selectors."
            ]
          },
          {
            "heading": "Redux Toolkit",
            "items": [
              "<b>createSlice:</b> generates action creators and reducer from one place. Immer makes mutations safe.",
              "<b>configureStore:</b> Redux store setup. Adds redux-thunk, redux-devtools by default.",
              "<b>createAsyncThunk:</b> async actions with pending/fulfilled/rejected lifecycle. No manual promise handling.",
              "<b>RTK Query:</b> data fetching and caching. Auto-generated hooks. Built-in cache invalidation."
            ]
          }
        ],
        "traps": [
          "Mutating state directly in reducer breaks time-travel debugging — use createSlice for safety",
          "Storing derived data causes consistency issues — selectors with reselect",
          "Dispatching in render causes infinite loops — useEffect or event handlers only"
        ],
        "checkpoint": [
          "How do you handle async API calls in Redux without RTK Query?",
          "What problem does Redux solve that Context API doesn't?",
          "Explain why slices make it easier to organize large Redux state?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Modern Alternatives",
            "items": [
              "<b>Zustand:</b> minimal boilerplate, hook-based API. No middleware needed. Good for simple state.",
              "<b>Jotai:</b> atoms are minimal state units. Composable, TypeScript-friendly. No provider wrapper.",
              "<b>React Query:</b> server state management. Caching, background refetch, pagination. Not for UI state.",
              "<b>Recoil:</b> atomic state, selector-based derived state. Facebook-backed but beta."
            ]
          },
          {
            "heading": "When to Use What",
            "items": [
              "<b>Redux:</b> large complex state, team familiarity, middleware needs (logger, persistence).",
              "<b>Zustand/Jotai:</b> small-medium state, preference for hooks, minimal boilerplate.",
              "<b>React Query:</b> async data fetching, caching, pagination, optimistic updates.",
              "<b>Context + useReducer:</b> state needed by few components, no persistence/serialization needed."
            ]
          }
        ],
        "traps": [
          "React Query is NOT for UI state — use for server data only",
          "Zustand selector subscription needs careful memoization",
          "Jotai atoms should be defined outside component to prevent re-creation"
        ],
        "checkpoint": [
          "My Redux store is getting huge. When do I split into multiple stores?",
          "When do you reach for React Query over Redux for data fetching?",
          "Compare Zustand and Redux for a simple todo app. Tradeoffs?"
        ]
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: React State Management (Block 35)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: State patterns, Redux vs alternatives, performance. 'App re-renders on every action', 'manage server state vs UI state', 'debug stale data issue'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 44,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "CSS — Box Model, Flexbox, Grid",
    "subtitle": "Box model, positioning, Flexbox mental model, Grid layout, responsive design, common patterns",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Box Model",
            "items": [
              "<b>Every element = content + padding + border + margin.</b> Box-sizing: content-box (default, width = content only). box-sizing: border-box (width includes padding + border — use this always).",
              "<b>Margin collapse:</b> vertical margins between adjacent blocks collapse to the larger of the two. Horizontal margins never collapse.",
              "<b>display values:</b> block (full width, new line), inline (content width, no top/bottom margin), inline-block (content width + accepts margin/padding), flex, grid, none.",
              "<b>position:</b> static (default, in flow), relative (offset from normal position, still in flow), absolute (removed from flow, positioned relative to nearest positioned ancestor), fixed (relative to viewport), sticky (hybrid)."
            ]
          },
          {
            "heading": "Flexbox",
            "items": [
              "<b>Flex container:</b> display:flex. Main axis (flex-direction) and cross axis.",
              "<b>justify-content:</b> alignment on main axis. flex-start, center, flex-end, space-between, space-around.",
              "<b>align-items:</b> alignment on cross axis. stretch (default), center, flex-start, flex-end, baseline.",
              "<b>flex property on child:</b> flex: grow shrink basis. flex:1 = flex:1 1 0 (grow, shrink equally, start from 0).",
              "<b>flex-wrap:</b> nowrap (default, overflow) or wrap (items wrap to next line)."
            ]
          }
        ],
        "traps": [
          "box-sizing: content-box by default — adding padding changes element size. Always reset to border-box.",
          "Margin collapse is vertical only — horizontal margins always add",
          "position:absolute removes element from flow — other elements ignore it"
        ],
        "checkpoint": [
          "What is box-sizing: border-box and why do most CSS resets include it?",
          "What is the difference between justify-content and align-items in Flexbox?",
          "I set margin-top:20px on two adjacent divs. What is the actual margin between them?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "CSS Grid",
            "items": [
              "<b>Grid = two-dimensional layout.</b> Flexbox = one-dimensional. Use Grid for page layout, Flexbox for component layout.",
              "<b>grid-template-columns:</b> repeat(3, 1fr) = 3 equal columns. repeat(auto-fill, minmax(200px, 1fr)) = responsive without media queries.",
              "<b>grid-column/row:</b> span items across multiple cells. grid-column: 1 / 3 (from line 1 to line 3 = 2 columns).",
              "<b>grid-template-areas:</b> named areas for semantic layout. Place items with grid-area: header."
            ]
          },
          {
            "heading": "Responsive Design",
            "items": [
              "<b>Mobile-first:</b> base styles for mobile, media queries add complexity for larger screens. @media (min-width: 768px) {}.",
              "<b>CSS custom properties (variables):</b> --color-primary: #4d9eff. var(--color-primary). Cascade and inherit. Change at :root for theming.",
              "<b>clamp():</b> clamp(min, preferred, max). clamp(1rem, 4vw, 2rem) — fluid typography without media queries.",
              "<b>Specificity order:</b> inline style > ID > class/pseudo-class/attribute > element. !important overrides all (avoid)."
            ]
          }
        ],
        "traps": [
          "Grid and Flexbox are not mutually exclusive — use Grid for outer layout, Flexbox for inner component alignment",
          "z-index only works on positioned elements (not static) — common source of layering bugs",
          "CSS specificity: class beats element, ID beats class. Two classes don't beat one ID"
        ],
        "checkpoint": [
          "When would you use CSS Grid vs Flexbox? Give a concrete layout example for each.",
          "What is CSS specificity? Which wins: two classes vs one ID?",
          "Implement a responsive 3-column card grid that collapses to 1 column on mobile without media queries."
        ]
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Performance + Modern CSS",
            "items": [
              "<b>Critical rendering path:</b> HTML parsing → DOM → CSS parsing → CSSOM → Render tree → Layout → Paint → Composite.",
              "<b>Reflow (layout):</b> changing width, height, position recalculates layout. Expensive. Batch DOM reads/writes.",
              "<b>Repaint:</b> changing color, background — no layout recalc. Cheaper than reflow.",
              "<b>GPU-accelerated properties:</b> transform, opacity, filter — run on compositor thread, no reflow/repaint. Animate these instead of left/top/width.",
              "<b>CSS containment:</b> contain: layout paint style — tells browser this element's internals don't affect outside. Performance isolation.",
              "<b>Container queries:</b> @container (min-width: 400px) {} — style based on parent container size, not viewport. Modern responsive design."
            ]
          }
        ],
        "traps": [
          "Animating left/top instead of transform causes reflow on every frame — use transform:translateX() instead",
          "will-change: transform creates a new stacking context and promotes to GPU — use sparingly, not on every element",
          "Container queries require contain: inline-size on the parent — often forgotten"
        ],
        "checkpoint": [
          "What is the difference between reflow and repaint? Which is more expensive and why?",
          "Why should you animate transform instead of left/top for smooth animations?",
          "What are container queries and how do they differ from media queries?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a frontend candidate.\n\nTOPIC: CSS — Box Model, Flexbox, Grid (Block 44)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix concept questions with layout design tasks. 'Implement this layout using CSS', 'why is your animation janky', 'what is wrong with this CSS specificity'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 45,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "Browser — Rendering Pipeline + Performance",
    "subtitle": "Critical rendering path, Web Vitals, lazy loading, code splitting, memory leaks, DevTools",
    "prereqs": [
      44
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Critical Rendering Path",
            "items": [
              "<b>Steps:</b> Download HTML → parse DOM → download + parse CSS → build CSSOM → combine DOM+CSSOM into Render Tree → Layout (calculate positions) → Paint (pixels) → Composite (layers).",
              "<b>Render-blocking resources:</b> CSS in &lt;head&gt; blocks rendering until parsed. JS in &lt;head&gt; without async/defer blocks HTML parsing.",
              "<b>async vs defer on scripts:</b> async = download in parallel, execute as soon as downloaded (order not guaranteed). defer = download in parallel, execute after HTML parsed (order preserved).",
              "<b>Preload, prefetch, preconnect:</b> &lt;link rel='preload'&gt; = fetch resource now, high priority. prefetch = fetch for next navigation. preconnect = establish connection early."
            ]
          }
        ],
        "traps": [
          "&lt;script&gt; without async or defer blocks HTML parsing — always add one for external scripts",
          "async scripts don't execute in order — for dependent scripts use defer",
          "Preloading too many resources competes with critical path resources"
        ],
        "checkpoint": [
          "What is the difference between async and defer on a script tag?",
          "What does 'render-blocking' mean? How do you eliminate render-blocking CSS?",
          "What is the Critical Rendering Path and which step is most expensive?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Core Web Vitals",
            "items": [
              "<b>LCP (Largest Contentful Paint):</b> time until largest content element rendered. Target &lt;2.5s. Affected by: slow server, render-blocking resources, slow images.",
              "<b>CLS (Cumulative Layout Shift):</b> visual stability. Elements moving unexpectedly. Target &lt;0.1. Fix: size attributes on images/video, avoid inserting content above fold.",
              "<b>INP (Interaction to Next Paint):</b> responsiveness to clicks/taps. Target &lt;200ms. Caused by: long JS tasks, heavy event handlers.",
              "<b>TTFB (Time to First Byte):</b> server response time. Not a Core Web Vital but foundational. Fix: CDN, server optimisation, caching."
            ]
          },
          {
            "heading": "Performance Optimisation",
            "items": [
              "<b>Lazy loading images:</b> &lt;img loading='lazy'&gt;. Native browser support. Images below fold load on scroll.",
              "<b>Code splitting:</b> dynamic import() creates separate chunks. Load only what current route needs. React.lazy() + Suspense for component-level splitting.",
              "<b>Bundle analysis:</b> webpack-bundle-analyzer, Vite rollup-plugin-visualizer. Find large dependencies.",
              "<b>Tree shaking:</b> dead code elimination. Requires ES modules (import/export). CommonJS (require) blocks tree shaking."
            ]
          }
        ],
        "traps": [
          "Images without explicit width/height cause CLS — browser doesn't know how much space to reserve",
          "Tree shaking requires ES modules — barrel files (index.js that re-exports everything) often defeat tree shaking",
          "Code splitting too aggressively creates waterfall of small requests — balance chunk size"
        ],
        "checkpoint": [
          "What are the three Core Web Vitals and what does each measure?",
          "My page has images that cause layout shift on load. What is causing this and how do you fix it?",
          "What is tree shaking? What prevents it from working?"
        ]
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Memory + DevTools",
            "items": [
              "<b>Memory leaks in browser:</b> detached DOM nodes (reference to removed element), event listeners not removed, closures capturing large objects, timers not cleared.",
              "<b>Chrome DevTools Performance tab:</b> record page activity. Identify long tasks (red marks), layout thrashing, scripting time vs rendering time.",
              "<b>Chrome DevTools Memory tab:</b> heap snapshot, allocation timeline. Find retained object count. Compare snapshots before/after action.",
              "<b>requestAnimationFrame:</b> for animations — synced with browser paint cycle (~60fps). Never setTimeout for animations.",
              "<b>Virtualization:</b> only render visible items (react-window, react-virtual). For 10K+ item lists — full render causes OOM and jank."
            ]
          }
        ],
        "traps": [
          "Detached DOM nodes are the most common browser memory leak — storing references to removed elements",
          "setTimeout for animations causes jank because it's not synced with paint cycle — use requestAnimationFrame",
          "Long tasks block main thread and hurt INP — break them up with setTimeout(fn,0) or scheduler.postTask()"
        ],
        "checkpoint": [
          "How do you find a memory leak in a browser application using DevTools?",
          "What is layout thrashing and how do you prevent it?",
          "I have a list of 50,000 items causing the page to freeze on render. What is the solution?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a frontend candidate.\n\nTOPIC: Browser Rendering + Performance (Block 45)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Performance diagnosis scenarios — 'your CLS score is 0.4, fix it', 'users report slow interactions on mobile', 'your bundle is 3MB'. Test tooling knowledge and decision-making.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 46,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "React — State Management",
    "subtitle": "Local state, global state, server state, and when each pattern wins",
    "prereqs": [
      35
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Local vs Global State",
            "items": [
              "<b>Local state (useState):</b> component-specific. Form inputs, toggle, modal open state. Default choice.",
              "<b>useReducer:</b> complex state logic with multiple sub-values, or next state depends on previous in complex ways. Same as useState but with Redux-like dispatch pattern.",
              "<b>Context API:</b> share state without prop drilling. NOT a performance solution — all consumers re-render on any context change. For infrequently changing values (theme, locale, auth user).",
              "<b>Context + memo:</b> split context (UserContext for user data, ThemeContext for theme). Memoize values with useMemo to reduce re-renders."
            ]
          }
        ],
        "traps": [
          "Context re-renders ALL consumers on every change — don't put frequently changing state in Context",
          "useReducer is not Redux — no middleware, no devtools, no global state",
          "Context API is for sharing state, not for managing complex state logic"
        ],
        "checkpoint": [
          "When would you use useReducer over useState?",
          "What is the performance problem with Context API and how do you mitigate it?",
          "When is Context the right tool and when is it not?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Redux Toolkit",
            "items": [
              "<b>Redux Toolkit (RTK):</b> official recommended Redux. createSlice generates actions + reducers. createAsyncThunk for async. configureStore wires it up.",
              "<b>Immer inside RTK:</b> write mutating logic in reducers — Immer converts to immutable updates. No more spread hell.",
              "<b>RTK Query:</b> data fetching + caching built into RTK. defineEndpoints, auto-generated hooks (useGetUsersQuery). Cache invalidation via tags.",
              "<b>When Redux:</b> large app with complex shared state, need time-travel debugging, multiple teams, strict predictability required."
            ]
          },
          {
            "heading": "Zustand + React Query",
            "items": [
              "<b>Zustand:</b> minimal, no boilerplate. create(set => ({count:0, inc:()=>set(s=>({count:s.count+1}))}). 1KB. No Provider needed.",
              "<b>When Zustand over Redux:</b> smaller apps, less boilerplate needed, team prefers simplicity, no need for RTK Query's caching.",
              "<b>React Query (TanStack Query):</b> server state management. Fetching, caching, background refetch, stale-while-revalidate, optimistic updates.",
              "<b>Server state vs client state:</b> server state (API data) = React Query. Client state (UI state, user preferences) = Zustand/Redux. Don't use Redux to store API responses — use React Query."
            ]
          }
        ],
        "traps": [
          "Storing server data in Redux and manually managing loading/error/refetch = reinventing React Query",
          "Zustand without Immer = must return new state object — easy to accidentally mutate",
          "React Query cache key must include all variables — missing a key variable = stale cache served"
        ],
        "checkpoint": [
          "When would you choose Zustand over Redux Toolkit? What are you giving up?",
          "What problem does React Query solve that Redux doesn't?",
          "I'm using Redux to store API response data and managing loading/error states manually. What's the better approach?"
        ]
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Performance + Architecture",
            "items": [
              "<b>React Query optimistic updates:</b> update cache immediately, revert on error. Best UX for mutations.",
              "<b>Jotai/Recoil (atomic state):</b> fine-grained reactivity — only components using specific atom re-render. Alternative to Context for granular shared state.",
              "<b>State colocation:</b> keep state as close to where it's used as possible. Lift state only when needed. Avoid premature global state.",
              "<b>Selector pattern (Redux/Zustand):</b> memoized derived state. useSelector with reselect. Prevents re-render when unrelated state changes."
            ]
          }
        ],
        "traps": [
          "Lifting all state to global store is an anti-pattern — start local, lift only when needed",
          "useSelector without memoized selector causes re-render on every store change — use reselect createSelector",
          "Optimistic update without rollback logic = UI shows wrong data on error"
        ],
        "checkpoint": [
          "What is state colocation and why is it important?",
          "Explain optimistic updates in React Query. What happens if the mutation fails?",
          "When would atomic state management (Jotai) be better than a global store?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a React frontend candidate.\n\nTOPIC: React State Management (Block 46)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Trade-off decisions ('which state management for this app'), performance diagnosis ('your app re-renders on every keystroke'), and architecture ('where should this state live').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 47,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "React — Testing + Accessibility",
    "subtitle": "React Testing Library, Vitest, a11y principles, ARIA, semantic HTML, keyboard navigation",
    "prereqs": [
      46
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "React Testing Library",
            "items": [
              "<b>RTL philosophy:</b> test behaviour not implementation. Query by what the user sees, not internal component details.",
              "<b>Queries priority:</b> getByRole (best — matches accessibility tree) → getByLabelText → getByPlaceholderText → getByText → getByTestId (last resort).",
              "<b>userEvent vs fireEvent:</b> userEvent simulates real user interactions (typing, clicking with all browser events). fireEvent is lower-level and less realistic.",
              "<b>screen:</b> use screen.getByRole() instead of component.getByRole(). Global queries, no need to destructure render result."
            ]
          },
          {
            "heading": "Accessibility Basics",
            "items": [
              "<b>Semantic HTML first:</b> &lt;button&gt; not &lt;div onClick&gt;. &lt;nav&gt;, &lt;main&gt;, &lt;header&gt;, &lt;article&gt;. Screen readers understand semantic elements.",
              "<b>ARIA (Accessible Rich Internet Applications):</b> roles, properties, states for non-semantic elements. Add only when semantic HTML insufficient.",
              "<b>aria-label:</b> text alternative for elements without visible label. aria-labelledby: points to existing element as label.",
              "<b>Keyboard navigation:</b> all interactive elements must be focusable and operable by keyboard. Tab order must be logical."
            ]
          }
        ],
        "traps": [
          "getByTestId is an anti-pattern — it tests implementation not user experience. Use getByRole first.",
          "Using ARIA on semantic elements incorrectly overrides native semantics — role='button' on &lt;button&gt; is redundant and can cause issues",
          "fireEvent.click does not trigger hover states or focus — use userEvent.click for realistic simulation"
        ],
        "checkpoint": [
          "What is the RTL query priority and why is getByRole preferred?",
          "What is the difference between userEvent.click and fireEvent.click?",
          "I have a custom dropdown built with divs. What do I need for it to be accessible?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Testing Async + Patterns",
            "items": [
              "<b>waitFor():</b> retries assertion until it passes or times out. For async state updates after user interaction.",
              "<b>MSW (Mock Service Worker):</b> intercepts HTTP requests at network level. Realistic mock without changing application code. Works in browser and Node.",
              "<b>Testing custom hooks:</b> renderHook() from RTL. Test the hook directly without a component wrapper.",
              "<b>act():</b> wraps code that causes React state updates. RTL wraps most interactions in act automatically — only needed for manual state updates."
            ]
          },
          {
            "heading": "Accessibility Testing",
            "items": [
              "<b>jest-axe:</b> automated accessibility testing. toHaveNoViolations(). Catches ~30% of a11y issues automatically.",
              "<b>Color contrast:</b> WCAG AA requires 4.5:1 for normal text, 3:1 for large text. Use Lighthouse or axe DevTools.",
              "<b>Focus management:</b> modal open → move focus inside. Modal close → return focus to trigger. Use useRef + .focus().",
              "<b>Reduced motion:</b> prefers-reduced-motion media query. Disable/reduce animations for users who configured this in OS."
            ]
          }
        ],
        "traps": [
          "waitFor with side effects (clicking inside waitFor) can cause flaky tests — only put assertions inside waitFor",
          "MSW not reset between tests causes test pollution — call server.resetHandlers() in afterEach",
          "jest-axe catches automated violations only — manual testing with keyboard and screen reader still required"
        ],
        "checkpoint": [
          "What is MSW and why is it better than mocking fetch/axios directly?",
          "How do you test focus management in a modal dialog?",
          "What does jest-axe test and what doesn't it test?"
        ]
      },
      {
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "Advanced Accessibility + Testing Strategy",
            "items": [
              "<b>WCAG levels:</b> A (minimum), AA (standard target), AAA (enhanced). Most organisations target AA.",
              "<b>Screen reader testing:</b> NVDA (Windows, free), JAWS (Windows, paid), VoiceOver (macOS/iOS built-in), TalkBack (Android). Test with real screen readers.",
              "<b>Live regions (aria-live):</b> announce dynamic content changes to screen readers. polite = waits for quiet. assertive = interrupts immediately.",
              "<b>Component testing vs E2E:</b> RTL covers component behaviour. Playwright/Cypress for critical user journeys. Don't duplicate."
            ]
          }
        ],
        "traps": [
          "aria-live='assertive' is disruptive — use 'polite' for most cases, 'assertive' only for errors or urgent alerts",
          "Automated a11y tests give false confidence — 70% of issues require manual testing",
          "Testing too many implementation details makes refactoring painful — test the contract not the internals"
        ],
        "checkpoint": [
          "What is the difference between WCAG A, AA, and AAA? Which should you target and why?",
          "When would you use aria-live? What is the difference between polite and assertive?",
          "How do you decide what to test with RTL vs Playwright?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a React frontend candidate.\n\nTOPIC: React Testing + Accessibility (Block 47)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix testing strategy ('how would you test this component'), a11y design ('make this modal accessible'), and tooling ('why MSW over mocking').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 48,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "React — Build Tools + Forms",
    "subtitle": "Vite vs Webpack, bundling concepts, React Hook Form, Zod validation, TypeScript in React",
    "prereqs": [
      35
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "25 min",
        "sections": [
          {
            "heading": "Build Tools",
            "items": [
              "<b>Vite:</b> dev server uses native ES modules (no bundling in dev = instant HMR). Production: Rollup. Default for new React projects.",
              "<b>Webpack:</b> bundles everything including in dev. Slower HMR. More configurable. Legacy but still dominant in enterprise.",
              "<b>HMR (Hot Module Replacement):</b> updates changed module without full page reload. Preserves state.",
              "<b>Environment variables:</b> .env files. Vite: VITE_ prefix. CRA: REACT_APP_ prefix. Never commit secrets — they are bundled into client JS."
            ]
          },
          {
            "heading": "React Hook Form",
            "items": [
              "<b>RHF philosophy:</b> uncontrolled inputs by default. No re-render on every keystroke. register() connects input to form.",
              "<b>handleSubmit:</b> wraps your submit handler, calls preventDefault, validates before calling your fn.",
              "<b>formState:</b> errors, isSubmitting, isDirty, isValid. Subscribe to only what you need.",
              "<b>Controller:</b> for controlled components (Select, DatePicker, custom inputs) that don't accept ref."
            ]
          }
        ],
        "traps": [
          "Environment variables are bundled into client JS — never put secrets in .env for frontend apps",
          "RHF Controller required for controlled third-party components — register() doesn't work for them",
          "Vite VITE_ prefix is required — variables without it are not exposed to client code"
        ],
        "checkpoint": [
          "Why is Vite faster than Webpack in development? What is the trade-off?",
          "What is the difference between controlled and uncontrolled inputs? Which does RHF use by default?",
          "I put my API key in VITE_API_KEY in a .env file. Is it safe?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Zod + Schema Validation",
            "items": [
              "<b>Zod:</b> TypeScript-first schema validation. Define schema, infer TypeScript type from it. No duplication.",
              "<code>const UserSchema = z.object({ name: z.string().min(2), email: z.string().email(), age: z.number().int().min(18) });</code>",
              "<b>Type inference:</b> <code>type User = z.infer&lt;typeof UserSchema&gt;</code> — TypeScript type derived from schema.",
              "<b>RHF + Zod:</b> zodResolver(@hookform/resolvers) connects Zod schema to RHF. Type-safe form values.",
              "<b>Server-side validation:</b> always validate on server too. Client validation is UX, server validation is security."
            ]
          },
          {
            "heading": "TypeScript in React",
            "items": [
              "<b>Component props:</b> interface Props {} then React.FC&lt;Props&gt; or (props: Props) =&gt; JSX.Element.",
              "<b>Event types:</b> React.ChangeEvent&lt;HTMLInputElement&gt;, React.MouseEvent&lt;HTMLButtonElement&gt;.",
              "<b>useState with type:</b> useState&lt;User | null&gt;(null) — generic when initial value doesn't reveal type.",
              "<b>useRef types:</b> useRef&lt;HTMLInputElement&gt;(null) — typed ref for DOM elements."
            ]
          }
        ],
        "traps": [
          "Zod .parse() throws on invalid data — use .safeParse() in try/catch or when you don't want exceptions",
          "Client-side validation is UX only — never trust it for security. Always validate server-side.",
          "React.FC adds implicit children prop (pre-React 18) — use (props: Props) => JSX.Element for explicit typing"
        ],
        "checkpoint": [
          "What is Zod and how does it eliminate TypeScript type duplication?",
          "I validate a form with Zod on the client. Do I still need server-side validation?",
          "How do you type an onChange handler for an HTML input in TypeScript?"
        ]
      },
      {
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "Advanced Build + Optimisation",
            "items": [
              "<b>Module federation (Webpack 5):</b> share code between separate bundled apps at runtime. Micro-frontend architecture.",
              "<b>Monorepo tooling:</b> Turborepo, Nx — shared code, build caching, task orchestration across packages.",
              "<b>Storybook:</b> develop and document components in isolation. Visual testing. Component library documentation.",
              "<b>Import aliases:</b> @/components/Button instead of ../../../components/Button. Configure in vite.config.ts and tsconfig.json paths.",
              "<b>Bundle size budget:</b> set size limits in bundler config. Fail CI when bundle exceeds budget. Prevents gradual bloat."
            ]
          }
        ],
        "traps": [
          "Module federation version mismatches between apps cause runtime errors — pin shared dependency versions",
          "Storybook and production app can diverge — keep stories close to component files, run visual regression tests",
          "Import aliases must be configured in BOTH tsconfig.json AND vite.config.ts — configuring only one causes runtime or compile errors"
        ],
        "checkpoint": [
          "What is Module Federation and what problem does it solve?",
          "How do you prevent bundle size from gradually growing over time?",
          "What is the benefit of developing components in Storybook isolation?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a React frontend candidate.\n\nTOPIC: Build Tools + Forms (Block 48)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical questions — 'why is your dev server slow', 'how would you validate this form', 'I see you stored an API key in .env — is that safe'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 63,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "Advanced React Patterns",
    "subtitle": "Composition patterns, performance optimization, custom hooks, error boundaries, concurrent features",
    "prereqs": [
      35
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Compound Components + Controlled Props",
            "items": [
              "<b>Compound pattern:</b> Parent provides context, children consume. Menu + MenuItem + MenuOverlay. Implicit state sharing.",
              "<b>Controlled props:</b> Component accepts value prop + onChange. Parent controls state. Uncontrolled: internal state, ref access.",
              "<b>Flexible APIs:</b> accept both controlled and uncontrolled. Use useState for initial state. Controlled wins if provided.",
              "<b>Use case:</b> Dropdown component where consumer can control open state OR let component manage it internally.",
              "<b>Implementation:</b> context.Provider + context.Consumer in compound children. Cloning props to children for controlled."
            ]
          },
          {
            "heading": "Error Boundaries + Suspense",
            "items": [
              "<b>Error boundaries:</b> class component with componentDidError(required) + getDerivedStateFromError(or static). Catch render phase errors.",
              "<b>Boundary placement:</b> Place above route level for page-wide errors. Individual boundaries for component isolation.",
              "<b>Suspense boundaries:</b> Suspense catches thrown promises. Show fallback while promise resolves. Can nest.",
              "<b>Error boundary fallback:</b> 'Something went wrong' → 'Retry button' → reset error state. Log error via callback.",
              "<b>What errors don't catch:</b> event handlers, async code, server-side errors. Catch those with try/catch."
            ]
          }
        ],
        "traps": [
          "Error boundary must be class component in React 17 — hooks version experimental",
          "Suspense without boundary shows nothing — always wrap suspending component in Suspense",
          "Error boundary catches render errors but not event handler errors — wrap handlers in try/catch too"
        ],
        "checkpoint": [
          "Why must error boundaries be class components in React 17?",
          "How do you handle errors in event handlers if error boundaries don't catch them?",
          "Design a compound component for a modal with header, body, and footer."
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Custom Hook Patterns",
            "items": [
              "<b>Data fetching hook:</b> useEffect with abort controller. Cleanup on unmount. Stale response prevention.",
              "<b>Subscription hook:</b> Encapsulate event emitter logic. Return latest value. Cleanup on unmount. useEffectEvent alternative.",
              "<b>State reducer pattern:</b> expose dispatch(action) for state changes. Allow caller to override reducer for control.",
              "<b>Props getter pattern:</b> Hook returns props to spread onto elements. Abstract complex event handlers. useMediaQuery example.",
              "<b>Factory hook pattern:</b> Hook that generates other hooks. Create reusable async hook factories with default config."
            ]
          },
          {
            "heading": "Performance Optimization Patterns",
            "items": [
              "<b>Bundle splitting:</b> lazy() + Suspense for route-level. Loadable components for component-level. Prefetch on hover.",
              "<b>Virtual list:</b> react-window for large lists. Only render visible + buffer items. Variable item heights = complex.",
              "<b>Context splitting:</b> Multiple contexts vs single context. Frequent changes = own context to prevent re-renders.",
              "<b>Memo pitfalls:</b> useMemo for expensive calculations only. useCallback for stable function identity. Over-memoizing = worse performance.",
              "<b>Rerender debugging:</b> why-did-you-render in dev. Identify unnecessary re-renders. Profiler for performance bottlenecks."
            ]
          }
        ],
        "traps": [
          "useMemo without dependency array = stale values — always include dependencies",
          "Virtual list with variable heights = complex calculations — measure manually or use estimatedHeight",
          "Multiple small bundles = waterfall loading — balance between big and too-small bundles"
        ],
        "checkpoint": [
          "How do you debug unnecessary re-renders in a React component?",
          "What is the props getter pattern and when do you use it?",
          "How do you implement a reusable data fetching hook that handles abort and race conditions?"
        ]
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Concurrent React Patterns",
            "items": [
              "<b>useTransition:</b> mark state update as non-urgent. Urgent = typing, click. Non-urgent = tab switch, list filter.",
              "<b>useDeferredValue:</b> defer re-render of non-critical parts. Slow list filter while typing stays responsive.",
              "<b>startTransition:</b> programmatic transition. Wrap non-urgent updates. Does NOT work for DOM updates inside.",
              "<b>Suspense for data:</b> throw promise in render. React caches resolved value. Error boundaries work here too.",
              "<b>Concurrent mode gotchas:</b> Effects run twice in dev = breaking bugs. Cleanup + re-run. Not production bug."
            ]
          },
          {
            "heading": "Micro-Frontend Patterns",
            "items": [
              "<b>Module Federation:</b> Webpack 5 feature. Share code between builds. Remote + Host configuration. Version conflicts.",
              "<b>iframe isolation:</b> Strongest isolation. Communication via postMessage. Style leakage prevention.",
              "<b>Custom elements:</b> Wrap React component as web component. Framework agnostic. Bundle size tradeoff.",
              "<b>Runtime integration:</b> Single SPA, import maps. Orchestrate multiple micro-apps. Shared dependencies."
            ]
          }
        ],
        "traps": [
          "Concurrent mode effects run twice = expected behavior, not bug — test with strict mode",
          "Module federation without shared dependencies = bundle duplication — configure shared carefully",
          "Micro-frontend CSS isolation = not automatic — need shadow DOM or CSS-in-JS with scoping"
        ],
        "checkpoint": [
          "What is useTransition and why is it needed in concurrent mode?",
          "How do you handle CSS isolation in a micro-frontend architecture?",
          "What happens to useEffect when running in React concurrent mode?"
        ]
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: Advanced React Patterns (Block 63)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Pattern recognition, refactoring suggestions, performance diagnosis. 'This component re-renders too often — fix it', 'implement this compound component', 'concurrent mode debugging'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
{
  "id": 59,
  "phase": "Frontend",
  "chip": "frontend",
  "freq": "med",
  "title": "System Design — Frontend Architecture",
  "subtitle": "Micro-frontends, design systems, performance budgets, SSR vs CSR trade-offs, monorepo structure",
  "prereqs": [
    35,
    48
  ],
  "tiers": [
    {
      "level": "Beginner",
      "time": "30 min",
      "sections": [
        {
          "heading": "Frontend Architecture Patterns",
          "items": [
            "<b>Monolithic frontend:</b> one app, one deployment. Simple. Fine for most applications.",
            "<b>Micro-frontends:</b> independently deployed frontend modules. Each team owns their section. Compose at runtime (Module Federation) or build time.",
            "<b>When micro-frontends:</b> multiple teams working on same frontend, different deployment cadences needed, different tech stacks. Not for small apps.",
            "<b>Design system:</b> shared component library + design tokens + documentation. Single source of visual truth. Storybook for development + documentation.",
            "<b>Monorepo:</b> all frontend packages in one repo. Shared code easy. Turborepo/Nx for build caching and task orchestration."
          ]
        }
      ],
      "traps": [
        "Micro-frontends add complexity — don't adopt without clear multi-team problem to solve",
        "Design system without governance = diverges from production UI over time — need dedicated ownership",
        "Monorepo without build caching = CI time grows with every added package — always add Turborepo/Nx"
      ],
      "checkpoint": [
        "When would you choose micro-frontends over a monolithic frontend?",
        "What is a design system and how is it different from a component library?",
        "What problem does Turborepo solve in a monorepo?"
      ]
    },
    {
      "level": "Intermediate",
      "time": "40 min",
      "sections": [
        {
          "heading": "Rendering Strategy at Scale",
          "items": [
            "<b>CSR (Client-Side Rendering):</b> empty HTML, JS fetches data, renders. Slow initial load, fast navigation. Poor SEO without SSR.",
            "<b>SSR (Server-Side Rendering):</b> HTML from server per request. Good SEO, fast initial paint. Server load, complex caching.",
            "<b>SSG (Static Generation):</b> HTML at build time. CDN-served. Fastest. Not for dynamic per-user content.",
            "<b>Islands Architecture:</b> mostly static HTML, small interactive islands hydrated independently. Astro. Best performance, SEO + interactivity.",
            "<b>Decision framework:</b> public marketing content → SSG. User-specific dashboard → CSR. Mixed content + SEO → Next.js SSR/ISR."
          ]
        },
        {
          "heading": "Performance Architecture",
          "items": [
            "<b>Performance budget:</b> set limits on JS bundle size, LCP, CLS, INP before development. Fail CI when exceeded. Prevents gradual bloat.",
            "<b>Critical CSS:</b> inline CSS for above-the-fold content. Eliminate render-blocking external stylesheets for first paint.",
            "<b>Font loading strategy:</b> font-display: swap (show fallback immediately). Preload critical fonts. Subset fonts (only include used characters).",
            "<b>Image optimization:</b> WebP/AVIF formats. Next.js next/image for automatic optimisation. Responsive images with srcset."
          ]
        }
      ],
      "traps": [
        "SSR without caching = every request hits the server = expensive and slow. Cache SSR output at CDN or in-process.",
        "Inlining too much CSS defeats the point — only critical above-the-fold CSS. Lazy load the rest.",
        "Font flash of invisible text (FOIT) vs flash of unstyled text (FOUT) — font-display: swap causes FOUT which is usually preferable"
      ],
      "checkpoint": [
        "I have a SaaS dashboard with user-specific data and a public marketing site. Which rendering strategy for each and why?",
        "What is the Islands Architecture and when does it make sense over Next.js?",
        "How do you prevent JavaScript bundle size from growing over time?"
      ]
    },
    {
      "level": "Advanced",
      "time": "30 min",
      "sections": [
        {
          "heading": "Advanced Frontend System Design",
          "items": [
            "<b>State sync at scale:</b> multiple browser tabs sharing state. BroadcastChannel API for cross-tab messaging. SharedWorker for shared computation.",
            "<b>Offline-first (PWA):</b> Service Worker caches assets and API responses. Background sync for offline actions. Works without network.",
            "<b>Feature flags at frontend:</b> server-driven flags (fetch on load), SDK-based (LaunchDarkly), edge-based (Vercel Edge Config). Separate deploy from release.",
            "<b>A/B testing architecture:</b> variant assignment at edge (no flash). Analytics event tracking. Statistical significance before declaring winner.",
            "<b>Web security for frontends:</b> CSP headers, Subresource Integrity (SRI) for CDN scripts, iframe sandboxing, postMessage origin validation."
          ]
        }
      ],
      "traps": [
        "Service Worker update not propagating — users stuck on old version. Use skipWaiting() + clients.claim() with care.",
        "Feature flags evaluated on client = user can see which features are hidden. Server-side evaluation for sensitive features.",
        "postMessage without origin validation = cross-origin script injection. Always validate event.origin."
      ],
      "checkpoint": [
        "How do you implement a PWA that works completely offline?",
        "Design a feature flag system for a React frontend. What are the options and trade-offs?",
        "What is Subresource Integrity (SRI) and when do you use it?"
      ]
    }
  ],
  "grill": "You are a Senior Frontend/Fullstack Engineer interviewing a candidate on frontend architecture.\n\nTOPIC: Frontend System Design (Block 59)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design scenarios ('design the frontend architecture for a large SaaS product with 5 teams'), trade-off probes ('why SSR here and not SSG'), and performance design ('how do you ensure this stays fast as the team grows').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 71,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "React Performance Internals",
    "subtitle": "Rendering lifecycle, reconciliation, memoization pitfalls, profiler workflow",
    "prereqs": [
      33,
      45
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Render Lifecycle",
            "items": [
              "<b>Render:</b> React calls component functions/classes to produce a React element tree.",
              "<b>Commit:</b> React applies DOM mutations, layout effects, and passive effects.",
              "<b>Re-render causes:</b> state update, parent re-render, context change, forced update.",
              "<b>Strict Mode:</b> intentionally double-invokes some functions in development to find impure renders."
            ]
          },
          {
            "heading": "Reconciliation",
            "items": [
              "<b>Diffing:</b> React compares element trees by type and key.",
              "<b>Keys:</b> stable keys preserve component state across list reorder. Index keys are risky for sorted/filtered lists.",
              "<b>Component type:</b> changing type remounts subtree. Same type updates existing instance.",
              "<b>Render ≠ DOM update:</b> React may render but skip DOM mutations when output is unchanged."
            ]
          }
        ],
        "traps": [
          "React.memo only skips re-render when props are shallowly equal",
          "Using array index as key can reset state when list order changes",
          "Console logs during render can mislead because Strict Mode double-invokes"
        ],
        "checkpoint": [
          "Why did a child render when only unrelated parent state changed?",
          "When is an index key unsafe?",
          "What is the difference between render and commit?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Memoization",
            "items": [
              "<b>React.memo:</b> shallow prop comparison for component render skipping.",
              "<b>useMemo:</b> memoize expensive calculations or stable object values.",
              "<b>useCallback:</b> stabilize function identity for child props or dependency arrays.",
              "<b>Cost:</b> memoization has memory and comparison overhead. Use when it solves measured problems."
            ]
          },
          {
            "heading": "Profiler Workflow",
            "items": [
              "<b>React DevTools Profiler:</b> record interactions, inspect why components rendered.",
              "<b>Flamegraph:</b> find long renders and frequent re-renders.",
              "<b>Histogram:</b> compare builds or interactions.",
              "<b>Fix loop:</b> measure → identify cause → change state shape/memoization → measure again."
            ]
          }
        ],
        "traps": [
          "Memoizing everything can make performance worse",
          "Profiling in development can exaggerate costs",
          "useMemo without dependencies recalculates every render"
        ],
        "checkpoint": [
          "Use Profiler to find why a list item re-renders.",
          "When should you avoid React.memo?",
          "How does state shape affect re-render cost?"
        ]
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Advanced Rendering",
            "items": [
              "<b>Concurrent rendering:</b> React can interrupt and resume rendering for urgent updates.",
              "<b>Transitions:</b> mark non-urgent updates with startTransition/useTransition.",
              "<b>useDeferredValue:</b> keep input responsive while deferring expensive derived UI.",
              "<b>Suspense:</b> show fallback while suspended content becomes ready."
            ]
          },
          {
            "heading": "Large Lists",
            "items": [
              "<b>Virtualization:</b> render only visible rows plus overscan.",
              "<b>Stable row height:</b> simplifies virtualization. Variable height needs measurement.",
              "<b>Data normalization:</b> store entities by id to avoid duplicating large objects.",
              "<b>Selector granularity:</b> subscribe components only to the slice they need."
            ]
          }
        ],
        "traps": [
          "Transitions do not make the underlying work free",
          "Virtualization complicates focus management and layout measurement",
          "Concurrent rendering requires avoiding unsafe global side effects"
        ],
        "checkpoint": [
          "Make a filter input stay responsive while filtering 100K rows.",
          "How do transitions improve perceived performance?",
          "What virtualization issues appear with variable row heights?"
        ]
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: React Performance Internals (Block 71)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Re-render debugging, reconciliation, memoization, profiler workflow. 'This list renders too often', 'memoization made it slower', 'profile this interaction'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 72,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "React Router + App Structure",
    "subtitle": "Route layout, loaders/actions, protected routes, code splitting by route",
    "prereqs": [
      33,
      34
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Routing Model",
            "items": [
              "<b>Route tree:</b> routes map URL segments to components and layouts.",
              "<b>Layout routes:</b> shared UI around child routes. Avoid duplicating nav/sidebar.",
              "<b>Index routes:</b> render at the parent path without an additional segment.",
              "<b>Nested routes:</b> enable partial page updates and persistent layouts."
            ]
          },
          {
            "heading": "Navigation",
            "items": [
              "<b>Link:</b> client-side navigation without full reload.",
              "<b>useNavigate:</b> imperative navigation after mutations.",
              "<b>Search params:</b> encode filters, pagination, and sort state in URL.",
              "<b>Active links:</b> derive from current location for navigation state."
            ]
          }
        ],
        "traps": [
          "Putting all state in React state loses deep-linkable URLs",
          "Nested routes without layouts duplicate shell UI",
          "Redirect loops often come from auth checks that depend on loading state"
        ],
        "checkpoint": [
          "Design route layout for dashboard, settings, and profile pages.",
          "Where should filter state live for shareable URLs?",
          "What causes an auth redirect loop?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Loaders + Actions",
            "items": [
              "<b>Loader:</b> fetch data before route renders. Enables pending UI and error boundaries.",
              "<b>Action:</b> handle form submissions and mutations in route context.",
              "<b>Revalidation:</b> loaders rerun after actions to keep UI consistent.",
              "<b>Pending state:</b> show optimistic or loading UI while navigation/mutation is in progress."
            ]
          },
          {
            "heading": "Protected Routes",
            "items": [
              "<b>Auth wrapper:</b> check session, redirect or render login.",
              "<b>Role checks:</b> authorize after authentication, not instead of it.",
              "<b>Loading states:</b> do not redirect before auth state is known.",
              "<b>ReturnTo:</b> preserve requested URL and navigate back after login."
            ]
          }
        ],
        "traps": [
          "Client-side route protection is UX, not security. Server must enforce authorization.",
          "Actions without validation create inconsistent UI state",
          "Revalidation after every mutation can be expensive if not scoped"
        ],
        "checkpoint": [
          "Implement a protected admin route with loading state.",
          "How do loaders/actions improve form flows?",
          "What must the server still enforce for protected routes?"
        ]
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Code Splitting",
            "items": [
              "<b>Route-level lazy:</b> lazy load route components by URL segment.",
              "<b>Prefetch:</b> load likely next routes on hover or idle time.",
              "<b>Bundle analysis:</b> identify large route chunks and shared dependencies.",
              "<b>Error boundaries:</b> isolate failures to route chunks."
            ]
          },
          {
            "heading": "App Architecture",
            "items": [
              "<b>Feature folders:</b> colocate routes, components, loaders, tests, and styles.",
              "<b>Shared shell:</b> auth, layout, navigation, and feature flags at root.",
              "<b>Error handling:</b> route-level error boundaries with retry actions.",
              "<b>Analytics:</b> track route changes without duplicating navigation logic."
            ]
          }
        ],
        "traps": [
          "Too many tiny chunks create request waterfalls",
          "Lazy boundaries without error boundaries hide chunk load failures",
          "Feature folders still need clear public APIs to avoid tight coupling"
        ],
        "checkpoint": [
          "Design route code splitting for a large admin app.",
          "How do you avoid bundle waterfalls?",
          "Where do route-level errors belong?"
        ]
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: React Router + App Structure (Block 72)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Route layout, loaders/actions, auth, code splitting. 'Design dashboard routing', 'auth redirect loop', 'split bundles by route'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 73,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "CSS Architecture + Design Tokens",
    "subtitle": "BEM, utility-first CSS, tokens, responsive systems, dark mode",
    "prereqs": [
      44
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Methodologies",
            "items": [
              "<b>BEM:</b> block__element--modifier naming. Predictable specificity and reusable blocks.",
              "<b>Utility-first:</b> compose small classes like flex, p-4, text-sm. Fast iteration, verbose markup.",
              "<b>CSS modules:</b> local class scoping at build time. Prevents global collisions.",
              "<b>CSS-in-JS:</b> colocate styles with components. Watch runtime cost and SSR setup."
            ]
          },
          {
            "heading": "Specificity",
            "items": [
              "<b>Specificity order:</b> inline > ID > class/attribute/pseudo-class > element.",
              "<b>Low specificity:</b> easier overrides and fewer !important rules.",
              "<b>Cascade layers:</b> @layer controls precedence between style sources.",
              "<b>Design rule:</b> prefer composition over fighting specificity."
            ]
          }
        ],
        "traps": [
          "!important makes future overrides painful",
          "Utility classes can obscure component intent if overused",
          "CSS-in-JS runtime styles can hurt performance if unmanaged"
        ],
        "checkpoint": [
          "Compare BEM and utility-first CSS.",
          "How do cascade layers help large apps?",
          "Why avoid high specificity?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Design Tokens",
            "items": [
              "<b>Tokens:</b> named values for color, spacing, typography, radius, shadow, motion.",
              "<b>Semantic tokens:</b> color.success, color.danger, color.background instead of raw hex names.",
              "<b>Platforms:</b> share tokens across web, iOS, Android, and design tools.",
              "<b>Theming:</b> swap token values for dark mode, brand, or customer themes."
            ]
          },
          {
            "heading": "Responsive Systems",
            "items": [
              "<b>Mobile-first:</b> base styles for small screens, add breakpoints for larger screens.",
              "<b>Fluid typography:</b> clamp(min, preferred, max) scales smoothly.",
              "<b>Container queries:</b> component responds to container size, not viewport.",
              "<b>Spacing scale:</b> 4px/8px grid improves consistency."
            ]
          }
        ],
        "traps": [
          "Tokens without governance become another design system silo",
          "Dark mode is more than inverting colors — check contrast and images",
          "Too many breakpoints create maintenance burden"
        ],
        "checkpoint": [
          "Design semantic color tokens for light/dark mode.",
          "When use container queries over media queries?",
          "How do tokens connect design and code?"
        ]
      },
      {
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "Scalable CSS",
            "items": [
              "<b>Component APIs:</b> expose layout/variant/size props instead of arbitrary overrides.",
              "<b>Token pipeline:</b> generate CSS variables from source tokens and validate them in CI.",
              "<b>Regression testing:</b> visual regression catches layout and token mistakes.",
              "<b>Performance:</b> ship only used CSS, avoid large runtime style generation."
            ]
          },
          {
            "heading": "Governance",
            "items": [
              "<b>Ownership:</b> define who can add tokens, components, and global styles.",
              "<b>Documentation:</b> usage guidelines prevent one-off CSS.",
              "<b>Deprecation:</b> rename tokens/components with migration windows.",
              "<b>Audit:</b> find unused tokens, duplicate styles, and specificity outliers."
            ]
          }
        ],
        "traps": [
          "A design token for every component prop creates token sprawl",
          "Visual regression without triage becomes noise",
          "Global CSS changes need release planning and rollback strategy"
        ],
        "checkpoint": [
          "Design a token governance process.",
          "How do you prevent CSS drift in a component library?",
          "What belongs in a visual regression pipeline?"
        ]
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: CSS Architecture + Design Tokens (Block 73)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: CSS methodology, tokens, responsive systems, dark mode. 'CSS is drifting', 'design token system', 'choose BEM vs utility CSS'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 74,
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "Next.js Security + Authentication",
    "subtitle": "Auth patterns, middleware, route protection, cookies, CSRF/CORS",
    "prereqs": [
      34
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Auth Patterns",
            "items": [
              "<b>Session cookies:</b> server verifies session id. Good for web apps with HttpOnly cookies.",
              "<b>JWT cookies:</b> stateless token in cookie. Manage expiry, rotation, and revocation.",
              "<b>OAuth/OIDC:</b> delegate authentication to identity provider. Use Authorization Code + PKCE for browsers.",
              "<b>Server components:</b> can read server-side auth without exposing tokens to client JS."
            ]
          },
          {
            "heading": "Middleware",
            "items": [
              "<b>Next middleware:</b> runs before route rendering. Good for redirects, rewrites, auth checks.",
              "<b>Matcher:</b> limit middleware to paths that need it.",
              "<b>Edge runtime:</b> middleware constraints differ from Node runtime APIs.",
              "<b>Return early:</b> keep middleware fast to avoid slowing every request."
            ]
          }
        ],
        "traps": [
          "Tokens in localStorage are exposed to XSS; prefer HttpOnly cookies when possible",
          "Middleware on every path can hurt latency",
          "Client route protection does not protect server APIs"
        ],
        "checkpoint": [
          "Compare session cookies and JWT cookies.",
          "When should auth live in middleware vs route components?",
          "Why avoid localStorage for auth tokens?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Route Protection",
            "items": [
              "<b>Server-side checks:</b> protect pages, API routes, and server actions.",
              "<b>Redirects:</b> send unauthenticated users to login with returnTo.",
              "<b>Forbidden:</b> authenticated users without permission see 403, not login.",
              "<b>Loading states:</b> avoid redirect loops while session is loading."
            ]
          },
          {
            "heading": "Cookies + CSRF/CORS",
            "items": [
              "<b>HttpOnly:</b> JavaScript cannot read cookie. Reduces XSS token theft.",
              "<b>Secure:</b> cookie sent only over HTTPS.",
              "<b>SameSite:</b> Lax or Strict reduces CSRF risk. None requires Secure.",
              "<b>CORS:</b> controls cross-origin browser requests. It is not authentication."
            ]
          }
        ],
        "traps": [
          "CORS does not stop CSRF from forms or simple requests",
          "SameSite=None without Secure is rejected by browsers",
          "Middleware redirects must exclude login and callback routes"
        ],
        "checkpoint": [
          "Design protected dashboard routes without redirect loops.",
          "What cookie flags matter for auth?",
          "How do CSRF and CORS differ?"
        ]
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Hardening",
            "items": [
              "<b>Token rotation:</b> refresh tokens rotate and old tokens are invalidated.",
              "<b>Logout:</b> clear cookies server-side and revoke refresh tokens.",
              "<b>CSRF tokens:</b> required for state-changing cookie-authenticated requests when SameSite is insufficient.",
              "<b>Headers:</b> CSP, HSTS, X-Content-Type-Options, Referrer-Policy."
            ]
          },
          {
            "heading": "Edge Cases",
            "items": [
              "<b>App router:</b> understand server vs client components and where auth data can be read.",
              "<b>API routes:</b> validate auth and authorization on every mutation.",
              "<b>SSR caching:</b> never cache personalized auth pages without vary/private controls.",
              "<b>Incident response:</b> token leakage, cookie theft, and session revocation plan."
            ]
          }
        ],
        "traps": [
          "Caching personalized pages can leak user data",
          "Refresh token rotation must handle reuse detection",
          "Auth in server actions still needs authorization checks"
        ],
        "checkpoint": [
          "Design token rotation and logout.",
          "How do you prevent caching leaks for authenticated pages?",
          "What is your response to stolen auth cookies?"
        ]
      }
    ],
    "grill": "You are a Senior Frontend/Fullstack Engineer interviewing a candidate.\n\nTOPIC: Next.js Security + Authentication (Block 74)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Auth patterns, middleware, cookies, CSRF/CORS, caching. 'Redirect loop', 'token in localStorage', 'protect server actions'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default frontendContent;
