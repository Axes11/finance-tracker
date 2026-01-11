import { create } from 'zustand';
import { TransactionSchema } from './model.ts';
import { AccountType } from '@/shared/types';

interface TotalAmount {
	crypto: number;
	stocks: number;
	bank: number;
	total: number;
}

interface TransactionsStore {
	transactions: TransactionSchema[];
	totalAmount: TotalAmount;
	totalAmountForAccounts: Record<string, number>;
	hydrated: boolean;
	page: number;
	limit: number;

	setTransactions: (transactions: TransactionSchema[]) => void;
	setTotalAmount: (amount: TotalAmount) => void;
	setTotalAmountForAccounts: (totals: Record<string, number>) => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;

	getTransactionsByType: (type: AccountType) => TransactionSchema[];
}

export const useTransactionsStore = create<TransactionsStore>((set, get) => ({
	transactions: [],
	totalAmount: { crypto: 0, stocks: 0, bank: 0, total: 0 },
	totalAmountForAccounts: {},
	hydrated: false,
	page: 0,
	limit: 10,
	pagesTotalCount: 0,

	setTransactions: (transactions) => set({ transactions, hydrated: true }),
	setTotalAmount: (totalAmount) => set({ totalAmount }),
	setTotalAmountForAccounts: (totalAmountForAccounts) => set({ totalAmountForAccounts }),
	setPage: (page) => set({ page }),
	setLimit: (limit) => set({ limit }),

	getTransactionsByType: (type) => {
		return get().transactions.filter((t) => t.type === type);
	},
}));
