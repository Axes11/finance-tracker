import { ReactNode } from 'react';

import { AuthBrandPanel } from '@/shared/ui/auth-brand-panel';

export default function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<main className='auth-layout bg-background text-foreground'>
			<AuthBrandPanel />

			{/* Right panel — form */}
			<div className='flex flex-1 items-center justify-center px-6 py-12 overflow-auto'>{children}</div>
		</main>
	);
}
