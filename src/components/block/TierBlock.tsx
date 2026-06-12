import type { Tier } from '../../types/content';
import { RichHtml } from '../block/RichHtml';

interface TierBlockProps {
	tier: Tier;
	tierIndex: number;
	open: boolean;
	onToggle: () => void;
}

const tierLabels = [
	'Tier 1 — Beginner',
	'Tier 2 — Intermediate',
	'Tier 3 — Advanced',
];

export function TierBlock({ tier, tierIndex, open, onToggle }: TierBlockProps) {
	return (
		<section
			className={`tier-panel ${tierIndex === 0 ? 'tier-t1' : tierIndex === 1 ? 'tier-t2' : 'tier-t3'}`}>
			<button type="button" onClick={onToggle} className="tier-header">
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.75rem',
					}}>
					<span className="tier-label">{tierLabels[tierIndex]}</span>
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.75rem',
					}}>
					<span className="tier-meta">{tier.time}</span>
					<span
						className={`tier-chevron ${open ? 'tier-chevron-open' : ''}`}>
						▾
					</span>
				</div>
			</button>
			{open && (
				<div className="tier-body">
					{tier.sections.map((section) => (
						<div
							key={section.heading}
							style={{marginBottom: '1.25rem'}}>
							<div className="tier-section-heading">
								{section.heading}
							</div>
							<ul className="tier-list">
								{section.items.map((item) => (
									<RichHtml key={item} html={item} />
								))}
							</ul>
						</div>
					))}
					{tier.traps.length > 0 && (
						<div className="tier-traps">
							<div className="tier-traps-title">
								Common Interview Traps
							</div>
							<ul className="tier-traps-list">
								{tier.traps.map((trap) => (
									<li key={trap}>Trap: {trap}</li>
								))}
							</ul>
						</div>
					)}
					{tier.checkpoint.length > 0 && (
						<div className="tier-checkpoint">
							<div className="tier-checkpoint-title">
								Self-Check Before Advancing
							</div>
							<ul className="tier-checkpoint-list">
								{tier.checkpoint.map((question) => (
									<li key={question}>Question: {question}</li>
								))}
							</ul>
							<div className="tier-checkpoint-hint">
								If you can answer all questions confidently
								without notes → advance to next tier.
							</div>
						</div>
					)}
				</div>
			)}
		</section>
	);
}
