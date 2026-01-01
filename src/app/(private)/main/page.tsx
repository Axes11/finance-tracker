'use client';

import { SummaryBord } from '@/widgets';
import { useAccountStore } from '@/entities';

export default function MainPage() {
	const { accounts } = useAccountStore();

	return (
		<div>
			<SummaryBord data={accounts} header='Dashboard Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' />
		</div>
	);
}
