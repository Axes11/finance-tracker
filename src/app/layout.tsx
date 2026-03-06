import { ReactNode } from 'react';

import { fontDisplay, fontSans, fontMono } from '@/shared/lib/font.ts';

import { Providers } from '@/app/providers';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
