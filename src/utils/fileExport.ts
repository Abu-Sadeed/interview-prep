import type { Block, TopicKey } from '../types/content';

export function downloadTextFile(fileName: string, content: string) {
  const blob = new Blob([content], { type: 'text/typescript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function serializeContentFile(topic: TopicKey, blocks: Block[]) {
  const sorted = [...blocks].sort((a, b) => a.id - b.id);
  return `import type { Block } from '../types/content';\n\nexport const ${topic}Content: Block[] = ${JSON.stringify(sorted, null, 2)};\n\nexport default ${topic}Content;\n`;
}
