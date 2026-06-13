import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';

const root = process.cwd();
const files = ['data-part1.js', 'data-part2.js', 'data-part3.js', 'data-part4.js'];
const blocks = [];

for (const file of files) {
  const code = fs.readFileSync(path.join(root, file), 'utf8');
  const ast = parse(code, { sourceType: 'script' });
  const partBlocks = extractBlockArray(ast, file);
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
  spring: [9, 10, 11, 12, 13, 14, 15, 16],
  springboot: [17, 68, 69, 70],
  javascript: [62, 65, 66],
  jsbackend: [18, 19, 40, 41, 42, 43, 60, 61],
  database: [20, 21, 22, 23, 24, 25, 75, 76, 77],
  messaging: [26, 27, 78, 79],
  api: [28, 29, 30, 80],
  infra: [31, 32, 84],
  frontend: [33, 34, 35, 44, 45, 46, 47, 48, 59, 63, 71, 72, 73, 74],
  html: [67],
  arch: [36, 37, 81, 82],
  behavioral: [38, 39, 58],
  testing: [49, 86],
  devops: [50, 51, 52, 55, 56, 57, 85],
  cloud: [53, 54, 83],
  typescript: [64, 87],
};

validateGroups(normalized, groups);

const header = "import type { Block } from '../types/content';\n\n";

for (const [topic, topicIds] of Object.entries(groups)) {
  const selected = normalized.filter((block) => topicIds.includes(block.id));
  const content = `${header}export const ${topic}Content: Block[] = ${JSON.stringify(selected, null, 2)};\n\nexport default ${topic}Content;\n`;
  fs.writeFileSync(path.join(root, 'src', 'data', `${topic}_content.ts`), content);
}

const registry = `${header}import javaContent from './java_content';\nimport springContent from './spring_content';\nimport springbootContent from './springboot_content';\nimport javascriptContent from './javascript_content';\nimport jsbackendContent from './jsbackend_content';\nimport databaseContent from './database_content';\nimport messagingContent from './messaging_content';\nimport apiContent from './api_content';\nimport infraContent from './infra_content';\nimport frontendContent from './frontend_content';\nimport htmlContent from './html_content';\nimport archContent from './arch_content';\nimport behavioralContent from './behavioral_content';\nimport testingContent from './testing_content';\nimport devopsContent from './devops_content';\nimport cloudContent from './cloud_content';\nimport typescriptContent from './typescript_content';\n\nexport const ALL_BLOCKS: Block[] = [\n  ...javaContent,\n  ...springContent,\n  ...springbootContent,\n  ...javascriptContent,\n  ...jsbackendContent,\n  ...databaseContent,\n  ...messagingContent,\n  ...apiContent,\n  ...infraContent,\n  ...frontendContent,\n  ...htmlContent,\n  ...archContent,\n  ...behavioralContent,\n  ...testingContent,\n  ...devopsContent,\n  ...cloudContent,\n  ...typescriptContent,\n].sort((a, b) => a.id - b.id);\n\nexport const TOPIC_CONTENT = {\n  java: javaContent,\n  spring: springContent,\n  springboot: springbootContent,\n  javascript: javascriptContent,\n  jsbackend: jsbackendContent,\n  database: databaseContent,\n  messaging: messagingContent,\n  api: apiContent,\n  infra: infraContent,\n  frontend: frontendContent,\n  html: htmlContent,\n  arch: archContent,\n  behavioral: behavioralContent,\n  testing: testingContent,\n  devops: devopsContent,\n  cloud: cloudContent,\n  typescript: typescriptContent,\n};\n`;
fs.writeFileSync(path.join(root, 'src', 'data', 'content.ts'), registry);

