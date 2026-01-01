import { ChartLineUp, CurrencyBtc, CurrencyCircleDollar, Vault } from '@phosphor-icons/react';

import { Badge, Card } from '@/shared/ui';
import { formatCurrency } from '@/shared/lib';
import { formatPriceDifference } from '@/shared/lib/format/price-difference.tsx';
import { DeleteAccount } from '@/features/accounts/delete-account/ui/delete-account.tsx';

interface Card {
	id: string;
	badge: 'crypto' | 'stocks' | 'bank' | 'all';
	title: string;
	description: string;
	amount: number;
	change: number;
}

const ICONS_MAP = {
	crypto: <CurrencyBtc size={32} />,
	stocks: <ChartLineUp size={32} />,
	bank: <Vault size={32} />,
	all: <CurrencyCircleDollar size={32} />,
};

export function SummaryCard({ id, badge, title, change, description, amount }: Card) {
	return (
		<Card className='p-6 flex flex-col gap-4 items-start justify-between w-full'>
			<div className='flex flex-row gap-3 items-start'>
				<div>
					<span className='text-base font-bold text-muted-foreground'>{title}</span>
					<div className='text-xs text-muted-foreground mt-0'>{description}</div>
				</div>
				<Badge>{ICONS_MAP[badge]}</Badge>
			</div>

			<div className='flex flex-row gap-1 items-end'>
				<span className='text-3xl font-bold'>${formatCurrency(amount.toString())}</span>
				<span className='text-sm text-muted-foreground font-bold'>USD</span>
			</div>

			<div className='flex flex-row justify-between items-center w-full'>
				<span className='text-sm'>{formatPriceDifference(change)}</span>
				<DeleteAccount title={title} id={id} />
			</div>
		</Card>
	);
}
