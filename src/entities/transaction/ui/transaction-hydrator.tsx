'use client';

import { useState } from 'react';
import { TransactionSchema } from '@/entities/transaction/model';
import { useTransactionsStore } from '@/entities/transaction/store';

interface Data {
	data: TransactionSchema[];
	total: number;
}

interface TransactionHydratorProps {
	data: Data;
}

export function TransactionHydrator({ data }: TransactionHydratorProps) {
	const setTransactions = useTransactionsStore((s) => s.setTransactions);

	useState(() => {
		setTransactions(data.data);
	});

	return null;
}
