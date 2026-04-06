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
			const apiKey = process.env.ALPHAVANTAGE_API_KEY;
			if (!apiKey) {
				throw new Error(`ALPHAVANTAGE_API_KEY is not configured. Unable to fetch stock price for "${s}".`);
			}

			const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(s)}&apikey=${apiKey}`);
			if (!res.ok) {
				throw new Error(`Alpha Vantage request failed for "${s}" with status ${res.status}.`);
			}

			const data = await res.json();
			if (data?.Note || data?.['Error Message']) {
				throw new Error(`Alpha Vantage returned an API error for "${s}": ${data?.Note || data?.['Error Message']}`);
			}

			const price = Number(data?.['Global Quote']?.['05. price']);
			if (!Number.isFinite(price) || price <= 0) {
				throw new Error(`Invalid stock price for "${s}". Response: ${JSON.stringify(data)}`);
			}

			return price;
		},
		[`stock-price-v2-${symbol}`],
		{ revalidate: 3600, tags: ['stocks', symbol] },
	)(symbol);
};

export const getForexPrice = async (symbol: string) => {
	const s = symbol.toUpperCase();
	if (s === 'USD') return 1;

	return unstable_cache(
		async (sym: string) => {
			const res = await fetch(`https://api.frankfurter.app/latest?from=${encodeURIComponent(sym)}&to=USD`);
			if (!res.ok) {
				throw new Error(`frankfurter.app request failed for "${sym}" with status ${res.status}.`);
			}

			const data = await res.json();
			const rate = Number(data?.rates?.USD);
			if (!Number.isFinite(rate) || rate <= 0) {
				throw new Error(`Invalid forex rate for "${sym}". Response: ${JSON.stringify(data)}`);
			}

			return rate;
		},
		[`forex-price-v3-${s}`],
		{ revalidate: 3600, tags: ['forex', s] },
	)(s);
};
