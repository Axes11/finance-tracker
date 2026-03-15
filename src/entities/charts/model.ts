export interface FetchParameters {
	ticker: string;
	from: number;
	to: number;
}

export interface HistoricalData {
	prices: [number, number][];
	market_caps: [number, number][];
	total_volumes: [number, number][];
}

export interface TransactionsData {
	[date: string]: {
		amount: number;
		currency: string;
	};
}
