import fs from 'fs';
import path from 'path';

const dataDir = 'src/data';

const topicDirs: Record<string, string> = {
  java: 'java',
  spring: 'spring',
  springboot: 'springboot',
  javascript: 'js',
  jsbackend: 'jsbackend',
  database: 'database',
  messaging: 'messaging',
  api: 'api',
  infra: 'infra',
  frontend: 'frontend',
  html: 'html',
  arch: 'arch',
  behavioral: 'behavioral',
  testing: 'testing',
  devops: 'devops',
  cloud: 'cloud',
  typescript: 'typescript',
};

interface TierInfo {
  fileName: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface TopicPlan {
  sourceFile: string;
  idPrefix: string;
  idMap: Record<number, string>;
  prereqMap: Record<number, string>;
}

function getTierFile(topicDir: string, level: 'beginner' | 'intermediate' | 'advanced', idPrefix: string): string {
  return `src/data/${topicDir}/${idPrefix}_${level}.ts`;
}

function generateId(idPrefix: string, seq: number): string {
  return `${idPrefix}-${seq}`;
}

function migrateBlock(block: any, idPrefix: string, seq: number, prereqMap: Record<number, string>): any {
  const newId = generateId(idPrefix, seq);
  const newPrereqs = (block.prereqs || []).map((p: number) => {
    if (prereqMap[p]) return prereqMap[p];
    // Cross-topic prereq fallback: try to resolve from known mappings
    return String(p);
  });

  const migrated: any = {
    id: newId,
    phase: block.phase,
    chip: block.chip,
    freq: block.freq,
    title: block.title,
    subtitle: block.subtitle,
    prereqs: newPrereqs,
    tiers: block.tiers,
    grill: block.grill,
  };
  return migrated;
}

function extractArrayFromFile(filePath: string): any[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Find the array start after the `= `
  const match = content.match(/export const \w+:\s*Block\[\]\s*=\s*(\[.*\])\s*;?\s*export default/mgs;
  if (!match) return [];
  
  // Wrap in parens and eval to parse JS object syntax
  const arrayStr = match[1];
  try {
    const fn = new Function('return ' + arrayStr);
    return fn();
  } catch (e) {
    console.error(`Failed to parse ${filePath}:`, e);
    return [];
  }
}

const topics: TopicPlan[] = [
  {
    sourceFile: 'java_content.ts',
    idPrefix: 'java',
    idMap: { 1:'java-1', 2:'java-2', 3:'java-3', 4:'java-4', 5:'java-5', 6:'java-6', 7:'java-7', 8:'java-8' },
    prereqMap: { 1:'java-1', 2:'java-2', 3:'java-3', 4:'java-4', 5:'java-5', 6:'java-6', 7:'java-7', 8:'java-8' },
  },
  {
    sourceFile: 'spring_content.ts',
    idPrefix: 'spring',
    idMap: { 9:'spring-1', 10:'spring-2', 11:'spring-3', 12:'spring-4', 13:'spring-5', 14:'spring-6', 15:'spring-7', 16:'spring-8' },
    prereqMap: { 9:'spring-1', 10:'spring-2', 11:'spring-3', 12:'spring-4', 13:'spring-5', 14:'spring-6', 15:'spring-7', 16:'spring-8', 7:'java-6', 8:'java-7' },
  },
  {
    sourceFile: 'springboot_content.ts',
    idPrefix: 'springboot',
    idMap: { 17:'springboot-1', 68:'springboot-2', 69:'springboot-3', 70:'springboot-4' },
    prereqMap: { 17:'springboot-1', 68:'springboot-2', 69:'springboot-3', 70:'springboot-4', 9:'spring-1' },
  },
  {
    sourceFile: 'javascript_content.ts',
    idPrefix: 'js',
    idMap: { 62:'js-1', 65:'js-2', 66:'js-3' },
    prereqMap: { 62:'js-1', 65:'js-2', 66:'js-3', 65:'js-2' },
  },
  {
    sourceFile: 'jsbackend_content.ts',
    idPrefix: 'jsbackend',
    idMap: { 18:'jsbackend-1', 19:'jsbackend-2', 40:'jsbackend-3', 41:'jsbackend-4', 42:'jsbackend-5', 43:'jsbackend-6', 60:'jsbackend-7', 61:'jsbackend-8' },
    prereqMap: { 18:'jsbackend-1', 19:'jsbackend-2', 40:'jsbackend-3', 41:'jsbackend-4', 42:'jsbackend-5', 43:'jsbackend-6', 60:'jsbackend-7', 61:'jsbackend-8', 5:'java-5', 65:'js-2' },
  },
  {
    sourceFile: 'database_content.ts',
    idPrefix: 'database',
    idMap: { 20:'database-1', 21:'database-2', 22:'database-3', 23:'database-4', 24:'database-5', 25:'database-6', 75:'database-7', 76:'database-8', 77:'database-9' },
    prereqMap: { 20:'database-1', 21:'database-2', 22:'database-3', 23:'database-4', 24:'database-5', 25:'database-6', 75:'database-7', 76:'database-8', 77:'database-9' },
  },
  {
    sourceFile: 'messaging_content.ts',
    idPrefix: 'messaging',
    idMap: { 26:'messaging-1', 27:'messaging-2', 78:'messaging-3', 79:'messaging-4' },
    prereqMap: { 26:'messaging-1', 27:'messaging-2', 78:'messaging-3', 79:'messaging-4', 20:'database-1' },
  },
  {
    sourceFile: 'api_content.ts',
    idPrefix: 'api',
    idMap: { 28:'api-1', 29:'api-2', 30:'api-3', 80:'api-4' },
    prereqMap: { 28:'api-1', 29:'api-2', 30:'api-3', 80:'api-4', 53:'cloud-1', 54:'cloud-2', 55:'devops-4' },
  },
  {
    sourceFile: 'infra_content.ts',
    idPrefix: 'infra',
    idMap: { 31:'infra-1', 32:'infra-2' },
    prereqMap: { 31:'infra-1', 32:'infra-2' },
  },
  {
    sourceFile: 'frontend_content.ts',
    idPrefix: 'frontend',
    idMap: { 33:'frontend-1', 34:'frontend-2', 35:'frontend-3', 44:'frontend-4', 45:'frontend-5', 46:'frontend-6', 47:'frontend-7', 48:'frontend-8', 63:'frontend-9', 71:'frontend-10', 72:'frontend-11', 73:'frontend-12', 74:'frontend-13', 59:'frontend-14' },
    prereqMap: { 33:'frontend-1', 34:'frontend-2', 35:'frontend-3', 44:'frontend-4', 45:'frontend-5', 46:'frontend-6', 47:'frontend-7', 48:'frontend-8', 63:'frontend-9', 71:'frontend-10', 72:'frontend-11', 73:'frontend-12', 74:'frontend-13', 59:'frontend-14' },
  },
  {
    sourceFile: 'html_content.ts',
    idPrefix: 'html',
    idMap: { 67:'html-1' },
    prereqMap: { 67:'html-1' },
  },
  {
    sourceFile: 'arch_content.ts',
    idPrefix: 'arch',
    idMap: { 36:'arch-1', 37:'arch-2', 81:'arch-3', 82:'arch-4' },
    prereqMap: { 36:'arch-1', 37:'arch-2', 81:'arch-3', 82:'arch-4' },
  },
  {
    sourceFile: 'behavioral_content.ts',
    idPrefix: 'behavioral',
    idMap: { 38:'behavioral-1', 39:'behavioral-2', 58:'behavioral-3' },
    prereqMap: { 38:'behavioral-1', 39:'behavioral-2', 58:'behavioral-3' },
  },
  {
    sourceFile: 'testing_content.ts',
    idPrefix: 'testing',
    idMap: { 49:'testing-1', 86:'testing-2' },
    prereqMap: { 49:'testing-1', 86:'testing-2' },
  },
  {
    sourceFile: 'devops_content.ts',
    idPrefix: 'devops',
    idMap: { 50:'devops-1', 51:'devops-2', 52:'devops-3', 55:'devops-4', 56:'devops-5', 57:'devops-6', 84:'devops-7', 85:'devops-8' },
    prereqMap: { 50:'devops-1', 51:'devops-2', 52:'devops-3', 55:'devops-4', 56:'devops-5', 57:'devops-6', 84:'devops-7', 85:'devops-8', 31:'infra-1', 33:'frontend-1' },
  },
  {
    sourceFile: 'cloud_content.ts',
    idPrefix: 'cloud',
    idMap: { 53:'cloud-1', 54:'cloud-2', 83:'cloud-3' },
    prereqMap: { 53:'cloud-1', 54:'cloud-2', 83:'cloud-3', 31:'infra-1' },
  },
  {
    sourceFile: 'typescript_content.ts',
    idPrefix: 'typescript',
    idMap: { 64:'typescript-1', 87:'typescript-2' },
    prereqMap: { 64:'typescript-1', 87:'typescript-2', 65:'js-2' },
  },
];

let totalBlocks = 0;

for (const topic of topics) {
  const sourcePath = path.join(dataDir, topic.sourceFile);
  if (!fs.existsSync(sourcePath)) {
    console.warn(`Missing: ${sourcePath}`);
    continue;
  }

  const blocks = extractArrayFromFile(sourcePath);
  if (blocks.length === 0) {
    console.warn(`No blocks extracted from ${topic.sourceFile}`);
    continue;
  }

  const topicDir = topicDirs[topic.idPrefix];
  const tierGroups: Record<string, any[]> = { beginner: [], intermediate: [], advanced: [] };

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const seq = i + 1;
    const newId = generateId(topic.idPrefix, seq);
    
    // Update id map with generated ID
    const oldId = Object.keys(topic.idMap).find(k => topic.idMap[k] === block.id?.toString()) 
      ? Object.entries(topic.idMap).find(([k, v]) => v === String(block.id))?.[0]
      : null;
    
    if (oldId && topic.prereqMap[oldId]) {
      topic.prereqMap[Number(oldId)] = newId;
    }
    
    // Also update by finding the block's original numeric ID
    const srcPath2 = sourcePath;
    // The prereqMap should map oldId -> newId for THIS topic
    // and forward other cross-topic prereqs
    const mergedPrereqMap: Record<number, string> = {};
    
    // Build a global old->new mapping for this topic's blocks
    const thisTopicOldToNew: Record<number, string> = {};
    blocks.forEach((b: any, idx: number) => {
      if (b.id !== undefined) {
        thisTopicOldToNew[b.id] = generateId(topic.idPrefix, idx + 1);
      }
    });
    
    const migrated = migrateBlock(block, topic.idPrefix, seq, thisTopicOldToNew);
    
    const levels = (migrated.tiers || []).map((t: any) => t.level.toLowerCase());
    if (levels.length === 0) {
      // No tiers - put in beginner by default
      tierGroups.beginner.push(migrated);
    } else {
      // Block spans multiple tiers - duplicate into each tier file
      const seenTiers = new Set<string>();
      (migrated.tiers || []).forEach((tier: any, tierIdx: number) => {
        const level = tier.level.toLowerCase();
        if (!seenTiers.has(level)) {
          seenTiers.add(level);
          tierGroups[level as keyof typeof tierGroups].push(migrated);
        }
      });
    }
  }

  // Write tier files
  for (const [level, levelBlocks] of Object.entries(tierGroups)) {
    if (levelBlocks.length === 0) continue;
    
    const fileName = `${topic.idPrefix}_${level}.ts`;
    const filePath = path.join(dataDir, topicDir, fileName);
    
    const sortedBlocks = [...levelBlocks].sort((a, b) => {
      const aNum = parseInt(a.id.split('-')[1] || '0');
      const bNum = parseInt(b.id.split('-')[1] || '0');
      return aNum - bNum;
    });

    const blocksJson = JSON.stringify(sortedBlocks, null, 2);
    
    const content = `import type { Block } from '../types/content';\n\nexport const ${topic.idPrefix}${level === 'beginner' ? 'Beginner' : level === 'intermediate' ? 'Intermediate' : 'Advanced'}: Block[] = ${blocksJson};\n\nexport default ${topic.idPrefix}${level === 'beginner' ? 'Beginner' : level === 'intermediate' ? 'Intermediate' : 'Advanced'};\n`;
    
    fs.writeFileSync(filePath, content);
    totalBlocks += levelBlocks.length;
    console.log(`  Written: ${fileName} (${levelBlocks.length} blocks)`);
  }
}

console.log(`\nTotal: ${topics.length} topics, ${totalBlocks} block-tier entries written`);
