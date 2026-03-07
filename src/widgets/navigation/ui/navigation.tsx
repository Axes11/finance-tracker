'use client';

import { useState, useEffect } from 'react';

import { House, CurrencyBtc, ChartLineUp, Vault, SunDim, Moon, EyeIcon, EyeClosed } from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import { useUserStore } from '@/entities/user';

import { PrivatePaths } from '@/shared/config';
import { Card, Button, Separator } from '@/shared/ui';

import { LogoutBtn } from '@/features/auth/logout/ui/logout-btn.tsx';

export function Navigation() {
	const router = useRouter();

	const { isBalancesHidden, toggleBalancesVisibility } = useUserStore();

	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	const switchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
	const toggleBalances = () => toggleBalancesVisibility();

	const pathname = usePathname();

	const tabs = [
		{ path: PrivatePaths.MAIN, icon: <House size={32} /> },
		{ path: PrivatePaths.CRYPTO, icon: <CurrencyBtc size={32} /> },
		{ path: PrivatePaths.STOCKS, icon: <ChartLineUp size={32} /> },
		{ path: PrivatePaths.BANK, icon: <Vault size={32} /> },
	];

	if (!mounted) {
		return null;
	}

	return (
		<nav className='shrink-0 flex justify-center border-t border-border bg-background z-50'>
			<Card className='flex flex-row gap-4 p-3 border-0 shadow-none'>
				{tabs.map((tab) => (
					<Button key={tab.path} onClick={() => router.push(tab.path)} variant={pathname === tab.path ? 'default' : 'outline'} size='icon'>
						{tab.icon}
					</Button>
				))}
				<Separator orientation='vertical' />
				<Button onClick={switchTheme} variant='outline' size='icon'>
					{theme === 'light' ? <Moon size={32} /> : <SunDim size={32} />}
				</Button>
				<Button onClick={toggleBalances} variant='outline' size='icon'>
					{isBalancesHidden ? <EyeIcon size={32} /> : <EyeClosed size={32} />}
				</Button>
				<Separator orientation='vertical' />
				<LogoutBtn />
			</Card>
		</nav>
	);
}
