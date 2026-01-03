import { CreditCard } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button } from '@/shared';
import { AccountType } from '@/entities';

import CreateTransactionModal from '../ui/create-modal.tsx';

type CreateAccountProps = {
	type: AccountType;
};

export function CreateTransaction({ type }: CreateAccountProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<div className='absolute'>
				<CreateTransactionModal type={type} isOpen={isOpen} onClose={() => setIsOpen(false)} />
			</div>
			<Button onClick={() => setIsOpen(true)}>
				<CreditCard size={32} />
				New Transaction
			</Button>
		</div>
	);
}
