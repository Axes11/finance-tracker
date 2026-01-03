import { Card, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/shared';
import { TransactionShema, TransactionRow, useTransactionsStore, TransactionRowSkeleton } from '@/entities';
import { DeleteTransaction, UpdateTransaction } from '@/features';

interface TransactionsTableProps {
	data: TransactionShema[];
}

export function TransactionsTable({ data }: TransactionsTableProps) {
	const { isLoading } = useTransactionsStore();

	return (
		<Card className='p-6 mt-2'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>№</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className='text-right'>Amount</TableHead>
						<TableHead className='text-right'>Date</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				{isLoading && (
					<TableBody>
						{Array.from({ length: 6 }).map((_, index) => (
							<TransactionRowSkeleton key={index} />
						))}
					</TableBody>
				)}
				{data.length > 0 && (
					<TableBody>
						{data.map((transaction: TransactionShema, index: number) => (
							<TransactionRow
								key={index}
								transaction={transaction}
								type={transaction.amount < 0 ? 'sent' : 'received'}
								index={index}
								rightSlot={
									<div className='flex flex-row items-center justify-end'>
										<UpdateTransaction transaction={transaction} /> /
										<DeleteTransaction id={transaction.id} title={transaction.description} />
									</div>
								}
							/>
						))}
					</TableBody>
				)}
				{data.length === 0 && !isLoading && (
					<TableFooter>
						<TableRow>
							<TableCell colSpan={8} className='text-center'>
								No transactions found.
							</TableCell>
						</TableRow>
					</TableFooter>
				)}
			</Table>
		</Card>
	);
}
