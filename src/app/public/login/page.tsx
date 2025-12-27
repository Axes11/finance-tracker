'use client';

import { LoginForm } from '@/features/auth/login';

export default function LoginPage() {
	return (
		<div className='flex flex-col justify-center items-center gap-6'>
			<LoginForm />
		</div>
	);
}
