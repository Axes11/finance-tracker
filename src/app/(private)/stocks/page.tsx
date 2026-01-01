'use client';

import { useEffect } from 'react';

import { useAccountStore } from '@/entities';
import { Spinner } from '@/shared';
import { SummaryBord } from '@/widgets';

export default function StocksPage() {
	const { isLoading, getAccounts, loadAccounts } = useAccountStore();

	useEffect(() => {
		loadAccounts();
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
				data={getAccounts('stocks')}
				header='Stocks Accounts Overview'
				description='Here you can see your balances in all categories, if you want see details switch to another page!'
				type='stocks'
			/>
		</div>
	);
}
