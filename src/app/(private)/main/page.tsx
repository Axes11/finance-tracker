import { SummaryBord, TransactionsTable, PieChart } from '@/widgets';
import { Divider } from '@/shared/ui';
import { LineChart } from '@/shared/ui/line-chart';

export default async function MainPage() {
	return (
		<div className='flex flex-col h-full'>
			<SummaryBord />
			<div className='flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5'>
				{/* Transactions — scrollable */}
				<div className='lg:col-span-3 min-w-0 flex flex-col min-h-0 overflow-hidden'>
					<TransactionsTable />
				</div>
				{/* Right panel: LineChart + PieChart equal height */}
				<div className='lg:col-span-2 min-w-0 flex flex-col min-h-0 lg:border-l border-border'>
					<div className='flex-1 min-h-0 overflow-hidden'>
						<LineChart />
					</div>
					<Divider />
					<div className='flex-1 min-h-0 overflow-hidden'>
						<PieChart type='total' />
					</div>
				</div>
			</div>
		</div>
	);
}
