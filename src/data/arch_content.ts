import type { Block } from '../types/content';
import { archBeginner } from './arch/arch_beginner';
import { archIntermediate } from './arch/arch_intermediate';
import { archAdvanced } from './arch/arch_advanced';

export const archContent: Block[] = [
  ...archBeginner,
  ...archIntermediate,
  ...archAdvanced,
];

export default archContent;
