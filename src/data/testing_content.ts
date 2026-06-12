import type { Block } from '../types/content';

export const testingContent: Block[] = [
  {
    "id": 49,
    "phase": "Cross-Cutting",
    "chip": "arch",
    "freq": "high",
    "title": "Testing — Philosophy + Strategies",
    "subtitle": "Testing pyramid, TDD, test doubles, integration vs unit, test containers, what not to test",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Testing Pyramid",
            "items": [
              "<b>Unit tests:</b> test one unit in isolation. Fast (&lt;1ms). No I/O, no network. Most tests should be here.",
              "<b>Integration tests:</b> test multiple units together including real dependencies (DB, HTTP). Slower. Fewer than unit tests.",
              "<b>E2E tests:</b> test full user journey through browser. Slow, brittle, expensive. Only for critical paths.",
              "<b>Wrong pyramid (ice cream cone):</b> many E2E, few unit. Slow CI, brittle tests, hard to debug failures.",
              "<b>Rule of thumb:</b> 70% unit, 20% integration, 10% E2E."
            ]
          },
          {
            "heading": "Test Doubles",
            "items": [
              "<b>Dummy:</b> passed but never used. Fills parameter list.",
              "<b>Stub:</b> returns hardcoded response. No verification of calls.",
              "<b>Mock:</b> pre-programmed with expectations. Verified after test. Fails if expected calls not made.",
              "<b>Spy:</b> wraps real implementation. Observes calls without replacing behaviour.",
              "<b>Fake:</b> working implementation but simplified (in-memory DB instead of real Postgres)."
            ]
          }
        ],
        "traps": [
          "Too many mocks = testing your mocks not your code. Mock at the boundary (HTTP, DB) not internally.",
          "E2E tests that cover the same paths as integration tests = wasted effort and slow CI",
          "Stub and mock are often confused — stub = canned response, mock = verified interactions"
        ],
        "checkpoint": [
          "What is the difference between a stub and a mock?",
          "Why is an 'ice cream cone' test distribution (many E2E, few unit) a problem?",
          "What is a fake and when would you use one over a stub?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "TDD + What to Test",
            "items": [
              "<b>TDD (Test-Driven Development):</b> Red (write failing test) → Green (write minimum code to pass) → Refactor (improve code, tests still pass).",
              "<b>TDD benefits:</b> forces small, testable functions. Documents intended behaviour. Catches regressions. Reduces over-engineering.",
              "<b>What to test:</b> business logic, edge cases, error paths, integration points. NOT: framework code, simple getters/setters, trivial functions.",
              "<b>Test naming:</b> describe what the code DOES not how it works. 'returns 404 when user not found' not 'calls findById with correct params'."
            ]
          },
          {
            "heading": "TestContainers",
            "items": [
              "<b>TestContainers:</b> start real Docker containers in tests. Real Postgres, Redis, Kafka. Accurate integration tests.",
              "<b>vs in-memory alternatives:</b> H2/SQLite miss Postgres-specific features (JSONB, CTEs, window functions). TestContainers uses the real thing.",
              "<b>Lifecycle:</b> start container in beforeAll, run migrations, seed data in beforeEach, teardown in afterAll.",
              "<b>Reuse containers:</b> withReuse() — don't recreate between test runs. Massive speed improvement in local development."
            ]
          }
        ],
        "traps": [
          "TDD is not about writing tests after — it is about writing tests first to drive design",
          "TestContainers without container reuse = slow test suite — enable reuse for local development",
          "Seeding test data in beforeAll causes test pollution if tests modify it — use beforeEach or transactions"
        ],
        "checkpoint": [
          "Walk me through the TDD cycle. What is the purpose of each step?",
          "Why would you use TestContainers instead of an in-memory database for integration tests?",
          "How do you prevent test pollution when multiple tests share a database?"
        ]
      },
      {
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "Advanced Testing Strategy",
            "items": [
              "<b>Contract testing (Pact):</b> consumer defines expected API contract. Provider verifies against it in CI. Catches breaking changes without E2E.",
              "<b>Property-based testing (fast-check):</b> generate random inputs, test invariants hold. 'For any valid email, parsing should succeed'. Finds edge cases humans miss.",
              "<b>Mutation testing (Stryker):</b> introduce code mutations, check if tests catch them. Reveals weak assertions and coverage gaps.",
              "<b>Flaky test strategies:</b> retry logic (last resort), quarantine flaky tests, fix root cause (shared state, timing, external deps). Never ignore flaky tests."
            ]
          }
        ],
        "traps": [
          "Contract testing is not integration testing — it tests the contract/schema not the full system behaviour",
          "Property-based testing needs careful invariant design — testing wrong invariant gives false confidence",
          "Retrying flaky tests masks real problems — always investigate and fix root cause"
        ],
        "checkpoint": [
          "What is contract testing and how is it different from integration testing?",
          "What is property-based testing and what kinds of bugs does it find that example-based tests miss?",
          "You have 10 flaky tests in CI. What is your strategy?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a candidate on testing philosophy.\n\nTOPIC: Testing Philosophy + Strategies (Block 49)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Test strategy decisions ('how would you test this system'), philosophy probes ('what should you not test'), and production scenarios ('CI is slow, tests are flaky — what do you do').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default testingContent;
