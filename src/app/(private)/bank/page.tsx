'use client';

import { useAccountStore } from '@/entities/account';
import { Spinner } from '@/shared/ui';
import { useEffect } from 'react';
import { SummaryBord } from '@/widgets';

export default function BankPage() {
	const { isLoading, getAccounts, loadAccounts } = useAccountStore();

	useEffect(() => {
		if (!getAccounts('bank').length && getAccounts('bank').length !== 0) {
			loadAccounts();
		}
	}, []);

	if (isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

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
