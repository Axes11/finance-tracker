'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { PublicPaths } from '@/shared/config/public-routes.ts';
import { Spinner } from '@/shared/ui';

export default function WelcomePage() {
	const router = useRouter();

	useEffect(() => {
		router.replace(PublicPaths.LOGIN);
	}, [router]);

	return (
		<div className='flex min-h-screen justify-center items-center bg-background text-foreground'>
			<Spinner />
		</div>
	);
}
