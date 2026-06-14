import type { Block, Tier } from '../types/content';

const allowedTags = new Set(['B', 'STRONG', 'CODE', 'BR']);

export function sanitizeHtml(html: string) {
  const document = globalThis.document;
  if (!document) {
    return stripUnsafeHtml(html);
  }

  const parsed = new DOMParser().parseFromString(html, 'text/html');
  const wrapper = document.createElement('div');

  Array.from(parsed.body.childNodes)
    .flatMap((node) => cleanNode(node, document))
    .forEach((node) => wrapper.appendChild(node));

  return wrapper.innerHTML;
}

export function sanitizeBlock(block: Block): Block {
  return {
    ...block,
    title: stripUnsafeHtml(block.title),
    subtitle: stripUnsafeHtml(block.subtitle),
    prereqs: [...block.prereqs],
    tiers: block.tiers.map(sanitizeTier),
    grill: stripUnsafeHtml(block.grill),
  };
}

function sanitizeTier(tier: Tier): Tier {
  return {
    ...tier,
    time: stripUnsafeHtml(tier.time),
    sections: tier.sections.map((section) => ({
      ...section,
      heading: stripUnsafeHtml(section.heading),
      items: section.items.map(sanitizeHtml),
    })),
    traps: tier.traps.map(stripUnsafeHtml),
    checkpoint: tier.checkpoint.map(stripUnsafeHtml),
  };
}

function cleanNode(node: Node, document: Document): Node[] {
  if (node.nodeType === Node.TEXT_NODE) {
    return [document.createTextNode(node.textContent || '')];
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return [];
  }

  const element = node as Element;
  if (!allowedTags.has(element.tagName)) {
    return Array.from(element.childNodes).flatMap((child) => cleanNode(child, document));
  }

  const clone = document.createElement(element.tagName.toLowerCase());
  Array.from(element.childNodes)
    .flatMap((child) => cleanNode(child, document))
    .forEach((child) => clone.appendChild(child));

  return [clone];
}

function stripUnsafeHtml(value: string) {
  return value.replace(/<[^>]+>/g, '');
}
