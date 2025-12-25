'use client';

import { useRouter } from 'next/navigation';

import { RoutePaths } from '@/shared/config/routes.ts';
import useUserStore from '@/entities/user/store.ts';
import { useEffect } from 'react';

export default function WelcomePage() {
	const router = useRouter();
	const user = useUserStore();

	useEffect(() => {
		if (user) {
			router.push(RoutePaths.MAIN);
		} else {
			router.push(RoutePaths.LOGIN);
		}
	}, [user, router]);

	return;
}
