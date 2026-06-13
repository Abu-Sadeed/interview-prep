import type { Block } from '../types/content';
import { jsbackendBeginner } from './jsbackend/jsbackend_beginner';
import { jsbackendIntermediate } from './jsbackend/jsbackend_intermediate';
import { jsbackendAdvanced } from './jsbackend/jsbackend_advanced';

export const jsbackendContent: Block[] = [
  ...jsbackendBeginner,
  ...jsbackendIntermediate,
  ...jsbackendAdvanced,
];

export default jsbackendContent;
