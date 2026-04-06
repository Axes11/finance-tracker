import { getHistoricalData } from '@/entities/charts';
import type { HistoricalSeriesByRange } from '@/entities/charts/model';

import { DynamicChart } from '@/features/charts/dynamic-chart/ui/dynamic-chart';

const now = Date.now();

export async function LineChart() {
	const [series1d, series7d, series30d, series180d, series360d] = await Promise.all([
		getHistoricalData({ from: now - 1 * 24 * 60 * 60 * 1000, to: now, stepHours: 3, bucketMode: 'hours' }),
		getHistoricalData({ from: now - 7 * 24 * 60 * 60 * 1000, to: now, stepHours: 12, bucketMode: 'hours' }),
		getHistoricalData({ from: now - 30 * 24 * 60 * 60 * 1000, to: now, stepHours: 24, bucketMode: 'hours' }),
		getHistoricalData({ from: now - 180 * 24 * 60 * 60 * 1000, to: now, bucketMode: 'fortnight' }),
		getHistoricalData({ from: now - 360 * 24 * 60 * 60 * 1000, to: now, bucketMode: 'month' }),
	]);
	const seriesByRange: HistoricalSeriesByRange = {
		'1d': series1d,
		'7d': series7d,
		'30d': series30d,
		'180d': series180d,
		'360d': series360d,
	};

	return (
		<div className='w-full h-full bg-background'>
			<DynamicChart seriesByRange={seriesByRange} />
		</div>
	);
}
