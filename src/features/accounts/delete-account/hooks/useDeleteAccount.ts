import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

import { deleteAccount } from '@/entities/account/api.ts';
import { useLoadAccount } from '@/shared/hooks/useLoadAccount.ts';
import { useLoadTotalAmount } from '@/shared/hooks/useLoadTotalAmount';

interface UseDeleteAccountProps {
	id: string;
	onClose: () => void;
}

interface Inputs {
	title: string;
}

export const useDeleteAccount = ({ id, onClose }: UseDeleteAccountProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit = () => {
		mutation.mutate(id);
	};

	const { loadAccounts } = useLoadAccount();
	const { loadTotalAmount } = useLoadTotalAmount();

	const mutation = useMutation({
		mutationFn: async (accountId: string) => deleteAccount(accountId),
		onSuccess: async () => {
			toast.success('Account deleted successfully.');

			await Promise.all([loadAccounts(), loadTotalAmount()]);

			reset();
			onClose();
		},
		onError: (error: Error) => {
			toast.error(`Error deleting account: ${error.message}`);
		},
	});

	const { isPending } = mutation;

	return { isPending, register, handleSubmit, onSubmit, errors };
};
