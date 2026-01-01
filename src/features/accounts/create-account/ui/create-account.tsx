import { PlusCircle } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button, Card } from '@/shared';
import { AccountType } from '@/entities';
import CreateAccountModal from '../ui/create-modal.tsx';

type CreateAccountProps = {
	type: AccountType;
};

export function CreateAccount({ type }: CreateAccountProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card className='flex justify-center min-h-52 items-center'>
			<div className='absolute'>
				<CreateAccountModal type={type} isOpen={isOpen} onClose={() => setIsOpen(false)} />
			</div>
			<Button variant='ghost' onClick={() => setIsOpen(true)}>
				<PlusCircle size={32} />
			</Button>
		</Card>
	);
}
