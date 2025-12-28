'use client';

import { Button } from '@/shared/ui';
import { SignOut } from '@phosphor-icons/react';
import { useLogout } from '@/features/auth/logout';

export default function LogoutBtn() {
	const { logout } = useLogout();

	return (
		<Button onClick={logout} variant='outline' size='icon'>
			<SignOut size={32} />
		</Button>
	);
}
