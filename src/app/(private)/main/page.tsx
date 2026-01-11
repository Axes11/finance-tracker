import { SummaryBord, TransactionsTable } from '@/widgets';

export default async function MainPage() {
	return (
		<div>
			<SummaryBord header='Dashboard Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' />
			<TransactionsTable />
		</div>
	);
}
