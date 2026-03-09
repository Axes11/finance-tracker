import { PieChart, SummaryBord, TransactionsTable } from '@/widgets';
import { CreateTransaction } from '@/features/transactions';

export default function CryptoPage() {
	return (
		<div className='flex flex-col h-full'>
			<SummaryBord type='crypto' />
			<div className='px-6 py-4 border-b border-border shrink-0'>
				<CreateTransaction type='crypto' />
			</div>
			<div className='flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5'>
				<div className='lg:col-span-3 min-w-0 flex flex-col min-h-0 overflow-hidden'>
					<TransactionsTable type={'crypto'} />
				</div>
				<div className='lg:col-span-2 min-w-0 lg:border-l border-border overflow-hidden'>
					<PieChart type='crypto' />
				</div>
			</div>
		</div>
	);
}
