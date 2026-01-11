'use client';

import { useState } from 'react';
import { TransactionSchema } from '@/entities/transaction/model';
import { useTransactionsStore } from '@/entities/transaction/store';

export function TransactionHydrator({ data }: { data: TransactionSchema[] }) {
	const setTransactions = useTransactionsStore((s) => s.setTransactions);

	useState(() => {
		setTransactions(data);
	});

	return null;
}
