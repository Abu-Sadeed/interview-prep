import type { Block } from '../types/content';
import { apiBeginner } from './api/api_beginner';
import { apiIntermediate } from './api/api_intermediate';
import { apiAdvanced } from './api/api_advanced';

export const apiContent: Block[] = [
  ...apiBeginner,
  ...apiIntermediate,
  ...apiAdvanced,
];

export default apiContent;
