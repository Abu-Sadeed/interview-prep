import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ALL_BLOCKS } from '../../data/content';
import { useProgress } from '../../hooks/useProgress';
import { groupBlocksByPhase } from '../../utils/content';
import { parseTierTime } from '../../utils/grill';
import { chipClass, freqClass, freqLabel } from '../../utils/classes';
import { StatsGrid } from './StatsGrid';
import { StudyStrategy } from './StudyStrategy';
import { PhaseSection } from './PhaseSection';

export function Overview() {
	const { progress } = useProgress();
	const phases = useMemo(() => groupBlocksByPhase(ALL_BLOCKS), []);
	const totalTime = useMemo(
		() =>
			ALL_BLOCKS.reduce(
				(total, block) =>
					total +
					block.tiers.reduce(
						(sum, tier) => sum + parseTierTime(tier.time),
						0,
					),
				0,
		),
		[],
	);
	const high = useMemo(() => ALL_BLOCKS.filter((block) => block.freq === 'high').length, []);
	const medium = useMemo(
		() => ALL_BLOCKS.filter((block) => block.freq === 'med').length,
		[],
	);
	const low = useMemo(() => ALL_BLOCKS.filter((block) => block.freq === 'low').length, []);

	return (
		<main className="ov main-content">
			<h1 className="block-detail-title">Interview Prep Syllabus</h1>
			<p className="block-detail-subtitle">
				{ALL_BLOCKS.length} blocks ·{' '}
				{ALL_BLOCKS.filter((block) => block.tiers.length).length} with
				tier content · beginner → senior level 5+
			</p>

			<StatsGrid
				total={ALL_BLOCKS.length}
				sessions={Object.keys(phases).length}
				studyTime={`${Math.round(totalTime / 60)}h`}
				completed={progress.count}
			/>

			<StudyStrategy high={high} medium={medium} low={low} />

			{Object.entries(phases).map(([phase, blocks]) => (
				<PhaseSection key={phase} phase={phase} blocks={blocks} />
			))}
		</main>
	);
}
