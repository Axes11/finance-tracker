'use client';

import { useEffect } from 'react';

import { useAccountStore } from '@/entities';
import { Spinner } from '@/shared/ui';
import { SummaryBord } from '@/widgets';

export default function CryptoPage() {
	const { isLoading, getAccounts, loadAccounts } = useAccountStore();

	useEffect(() => {
		if (!getAccounts('crypto').length && getAccounts('crypto').length !== 0) {
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
				data={getAccounts('crypto')}
				header='Crypto Accounts Overview'
				description='Here you can see your balances in all categories, if you want see details switch to another page!'
				type='crypto'
			/>
		</div>
	);
}
