import type { Block } from '../../types/content';

export const behavioralIntermediate: Block[] = [
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
      }
    ],
    "grill": "You are a Senior Engineering Manager conducting a behavioral interview.\n\nTOPIC: Behavioral Interview — STAR Bank (Block 58)\n\nYOUR ROLE: Realistic behavioral interviewer. Ask one question, listen to full answer, then probe deeper.\n\nRULES:\n- Ask one behavioral question from the categories: ownership, conflict, failure, delivery, cross-team, improvement, mentorship.\n- After their answer: probe the Action and Result specifically. Ask 'what did YOU specifically do?' and 'what was the measurable impact?'\n- Flag if they say 'we' instead of 'I'.\n- Flag vague results ('it went better') and ask for specifics.\n- After 3-4 questions: give verdict — are their stories Senior-level? What signals are strong/weak?\n\nBEGIN: Ask your first behavioral question."
  }
];

export default behavioralIntermediate;
