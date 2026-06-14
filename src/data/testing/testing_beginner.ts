import type { Block } from '../../types/content';

export const testingBeginner: Block[] = [
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Test Setup",
            "items": [
              "<b>Test files:</b> colocate tests with code or group by feature. Choose consistency over dogma.",
              "<b>Fixtures:</b> reusable setup data and helpers. Keep them small and readable.",
              "<b>Isolation:</b> reset mocks, DB state, timers, and random seeds between tests.",
              "<b>Assertions:</b> assert observable behavior and important edge cases, not implementation details."
            ]
          },
          {
            "heading": "Mocks vs Fakes",
            "items": [
              "<b>Mock:</b> verifies interactions at a boundary. Use sparingly.",
              "<b>Fake:</b> simplified working implementation, such as in-memory repository.",
              "<b>Stub:</b> returns canned responses. Does not verify calls.",
              "<b>Boundary rule:</b> mock external systems, test your own logic directly."
            ]
          }
        ],
        "traps": [
          "Over-mocking makes tests brittle and shallow",
          "Shared fixtures that mutate cause flaky tests",
          "Testing private implementation details blocks refactoring"
        ],
        "checkpoint": [
          "When would you use a fake instead of a mock?",
          "How do you reset state between tests?",
          "What should a unit test avoid asserting?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a candidate on testing implementation.\n\nTOPIC: Testing Implementation Patterns (Block 86)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Test setup, mocks/fakes, integration tests, Testcontainers, CI strategy. 'Tests are flaky', 'mock or fake?', 'design CI test matrix'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default testingBeginner;
