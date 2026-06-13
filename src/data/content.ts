import type { Block } from '../types/content';

import javaContent from './java_content';
import springContent from './spring_content';
import springbootContent from './springboot_content';
import javascriptContent from './javascript_content';
import jsbackendContent from './jsbackend_content';
import databaseContent from './database_content';
import messagingContent from './messaging_content';
import apiContent from './api_content';
import infraContent from './infra_content';
import frontendContent from './frontend_content';
import htmlContent from './html_content';
import archContent from './arch_content';
import behavioralContent from './behavioral_content';
import testingContent from './testing_content';
import devopsContent from './devops_content';
import cloudContent from './cloud_content';
import typescriptContent from './typescript_content';

export const ALL_BLOCKS: Block[] = [
  ...javaContent,
  ...springContent,
  ...springbootContent,
  ...javascriptContent,
  ...jsbackendContent,
  ...databaseContent,
  ...messagingContent,
  ...apiContent,
  ...infraContent,
  ...frontendContent,
  ...htmlContent,
  ...archContent,
  ...behavioralContent,
  ...testingContent,
  ...devopsContent,
  ...cloudContent,
  ...typescriptContent,
].sort((a, b) => a.id - b.id);

export const TOPIC_CONTENT = {
  java: javaContent,
  spring: springContent,
  springboot: springbootContent,
  javascript: javascriptContent,
  jsbackend: jsbackendContent,
  database: databaseContent,
  messaging: messagingContent,
  api: apiContent,
  infra: infraContent,
  frontend: frontendContent,
  html: htmlContent,
  arch: archContent,
  behavioral: behavioralContent,
  testing: testingContent,
  devops: devopsContent,
  cloud: cloudContent,
  typescript: typescriptContent,
};
