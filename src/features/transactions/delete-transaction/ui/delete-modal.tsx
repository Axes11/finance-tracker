'use client';

import { ModalWrapper } from '@/shared/ui';
import { useDeleteTransaction } from '../hooks/useDeleteTransaction.ts';

interface DeleteTransactionModalProps {
	id: string;
	onClose: () => void;
	isOpen: boolean;
	title: string;
}

export function DeleteTransactionModal({ id, onClose, title, isOpen }: DeleteTransactionModalProps) {
	const { isPending, handleDelete } = useDeleteTransaction({ id, onClose });

	return (
		<ModalWrapper
			header={`Delete Transaction "${title}"`}
			description='Are you sure you want to delete this transaction? This action cannot be undone.'
			bottomActions={[
				{
					text: isPending ? 'Deleting transaction...' : 'Delete Transaction',
					type: 'submit',
					disabled: isPending,
				},
			]}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleDelete}>
			<></>
		</ModalWrapper>
	);
}
