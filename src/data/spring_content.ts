import type { Block } from '../types/content';
import { springBeginner } from './spring/spring_beginner';
import { springIntermediate } from './spring/spring_intermediate';
import { springAdvanced } from './spring/spring_advanced';

export const springContent: Block[] = [
  ...springBeginner,
  ...springIntermediate,
  ...springAdvanced,
];

export default springContent;
