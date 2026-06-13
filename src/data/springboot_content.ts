import type { Block } from '../types/content';

export const springbootContent: Block[] = [
  {
    "id": 17,
    "phase": "Spring Boot",
    "chip": "springboot",
    "freq": "med",
    "title": "Spring Boot — Production Patterns",
    "subtitle": "Actuator, circuit breakers, @Async, AOP internals, profiles, config management",
    "prereqs": [
      9
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Actuator",
            "items": [
              "<b>Spring Boot Actuator:</b> production-ready monitoring endpoints built in.",
              "<b>Key endpoints:</b> /actuator/health, /actuator/metrics, /actuator/env, /actuator/loggers (change log levels at runtime), /actuator/threaddump, /actuator/heapdump.",
              "<b>Security:</b> expose only /health publicly. Secure all others behind auth or restrict to internal network.",
              "<b>Custom HealthIndicator:</b> implement bean, return Health.up() or Health.down(withDetail(...)).",
              "<b>Kubernetes:</b> /health/liveness (app alive?) and /health/readiness (can accept traffic?) — configure separately in Spring Boot 2.3+."
            ]
          },
          {
            "heading": "Profiles + Configuration",
            "items": [
              "<b>application-{profile}.yml overrides application.yml.</b> Activate via SPRING_PROFILES_ACTIVE env var.",
              "<b>@Profile('prod') on @Bean:</b> only active when that profile is active.",
              "<b>@Value:</b> inject single property. <code>@Value('${server.port:8080}')</code> with default.",
              "<b>@ConfigurationProperties:</b> bind entire config prefix to POJO. Type-safe, IDE completion, validation. Prefer over @Value for groups of related config."
            ]
          }
        ],
        "traps": [
          "Not securing actuator endpoints exposes internal system information and configuration",
          "@Value injection into static fields doesn't work — Spring can't inject into static context",
          "application-prod.yml properties override application.yml — don't duplicate, only override what differs"
        ],
        "checkpoint": [
          "What is the difference between /health/liveness and /health/readiness for Kubernetes?",
          "Why prefer @ConfigurationProperties over @Value?",
          "How do you change the log level of a specific package at runtime without restarting?"
        ]
      },
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
      },
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "AOP Deep Dive",
            "items": [
              "<b>@Around is most powerful:</b> controls whether original method runs via ProceedingJoinPoint.proceed(). Used by @Transactional, @Cacheable, @CircuitBreaker.",
              "<b>Pointcut expressions:</b> execution(* com.example.service.*.*(..)) — all service methods. @annotation(Transactional) — annotated methods.",
              "<b>Proxy limitations:</b> final classes/methods can't be proxied by CGLIB. Private methods can't be advised. Self-invocation bypasses proxy.",
              "<b>Custom annotation with AOP:</b> @interface + @Aspect + @Around pointing to annotation. Clean cross-cutting concern implementation."
            ]
          }
        ],
        "traps": [
          "@Around must call proceed() or the original method never runs — silent no-op",
          "@Cacheable + @Transactional on same method — cache check happens before transaction opens",
          "AOP on final classes throws BeanCreationException — must use interface-based proxy"
        ],
        "checkpoint": [
          "Write a custom @ExecutionTime annotation that logs method execution time. Describe the aspect implementation.",
          "What is the order of Spring AOP aspects and how do you control it?",
          "@Cacheable + @Transactional on same method — in what order do they execute?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a Spring Boot candidate.\n\nTOPIC: Spring Boot Production Patterns (Block 17)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production scenarios only — 'circuit breaker isn't opening', 'async jobs silently failing', 'add rate limiting without changing controllers', 'service taking down entire JVM when downstream is slow'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 68,
    "phase": "Spring Boot",
    "chip": "springboot",
    "freq": "high",
    "title": "Spring Boot Fundamentals",
    "subtitle": "Starters, auto-configuration, profiles, config binding, externalized config",
    "prereqs": [
      9
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Starters + Bootstrap",
            "items": [
              "<b>Spring Boot starters:</b> curated dependency bundles such as spring-boot-starter-web, data-jpa, security, test.",
              "<b>@SpringBootApplication:</b> @Configuration, @ComponentScan, and @EnableAutoConfiguration in one annotation.",
              "<b>Main method:</b> SpringApplication.run loads context, refreshes beans, and starts embedded server.",
              "<b>Embedded server:</b> Tomcat by default for web apps. Jetty or Undertow can replace it."
            ]
          },
          {
            "heading": "Externalized Configuration",
            "items": [
              "<b>Property sources:</b> defaults, application.yml, profiles, environment variables, command-line args.",
              "<b>application-{profile}.yml:</b> overrides base config when profile is active.",
              "<b>Environment variables:</b> SPRING_DATASOURCE_URL maps to spring.datasource.url. Safe for container deployment.",
              "<b>Config import:</b> import optional config files or Config Server properties with spring.config.import."
            ]
          }
        ],
        "traps": [
          "Command-line args and environment variables can override application.yml unexpectedly",
          "Profiles change behavior; document which profile is deployed",
          "Do not commit secrets in application-prod.yml"
        ],
        "checkpoint": [
          "What does @SpringBootApplication combine?",
          "How do environment variables override YAML properties?",
          "What is the difference between dev and prod profiles?"
        ]
      },
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
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Custom Auto-Configuration",
            "items": [
              "<b>AutoConfiguration class:</b> @Configuration with @Conditional annotations. Register with spring.factories or new imports file depending on Boot version.",
              "<b>Custom starter:</b> starter dependency plus auto-configuration module. Keep defaults overrideable.",
              "<b>Bean ordering:</b> @AutoConfigureBefore/After controls ordering relative to other auto-configurations.",
              "<b>Testing slices:</b> @SpringBootTest, @WebMvcTest, @DataJpaTest load only relevant slices."
            ]
          },
          {
            "heading": "Production Configuration",
            "items": [
              "<b>Secrets:</b> inject from Vault, Kubernetes Secrets, Parameter Store, or CI/CD secrets.",
              "<b>Config drift:</b> compare effective config between environments during deployment.",
              "<b>Feature flags:</b> separate deploy from release with externalized toggles.",
              "<b>Immutable images:</b> prefer runtime config via env/secrets, not rebuilding images per environment."
            ]
          }
        ],
        "traps": [
          "Custom starters can hide important dependencies and conditions from application teams",
          "Profile-specific config can diverge silently if not reviewed",
          "Secrets in environment variables are still visible to processes with access"
        ],
        "checkpoint": [
          "Design a custom starter for an internal HTTP client.",
          "How do you keep prod config secure and auditable?",
          "What conditions make an auto-configured bean back off?"
        ]
      }
    ],
    "grill": "You are a Senior Spring Boot Engineer interviewing a candidate.\n\nTOPIC: Spring Boot Fundamentals (Block 68)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Starters, auto-config, profiles, and config binding. 'Why did this bean appear?', 'where should this secret come from?', 'debug profile config'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 69,
    "phase": "Spring Boot",
    "chip": "springboot",
    "freq": "high",
    "title": "Spring Boot REST + Validation",
    "subtitle": "Controllers, DTOs, Bean Validation, exception handling, OpenAPI",
    "prereqs": [
      68
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Controllers + DTOs",
            "items": [
              "<b>@RestController:</b> combines @Controller and @ResponseBody. Return values serialize to JSON.",
              "<b>Request mapping:</b> @GetMapping, @PostMapping, path variables, query params, request bodies.",
              "<b>DTOs:</b> use request/response DTOs instead of exposing entities directly.",
              "<b>ResponseEntity:</b> control status, headers, and body when default serialization is not enough."
            ]
          },
          {
            "heading": "Bean Validation",
            "items": [
              "<b>@Valid or @Validated:</b> trigger validation on controller method arguments.",
              "<b>Common constraints:</b> @NotNull, @NotBlank, @Size, @Email, @Pattern, @Min, @Max.",
              "<b>Nested validation:</b> @Valid on nested DTO fields. Lists validate each element.",
              "<b>Validation groups:</b> different constraints for create vs update flows."
            ]
          }
        ],
        "traps": [
          "Entity exposure leaks persistence details and can create serialization loops",
          "@Valid on a plain object without @RequestBody or nested field does nothing",
          "Validation errors return 400 only if exception handling is configured"
        ],
        "checkpoint": [
          "Why use DTOs for REST APIs?",
          "How do you validate a nested request body?",
          "What status code should invalid input return?"
        ]
      },
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
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "API Design Trade-offs",
            "items": [
              "<b>Versioning:</b> URI, header, media type, or backwards-compatible evolution. Choose based on clients and tooling.",
              "<b>Idempotency:</b> PUT and DELETE are idempotent; POST usually is not unless designed with idempotency keys.",
              "<b>Pagination:</b> page/size for simple APIs, cursor pagination for large or changing datasets.",
              "<b>Partial updates:</b> PATCH requires merge semantics and clear validation rules."
            ]
          },
          {
            "heading": "Hardening",
            "items": [
              "<b>Request size limits:</b> configure max request size to prevent large payload attacks.",
              "<b>Content negotiation:</b> produce/consume media types explicitly when clients vary.",
              "<b>Audit logging:</b> log request metadata without sensitive bodies.",
              "<b>Rate limiting:</b> protect expensive endpoints and authentication flows."
            ]
          }
        ],
        "traps": [
          "URI versioning is simple but can create long-lived duplicate routes",
          "PATCH without documented merge rules causes client confusion",
          "Logging request bodies can expose tokens, PII, and secrets"
        ],
        "checkpoint": [
          "How would you version a public API?",
          "Design cursor pagination for a feed endpoint.",
          "What controls prevent abusive API payloads?"
        ]
      }
    ],
    "grill": "You are a Senior Spring Boot Engineer interviewing a candidate.\n\nTOPIC: Spring Boot REST + Validation (Block 69)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: API design, validation, error handling, OpenAPI. 'Review this controller', 'design error responses', 'how do you version this API'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 70,
    "phase": "Spring Boot",
    "chip": "springboot",
    "freq": "high",
    "title": "Spring Boot Production Readiness",
    "subtitle": "Actuator, health checks, metrics, graceful shutdown, logging, config security",
    "prereqs": [
      17,
      68
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Actuator Endpoints",
            "items": [
              "<b>Health:</b> /actuator/health reports liveness/readiness and dependency checks.",
              "<b>Metrics:</b> /actuator/metrics exposes Micrometer metrics for Prometheus or other systems.",
              "<b>Info/env/loggers:</b> useful for diagnostics but sensitive. Expose carefully.",
              "<b>Endpoint exposure:</b> expose health/info publicly; protect env/heapdump/threaddump."
            ]
          },
          {
            "heading": "Graceful Shutdown",
            "items": [
              "<b>server.shutdown=graceful:</b> stops accepting new requests and drains in-flight requests.",
              "<b>Kubernetes:</b> SIGTERM gives terminationGracePeriodSeconds to finish work.",
              "<b>Readiness:</b> mark not ready before shutdown so load balancers stop sending traffic.",
              "<b>Thread pools:</b> configure shutdown timeout for executors and messaging listeners."
            ]
          }
        ],
        "traps": [
          "Public actuator env endpoint can leak secrets and configuration",
          "Graceful shutdown does not fix code that ignores interruption",
          "Liveness and readiness should not be the same in all cases"
        ],
        "checkpoint": [
          "Which actuator endpoints should be public?",
          "What happens during Kubernetes graceful shutdown?",
          "Why separate liveness from readiness?"
        ]
      },
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
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Operational Hardening",
            "items": [
              "<b>Health indicators:</b> custom indicators for queues, downstream APIs, and feature-specific readiness.",
              "<b>Startup probes:</b> give slow-starting JVM apps time before liveness restarts them.",
              "<b>Shutdown hooks:</b> stop schedulers, close consumers, flush buffers, and release locks.",
              "<b>Config validation:</b> fail fast on missing required properties at startup."
            ]
          },
          {
            "heading": "Incident Readiness",
            "items": [
              "<b>Runbooks:</b> document actuator commands, log queries, rollback steps, and escalation paths.",
              "<b>Feature flags:</b> disable risky features without redeploying.",
              "<b>Canary checks:</b> compare health, metrics, and logs before increasing traffic.",
              "<b>Post-incident:</b> preserve logs, metrics, thread dumps, and configuration snapshots."
            ]
          }
        ],
        "traps": [
          "A health endpoint that always returns up hides real failures",
          "Fail-fast config is better than mysterious runtime behavior",
          "Runbooks without ownership become stale quickly"
        ],
        "checkpoint": [
          "Design readiness checks for a service with Kafka and Postgres.",
          "What should graceful shutdown do for background workers?",
          "How do you make production config failures fail fast?"
        ]
      }
    ],
    "grill": "You are a Senior Spring Boot Engineer interviewing a candidate.\n\nTOPIC: Spring Boot Production Readiness (Block 70)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production readiness, actuator security, metrics/logging, graceful shutdown. 'Actuator exposed secrets', 'service won't shut down', 'design health checks'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default springbootContent;
