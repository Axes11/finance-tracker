import 'server-only';

import { unstable_cache } from 'next/cache';

const STOCK_SYMBOL_ALIASES: Record<string, string> = {
	FB: 'META',
	APPL: 'AAPL',
};

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

type CryptoRangeResponse = {
	prices: [number, number][];
};

type FrankfurterRangeResponse = {
	rates: Record<string, Record<string, number>>;
};

const toDayKey = (timestampMs: number) => new Date(timestampMs).toISOString().slice(0, 10);

export const toHourStart = (timestampMs: number) => Math.floor(timestampMs / HOUR_MS) * HOUR_MS;

export const toHourKey = (timestampMs: number) => {
	const iso = new Date(toHourStart(timestampMs)).toISOString();
	return `${iso.slice(0, 10)}-${iso.slice(11, 13)}`;
};

export const getHourlyRange = (from: number, to: number) => {
	const start = toHourStart(from);
	const end = toHourStart(to);
	const hours: number[] = [];
	for (let ts = start; ts <= end; ts += HOUR_MS) {
		hours.push(ts);
	}
	return hours;
};

export const normalizeStockSymbol = (symbol: string) => STOCK_SYMBOL_ALIASES[symbol.trim().toUpperCase()] ?? symbol.trim().toUpperCase();

const findLatestPrice = (points: [number, number][], timestampMs: number, fallback: number) => {
	let latest = fallback;
	for (const [pointTs, pointPrice] of points) {
		if (pointTs <= timestampMs) latest = pointPrice;
		else break;
	}
	return latest;
};

const getCoinSearch = (query: string) =>
	unstable_cache(
		async (q: string) => {
			const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(q)}`, { next: { revalidate: 3600 } });
			if (!res.ok) throw new Error(`CoinGecko search failed for "${q}" with status ${res.status}.`);
			return res.json();
		},
		[`cg-search-v1-${query.toLowerCase()}`],
		{ revalidate: 3600, tags: ['charts', 'crypto'] },
	)(query);

const resolveCoinId = async (asset: string) => {
	const search = await getCoinSearch(asset);
	const query = asset.trim().toLowerCase();
	const first = search?.coins?.find(
		(coin: { id: string; symbol: string; name: string }) => coin.name?.toLowerCase() === query || coin.symbol?.toLowerCase() === query || coin.id?.toLowerCase() === query,
	);
	return (first?.id || asset).toLowerCase();
};

const getCryptoSpotPriceUsdById = (coinId: string) =>
	unstable_cache(
		async (id: string) => {
			const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(id)}&vs_currencies=usd`, { next: { revalidate: 3600 } });
			if (!res.ok) return 0;
			const data = await res.json();
			const price = Number(data?.[id]?.usd);
			return Number.isFinite(price) && price > 0 ? price : 0;
		},
		[`cg-spot-v1-${coinId}`],
		{ revalidate: 3600, tags: ['charts', 'crypto', coinId] },
	)(coinId);

export const getCryptoPricesInRangeUsd = async (asset: string, fromMs: number, toMs: number): Promise<[number, number][]> => {
	const coinId = await resolveCoinId(asset);
	const fromSec = Math.floor(fromMs / 1000);
	const toSec = Math.floor(toMs / 1000);

	const data = await unstable_cache(
		async (id: string, from: number, to: number): Promise<CryptoRangeResponse> => {
			const res = await fetch(`https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}/market_chart/range?vs_currency=usd&from=${from}&to=${to}&precision=full`, {
				next: { revalidate: 3600 },
			});
			if (!res.ok) {
				if (res.status === 429) {
					return { prices: [] };
				}
				throw new Error(`CoinGecko historical range failed for "${id}" with status ${res.status}.`);
			}
			return res.json();
		},
		[`cg-range-v1-${coinId}-${fromSec}-${toSec}`],
		{ revalidate: 3600, tags: ['charts', 'crypto', coinId] },
	)(coinId, fromSec, toSec);

	const prices = Array.isArray(data?.prices)
		? data.prices.filter((entry): entry is [number, number] => Array.isArray(entry) && entry.length === 2 && Number.isFinite(entry[0]) && Number.isFinite(entry[1]))
		: [];
	if (prices.length > 0) return prices;

	const spot = await getCryptoSpotPriceUsdById(coinId);
	if (spot > 0)
		return [
			[fromMs, spot],
			[toMs, spot],
		];

	return [];
};

export const getStockDailyPricesUsd = async (symbol: string): Promise<Map<string, number>> => {
	const normalizedSymbol = normalizeStockSymbol(symbol);
	const csv = await unstable_cache(
		async (s: string) => {
			const res = await fetch(`https://stooq.com/q/d/l/?s=${encodeURIComponent(s.toLowerCase())}.us&i=d`, { next: { revalidate: 3600 } });
			if (!res.ok) throw new Error(`Stooq request failed for "${s}" with status ${res.status}.`);
			return res.text();
		},
		[`stooq-daily-v1-${normalizedSymbol}`],
		{ revalidate: 3600, tags: ['charts', 'stocks', normalizedSymbol] },
	)(normalizedSymbol);

	const lines = csv.trim().split('\n');
	const map = new Map<string, number>();

	for (let i = 1; i < lines.length; i++) {
		const [date, _open, _high, _low, close] = lines[i].split(',');
		const closeNum = Number(close);
		if (!date || !Number.isFinite(closeNum) || closeNum <= 0) continue;
		map.set(date, closeNum);
	}

	return map;
};

export const getForexDailyPricesUsd = async (currency: string, fromMs: number, toMs: number): Promise<Map<string, number>> => {
	const normalized = currency.trim().toUpperCase();
	if (normalized === 'USD') return new Map([[toDayKey(fromMs), 1]]);

	const start = toDayKey(Math.max(0, fromMs - DAY_MS));
	const end = toDayKey(toMs);
	const data = await unstable_cache(
		async (fromCurrency: string, startDate: string, endDate: string): Promise<FrankfurterRangeResponse> => {
			const res = await fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${encodeURIComponent(fromCurrency)}&to=USD`, { next: { revalidate: 3600 } });
			if (!res.ok) throw new Error(`Frankfurter range failed for "${fromCurrency}" with status ${res.status}.`);
			return res.json();
		},
		[`fx-range-v1-${normalized}-${start}-${end}`],
		{ revalidate: 3600, tags: ['charts', 'forex', normalized] },
	)(normalized, start, end);

	const map = new Map<string, number>();
	const rates = data?.rates ?? {};
	for (const [day, value] of Object.entries(rates)) {
		const rate = Number(value?.USD);
		if (!Number.isFinite(rate) || rate <= 0) continue;
		map.set(day, rate);
	}

	return map;
};

export const getPriceForHour = (kind: 'crypto' | 'stocks' | 'bank', timestampMs: number, previousPrice: number, series: [number, number][] | Map<string, number>) => {
	if (kind === 'crypto') {
		return findLatestPrice(series as [number, number][], timestampMs, previousPrice);
	}

	const daily = series as Map<string, number>;
	const day = toDayKey(timestampMs);
	return daily.get(day) ?? previousPrice;
};
