'use client';

import { TransactionRowSkeleton, TransactionSchema, useTransactionsStore, useTransactionModal } from '@/entities/transaction';
import { useAccountStore } from '@/entities/account';

import { PaginationTransaction, TransactionModalsProvider } from '@/features/transactions';

import { Separator, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/shared/ui';
import { AccountType } from '@/shared/types';
import { TransactionRow } from './transaction-row';
import { useUserStore } from '@/entities/user';

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

	const { isBalancesHidden } = useUserStore();

	return (
		<>
			<div className='relative z-10 bg-background flex flex-col h-full min-h-0'>
				<div className='flex-1 min-h-0 overflow-y-auto custom-scrollbar'>
					<Table className='[&_th]:w-[3fr] [&_td]:w-[3fr] [&_th:first-child]:w-[1fr] [&_td:first-child]:w-[1fr]'>
						<colgroup>
							<col className='w-[5%]' />
							<col className='w-[15%]' />
							<col className='w-[15%]' />
							<col className='w-[20%]' />
							<col className='w-[15%]' />
							<col className='w-[15%]' />
							<col className='w-[15%]' />
						</colgroup>
						<TableHeader>
							<TableRow>
								<TableHead>Status</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Account</TableHead>
								<TableHead>Description</TableHead>
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
										isBalancesHidden={isBalancesHidden}
									/>
								))}
							</TableBody>
						)}
						{isEmpty && (
							<TableFooter>
								<TableRow>
									<TableCell colSpan={7} className='text-center'>
										No transactions found.
									</TableCell>
								</TableRow>
							</TableFooter>
						)}
					</Table>
				</div>
				{!isEmpty && (
					<>
						<Separator />
						<div className='flex justify-end px-6 py-4 shrink-0'>
							<PaginationTransaction />
						</div>
					</>
				)}
			</div>

			<TransactionModalsProvider />
		</>
	);
}
