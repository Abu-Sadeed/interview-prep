import type { Block } from '../types/content';
import { testingBeginner } from './testing/testing_beginner';
import { testingIntermediate } from './testing/testing_intermediate';
import { testingAdvanced } from './testing/testing_advanced';

export const testingContent: Block[] = [
  ...testingBeginner,
  ...testingIntermediate,
  ...testingAdvanced,
];

export default testingContent;
