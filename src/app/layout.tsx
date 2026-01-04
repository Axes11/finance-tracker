import { ReactNode } from 'react';

import { fontSans } from '@/shared/lib/font.ts';

import { Providers } from '@/app/providers';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className={fontSans.variable} suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
