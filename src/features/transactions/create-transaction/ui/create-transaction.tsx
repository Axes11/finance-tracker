'use client';

import { CreditCard } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button } from '@/shared/ui';
import { AccountType } from '@/shared/types';

import { CreateTransactionModal } from '../ui/create-modal';

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
