export interface FetchParameters {
	from: number;
	to: number;
	stepHours?: number;
	bucketMode?: 'hours' | 'fortnight' | 'month';
}

export interface HistoricalData {
	prices: [number, number][];
	market_caps: [number, number][];
	total_volumes: [number, number][];
}

export type HistoricalBucketValue = {
	crypto: number;
	stocks: number;
	bank: number;
	total: number;
};

export type HistoricalSeries = Record<string, HistoricalBucketValue>;

export type ChartRangeKey = '1d' | '7d' | '30d' | '180d' | '360d';

export type HistoricalSeriesByRange = Record<ChartRangeKey, HistoricalSeries>;
