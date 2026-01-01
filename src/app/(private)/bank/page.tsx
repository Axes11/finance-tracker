'use client';

import { SummaryBord } from '@/widgets';
import { useAccountStore } from '@/entities';

export default function BankPage() {
	const { getAccounts } = useAccountStore();

	return (
		<div>
			<SummaryBord
				data={getAccounts('bank')}
				header='Bank Accounts Overview'
				description='Here you can see your balances in all categories, if you want see details switch to another page!'
				type='bank'
			/>
		</div>
	);
}
