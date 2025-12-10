// app/layout.tsx
import './globals.css';
import { fontSans } from '@/shared/lib/font';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className={`${fontSans.variable} font-sans`}>
			<body>{children}</body>
		</html>
	);
}
