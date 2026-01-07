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

	setTransactions: (transactions: TransactionSchema[]) => void;
	setTotalAmount: (amount: TotalAmount) => void;
	setTotalAmountForAccounts: (totals: Record<string, number>) => void;

	getTransactionsByType: (type: AccountType) => TransactionSchema[];
}

export const useTransactionsStore = create<TransactionsStore>((set, get) => ({
	transactions: [],
	totalAmount: { crypto: 0, stocks: 0, bank: 0, total: 0 },
	totalAmountForAccounts: {},
	hydrated: false,

	setTransactions: (transactions) => set({ transactions, hydrated: true }),
	setTotalAmount: (totalAmount) => set({ totalAmount }),
	setTotalAmountForAccounts: (totalAmountForAccounts) => set({ totalAmountForAccounts }),

	getTransactionsByType: (type) => {
		return get().transactions.filter((t) => t.type === type);
	},
}));
