import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteTransaction } from '@/entities';

export function useDeleteTransaction(id: string) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = () => {
		mutation.mutate(id);
	};

	const mutation = useMutation({
		mutationFn: (id: string) => deleteTransaction(id),
		onSuccess: () => {
			toast.success('Transaction successfully created!');
		},
		onError: (error) => {
			toast.error(`Error creating transaction: ${error.message}`);
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
