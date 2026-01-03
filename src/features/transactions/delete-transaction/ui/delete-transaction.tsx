import { Trash } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button } from '@/shared';

import { DeleteTransactionModal } from '../ui/delete-modal.tsx';

type CreateAccountProps = {
	id: string;
	title: string;
};

export function DeleteTransaction({ id, title }: CreateAccountProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<div className='absolute'>
				<DeleteTransactionModal id={id} title={title} isOpen={isOpen} onClose={() => setIsOpen(false)} />
			</div>
			<Button onClick={() => setIsOpen(true)} variant='ghost'>
				<Trash size={32} />
			</Button>
		</div>
	);
}
