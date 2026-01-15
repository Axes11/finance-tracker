'use server';

import { CryptoApiResponse } from './model';

const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;

type NextFetchOptions = RequestInit & {
	next?: {
		revalidate?: number;
		tags?: string[];
	};
};

export const getCryptoPrice = async (): Promise<Pick<CryptoApiResponse, 'name' | 'current_price'>[]> => {
	try {
		const fetchOptions: NextFetchOptions = {
			next: {
				revalidate: 3600,
				tags: ['crypto-price'],
			},
		};

		const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`, fetchOptions);

		if (!res.ok) throw new Error('Failed to fetch crypto price');

		const data = await res.json();

		return data;
	} catch (error) {
		console.error('Error fetching crypto price:', error);
		throw error;
	}
};

export const getStockPrice = async (symbol: string): Promise<number> => {
	try {
		if (!ALPHAVANTAGE_API_KEY) throw new Error('Alpha Vantage API key is missing');

		const fetchOptions: NextFetchOptions = {
			next: {
				revalidate: 3600,
				tags: ['stock-price'],
			},
		};

		const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`, fetchOptions);

		if (!res.ok) throw new Error('Failed to fetch stock price');

		const data = (await res.json()) as {
			'Global Quote'?: {
				'05. price': string;
			};
		};

		const priceStr = data['Global Quote']?.['05. price'];
		return priceStr ? parseFloat(priceStr) : 0;
	} catch (error) {
		console.error('Error fetching stock price:', error);
		return 0;
	}
};

export const getForexPrice = async (symbol: string): Promise<number> => {
	try {
		if (symbol.toUpperCase() === 'USD') return 1;

		const fetchOptions: NextFetchOptions = {
			next: {
				revalidate: 3600,
				tags: ['forex-price'],
			},
		};

		const res = await fetch(`https://api.exchangerate.host/latest?base=${symbol.toUpperCase()}&symbols=USD`, fetchOptions);

		if (!res.ok) throw new Error('Failed to fetch forex price');

		const data = (await res.json()) as { rates: Record<string, number> };

		return data.rates?.USD || 0;
	} catch (error) {
		console.error('Error fetching forex price:', error);
		return 0;
	}
};
