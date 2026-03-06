import { PieChart, SummaryBord, TransactionsTable } from '@/widgets';

export default function StocksPage() {
	return (
		<div className='space-y-2'>
			<SummaryBord header='Stocks Accounts Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' type='stocks' />
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				<div className='order-2 lg:order-1 lg:col-span-3'>
					<TransactionsTable type='stocks' />
				</div>
				<div className='order-1 lg:order-2 lg:col-span-1'>
					<PieChart type='stocks' />
				</div>
			</div>
		</div>
	);
}
