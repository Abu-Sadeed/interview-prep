import type { Block } from '../types/content';
import { cloudBeginner } from './cloud/cloud_beginner';
import { cloudIntermediate } from './cloud/cloud_intermediate';
import { cloudAdvanced } from './cloud/cloud_advanced';

export const cloudContent: Block[] = [
  ...cloudBeginner,
  ...cloudIntermediate,
  ...cloudAdvanced,
];

export default cloudContent;
