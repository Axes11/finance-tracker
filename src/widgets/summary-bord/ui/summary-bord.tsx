'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { AccountSchema } from '@/entities/account/model.ts';
import { useAccountStore } from '@/entities/account/store.ts';
import { useTransactionsStore } from '@/entities/transaction/store.ts';

import { Divider, Input, ClaroLogo } from '@/shared/ui';
import { AccountType } from '@/shared/types';

import { CreateAccount } from '@/features/accounts';

import { SummaryCard } from './summary-card.tsx';
import { SummaryCardSkeleton } from './summary-card-skeleton.tsx';

interface SummaryCardProps {
	type?: AccountType;
}

export function SummaryBord({ type }: SummaryCardProps) {
	const { accounts, getAccountsByType, hydrated: accountHydrated } = useAccountStore();
	const { totalAmount, totalAmountForAccounts, hydrated: transactionsHydrated } = useTransactionsStore();

	const data: AccountSchema[] = type ? getAccountsByType(type) : accounts;

	const isLoading = !accountHydrated || !transactionsHydrated;
	const hasTransactions = transactionsHydrated && totalAmountForAccounts && Object.keys(totalAmountForAccounts).length > 0;
	const isEmpty = accountHydrated && !accounts.length && !hasTransactions;

	return (
		<div className='relative z-10 flex flex-col gap-0 w-full'>
			<div className='grid grid-cols-1 lg:grid-cols-5'>
				<div className='flex items-center px-4 py-3 border-r border-border'>
					<ClaroLogo size={20} className='text-foreground' style={{ '--claro-eye': 'var(--background)' } as React.CSSProperties} />
				</div>
				<div className='lg:col-span-2 flex items-center border-r border-border'>
					<div className='relative w-full'>
						<svg width='14' height='14' viewBox='0 0 256 256' fill='none' className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'>
							<circle cx='116' cy='116' r='84' stroke='currentColor' strokeWidth='20' fill='none' />
							<line x1='175.4' y1='175.4' x2='224' y2='224' stroke='currentColor' strokeWidth='20' strokeLinecap='round' />
						</svg>
						<Input type='text' placeholder='Search accounts, transactions...' className='border-0 h-full pl-10 focus-visible:border-0 focus-visible:ring-0' />
					</div>
				</div>
				{/* Empty space — spans 2 columns */}
				<div className='lg:col-span-2 hidden lg:block' />
			</div>

			<Divider />

			<div>
				{isLoading && (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr'>
						{Array.from({ length: 4 }).map((_, i) => (
							<SummaryCardSkeleton key={i} />
						))}
					</div>
				)}
				{!isEmpty && !isLoading && (
					<Swiper
						spaceBetween={0}
						slidesPerView={1}
						breakpoints={{
							640: { slidesPerView: 2, spaceBetween: 0 },
							1024: { slidesPerView: 5, spaceBetween: 0 },
						}}
						className='w-full h-full [&_.swiper-slide]:border-r [&_.swiper-slide]:border-border'>
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
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr'>
						<div>
							<CreateAccount type={type} />
						</div>
					</div>
				)}
			</div>

			<Divider />
		</div>
	);
}
