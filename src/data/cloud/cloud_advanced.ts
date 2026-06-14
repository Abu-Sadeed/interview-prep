import type { Block } from '../../types/content';

export const cloudAdvanced: Block[] = [
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

export default cloudAdvanced;
