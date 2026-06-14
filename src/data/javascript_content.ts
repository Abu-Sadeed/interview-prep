import type { Block } from '../types/content';
import { jsBeginner } from './js/js_beginner';
import { jsIntermediate } from './js/js_intermediate';
import { jsAdvanced } from './js/js_advanced';

export const javascriptContent: Block[] = [
  ...jsBeginner,
  ...jsIntermediate,
  ...jsAdvanced,
];

export default javascriptContent;
