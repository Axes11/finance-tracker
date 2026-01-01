'use client';

import './globals.css';

import { ReactNode, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

import { TitleBar, Toaster } from '@/shared/ui';
import { fontSans } from '@/shared/lib';
import { QueryProvider } from '@/shared/providers';
import { useUserStore } from '@/entities';
import { supabaseClient } from '@/shared/lib';

export default function RootLayout({ children }: { children: ReactNode }) {
	const { loginUser, logoutUser, setAuthLoading } = useUserStore();

	useEffect(() => {
		const initAuth = async () => {
			setAuthLoading(true);

			const {
				data: { session },
			} = await supabaseClient.auth.getSession();

			if (session?.user) {
				loginUser(session.user);
			} else {
				logoutUser();
			}
		};

		initAuth();

		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
			if (session?.user) {
				loginUser(session.user);
			} else {
				logoutUser();
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [loginUser, logoutUser, setAuthLoading]);

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
