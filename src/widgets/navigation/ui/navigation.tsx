'use client';

import { House, CurrencyBtc, ChartLineUp, Vault, SunDim, Moon } from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import { PrivatePaths } from '@/shared/config';
import { Card, Button } from '@/shared/ui';

import { LogoutBtn } from '@/features/auth/logout/ui/logout-btn.tsx';

export function Navigation() {
	const router = useRouter();

	const { theme, setTheme } = useTheme();

	const switchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

	const pathname = usePathname();

	const tabs = [
		{ path: PrivatePaths.MAIN, icon: <House size={32} /> },
		{ path: PrivatePaths.CRYPTO, icon: <CurrencyBtc size={32} /> },
		{ path: PrivatePaths.STOCKS, icon: <ChartLineUp size={32} /> },
		{ path: PrivatePaths.BANK, icon: <Vault size={32} /> },
	];

	return (
		<nav className='navigation fixed bottom-5 left-0 right-0 flex justify-center z-50 pointer-events-none'>
			<Card className='flex flex-row gap-4 p-3 pointer-events-auto'>
				{tabs.map((tab) => (
					<Button key={tab.path} onClick={() => router.push(tab.path)} variant={pathname === tab.path ? 'default' : 'outline'} size='icon'>
						{tab.icon}
					</Button>
				))}
				<Button onClick={switchTheme} variant='outline' size='icon'>
					{!theme || theme === 'light' ? <Moon size={32} /> : <SunDim size={32} />}
				</Button>
				<LogoutBtn />
			</Card>
		</nav>
	);
}
