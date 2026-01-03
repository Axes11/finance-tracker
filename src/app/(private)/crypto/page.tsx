'use client';

import { useAccountStore, useTransactionsStore } from '@/entities';
import { SummaryBord, TransactionsTable } from '@/widgets';

export default function CryptoPage() {
	const { getAccounts } = useAccountStore();
	const { getTransactions } = useTransactionsStore();

	return (
		<div>
			<SummaryBord
				data={getAccounts('crypto')}
				header='Crypto Accounts Overview'
				description='Here you can see your balances in all categories, if you want see details switch to another page!'
				type='crypto'
			/>
			<TransactionsTable data={getTransactions('crypto')} />
		</div>
	);
}
