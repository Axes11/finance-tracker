'use client';

import { useAccountStore } from '@/entities/account';
import { Spinner } from '@/shared/ui';
import { CreateAccount } from '@/features/accounts/create-account';
import { useEffect } from 'react';

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

	if (getAccounts('bank').length === 0) {
		return <CreateAccount type='bank' />;
	}

	return (
		<div>
			<h1>Your Bank Accounts</h1>
			{getAccounts('bank').map((account) => (
				<ul key={account.id}>
					<li>{account.name}</li>
					<li>{account.description}</li>
				</ul>
			))}
		</div>
	);
}