const progress = {
  branchCreated: true,
  generatedAt: new Date().toISOString(),
  dataMigration: {
    java: { file: 'data-part1.js', blocks: '1-8', migrated: true },
    spring: { file: 'data-part1.js, data-part2.js', blocks: '9-16', migrated: true },
    springboot: { file: 'data-part2.js', blocks: '17, 68-70', migrated: true },
    javascript: { file: 'data-part4.js', blocks: '62, 65-66', migrated: true },
    jsbackend: { file: 'data-part2.js, data-part4.js', blocks: '18-19, 40-43, 60-61', migrated: true },
    database: { file: 'data-part2.js', blocks: '20-25, 75-77', migrated: true },
    messaging: { file: 'data-part2.js', blocks: '26-27, 78-79', migrated: true },
    api: { file: 'data-part3.js', blocks: '28-30, 80', migrated: true },
    infra: { file: 'data-part3.js', blocks: '31-32, 84', migrated: true },
    frontend: { file: 'data-part3.js, data-part4.js', blocks: '33-35, 44-48, 59, 63, 71-74', migrated: true },
    html: { file: 'new', blocks: '67', migrated: true },
    arch: { file: 'data-part3.js, data-part4.js', blocks: '36-37, 81-82', migrated: true },
    behavioral: { file: 'data-part3.js, data-part4.js', blocks: '38-39, 58', migrated: true },
    testing: { file: 'data-part4.js', blocks: '49, 86', migrated: true },
    devops: { file: 'data-part4.js', blocks: '50-52, 55-57, 85', migrated: true },
    cloud: { file: 'data-part4.js', blocks: '53-54, 83', migrated: true },
    typescript: { file: 'data-part4.js', blocks: '64, 87', migrated: true },
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

function extractBlockArray(ast, fileName) {
  const assignment = ast.program.body.find((statement) => {
    return statement.type === 'ExpressionStatement'
      && statement.expression.type === 'AssignmentExpression'
      && statement.expression.operator === '='
      && statement.expression.left.type === 'MemberExpression'
      && statement.expression.left.object.type === 'Identifier'
      && statement.expression.left.object.name === 'globalThis'
      && statement.expression.left.property.type === 'Identifier'
      && /^BLOCKS_PART\d+$/.test(statement.expression.left.property.name);
  });

  if (!assignment) {
    throw new Error(`Could not find globalThis.BLOCKS_PART assignment in ${fileName}`);
  }

  if (assignment.expression.right.type !== 'ArrayExpression') {
    throw new Error(`Expected ${fileName} assignment to be an array`);
  }

  return assignment.expression.right.elements.map((element) => {
    if (!element || element.type === 'SpreadElement') {
      throw new Error(`Unexpected spread or hole in ${fileName}`);
    }
    return evaluateAst(element);
  });
}

function evaluateAst(node) {
  switch (node.type) {
    case 'ObjectExpression':
      return node.properties.reduce((object, property) => {
        if (property.type !== 'ObjectProperty') {
          throw new Error(`Unsupported object property type: ${property.type}`);
        }
        const key = propertyKey(property.key);
        object[key] = evaluateAst(property.value);
        return object;
      }, {});
    case 'ArrayExpression':
      return node.elements.map((element) => {
        if (!element || element.type === 'SpreadElement') {
          throw new Error('Unexpected spread or hole in array');
        }
        return evaluateAst(element);
      });
    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
    case 'NullLiteral':
      return node.value;
    case 'TemplateLiteral': {
      if (node.expressions.length > 0) {
        throw new Error('Template literal expressions are not supported in data files');
      }
      return node.quasis.map((quasi) => quasi.value.cooked).join('');
    }
    default:
      throw new Error(`Unsupported data literal: ${node.type}`);
  }
}

function propertyKey(key) {
  if (key.type === 'Identifier' || key.type === 'StringLiteral' || key.type === 'NumericLiteral') {
    return String(key.name ?? key.value);
  }
  throw new Error(`Unsupported object key type: ${key.type}`);
}

function validateGroups(blocks, groups) {
  const sourceIds = blocks.map((block) => block.id);
  const groupedIds = Object.values(groups).flat();
  const duplicates = groupedIds.filter((id, index) => groupedIds.indexOf(id) !== index);
  const missing = sourceIds.filter((id) => !groupedIds.includes(id));
  const unknown = groupedIds.filter((id) => !sourceIds.includes(id));

  if (duplicates.length > 0) {
    throw new Error(`Topic groups contain duplicate block ids: ${[...new Set(duplicates)].join(', ')}`);
  }
  if (missing.length > 0) {
    throw new Error(`Topic groups are missing block ids: ${missing.join(', ')}`);
  }
  if (unknown.length > 0) {
    throw new Error(`Topic groups contain unknown block ids: ${unknown.join(', ')}`);
  }
}
