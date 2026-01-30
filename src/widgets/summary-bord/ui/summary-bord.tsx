'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { AccountSchema } from '@/entities/account/model.ts';
import { useAccountStore } from '@/entities/account/store.ts';
import { useTransactionsStore } from '@/entities/transaction/store.ts';

import { Card } from '@/shared/ui';
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
				<Swiper
					spaceBetween={10}
					slidesPerView={1}
					breakpoints={{
						640: {
							slidesPerView: 2,
							spaceBetween: 10,
						},
						1024: {
							slidesPerView: 5,
							spaceBetween: 10,
						},
					}}
					className='w-full h-full'>
					<SwiperSlide className='!h-auto'>
						<SummaryCard
							id={''}
							title='Total'
							description='Total amount from all your accounts!'
							amount={type ? (totalAmount[type].total ?? 0) : (totalAmount.total.total ?? 0)}
							badge={type ? type : 'all'}
							change={1}
						/>
					</SwiperSlide>

					{data.map((item: AccountSchema) => (
						<SwiperSlide key={item.id} className='!h-auto'>
							<SummaryCard id={item.id} title={item.name} description={item.description} amount={totalAmountForAccounts.get(item.id) ?? 0} badge={type ?? item.type} change={1} />
						</SwiperSlide>
					))}

					{type && (
						<SwiperSlide className='!h-auto'>
							<CreateAccount type={type} />
						</SwiperSlide>
					)}
				</Swiper>
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
