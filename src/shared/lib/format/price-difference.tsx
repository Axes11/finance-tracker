'use client';

import { ReactNode } from 'react';
import { TrendDown, TrendUp, ArrowRight } from '@phosphor-icons/react';
import { Colors } from '@/shared/constants';

export const formatPriceDifference = (difference: number): ReactNode => {
	if (difference > 0) {
		return (
			<div className='flex flex-row gap-1 items-center'>
				<TrendUp size={16} color={Colors.GREEN} weight='bold' />
				<span className='text-sm font-bold text-green-600'>+{difference}%</span>
			</div>
		);
	} else if (difference < 0) {
		return (
			<div className='flex flex-row gap-1 items-center'>
				<TrendDown size={16} color={Colors.RED} weight='bold' />
				<span className='text-sm font-bold text-red-600'>{difference}%</span>
			</div>
		);
	} else {
		return (
			<div className='flex flex-row gap-1 items-center'>
				<ArrowRight size={16} color={Colors.YELLOW} weight='bold' />
				<span className='text-sm font-bold text-yellow-500'>0%</span>
			</div>
		);
	}
};
