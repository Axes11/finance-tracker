import React, { memo } from 'react';
import { ArrowUp, ArrowDown, PencilSimple, Trash } from '@phosphor-icons/react';

import { Button, TableCell, TableRow } from '@/shared/ui';
import { TransactionSchema } from '@/entities/transaction';

interface TransactionRowProps {
	transaction: TransactionSchema;
	accountName: string;
	type: 'sent' | 'received';
	openUpdate: (t: TransactionSchema) => void;
	openDelete: (t: TransactionSchema) => void;
	isBalancesHidden?: boolean;
}

export const TransactionRow = memo(
	({ transaction, accountName, type, openUpdate, openDelete, isBalancesHidden }: TransactionRowProps) => {
		return (
			<TableRow>
				<TableCell>{type === 'received' ? <ArrowUp size={16} weight='bold' className='text-green-600' /> : <ArrowDown size={16} weight='bold' className='text-red-600' />}</TableCell>
				<TableCell>{transaction.type || '-'}</TableCell>
				<TableCell>{accountName || '-'}</TableCell>
				<TableCell>{transaction.description || '-'}</TableCell>
				<TableCell className='text-right'>
					{isBalancesHidden ? (
						<>
							{transaction.amount || '-'} {transaction.amount > 1 ? transaction.currency + '`s' : transaction.currency || '-'}
						</>
					) : (
						'****'
					)}
				</TableCell>
				<TableCell className='text-right'>{transaction.date || '-'}</TableCell>
				<TableCell className='text-right'>
					<Button variant='ghost' onClick={() => openUpdate(transaction)}>
						<PencilSimple size={32} />
					</Button>
					<Button variant='ghost' onClick={() => openDelete(transaction)}>
						<Trash size={32} />
					</Button>
				</TableCell>
			</TableRow>
		);
	},
	(prev, next) =>
		prev.transaction.id === next.transaction.id && prev.transaction.amount === next.transaction.amount && prev.accountName === next.accountName && prev.isBalancesHidden === next.isBalancesHidden,
);

TransactionRow.displayName = 'TransactionRow';
