import type { Frequency } from '../types/content';

export function freqClass(freq: Frequency) {
  if (freq === 'high') return 'tag-high';
  if (freq === 'med') return 'tag-medium';
  return 'tag-low';
}

export function freqLabel(freq: Frequency) {
  if (freq === 'high') return 'HIGH FREQ';
  if (freq === 'med') return 'MED FREQ';
  return 'LOW FREQ';
}

export function chipClass(chip: string) {
  const map: Record<string, string> = {
    java: 'chip-java',
    spring: 'chip-spring',
    db: 'chip-db',
    messaging: 'chip-messaging',
    api: 'chip-api',
    infra: 'chip-infra',
    frontend: 'chip-frontend',
    arch: 'chip-arch',
    nestjs: 'chip-nestjs',
    nodejs: 'chip-nodejs',
    ts: 'chip-ts',
    soft: 'chip-soft',
  };
  return map[chip] || map.java;
}
