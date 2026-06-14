import type { Block } from '../../types/content';

export const infraAdvanced: Block[] = [
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
    "id": "infra-2",
    "phase": "Infrastructure & Tooling",
    "chip": "infra",
    "freq": "med",
    "title": "Linux — Engineer Essentials",
    "subtitle": "Process management, file permissions, networking tools, logs, shell scripting basics",
    "prereqs": [],
    "tiers": [
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

export default infraAdvanced;
