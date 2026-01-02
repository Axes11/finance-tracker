'use client';

import { SummaryBord, TransactionsTable } from '@/widgets';
import { useAccountStore, useTransactionsStore } from '@/entities';

export default function BankPage() {
	const { getAccounts } = useAccountStore();
	const { getTransactions } = useTransactionsStore();

	return (
		<div>
			<SummaryBord
				data={getAccounts('bank')}
				header='Bank Accounts Overview'
				description='Here you can see your balances in all categories, if you want see details switch to another page!'
				type='bank'
			/>
			<TransactionsTable data={getTransactions('bank')} />
		</div>
	);
}
