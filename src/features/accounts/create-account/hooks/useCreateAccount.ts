import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAccountStore, createAccount, Account, AccountType } from '@/entities';

type CreateAccountProps = {
	type: AccountType;
	onClose: () => void;
};

interface Inputs {
	title: string;
	description: string;
}

export const useCreateAccount = ({ type, onClose }: CreateAccountProps) => {
	const { loadAccounts } = useAccountStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>();
	const onSubmit = (data: Inputs) => {
		mutation.mutate({ type, name: data.title, description: data.description });
	};

	const mutation = useMutation({
		mutationFn: async ({ type, name, description }: Account) => createAccount(type, name, description),
		onSuccess: () => {
			toast.success('Account created successfully.');
			reset();
			loadAccounts();
			onClose();
		},
		onError: (error) => {
			toast.error(`Error creating account: ${error.message}`);
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
};
