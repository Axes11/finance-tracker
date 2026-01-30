import { SummaryBord, TransactionsTable, PieChart } from '@/widgets';

export default async function MainPage() {
	return (
		<div>
			<SummaryBord header='Dashboard Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' />
			<div className='grid grid-cols-4'>
				<div className='col-span-3 mr-2'>
					<TransactionsTable />
				</div>
				<div className='col-span-1'>
					<PieChart type='total' />
				</div>
			</div>
		</div>
	);
}
