'use client';

import { QueryProvider } from '@/shared/providers/query-provider';
import { Switch } from '@/shared/ui/switch';
import { ThemeProvider, useTheme } from 'next-themes';
import { ReactNode } from 'react';

import { Toaster } from '@/shared/ui/sonner';

export default function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute='class' defaultTheme='light'>
			<QueryProvider>
				<LayoutContent>{children}</LayoutContent>
			</QueryProvider>
		</ThemeProvider>
	);
}

function LayoutContent({ children }: { children: ReactNode }) {
	const { theme, setTheme } = useTheme();

	const switchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

	return (
		<main className='flex min-h-screen justify-center items-center bg-background text-foreground'>
			<Switch onClick={switchTheme}>Switch Theme</Switch>
			{children}
			<Toaster />
		</main>
	);
}
