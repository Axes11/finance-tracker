import { create } from 'zustand';
import { AccountSchema } from '@/entities/account';
import { AccountType } from '@/shared/types';

type AccountStore = {
	accounts: AccountSchema[];
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
	setAccounts: (accounts: AccountSchema[]) => void;
	getAccountById: (id: string) => string | undefined;
	getAccountsByType: (type: AccountType) => AccountSchema[];
	getAccounts: (type: AccountType) => AccountSchema[];
};

export const useAccountStore = create<AccountStore>((set, get) => ({
	accounts: [],
	isLoading: false,

	setAccounts: (accounts) => set({ accounts, isLoading: false }),
	setIsLoading: (isLoading) => set({ isLoading }),

	getAccountById: (id) => get().accounts.find((a) => a.id === id)?.name,
	getAccountsByType: (type: AccountType) => get().accounts.filter((a) => a.type === type) || [],
	getAccounts: (type) => get().accounts.filter((a) => a.type === type) || [],
}));
