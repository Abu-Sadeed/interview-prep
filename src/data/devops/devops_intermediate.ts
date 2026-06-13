import type { Block } from '../../types/content';

export const devopsIntermediate: Block[] = [
  {
    "id": "devops-1",
    "phase": "DevOps",
    "chip": "infra",
    "freq": "high",
    "title": "Kubernetes — Core Concepts",
    "subtitle": "Pods, Deployments, Services, ConfigMaps, Secrets, Namespaces, kubectl basics",
    "prereqs": [
      "infra-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Networking + Ingress",
            "items": [
              "<b>Ingress:</b> HTTP/HTTPS routing into cluster. Path-based or host-based routing. Requires Ingress Controller (nginx-ingress, Traefik, AWS ALB).",
              "<b>Ingress vs Service LoadBalancer:</b> one LoadBalancer per Service = expensive. Ingress = one LB for all services, route by path/host.",
              "<b>ClusterDNS:</b> pods reach services by name: http://service-name.namespace.svc.cluster.local. Within same namespace: http://service-name.",
              "<b>NetworkPolicy:</b> firewall rules between pods. Default = allow all. Restrict ingress/egress per pod selector."
            ]
          },
          {
            "heading": "Resource Management",
            "items": [
              "<b>requests:</b> guaranteed resources. Used for scheduling decisions. Pod won't start if no node has enough.",
              "<b>limits:</b> maximum allowed. CPU throttled at limit. Memory OOM killed at limit.",
              "<b>Always set both requests and limits.</b> No requests = pod scheduled anywhere. No limits = pod can starve other pods.",
              "<b>QoS classes:</b> Guaranteed (requests=limits), Burstable (limits &gt; requests), BestEffort (no requests/limits). Guaranteed pods evicted last."
            ]
          }
        ],
        "traps": [
          "CPU throttling at limit causes slow response even when CPU is available — set CPU limits carefully or omit",
          "OOMKilled with no memory limit = pod using unbounded memory. Set limits.",
          "Not setting resource requests = scheduler has no data, places pods randomly = noisy neighbor problems"
        ],
        "checkpoint": [
          "What is the difference between resource requests and limits in Kubernetes?",
          "What is an Ingress and why use it instead of a LoadBalancer Service for every deployment?",
          "A pod is OOMKilled repeatedly. Walk me through diagnosing and fixing it."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a DevOps/Platform candidate.\n\nTOPIC: Kubernetes Core Concepts (Block 50)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production scenarios — 'pod is CrashLoopBackOff, diagnose it', 'deployment is stuck, what do you check', 'pod getting OOMKilled'. Test kubectl knowledge and Kubernetes mental model.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "devops-2",
    "phase": "DevOps",
    "chip": "infra",
    "freq": "med",
    "title": "Kubernetes — Production Patterns",
    "subtitle": "HPA, RBAC, StatefulSets, PersistentVolumes, service mesh basics, multi-tenancy",
    "prereqs": [
      "devops-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "RBAC + Security",
            "items": [
              "<b>RBAC:</b> Role + RoleBinding (namespace scope). ClusterRole + ClusterRoleBinding (cluster scope).",
              "<b>ServiceAccount:</b> identity for pods. Mounted as token. Used to call Kubernetes API from within pod.",
              "<b>Principle of least privilege:</b> default ServiceAccount has no permissions. Create specific SA with minimal Role.",
              "<b>Pod Security:</b> runAsNonRoot, readOnlyRootFilesystem, allowPrivilegeEscalation: false. Enforce via PodSecurityAdmission or OPA/Gatekeeper."
            ]
          },
          {
            "heading": "Multi-tenancy + Namespaces",
            "items": [
              "<b>Namespace-based isolation:</b> team A in namespace team-a, team B in namespace team-b. NetworkPolicy restricts cross-namespace traffic.",
              "<b>ResourceQuota:</b> limit total resources per namespace. Prevents one team consuming all cluster resources.",
              "<b>LimitRange:</b> set default requests/limits for pods in namespace. Ensures all pods have resource constraints.",
              "<b>Soft multi-tenancy:</b> namespaces + RBAC + NetworkPolicy. Hard multi-tenancy = separate clusters (fully isolated)."
            ]
          }
        ],
        "traps": [
          "RBAC Role is namespace-scoped — use ClusterRole for cluster-wide permissions",
          "Default ServiceAccount token is mounted automatically — disable if pod doesn't need API access (automountServiceAccountToken: false)",
          "ResourceQuota without LimitRange = pods without requests/limits still count as 0 toward quota"
        ],
        "checkpoint": [
          "What is the difference between Role and ClusterRole in Kubernetes RBAC?",
          "How would you prevent one team's workloads from consuming all cluster resources?",
          "A pod needs to read Secrets from the Kubernetes API. Walk me through the RBAC setup."
        ]
      }
    ],
    "grill": "You are a Senior DevOps/Platform Engineer interviewing a candidate.\n\nTOPIC: Kubernetes Production Patterns (Block 51)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production architecture decisions, security hardening, scaling challenges. 'Design the namespace strategy for a 10-team org', 'your HPA isn't scaling — diagnose it'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "devops-3",
    "phase": "DevOps",
    "chip": "infra",
    "freq": "high",
    "title": "CI/CD — GitHub Actions + Pipeline Design",
    "subtitle": "Pipeline stages, GitHub Actions syntax, secrets management, deployment strategies, rollback",
    "prereqs": [
      "infra-1",
      "frontend-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Deployment Strategies",
            "items": [
              "<b>Blue-Green:</b> two identical environments. Switch traffic from Blue to Green instantly. Easy rollback (switch back). Requires 2x infrastructure.",
              "<b>Canary:</b> route small % of traffic to new version. Monitor. Gradually increase. Rollback = reduce canary weight to 0.",
              "<b>Rolling (Kubernetes default):</b> replace pods one-by-one. Zero infrastructure cost. Rollback takes time. Mixed versions in-flight.",
              "<b>Feature flags:</b> deploy code without enabling feature. Enable per user/% rollout. Separate deployment from release."
            ]
          },
          {
            "heading": "Security in CI/CD",
            "items": [
              "<b>SAST (Static Application Security Testing):</b> scan source code. Semgrep, CodeQL, SonarQube.",
              "<b>SCA (Software Composition Analysis):</b> scan dependencies for CVEs. Dependabot, Snyk, OWASP dependency-check.",
              "<b>Container scanning:</b> Trivy, Grype — scan Docker images for CVEs before push.",
              "<b>Secret scanning:</b> detect hardcoded secrets before merge. GitHub Secret Scanning, trufflehog, gitleaks.",
              "<b>OIDC for cloud auth:</b> GitHub Actions → AWS/GCP/Azure without storing long-lived credentials. Federated identity."
            ]
          }
        ],
        "traps": [
          "Storing cloud credentials as GitHub secrets = long-lived credentials risk. Use OIDC federation instead.",
          "Canary deployment without monitoring = deploying blind. Must have metrics alerting before increasing canary %.",
          "Feature flags without cleanup = flag debt accumulates. Set expiry dates on feature flags."
        ],
        "checkpoint": [
          "What is the difference between blue-green and canary deployment? When would you use each?",
          "What is OIDC federation for GitHub Actions and why is it better than storing AWS credentials as secrets?",
          "Walk me through a complete CI/CD pipeline for a microservice from PR to production."
        ]
      }
    ],
    "grill": "You are a Senior DevOps Engineer interviewing a candidate.\n\nTOPIC: CI/CD — GitHub Actions + Pipeline Design (Block 52)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Pipeline design ('design CI/CD for this system'), security ('I see you store AWS keys as secrets — problem?'), incident scenarios ('production deploy failed halfway through — what now').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "devops-4",
    "phase": "DevOps",
    "chip": "infra",
    "freq": "med",
    "title": "Terraform — IaC Fundamentals",
    "subtitle": "HCL syntax, state management, modules, plan/apply workflow, best practices",
    "prereqs": [
      "cloud-2"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Remote State + Modules",
            "items": [
              "<b>Remote backend (S3 + DynamoDB):</b> shared state file in S3. DynamoDB for state locking (prevents concurrent applies). Enable versioning on S3 bucket.",
              "<b>Modules:</b> reusable Terraform configuration. Input variables, output values. DRY principle. Call module: <code>module 'vpc' { source = './modules/vpc' }</code>",
              "<b>Variables:</b> var.region, tfvars files, environment variables (TF_VAR_region). Sensitive = true for secrets (masked in output).",
              "<b>Outputs:</b> expose values from module/root. Reference with module.vpc.vpc_id.",
              "<b>Data sources:</b> read existing infrastructure. <code>data 'aws_ami' 'ubuntu' { ... }</code> — fetch latest AMI without hardcoding."
            ]
          },
          {
            "heading": "Workspaces + Environments",
            "items": [
              "<b>Workspaces:</b> multiple state files from same config. terraform workspace new staging. Separate state per environment.",
              "<b>Workspace vs directories:</b> separate directories (dev/, staging/, prod/) is cleaner for environments with different configs. Workspaces for identical configs with different state.",
              "<b>Terragrunt:</b> thin wrapper around Terraform. DRY backend config, dependency management, remote state references across modules."
            ]
          }
        ],
        "traps": [
          "Remote state without locking = concurrent applies corrupt state — always use DynamoDB locking with S3 backend",
          "Sensitive variables marked sensitive=true still appear in state file — encrypt state at rest (S3 SSE)",
          "Module versions not pinned = upstream module change breaks your infra — always pin module versions"
        ],
        "checkpoint": [
          "Why do you need DynamoDB alongside S3 for Terraform remote state?",
          "When would you use Terraform workspaces vs separate directories for environments?",
          "Walk me through creating a reusable VPC module in Terraform."
        ]
      }
    ],
    "grill": "You are a Senior DevOps Engineer interviewing a Terraform candidate.\n\nTOPIC: Terraform IaC Fundamentals (Block 55)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical scenarios — 'your team's Terraform state is corrupted — what happened and how do you recover', 'how do you structure Terraform for 5 environments', 'teammate applied and broke prod — what controls prevent this'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "devops-5",
    "phase": "DevOps",
    "chip": "infra",
    "freq": "med",
    "title": "Observability — Prometheus, Grafana, Alerting",
    "subtitle": "Metrics, logs, traces — the three pillars, Prometheus internals, Grafana dashboards, alert design",
    "prereqs": [
      "devops-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Grafana + Alerting",
            "items": [
              "<b>Grafana:</b> visualisation layer. Connects to Prometheus, Loki (logs), Tempo (traces), CloudWatch, Datadog etc.",
              "<b>Dashboard design:</b> USE method (Utilisation, Saturation, Errors) for resources. RED method (Rate, Errors, Duration) for services.",
              "<b>Alerting principles:</b> alert on symptoms (user-facing impact) not causes. 'Error rate > 1%' not 'CPU > 80%'.",
              "<b>Alert fatigue:</b> too many alerts → engineers ignore them all. Only page on things requiring immediate human action.",
              "<b>Alertmanager:</b> routes Prometheus alerts to Slack, PagerDuty, email. Grouping, inhibition, silencing."
            ]
          },
          {
            "heading": "Loki + Structured Logging",
            "items": [
              "<b>Loki:</b> log aggregation, indexes labels only (not log content). Cheap. Query with LogQL.",
              "<b>Structured logging:</b> JSON logs with consistent fields. {level:'error', service:'api', trace_id:'abc', message:'DB timeout'}.",
              "<b>Log levels:</b> ERROR (page someone), WARN (investigate), INFO (normal ops), DEBUG (development only). Don't log DEBUG in production.",
              "<b>Correlation:</b> trace_id in every log line links logs to distributed traces. requestId in every API log links to incoming request."
            ]
          }
        ],
        "traps": [
          "Alerting on CPU > 80% is a cause not symptom — users don't care about CPU, they care about slow responses",
          "Logging sensitive data (passwords, PII, tokens) in application logs = compliance violation",
          "DEBUG logging in production = massive log volume = high storage cost + performance impact"
        ],
        "checkpoint": [
          "What is the RED method for service monitoring? What metrics does it cover?",
          "Design an alerting strategy for an API service. What do you alert on and what do you not?",
          "What is the difference between Prometheus and Loki? When do you use each?"
        ]
      }
    ],
    "grill": "You are a Senior SRE/DevOps Engineer interviewing a candidate.\n\nTOPIC: Observability — Prometheus, Grafana, Alerting (Block 56)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Monitoring design scenarios ('design observability for this microservice'), alert critique ('what is wrong with this alert rule'), SLO concepts ('calculate the error budget for this SLO').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "devops-6",
    "phase": "DevOps",
    "chip": "infra",
    "freq": "med",
    "title": "Nginx — Reverse Proxy + Load Balancing",
    "subtitle": "Reverse proxy config, load balancing, SSL termination, caching, WebSocket, rate limiting",
    "prereqs": [
      "api-2"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "SSL + WebSocket + Caching",
            "items": [
              "<b>SSL termination:</b> Nginx handles HTTPS, backends use HTTP. Certificate at Nginx only. listen 443 ssl; ssl_certificate; ssl_certificate_key.",
              "<b>Let's Encrypt + Certbot:</b> free SSL certificates. Certbot auto-renews. Certbot --nginx for automatic config.",
              "<b>WebSocket proxy:</b> <code>proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade';</code> Without this: 60s timeout.",
              "<b>Nginx caching:</b> proxy_cache_path, proxy_cache, proxy_cache_valid. Cache static assets at Nginx layer. Bypass cache with proxy_cache_bypass."
            ]
          },
          {
            "heading": "Rate Limiting + Security",
            "items": [
              "<b>Rate limiting:</b> limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s. limit_req zone=api burst=20 nodelay.",
              "<b>limit_req burst:</b> allow burst above rate, queue up to burst, nodelay = serve burst immediately without queueing.",
              "<b>Return 444:</b> silently close connection with no response. For malicious clients.",
              "<b>deny/allow:</b> whitelist/blacklist IPs. deny all except allow specific IPs. Good for internal admin paths."
            ]
          }
        ],
        "traps": [
          "WebSocket behind Nginx drops after 60s without upgrade headers — always add proxy_http_version 1.1 and Upgrade headers",
          "proxy_cache caches 301/302 redirects — set proxy_cache_valid to not cache redirects",
          "limit_req without burst = even small traffic spikes hit 503 — always configure burst"
        ],
        "checkpoint": [
          "What Nginx config enables WebSocket proxying and what breaks without it?",
          "Design a rate limiting config that allows 10 req/s normally but allows bursts of 50.",
          "How do you configure SSL termination in Nginx with Let's Encrypt?"
        ]
      }
    ],
    "grill": "You are a Senior DevOps Engineer interviewing a candidate on Nginx.\n\nTOPIC: Nginx Reverse Proxy + Load Balancing (Block 57)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Config review ('what is wrong with this Nginx config'), production issues ('WebSocket connections drop after 60 seconds'), and design ('configure Nginx for a high-traffic API with rate limiting and SSL').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "devops-7",
    "phase": "DevOps",
    "chip": "infra",
    "freq": "med",
    "title": "Docker Compose + Local Development",
    "subtitle": "Local stacks, env files, healthchecks, volumes, dev/prod parity",
    "prereqs": [
      "infra-1"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Healthchecks",
            "items": [
              "<b>Container healthcheck:</b> command inside container reports healthy/unhealthy.",
              "<b>depends_on.condition:</b> wait for service_healthy before starting dependents.",
              "<b>Startup probes:</b> slow apps need enough time before unhealthy restarts.",
              "<b>Readiness vs liveness:</b> readiness controls traffic; liveness controls restarts."
            ]
          },
          {
            "heading": "Dev/Prod Parity",
            "items": [
              "<b>Same image:</b> build once, run with different config. Avoid dev-only Dockerfiles when possible.",
              "<b>Local mounts:</b> speed development but can hide packaging issues.",
              "<b>Seed data:</b> deterministic fixtures for local testing.",
              "<b>Migration workflow:</b> run migrations in controlled local jobs, not ad hoc container shells."
            ]
          }
        ],
        "traps": [
          "Healthcheck that always succeeds gives false readiness",
          "Local bind mounts can hide missing files in production images",
          "Dev/prod parity is a spectrum; document intentional differences"
        ],
        "checkpoint": [
          "Design healthchecks for API, worker, and database.",
          "How do you keep local Compose close to production?",
          "What local differences are acceptable?"
        ]
      }
    ],
    "grill": "You are a Senior DevOps Engineer interviewing a candidate.\n\nTOPIC: Docker Compose + Local Development (Block 84)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Local stack design, healthchecks, env files, dev/prod parity. 'App starts before DB ready', 'secrets in .env', 'CI integration with Compose'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "devops-8",
    "phase": "DevOps",
    "chip": "infra",
    "freq": "high",
    "title": "CI/CD Security + Release Engineering",
    "subtitle": "OIDC, approvals, rollback, artifacts, provenance",
    "prereqs": [
      "devops-3",
      "devops-4"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Release Gates",
            "items": [
              "<b>Approvals:</b> manual gates for production or high-risk environments.",
              "<b>Environments:</b> separate dev, staging, production with protection rules.",
              "<b>Rollback:</b> previous artifact, database migration rollback plan, feature flag kill switch.",
              "<b>Smoke tests:</b> quick production checks after deploy before declaring success."
            ]
          },
          {
            "heading": "Provenance",
            "items": [
              "<b>SBOM:</b> software bill of materials lists dependencies and versions.",
              "<b>Sigstore/cosign:</b> sign images and verify provenance in deployment.",
              "<b>Supply chain:</b> pin actions, scan dependencies, isolate untrusted PR workflows.",
              "<b>Audit trail:</b> who approved, what artifact, which commit, which environment."
            ]
          }
        ],
        "traps": [
          "Approvals without rollback runbooks slow incidents",
          "Pinned actions still need vulnerability monitoring",
          "Fork PR workflows must not receive production secrets"
        ],
        "checkpoint": [
          "Design a production deployment gate.",
          "What belongs in release provenance?",
          "How do you secure workflows for forked pull requests?"
        ]
      }
    ],
    "grill": "You are a Senior DevOps/Platform Engineer interviewing a candidate.\n\nTOPIC: CI/CD Security + Release Engineering (Block 85)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: OIDC, approvals, rollback, artifacts, provenance. 'CI secrets leaked', 'production deploy failed', 'design progressive delivery'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default devopsIntermediate;
