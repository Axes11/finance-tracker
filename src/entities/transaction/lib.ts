'use server';

const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;

type NextFetchOptions = RequestInit & {
	next?: {
		revalidate?: number;
		tags?: string[];
	};
};

const coinIdMap: Record<string, string> = {
	BTC: 'bitcoin',
	ETH: 'ethereum',
	BNB: 'binancecoin',
	DOGE: 'dogecoin',
	LINK: 'chainlink',
	ADA: 'cardano',
	XRP: 'ripple',
	SOL: 'solana',
	LTC: 'litecoin',
	USDT: 'tether',
};

export const getCryptoPrice = async (symbol: string): Promise<number> => {
	try {
		const coinId = coinIdMap[symbol.toUpperCase()];
		if (!coinId) return 0;

		const fetchOptions: NextFetchOptions = {
			next: {
				revalidate: 3600,
				tags: ['crypto-price'],
			},
		};

		const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`, fetchOptions);

		if (!res.ok) throw new Error('Failed to fetch crypto price');

		const data = (await res.json()) as Record<string, { usd: number }>;

		return data[coinId]?.usd || 0;
	} catch (error) {
		console.error('Error fetching crypto price:', error);
		return 0;
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
