import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateTransaction } from '@/entities/transaction/api.ts';
import { useLoadTransactions } from '@/shared/hooks/useLoadTransactions.ts';
import { useLoadTotalAmount } from '@/shared/hooks/useLoadTotalAmount.ts';

import { toDateOnly } from '@/shared/lib';
import { AccountType } from '@/shared/types';
import { CurrenciesOption } from '@/entities/transaction/model';

interface Transaction {
	id: string;
	onClose: () => void;
	type: AccountType;
	cryptoOptions: CurrenciesOption[];
	stocksOptions: CurrenciesOption[];
	moneyOptions: CurrenciesOption[];
}

interface Inputs {
	account_id: string;
	amount: number;
	description: string;
	category: string;
	currency: string;
	date: Date;
}

export function useUpdateTransaction({ id, onClose, type, cryptoOptions, stocksOptions, moneyOptions }: Transaction) {
	const { loadTransactions } = useLoadTransactions();
	const { loadTotalAmount } = useLoadTotalAmount();

	let optionsToShow: CurrenciesOption[] = [];

	if (type === 'crypto') {
		optionsToShow = cryptoOptions;
	} else if (type === 'stocks') {
		optionsToShow = stocksOptions;
	} else if (type === 'bank') {
		optionsToShow = moneyOptions;
	}

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit = (data: Inputs) => {
		mutation.mutate(data);
	};

	const mutation = useMutation({
		mutationFn: (data: Inputs) => updateTransaction(id, data.amount, data.description, data.currency, data.category, toDateOnly(data.date)),
		onSuccess: async () => {
			toast.success('Transaction updated successfully.!');

			await Promise.all([loadTransactions(), loadTotalAmount()]);

			reset();
			onClose();
		},
		onError: (error) => {
			toast.error(`Error updating transaction: ${error.message}`);
		},
	});

	const { isPending } = mutation;

	return {
		isPending,
		control,
		register,
		handleSubmit,
		onSubmit,
		errors,
		optionsToShow,
	};
}
