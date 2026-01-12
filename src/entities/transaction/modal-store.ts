import { create } from 'zustand';
import { TransactionSchema } from '@/entities/transaction';

interface TransactionModalStore {
	activeTransaction: TransactionSchema | null;
	modalMode: 'update' | 'delete' | null;
	actions: {
		openUpdate: (t: TransactionSchema) => void;
		openDelete: (t: TransactionSchema) => void;
		close: () => void;
	};
}

export const useTransactionModal = create<TransactionModalStore>((set) => ({
	activeTransaction: null,
	modalMode: null,
	actions: {
		openUpdate: (t) => set({ activeTransaction: t, modalMode: 'update' }),
		openDelete: (t) => set({ activeTransaction: t, modalMode: 'delete' }),
		close: () => set({ activeTransaction: null, modalMode: null }),
	},
}));
