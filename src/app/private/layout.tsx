'use client';

import { useUserStore } from '@/entities/user';
import { ReactNode, useEffect } from 'react';
import { Navigation } from '@/widgets';
import { useRouter } from 'next/navigation';
import { PublicPaths } from '@/shared/config/public-routes.ts';

export default function PrivateLayout({ children }: { children: ReactNode }) {
	const user = useUserStore((state) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push(PublicPaths.LOGIN);
		}
	}, [user, router]);

	return (
		<div className='flex min-h-screen justify-center items-center bg-background text-foreground'>
			<main>{children}</main>
			<Navigation />
		</div>
	);
}
