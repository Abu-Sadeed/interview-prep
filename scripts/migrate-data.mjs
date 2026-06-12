import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const files = ['data-part1.js', 'data-part2.js', 'data-part3.js', 'data-part4.js'];
const blocks = [];

for (const file of files) {
  const code = fs.readFileSync(path.join(root, file), 'utf8');
  const context = { globalThis: {} };
  vm.runInNewContext(code, context);
  const partBlocks = context.globalThis[`BLOCKS_PART${files.indexOf(file) + 1}`] || [];
  blocks.push(...partBlocks);
}

const normalized = blocks
  .map((block) => ({
    id: block.id,
    phase: block.phase,
    chip: block.chip,
    freq: block.freq === 'mid' ? 'med' : block.freq,
    title: block.title,
    subtitle: block.subtitle,
    prereqs: (block.prereqs || []).map((id) => Number(id)),
    tiers: block.tiers || [],
    grill: block.grill || '',
  }))
  .sort((a, b) => a.id - b.id);

const ids = new Set();
for (const block of normalized) {
  if (ids.has(block.id)) {
    throw new Error(`Duplicate block id ${block.id}`);
  }
  ids.add(block.id);
  if (!Array.isArray(block.tiers)) {
    throw new Error(`Block ${block.id} tiers must be an array`);
  }
}

const groups = {
  java: [1, 2, 3, 4, 5, 6, 7, 8],
  spring: [9, 10, 11, 12, 13, 14, 15, 16, 17],
  jsbackend: [18, 19, 40, 41, 42, 43, 60, 61, 62],
  database: [20, 21, 22, 23, 24, 25],
  messaging: [26, 27],
  api: [28, 29, 30],
  infra: [31, 32],
  frontend: [33, 34, 35, 44, 45, 46, 47, 48, 63],
  arch: [36, 59],
  behavioral: [37, 38, 39, 58],
  testing: [49],
  devops: [50, 51, 52, 53, 54, 55, 56, 57],
  typescript: [64],
};

const header = "import type { Block } from '../types/content';\n\n";

for (const [topic, ids] of Object.entries(groups)) {
  const selected = normalized.filter((block) => ids.includes(block.id));
  if (selected.length === 0) {
    throw new Error(`No blocks found for ${topic}`);
  }
  const content = `${header}export const ${topic}Content: Block[] = ${JSON.stringify(selected, null, 2)};\n\nexport default ${topic}Content;\n`;
  fs.writeFileSync(path.join(root, 'src', 'data', `${topic}_content.ts`), content);
}

const registry = `${header}import javaContent from './java_content';\nimport springContent from './spring_content';\nimport jsbackendContent from './jsbackend_content';\nimport databaseContent from './database_content';\nimport messagingContent from './messaging_content';\nimport apiContent from './api_content';\nimport infraContent from './infra_content';\nimport frontendContent from './frontend_content';\nimport archContent from './arch_content';\nimport behavioralContent from './behavioral_content';\nimport testingContent from './testing_content';\nimport devopsContent from './devops_content';\nimport typescriptContent from './typescript_content';\n\nexport const ALL_BLOCKS: Block[] = [\n  ...javaContent,\n  ...springContent,\n  ...jsbackendContent,\n  ...databaseContent,\n  ...messagingContent,\n  ...apiContent,\n  ...infraContent,\n  ...frontendContent,\n  ...archContent,\n  ...behavioralContent,\n  ...testingContent,\n  ...devopsContent,\n  ...typescriptContent,\n].sort((a, b) => a.id - b.id);\n\nexport const TOPIC_CONTENT = {\n  java: javaContent,\n  spring: springContent,\n  jsbackend: jsbackendContent,\n  database: databaseContent,\n  messaging: messagingContent,\n  api: apiContent,\n  infra: infraContent,\n  frontend: frontendContent,\n  arch: archContent,\n  behavioral: behavioralContent,\n  testing: testingContent,\n  devops: devopsContent,\n  typescript: typescriptContent,\n};\n`;
fs.writeFileSync(path.join(root, 'src', 'data', 'content.ts'), registry);

const progress = {
  branchCreated: true,
  generatedAt: new Date().toISOString(),
  dataMigration: {
    java: { file: 'data-part1.js', blocks: '1-8', migrated: true },
    spring: { file: 'data-part1.js, data-part2.js', blocks: '9-17', migrated: true },
    jsbackend: { file: 'data-part2.js, data-part4.js', blocks: '18-19, 40-43, 60-62', migrated: true },
    database: { file: 'data-part2.js', blocks: '20-25', migrated: true },
    messaging: { file: 'data-part2.js', blocks: '26-27', migrated: true },
    api: { file: 'data-part3.js', blocks: '28-30', migrated: true },
    infra: { file: 'data-part3.js', blocks: '31-32', migrated: true },
    frontend: { file: 'data-part3.js, data-part4.js', blocks: '33-35, 44-48, 63', migrated: true },
    arch: { file: 'data-part3.js, data-part4.js', blocks: '36, 59', migrated: true },
    behavioral: { file: 'data-part3.js, data-part4.js', blocks: '37-39, 58', migrated: true },
    testing: { file: 'data-part4.js', blocks: '49', migrated: true },
    devops: { file: 'data-part4.js', blocks: '50-57', migrated: true },
    typescript: { file: 'data-part4.js', blocks: '64', migrated: true },
  },
  componentsCreated: {
    Header: true,
    Sidebar: true,
    Overview: true,
    BlockDetail: true,
    Editor: true,
    ThemeToggle: true,
  },
};
fs.writeFileSync(path.join(root, 'plan-progress.json'), `${JSON.stringify(progress, null, 2)}\n`);

console.log(`Migrated ${normalized.length} blocks into ${Object.keys(groups).length} topic files.`);
