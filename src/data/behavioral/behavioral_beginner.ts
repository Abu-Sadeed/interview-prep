import type { Block } from '../../types/content';

export const behavioralBeginner: Block[] = [
  {
    "id": "behavioral-1",
    "phase": "Behaviourial",
    "chip": "soft",
    "freq": "high",
    "title": "Conflict & Collaboration",
    "subtitle": "Handling disagreements, mentoring juniors, navigating technical debt decisions in production",
    "prereqs": [],
    "tiers": [],
    "grill": "You are a Tech Lead interviewing a senior candidate.\n\nTOPIC: Conflict & Collaboration (Block 38)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Real scenarios — disagreeing with tech lead, handling underperforming teammate, pushing back on unrealistic deadlines.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "behavioral-2",
    "phase": "Behaviourial",
    "chip": "soft",
    "freq": "high",
    "title": "Ownership & Delivery",
    "subtitle": "Shipping production code, incident response, and post-mortem culture",
    "prereqs": [],
    "tiers": [],
    "grill": "You are a Staff Engineer interviewing a candidate.\n\nTOPIC: Ownership & Delivery (Block 39)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Production incidents, shipping culture, learning from failures.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "behavioral-3",
    "phase": "Behavioral & Career",
    "chip": "arch",
    "freq": "high",
    "title": "Behavioral — STAR Bank + Interview Patterns",
    "subtitle": "STAR framework, 10 must-have stories, common behavioral questions, how to handle 'I don't know'",
    "prereqs": [],
    "tiers": [
      {
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "STAR Framework",
            "items": [
              "<b>Situation:</b> context. Team size, company, what was happening. 1-2 sentences max.",
              "<b>Task:</b> your specific responsibility. What were YOU accountable for. Not the team.",
              "<b>Action:</b> what YOU specifically did. Use 'I' not 'we'. Technical decisions, tradeoffs, leadership moves.",
              "<b>Result:</b> measurable outcome. Numbers where possible. Business impact, not just technical completion.",
              "<b>Common mistake:</b> spending 80% on Situation/Task, 20% on Action/Result. Reverse it. Interviewers care about what YOU did and what happened."
            ]
          },
          {
            "heading": "10 Must-Have Stories",
            "items": [
              "1. Took ownership of a broken or failing system",
              "2. Disagreed with a technical decision — how you handled it",
              "3. Delivered under a hard deadline with incomplete information",
              "4. Found and fixed a production incident",
              "5. Worked across teams with no direct authority",
              "6. Made a significant technical mistake and recovered",
              "7. Improved a process, system, or architecture",
              "8. Mentored or unblocked a teammate",
              "9. Pushed back on scope or requirements with data",
              "10. Chose simplicity over complexity when it mattered"
            ]
          }
        ],
        "traps": [
          "Using 'we' throughout — interviewers want to know YOUR contribution not the team's",
          "No measurable result — 'it went better' is not a result. 'Reduced p99 latency from 800ms to 120ms' is.",
          "Stories that make you the hero and everyone else incompetent — shows lack of self-awareness"
        ],
        "checkpoint": [
          "Tell me about a time you disagreed with a technical decision. (Practice the full STAR in writing first.)",
          "Tell me about a production incident you handled. What did you personally do?",
          "Tell me about a time you delivered under pressure. What trade-offs did you make?"
        ]
      }
    ],
    "grill": "You are a Senior Engineering Manager conducting a behavioral interview.\n\nTOPIC: Behavioral Interview — STAR Bank (Block 58)\n\nYOUR ROLE: Realistic behavioral interviewer. Ask one question, listen to full answer, then probe deeper.\n\nRULES:\n- Ask one behavioral question from the categories: ownership, conflict, failure, delivery, cross-team, improvement, mentorship.\n- After their answer: probe the Action and Result specifically. Ask 'what did YOU specifically do?' and 'what was the measurable impact?'\n- Flag if they say 'we' instead of 'I'.\n- Flag vague results ('it went better') and ask for specifics.\n- After 3-4 questions: give verdict — are their stories Senior-level? What signals are strong/weak?\n\nBEGIN: Ask your first behavioral question."
  }
];

export default behavioralBeginner;
