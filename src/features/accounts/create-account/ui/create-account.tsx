import { PlusCircle } from '@phosphor-icons/react';

import { Button, Card } from '@/shared/ui';
import { AccountType } from '@/entities/account';
import CreateAccountModal from '../ui/create-modal.tsx';
import { useState } from 'react';

type CreateAccountProps = {
	type: AccountType;
};

export function CreateAccount({ type }: CreateAccountProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card className='flex justify-center min-h-40 items-center'>
			<div className='absolute'>
				<CreateAccountModal type={type} isOpen={isOpen} onClose={() => setIsOpen(false)} />
			</div>
			<Button variant='ghost' onClick={() => setIsOpen(true)}>
				<PlusCircle size={32} />
			</Button>
		</Card>
	);
}
