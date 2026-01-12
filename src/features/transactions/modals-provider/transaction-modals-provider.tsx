import { useTransactionModal } from '@/entities/transaction';
import { UpdateTransactionModal } from '../update-transaction/ui/update-modal';
import { DeleteTransactionModal } from '../delete-transaction/ui/delete-modal';

export const TransactionModalsProvider = () => {
	const { activeTransaction, modalMode, actions } = useTransactionModal();

	if (!activeTransaction) return null;

	return (
		<>
			<UpdateTransactionModal transaction={activeTransaction} isOpen={modalMode === 'update'} onClose={actions.close} />
			<DeleteTransactionModal id={activeTransaction.id} title={activeTransaction.description} isOpen={modalMode === 'delete'} onClose={actions.close} />
		</>
	);
};
