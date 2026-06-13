import type { Block } from '../types/content';
import { behavioralBeginner } from './behavioral/behavioral_beginner';
import { behavioralIntermediate } from './behavioral/behavioral_intermediate';
import { behavioralAdvanced } from './behavioral/behavioral_advanced';

export const behavioralContent: Block[] = [
  ...behavioralBeginner,
  ...behavioralIntermediate,
  ...behavioralAdvanced,
];

export default behavioralContent;
