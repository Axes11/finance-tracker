import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

import { deleteAccount, useAccountStore } from '@/entities';

interface UseDeleteAccountProps {
	id: string;
	onClose: () => void;
}

interface Inputs {
	title: string;
}

export const useDeleteAccount = ({ id, onClose }: UseDeleteAccountProps) => {
	const { loadAccounts } = useAccountStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit = () => {
		mutation.mutate(id);
	};

	const mutation = useMutation({
		mutationFn: async (accountId: string) => deleteAccount(accountId),
		onSuccess: () => {
			toast.success('Account deleted successfully.');
			loadAccounts();
			onClose();
		},
		onError: (error: Error) => {
			toast.error(`Error deleting account: ${error.message}`);
		},
	});

	const { isPending } = mutation;

	return { isPending, register, handleSubmit, onSubmit, errors };
};
