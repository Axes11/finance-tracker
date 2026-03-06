'use client';

import { useState } from 'react';

import { useTransactionsStore } from '@/entities/transaction/store';
import { TotalTransactionsAmount } from '@/shared/types';

interface TotalAmountHydratorProps {
	total: TotalTransactionsAmount;
	accounts: Map<string, number>;
}

export function TotalAmountHydrator({ total, accounts }: TotalAmountHydratorProps) {
	const setTotalAmount = useTransactionsStore((s) => s.setTotalAmount);
	const setTotalAmountForAccounts = useTransactionsStore((s) => s.setTotalAmountForAccounts);

	useState(() => {
		setTotalAmount(total);
		setTotalAmountForAccounts(accounts);
	});

	return null;
}
