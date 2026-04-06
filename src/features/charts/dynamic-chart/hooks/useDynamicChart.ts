import { useMemo } from 'react';

import type { ChartRangeKey, HistoricalSeries, HistoricalSeriesByRange } from '@/entities/charts/model';

type Point = {
	hour: string;
	crypto: number;
	stocks: number;
	bank: number;
	total: number;
};

export function useDynamicChart(series: HistoricalSeries) {
	const data = useMemo<Point[]>(
		() =>
			Object.entries(series)
				.map(([hour, value]) => ({
					hour,
					crypto: Number(value?.crypto) || 0,
					stocks: Number(value?.stocks) || 0,
					bank: Number(value?.bank) || 0,
					total: Number(value?.total) || 0,
				}))
				.sort((a, b) => a.hour.localeCompare(b.hour)),
		[series],
	);

	return { data };
}

const RANGE_ORDER: ChartRangeKey[] = ['1d', '7d', '30d', '180d', '360d'];

export const RANGE_LABELS: Record<ChartRangeKey, string> = {
	'1d': '1D',
	'7d': '7D',
	'30d': '30D',
	'180d': '180D',
	'360d': '360D',
};

export function useDynamicChartRanges(seriesByRange: HistoricalSeriesByRange, selectedRange: ChartRangeKey) {
	const activeSeries = seriesByRange[selectedRange];
	const { data } = useDynamicChart(activeSeries);

	const ranges = useMemo(() => RANGE_ORDER, []);

	return { data, ranges };
}
