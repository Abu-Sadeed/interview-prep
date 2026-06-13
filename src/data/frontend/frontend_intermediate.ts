import type { Block } from '../../types/content';

export const frontendIntermediate: Block[] = [
  {
    "id": "frontend-1",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "React Essentials",
    "subtitle": "Hooks deep dive, state management, performance optimization, testing",
    "prereqs": [],
    "tiers": [
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
    "id": "frontend-2",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "Next.js — Fullstack React Framework",
    "subtitle": "SSG/SSR/ISR/RSC patterns, App Router, middleware, optimization",
    "prereqs": [
      "frontend-1"
    ],
    "tiers": [
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
    "id": "frontend-3",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "React State Management — Redux Toolkit + External Stores",
    "subtitle": "Redux Toolkit, middleware, selectors, and external state stores",
    "prereqs": [
      "frontend-1"
    ],
    "tiers": [
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
    "id": "frontend-4",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "CSS — Box Model, Flexbox, Grid",
    "subtitle": "Box model, positioning, Flexbox mental model, Grid layout, responsive design, common patterns",
    "prereqs": [],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Engineer interviewing a frontend candidate.\n\nTOPIC: CSS — Box Model, Flexbox, Grid (Block 44)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix concept questions with layout design tasks. 'Implement this layout using CSS', 'why is your animation janky', 'what is wrong with this CSS specificity'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "frontend-5",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "Browser — Rendering Pipeline + Performance",
    "subtitle": "Critical rendering path, Web Vitals, lazy loading, code splitting, memory leaks, DevTools",
    "prereqs": [
      "frontend-4"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Engineer interviewing a frontend candidate.\n\nTOPIC: Browser Rendering + Performance (Block 45)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Performance diagnosis scenarios — 'your CLS score is 0.4, fix it', 'users report slow interactions on mobile', 'your bundle is 3MB'. Test tooling knowledge and decision-making.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "frontend-6",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "React — State Management",
    "subtitle": "Local state, global state, server state, and when each pattern wins",
    "prereqs": [
      "frontend-3"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Engineer interviewing a React frontend candidate.\n\nTOPIC: React State Management (Block 46)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Trade-off decisions ('which state management for this app'), performance diagnosis ('your app re-renders on every keystroke'), and architecture ('where should this state live').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "frontend-7",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "React — Testing + Accessibility",
    "subtitle": "React Testing Library, Vitest, a11y principles, ARIA, semantic HTML, keyboard navigation",
    "prereqs": [
      "frontend-6"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Engineer interviewing a React frontend candidate.\n\nTOPIC: React Testing + Accessibility (Block 47)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Mix testing strategy ('how would you test this component'), a11y design ('make this modal accessible'), and tooling ('why MSW over mocking').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "frontend-8",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "React — Build Tools + Forms",
    "subtitle": "Vite vs Webpack, bundling concepts, React Hook Form, Zod validation, TypeScript in React",
    "prereqs": [
      "frontend-3"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Engineer interviewing a React frontend candidate.\n\nTOPIC: Build Tools + Forms (Block 48)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical questions — 'why is your dev server slow', 'how would you validate this form', 'I see you stored an API key in .env — is that safe'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "frontend-9",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "Advanced React Patterns",
    "subtitle": "Composition patterns, performance optimization, custom hooks, error boundaries, concurrent features",
    "prereqs": [
      "frontend-3"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: Advanced React Patterns (Block 63)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Pattern recognition, refactoring suggestions, performance diagnosis. 'This component re-renders too often — fix it', 'implement this compound component', 'concurrent mode debugging'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "frontend-10",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "System Design — Frontend Architecture",
    "subtitle": "Micro-frontends, design systems, performance budgets, SSR vs CSR trade-offs, monorepo structure",
    "prereqs": [
      "frontend-3",
      "frontend-8"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Frontend/Fullstack Engineer interviewing a candidate on frontend architecture.\n\nTOPIC: Frontend System Design (Block 59)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Design scenarios ('design the frontend architecture for a large SaaS product with 5 teams'), trade-off probes ('why SSR here and not SSG'), and performance design ('how do you ensure this stays fast as the team grows').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "frontend-11",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "React Performance Internals",
    "subtitle": "Rendering lifecycle, reconciliation, memoization pitfalls, profiler workflow",
    "prereqs": [
      "frontend-1",
      "frontend-5"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: React Performance Internals (Block 71)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Re-render debugging, reconciliation, memoization, profiler workflow. 'This list renders too often', 'memoization made it slower', 'profile this interaction'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "frontend-12",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "React Router + App Structure",
    "subtitle": "Route layout, loaders/actions, protected routes, code splitting by route",
    "prereqs": [
      "frontend-1",
      "frontend-2"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: React Router + App Structure (Block 72)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Route layout, loaders/actions, auth, code splitting. 'Design dashboard routing', 'auth redirect loop', 'split bundles by route'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "frontend-13",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "med",
    "title": "CSS Architecture + Design Tokens",
    "subtitle": "BEM, utility-first CSS, tokens, responsive systems, dark mode",
    "prereqs": [
      "frontend-4"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Frontend Engineer interviewing a candidate.\n\nTOPIC: CSS Architecture + Design Tokens (Block 73)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: CSS methodology, tokens, responsive systems, dark mode. 'CSS is drifting', 'design token system', 'choose BEM vs utility CSS'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "frontend-14",
    "phase": "Frontend",
    "chip": "frontend",
    "freq": "high",
    "title": "Next.js Security + Authentication",
    "subtitle": "Auth patterns, middleware, route protection, cookies, CSRF/CORS",
    "prereqs": [
      "frontend-2"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Frontend/Fullstack Engineer interviewing a candidate.\n\nTOPIC: Next.js Security + Authentication (Block 74)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Auth patterns, middleware, cookies, CSRF/CORS, caching. 'Redirect loop', 'token in localStorage', 'protect server actions'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default frontendIntermediate;
