import {Link} from 'react-router-dom';
import {ALL_BLOCKS} from '../data/content';
import {useProgress} from '../hooks/useProgress';
import {chipClass, freqClass, freqLabel} from '../utils/classes';
import {groupBlocksByPhase} from '../utils/content';
import {parseTierTime} from '../utils/grill';

export function Overview() {
	const {progress} = useProgress();
	const phases = groupBlocksByPhase(ALL_BLOCKS);
	const totalTime = ALL_BLOCKS.reduce(
		(total, block) =>
			total +
			block.tiers.reduce(
				(sum, tier) => sum + parseTierTime(tier.time),
				0,
			),
		0,
	);
	const high = ALL_BLOCKS.filter((block) => block.freq === 'high').length;
	const medium = ALL_BLOCKS.filter((block) => block.freq === 'med').length;
	const low = ALL_BLOCKS.filter((block) => block.freq === 'low').length;

	return (
		<main className="ov main-content">
			<div className="block-detail-title">Interview Prep Syllabus</div>
			<div className="block-detail-subtitle">
				{ALL_BLOCKS.length} blocks ·{' '}
				{ALL_BLOCKS.filter((block) => block.tiers.length).length} with
				tier content · beginner → senior level 5+
			</div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
					gap: '0.75rem',
					marginBottom: '2.5rem',
				}}>
				<Stat number={ALL_BLOCKS.length} label="Total blocks" />
				<Stat
					number={Object.keys(phases).length}
					label="Study sessions"
				/>
				<Stat
					number={`${Math.round(totalTime / 60)}h`}
					label="Est. study time"
				/>
				<Stat number={progress.count} label="Completed" />
			</div>
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
					<FrequencyCard
						label="High Frequency"
						count={high}
						tone="red"
						text="Almost certain to be asked. Do these first regardless of tech."
					/>
					<FrequencyCard
						label="Medium Frequency"
						count={medium}
						tone="amber"
						text="50–60% of interviews. Study after all high-freq blocks are done."
					/>
					<FrequencyCard
						label="Low Frequency"
						count={low}
						tone="slate"
						text="Niche or role-specific. Study only if interview is for that tech."
					/>
				</div>
			</div>
			{Object.entries(phases).map(([phase, blocks]) => (
				<section key={phase} style={{marginBottom: '2rem'}}>
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
						{phase}
					</div>
					<div
						style={{
							display: 'grid',
							gap: '1.5rem',
							gridTemplateColumns:
								'repeat(auto-fill, minmax(280px, 1fr))',
						}}>
						{blocks.map((block) => (
							<Link
								key={block.id}
								to={`/block/${block.id}`}
								className="card"
								style={{
									display: 'grid',
									gridTemplateColumns: 'auto 1fr auto',
									alignItems: 'center',
									gap: '1rem',
									padding: '0.75rem 1rem',
								}}>
								<span
									style={{
										fontFamily:
											'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
										fontSize: '0.625rem',
										color: 'var(--color-text3)',
									}}>
									Block {String(block.id).padStart(2, '0')}
								</span>
								<div>
									<div
										style={{
											fontSize: '0.6875rem',
											fontWeight: 400,
											color: 'var(--color-text)',
										}}>
										{block.title.split(' — ')[0]}
									</div>
									<div
										style={{
											fontSize: '0.5625rem',
											fontWeight: 400,
											color: 'var(--color-text3)',
											marginTop: '2px',
										}}>
										{block.title.split(' — ')[1] ||
											block.subtitle.split(',')[0]}
									</div>
								</div>
								<div
									style={{
										display: 'flex',
										gap: '0.5rem',
										alignItems: 'center',
									}}>
									<span
										className={`tag ${freqClass(block.freq)}`}>
										{freqLabel(block.freq)}
									</span>
									<span
										className={`chip ${chipClass(block.chip)}`}>
										{block.chip}
									</span>
								</div>
							</Link>
						))}
					</div>
				</section>
			))}
		</main>
	);
}

function Stat({number, label}: {number: number | string; label: string}) {
	return (
		<div className="stat-card">
			<div className="stat-card-value">{number}</div>
			<div className="stat-card-label">{label}</div>
		</div>
	);
}

function FrequencyCard({
	label,
	count,
	tone,
	text,
}: {
	label: string;
	count: number;
	tone: 'red' | 'amber' | 'slate';
	text: string;
}) {
	const toneClass =
		tone === 'red'
			? 'tone-red'
			: tone === 'amber'
				? 'tone-amber'
				: 'tone-slate';

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
