'use client';

import { useRouter } from 'next/navigation';

import { Button, Card, PublicPaths } from '@/shared';

export default function DontRememberEmail() {
	const router = useRouter();

	return (
		<Card className='p-6 flex flex-col gap-6 items-center  max-w-md'>
			<span className='text-xl font-bold '>Don`t remember your password?</span>
			<span className='text-center text-muted-foreground'>If you dont remember your email you can contact us and we will try to help you!</span>
			<span className='bg-muted relative rounded px-[0.5rem] py-[0.2rem] font-mono text-sm font-semibold text-muted-foreground'>support@email.com</span>
			<Button onClick={() => router.push(PublicPaths.LOGIN)} className='cursor-pointer'>
				Back To Login
			</Button>
		</Card>
	);
}
