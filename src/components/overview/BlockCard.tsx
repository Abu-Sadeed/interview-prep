import {Link} from 'react-router-dom';
import type {Block} from '../../types/content';
import {chipClass, freqClass, freqLabel} from '../../utils/classes';

interface BlockCardProps {
	block: Block;
}

export function BlockCard({block}: BlockCardProps) {
	return (
		<Link
			to={`/block/${block.id}`}
			className="card"
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
				padding: '0.75rem 1rem',
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
						color: 'var(--color-text2)',
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
