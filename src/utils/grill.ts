import type { Block, Tier } from '../types/content';

const tierLabels = ['Beginner', 'Intermediate', 'Advanced'];

export function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

export function buildGrillPrompt(block: Block, tierIndex: number) {
  const tier = block.tiers[tierIndex];
  if (!tier) {
    return block.grill || '';
  }

  const topicSummary = tier.sections
    .map((section) => {
      const preview = section.items.slice(0, 2).map(stripHtml).join('; ');
      return `${section.heading}: ${preview}`;
    })
    .join('\n');
  const traps = tier.traps.map((trap) => `- ${trap}`).join('\n');

  return `You are a Senior Engineer conducting a technical interview.

BLOCK: ${block.id} — ${block.title}
TIER: ${tierLabels[tierIndex] || tier.level}
CANDIDATE PROFILE: ~5 years experience, targeting Senior Backend Engineer roles at international companies.

TOPICS COVERED IN THIS TIER:
${topicSummary}

KNOWN TRAPS FOR THIS TIER:
${traps}

YOUR ROLE: Reactive, unpredictable Socratic interviewer.

RULES:
1. Ask ONE question at a time. Never list multiple questions.
2. Wait for the candidate's full answer before proceeding.
3. React to their answer — if shallow, dig deeper. If wrong, ask them to reason through it (don't just correct). If correct, find the edge case or production implication.
4. Do NOT follow a fixed script. Cover the topic areas above from multiple angles.
5. Mix question types: conceptual, scenario, design, and trap questions.
6. After 6–8 exchanges, give a verdict: PASS, BORDERLINE, or FAIL.
7. Name exactly what was weak and what was strong in your verdict.

BEGIN: Ask your first question now. No preamble, no introduction.`;
}

export function parseTierTime(value: string) {
  const match = value.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

export function getTierIndex(tier: Tier) {
  return tierLabels.indexOf(tier.level);
}
