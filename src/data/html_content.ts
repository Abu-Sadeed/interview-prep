import type { Block } from '../types/content';
import { htmlBeginner } from './html/html_beginner';
import { htmlIntermediate } from './html/html_intermediate';
import { htmlAdvanced } from './html/html_advanced';

export const htmlContent: Block[] = [
  ...htmlBeginner,
  ...htmlIntermediate,
  ...htmlAdvanced,
];

export default htmlContent;
