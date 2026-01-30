'use client';

import { useState } from 'react';
import { useTransactionsStore } from '@/entities/transaction/store';

interface TotalAmount {
	crypto: Map<string, number>;
	stocks: Map<string, number>;
	bank: Map<string, number>;
	total: Map<string, number>;
}

interface TotalAmountHydratorProps {
	total: TotalAmount;
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
