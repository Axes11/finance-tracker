'use client';

import { SummaryBord, TransactionsTable } from '@/widgets';

export default function StocksPage() {
	return (
		<div>
			<SummaryBord header='Stocks Accounts Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' type='stocks' />
			<TransactionsTable type={'stocks'} />
		</div>
	);
}
