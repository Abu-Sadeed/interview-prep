import type { Block } from '../../types/content';

export const testingAdvanced: Block[] = [
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
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "CI Strategy",
            "items": [
              "<b>Fast lane:</b> lint, typecheck, unit tests on every PR.",
              "<b>Slow lane:</b> integration/e2e on main, release branches, or scheduled runs.",
              "<b>Sharding:</b> split tests across runners to keep feedback fast.",
              "<b>Flake management:</b> quarantine, label, investigate, and fix root cause."
            ]
          },
          {
            "heading": "Test Architecture",
            "items": [
              "<b>Test data builders:</b> create valid domain objects with sensible defaults.",
              "<b>Contract tests:</b> verify API/event contracts between services.",
              "<b>Mutation testing:</b> check whether tests fail when code is intentionally mutated.",
              "<b>Maintainability:</b> tests are production code; refactor helpers and remove duplication."
            ]
          }
        ],
        "traps": [
          "Retrying flakes without fixing them creates false confidence",
          "Too many slow tests on every PR slows engineering velocity",
          "Contract tests do not replace local integration tests for internal behavior"
        ],
        "checkpoint": [
          "Design a CI test matrix for a monorepo.",
          "How do you handle a flaky integration test?",
          "What makes a test suite maintainable?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a candidate on testing implementation.\n\nTOPIC: Testing Implementation Patterns (Block 86)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Test setup, mocks/fakes, integration tests, Testcontainers, CI strategy. 'Tests are flaky', 'mock or fake?', 'design CI test matrix'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default testingAdvanced;
