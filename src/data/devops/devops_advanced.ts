import type { Block } from '../../types/content';

export const devopsAdvanced: Block[] = [
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
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Health Probes + Rolling Updates",
            "items": [
              "<b>Liveness probe:</b> is container alive? Fail = restart container. For detecting deadlocks.",
              "<b>Readiness probe:</b> is container ready for traffic? Fail = remove from Service endpoints. For startup and temporary unavailability.",
              "<b>Startup probe:</b> for slow-starting containers. Disables liveness until startup probe passes. Prevents restart during long JVM startup.",
              "<b>Rolling update strategy:</b> maxSurge (extra pods during update), maxUnavailable (pods allowed down during update). Zero-downtime: maxUnavailable=0.",
              "<b>PodDisruptionBudget (PDB):</b> minimum available pods during voluntary disruption (node drain, upgrade). Required for production availability."
            ]
          }
        ],
        "traps": [
          "Liveness probe failing during startup causes infinite restart loop — use startupProbe for slow-starting apps",
          "Readiness probe not configured = pod receives traffic before app is ready = 502 errors during rollout",
          "maxUnavailable=0 + maxSurge=0 = deployment stuck (no pods can be updated) — always set at least one"
        ],
        "checkpoint": [
          "What is the difference between liveness and readiness probes? When does each cause action?",
          "Why do you need a startup probe for Java applications in Kubernetes?",
          "Design a zero-downtime rolling update strategy for a stateless web service."
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Operators + Advanced Patterns",
            "items": [
              "<b>Kubernetes Operator:</b> extends Kubernetes with custom resources (CRD). Controller loop watches resources, reconciles state. Examples: cert-manager, Strimzi (Kafka), Prometheus Operator.",
              "<b>CRD (Custom Resource Definition):</b> define your own Kubernetes object types. Operator manages their lifecycle.",
              "<b>Helm:</b> package manager for Kubernetes. Chart = templated manifests. values.yaml overrides. helm upgrade --install for idempotent deploys.",
              "<b>GitOps (ArgoCD, Flux):</b> Git as single source of truth. Controller syncs cluster state to Git. Drift detection and auto-remediation."
            ]
          }
        ],
        "traps": [
          "Helm chart updates without --atomic can leave cluster in partially-upgraded state — use --atomic for rollback on failure",
          "GitOps controllers need cluster-admin access — scope permissions carefully or use multi-tenant ArgoCD",
          "CRD versioning: removing fields from CRD schema can break existing resources — use deprecation and migration"
        ],
        "checkpoint": [
          "What is a Kubernetes Operator and what problem does it solve over plain Deployments?",
          "What is GitOps and how is it different from running kubectl apply in CI?",
          "Walk me through deploying a Helm chart with zero-downtime and automatic rollback on failure."
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Advanced Pipeline Patterns",
            "items": [
              "<b>Reusable workflows:</b> workflow_call trigger. Call from other workflows. DRY principle for CI.",
              "<b>Matrix builds:</b> test across multiple versions/OSes simultaneously. matrix: node: [18, 20, 22].",
              "<b>Environment protection rules:</b> required reviewers, wait timer before deploying to production. Manual gates.",
              "<b>Durable deployments:</b> idempotent deploy scripts. Deploy same version twice = same result. Helm --atomic. Terraform plan before apply.",
              "<b>Deployment rollback strategy:</b> automatic (health check fails → rollback), manual trigger, previous image tag always available."
            ]
          }
        ],
        "traps": [
          "Matrix builds multiply runner minutes — expensive for private repos. Only matrix what you must.",
          "Environment protection rules require GitHub Environments configured — not the default setup",
          "Terraform apply in CI without state locking = concurrent applies corrupt state — use remote backend with locking (S3 + DynamoDB)"
        ],
        "checkpoint": [
          "What are reusable workflows in GitHub Actions and when would you use them?",
          "How do you implement automatic rollback in a Kubernetes-based CI/CD pipeline?",
          "What is Terraform state locking and why is it critical in CI/CD?"
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Production Terraform Practices",
            "items": [
              "<b>Import existing resources:</b> terraform import aws_instance.web i-1234567890. Bring unmanaged infra under Terraform control.",
              "<b>Lifecycle rules:</b> create_before_destroy (zero-downtime replacement), prevent_destroy (protect critical resources), ignore_changes (for externally managed attributes).",
              "<b>Atlantis / Terraform Cloud:</b> PR-based Terraform workflow. Plan on PR open, apply on merge. Audit trail, access control.",
              "<b>Policy as code (Sentinel/OPA):</b> enforce policies before terraform apply. 'All S3 buckets must have encryption enabled'. Prevents misconfiguration."
            ]
          }
        ],
        "traps": [
          "create_before_destroy requires no naming conflicts — if name is fixed (not random), new resource creation fails",
          "terraform import only imports state — does not generate HCL. Must write resource config manually first.",
          "prevent_destroy blocks terraform destroy but not manual deletion via console — it's a Terraform guardrail only"
        ],
        "checkpoint": [
          "What does create_before_destroy do and when do you need it?",
          "I have existing AWS infrastructure not managed by Terraform. How do I bring it under Terraform control?",
          "What is policy-as-code in Terraform context and why does it matter?"
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "SLOs + Error Budgets",
            "items": [
              "<b>SLI (Service Level Indicator):</b> metric measuring service quality. Request success rate, p99 latency.",
              "<b>SLO (Service Level Objective):</b> target for SLI. 99.9% availability, p99 latency &lt;200ms.",
              "<b>SLA (Service Level Agreement):</b> contractual commitment with consequences. Based on SLOs.",
              "<b>Error budget:</b> 1 - SLO. 99.9% availability = 0.1% error budget = 43.8 min/month downtime allowed.",
              "<b>Error budget policy:</b> when budget exhausted: freeze non-critical features, focus on reliability. When budget healthy: ship features fast."
            ]
          }
        ],
        "traps": [
          "SLO too high (99.999%) = zero error budget = no deployments possible. Balance reliability with velocity.",
          "Measuring availability as uptime not success rate misses partial outages (service up but returning 500s)",
          "Error budget resets monthly — an exhausted budget doesn't carry over penalties"
        ],
        "checkpoint": [
          "What is the relationship between SLI, SLO, and SLA?",
          "What is an error budget and how does it change engineering decisions?",
          "My service's SLO is 99.9% availability. How much downtime is that per month? Per year?"
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
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "Performance Tuning",
            "items": [
              "<b>worker_processes auto:</b> one worker per CPU core. <b>worker_connections 1024:</b> per worker. Total connections = workers * worker_connections.",
              "<b>keepalive:</b> upstream keepalive connections. keepalive 64; in upstream block — reuse connections to backends (reduce TCP overhead).",
              "<b>sendfile on:</b> serve static files via kernel (zero-copy). Huge performance gain for static file serving.",
              "<b>gzip compression:</b> gzip on; gzip_types text/plain application/json. Reduce response size.",
              "<b>access_log off:</b> for high-traffic static assets. Log is I/O bottleneck at scale. Or buffer: access_log /path buffer=32k."
            ]
          }
        ],
        "traps": [
          "worker_connections is per worker not total — total = worker_processes * worker_connections",
          "keepalive upstream requires proxy_http_version 1.1 and proxy_set_header Connection '' — without this keepalive doesn't work",
          "gzip on text/html only by default — must specify gzip_types for JSON, CSS, JS"
        ],
        "checkpoint": [
          "How do you calculate maximum concurrent connections in Nginx?",
          "What is upstream keepalive and why does it improve performance?",
          "Your Nginx is CPU-bound serving static files. What is the most impactful config change?"
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
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "Operational Local Stacks",
            "items": [
              "<b>Observability:</b> optional Prometheus/Grafana/Loki profiles for local debugging.",
              "<b>Resource limits:</b> cap memory/CPU for local services to protect developer machines.",
              "<b>Multi-project names:</b> COMPOSE_PROJECT_NAME avoids network and volume collisions.",
              "<b>CI Compose:</b> use Compose in CI for integration tests with Testcontainers-like behavior."
            ]
          },
          {
            "heading": "Security",
            "items": [
              "<b>Secrets:</b> use Docker secrets or external secret injection for shared local secrets.",
              "<b>Network exposure:</b> bind admin ports to 127.0.0.1 when not needed externally.",
              "<b>Image scanning:</b> scan local images before pushing or deploying.",
              "<b>Cleanup:</b> prune old images/volumes without deleting important data accidentally."
            ]
          }
        ],
        "traps": [
          "Local admin UIs exposed on 0.0.0.0 can be reachable on shared networks",
          "Prune commands can delete databases if volumes are mislabeled",
          "CI Compose tests must reset state between runs"
        ],
        "checkpoint": [
          "Design a local stack with API, DB, Redis, and observability.",
          "How do you safely share local secrets?",
          "What Compose settings prevent project collisions?"
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Release Strategy",
            "items": [
              "<b>Blue-green:</b> instant switch with easy rollback, higher infra cost.",
              "<b>Canary:</b> gradual traffic shift with metrics-driven promotion.",
              "<b>Feature flags:</b> separate deploy from release and enable fast kill switches.",
              "<b>Progressive delivery:</b> combine canary, automated analysis, and rollback."
            ]
          },
          {
            "heading": "Incident Safety",
            "items": [
              "<b>Freeze:</b> stop non-critical deploys during incidents.",
              "<b>Rollback criteria:</b> define error rate, latency, business metric thresholds.",
              "<b>Post-deploy verification:</b> synthetic checks, logs, traces, and user-impact metrics.",
              "<b>Blameless review:</b> improve pipeline controls after failed releases."
            ]
          }
        ],
        "traps": [
          "Canary without metrics is just slow deployment",
          "Feature flags need ownership and expiration",
          "Rollback can fail if schema migrations are not backward compatible"
        ],
        "checkpoint": [
          "Design progressive delivery for a critical service.",
          "What rollback criteria trigger automatic rollback?",
          "How do schema migrations affect release safety?"
        ]
      }
    ],
    "grill": "You are a Senior DevOps/Platform Engineer interviewing a candidate.\n\nTOPIC: CI/CD Security + Release Engineering (Block 85)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: OIDC, approvals, rollback, artifacts, provenance. 'CI secrets leaked', 'production deploy failed', 'design progressive delivery'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default devopsAdvanced;
