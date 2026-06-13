import type { Block } from '../../types/content';

export const cloudIntermediate: Block[] = [
  {
    "id": "cloud-1",
    "phase": "Cloud",
    "chip": "aws",
    "freq": "high",
    "title": "AWS — Compute + Storage",
    "subtitle": "EC2, S3, RDS, Lambda, ECS/Fargate — core services, decision model, SAA-aligned",
    "prereqs": [
      "infra-1"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior AWS Solutions Architect interviewing a candidate.\n\nTOPIC: AWS Compute + Storage (Block 53)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Architecture decision scenarios ('design this system on AWS'), service selection ('RDS vs DynamoDB for this use case'), cost optimization ('this architecture costs $50K/month — how do you cut it in half').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "cloud-2",
    "phase": "Cloud",
    "chip": "aws",
    "freq": "high",
    "title": "AWS — Networking + Security",
    "subtitle": "VPC, subnets, security groups, IAM, CloudFront, Route 53, WAF — SAA-aligned",
    "prereqs": [
      "cloud-1"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior AWS Solutions Architect interviewing a candidate.\n\nTOPIC: AWS Networking + Security (Block 54)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Architecture scenarios ('your EC2 in private subnet can't reach internet — diagnose'), security audits ('find the security issues in this VPC design'), service selection ('VPC Peering vs Transit Gateway for this topology').\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "cloud-3",
    "phase": "Cloud",
    "chip": "aws",
    "freq": "high",
    "title": "AWS Event-Driven Architecture",
    "subtitle": "S3 events, SNS/SQS, EventBridge, Lambda, IAM boundaries",
    "prereqs": [
      "cloud-1",
      "cloud-2"
    ],
    "tiers": [
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
      }
    ],
    "grill": "You are a Senior Cloud Engineer interviewing a candidate.\n\nTOPIC: AWS Event-Driven Architecture (Block 83)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: AWS event design, reliability, IAM, and operations. 'S3 upload pipeline duplicates work', 'DLQ growing', 'design least privilege'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default cloudIntermediate;
