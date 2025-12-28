'use client';

import { ForgotPasswordForm } from '@/features/auth/forgot-password';

export default function ForgotPage() {
	return (
		<div className='flex flex-col justify-center items-center gap-6'>
			<ForgotPasswordForm />
		</div>
	);
}
