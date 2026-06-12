import type { StrategyCardProps } from './StrategyCard';
import { StrategyCard } from './StrategyCard';

interface StudyStrategyProps {
	high: number;
	medium: number;
	low: number;
}

export function StudyStrategy({ high, medium, low }: StudyStrategyProps) {
	const strategies: StrategyCardProps[] = [
		{
			label: 'High Frequency',
			count: high,
			tone: 'red',
			text: 'Almost certain to be asked. Do these first regardless of tech.',
		},
		{
			label: 'Medium Frequency',
			count: medium,
			tone: 'amber',
			text: '50–60% of interviews. Study after all high-freq blocks are done.',
		},
		{
			label: 'Low Frequency',
			count: low,
			tone: 'slate',
			text: 'Niche or role-specific. Study only if interview is for that tech.',
		},
	];

	return (
		<div className="editor-panel" style={{marginBottom: '2.5rem'}}>
			<div
				style={{
					marginBottom: '0.75rem',
					fontFamily:
						'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
					fontSize: '0.625rem',
					fontWeight: 600,
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
					color: 'var(--color-text3)',
				}}>
				Study Strategy — Use the sidebar filter to focus
			</div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: '0.75rem',
				}}>
				{strategies.map((strategy) => (
					<StrategyCard key={strategy.label} {...strategy} />
				))}
			</div>
		</div>
	);
}
