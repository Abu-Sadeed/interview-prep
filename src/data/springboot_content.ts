import type { Block } from '../types/content';
import { springbootBeginner } from './springboot/springboot_beginner';
import { springbootIntermediate } from './springboot/springboot_intermediate';
import { springbootAdvanced } from './springboot/springboot_advanced';

export const springbootContent: Block[] = [
  ...springbootBeginner,
  ...springbootIntermediate,
  ...springbootAdvanced,
];

export default springbootContent;
