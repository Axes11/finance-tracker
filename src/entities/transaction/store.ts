import { create } from 'zustand';
import { TransactionSchema } from './model.ts';
import { AccountType, TotalTransactionsAmount } from '@/shared/types';

interface TransactionsStore {
	transactions: TransactionSchema[];
	totalAmount: TotalTransactionsAmount;
	totalAmountForAccounts: Map<string, number>;
	hydrated: boolean;
	page: number;
	limit: number;

	setTransactions: (transactions: TransactionSchema[]) => void;
	setTotalAmount: (amount: TotalTransactionsAmount) => void;
	setTotalAmountForAccounts: (totals: Map<string, number>) => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;

	getTransactionsByType: (type: AccountType) => TransactionSchema[];
}

export const useTransactionsStore = create<TransactionsStore>((set, get) => ({
	transactions: [],
	totalAmount: {
		crypto: { total: 0, values: [] },
		stocks: { total: 0, values: [] },
		bank: { total: 0, values: [] },
		total: { total: 0, values: [] },
		accountTotals: new Map(),
	},
	totalAmountForAccounts: new Map(),
	hydrated: false,
	page: 0,
	limit: 10,

	setTransactions: (transactions) => set({ transactions, hydrated: true }),
	setTotalAmount: (totalAmount) => set({ totalAmount }),
	setTotalAmountForAccounts: (totalAmountForAccounts) => set({ totalAmountForAccounts }),
	setPage: (page) => set({ page }),
	setLimit: (limit) => set({ limit }),

	getTransactionsByType: (type) => {
		return get().transactions.filter((t) => t.type === type);
	},
}));
