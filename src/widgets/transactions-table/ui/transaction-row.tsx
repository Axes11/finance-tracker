import React, { memo } from 'react';
import { PencilSimple, Trash } from '@phosphor-icons/react';

import { Button, TableCell, TableRow } from '@/shared/ui';
import { TransactionSchema } from '@/entities/transaction';

interface TransactionRowProps {
	transaction: TransactionSchema;
	accountName: string;
	type: 'sent' | 'received';
	openUpdate: (t: TransactionSchema) => void;
	openDelete: (t: TransactionSchema) => void;
}

export const TransactionRow = memo(
	({ transaction, accountName, type, openUpdate, openDelete }: TransactionRowProps) => {
		return (
			<TableRow>
				<TableCell>{transaction.type || '-'}</TableCell>
				<TableCell>{accountName || '-'}</TableCell>
				<TableCell>{transaction.description || '-'}</TableCell>
				<TableCell>{type}</TableCell>
				<TableCell className='text-right'>
					{transaction.amount || '-'} {transaction.amount > 1 ? transaction.currency + '`s' : transaction.currency || '-'}
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
	(prev, next) => prev.transaction.id === next.transaction.id && prev.transaction.amount === next.transaction.amount && prev.accountName === next.accountName,
);

TransactionRow.displayName = 'TransactionRow';
