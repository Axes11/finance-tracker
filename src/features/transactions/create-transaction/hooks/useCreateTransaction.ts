import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AccountType, createTransaction, CurrencyCrypto, CurrencyMoney, CurrencyStocks, useAccountStore, useTransactionsStore } from '@/entities';

interface CreateTransactionProps {
	type: AccountType;
	onClose: () => void;
}

interface Inputs {
	account_id: string;
	amount: number;
	description: string;
	category: string;
	currency: CurrencyMoney | CurrencyCrypto | CurrencyStocks;
	date: Date;
}

export function useCreateTransaction({ type, onClose }: CreateTransactionProps) {
	const { getAccounts } = useAccountStore();
	const { loadTransactions } = useTransactionsStore();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit = (data: Inputs) => {
		mutation.mutate({ account_id: data.account_id, amount: data.amount, description: data.description, category: data.category, currency: data.currency, date: data.date });
	};

	const mutation = useMutation({
		mutationFn: ({ account_id, amount, description, category, currency, date }: Inputs) => createTransaction(account_id, amount, description, category, currency, type, date),
		onSuccess: () => {
			toast.success('Transaction successfully created!');
			loadTransactions();
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
	};
}
