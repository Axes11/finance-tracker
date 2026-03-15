'use client';

import { useState, useEffect } from 'react';

import { House, CurrencyBtc, ChartLineUp, Vault, SunDim, Moon, EyeIcon, EyeClosed } from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import { useUserStore } from '@/entities/user';

import { PRIVATE_NAVIGATION_ITEMS } from '@/shared/config';
import { Card, Button, Separator } from '@/shared/ui';

import { LogoutBtn } from '@/features/auth/logout/ui/logout-btn.tsx';

const NAVIGATION_ICON_MAP = {
	main: House,
	crypto: CurrencyBtc,
	stocks: ChartLineUp,
	bank: Vault,
} as const;

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

	const tabs = PRIVATE_NAVIGATION_ITEMS.filter((item) => item.category === 'Pages').map((item) => {
		const Icon = NAVIGATION_ICON_MAP[item.icon as keyof typeof NAVIGATION_ICON_MAP];
		return { path: item.path, icon: <Icon size={32} />, id: item.id };
	});

	if (!mounted) {
		return null;
	}

	return (
		<nav className='shrink-0 flex justify-center border-t border-border bg-background z-50'>
			<Card className='flex flex-row gap-4 p-3 border-0 shadow-none'>
				{tabs.map((tab) => (
					<Button key={tab.id} onClick={() => router.push(tab.path)} variant={pathname === tab.path ? 'default' : 'outline'} size='icon'>
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
