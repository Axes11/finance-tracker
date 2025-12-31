import { CurrencyBtc, ChartLineUp, Vault, CurrencyCircleDollar } from '@phosphor-icons/react';

import { Badge, Card } from '@/shared/ui';
import { formatCurrency } from '@/shared/lib';
import { formatPriceDifference } from '@/shared/lib/format/price-difference.tsx';

interface Card {
	badge: 'crypto' | 'stocks' | 'bank' | 'all';
	title: string;
	amount: number;
	change: number;
}

const ICONS_MAP = {
	crypto: <CurrencyBtc size={32} />,
	stocks: <ChartLineUp size={32} />,
	bank: <Vault size={32} />,
	all: <CurrencyCircleDollar size={32} />,
};

export function SummaryCard({ badge, title, change, amount }: Card) {
	return (
		<Card className='p-6 flex flex-col gap-4 items-start w-full'>
			<div className='flex flex-row gap-3 items-center'>
				<span className='text-base font-bold text-muted-foreground'>{title}</span>
				<Badge>{ICONS_MAP[badge]}</Badge>
			</div>
			<div className='flex flex-row gap-1 items-end'>
				<span className='text-3xl font-bold'>${formatCurrency(amount.toString())}</span>
				<span className='text-sm text-muted-foreground font-bold'>USD</span>
			</div>
			<span className='text-sm'>{formatPriceDifference(change)}</span>
		</Card>
	);
}
