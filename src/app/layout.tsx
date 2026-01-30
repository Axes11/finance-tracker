import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { fontSans } from '@/shared/lib/font.ts';

import { Providers } from '@/app/providers';
import './globals.css';

export const metadata: Metadata = {
	title: 'Finance Tracker',
	description: 'Finance dashboard',

	manifest: '/manifest.webmanifest',

	themeColor: '#202020',

	icons: {
		icon: '/icon.png',
		apple: '/apple-icon.png',
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className={fontSans.variable} suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
