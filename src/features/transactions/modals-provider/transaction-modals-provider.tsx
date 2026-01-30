import { useTransactionModal } from '@/entities/transaction';
import { UpdateTransactionModal } from '../update-transaction/ui/update-modal';
import { DeleteTransactionModal } from '../delete-transaction/ui/delete-modal';

export const TransactionModalsProvider = () => {
	const { activeTransaction, modalMode, actions, currenciesCrypto, currenciesBank, currenciesStocks } = useTransactionModal();

	if (!activeTransaction) return null;

	return (
		<>
			<UpdateTransactionModal
				transaction={activeTransaction}
				isOpen={modalMode === 'update'}
				moneyOptions={currenciesBank}
				stocksOptions={currenciesStocks}
				cryptoOptions={currenciesCrypto}
				onClose={actions.close}
			/>
			<DeleteTransactionModal id={activeTransaction.id} title={activeTransaction.description} isOpen={modalMode === 'delete'} onClose={actions.close} />
		</>
	);
};
