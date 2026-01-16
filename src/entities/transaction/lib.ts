'use server';

import { unstable_cache } from 'next/cache';
import { CryptoApiResponse } from './model';

// CRYPTO

let cryptoPricePromise: Promise<CryptoApiResponse[]> | null = null;

export const getCryptoPrice = unstable_cache(
	async () => {
		if (!cryptoPricePromise) {
			cryptoPricePromise = fetchCrypto();
		}
		return cryptoPricePromise;
	},
	['crypto-coins', 'usd'],
	{
		revalidate: 3600,
		tags: ['crypto'],
	},
);

async function fetchCrypto() {
	const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');

	if (!res.ok) throw new Error('Failed to fetch crypto price');

	return res.json();
}

// STOCKS

const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;

const stockPromises = new Map<string, Promise<number>>();

export const getStockPrice = unstable_cache(
	async (symbol: string) => {
		if (!stockPromises.has(symbol)) {
			stockPromises.set(symbol, fetchStocks(symbol));
		}

		return stockPromises.get(symbol)!;
	},
	['stocks-prices'],
	{
		revalidate: 3600,
		tags: ['stocks'],
	},
);

async function fetchStocks(symbol: string): Promise<number> {
	const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`);

	if (!res.ok) throw new Error('Failed to fetch stocks price');

	const data = await res.json();

	const priceStr = data?.['Global Quote']?.['05. price'];
	return priceStr ? Number(priceStr) : 0;
}

// MONEY

const forexPromises = new Map<string, Promise<number>>();

export const getForexPrice = unstable_cache(
	async (symbol: string) => {
		if (!forexPromises.has(symbol)) {
			forexPromises.set(symbol, fetchForex(symbol));
		}

		return forexPromises.get(symbol)!;
	},
	['forex-prices'],
	{
		revalidate: 3600,
		tags: ['forex'],
	},
);

async function fetchForex(symbol: string): Promise<number> {
	if (symbol.toUpperCase() === 'USD') return 1;

	const res = await fetch(`https://api.exchangerate.host/latest?base=${symbol.toUpperCase()}&symbols=USD`);

	if (!res.ok) throw new Error('Failed to fetch forex price');

	const data = (await res.json()) as { rates: Record<string, number> };

	return data.rates?.USD || 0;
}
