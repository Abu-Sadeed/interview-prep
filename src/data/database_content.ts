import type { Block } from '../types/content';
import { databaseBeginner } from './database/database_beginner';
import { databaseIntermediate } from './database/database_intermediate';
import { databaseAdvanced } from './database/database_advanced';

export const databaseContent: Block[] = [
  ...databaseBeginner,
  ...databaseIntermediate,
  ...databaseAdvanced,
];

export default databaseContent;
