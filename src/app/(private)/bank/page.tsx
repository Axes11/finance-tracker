import { SummaryBord, TransactionsTable } from '@/widgets';

export default function BankPage() {
	return (
		<div>
			<SummaryBord header='Bank Accounts Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' type='bank' />
			<TransactionsTable type={'bank'} />
		</div>
	);
}
