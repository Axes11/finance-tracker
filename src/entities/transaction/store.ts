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
	isLoading: boolean;

	setTransactions: (transactions: TransactionSchema[]) => void;
	setTotalAmount: (amount: TotalAmount) => void;
	setTotalAmountForAccounts: (totals: Record<string, number>) => void;
	setIsLoading: (value: boolean) => void;

	getTransactionsByType: (type: AccountType) => TransactionSchema[];
}

export const useTransactionsStore = create<TransactionsStore>((set, get) => ({
	transactions: [],
	totalAmount: { crypto: 0, stocks: 0, bank: 0, total: 0 },
	totalAmountForAccounts: {},
	isLoading: false,

	setTransactions: (transactions) => set({ transactions, isLoading: false }),
	setTotalAmount: (totalAmount) => set({ totalAmount }),
	setTotalAmountForAccounts: (totalAmountForAccounts) => set({ totalAmountForAccounts }),
	setIsLoading: (isLoading) => set({ isLoading }),

	getTransactionsByType: (type) => {
		return get().transactions.filter((t) => t.type === type);
	},
}));
