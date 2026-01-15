import { create } from 'zustand';
import { TransactionSchema } from '@/entities/transaction';
import { CurrenciesOption } from './model';
import { CryptoOptions, StockOptions, MoneyOptions } from '@/shared/constants/currincies';

interface TransactionModalStore {
	activeTransaction: TransactionSchema | null;
	modalMode: 'update' | 'delete' | null;
	currenciesCrypto: CurrenciesOption[];
	currenciesStocks: CurrenciesOption[];
	currenciesBank: CurrenciesOption[];
	actions: {
		openUpdate: (t: TransactionSchema) => void;
		openDelete: (t: TransactionSchema) => void;
		close: () => void;
	};
	setCurrenciesCrypto: (types: CurrenciesOption[]) => void;
}

export const useTransactionModal = create<TransactionModalStore>((set) => ({
	activeTransaction: null,
	modalMode: null,
	currenciesCrypto: CryptoOptions,
	currenciesStocks: StockOptions,
	currenciesBank: MoneyOptions,
	actions: {
		openUpdate: (t) => set({ activeTransaction: t, modalMode: 'update' }),
		openDelete: (t) => set({ activeTransaction: t, modalMode: 'delete' }),
		close: () => set({ activeTransaction: null, modalMode: null }),
	},
	setCurrenciesCrypto: (types) => set({ currenciesCrypto: types }),
}));
