import { PieChart, SummaryBord, TransactionsTable } from '@/widgets';

export default function CryptoPage() {
	return (
		<div>
			<SummaryBord header='Crypto Accounts Overview' description='Here you can see your balances in all categories, if you want see details switch to another page!' type='crypto' />
			<div className='grid grid-cols-4'>
				<div className='col-span-3 mr-2'>
					<TransactionsTable type={'crypto'} />
				</div>
				<div className='col-span-1'>
					<PieChart type='crypto' />
				</div>
			</div>
		</div>
	);
}
