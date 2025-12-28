'use client';

import { useUserStore } from '@/entities/user';
import { ReactNode, useEffect } from 'react';
import { Navigation } from '@/widgets';
import { useRouter } from 'next/navigation';
import { PublicPaths } from '@/shared/config/public-routes.ts';
import { Spinner } from '@/shared/ui';

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
		<div className='flex min-h-screen justify-center items-center bg-background text-foreground'>
			<main>{children}</main>
			<Navigation />
		</div>
	);
}
