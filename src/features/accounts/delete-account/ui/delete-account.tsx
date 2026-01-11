'use client';

import { Trash } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button } from '@/shared/ui';

import DeleteAccountModal from '../ui/delete-modal';

interface DeleteAccountProps {
	id: string;
	title: string;
}

export function DeleteAccount({ id, title }: DeleteAccountProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<DeleteAccountModal title={title} id={id} isOpen={isOpen} onClose={() => setIsOpen(false)} />
			<Button onClick={() => setIsOpen(true)} variant='ghost' className='text-gray-400 hover:text-red-500 transition-colors'>
				<Trash size={32} />
			</Button>
		</div>
	);
}
