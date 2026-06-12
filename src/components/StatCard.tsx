interface StatCardProps {
	number: number | string;
	label: string;
}

export function StatCard({ number, label }: StatCardProps) {
	return (
		<div className="stat-card">
			<div className="stat-card-value">{number}</div>
			<div className="stat-card-label">{label}</div>
		</div>
	);
}
