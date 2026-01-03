import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteTransaction, useTransactionsStore } from '@/entities';

interface UseDeleteTransactionProps {
	id: string;
	onClose: () => void;
}

export function useDeleteTransaction({ id, onClose }: UseDeleteTransactionProps) {
	const { loadTransactions } = useTransactionsStore();

	const mutation = useMutation({
		mutationFn: (id: string) => deleteTransaction(id),
		onSuccess: () => {
			toast.success('Transaction successfully deleted!');
			loadTransactions();
			onClose();
		},
		onError: (error) => {
			toast.error(`Error deleting transaction: ${error.message}`);
		},
	});

	const handleDelete = () => {
		mutation.mutate(id);
	};

	const { isPending } = mutation;

	return {
		isPending,
		handleDelete,
	};
}
