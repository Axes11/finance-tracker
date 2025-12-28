'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		const hash = window.location.hash;

		if (hash.includes('type=recovery')) {
			return;
		}

		router.replace('/login');
	}, [router]);

	return null;
}
