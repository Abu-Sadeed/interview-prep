import { StatCard } from './StatCard';

interface StatsGridProps {
	total: number;
	sessions: number;
	studyTime: string;
	completed: number;
}

export function StatsGrid({ total, sessions, studyTime, completed }: StatsGridProps) {
	const stats = [
		{ number: total, label: 'Total blocks' },
		{ number: sessions, label: 'Study sessions' },
		{ number: studyTime, label: 'Est. study time' },
		{ number: completed, label: 'Completed' },
	];

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(4, 1fr)',
				gap: '0.75rem',
				marginBottom: '2.5rem',
			}}>
			{stats.map((stat) => (
				<StatCard key={stat.label} {...stat} />
			))}
		</div>
	);
}
