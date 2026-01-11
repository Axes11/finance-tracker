'use client';

import { PencilSimple } from '@phosphor-icons/react';
import { useState } from 'react';

import { TransactionSchema } from '@/entities/transaction/model.ts';

import { Button } from '@/shared/ui';

import { UpdateTransactionModal } from '../ui/update-modal';

interface UpdateTransactionProps {
	transaction: TransactionSchema;
}

export function UpdateTransaction({ transaction }: UpdateTransactionProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<div className='absolute'>
				<UpdateTransactionModal transaction={transaction} isOpen={isOpen} onClose={() => setIsOpen(false)} />
			</div>
			<Button onClick={() => setIsOpen(true)} variant='ghost'>
				<PencilSimple size={32} />
			</Button>
		</div>
	);
}
