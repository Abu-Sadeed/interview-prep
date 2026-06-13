import type { Block } from '../types/content';
import { messagingBeginner } from './messaging/messaging_beginner';
import { messagingIntermediate } from './messaging/messaging_intermediate';
import { messagingAdvanced } from './messaging/messaging_advanced';

export const messagingContent: Block[] = [
  ...messagingBeginner,
  ...messagingIntermediate,
  ...messagingAdvanced,
];

export default messagingContent;
