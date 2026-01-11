'use client';

import { AccountSchema } from '@/entities/account/model.ts';
import { useAccountStore } from '@/entities/account/store.ts';
import { useTransactionsStore } from '@/entities/transaction/store.ts';

import { Card, Carousel, CarouselContent, CarouselItem } from '@/shared/ui';
import { AccountType } from '@/shared/types';

import { CreateAccount } from '@/features/accounts';
import { CreateTransaction } from '@/features/transactions';

import { SummaryCard } from './summary-card.tsx';
import { SummaryCardSkeleton } from './summary-card-skeleton.tsx';

interface SummaryCardProps {
	header: string;
	description: string;
	type?: AccountType;
}

export function SummaryBord({ header, description, type }: SummaryCardProps) {
	const { accounts, getAccountsByType, hydrated: accountHydrated } = useAccountStore();
	const { totalAmount, totalAmountForAccounts, hydrated: transactionsHydrated } = useTransactionsStore();

	const data: AccountSchema[] = type ? getAccountsByType(type) : accounts;

	const totalSlides: number = Math.max(Math.ceil((accounts.length - 3) / 4) + 1, 2);

	const isLoading = !accountHydrated || !transactionsHydrated;
	const hasTransactions = transactionsHydrated && totalAmountForAccounts && Object.keys(totalAmountForAccounts).length > 0;
	const isEmpty = accountHydrated && !accounts.length && !hasTransactions;

	return (
		<Card className='p-6 w-full'>
			<div className='flex flex-col gap-2'>
				<span className='text-2xl font-bold'>{header}</span>
				<span className='text-sm text-muted-foreground'>{description}</span>
			</div>
			{isLoading && (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 auto-rows-fr'>
					{Array.from({ length: 4 }).map((_, i) => (
						<SummaryCardSkeleton key={i} />
					))}
				</div>
			)}
			{!isEmpty && !isLoading && (
				<Carousel className='w-full'>
					<CarouselContent>
						{Array.from({ length: totalSlides }).map((_, slideIndex) => {
							const firstSlideOffset = 3;
							const start = slideIndex === 0 ? 0 : firstSlideOffset + (slideIndex - 1) * 4;
							const end = slideIndex === 0 ? firstSlideOffset : start + 4;
							const chunk = data.slice(start, end);
							const showCreateOnFirst = data.length < 4;

							return (
								<CarouselItem key={slideIndex}>
									<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 auto-rows-fr'>
										{slideIndex === 0 && (
											<SummaryCard
												id={''}
												title='Total'
												description='Total amount from all your accounts!'
												amount={type ? totalAmount[type] : totalAmount.total}
												badge={type ? type : 'all'}
												change={1}
											/>
										)}

										{chunk.map((item: AccountSchema) => (
											<SummaryCard key={item.id} id={item.id} title={item.name} description={item.description} amount={totalAmountForAccounts[item.id] ?? 0} badge={type ?? item.type} change={1} />
										))}

										{type && ((showCreateOnFirst && slideIndex === 0) || (!showCreateOnFirst && slideIndex === totalSlides - 1)) && <CreateAccount type={type} />}
									</div>
								</CarouselItem>
							);
						})}
					</CarouselContent>
				</Carousel>
			)}
			{type && isEmpty && (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 auto-rows-fr'>
					<div className='mt-4'>
						<CreateAccount type={type} />
					</div>
				</div>
			)}
			{type && <CreateTransaction type={type} />}
		</Card>
	);
}
