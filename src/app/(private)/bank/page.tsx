import { PieChart, SummaryBord, TransactionsTable } from '@/widgets';

export default function BankPage() {
	return (
		<div className='space-y-2'>
			<SummaryBord header='Bank Accounts Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' type='bank' />
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				<div className='order-2 lg:order-1 lg:col-span-3'>
					<TransactionsTable type={'bank'} />
				</div>
				<div className='order-1 lg:order-2 lg:col-span-1'>
					<PieChart type='bank' />
				</div>
			</div>
		</div>
	);
}
