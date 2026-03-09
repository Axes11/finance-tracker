'use client';

import { useRouter } from 'next/navigation';

import { AuthHeader, Button, Divider, MobileLogo } from '@/shared/ui';
import { PublicPaths } from '@/shared/config';

export default function DontRememberEmail() {
	const router = useRouter();

	return (
		<div className='w-full max-w-[420px]'>
			<div className='flex flex-col gap-8'>
				<MobileLogo />

				<AuthHeader title="Can't remember email?" description="If you don't remember your email, contact us and we'll try to help." />

				<div className='flex items-center justify-center border border-border py-4'>
					<span className='font-mono text-[0.8rem] font-medium text-muted-foreground'>support@email.com</span>
				</div>

				<Divider />

				<Button variant='primary' size='full' onClick={() => router.push(PublicPaths.LOGIN)}>
					Back to Login
				</Button>
			</div>
		</div>
	);
}
