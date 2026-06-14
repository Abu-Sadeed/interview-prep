import type { Block } from '../types/content';
import { frontendBeginner } from './frontend/frontend_beginner';
import { frontendIntermediate } from './frontend/frontend_intermediate';
import { frontendAdvanced } from './frontend/frontend_advanced';

export const frontendContent: Block[] = [
  ...frontendBeginner,
  ...frontendIntermediate,
  ...frontendAdvanced,
];

export default frontendContent;
