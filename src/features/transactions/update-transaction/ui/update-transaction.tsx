import { PencilSimple } from '@phosphor-icons/react';
import { useState } from 'react';

import { TransactionShema } from '@/entities';
import { Button } from '@/shared';

import { UpdateTransactionModal } from '../ui/update-modal.tsx';

interface UpdateTransactionProps {
	transaction: TransactionShema;
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
