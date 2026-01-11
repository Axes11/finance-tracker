import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateTransaction } from '@/entities/transaction/api.ts';
import { useLoadTransactions } from '@/shared/hooks/useLoadTransactions.ts';
import { useLoadTotalAmount } from '@/shared/hooks/useLoadTotalAmount.ts';

import { toDateOnly } from '@/shared/lib';
import { CurrencyCrypto, CurrencyMoney, CurrencyStocks } from '@/entities/transaction';

interface Transaction {
	id: string;
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

export function useUpdateTransaction({ id, onClose }: Transaction) {
	const { loadTransactions } = useLoadTransactions();
	const { loadTotalAmount } = useLoadTotalAmount();

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
		onSuccess: () => {
			toast.success('Transaction updated successfully.!');
			loadTransactions();
			loadTotalAmount();
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
	};
}
