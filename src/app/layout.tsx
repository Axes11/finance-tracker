'use client';

import './globals.css';
import { fontSans } from '@/shared/lib/font';
import { ReactNode } from 'react';
import TitleBar from '@/shared/ui/title-bar.tsx';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className={`${fontSans.variable} font-sans`}>
			<body>
				<TitleBar />
				<main>{children}</main>
			</body>
		</html>
	);
}
