'use client';

import { Button } from '@/shared/ui/button.tsx';
import useUserStore from '@/entities/user/store.ts';
import { useRouter } from 'next/navigation';
import { RoutePaths } from '@/shared/config/routes.ts';

export default function LoginPage() {
	const user = useUserStore();
	const router = useRouter();

	const login = () => {
		// Simulate a login process
		user.loginUser({ id: '1', name: 'John Doe' });
		router.push(RoutePaths.MAIN);
	};

	return (
		<div className='flex flex-col items-center justify-center'>
			<div>Welcome to the Login!</div>
			<Button onClick={() => login()}>Login</Button>
		</div>
	);
}
