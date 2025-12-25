'use client';

import { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
	return <main className='flex min-h-screen justify-center items-center bg-background text-foreground'>{children}</main>;
}
