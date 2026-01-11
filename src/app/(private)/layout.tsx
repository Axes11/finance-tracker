import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getSupabaseServer } from '@/shared/lib/server/supabaseServer.ts';
import { getAccounts } from '@/entities/account/api.ts';
import { Navigation } from '@/widgets';
import { getTotalTransactionsAmount, getTransactions } from '@/entities/transaction/api.ts';
import { AccountHydrator } from '@/entities/account/ui/account-hydrator.tsx';
import { TransactionHydrator } from '@/entities/transaction/ui/transaction-hydrator.tsx';
import { TotalAmountHydrator } from '@/entities/transaction/ui/total-amount-hydrator.tsx';

export default async function PrivateLayout({ children }: { children: ReactNode }) {
	const supabaseServer = await getSupabaseServer();

	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const [accounts, transactions, { total, crypto, bank, stocks, accountTotals }] = await Promise.all([getAccounts(), getTransactions(), getTotalTransactionsAmount()]);

	return (
		<>
			<AccountHydrator data={accounts} />
			<TransactionHydrator data={transactions} />
			<TotalAmountHydrator total={{ total, crypto, bank, stocks }} accounts={accountTotals} />
			{children}
			<Navigation />
		</>
	);
}
