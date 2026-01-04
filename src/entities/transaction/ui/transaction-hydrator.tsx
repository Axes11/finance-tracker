'use client';

import { useState } from 'react';
import { TransactionShema } from '@/entities/transaction/model';
import { useTransactionsStore } from '@/entities/transaction/store';

export function TransactionHydrator({ data }: { data: TransactionShema[] }) {
	const setTransactions = useTransactionsStore((s) => s.setTransactions);

	useState(() => {
		setTransactions(data);
	});

	return null;
}
