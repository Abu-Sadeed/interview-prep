import type { Block, Tier } from '../types/content';

import { javaBeginner } from './java/java_beginner';
import { javaIntermediate } from './java/java_intermediate';
import { javaAdvanced } from './java/java_advanced';
import { springBeginner } from './spring/spring_beginner';
import { springIntermediate } from './spring/spring_intermediate';
import { springAdvanced } from './spring/spring_advanced';
import { springbootBeginner } from './springboot/springboot_beginner';
import { springbootIntermediate } from './springboot/springboot_intermediate';
import { springbootAdvanced } from './springboot/springboot_advanced';
import { jsBeginner } from './js/js_beginner';
import { jsIntermediate } from './js/js_intermediate';
import { jsAdvanced } from './js/js_advanced';
import { typescriptBeginner } from './typescript/typescript_beginner';
import { typescriptIntermediate } from './typescript/typescript_intermediate';
import { typescriptAdvanced } from './typescript/typescript_advanced';
import { jsbackendBeginner } from './jsbackend/jsbackend_beginner';
import { jsbackendIntermediate } from './jsbackend/jsbackend_intermediate';
import { jsbackendAdvanced } from './jsbackend/jsbackend_advanced';
import { frontendBeginner } from './frontend/frontend_beginner';
import { frontendIntermediate } from './frontend/frontend_intermediate';
import { frontendAdvanced } from './frontend/frontend_advanced';
import { htmlBeginner } from './html/html_beginner';
import { htmlIntermediate } from './html/html_intermediate';
import { htmlAdvanced } from './html/html_advanced';
import { databaseBeginner } from './database/database_beginner';
import { databaseIntermediate } from './database/database_intermediate';
import { databaseAdvanced } from './database/database_advanced';
import { apiBeginner } from './api/api_beginner';
import { apiIntermediate } from './api/api_intermediate';
import { apiAdvanced } from './api/api_advanced';
import { messagingBeginner } from './messaging/messaging_beginner';
import { messagingIntermediate } from './messaging/messaging_intermediate';
import { messagingAdvanced } from './messaging/messaging_advanced';
import { infraBeginner } from './infra/infra_beginner';
import { infraIntermediate } from './infra/infra_intermediate';
import { infraAdvanced } from './infra/infra_advanced';
import { devopsBeginner } from './devops/devops_beginner';
import { devopsIntermediate } from './devops/devops_intermediate';
import { devopsAdvanced } from './devops/devops_advanced';
import { cloudBeginner } from './cloud/cloud_beginner';
import { cloudIntermediate } from './cloud/cloud_intermediate';
import { cloudAdvanced } from './cloud/cloud_advanced';
import { archBeginner } from './arch/arch_beginner';
import { archIntermediate } from './arch/arch_intermediate';
import { archAdvanced } from './arch/arch_advanced';
import { behavioralBeginner } from './behavioral/behavioral_beginner';
import { behavioralIntermediate } from './behavioral/behavioral_intermediate';
import { behavioralAdvanced } from './behavioral/behavioral_advanced';
import { testingBeginner } from './testing/testing_beginner';
import { testingIntermediate } from './testing/testing_intermediate';
import { testingAdvanced } from './testing/testing_advanced';
import { golangBeginner } from './golang/golang_beginner';
import { golangIntermediate } from './golang/golang_intermediate';
import { golangAdvanced } from './golang/golang_advanced';

const tierRank: Record<Tier['level'], number> = { Beginner: 0, Intermediate: 1, Advanced: 2 };

function mergeTierBlocks(blocks: Block[]): Block[] {
  const byId = new Map<string, Block>();

  for (const block of blocks) {
    const existing = byId.get(block.id);
    if (!existing) {
      byId.set(block.id, { ...block, tiers: [...block.tiers] });
      continue;
    }

    existing.tiers = [...existing.tiers, ...block.tiers].sort((a, b) => tierRank[a.level] - tierRank[b.level]);
  }

  return Array.from(byId.values()).sort((a, b) => a.id.localeCompare(b.id));
}

const java = mergeTierBlocks([...javaBeginner, ...javaIntermediate, ...javaAdvanced]);
const spring = mergeTierBlocks([...springBeginner, ...springIntermediate, ...springAdvanced]);
const springboot = mergeTierBlocks([...springbootBeginner, ...springbootIntermediate, ...springbootAdvanced]);
const js = mergeTierBlocks([...jsBeginner, ...jsIntermediate, ...jsAdvanced]);
const typescript = mergeTierBlocks([...typescriptBeginner, ...typescriptIntermediate, ...typescriptAdvanced]);
const jsbackend = mergeTierBlocks([...jsbackendBeginner, ...jsbackendIntermediate, ...jsbackendAdvanced]);
const frontend = mergeTierBlocks([...frontendBeginner, ...frontendIntermediate, ...frontendAdvanced]);
const html = mergeTierBlocks([...htmlBeginner, ...htmlIntermediate, ...htmlAdvanced]);
const database = mergeTierBlocks([...databaseBeginner, ...databaseIntermediate, ...databaseAdvanced]);
const api = mergeTierBlocks([...apiBeginner, ...apiIntermediate, ...apiAdvanced]);
const messaging = mergeTierBlocks([...messagingBeginner, ...messagingIntermediate, ...messagingAdvanced]);
const infra = mergeTierBlocks([...infraBeginner, ...infraIntermediate, ...infraAdvanced]);
const devops = mergeTierBlocks([...devopsBeginner, ...devopsIntermediate, ...devopsAdvanced]);
const cloud = mergeTierBlocks([...cloudBeginner, ...cloudIntermediate, ...cloudAdvanced]);
const arch = mergeTierBlocks([...archBeginner, ...archIntermediate, ...archAdvanced]);
const behavioral = mergeTierBlocks([...behavioralBeginner, ...behavioralIntermediate, ...behavioralAdvanced]);
const testing = mergeTierBlocks([...testingBeginner, ...testingIntermediate, ...testingAdvanced]);
const golang = mergeTierBlocks([...golangBeginner, ...golangIntermediate, ...golangAdvanced]);

export const ALL_BLOCKS: Block[] = [
  ...java,
  ...spring,
  ...springboot,
  ...js,
  ...typescript,
  ...golang,
  ...jsbackend,
  ...frontend,
  ...html,
  ...database,
  ...api,
  ...messaging,
  ...infra,
  ...devops,
  ...cloud,
  ...arch,
  ...behavioral,
  ...testing,
];

export const TOPIC_CONTENT: Record<string, Block[]> = {
  java,
  spring,
  springboot,
  javascript: js,
  typescript,
  golang,
  jsbackend,
  frontend,
  html,
  database,
  api,
  messaging,
  infra,
  devops,
  cloud,
  arch,
  behavioral,
  testing,
};
