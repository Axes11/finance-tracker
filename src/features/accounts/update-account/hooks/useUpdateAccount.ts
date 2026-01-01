import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateAccount, useAccountStore } from '@/entities';

interface UpdateAccount {
	id: string;
	onClose: () => void;
}

interface Inputs {
	name: string;
	description?: string;
}

export const useUpdateAccount = ({ id, onClose }: UpdateAccount) => {
	const { loadAccounts } = useAccountStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit = (data: Inputs) => {
		mutation.mutate(data);
	};

	const mutation = useMutation({
		mutationFn: async (data: Inputs) => await updateAccount(id, { name: data.name, description: data.description }),
		onSuccess: () => {
			toast.success('Account updated successfully');
			loadAccounts();
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
