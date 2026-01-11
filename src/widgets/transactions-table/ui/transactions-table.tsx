'use client';

import { TransactionRow, TransactionSchema, TransactionRowSkeleton } from '@/entities/transaction';
import { useTransactionsStore } from '@/entities/transaction/store.ts';
import { useAccountStore } from '@/entities/account/store.ts';

import { UpdateTransaction, DeleteTransaction, PaginationTransaction } from '@/features/transactions';

import { Card, Separator, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/shared/ui';
import { AccountType } from '@/shared/types';

interface TransactionsTableProps {
	type?: AccountType;
}

export function TransactionsTable({ type }: TransactionsTableProps) {
	const { getAccountById } = useAccountStore();

	const { transactions, getTransactionsByType, hydrated } = useTransactionsStore();

	const data = type ? getTransactionsByType(type) : transactions;

	const isLoading = !hydrated;
	const isEmpty = hydrated && data.length === 0;
	const hasTransactions = hydrated && data.length > 0;

	return (
		<>
			<Card className='p-6 mt-2'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>№</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Account</TableHead>
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
					{hasTransactions && (
						<TableBody>
							{data.map((transaction: TransactionSchema, index: number) => (
								<TransactionRow
									key={index}
									transaction={transaction}
									accountName={getAccountById(transaction.account_id) || 'Unknown Account'}
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
					{isEmpty && (
						<TableFooter>
							<TableRow>
								<TableCell colSpan={9} className='text-center'>
									No transactions found.
								</TableCell>
							</TableRow>
						</TableFooter>
					)}
				</Table>
				<Separator />
				<div className='flex justify-end'>
					<PaginationTransaction />
				</div>
			</Card>
		</>
	);
}
