export type Chip = string;
export type Frequency = 'high' | 'med' | 'low';

export interface Section {
  heading: string;
  items: string[];
}

export interface Tier {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  sections: Section[];
  traps: string[];
  checkpoint: string[];
}

export interface Block {
  id: number;
  phase: string;
  chip: Chip;
  freq: Frequency;
  title: string;
  subtitle: string;
  prereqs: number[];
  tiers: Tier[];
  grill: string;
}

export type TopicKey =
  | 'java'
  | 'spring'
  | 'springboot'
  | 'javascript'
  | 'jsbackend'
  | 'database'
  | 'messaging'
  | 'api'
  | 'infra'
  | 'frontend'
  | 'html'
  | 'arch'
  | 'behavioral'
  | 'testing'
  | 'devops'
  | 'cloud'
  | 'typescript';
