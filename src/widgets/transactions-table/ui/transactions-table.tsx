'use client';

import { TransactionRowSkeleton, TransactionSchema, useTransactionsStore, useTransactionModal } from '@/entities/transaction';
import { useAccountStore } from '@/entities/account';

import { PaginationTransaction, TransactionModalsProvider } from '@/features/transactions';

import { Card, Separator, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/shared/ui';
import { AccountType } from '@/shared/types';
import { TransactionRow } from './transaction-row';

interface TransactionsTableProps {
	type?: AccountType;
}

export function TransactionsTable({ type }: TransactionsTableProps) {
	const { getAccountById } = useAccountStore();
	const { transactions, getTransactionsByType, hydrated } = useTransactionsStore();

	const data = type ? getTransactionsByType(type) : transactions;

	const openUpdate = useTransactionModal((state) => state.actions.openUpdate);
	const openDelete = useTransactionModal((state) => state.actions.openDelete);

	const isLoading = !hydrated;
	const isEmpty = hydrated && data.length === 0;
	const hasTransactions = hydrated && data.length > 0;

	return (
		<>
			<Card className='p-6 mt-2'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Type</TableHead>
							<TableHead>Account</TableHead>
							<TableHead>Description</TableHead>
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
							{data.map((transaction: TransactionSchema) => (
								<TransactionRow
									key={transaction.id}
									transaction={transaction}
									accountName={getAccountById(transaction.account_id) || 'Unknown Account'}
									type={transaction.amount < 0 ? 'sent' : 'received'}
									openUpdate={openUpdate}
									openDelete={openDelete}
								/>
							))}
						</TableBody>
					)}
					{isEmpty && (
						<TableFooter>
							<TableRow>
								<TableCell colSpan={8} className='text-center'>
									No transactions found.
								</TableCell>
							</TableRow>
						</TableFooter>
					)}
				</Table>
				{!isEmpty && (
					<>
						<Separator />
						<div className='flex justify-end'>
							<PaginationTransaction />
						</div>
					</>
				)}
			</Card>

			<TransactionModalsProvider />
		</>
	);
}
