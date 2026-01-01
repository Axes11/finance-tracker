'use client';

import { useAccountStore } from '@/entities';
import { SummaryBord } from '@/widgets';

export default function CryptoPage() {
	const { getAccounts } = useAccountStore();

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
