import { useTransactionsStore } from '@/entities/transaction/store.ts';
import { getTotalTransactionsAmount } from '@/entities/transaction/api.ts';

export const useLoadTotalAmount = () => {
	const { setTotalAmountForAccounts, setTotalAmount } = useTransactionsStore();

	const loadTotalAmount = async () => {
		const { accountTotals, total, bank, stocks, crypto } = await getTotalTransactionsAmount();
		setTotalAmount({ total, bank, stocks, crypto, accountTotals });
		setTotalAmountForAccounts(accountTotals);
	};

	return { loadTotalAmount };
};
