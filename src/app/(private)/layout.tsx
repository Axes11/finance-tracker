import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getSupabaseServer } from '@/shared/lib/server/supabaseServer.ts';
import { getAccounts } from '@/entities/account/api.ts';
import { Navigation } from '@/widgets';
import { getTotalTransactionsAmount, getTransactions, getOptionsForCurrencies } from '@/entities/transaction/api.ts';
import { AccountHydrator } from '@/entities/account/ui/account-hydrator.tsx';
import { TransactionHydrator } from '@/entities/transaction/ui/transaction-hydrator.tsx';
import { TotalAmountHydrator } from '@/entities/transaction/ui/total-amount-hydrator.tsx';
import { CurrenciesTypesHydrator } from '@/entities/transaction/ui/currencies-options-hydrator';

export default async function PrivateLayout({ children }: { children: ReactNode }) {
	const supabaseServer = await getSupabaseServer();

	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const [accounts, transactions, { total, crypto, bank, stocks, accountTotals }, options] = await Promise.all([
		getAccounts(),
		getTransactions(0, 10),
		getTotalTransactionsAmount(),
		getOptionsForCurrencies(),
	]);

	return (
		<>
			<AccountHydrator data={accounts} />
			<TransactionHydrator data={transactions} />
			<TotalAmountHydrator total={{ total, crypto, bank, stocks, accountTotals }} accounts={accountTotals} />
			<CurrenciesTypesHydrator data={options} />
			{children}
			<Navigation />
		</>
	);
}
