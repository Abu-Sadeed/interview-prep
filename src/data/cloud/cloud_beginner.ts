import type { Block } from '../../types/content';

export const cloudBeginner: Block[] = [
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
      }
    ],
    "grill": "You are a Senior Cloud Engineer interviewing a candidate.\n\nTOPIC: AWS Event-Driven Architecture (Block 83)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: AWS event design, reliability, IAM, and operations. 'S3 upload pipeline duplicates work', 'DLQ growing', 'design least privilege'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default cloudBeginner;
