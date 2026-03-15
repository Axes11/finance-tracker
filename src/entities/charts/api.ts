import { getSupabaseServer } from '@/shared/lib/server/supabaseServer.ts';

import { getCryptoChartsData } from '@/entities/charts/lib.ts';
import { HistoricalData, FetchParameters } from '@/entities/charts/model.ts';

export const getHistoricalData = async ({ ticker, from, to }: FetchParameters) => {
	const res: Promise<Pick<HistoricalData, 'prices'>> = await getCryptoChartsData({ ticker, from, to });

	if (!res) throw new Error('Failed to fetch historical data');

	const supabase = await getSupabaseServer();

	const response = await supabase.from('transactions').select('*').lt('created_at', to).order('created_at', { ascending: true });

	if (response.error) throw response.error;

	const transactions = response.data ?? [];

	const transactionsData = new Map();

	for (let i = 0; i < transactions.length; i++) {
		const transaction = transactions[i];
		const { created_at, amount, currency } = transaction;

		const date = new Date(created_at);

		const Hours = String(date.getHours()).padStart(2, '0');
		const Day = String(date.getDate()).padStart(2, '0');
		const Month = String(date.getMonth() + 1).padStart(2, '0');
		const Year = String(date.getFullYear()).padStart(4, '0');

		const dateKey = `${Year}-${Month}-${Day}-${Hours}`;

		if (transactionsData.has(dateKey)) {
			const existingData = transactionsData.get(dateKey);
			if (existingData[currency]) {
				transactionsData.set(dateKey, { ...existingData, [currency]: existingData[currency] + amount });
			} else {
				transactionsData.set(dateKey, { ...existingData, [currency]: amount });
			}
		} else {
			transactionsData.set(dateKey, { [currency]: amount });
		}
	}
};
