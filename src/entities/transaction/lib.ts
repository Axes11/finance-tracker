const ALPHAVANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY;

// Rate limiting cache to prevent excessive API calls
const priceCache = new Map<string, { price: number; timestamp: number }>();
const CACHE_DURATION = 60000; // 1 minute cache

export const getCryptoPrice = async (symbol: string): Promise<number> => {
	const cacheKey = `crypto_${symbol}`;
	const cached = priceCache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
		return cached.price;
	}

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
	if (!coinId) {
		console.warn(`Unknown cryptocurrency symbol: ${symbol}`);
		return 0;
	}

	try {
		const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);

		if (!res.ok) {
			throw new Error(`CoinGecko API error: ${res.status}`);
		}

		const data = (await res.json()) as Record<string, { usd: number }>;
		const price = data[coinId]?.usd || 0;

		priceCache.set(cacheKey, { price, timestamp: Date.now() });
		return price;
	} catch (error) {
		console.error(`Error fetching crypto price for ${symbol}:`, error);
		return 0;
	}
};

export const getStockPrice = async (symbol: string): Promise<number> => {
	if (!ALPHAVANTAGE_API_KEY) {
		console.error('Alpha Vantage API key is missing');
		throw new Error('Alpha Vantage API key is missing');
	}

	const cacheKey = `stock_${symbol}`;
	const cached = priceCache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
		return cached.price;
	}

	try {
		const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${ALPHAVANTAGE_API_KEY}`);

		if (!res.ok) {
			throw new Error(`Alpha Vantage API error: ${res.status}`);
		}

		const data = (await res.json()) as {
			'Global Quote'?: {
				'05. price': string;
			};
		};

		const priceStr = data['Global Quote']?.['05. price'];
		const price = priceStr ? parseFloat(priceStr) : 0;

		priceCache.set(cacheKey, { price, timestamp: Date.now() });
		return price;
	} catch (error) {
		console.error(`Error fetching stock price for ${symbol}:`, error);
		return 0;
	}
};

export const getForexPrice = async (symbol: string): Promise<number> => {
	if (symbol.toUpperCase() === 'USD') return 1;

	const cacheKey = `forex_${symbol}`;
	const cached = priceCache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
		return cached.price;
	}

	try {
		const res = await fetch(`https://api.exchangerate.host/latest?base=${encodeURIComponent(symbol.toUpperCase())}&symbols=USD`);

		if (!res.ok) {
			throw new Error(`Exchange rate API error: ${res.status}`);
		}

		const data = (await res.json()) as { rates: Record<string, number> };
		const price = data.rates?.USD || 0;

		priceCache.set(cacheKey, { price, timestamp: Date.now() });
		return price;
	} catch (error) {
		console.error(`Error fetching forex price for ${symbol}:`, error);
		return 0;
	}
};
