import {useState} from 'react';
import {Link} from 'react-router-dom';
import type {Block} from '../../types/content';
import {freqClass} from '../../utils/classes';

type PhaseGroupProps = {
	phase: string;
	blocks: Block[];
	done: Set<string>;
	activePath: string;
};

export function PhaseGroup({
	phase,
	blocks,
	done,
	activePath,
}: Readonly<PhaseGroupProps>) {
	const [expanded, setExpanded] = useState(false);

	return (
		<section className="phase-group">
			<button
				type="button"
				className="phase-header"
				onClick={() => setExpanded((e) => !e)}
				aria-label={`Toggle ${phase} section`}
				aria-expanded={expanded}>
				<span className="phase-label">{phase}</span>
				<span className={`phase-chevron ${expanded ? 'expanded' : ''}`}>
					▾
				</span>
			</button>
			{expanded &&
				blocks.map((block) => {
					const isDone = done.has(block.id);
					const isActive = activePath === `/block/${block.id}`;
					return (
						<Link
							key={block.id}
							to={`/block/${block.id}`}
							className={`nav-link ${isActive ? 'nav-link-active' : ''} ${isDone ? 'nav-link-done' : ''}`}>
							<span className="nav-link-title">
								{block.title}
							</span>
							<span
								className={`nav-link-freq ${freqClass(block.freq)}`}>
								{block.freq.toUpperCase()}
							</span>
							<span
								className={`nav-link-dot ${isDone ? 'nav-link-dot-done' : isActive ? 'nav-link-dot-active' : 'nav-link-dot-idle'}`}
							/>
						</Link>
					);
				})}
		</section>
	);
}
