import { PieChart, SummaryBord, TransactionsTable } from '@/widgets';

export default function StocksPage() {
	return (
		<div>
			<SummaryBord header='Stocks Accounts Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' type='stocks' />
			<div className='grid grid-cols-4'>
				<div className='col-span-3 mr-2'>
					<TransactionsTable type={'stocks'} />
				</div>
				<div className='col-span-1'>
					<PieChart type='stocks' />
				</div>
			</div>
		</div>
	);
}
