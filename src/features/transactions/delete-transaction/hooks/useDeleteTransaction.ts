import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteTransaction } from '@/entities/transaction/api.ts';
import { useLoadTransactions } from '@/shared/hooks/useLoadTransactions.ts';
import { useLoadTotalAmount } from '@/shared/hooks/useLoadTotalAmount.ts';

interface UseDeleteTransactionProps {
	id: string;
	onClose: () => void;
}

export function useDeleteTransaction({ id, onClose }: UseDeleteTransactionProps) {
	const { loadTransactions } = useLoadTransactions();
	const { loadTotalAmount } = useLoadTotalAmount();

	const mutation = useMutation({
		mutationFn: (id: string) => deleteTransaction(id),
		onSuccess: async () => {
			toast.success('Transaction successfully deleted!');

			await Promise.all([loadTransactions(), loadTotalAmount()]);

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
