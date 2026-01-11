import { useTransactionsStore } from '@/entities/transaction/store.ts';
import { getTransactions } from '@/entities/transaction/api.ts';

export const useLoadTransactions = () => {
	const { setTransactions } = useTransactionsStore();

	const loadTransactions = async () => {
		const transactions = await getTransactions();
		setTransactions(transactions);
	};

	return { loadTransactions };
};
