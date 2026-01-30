import { PieChart, SummaryBord, TransactionsTable } from '@/widgets';

export default function BankPage() {
	return (
		<div>
			<SummaryBord header='Bank Accounts Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' type='bank' />
			<div className='grid grid-cols-4'>
				<div className='col-span-3 mr-2'>
					<TransactionsTable type={'bank'} />
				</div>
				<div className='col-span-1'>
					<PieChart type='bank' />
				</div>
			</div>
		</div>
	);
}
