'use client';

import { SummaryBord, TransactionsTable } from '@/widgets';
import { useAccountStore, useTransactionsStore } from '@/entities';

export default function MainPage() {
	const { accounts } = useAccountStore();
	const { transactions } = useTransactionsStore();

	return (
		<div>
			<SummaryBord data={accounts} header='Dashboard Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' />
			<TransactionsTable data={transactions} />
		</div>
	);
}
