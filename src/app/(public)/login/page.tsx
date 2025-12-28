'use client';

import { LoginForm } from '@/features/auth/login';
import { useUserStore } from '@/entities/user';
import { useEffect } from 'react';
import { PrivatePaths } from '@/shared/config/private-routes.ts';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/shared/ui';

export default function LoginPage() {
	const router = useRouter();
	const { user, isAuthLoading } = useUserStore();

	useEffect(() => {
		if (!isAuthLoading && user) {
			router.replace(PrivatePaths.MAIN);
		}
	}, [user, isAuthLoading, router]);

	return <div className='flex flex-col justify-center items-center gap-6'>{isAuthLoading ? <Spinner /> : <LoginForm />}</div>;
}
