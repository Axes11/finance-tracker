'use server';

import { unstable_cache } from 'next/cache';

export const getCryptoPrice = unstable_cache(
	async () => {
		const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
		if (!res.ok) throw new Error('Failed to fetch crypto');
		return res.json();
	},
	['crypto-list-usd'],
	{ revalidate: 3600, tags: ['crypto'] },
);

export const getStockPrice = async (symbol: string) => {
	return unstable_cache(
		async (s: string) => {
			const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${s}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`);
			const data = await res.json();
			return Number(data?.['Global Quote']?.['05. price']) || 0;
		},
		[`stock-price-${symbol}`],
		{ revalidate: 3600, tags: ['stocks', symbol] },
	)(symbol);
};

export const getForexPrice = async (symbol: string) => {
	const s = symbol.toUpperCase();
	if (s === 'USD') return 1;

	return unstable_cache(
		async (sym: string) => {
			const res = await fetch(`https://api.exchangerate.host/latest?base=${sym}&symbols=USD`);
			const data = await res.json();
			return data.rates?.USD || 0;
		},
		[`forex-price-${s}`],
		{ revalidate: 3600, tags: ['forex', s] },
	)(s);
};
