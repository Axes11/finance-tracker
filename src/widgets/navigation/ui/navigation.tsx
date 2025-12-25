'use client';

import { Button } from '@/shared/ui/button.tsx';
import { House, CurrencyBtc, ChartLineUp, Vault, SunDim, Moon } from '@phosphor-icons/react';
import { Card } from '@/shared/ui/card.tsx';
import { useRouter } from 'next/navigation';
import { RoutePaths } from '@/shared/config/routes.ts';
import LogoutBtn from '@/features/auth/logout/ui/logout-btn.tsx';
import { useTheme } from 'next-themes';

export default function Navigation() {
	const router = useRouter();

	const { theme, setTheme } = useTheme();

	const switchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

	return (
		<nav className='flex absolute w-full justify-center items-center'>
			<Card className='flex fixed bottom-5 flex-row gap-4 p-3'>
				<Button onClick={() => router.push(RoutePaths.MAIN)} variant='outline' size='icon'>
					<House size={32} />
				</Button>
				<Button onClick={() => router.push(RoutePaths.CRYPTO)} variant='outline' size='icon'>
					<CurrencyBtc size={32} />
				</Button>
				<Button onClick={() => router.push(RoutePaths.STOCKS)} variant='outline' size='icon'>
					<ChartLineUp size={32} />
				</Button>
				<Button onClick={() => router.push(RoutePaths.BANK)} variant='outline' size='icon'>
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
