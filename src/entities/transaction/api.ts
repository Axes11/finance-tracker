'use server';

import { TransactionShema } from './model.ts';
import { getCryptoPrice, getForexPrice, getStockPrice } from './lib.ts';

import { getSupabaseServer } from '@/shared/lib/server/supabaseServer';
import { AccountType } from '@/shared/types';

export const createTransaction = async (account_id: string, amount: number, description: string, currency: string, category: string, type: AccountType, date: string): Promise<void> => {
	const supabase = await getSupabaseServer();

	const { error } = await supabase.from('transactions').insert([{ account_id, amount, description, currency, category, type, date }]);

	if (error) throw error;
};

export const getTransactions = async (): Promise<TransactionShema[]> => {
	const supabase = await getSupabaseServer();

	const { data, error } = await supabase.from('transactions').select('*');

	if (error) throw error;

	return data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
	const supabase = await getSupabaseServer();

	const { error } = await supabase.from('transactions').delete().eq('id', id);

	if (error) throw error;
};

export const updateTransaction = async (id: string, amount: number, description: string, currency: string, category: string, date: string): Promise<void> => {
	const supabase = await getSupabaseServer();

	const { error } = await supabase.from('transactions').update({ amount, description, currency, category, date }).eq('id', id);

	if (error) throw error;
};

export const getTotalTransactionsAmount = async (): Promise<{
	crypto: number;
	stocks: number;
	bank: number;
	total: number;
	accountTotals: Record<string, number>;
}> => {
	const supabase = await getSupabaseServer();
	const { data: transactions, error } = await supabase.from('transactions').select('*');

	if (error) throw error;

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
};
