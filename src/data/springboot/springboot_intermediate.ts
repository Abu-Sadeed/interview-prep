import type { Block } from '../../types/content';

export const springbootIntermediate: Block[] = [
  {
    "id": "springboot-1",
    "phase": "Spring Boot",
    "chip": "springboot",
    "freq": "med",
    "title": "Spring Boot — Production Patterns",
    "subtitle": "Actuator, circuit breakers, @Async, AOP internals, profiles, config management",
    "prereqs": [
      "spring-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Circuit Breakers — Resilience4j",
            "items": [
              "<b>States:</b> CLOSED (normal) → OPEN (failing, rejects calls) → HALF_OPEN (test probe) → CLOSED.",
              "<b>@CircuitBreaker(name='svc', fallbackMethod='fallback'):</b> fallback must have same signature + Throwable param.",
              "<b>Sliding window:</b> count-based or time-based. Opens when failure rate exceeds threshold.",
              "<b>@Retry with exponential backoff + jitter:</b> prevents thundering herd on recovery.",
              "<b>Bulkhead:</b> limit concurrent calls to service. Prevents one slow dependency from exhausting all threads."
            ]
          },
          {
            "heading": "@Async + CompletableFuture",
            "items": [
              "<b>@Async:</b> Spring proxy runs method on thread pool. Must return void, Future, or CompletableFuture.",
              "<b>Self-invocation trap:</b> same as @Transactional — calling from same class runs synchronously.",
              "<b>Always configure custom ThreadPoolTaskExecutor</b> with bounded queue. Default SimpleAsyncTaskExecutor creates new thread per task — production disaster.",
              "<b>CompletableFuture:</b> thenApply (sync transform), thenApplyAsync (async), thenCombine (merge two), allOf (wait all), anyOf (first completes).",
              "<b>Exception in @Async void:</b> use AsyncUncaughtExceptionHandler. In CompletableFuture — .exceptionally() or .handle()."
            ]
          }
        ],
        "traps": [
          "@Async self-invocation runs synchronously — same proxy bypass issue as @Transactional",
          "Not configuring custom executor for @Async can create unbounded threads under load",
          "CircuitBreaker fallback wrong signature means fallback is never called — silent failure"
        ],
        "checkpoint": [
          "What is the bulkhead pattern and when do you use it?",
          "Walk me through configuring a proper ThreadPoolTaskExecutor for @Async methods.",
          "My circuit breaker is not opening even though 60% of requests are failing. What are the likely causes?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Boot candidate.\n\nTOPIC: Spring Boot Production Patterns (Block 17)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production scenarios only — 'circuit breaker isn't opening', 'async jobs silently failing', 'add rate limiting without changing controllers', 'service taking down entire JVM when downstream is slow'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "springboot-2",
    "phase": "Spring Boot",
    "chip": "springboot",
    "freq": "high",
    "title": "Spring Boot Fundamentals",
    "subtitle": "Starters, auto-configuration, profiles, config binding, externalized config",
    "prereqs": [
      "spring-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Auto-Configuration",
            "items": [
              "<b>Conditional beans:</b> @ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnProperty decide what to create.",
              "<b>Back-off:</b> user-defined beans replace Boot defaults. This is how DataSource auto-config steps aside.",
              "<b>Debug auto-config:</b> --debug or tracing auto-configuration reports show matches and mismatches.",
              "<b>Starter internals:</b> starter pulls dependencies; auto-configuration provides beans."
            ]
          },
          {
            "heading": "Configuration Binding",
            "items": [
              "<b>@ConfigurationProperties:</b> bind prefixed properties to typed POJOs. Prefer for grouped config.",
              "<b>Validation:</b> @Validated on @ConfigurationProperties bean with Jakarta Validation constraints.",
              "<b>@Value:</b> inject one property. Fine for simple values, weaker than typed binding for groups.",
              "<b>Refresh:</b> configuration is read at startup unless using Cloud refresh mechanisms."
            ]
          }
        ],
        "traps": [
          "@ConfigurationProperties classes must be registered as beans or scanned with @EnableConfigurationProperties",
          "@Value gives no structure or validation for complex config",
          "Auto-configuration only helps when classpath and conditions match expectations"
        ],
        "checkpoint": [
          "Why does adding a starter configure beans automatically?",
          "When do you choose @ConfigurationProperties over @Value?",
          "How do you debug why an auto-configured bean was not created?"
        ]
      }
    ],
    "grill": "You are a Senior Spring Boot Engineer interviewing a candidate.\n\nTOPIC: Spring Boot Fundamentals (Block 68)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Starters, auto-config, profiles, and config binding. 'Why did this bean appear?', 'where should this secret come from?', 'debug profile config'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "springboot-3",
    "phase": "Spring Boot",
    "chip": "springboot",
    "freq": "high",
    "title": "Spring Boot REST + Validation",
    "subtitle": "Controllers, DTOs, Bean Validation, exception handling, OpenAPI",
    "prereqs": [
      "springboot-2"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Exception Handling",
            "items": [
              "<b>@ControllerAdvice:</b> central exception handling across controllers.",
              "<b>@ExceptionHandler:</b> map exception types to HTTP responses.",
              "<b>Error shape:</b> consistent {code, message, details, correlationId} response.",
              "<b>Problem Details:</b> RFC 7807 style errors improve standardization."
            ]
          },
          {
            "heading": "OpenAPI + Contracts",
            "items": [
              "<b>springdoc-openapi:</b> generates OpenAPI docs from controllers and DTOs.",
              "<b>Schema names:</b> DTO class names become schema names. Avoid anonymous or overly generic types.",
              "<b>Security schemes:</b> document bearer JWT or OAuth2 flows.",
              "<b>Contract tests:</b> verify API behavior against generated contract or consumer expectations."
            ]
          }
        ],
        "traps": [
          "Global exception handlers can swallow important exceptions if too broad",
          "OpenAPI docs are only as correct as controller annotations and DTO types",
          "Returning entity IDs in error messages can leak internal data"
        ],
        "checkpoint": [
          "Design a global error response for validation and not-found errors.",
          "How do you document authentication in OpenAPI?",
          "What should never appear in an API error response?"
        ]
      }
    ],
    "grill": "You are a Senior Spring Boot Engineer interviewing a candidate.\n\nTOPIC: Spring Boot REST + Validation (Block 69)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: API design, validation, error handling, OpenAPI. 'Review this controller', 'design error responses', 'how do you version this API'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "springboot-4",
    "phase": "Spring Boot",
    "chip": "springboot",
    "freq": "high",
    "title": "Spring Boot Production Readiness",
    "subtitle": "Actuator, health checks, metrics, graceful shutdown, logging, config security",
    "prereqs": [
      "springboot-1",
      "springboot-2"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Metrics + Logging",
            "items": [
              "<b>Micrometer tags:</b> low-cardinality labels such as method, status, route. Avoid userId or requestId as metric tags.",
              "<b>Structured logging:</b> JSON logs with traceId, spanId, level, service, and correlation metadata.",
              "<b>Log levels:</b> INFO for normal operations, WARN for recoverable issues, ERROR for failures. DEBUG only when needed.",
              "<b>Log sampling:</b> reduce volume while keeping enough context for debugging."
            ]
          },
          {
            "heading": "Config Security",
            "items": [
              "<b>Secrets:</b> use Vault, Kubernetes Secrets, Parameter Store, or CI/CD secret injection.",
              "<b>Encryption at rest:</b> protect config stores and backups containing sensitive values.",
              "<b>Rotation:</b> design for credential rotation without redeploying when possible.",
              "<b>Audit:</b> track who changed production configuration."
            ]
          }
        ],
        "traps": [
          "High-cardinality metrics can exhaust Prometheus memory",
          "Logging secrets is a production incident, not a logging improvement",
          "Rotation fails if applications cache credentials forever"
        ],
        "checkpoint": [
          "Design Micrometer tags for an HTTP endpoint.",
          "What belongs in structured logs and what must be redacted?",
          "How do you rotate a database password safely?"
        ]
      }
    ],
    "grill": "You are a Senior Spring Boot Engineer interviewing a candidate.\n\nTOPIC: Spring Boot Production Readiness (Block 70)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production readiness, actuator security, metrics/logging, graceful shutdown. 'Actuator exposed secrets', 'service won't shut down', 'design health checks'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default springbootIntermediate;
