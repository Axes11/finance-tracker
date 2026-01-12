import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateAccount } from '@/entities/account/api.ts';
import { useLoadAccount } from '@/shared/hooks/useLoadAccount.ts';

interface UpdateAccount {
	id: string;
	onClose: () => void;
}

interface Inputs {
	title: string;
	description?: string;
}

export const useUpdateAccount = ({ id, onClose }: UpdateAccount) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit = (data: Inputs) => {
		mutation.mutate(data);
	};

	const { loadAccounts } = useLoadAccount();

	const mutation = useMutation({
		mutationFn: async (data: Inputs) => await updateAccount(id, { name: data.title, description: data.description }),
		onSuccess: async () => {
			toast.success('Account updated successfully');

			await loadAccounts();

			reset();
			onClose();
		},
		onError: (error) => {
			toast.error(`Failed to update account ${error}`);
		},
	});

	const { isPending } = mutation;

	return {
		register,
		handleSubmit,
		onSubmit,
		errors,
		isPending,
	};
};
