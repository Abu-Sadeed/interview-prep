import type { Block } from '../types/content';
import { typescriptBeginner } from './typescript/typescript_beginner';
import { typescriptIntermediate } from './typescript/typescript_intermediate';
import { typescriptAdvanced } from './typescript/typescript_advanced';

export const typescriptContent: Block[] = [
  ...typescriptBeginner,
  ...typescriptIntermediate,
  ...typescriptAdvanced,
];

export default typescriptContent;
