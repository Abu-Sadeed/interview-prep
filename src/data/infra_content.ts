import type { Block } from '../types/content';
import { infraBeginner } from './infra/infra_beginner';
import { infraIntermediate } from './infra/infra_intermediate';
import { infraAdvanced } from './infra/infra_advanced';

export const infraContent: Block[] = [
  ...infraBeginner,
  ...infraIntermediate,
  ...infraAdvanced,
];

export default infraContent;
