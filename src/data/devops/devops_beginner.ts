import type { Block } from '../../types/content';

export const devopsBeginner: Block[] = [
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
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "Core Objects",
            "items": [
              "<b>Pod:</b> smallest deployable unit. One or more containers sharing network namespace and storage. Ephemeral — don't attach to specific pods.",
              "<b>Deployment:</b> manages ReplicaSet. Desired state declaration. Handles rolling updates, rollbacks. Always use Deployment, not bare Pod.",
              "<b>Service:</b> stable network endpoint for pods. Types: ClusterIP (internal only), NodePort (exposes on node port), LoadBalancer (cloud LB), ExternalName.",
              "<b>Namespace:</b> virtual cluster. Resource isolation. Default namespace for unspecified resources. kube-system for cluster components.",
              "<b>ConfigMap:</b> non-sensitive config. Mounted as env vars or volume files. <b>Secret:</b> sensitive data (base64 encoded — NOT encrypted by default). Use external secrets manager in production."
            ]
          },
          {
            "heading": "kubectl Essentials",
            "items": [
              "<code>kubectl get pods -n namespace</code> — list pods. <code>kubectl describe pod name</code> — events and status.",
              "<code>kubectl logs pod-name -f</code> — follow logs. <code>kubectl logs pod-name -c container-name</code> — specific container.",
              "<code>kubectl exec -it pod-name -- /bin/sh</code> — shell into container.",
              "<code>kubectl apply -f manifest.yaml</code> — apply config. <code>kubectl rollout status deployment/name</code> — watch rollout.",
              "<code>kubectl rollout undo deployment/name</code> — rollback to previous version."
            ]
          }
        ],
        "traps": [
          "Kubernetes Secrets are base64 encoded not encrypted — anyone with cluster access can read them. Use Vault or external-secrets-operator.",
          "Bare Pods are not rescheduled if node fails — always use Deployment",
          "ClusterIP is not accessible from outside the cluster — use Ingress or LoadBalancer for external traffic"
        ],
        "checkpoint": [
          "What is the difference between a Pod and a Deployment?",
          "Kubernetes Secrets are secure by default. True or false? Explain.",
          "How do you debug a pod that is stuck in CrashLoopBackOff?"
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Auto-scaling + Storage",
            "items": [
              "<b>HPA (Horizontal Pod Autoscaler):</b> scale pods based on CPU/memory/custom metrics. Requires metrics-server. Min/max replicas + target CPU%.",
              "<b>VPA (Vertical Pod Autoscaler):</b> adjust requests/limits automatically. Not for production pods in-place — restarts pods.",
              "<b>StatefulSet:</b> for stateful applications (databases, Kafka, Zookeeper). Stable network identity (pod-0, pod-1). Ordered start/stop. PVC per pod.",
              "<b>PersistentVolume (PV) + PVC:</b> PV = storage resource. PVC = claim for storage. StorageClass = dynamic provisioning (auto-creates PV)."
            ]
          }
        ],
        "traps": [
          "HPA requires metrics-server installed — HPA shows 'unknown' metrics without it",
          "StatefulSet pods must stop in reverse order — configure terminationGracePeriodSeconds appropriately",
          "Deleting a StatefulSet does NOT delete PVCs — data persists (usually desirable but can cause orphaned storage costs)"
        ],
        "checkpoint": [
          "What is the difference between a StatefulSet and a Deployment?",
          "HPA is configured but pods aren't scaling. What are the first things you check?",
          "What happens to PersistentVolumeClaims when you delete a StatefulSet?"
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "GitHub Actions Basics",
            "items": [
              "<b>Workflow:</b> .github/workflows/ci.yml. Triggered by events: push, pull_request, schedule, workflow_dispatch.",
              "<b>Job:</b> runs on a runner (ubuntu-latest, windows-latest, macos-latest). Steps run sequentially. Jobs run in parallel by default.",
              "<b>Step:</b> uses: (action) or run: (shell command). Actions are reusable steps from marketplace.",
              "<b>needs:</b> job dependency. job-b: needs: [job-a] — job-b waits for job-a.",
              "<b>env + secrets:</b> env: MY_VAR: value. Secrets: ${{ secrets.MY_SECRET }}. Secrets are masked in logs."
            ]
          },
          {
            "heading": "Pipeline Stages",
            "items": [
              "<b>Standard pipeline:</b> lint → test → build → security scan → push image → deploy to staging → smoke test → deploy to prod.",
              "<b>Fail fast:</b> cheapest checks first (lint, format). Don't run slow integration tests if lint fails.",
              "<b>Artifacts:</b> upload-artifact / download-artifact to pass files between jobs.",
              "<b>Caching:</b> actions/cache for npm/maven/pip dependencies. Massive CI speed improvement."
            ]
          }
        ],
        "traps": [
          "Secrets are available to all steps in a job — limit secret scope to only jobs that need them",
          "Not caching dependencies means downloading them on every run — always cache node_modules or ~/.m2",
          "Jobs run in parallel by default — if job-b needs job-a's output, add needs: [job-a]"
        ],
        "checkpoint": [
          "What is the difference between a job and a step in GitHub Actions?",
          "How do you pass a built Docker image between the build job and the deploy job?",
          "Your CI pipeline takes 20 minutes. What are the first optimizations you make?"
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Core Concepts",
            "items": [
              "<b>Terraform = Infrastructure as Code.</b> Declare desired infrastructure state in HCL. Terraform computes diff and applies.",
              "<b>Provider:</b> plugin for AWS/GCP/Azure/Kubernetes etc. Translates HCL to API calls.",
              "<b>Resource:</b> infrastructure object. <code>resource 'aws_instance' 'web' { ami = '...' instance_type = 't3.micro' }</code>",
              "<b>terraform init:</b> download providers. <b>plan:</b> show what will change. <b>apply:</b> make changes. <b>destroy:</b> delete everything.",
              "<b>State file (terraform.tfstate):</b> maps your config to real infrastructure. Source of truth for Terraform. Never edit manually."
            ]
          }
        ],
        "traps": [
          "terraform apply without plan = surprise changes. Always plan first, review before apply.",
          "Storing state file locally means no team collaboration and no locking — use remote backend (S3 + DynamoDB)",
          "terraform destroy deletes ALL resources in state — destructive, use with extreme caution in production"
        ],
        "checkpoint": [
          "What is Terraform state and why is it important?",
          "What is the workflow for making a change to existing infrastructure with Terraform?",
          "I run terraform plan and see a resource will be replaced (forces replacement). What does that mean?"
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Three Pillars of Observability",
            "items": [
              "<b>Metrics:</b> numeric measurements over time. CPU %, request rate, error rate, latency percentiles. Low cardinality. Cheap to store.",
              "<b>Logs:</b> discrete events with context. Error details, audit trail. High cardinality. Expensive at scale.",
              "<b>Traces:</b> request flow across services. Span tree. Latency breakdown by service. Medium cardinality.",
              "<b>When to use each:</b> metrics for alerting and dashboards (is something wrong?). Logs for debugging (what exactly happened?). Traces for distributed latency (where is the slowness?)."
            ]
          },
          {
            "heading": "Prometheus Basics",
            "items": [
              "<b>Pull-based model:</b> Prometheus scrapes /metrics endpoints on your services. Services expose metrics, Prometheus collects.",
              "<b>Metric types:</b> Counter (monotonically increasing: request count), Gauge (can go up/down: memory usage), Histogram (bucketed observations: request latency), Summary (similar to Histogram, client-side quantiles).",
              "<b>PromQL:</b> query language. rate(http_requests_total[5m]) = per-second rate over 5 min. histogram_quantile(0.99, ...) = p99 latency.",
              "<b>Labels:</b> key-value dimensions on metrics. {service='api', method='POST', status='500'}. Enable filtering and aggregation."
            ]
          }
        ],
        "traps": [
          "Counter vs Gauge: counter only goes up (use rate() to get rate of increase). Gauge goes up and down.",
          "High-cardinality labels (user_id, request_id) cause metric explosion — Prometheus runs OOM. Use logs for high-cardinality.",
          "rate() requires at least 2 scrapes — for counters that reset (restart), rate() handles this correctly"
        ],
        "checkpoint": [
          "What are the three pillars of observability and when do you use each?",
          "What is the difference between a Prometheus Counter and a Gauge? Give an example of each.",
          "Why should you never use user_id as a Prometheus label?"
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
        "level": "Beginner",
        "time": "25 min",
        "sections": [
          {
            "heading": "Nginx as Reverse Proxy",
            "items": [
              "<b>Reverse proxy:</b> Nginx sits in front of backend servers. Clients connect to Nginx, Nginx forwards to backends. Hides backend topology.",
              "<b>Basic proxy config:</b> <code>location / { proxy_pass http://backend:8080; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; }</code>",
              "<b>upstream block:</b> define backend pool. <code>upstream backend { server app1:8080; server app2:8080; }</code> then proxy_pass http://backend.",
              "<b>Load balancing methods:</b> round-robin (default), least_conn (least connections), ip_hash (sticky sessions by client IP)."
            ]
          }
        ],
        "traps": [
          "Forgetting proxy_set_header X-Real-IP — backend sees Nginx IP not client IP for all requests",
          "ip_hash for WebSocket sticky sessions — client must always hit same backend. ip_hash achieves this.",
          "proxy_pass with trailing slash changes URL: proxy_pass http://backend/ strips location prefix. Without slash: passes full path."
        ],
        "checkpoint": [
          "What is a reverse proxy and why do you use Nginx in front of your application?",
          "How do you configure Nginx to load balance across 3 backend servers?",
          "What is the difference between ip_hash and least_conn load balancing?"
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Compose Basics",
            "items": [
              "<b>Services:</b> containers that make up an app. Define image/build, ports, env, volumes, depends_on.",
              "<b>Networks:</b> Compose creates a default network. Services reach each other by service name.",
              "<b>Volumes:</b> persist database data and avoid losing state on container recreation.",
              "<b>Profiles:</b> optional services such as observability or worker queues."
            ]
          },
          {
            "heading": "Environment",
            "items": [
              "<b>.env files:</b> local variables for Compose interpolation. Do not commit secrets.",
              "<b>env_file:</b> pass environment into containers. Separate dev/test files.",
              "<b>Overrides:</b> docker-compose.override.yml for local-only ports and mounts.",
              "<b>Build args:</b> pass build-time values. Do not use for secrets."
            ]
          }
        ],
        "traps": [
          "depends_on does not wait for readiness unless healthchecks are used",
          "Committed .env files leak secrets",
          "Host ports conflict when multiple projects run locally"
        ],
        "checkpoint": [
          "Make app wait for Postgres readiness in Compose.",
          "What belongs in .env vs env_file?",
          "How do you avoid committing secrets?"
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Secure Pipelines",
            "items": [
              "<b>Least privilege:</b> CI jobs get only the permissions they need.",
              "<b>OIDC:</b> cloud provider trusts CI identity federation instead of long-lived secrets.",
              "<b>Secrets:</b> mask logs, limit scope, rotate regularly, avoid printing environment.",
              "<b>Branch protection:</b> require reviews, checks, and signed commits where appropriate."
            ]
          },
          {
            "heading": "Artifacts",
            "items": [
              "<b>Build artifacts:</b> immutable outputs such as container images, jars, zips, SBOMs.",
              "<b>Versioning:</b> use commit SHA, semver, or build number. Avoid mutable latest tags for releases.",
              "<b>Retention:</b> keep artifacts long enough for rollback and audit.",
              "<b>Integrity:</b> checksums and signed artifacts prevent tampering."
            ]
          }
        ],
        "traps": [
          "Long-lived cloud credentials in CI are a high-value target",
          "Mutable latest tags make rollback and audit ambiguous",
          "Secrets masked in logs can still leak through debug commands"
        ],
        "checkpoint": [
          "Why is OIDC better than storing cloud access keys?",
          "What makes a release artifact immutable?",
          "How do you limit CI permissions?"
        ]
      }
    ],
    "grill": "You are a Senior DevOps/Platform Engineer interviewing a candidate.\n\nTOPIC: CI/CD Security + Release Engineering (Block 85)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: OIDC, approvals, rollback, artifacts, provenance. 'CI secrets leaked', 'production deploy failed', 'design progressive delivery'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default devopsBeginner;
