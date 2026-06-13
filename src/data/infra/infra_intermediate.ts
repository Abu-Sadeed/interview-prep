import type { Block } from '../../types/content';

export const infraIntermediate: Block[] = [
  {
    "id": "infra-1",
    "phase": "Infrastructure & Tooling",
    "chip": "infra",
    "freq": "high",
    "title": "Docker — Internals + Best Practices",
    "subtitle": "Namespaces, cgroups, Dockerfile optimisation, multi-stage builds, networking, Compose",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Multi-Stage Builds",
            "items": [
              "<b>Multiple FROM in one Dockerfile.</b> Each stage independent. COPY --from=stage to copy artifacts between stages.",
              "<b>Java example:</b> Stage 1: Maven + JDK build. Stage 2: JRE only (smaller) + COPY jar from Stage 1. Final image has zero build tools.",
              "<b>Node.js example:</b> Stage 1: npm install + build. Stage 2: production deps only + built files.",
              "<b>Size reduction:</b> from 800MB+ with build tools → 150MB with JRE only. Smaller = faster pull, smaller attack surface."
            ]
          },
          {
            "heading": "Networking + Compose",
            "items": [
              "<b>Bridge network (default):</b> containers on same bridge can communicate by container name (DNS). Isolated from host.",
              "<b>Host network:</b> container shares host network stack. No isolation. Best performance. Linux only.",
              "<b>Overlay network:</b> multi-host networking (Swarm, Kubernetes).",
              "<b>Docker Compose:</b> define multi-container apps in YAML. Services, networks, volumes. <code>docker compose up -d</code>.",
              "<b>Compose service discovery:</b> services refer to each other by service name. spring.datasource.url=jdbc:postgresql://db:5432/mydb where 'db' is Compose service name."
            ]
          }
        ],
        "traps": [
          "Multi-stage build --from=0 references stage by index — use named stages (AS builder) for clarity",
          "Docker Compose service name != hostname in all contexts — use service name as hostname in connection strings",
          "Volumes not defined in Compose = data lost on container recreation — always define named volumes for persistent data"
        ],
        "checkpoint": [
          "Walk me through a multi-stage Docker build for a Spring Boot application.",
          "How do containers on the same Docker Compose network communicate?",
          "What is the difference between COPY and ADD in a Dockerfile? When would you use ADD?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: Docker Internals + Best Practices (Block 31)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical scenarios — 'your Docker build is slow and image is 1GB, fix it', 'your Java container OOM kills despite having 4GB host RAM', 'you need secrets in your container at runtime'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "infra-2",
    "phase": "Infrastructure & Tooling",
    "chip": "infra",
    "freq": "med",
    "title": "Linux — Engineer Essentials",
    "subtitle": "Process management, file permissions, networking tools, logs, shell scripting basics",
    "prereqs": [],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Networking Tools",
            "items": [
              "<b>netstat -tulpn / ss -tulpn:</b> listening ports and which process. ss is faster.",
              "<b>curl -v URL:</b> verbose HTTP request. See headers, TLS, redirect chain.",
              "<b>curl -I URL:</b> headers only (HEAD request).",
              "<b>dig domain:</b> DNS lookup. dig @8.8.8.8 domain — use specific DNS server.",
              "<b>tcpdump -i eth0 port 8080:</b> capture packets on interface + port. For debugging network issues.",
              "<b>lsof -i :8080:</b> which process is using port 8080.",
              "<b>nmap -sV host:</b> port scan with service detection. Know it exists; careful in production."
            ]
          },
          {
            "heading": "Logs + File Operations",
            "items": [
              "<b>tail -f /var/log/app.log:</b> follow log in real-time.",
              "<b>grep -r 'ERROR' /var/log/:</b> recursive search. grep -i (case insensitive).",
              "<b>journalctl -u service -f:</b> follow systemd service logs.",
              "<b>awk '{print $5}' file:</b> print 5th column. <b>sed 's/old/new/g' file:</b> replace text.",
              "<b>find /path -name '*.log' -mtime +7 -delete:</b> delete log files older than 7 days.",
              "<b>df -h:</b> disk usage. <b>du -sh /path:</b> directory size. <b>free -h:</b> memory usage."
            ]
          }
        ],
        "traps": [
          "tail -f doesn't work on log-rotated files — use tail -F (capital F) to follow by name",
          "grep searches file content not filenames — use find for filename search",
          "Disk space full but du shows space — deleted files held open by processes. Check lsof | grep deleted"
        ],
        "checkpoint": [
          "How do you find which process is listening on port 8080?",
          "Your disk is 100% full but du shows only 60% used. What is the likely cause?",
          "How do you grep for errors in logs from the last hour?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend/SRE candidate.\n\nTOPIC: Linux Engineer Essentials (Block 32)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical debugging scenarios — 'your app is slow on production', 'disk full but du shows space', 'find the process using port 8080'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default infraIntermediate;
