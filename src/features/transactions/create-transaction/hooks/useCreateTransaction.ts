import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createTransaction } from '@/entities/transaction/api.ts';
import { useLoadTransactions } from '@/shared/hooks/useLoadTransactions.ts';
import { useLoadTotalAmount } from '@/shared/hooks/useLoadTotalAmount.ts';

import { toDateOnly } from '@/shared/lib';
import { AccountType } from '@/shared/types';

import { useAccountStore } from '@/entities/account';
import { useTransactionModal } from '@/entities/transaction';
import { CurrenciesOption } from '@/entities/transaction/model';

interface CreateTransactionProps {
	type: AccountType;
	onClose: () => void;
}

interface Inputs {
	account_id: string;
	amount: number;
	description: string;
	currency: string;
	date: Date;
}

export function useCreateTransaction({ type, onClose }: CreateTransactionProps) {
	const { getAccounts } = useAccountStore();
	const { loadTransactions } = useLoadTransactions();
	const { loadTotalAmount } = useLoadTotalAmount();

	const { currenciesCrypto, currenciesStocks, currenciesBank } = useTransactionModal();

	let optionsToShow: CurrenciesOption[] = [];

	if (type === 'crypto') {
		optionsToShow = currenciesCrypto;
	} else if (type === 'stocks') {
		optionsToShow = currenciesStocks;
	} else if (type === 'bank') {
		optionsToShow = currenciesBank;
	}

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit = (data: Inputs) => {
		mutation.mutate({
			account_id: data.account_id,
			amount: data.amount,
			description: data.description || 'No description',
			currency: data.currency,
			date: data.date || new Date(),
		});
	};

	const mutation = useMutation({
		mutationFn: ({ account_id, amount, description, currency, date }: Inputs) => createTransaction(account_id, amount, description, currency, type, toDateOnly(date)),
		onSuccess: async () => {
			toast.success('Transaction successfully created!');

			await Promise.all([loadTransactions(), loadTotalAmount()]);

			reset();
			onClose();
		},
		onError: (error) => {
			toast.error(`Error creating transaction: ${error.message}`);
		},
	});

	const { isPending } = mutation;

	return {
		isPending,
		register,
		control,
		handleSubmit,
		onSubmit,
		getAccounts,
		errors,
		optionsToShow,
	};
}
