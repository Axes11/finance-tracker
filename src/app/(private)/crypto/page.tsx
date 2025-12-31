'use client';

import { CreateAccount } from '@/features/accounts/create-account';
import { useAccountStore } from '@/entities/account';
import { Spinner } from '@/shared/ui';
import { useEffect } from 'react';

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

	if (getAccounts('crypto').length === 0) {
		return <CreateAccount type='crypto' />;
	}

	return (
		<div>
			<h1>Your Crypto Accounts</h1>
			{getAccounts('crypto').map((account) => (
				<ul key={account.id}>
					<li>{account.name}</li>
					<li>{account.description}</li>
				</ul>
			))}
		</div>
	);
}
