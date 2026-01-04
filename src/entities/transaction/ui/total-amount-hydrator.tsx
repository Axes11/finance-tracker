'use client';

import { useState } from 'react';
import { useTransactionsStore } from '@/entities/transaction/store';

interface TotalAmount {
	crypto: number;
	stocks: number;
	bank: number;
	total: number;
}

interface TotalAmountHydratorProps {
	total: TotalAmount;
	accounts: Record<string, number>;
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
