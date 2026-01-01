'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LoginForm } from '@/features';
import { useUserStore } from '@/entities';
import { PrivatePaths } from '@/shared/config';
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
