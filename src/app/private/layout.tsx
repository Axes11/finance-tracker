'use client';

import useUserStore from '@/entities/user/store';
import { ReactNode, useEffect } from 'react';
import Navigation from '@/widgets/navigation/ui/navigation.tsx';
import { useRouter } from 'next/navigation';
import { RoutePaths } from '@/shared/config/routes.ts';

export default function PrivateLayout({ children }: { children: ReactNode }) {
	const user = useUserStore((state) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push(RoutePaths.LOGIN);
		}
	}, [user, router]);

	return (
		<div className='flex min-h-screen justify-center items-center bg-background text-foreground'>
			<main>{children}</main>
			<Navigation />
		</div>
	);
}
