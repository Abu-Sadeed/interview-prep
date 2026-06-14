import type { Block } from '../types/content';
import { javaBeginner } from './java/java_beginner';
import { javaIntermediate } from './java/java_intermediate';
import { javaAdvanced } from './java/java_advanced';

export const javaContent: Block[] = [
  ...javaBeginner,
  ...javaIntermediate,
  ...javaAdvanced,
];

export default javaContent;
