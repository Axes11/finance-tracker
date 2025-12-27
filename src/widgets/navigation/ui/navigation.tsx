'use client';

import { House, CurrencyBtc, ChartLineUp, Vault, SunDim, Moon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import { Card, Button } from '@/shared/ui';
import { PrivatePaths } from '@/shared/config/private-routes.ts';
import LogoutBtn from '@/features/auth/logout/ui/logout-btn.tsx';

export function Navigation() {
	const router = useRouter();

	const { theme, setTheme } = useTheme();

	const switchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

	return (
		<nav className='flex absolute w-full justify-center items-center'>
			<Card className='flex fixed bottom-5 flex-row gap-4 p-3'>
				<Button onClick={() => router.push(PrivatePaths.MAIN)} variant='outline' size='icon'>
					<House size={32} />
				</Button>
				<Button onClick={() => router.push(PrivatePaths.CRYPTO)} variant='outline' size='icon'>
					<CurrencyBtc size={32} />
				</Button>
				<Button onClick={() => router.push(PrivatePaths.STOCKS)} variant='outline' size='icon'>
					<ChartLineUp size={32} />
				</Button>
				<Button onClick={() => router.push(PrivatePaths.BANK)} variant='outline' size='icon'>
					<Vault size={32} />
				</Button>
				<Button onClick={switchTheme} variant='outline' size='icon'>
					{theme === 'light' ? <Moon size={32} /> : <SunDim size={32} />}
				</Button>
				<LogoutBtn />
			</Card>
		</nav>
	);
}
