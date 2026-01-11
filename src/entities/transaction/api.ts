'use server';

import { revalidateTag, unstable_cache } from 'next/cache';

import { TransactionSchema } from './model.ts';
import { getCryptoPrice, getForexPrice, getStockPrice } from './lib.ts';

import { getSupabaseServer } from '@/shared/lib/server/supabaseServer';
import { AccountType, TotalTransactionsAmount } from '@/shared/types';

export const createTransaction = async (account_id: string, amount: number, description: string, currency: string, category: string, type: AccountType, date: string): Promise<void> => {
	try {
		const supabase = await getSupabaseServer();

		const { error } = await supabase.from('transactions').insert([{ account_id, amount, description, currency, category, type, date }]);

		if (error) throw error;

		revalidateTag('transactions', 'max');
	} catch (error) {
		console.error('Error creating transaction:', error);
		throw error;
	}
};

export const getTransactions = async (page: number, limit: number): Promise<TransactionSchema[]> => {
	try {
		const from = page * limit;
		const to = from + limit - 1;

		const supabase = await getSupabaseServer();

		const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false }).range(from, to);

		if (error) throw error;

		return data;
	} catch (error) {
		console.error('Error getting transactions:', error);
		throw error;
	}
};

export const deleteTransaction = async (id: string): Promise<void> => {
	try {
		const supabase = await getSupabaseServer();

		const { error } = await supabase.from('transactions').delete().eq('id', id);

		if (error) throw error;

		revalidateTag('transactions', 'max');
	} catch (error) {
		console.error('Error deleting transaction:', error);
		throw error;
	}
};

export const updateTransaction = async (id: string, amount: number, description: string, currency: string, category: string, date: string): Promise<void> => {
	try {
		const supabase = await getSupabaseServer();

		const { error } = await supabase.from('transactions').update({ amount, description, currency, category, date }).eq('id', id);

		if (error) throw error;

		revalidateTag('transactions', 'max');
	} catch (error) {
		console.error('Error updating transaction:', error);
		throw error;
	}
};

export const getCachedTotal = unstable_cache(
	async (transactions: TransactionSchema[], _userId: string): Promise<TotalTransactionsAmount> => {
		const cryptoMap = new Map<string, number>();
		const stocksMap = new Map<string, number>();
		const bankMap = new Map<string, number>();

		const accountCurrencyMap: Record<string, Record<string, number>> = {};

		for (const tx of transactions!) {
			const { type, currency, amount, account_id } = tx;

			if (type === 'crypto') cryptoMap.set(currency, (cryptoMap.get(currency) || 0) + amount);
			else if (type === 'stocks') stocksMap.set(currency, (stocksMap.get(currency) || 0) + amount);
			else if (type === 'bank') bankMap.set(currency, (bankMap.get(currency) || 0) + amount);

			if (!accountCurrencyMap[account_id]) accountCurrencyMap[account_id] = {};
			accountCurrencyMap[account_id][currency] = (accountCurrencyMap[account_id][currency] || 0) + amount;
		}

		const priceCache: Record<string, number> = { USD: 1, USDT: 1 };

		const getPriceWithCache = async (symbol: string, type: string) => {
			if (priceCache[symbol]) return priceCache[symbol];

			let price = 0;
			if (type === 'crypto') price = await getCryptoPrice(symbol);
			else if (type === 'stocks') price = await getStockPrice(symbol);
			else if (type === 'bank') price = await getForexPrice(symbol);

			priceCache[symbol] = price;
			return price;
		};

		const calculateTotal = async (map: Map<string, number>, type: string) => {
			let sum = 0;
			for (const [currency, amount] of map) {
				const price = await getPriceWithCache(currency, type);
				sum += amount * price;
			}
			return sum;
		};

		const [totalCrypto, totalStocks, totalBank] = await Promise.all([calculateTotal(cryptoMap, 'crypto'), calculateTotal(stocksMap, 'stocks'), calculateTotal(bankMap, 'bank')]);

		const accountTotals: Record<string, number> = {};
		for (const accountId in accountCurrencyMap) {
			let accountSum = 0;
			for (const currency in accountCurrencyMap[accountId]) {
				const amount = accountCurrencyMap[accountId][currency];
				const price = priceCache[currency] || 1;
				accountSum += amount * price;
			}
			accountTotals[accountId] = accountSum;
		}

		return {
			crypto: totalCrypto,
			stocks: totalStocks,
			bank: totalBank,
			total: totalCrypto + totalStocks + totalBank,
			accountTotals,
		};
	},
	['transactions-total'],
	{
		revalidate: 3600,
		tags: ['transactions'],
		// @ts-expect-error - TS doesnt see the cacheLife property
		cacheLife: 'max',
	},
);

export const getTotalTransactionsAmount = async (): Promise<TotalTransactionsAmount> => {
	try {
		const supabase = await getSupabaseServer();

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			throw new Error('User not found');
		}

		const { data: transactions, error } = await supabase.from('transactions').select('*').eq('user_id', user?.id);

		if (error) throw error;

		return getCachedTotal(transactions || [], user.id);
	} catch (error) {
		console.error('Error getting total transactions amount:', error);
		throw error;
	}
};
