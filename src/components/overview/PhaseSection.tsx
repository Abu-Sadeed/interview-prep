import type {Block} from '../../types/content';
import {BlockCard} from './BlockCard';

interface PhaseSectionProps {
	phase: string;
	blocks: Block[];
}

export function PhaseSection({phase, blocks}: Readonly<PhaseSectionProps>) {
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
					gridTemplateColumns:
						'repeat(auto-fill, minmax(280px, 1fr))',
				}}>
				{blocks.map((block) => (
					<BlockCard key={block.id} block={block} />
				))}
			</div>
		</section>
	);
}
