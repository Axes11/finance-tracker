'use client';

import { useAccountStore } from '@/entities/account';
import { Spinner } from '@/shared/ui';
import { CreateAccount } from '@/features/accounts/create-account';
import { useEffect } from 'react';

export default function StocksPage() {
	const { isLoading, getAccounts, loadAccounts } = useAccountStore();

	useEffect(() => {
		if (!getAccounts('stocks').length && getAccounts('stocks').length !== 0) {
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

	if (getAccounts('stocks').length === 0) {
		return <CreateAccount type='stocks' />;
	}

	return (
		<div>
			<h1>Your Stocks Accounts</h1>
			{getAccounts('stocks').map((account) => (
				<ul key={account.id}>
					<li>{account.name}</li>
					<li>{account.description}</li>
				</ul>
			))}
		</div>
	);
}
