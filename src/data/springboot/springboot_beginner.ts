import type { Block } from '../../types/content';

export const springbootBeginner: Block[] = [
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
      }
    ],
    "grill": "You are a Senior Spring Boot Engineer interviewing a candidate.\n\nTOPIC: Spring Boot Production Readiness (Block 70)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production readiness, actuator security, metrics/logging, graceful shutdown. 'Actuator exposed secrets', 'service won't shut down', 'design health checks'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default springbootBeginner;
