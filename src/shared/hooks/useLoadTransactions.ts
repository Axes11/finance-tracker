import { useTransactionsStore } from '@/entities/transaction/store.ts';
import { getTransactions } from '@/entities/transaction/api.ts';

export const useLoadTransactions = () => {
	const { setTransactions, page, limit } = useTransactionsStore();

	const loadTransactions = async () => {
		const transactions = await getTransactions(page, limit);
		setTransactions(transactions.data);
	};

	return { loadTransactions };
};
