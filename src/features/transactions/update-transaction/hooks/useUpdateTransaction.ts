import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateTransaction } from '@/entities';

interface Inputs {
	amount: number;
	description: string;
}

export function useUpdateTransaction(id: string) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit = (data: Inputs) => {
		mutation.mutate(data);
	};

	const mutation = useMutation({
		mutationFn: (data: Inputs) => updateTransaction(id, data.amount, data.description),
		onSuccess: () => {
			toast.success('Transaction updated created!');
		},
		onError: (error) => {
			toast.error(`Error updating transaction: ${error.message}`);
		},
	});

	const { isPending } = mutation;

	return {
		isPending,
		register,
		handleSubmit,
		onSubmit,
		errors,
	};
}
