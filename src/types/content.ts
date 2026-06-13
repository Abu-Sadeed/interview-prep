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
  id: string;
  phase: string;
  chip: Chip;
  freq: Frequency;
  title: string;
  subtitle: string;
  prereqs: string[];
  tiers: Tier[];
  grill: string;
}

export type TopicKey =
  | 'java'
  | 'spring'
  | 'springboot'
  | 'javascript'
  | 'typescript'
  | 'jsbackend'
  | 'database'
  | 'messaging'
  | 'api'
  | 'infra'
  | 'frontend'
  | 'html'
  | 'arch'
  | 'behavioral'
  | 'devops'
  | 'cloud'
  | 'golang'
  | 'godot';
