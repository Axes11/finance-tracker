'use client';

import { ChartLineUp, CurrencyBtc, CurrencyCircleDollar, Vault } from '@phosphor-icons/react';

import { DeleteAccount, UpdateAccount } from '@/features/accounts';

import { formatCurrency, formatPriceDifference } from '@/shared/lib';
import { Badge, Card } from '@/shared/ui';

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
		<Card className='p-6 flex flex-col gap-4 items-start justify-between w-full min-h-52'>
			<div className='flex justify-between items-center w-full'>
				<div className='flex flex-row gap-3 items-start'>
					<div>
						<span className='text-base font-bold text-muted-foreground'>
							{title} <Badge>{ICONS_MAP[badge]}</Badge>
						</span>
						<div className='text-xs text-muted-foreground mt-0'>{description}</div>
					</div>
				</div>
				<UpdateAccount id={id} title={title} description={description} />
			</div>

			<div className='flex flex-row gap-1 items-end'>
				<span className='text-3xl font-bold'>${formatCurrency(Math.ceil(amount || 0).toString())}</span>
				<span className='text-sm text-muted-foreground font-bold'>USD</span>
			</div>

			<div className='flex flex-row justify-between items-center w-full'>
				<span className='text-sm'>{formatPriceDifference(change)}</span>
				<DeleteAccount title={title} id={id} />
			</div>
		</Card>
	);
}
