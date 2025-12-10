'use client';

import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
	const router = useRouter();

	const redirectToLogin = () => {
		router.push('/public/login');
	};

	return <Button onClick={redirectToLogin}>Redirect to Login</Button>;
}
