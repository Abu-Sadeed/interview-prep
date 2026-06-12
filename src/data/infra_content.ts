import type { Block } from '../types/content';

export const infraContent: Block[] = [
  {
    "id": 31,
    "phase": "Infrastructure & Tooling",
    "chip": "infra",
    "freq": "high",
    "title": "Docker — Internals + Best Practices",
    "subtitle": "Namespaces, cgroups, Dockerfile optimisation, multi-stage builds, networking, Compose",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "What Containers Actually Are",
            "items": [
              "<b>Containers ≠ VMs.</b> Containers share the host OS kernel. VMs have fully separate OS.",
              "<b>Linux namespaces:</b> isolate process view. PID (process tree), network (interfaces), mount (filesystem), UTS (hostname), IPC, user.",
              "<b>cgroups (control groups):</b> limit resource usage. --memory=512m, --cpus=1.0.",
              "<b>Container image:</b> read-only layered filesystem (Union FS). Running container adds thin writable layer on top.",
              "<b>Container vs image:</b> image = blueprint. Container = running instance. Multiple containers from one image."
            ]
          },
          {
            "heading": "Dockerfile Basics",
            "items": [
              "<b>FROM:</b> base image. <b>COPY/ADD:</b> copy files. <b>RUN:</b> execute during build (creates layer). <b>CMD:</b> default command at run time. <b>ENTRYPOINT:</b> fixed executable.",
              "<b>Layer caching:</b> each instruction creates a cached layer. Unchanged instructions use cache. Put frequently changing instructions LAST.",
              "<b>Dependency install before code:</b> COPY pom.xml → RUN mvn dependency:go-offline → COPY src → RUN mvn build. Dependencies cached until pom.xml changes.",
              "<b>.dockerignore:</b> exclude files from build context. Reduces build time and image size."
            ]
          }
        ],
        "traps": [
          "CMD can be overridden at docker run — ENTRYPOINT cannot (easily). CMD provides default args to ENTRYPOINT when both specified",
          "COPY . . before RUN npm install invalidates dependency cache on every code change — expensive rebuild",
          "Running as root in container is a security risk — add USER directive to run as non-root"
        ],
        "checkpoint": [
          "What is the difference between a container and a VM at the OS level?",
          "Why should you install dependencies before copying source code in a Dockerfile?",
          "What is the difference between CMD and ENTRYPOINT?"
        ]
      },
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
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Security + Production Best Practices",
            "items": [
              "<b>Run as non-root:</b> USER 1001:1001 in Dockerfile. Most container security policies require this.",
              "<b>Read-only filesystem:</b> --read-only + tmpfs for /tmp. Prevents runtime modification.",
              "<b>Minimal base image:</b> distroless, alpine, scratch. Fewer packages = smaller attack surface.",
              "<b>Secret management:</b> never bake secrets into image. Use env vars, Docker secrets, Kubernetes secrets, or secret management tools (Vault).",
              "<b>Image scanning:</b> Trivy, Snyk, Grype. Scan for CVEs in base image and dependencies. Integrate into CI."
            ]
          },
          {
            "heading": "Container Resource Limits",
            "items": [
              "<b>--memory limit:</b> hard limit. OOM killer terminates container if exceeded.",
              "<b>--memory-swap:</b> total memory + swap. Set equal to --memory to disable swap.",
              "<b>--cpus:</b> CPU share. --cpus=0.5 = 50% of one CPU.",
              "<b>Kubernetes equivalent:</b> resources.limits.memory/cpu + resources.requests.memory/cpu. Requests = guaranteed. Limits = maximum.",
              "<b>JVM in container:</b> use -XX:+UseContainerSupport (default Java 10+). JVM reads cgroup limits, not host memory. Without it, JVM sees host RAM and over-allocates."
            ]
          }
        ],
        "traps": [
          "JVM without UseContainerSupport reads host memory not container limit — OOM kill with no warning",
          "Building images with secrets in RUN commands — secrets appear in layer history even if deleted later",
          "Memory limit without --memory-swap enables swap = slow but no OOM kill — set both to prevent swap"
        ],
        "checkpoint": [
          "What is UseContainerSupport and why is it critical for Java in Docker?",
          "How do you pass secrets to a container without baking them into the image?",
          "Walk me through building a minimal, secure Docker image for a Java microservice."
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend candidate.\n\nTOPIC: Docker Internals + Best Practices (Block 31)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical scenarios — 'your Docker build is slow and image is 1GB, fix it', 'your Java container OOM kills despite having 4GB host RAM', 'you need secrets in your container at runtime'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": 32,
    "phase": "Infrastructure & Tooling",
    "chip": "infra",
    "freq": "med",
    "title": "Linux — Engineer Essentials",
    "subtitle": "Process management, file permissions, networking tools, logs, shell scripting basics",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Process Management",
            "items": [
              "<b>ps aux:</b> all processes with user, CPU, mem. <b>top/htop:</b> interactive, real-time. <b>kill PID:</b> SIGTERM (graceful). <b>kill -9 PID:</b> SIGKILL (force, cannot be caught).",
              "<b>systemctl status service:</b> service status. <b>systemctl restart/start/stop service.</b>",
              "<b>Background processes:</b> command & (background). fg (bring to foreground). Ctrl+Z (suspend). nohup command & (survive terminal close).",
              "<b>Process priority:</b> nice -n 10 command (lower priority). renice -n 5 -p PID (change running process)."
            ]
          },
          {
            "heading": "File Permissions",
            "items": [
              "<b>Permission format:</b> rwxrwxrwx = owner/group/other. r=4, w=2, x=1.",
              "<b>chmod 755 file:</b> owner=rwx, group=rx, other=rx. <b>chmod +x file:</b> add execute for all.",
              "<b>chown user:group file:</b> change owner/group.",
              "<b>sudo:</b> run as superuser. /etc/sudoers controls who can sudo what.",
              "<b>umask:</b> default permission mask for new files. umask 022 = new files are 644, directories 755."
            ]
          }
        ],
        "traps": [
          "kill -9 cannot be caught by the process — use kill (SIGTERM) first and give app time to gracefully shutdown",
          "chmod 777 is a security risk — never in production",
          "Forgetting execute permission on a script — chmod +x script.sh"
        ],
        "checkpoint": [
          "How do you find and kill a process using a specific port?",
          "What does chmod 755 mean in terms of permissions?",
          "What is the difference between kill and kill -9?"
        ]
      },
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
      },
      {
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Performance Optimization",
            "items": [
              "<b>CPU affinity:</b> taskset -c 0-1 command to bind to specific cores. Useful for NUMA systems.",
              "<b>iostat / iotop:</b> disk I/O monitoring. Identify processes causing disk saturation.",
              "<b>strace -p PID:</b> trace system calls of running process. For debugging hangs or unusual behavior.",
              "<b>perf top:</b> live CPU profiling. Shows hot functions. Similar to top but for code profiling."
            ]
          }
        ],
        "traps": [
          "iostat without -x shows utilization % which maxes at 100% — use -x for detailed per-device stats",
          "perf record without proper permissions returns permission denied — run with sudo",
          "CPU affinity without considering NUMA can actually hurt performance — pin to correct socket nodes"
        ],
        "checkpoint": [
          "Your application is slow. How do you identify if it's CPU-bound or I/O-bound using Linux tools?",
          "How do you check if a process is stuck in uninterruptible sleep?",
          "Your container shows 100% CPU but top shows only 20% on host. What explains this?"
        ]
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend/SRE candidate.\n\nTOPIC: Linux Engineer Essentials (Block 32)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical debugging scenarios — 'your app is slow on production', 'disk full but du shows space', 'find the process using port 8080'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default infraContent;
