'use client';

import { PlusCircle } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button, Card } from '@/shared/ui';
import { AccountType } from '@/shared/types';

import CreateAccountModal from '../ui/create-modal';

interface CreateAccountProps {
	type: AccountType;
}

export function CreateAccount({ type }: CreateAccountProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card className='flex justify-center min-h-46 h-full items-center'>
			<div className='absolute'>
				<CreateAccountModal type={type} isOpen={isOpen} onClose={() => setIsOpen(false)} />
			</div>
			<Button variant='ghost' onClick={() => setIsOpen(true)}>
				<PlusCircle size={32} />
			</Button>
		</Card>
	);
}
