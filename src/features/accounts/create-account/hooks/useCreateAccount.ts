import { useMutation } from '@tanstack/react-query';
import { createAccount } from '@/entities/account/api.ts';
import { toast } from 'sonner';
import { Account, AccountType } from '@/entities/account';
import { useAccountStore } from '@/entities/account';
import { useForm } from 'react-hook-form';

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
