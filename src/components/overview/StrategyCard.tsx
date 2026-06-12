export interface StrategyCardProps {
	label: string;
	count: number;
	tone: 'red' | 'amber' | 'slate';
	text: string;
}

export function StrategyCard({ label, count, tone, text }: StrategyCardProps) {
	const toneClass = tone === 'red' ? 'tone-red' : tone === 'amber' ? 'tone-amber' : 'tone-slate';

	return (
		<div className={`card ${toneClass}`} style={{cursor: 'default'}}>
			<div
				style={{
					fontFamily:
						'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
					fontSize: '1.25rem',
					fontWeight: 600,
				}}>
				{count}
			</div>
			<div
				style={{
					margin: '0.25rem 0',
					fontSize: '0.75rem',
					fontWeight: 600,
				}}>
				{label}
			</div>
			<div style={{fontSize: '0.6875rem', lineHeight: '1.25'}}>
				{text}
			</div>
		</div>
	);
}
