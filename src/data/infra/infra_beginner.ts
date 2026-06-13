import type { Block } from '../../types/content';

export const infraBeginner: Block[] = [
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
      }
    ],
    "grill": "You are a Senior Engineer interviewing a backend/SRE candidate.\n\nTOPIC: Linux Engineer Essentials (Block 32)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical debugging scenarios — 'your app is slow on production', 'disk full but du shows space', 'find the process using port 8080'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default infraBeginner;
