import { ReactNode } from 'react';
import { TransactionShema } from '@/entities';
import { TableRow, TableCell } from '@/shared';

interface TransactionRowProps {
	transaction: TransactionShema;
	index: number;
	type: 'sent' | 'received';
	rightSlot: ReactNode;
}

export function TransactionRow({ transaction, index, type, rightSlot }: TransactionRowProps) {
	return (
		<TableRow>
			<TableCell className='font-medium'>{index}</TableCell>
			<TableCell>{transaction.type}</TableCell>
			<TableCell>{transaction.description}</TableCell>
			<TableCell>{transaction.currency}</TableCell>
			<TableCell>{type}</TableCell>
			<TableCell className='text-right'>${transaction.amount}</TableCell>
			<TableCell className='text-right'>{transaction.date}</TableCell>
			<TableCell className='text-right'>{rightSlot}</TableCell>
		</TableRow>
	);
}
