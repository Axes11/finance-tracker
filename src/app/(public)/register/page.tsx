'use client';

import { RegisterForm } from '@/features/auth/register';

export default function RegisterPage() {
	return (
		<div className='flex flex-col justify-center items-center gap-6'>
			<RegisterForm />
		</div>
	);
}
