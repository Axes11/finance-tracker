import { supabaseClient } from '@/shared';
import { AccountType, TransactionShema } from '@/entities';

export const createTransaction = async (account_id: string, amount: number, description: string, currency: string, category: string, type: AccountType, date: Date): Promise<void> => {
	const { error } = await supabaseClient.from('transactions').insert([{ account_id, amount, description, currency, category, type, date }]);

	if (error) throw error;
};

export const getTransactions = async (): Promise<TransactionShema[]> => {
	const { data, error } = await supabaseClient.from('transactions').select('*');

	if (error) throw error;

	return data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
	const { error } = await supabaseClient.from('transactions').delete().eq('id', id);

	if (error) throw error;
};

export const updateTransaction = async (id: string, amount: number, description: string): Promise<void> => {
	const { error } = await supabaseClient.from('transactions').update({ amount, description }).eq('id', id);

	if (error) throw error;
};

// export const getTotalTransactionsAmount = async (): Promise<number> => {
// Implementation for calculating total transaction amount
// };
