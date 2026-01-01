import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAccountStore, createAccount, Account, AccountType } from '@/entities';

interface Inputs {
	title: string;
	description: string;
}

export const useCreateAccount = (type: AccountType) => {
	const { loadAccounts } = useAccountStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit = (data: Inputs) => {
		mutation.mutate({ type, name: data.title, description: data.description });
	};

	const mutation = useMutation({
		mutationFn: async ({ type, name, description }: Account) => createAccount(type, name, description),
		onSuccess: () => {
			toast.success('Account created successfully.');
			loadAccounts();
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
