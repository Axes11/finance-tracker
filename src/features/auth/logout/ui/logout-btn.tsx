'use client';

import { SignOut } from '@phosphor-icons/react';

import { Button } from '@/shared/ui';
import { useLogout } from '../hooks/useLogout.ts';

export function LogoutBtn() {
	const { logout } = useLogout();

	return (
		<Button onClick={logout} variant='outline' size='icon'>
			<SignOut size={32} />
		</Button>
	);
}
