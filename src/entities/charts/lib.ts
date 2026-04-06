import { unstable_cache } from 'next/cache';
import type { FetchParameters, HistoricalData } from './model';

const fetchFromApi = async (ticker: string, from: number, to: number): Promise<HistoricalData> => {
	const res = await fetch(`https://api.coingecko.com/api/v3/coins/${ticker}/market_chart/range?vs_currency=usd&from=${from}&to=${to}&precision=full`, { next: { revalidate: 3600 } });
	if (!res.ok) throw new Error('Failed to fetch');
	return res.json();
};

export const getCryptoChartsData = (params: FetchParameters) => {
	const { from, to } = getStableRange(params.to - params.from);
	return unstable_cache(async () => fetchFromApi(params.ticker, from, to), [`charts-${params.ticker}-${params.from}-${params.to}`], {
		revalidate: 3600,
		tags: ['charts', params.ticker],
	})();
};

export const getStableRange = (intervalInSeconds: number) => {
	const now = Math.floor(Date.now() / 1000);

	const to = now - (now % 3600);
	const from = to - intervalInSeconds;

	return { from, to };
};
