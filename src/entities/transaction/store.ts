import { create } from 'zustand';
import { toast } from 'sonner';

import { AccountType, getTransactions, TransactionShema } from '@/entities';
import { Error } from '@/shared';

type TransactionsStore = {
	transactions: TransactionShema[];
	isLoading: boolean;
	loadTransactions: () => Promise<void>;
	getTransactions: (type: AccountType) => TransactionShema[];
};

export const useTransactionsStore = create<TransactionsStore>((set, get) => ({
	transactions: [],
	isLoading: false,

	loadTransactions: async () => {
		if (get().isLoading) return;

		set({ isLoading: true });
		try {
			const res = await getTransactions();
			console.log('store: ', res);
			set({ transactions: res, isLoading: false });
		} catch (error) {
			const err = error as Error;
			set({ isLoading: false });
			toast.error(`Error loading transactions: ${err.message}`);
		}
	},
	getTransactions: (type: AccountType) => {
		return get().transactions.filter((transaction) => transaction.type === type);
	},
}));
