import type { Block } from '../types/content';

export const archContent: Block[] = [
  {
    "id": 36,
    "phase": "Architecture & Design",
    "chip": "arch",
    "freq": "high",
    "title": "Design Patterns — Applied to Your Stack",
    "subtitle": "Creational/structural/behavioral patterns mapped to Spring, NestJS, and production code",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Creational Patterns",
            "items": [
              "<b>Singleton:</b> one instance per application. Spring beans are singleton by default. Danger: mutable shared state + threads. Stateless singletons are safe.",
              "<b>Factory Method:</b> subclasses decide which class to instantiate. Spring FactoryBean. When exact type depends on runtime input.",
              "<b>Builder:</b> construct complex objects step-by-step. Lombok @Builder. Avoids telescoping constructors. Immutable objects.",
              "<b>Prototype:</b> clone existing object. Spring prototype scope = new instance per injection. Java: copy constructor preferred over Cloneable."
            ]
          },
          {
            "heading": "Structural Patterns",
            "items": [
              "<b>Proxy:</b> intercept and add behaviour without changing target. Spring AOP (@Transactional, @Cacheable) are proxy-based.",
              "<b>Decorator:</b> add behaviour by wrapping. Chain of decorators. InputStream → BufferedInputStream → GzipInputStream. Adds behaviour, Proxy controls access.",
              "<b>Adapter:</b> make incompatible interfaces work together. Spring MVC HandlerAdapter adapts different controllers.",
              "<b>Facade:</b> simplify complex subsystem with unified interface. Your service layer wrapping multiple repositories is a Facade."
            ]
          },
          {
            "heading": "Behavioral Patterns",
            "items": [
              "<b>Strategy:</b> swap algorithms at runtime. Interface + multiple implementations. Inject different PaymentStrategy.",
              "<b>Observer:</b> notify multiple subscribers. Spring ApplicationEvent + ApplicationEventPublisher.",
              "<b>Chain of Responsibility:</b> pass request through handlers. Spring Security filter chain. NestJS middleware pipeline.",
              "<b>Template Method:</b> algorithm skeleton in base class, steps in subclasses. JdbcTemplate, RestTemplate."
            ]
          }
        ],
        "traps": [
          "Singleton with mutable state = thread-safety bug — stateless singletons only",
          "Decorator vs Proxy: Decorator adds new functionality, Proxy controls access to existing functionality",
          "Observer pattern can cause memory leaks — subscribers not deregistered hold strong references"
        ],
        "checkpoint": [
          "Spring beans are singleton by default. What problem does this cause with mutable state?",
          "What is the difference between Proxy and Decorator patterns? How does Spring use Proxy?",
          "I have a payment service needing Stripe, PayPal, and bank transfer. Which pattern and why?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Pattern Recognition in Your Code",
            "items": [
              "<b>N+1 query anti-pattern:</b> load 100 orders, then load each order's user separately = 101 queries. Fix: JOIN, eager loading, batch loading.",
              "<b>God Object anti-pattern:</b> one class does everything. Break into focused classes with single responsibility.",
              "<b>Anemic Domain Model:</b> service has all logic, entity is just data (getters/setters). Consider rich domain model for complex business logic.",
              "<b>Primitive Obsession:</b> using String for everything (email, phone, currency). Use value objects with validation.",
              "<b>Open/Closed Principle:</b> Strategy + Factory = add new behaviour without modifying existing code. New payment type = new class, not modified switch."
            ]
          },
          {
            "heading": "Concurrency Patterns",
            "items": [
              "<b>Producer-Consumer:</b> BlockingQueue between producers and consumers. Producer blocks when queue full. Consumer blocks when empty. Natural backpressure.",
              "<b>Thread Pool pattern:</b> pre-created threads, task queue. ThreadPoolExecutor. Reuse threads, bounded concurrency.",
              "<b>Read-Write Lock:</b> multiple concurrent readers, exclusive writer. ReentrantReadWriteLock. Read-heavy, write-infrequent data structures.",
              "<b>Immutable Object:</b> thread-safe by design. No shared mutable state. Final fields, no setters, copy-on-mutation."
            ]
          }
        ],
        "traps": [
          "Distributed Monolith anti-pattern: microservices that are tightly coupled, share DB, deploy together — worst of both worlds",
          "Premature optimization: solving performance problems that don't exist yet — profile first",
          "Magic numbers/strings: hardcoded values without meaning — use named constants, enums, or config"
        ],
        "checkpoint": [
          "I have a service class with 12 methods, 800 lines, each method checks 'if type == A do X, if type == B do Y'. What patterns apply? How do you refactor?",
          "What is an Anemic Domain Model? How does it differ from a rich domain model?",
          "Explain Producer-Consumer pattern. How does BlockingQueue implement backpressure?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a candidate.\n\nTOPIC: Design Patterns Applied to Your Stack (Block 36)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Code-level questioning, anti-patterns, refactoring.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 59,
    "phase": "Architecture & Design",
    "chip": "arch",
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
  }
];

export default archContent;
