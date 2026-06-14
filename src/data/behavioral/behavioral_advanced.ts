import type { Block } from '../../types/content';

export const behavioralAdvanced: Block[] = [
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

export default behavioralAdvanced;
