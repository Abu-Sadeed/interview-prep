import type { Block } from '../types/content';

export const devopsContent: Block[] = [
  {
    "id": 50,
    "phase": "DevOps",
    "chip": "infra",
    "freq": "high",
    "title": "Kubernetes — Core Concepts",
    "subtitle": "Pods, Deployments, Services, ConfigMaps, Secrets, Namespaces, kubectl basics",
    "prereqs": [
      31
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
      },
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
      },
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
    "id": 51,
    "phase": "DevOps",
    "chip": "infra",
    "freq": "med",
    "title": "Kubernetes — Production Patterns",
    "subtitle": "HPA, RBAC, StatefulSets, PersistentVolumes, service mesh basics, multi-tenancy",
    "prereqs": [
      50
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
      },
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
      },
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
    "id": 52,
    "phase": "DevOps",
    "chip": "infra",
    "freq": "high",
    "title": "CI/CD — GitHub Actions + Pipeline Design",
    "subtitle": "Pipeline stages, GitHub Actions syntax, secrets management, deployment strategies, rollback",
    "prereqs": [
      31,
      33
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
      },
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
      },
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
    "id": 53,
    "phase": "DevOps",
    "chip": "infra",
    "freq": "high",
    "title": "AWS — Compute + Storage",
    "subtitle": "EC2, S3, RDS, Lambda, ECS/Fargate — core services, decision model, SAA-aligned",
    "prereqs": [
      31
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "EC2 + Auto Scaling",
            "items": [
              "<b>EC2:</b> virtual machine on AWS. Instance types: t3 (burstable, cheap dev/test), m5 (general purpose), c5 (compute), r5 (memory), p3 (GPU).",
              "<b>AMI (Amazon Machine Image):</b> OS + software snapshot. Launch EC2 from AMI. Custom AMI for pre-configured instances.",
              "<b>Auto Scaling Group (ASG):</b> maintain desired capacity. Scale out/in based on CloudWatch alarms or target tracking (target CPU 70%).",
              "<b>Launch Template:</b> defines EC2 config (AMI, instance type, SG, user-data). Used by ASG.",
              "<b>ELB types:</b> ALB (HTTP/HTTPS, path/host routing, WebSocket), NLB (TCP/UDP, ultra-low latency, static IP), GLB (security appliances)."
            ]
          },
          {
            "heading": "S3",
            "items": [
              "<b>Object storage.</b> Virtually unlimited. 99.999999999% (11 nines) durability. Not a filesystem.",
              "<b>Storage classes:</b> Standard (frequent access), Standard-IA (infrequent, cheaper), Glacier (archive, retrieval minutes-hours), Intelligent-Tiering (auto-moves between tiers).",
              "<b>Presigned URLs:</b> temporary access to private object. Generate server-side, share URL. Time-limited. Correct for private file download.",
              "<b>S3 + CloudFront:</b> serve static assets globally from CDN. Origin Access Control (OAC) restricts S3 to only CloudFront access."
            ]
          }
        ],
        "traps": [
          "S3 bucket public access must be explicitly enabled — ACLs alone don't make objects public",
          "EC2 without ASG = manual scaling = single point of failure. Always use ASG in production.",
          "ALB vs NLB: ALB for HTTP workloads (most web apps). NLB for TCP, static IP, ultra-low latency requirements."
        ],
        "checkpoint": [
          "When would you use NLB instead of ALB?",
          "What is a presigned URL? When do you use it over a public S3 URL?",
          "Design auto-scaling for a web application that handles 10x traffic spikes."
        ]
      },
      {
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Lambda + ECS/Fargate",
            "items": [
              "<b>Lambda:</b> serverless functions. Event-driven. Pay per invocation + duration. Max 15 min execution. No server management.",
              "<b>Cold start:</b> first invocation initializes runtime (~100ms-1s). Mitigate: provisioned concurrency, minimize package size, avoid VPC if possible.",
              "<b>Lambda concurrency:</b> account limit 1000 (default). Reserved concurrency = guarantee for one function. Throttling = 429 errors.",
              "<b>ECS (Elastic Container Service):</b> managed container orchestration. EC2 launch type (you manage instances) or Fargate (serverless containers — AWS manages instances).",
              "<b>ECS vs Lambda:</b> Lambda for event-driven, short-running, variable load. ECS/Fargate for long-running, HTTP services, predictable load, need more control."
            ]
          },
          {
            "heading": "RDS",
            "items": [
              "<b>RDS:</b> managed relational DB. Postgres, MySQL, MariaDB, SQL Server, Oracle. Automated backups, patching, Multi-AZ.",
              "<b>Multi-AZ:</b> synchronous replication to standby in another AZ. Automatic failover (~60s). For HA, not read scaling.",
              "<b>Read Replicas:</b> asynchronous replication. Up to 15 replicas. For read scaling. Can promote to standalone DB.",
              "<b>Aurora:</b> AWS-managed compatible with MySQL/Postgres. 3-6 copies across AZs. Up to 15 read replicas. Aurora Serverless v2 for variable workloads.",
              "<b>RDS Proxy:</b> connection pooler in front of RDS. Critical for Lambda (Lambda creates new connection per invocation)."
            ]
          }
        ],
        "traps": [
          "Lambda in VPC = cold start adds ~500ms for ENI attachment — avoid VPC unless accessing private resources",
          "RDS Multi-AZ is for HA not read scaling — use Read Replicas for read scaling",
          "Lambda without Reserved Concurrency can consume entire account concurrency limit — starving other functions"
        ],
        "checkpoint": [
          "What is the difference between RDS Multi-AZ and Read Replicas?",
          "Why does Lambda in a VPC have slower cold starts and when is it worth it?",
          "I'm using Lambda to process API requests. Lambda keeps hitting RDS connection limits. What is the solution?"
        ]
      },
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Cost + Performance Optimisation",
            "items": [
              "<b>Spot Instances:</b> up to 90% cheaper than On-Demand. Can be interrupted with 2-min warning. For fault-tolerant, stateless, batch workloads.",
              "<b>Savings Plans / Reserved Instances:</b> 1-3 year commitment. 40-72% savings. Compute Savings Plans most flexible.",
              "<b>S3 Transfer Acceleration:</b> upload via CloudFront edge nodes. Faster for global users uploading large files.",
              "<b>ElastiCache (Redis/Memcached):</b> fully managed cache. Read-heavy workloads, session storage, leaderboards. In-memory, sub-millisecond latency.",
              "<b>DynamoDB:</b> fully managed NoSQL. Single-digit ms at any scale. DAX for in-memory cache. On-demand or provisioned capacity."
            ]
          }
        ],
        "traps": [
          "Spot Instances interrupted without warning if capacity needed — always design for interruption (checkpointing, graceful shutdown)",
          "DynamoDB hot partition from bad key design limits throughput — design partition key for even distribution",
          "ElastiCache in same VPC as application — cross-AZ access adds latency, place in same AZ as primary app instances"
        ],
        "checkpoint": [
          "When would you use DynamoDB instead of RDS Postgres? What are you giving up?",
          "Design a cost-optimized architecture for a batch processing workload that runs 6 hours daily.",
          "What is the difference between ElastiCache and RDS Read Replicas for reducing database load?"
        ]
      }
    ],
    "grill": "You are a Senior AWS Solutions Architect interviewing a candidate.\n\nTOPIC: AWS Compute + Storage (Block 53)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Architecture decision scenarios ('design this system on AWS'), service selection ('RDS vs DynamoDB for this use case'), cost optimization ('this architecture costs $50K/month — how do you cut it in half').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 54,
    "phase": "DevOps",
    "chip": "infra",
    "freq": "high",
    "title": "AWS — Networking + Security",
    "subtitle": "VPC, subnets, security groups, IAM, CloudFront, Route 53, WAF — SAA-aligned",
    "prereqs": [
      53
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "40 min",
        "sections": [
          {
            "heading": "VPC Fundamentals",
            "items": [
              "<b>VPC (Virtual Private Cloud):</b> isolated network. CIDR block (10.0.0.0/16). You control routing, subnets, gateways.",
              "<b>Public subnet:</b> has route to Internet Gateway (IGW). Resources with public IP accessible from internet.",
              "<b>Private subnet:</b> no route to IGW. Resources NOT directly accessible from internet. Access internet via NAT Gateway.",
              "<b>NAT Gateway:</b> allows private subnet resources to initiate outbound internet connections. Managed, highly available. NAT Instance = EC2 you manage (cheaper, less scalable).",
              "<b>Security Groups:</b> stateful firewall at instance level. Inbound + outbound rules. Allow only — no deny rules. Changes apply immediately."
            ]
          },
          {
            "heading": "IAM",
            "items": [
              "<b>IAM Users:</b> human identities. Long-lived credentials. Use only for humans and break-glass scenarios.",
              "<b>IAM Roles:</b> assumed by AWS services, EC2, Lambda, ECS tasks. Temporary credentials. Preferred over users for services.",
              "<b>IAM Policies:</b> JSON documents. Effect (Allow/Deny), Action (s3:GetObject), Resource (arn:aws:s3:::bucket/*).",
              "<b>Least privilege:</b> grant minimum permissions required. Start with Deny All, add only needed permissions.",
              "<b>Instance Profile:</b> attaches IAM Role to EC2. Application on EC2 uses instance metadata to get credentials — no hardcoded keys."
            ]
          }
        ],
        "traps": [
          "Security Groups are stateful — if inbound is allowed, response traffic is automatically allowed outbound",
          "NACLs are stateless — must allow both inbound AND outbound explicitly. Common source of confusion.",
          "Hardcoding AWS credentials in application code = critical security vulnerability. Use IAM Roles always."
        ],
        "checkpoint": [
          "What is the difference between a public and private subnet?",
          "What is the difference between Security Groups and NACLs?",
          "Why should you use IAM Roles instead of IAM User access keys for EC2 applications?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "45 min",
        "sections": [
          {
            "heading": "Route 53 + CloudFront",
            "items": [
              "<b>Route 53:</b> AWS DNS. Record types: A (IPv4), AAAA (IPv6), CNAME (alias to another name), Alias (AWS-specific, free for apex domain).",
              "<b>Routing policies:</b> Simple, Weighted (A/B testing, gradual migration), Latency (lowest latency), Failover (active-passive HA), Geolocation, Geoproximity.",
              "<b>CloudFront:</b> CDN. 400+ PoPs. Caches at edge. Reduces origin load. Supports Lambda@Edge and CloudFront Functions for edge compute.",
              "<b>CloudFront + S3:</b> private bucket + OAC. Only CloudFront can access S3. Signed URLs/cookies for private content distribution."
            ]
          },
          {
            "heading": "WAF + Shield + Security Services",
            "items": [
              "<b>WAF (Web Application Firewall):</b> L7 rules. Block SQL injection, XSS, bad bots, rate limiting by IP. Attach to CloudFront, ALB, API Gateway.",
              "<b>Shield Standard:</b> free, automatic DDoS protection for all AWS resources.",
              "<b>Shield Advanced:</b> paid. Enhanced DDoS protection, cost protection, 24/7 DDoS response team.",
              "<b>GuardDuty:</b> threat detection. Analyzes CloudTrail, VPC Flow Logs, DNS logs. ML-based anomaly detection.",
              "<b>AWS Secrets Manager vs SSM Parameter Store:</b> Secrets Manager = auto-rotation, costs $0.40/secret/month. SSM = free for standard, manual rotation."
            ]
          }
        ],
        "traps": [
          "CNAME cannot be used for apex/root domain (example.com) — use Route 53 Alias record instead",
          "CloudFront cache not invalidated after S3 update — either use versioned filenames or explicit invalidation",
          "WAF is not a Silver Bullet — inspect and tune rules, log all blocked requests"
        ],
        "checkpoint": [
          "When would you use Weighted routing vs Latency routing in Route 53?",
          "What is the difference between CloudFront and an ALB for serving a web application?",
          "Design a multi-region active-passive failover using Route 53."
        ]
      },
      {
        "level": "Advanced",
        "time": "35 min",
        "sections": [
          {
            "heading": "Advanced Networking + Compliance",
            "items": [
              "<b>VPC Peering:</b> connect two VPCs. Non-transitive — A↔B, B↔C doesn't mean A↔C. No overlapping CIDR blocks.",
              "<b>Transit Gateway:</b> hub-and-spoke. Connect many VPCs and on-prem. Transitive routing. Simpler than full mesh peering.",
              "<b>PrivateLink:</b> expose service to other VPCs/accounts without VPC peering. Traffic stays in AWS network. For SaaS, cross-account services.",
              "<b>CloudTrail:</b> audit log of all API calls. Who did what, when, from where. Enable in all regions. S3 + CloudWatch Logs.",
              "<b>Config:</b> track resource configuration changes over time. Compliance rules. 'Was this S3 bucket ever public?' "
            ]
          }
        ],
        "traps": [
          "VPC Peering is not transitive — misunderstanding this causes network design failures in multi-VPC architectures",
          "CloudTrail is not real-time — events appear with ~15 min delay. Use EventBridge for real-time API event reactions",
          "Disabling CloudTrail logging leaves no audit trail — enable in all regions including regions you don't use"
        ],
        "checkpoint": [
          "What is the difference between VPC Peering and Transit Gateway? When do you use each?",
          "What is AWS PrivateLink and how is it different from VPC Peering?",
          "Design the networking for a 10-VPC AWS organisation with on-premises connectivity."
        ]
      }
    ],
    "grill": "You are a Senior AWS Solutions Architect interviewing a candidate.\n\nTOPIC: AWS Networking + Security (Block 54)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Architecture scenarios ('your EC2 in private subnet can't reach internet — diagnose'), security audits ('find the security issues in this VPC design'), service selection ('VPC Peering vs Transit Gateway for this topology').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 55,
    "phase": "DevOps",
    "chip": "infra",
    "freq": "med",
    "title": "Terraform — IaC Fundamentals",
    "subtitle": "HCL syntax, state management, modules, plan/apply workflow, best practices",
    "prereqs": [
      54
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
      },
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
      },
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
    "id": 56,
    "phase": "DevOps",
    "chip": "infra",
    "freq": "med",
    "title": "Observability — Prometheus, Grafana, Alerting",
    "subtitle": "Metrics, logs, traces — the three pillars, Prometheus internals, Grafana dashboards, alert design",
    "prereqs": [
      50
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
      },
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
      },
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
    "id": 57,
    "phase": "DevOps",
    "chip": "infra",
    "freq": "med",
    "title": "Nginx — Reverse Proxy + Load Balancing",
    "subtitle": "Reverse proxy config, load balancing, SSL termination, caching, WebSocket, rate limiting",
    "prereqs": [
      29
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
      },
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
      },
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
  }
];

export default devopsContent;
