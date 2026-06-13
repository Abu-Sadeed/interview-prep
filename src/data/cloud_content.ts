import type { Block } from '../types/content';

export const cloudContent: Block[] = [
  {
    "id": 53,
    "phase": "Cloud",
    "chip": "aws",
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
    "phase": "Cloud",
    "chip": "aws",
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
    "id": 83,
    "phase": "Cloud",
    "chip": "aws",
    "freq": "high",
    "title": "AWS Event-Driven Architecture",
    "subtitle": "S3 events, SNS/SQS, EventBridge, Lambda, IAM boundaries",
    "prereqs": [
      53,
      54
    ],
    "tiers": [
      {
        "level": "Beginner",
        "time": "35 min",
        "sections": [
          {
            "heading": "Core Services",
            "items": [
              "<b>S3 events:</b> object created/removed events can trigger Lambda, SQS, SNS, or EventBridge.",
              "<b>SQS:</b> queue buffers work. Standard queues offer high throughput; FIFO queues preserve order and deduplicate.",
              "<b>SNS:</b> fan-out pub/sub topic. Multiple subscribers receive the same message.",
              "<b>EventBridge:</b> event bus with rules. Good for SaaS, AWS service events, and schema-based routing."
            ]
          },
          {
            "heading": "Lambda Integration",
            "items": [
              "<b>Event source mappings:</b> SQS/Kinesis/DynamoDB Streams poll and invoke Lambda with batches.",
              "<b>Synchronous invocation:</b> API Gateway, EventBridge target, or direct Invoke waits for result.",
              "<b>Async invocation:</b> Lambda queues retries internally and can send failures to DLQ or destination.",
              "<b>Reserved concurrency:</b> cap function concurrency to protect downstream systems."
            ]
          }
        ],
        "traps": [
          "S3 event notifications are at-least-once, not exactly-once",
          "SNS fan-out can multiply downstream load unexpectedly",
          "Lambda retry without idempotency can duplicate side effects"
        ],
        "checkpoint": [
          "Design an image upload pipeline using S3, SQS, and Lambda.",
          "When would you choose SNS over SQS?",
          "How do you prevent duplicate Lambda processing?"
        ]
      },
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Reliability Patterns",
            "items": [
              "<b>Dead-letter queues:</b> capture messages that fail after retries. Inspect and replay deliberately.",
              "<b>Visibility timeout:</b> message is hidden while processed. Too short causes duplicate processing.",
              "<b>Idempotency keys:</b> store processed event IDs with TTL to deduplicate retries.",
              "<b>Poison pill handling:</b> move malformed messages out of the main queue after repeated failures."
            ]
          },
          {
            "heading": "IAM Boundaries",
            "items": [
              "<b>Least privilege:</b> Lambda role should access only required queues, buckets, and keys.",
              "<b>Resource policies:</b> S3 bucket, SNS topic, SQS queue, and EventBridge rule policies control cross-account access.",
              "<b>Service-linked roles:</b> AWS services use them for managed integrations. Do not over-permission application roles.",
              "<b>Permission boundaries:</b> limit what delegated IAM principals can grant."
            ]
          }
        ],
        "traps": [
          "Visibility timeout shorter than processing time causes duplicate work",
          "DLQ without monitoring becomes a silent data-loss bucket",
          "Broad s3:* or sqs:* permissions violate least privilege"
        ],
        "checkpoint": [
          "Set SQS visibility timeout for a 45-second Lambda handler.",
          "How do you detect and replay DLQ messages?",
          "Design least-privilege IAM for a Lambda reading one S3 bucket and writing one SQS queue."
        ]
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Event Design",
            "items": [
              "<b>Event schema:</b> stable envelope with id, source, type, subject, time, datacontenttype, and data.",
              "<b>Versioning:</b> include schemaVersion. Additive changes are safer than breaking field renames.",
              "<b>Ordering:</b> FIFO queues preserve order per message group, not globally across all groups.",
              "<b>Backpressure:</b> tune Lambda reserved concurrency, SQS batch size, and consumer scaling."
            ]
          },
          {
            "heading": "Operations",
            "items": [
              "<b>Observability:</b> correlate event id, trace id, queue name, function name, and retry count.",
              "<b>Replay:</b> archive events or use EventBridge archive/replay for controlled recovery.",
              "<b>Cost controls:</b> monitor invocations, duration, DLQ growth, and data transfer.",
              "<b>Security:</b> encrypt queues/topics/buckets, validate event schemas, and avoid trusting event payloads."
            ]
          }
        ],
        "traps": [
          "Global ordering is expensive and often unnecessary; model ordering by aggregate or partition key",
          "Event schemas without versioning block independent service evolution",
          "Unbounded retries can amplify a downstream outage"
        ],
        "checkpoint": [
          "Design an event schema for order lifecycle events.",
          "How do you replay events safely in production?",
          "What metrics indicate an event-driven pipeline is unhealthy?"
        ]
      }
    ],
    "grill": "You are a Senior Cloud Engineer interviewing a candidate.\n\nTOPIC: AWS Event-Driven Architecture (Block 83)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: AWS event design, reliability, IAM, and operations. 'S3 upload pipeline duplicates work', 'DLQ growing', 'design least privilege'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default cloudContent;
