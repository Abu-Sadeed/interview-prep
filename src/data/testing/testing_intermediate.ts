import type { Block } from '../../types/content';

export const testingIntermediate: Block[] = [
  {
    "id": "testing-1",
    "phase": "Cross-Cutting",
    "chip": "arch",
    "freq": "high",
    "title": "Testing — Philosophy + Strategies",
    "subtitle": "Testing pyramid, TDD, test doubles, integration vs unit, test containers, what not to test",
    "prereqs": [],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Engineer interviewing a candidate on testing philosophy.\n\nTOPIC: Testing Philosophy + Strategies (Block 49)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Test strategy decisions ('how would you test this system'), philosophy probes ('what should you not test'), and production scenarios ('CI is slow, tests are flaky — what do you do').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "testing-2",
    "phase": "Cross-Cutting",
    "chip": "testing",
    "freq": "high",
    "title": "Testing Implementation Patterns",
    "subtitle": "Unit/integration/e2e setup, mocks vs fakes, Testcontainers, CI test strategy",
    "prereqs": [
      "testing-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Integration Tests",
            "items": [
              "<b>Real dependencies:</b> use Postgres, Redis, Kafka, or HTTP servers when behavior depends on them.",
              "<b>Testcontainers:</b> start containers for integration tests with real versions.",
              "<b>Migrations:</b> run schema migrations before tests. Avoid hand-written test schemas that drift.",
              "<b>Transactions:</b> wrap tests in transactions when possible, but know isolation limits."
            ]
          },
          {
            "heading": "E2E Tests",
            "items": [
              "<b>Critical paths:</b> login, checkout, publish, admin workflow. Keep E2E count small.",
              "<b>Stable selectors:</b> test user-visible behavior, not CSS internals.",
              "<b>Parallelism:</b> isolate users/data to avoid cross-test interference.",
              "<b>Screenshots/video:</b> attach artifacts on failure for fast debugging."
            ]
          }
        ],
        "traps": [
          "Integration tests against local-only containers can hide environment differences",
          "E2E tests that duplicate unit/integration coverage slow CI",
          "Shared test users cause flaky parallel runs"
        ],
        "checkpoint": [
          "Design integration tests for a payment service.",
          "How do Testcontainers improve confidence?",
          "Which user journeys deserve E2E coverage?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a candidate on testing implementation.\n\nTOPIC: Testing Implementation Patterns (Block 86)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Test setup, mocks/fakes, integration tests, Testcontainers, CI strategy. 'Tests are flaky', 'mock or fake?', 'design CI test matrix'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default testingIntermediate;
