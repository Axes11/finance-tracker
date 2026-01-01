'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useUserStore } from '@/entities';
import { Navigation } from '@/widgets';
import { PublicPaths, Spinner } from '@/shared';

export default function PrivateLayout({ children }: { children: ReactNode }) {
	const { user, isAuthLoading } = useUserStore();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthLoading && !user) {
			router.replace(PublicPaths.LOGIN);
		}
	}, [user, isAuthLoading, router]);

	if (isAuthLoading || !user)
		return (
			<div className='flex min-h-screen justify-center items-center bg-background text-foreground'>
				<Spinner />
			</div>
		);

	return (
		<div className='flex min-h-screen bg-background text-foreground'>
			<main className='w-full p-8'>{children}</main>
			<Navigation />
		</div>
	);
}
