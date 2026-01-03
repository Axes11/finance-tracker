import { create } from 'zustand';
import { toast } from 'sonner';

import { AccountSchema, AccountType, getAccounts } from '@/entities';
import { Error } from '@/shared';

type AccountStore = {
	accounts: AccountSchema[];
	isLoading: boolean;
	loadAccounts: () => Promise<void>;
	getAccounts: (type: AccountType) => AccountSchema[];
};

export const useAccountStore = create<AccountStore>((set, get) => ({
	accounts: [],
	isLoading: false,

	loadAccounts: async () => {
		if (get().isLoading) return;

		set({ isLoading: true });
		try {
			const res = await getAccounts();
			set({ accounts: res, isLoading: false });
		} catch (error) {
			const err = error as Error;
			set({ isLoading: false });
			toast.error(`Error loading accounts: ${err.message}`);
		}
	},
	getAccounts: (type?: AccountType) => {
		return get().accounts.filter((account) => account.type === type) || [];
	},
}));
