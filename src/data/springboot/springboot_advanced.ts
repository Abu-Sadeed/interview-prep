import type { Block } from '../../types/content';

export const springbootAdvanced: Block[] = [
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

export default springbootAdvanced;
