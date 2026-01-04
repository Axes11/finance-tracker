'use client';

import { Toaster } from 'sonner';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { QueryProvider } from '@/shared/providers';

export function Providers({ children }: { children: ReactNode }) {
	return (
		<QueryProvider>
			<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
				<main>{children}</main>
				<Toaster />
			</ThemeProvider>
		</QueryProvider>
	);
}
