import type { Block } from '../types/content';

export const behavioralContent: Block[] = [
  {
    "id": 38,
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
    "id": 39,
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
    "id": 58,
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
      },
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Common Behavioral Patterns",
            "items": [
              "<b>'Tell me about yourself':</b> 90-second pitch. Current role + key achievement + what you're looking for + why this company. Not your CV.",
              "<b>'Why are you leaving?':</b> never complain about current employer. Growth, scope, new challenge, team, technology. Always forward-looking.",
              "<b>'Where do you see yourself in 5 years?':</b> honest but aligned with the role. Senior/Staff engineer, technical lead. Show ambition without being vague.",
              "<b>'What is your biggest weakness?':</b> real weakness (not 'I work too hard'). What you're actively doing about it. Shows self-awareness.",
              "<b>Salary question:</b> never give first. 'What is the budgeted range for this role?' If pressed: give a range with your target at the lower end."
            ]
          },
          {
            "heading": "Handling 'I Don't Know'",
            "items": [
              "<b>Never bluff.</b> Experienced interviewers know when you're making things up. It disqualifies you faster than not knowing.",
              "<b>Framework for unknown topics:</b> 'I haven't worked with X directly, but here's how I'd think about it based on [related knowledge]'.",
              "<b>Show learning process:</b> 'I don't know the exact answer but I would look at [specific things] to figure it out. My instinct is [reasoning]'.",
              "<b>Redirect to strength:</b> 'I'm less familiar with X, but I have deep experience with Y which solves similar problems in [way]'.",
              "<b>What NOT to do:</b> long silence, 'ummm', starting sentences you can't finish, pretending to know and making up answers."
            ]
          }
        ],
        "traps": [
          "Oversharing in behavioral answers — 2-3 minutes max per answer, not a 10-minute story",
          "Bluffing technical knowledge — always better to admit you don't know than to fabricate",
          "Badmouthing previous employer — always sounds worse than the situation actually was"
        ],
        "checkpoint": [
          "Write your 90-second 'tell me about yourself' answer. Time it. Is it under 90 seconds?",
          "Practice 'I don't know' for: 'How does Raft consensus work?' (assuming you don't know)",
          "What is your real weakness as an engineer? What are you actively doing about it?"
        ]
      },
      {
        "level": "Advanced",
        "time": "25 min",
        "sections": [
          {
            "heading": "Senior-Level Behavioral Signals",
            "items": [
              "<b>Scope:</b> senior candidates talk about problems beyond their immediate team. Impact on org, cross-team influence, systems thinking.",
              "<b>Ambiguity:</b> 'I didn't have all the information so I did [X] to reduce uncertainty, then made a call'. Senior engineers decide under uncertainty.",
              "<b>Trade-offs:</b> 'We chose [A] over [B] because [reasons]. We accepted the downside of [C]'. Shows engineering judgment.",
              "<b>Failure stories:</b> strongest candidates have clear, honest failure stories. What went wrong, your role in it, what you changed afterward.",
              "<b>Leadership without authority:</b> getting engineers from other teams to adopt your approach, build consensus, drive without mandate."
            ]
          }
        ],
        "traps": [
          "No failure stories = lack of self-awareness or hiding. Every senior engineer has made costly mistakes.",
          "Vague impact ('the project was successful') at senior level = red flag. Quantify everything.",
          "Stories where you single-handedly saved the company = sounds fictional. Show complexity and collaboration."
        ],
        "checkpoint": [
          "Tell me about your biggest technical mistake. What did it cost? What changed afterward?",
          "Tell me about a time you influenced a technical decision without having direct authority.",
          "Tell me about a time you had to make a decision with incomplete information under time pressure."
        ]
      }
    ],
    "grill": "You are a Senior Engineering Manager conducting a behavioral interview.\n\nTOPIC: Behavioral Interview — STAR Bank (Block 58)\n\nYOUR ROLE: Realistic behavioral interviewer. Ask one question, listen to full answer, then probe deeper.\n\nRULES:\n- Ask one behavioral question from the categories: ownership, conflict, failure, delivery, cross-team, improvement, mentorship.\n- After their answer: probe the Action and Result specifically. Ask 'what did YOU specifically do?' and 'what was the measurable impact?'\n- Flag if they say 'we' instead of 'I'.\n- Flag vague results ('it went better') and ask for specifics.\n- After 3-4 questions: give verdict — are their stories Senior-level? What signals are strong/weak?\n\nBEGIN: Ask your first behavioral question."
  }
];

export default behavioralContent;
