const ALPHAVANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY;

export const getCryptoPrice = async (symbol: string): Promise<number> => {
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

	const coinId = coinIdMap[symbol.toUpperCase()];
	if (!coinId) return 0;

	const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
	const data = (await res.json()) as Record<string, { usd: number }>;

	return data[coinId]?.usd || 0;
};

export const getStockPrice = async (symbol: string): Promise<number> => {
	if (!ALPHAVANTAGE_API_KEY) throw new Error('Alpha Vantage API key is missing');

	const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`);
	const data = (await res.json()) as {
		'Global Quote'?: {
			'05. price': string;
		};
	};

	const priceStr = data['Global Quote']?.['05. price'];
	return priceStr ? parseFloat(priceStr) : 0;
};

export const getForexPrice = async (symbol: string): Promise<number> => {
	if (symbol.toUpperCase() === 'USD') return 1;

	const res = await fetch(`https://api.exchangerate.host/latest?base=${symbol.toUpperCase()}&symbols=USD`);
	const data = (await res.json()) as { rates: Record<string, number> };

	return data.rates?.USD || 0;
};
