import type { Block } from '../../types/content';

export const frontendAdvanced: Block[] = [
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

export default frontendAdvanced;
