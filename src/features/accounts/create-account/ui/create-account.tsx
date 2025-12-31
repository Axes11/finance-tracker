import { PlusCircle } from '@phosphor-icons/react';

import { Button } from '@/shared/ui';
import { AccountType } from '@/entities/account';
import CreateAccountModal from '../ui/create-modal.tsx';
import { useState } from 'react';

type CreateAccountProps = {
	type: AccountType;
};

export function CreateAccount({ type }: CreateAccountProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<CreateAccountModal type={type} isOpen={isOpen} onClose={() => setIsOpen(false)} />
			<Button variant='outline' onClick={() => setIsOpen(true)}>
				<PlusCircle size={32} /> Create Account
			</Button>
		</>
	);
}
