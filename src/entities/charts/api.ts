import 'server-only';

import { getSupabaseServer } from '@/shared/lib/server/supabaseServer.ts';
import type { AccountType } from '@/shared/types';

import { getCryptoPricesInRangeUsd, getForexDailyPricesUsd, getPriceForHour, getStockDailyPricesUsd, normalizeStockSymbol, toHourKey, toHourStart } from './lib';
import type { FetchParameters, HistoricalSeries } from './model';

const HOUR_MS = 60 * 60 * 1000;

const buildAssetKey = (type: AccountType, symbol: string) => `${type}:${symbol}`;

const parseAssetKey = (assetKey: string) => {
	const [type, symbol] = assetKey.split(':');
	return { type: type as AccountType, symbol };
};

const getMonthStart = (timestampMs: number) => {
	const date = new Date(timestampMs);
	return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 0, 0, 0, 0);
};

const toMonthKey = (timestampMs: number) => {
	const date = new Date(timestampMs);
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	return `${year}-${month}`;
};

const getTransactionTimestamp = (dateValue: unknown, createdAtValue: unknown) => {
	const rawDate = String(dateValue ?? '').trim();
	const withHourMatch = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})-(\d{2})$/);
	if (withHourMatch) {
		const [, y, m, d, h] = withHourMatch;
		return Date.UTC(Number(y), Number(m) - 1, Number(d), Number(h), 0, 0, 0);
	}

	const dayOnlyMatch = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (dayOnlyMatch) {
		const [, y, m, d] = dayOnlyMatch;
		return Date.UTC(Number(y), Number(m) - 1, Number(d), 0, 0, 0, 0);
	}

	return new Date(String(createdAtValue ?? '')).getTime();
};

export const getHistoricalData = async ({ from, to, stepHours = 1, bucketMode = 'hours' }: FetchParameters): Promise<HistoricalSeries> => {
	const supabase = await getSupabaseServer();
	const toISO = new Date(to).toISOString();
	const fromHour = toHourStart(from);
	const toHour = toHourStart(to);
	const bucketMs = bucketMode === 'fortnight' ? 14 * 24 * HOUR_MS : Math.max(1, Math.floor(stepHours)) * HOUR_MS;
	const toBucketStart = bucketMode === 'month' ? (timestampMs: number) => getMonthStart(timestampMs) : (timestampMs: number) => Math.floor(timestampMs / bucketMs) * bucketMs;
	const bucketRange: number[] = [];
	const startBucket = bucketMode === 'month' ? getMonthStart(fromHour) : toBucketStart(fromHour);
	const endBucket = bucketMode === 'month' ? getMonthStart(toHour) : toBucketStart(toHour);
	if (bucketMode === 'month') {
		const cursor = new Date(startBucket);
		while (cursor.getTime() <= endBucket) {
			bucketRange.push(cursor.getTime());
			cursor.setUTCMonth(cursor.getUTCMonth() + 1);
		}
	} else {
		for (let ts = startBucket; ts <= endBucket; ts += bucketMs) {
			bucketRange.push(ts);
		}
	}

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error('User not found');

	const response = await supabase.from('transactions').select('date,created_at,amount,currency,type').eq('user_id', user.id).lte('created_at', toISO).order('created_at', { ascending: true });

	if (response.error) throw response.error;

	const transactions = response.data ?? [];
	const deltasByBucket = new Map<number, Map<string, number>>();
	const holdings = new Map<string, number>();
	const cryptoAssets = new Set<string>();
	const stockAssets = new Set<string>();
	const bankAssets = new Set<string>();

	for (const transaction of transactions) {
		const rawType = transaction.type as AccountType;
		if (!['crypto', 'stocks', 'bank'].includes(rawType)) continue;

		const amount = Number(transaction.amount);
		if (!Number.isFinite(amount)) continue;

		const currency = rawType === 'stocks' ? normalizeStockSymbol(String(transaction.currency)) : String(transaction.currency);
		const assetKey = buildAssetKey(rawType, currency);
		const txTs = getTransactionTimestamp(transaction.date, transaction.created_at);
		if (!Number.isFinite(txTs)) continue;

		if (rawType === 'crypto') cryptoAssets.add(currency);
		else if (rawType === 'stocks') stockAssets.add(currency);
		else bankAssets.add(currency);

		if (txTs < startBucket) {
			holdings.set(assetKey, (holdings.get(assetKey) ?? 0) + amount);
			continue;
		}

		const bucket = toBucketStart(txTs);
		const bucketDeltas = deltasByBucket.get(bucket) ?? new Map<string, number>();
		bucketDeltas.set(assetKey, (bucketDeltas.get(assetKey) ?? 0) + amount);
		deltasByBucket.set(bucket, bucketDeltas);
	}

	const [cryptoEntries, stockEntries, bankEntries] = await Promise.all([
		Promise.all(Array.from(cryptoAssets).map(async (asset) => [asset, await getCryptoPricesInRangeUsd(asset, fromHour - 24 * 60 * 60 * 1000, toHour)] as const)),
		Promise.all(Array.from(stockAssets).map(async (asset) => [asset, await getStockDailyPricesUsd(asset)] as const)),
		Promise.all(Array.from(bankAssets).map(async (asset) => [asset, await getForexDailyPricesUsd(asset, fromHour, toHour)] as const)),
	]);

	const cryptoSeries = new Map(cryptoEntries);
	const stockSeries = new Map(stockEntries);
	const bankSeries = new Map(bankEntries);
	const previousPrices = new Map<string, number>();
	const historicalSeries: HistoricalSeries = {};

	for (const bucketTs of bucketRange) {
		const bucketDeltas = deltasByBucket.get(bucketTs);
		if (bucketDeltas) {
			for (const [assetKey, delta] of bucketDeltas) {
				holdings.set(assetKey, (holdings.get(assetKey) ?? 0) + delta);
			}
		}

		let cryptoUsd = 0;
		let stocksUsd = 0;
		let bankUsd = 0;
		for (const [assetKey, amount] of holdings) {
			if (!amount) continue;

			const { type, symbol } = parseAssetKey(assetKey);
			const previousPrice = previousPrices.get(assetKey) ?? 0;
			let price = 0;

			if (type === 'crypto') {
				price = getPriceForHour(type, bucketTs, previousPrice, cryptoSeries.get(symbol) ?? []);
			} else if (type === 'stocks') {
				price = getPriceForHour(type, bucketTs, previousPrice, stockSeries.get(symbol) ?? new Map<string, number>());
			} else if (type === 'bank') {
				price = getPriceForHour(type, bucketTs, previousPrice, bankSeries.get(symbol) ?? new Map<string, number>());
			}

			previousPrices.set(assetKey, price);
			const usdValue = amount * price;
			if (type === 'crypto') cryptoUsd += usdValue;
			else if (type === 'stocks') stocksUsd += usdValue;
			else if (type === 'bank') bankUsd += usdValue;
		}

		const totalUsd = cryptoUsd + stocksUsd + bankUsd;
		const bucketKey = bucketMode === 'month' ? toMonthKey(bucketTs) : toHourKey(bucketTs);
		historicalSeries[bucketKey] = {
			crypto: Number(cryptoUsd.toFixed(2)),
			stocks: Number(stocksUsd.toFixed(2)),
			bank: Number(bankUsd.toFixed(2)),
			total: Number(totalUsd.toFixed(2)),
		};
	}

	return historicalSeries;
};
