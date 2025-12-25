'use client';

import './globals.css';

import { ReactNode } from 'react';

import TitleBar from '@/shared/ui/title-bar.tsx';
import { fontSans } from '@/shared/lib/font';
import { ThemeProvider } from 'next-themes';
import { QueryProvider } from '@/shared/providers/query-provider.tsx';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className={`${fontSans.variable} font-sans`} suppressHydrationWarning>
			<body>
				<QueryProvider>
					<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
						<TitleBar />
						<main>{children}</main>
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
