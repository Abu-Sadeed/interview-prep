import type { Block } from '../../types/content';

export const frontendBeginner: Block[] = [
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
      }
    ],
    "grill": "You are a Senior Frontend/Fullstack Engineer interviewing a candidate.\n\nTOPIC: Next.js Security + Authentication (Block 74)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Auth patterns, middleware, cookies, CSRF/CORS, caching. 'Redirect loop', 'token in localStorage', 'protect server actions'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default frontendBeginner;
