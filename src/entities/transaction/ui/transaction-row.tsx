import { TableCell, TableRow } from '@/shared/ui';
import { ReactNode } from 'react';
import { TransactionSchema } from '@/entities/transaction/model.ts';

interface TransactionRowProps {
	transaction: TransactionSchema;
	accountName: string;
	index: number;
	type: 'sent' | 'received';
	rightSlot: ReactNode;
}

export function TransactionRow({ transaction, accountName, index, type, rightSlot }: TransactionRowProps) {
	return (
		<TableRow>
			<TableCell className='font-medium'>{index + 1}</TableCell>
			<TableCell>{transaction.type || '-'}</TableCell>
			<TableCell>{accountName || '-'}</TableCell>
			<TableCell>{transaction.description || '-'}</TableCell>
			<TableCell>{transaction.category || '-'}</TableCell>
			<TableCell>{type}</TableCell>
			<TableCell className='text-right'>
				{transaction.amount || '-'} {transaction.currency || '-'}
			</TableCell>
			<TableCell className='text-right'>{transaction.date || '-'}</TableCell>
			<TableCell className='text-right'>{rightSlot}</TableCell>
		</TableRow>
	);
}
