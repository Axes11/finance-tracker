import { Card, Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared';
import { TransactionShema, TransactionRow } from '@/entities';
import { useEffect } from 'react';

interface TransactionsTableProps {
	data: TransactionShema[];
}

export function TransactionsTable({ data }: TransactionsTableProps) {
	useEffect(() => {
		console.log('table: ', data);
	}, []);

	return (
		<Card className='p-6 mt-2'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>№</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Currency</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className='text-right'>Amount</TableHead>
						<TableHead className='text-right'>Date</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((transaction: TransactionShema, index: number) => (
						<TransactionRow key={index} transaction={transaction} type={transaction.amount < 0 ? 'sent' : 'received'} index={index} rightSlot={''} />
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
