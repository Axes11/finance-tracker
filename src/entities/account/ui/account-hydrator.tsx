'use client';

import { useState } from 'react';
import { AccountSchema } from '@/entities/account/model';
import { useAccountStore } from '@/entities/account/store';

export function AccountHydrator({ data }: { data: AccountSchema[] }) {
	const setAccounts = useAccountStore((s) => s.setAccounts);

	useState(() => {
		setAccounts(data);
	});

	return null;
}
