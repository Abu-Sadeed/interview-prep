import type { Block } from '../types/content';
import { devopsBeginner } from './devops/devops_beginner';
import { devopsIntermediate } from './devops/devops_intermediate';
import { devopsAdvanced } from './devops/devops_advanced';

export const devopsContent: Block[] = [
  ...devopsBeginner,
  ...devopsIntermediate,
  ...devopsAdvanced,
];

export default devopsContent;
