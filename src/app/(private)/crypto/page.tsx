'use client';

import { SummaryBord, TransactionsTable } from '@/widgets';

export default function CryptoPage() {
	return (
		<div>
			<SummaryBord header='Crypto Accounts Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' type='crypto' />
			<TransactionsTable type={'crypto'} />
		</div>
	);
}
