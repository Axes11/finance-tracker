'use client';

import { useState } from 'react';

import { useTransactionModal } from '@/entities/transaction/modal-store';
import { CurrenciesOption } from '../model';

interface TransactionHydratorProps {
	data: CurrenciesOption[];
}

export function CurrenciesTypesHydrator({ data }: TransactionHydratorProps) {
	const setCurrenciesTypes = useTransactionModal((s) => s.setCurrenciesCrypto);

	useState(() => {
		setCurrenciesTypes(data);
	});

	return null;
}
