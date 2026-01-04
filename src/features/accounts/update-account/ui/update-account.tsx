'use client';

import { useState } from 'react';
import { PencilSimple } from '@phosphor-icons/react';

import { Button } from '@/shared/ui';

import { UpdateAccountModal } from '@/features/accounts/update-account/ui/update-modal';

interface UpdateAccountProps {
	id: string;
	title: string;
	description: string;
}

export function UpdateAccount({ id, title, description }: UpdateAccountProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<UpdateAccountModal id={id} title={title} description={description} isOpen={isOpen} onClose={() => setIsOpen(false)} />
			<Button onClick={() => setIsOpen(true)} variant='ghost' className='text-gray-400 hover:text-blue-500 transition-colors'>
				<PencilSimple size={32} />
			</Button>
		</div>
	);
}
