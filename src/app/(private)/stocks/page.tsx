'use client';

import { useAccountStore, useTransactionsStore } from '@/entities';
import { SummaryBord, TransactionsTable } from '@/widgets';

export default function StocksPage() {
	const { getAccounts } = useAccountStore();
	const { getTransactions } = useTransactionsStore();

	return (
		<div>
			<SummaryBord
				data={getAccounts('stocks')}
				header='Stocks Accounts Overview'
				description='Here you can see your balances in all categories, if you want see details switch to another page!'
				type='stocks'
			/>
			<TransactionsTable data={getTransactions('stocks')} />
		</div>
	);
}
