'use client';

import { SignOut } from '@phosphor-icons/react';

import { Button } from '@/shared/ui';
import { useLogout } from '../hooks/useLogout';

export function LogoutBtn() {
	const { logoutUser } = useLogout();

	return (
		<Button onClick={logoutUser} variant='outline' size='icon'>
			<SignOut size={32} />
		</Button>
	);
}
