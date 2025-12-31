import { Card } from '@/shared/ui';
import { SummaryCard } from '@/features/transactions/summary-card';

export function SummaryBord() {
	return (
		<Card className='p-6 w-full'>
			<div className='flex flex-col gap-2'>
				<span className='text-3xl font-bold'>Dashboard Overview</span>
				<span>Here you can see your balances in all categories, if you want see details switch to another page!</span>
			</div>
			<div className='flex flex-row gap-4'>
				<SummaryCard title='Main' amount={12345} badge='all' change={3} />
				<SummaryCard title='Crypto' amount={3245} badge='crypto' change={-5} />
				<SummaryCard title='Stocks' amount={4566} badge='stocks' change={7} />
				<SummaryCard title='Bank' amount={6245} badge='bank' change={0} />
			</div>
		</Card>
	);
}
