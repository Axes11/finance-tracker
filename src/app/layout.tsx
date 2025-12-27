'use client';

import './globals.css';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

import { TitleBar, Toaster } from '@/shared/ui';
import { fontSans } from '@/shared/lib/font';
import { QueryProvider } from '@/shared/providers';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className={`${fontSans.variable} font-sans`} suppressHydrationWarning>
			<body>
				<QueryProvider>
					<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
						<TitleBar />
						<main>{children}</main>
						<Toaster />
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
