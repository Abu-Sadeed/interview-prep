import { Link } from 'react-router-dom';
import type { Block } from '../types/content';
import { chipClass, freqClass, freqLabel } from '../utils/classes';

interface PhaseSectionProps {
	phase: string;
	blocks: Block[];
}

export function PhaseSection({ phase, blocks }: PhaseSectionProps) {
	return (
		<section style={{marginBottom: '2rem'}}>
			<h2
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
			</h2>
			<div
				style={{
					display: 'grid',
					gap: '0.5rem',
					gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
				}}>
				{blocks.map((block) => (
					<BlockCard key={block.id} block={block} />
				))}
			</div>
		</section>
	);
}

interface BlockCardProps {
	block: Block;
}

function BlockCard({ block }: BlockCardProps) {
	return (
		<Link
			to={`/block/${block.id}`}
			className="card"
			style={{
				display: 'grid',
				gridTemplateColumns: 'auto 1fr auto',
				alignItems: 'center',
				gap: '1rem',
				padding: '0.75rem 1rem',
				textDecoration: 'none',
				color: 'inherit',
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
					{block.title.split(' — ')[1] || block.subtitle.split(',')[0]}
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					gap: '0.5rem',
					alignItems: 'center',
				}}>
				<span className={`tag ${freqClass(block.freq)}`}>
					{freqLabel(block.freq)}
				</span>
				<span className={`chip ${chipClass(block.chip)}`}>
					{block.chip}
				</span>
			</div>
		</Link>
	);
}
