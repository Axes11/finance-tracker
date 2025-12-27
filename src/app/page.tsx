'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { PrivatePaths } from '@/shared/config/private-routes.ts';
import { useUserStore } from '@/entities/user';

export default function WelcomePage() {
	const router = useRouter();
	const user = useUserStore();

	useEffect(() => {
		if (user) {
			router.push(PrivatePaths.MAIN);
		}
	}, [user, router]);

	return;
}
