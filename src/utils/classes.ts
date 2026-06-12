import type { Frequency } from '../types/content';

export function freqClass(freq: Frequency) {
  if (freq === 'high') return 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/30 dark:text-red-300 dark:ring-red-900/40';
  if (freq === 'med') return 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900/40';
  return 'bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700';
}

export function freqLabel(freq: Frequency) {
  if (freq === 'high') return 'HIGH FREQ';
  if (freq === 'med') return 'MED FREQ';
  return 'LOW FREQ';
}

export function chipClass(chip: string) {
  const map: Record<string, string> = {
    java: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:ring-blue-900/40',
    spring: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:ring-emerald-900/40',
    db: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900/40',
    messaging: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/30 dark:text-red-300 dark:ring-red-900/40',
    api: 'bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:ring-violet-900/40',
    infra: 'bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:ring-teal-900/40',
    frontend: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900/40',
    arch: 'bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:ring-violet-900/40',
    nestjs: 'bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:ring-indigo-900/40',
    nodejs: 'bg-lime-50 text-lime-700 ring-lime-200 dark:bg-lime-950/30 dark:text-lime-300 dark:ring-lime-900/40',
    ts: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/30 dark:text-sky-300 dark:ring-sky-900/40',
    soft: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200 dark:bg-fuchsia-950/30 dark:text-fuchsia-300 dark:ring-fuchsia-900/40',
  };
  return map[chip] || map.java;
}
