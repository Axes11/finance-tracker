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
	crypto: <CurrencyBtc size={14} />,
	stocks: <ChartLineUp size={14} />,
	bank: <Vault size={14} />,
	all: <CurrencyCircleDollar size={14} />,
};

export function SummaryCard({ id, badge, title, change, description, amount }: Card) {
	return (
		<Card className='p-4 flex flex-col gap-3 items-start justify-between w-full h-full'>
			<div className='flex justify-between items-start w-full'>
				<div className='flex flex-row gap-3 items-start'>
					<div>
						<span className='font-display text-base font-bold text-muted-foreground'>
							{title} <Badge>{ICONS_MAP[badge]}</Badge>
						</span>
						<div className='font-mono text-[0.62rem] tracking-[0.06em] text-muted-foreground mt-0'>{description}</div>
					</div>
				</div>
				<UpdateAccount id={id} title={title} description={description} />
			</div>

			<div className='flex flex-row gap-1 items-end'>
				<span className='font-display text-2xl font-extrabold tracking-tight'>${formatCurrency(Math.ceil(amount || 0).toString())}</span>
				<span className='font-mono text-[0.65rem] tracking-[0.08em] uppercase text-muted-foreground font-medium'>USD</span>
			</div>

			<div className='flex flex-row justify-between items-center w-full'>
				<span className='text-sm'>{formatPriceDifference(change)}</span>
				<DeleteAccount title={title} id={id} />
			</div>
		</Card>
	);
}
