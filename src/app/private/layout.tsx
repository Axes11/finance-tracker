import useUserStore from '@/entities/user/store';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default function PrivateLayout({ children }: { children: ReactNode }) {
	const user = useUserStore((state) => state.user);

	if (!user) {
		redirect('/login');
	}

	return (
		<div className='flex min-h-screen'>
			<main className='flex-1'>{children}</main>
		</div>
	);
}
