import { useAccountStore } from '@/entities/account/store.ts';
import { getAccounts } from '@/entities/account/api.ts';

export const useLoadAccount = () => {
	const { setAccounts } = useAccountStore();

	const loadAccounts = async () => {
		const accounts = await getAccounts();
		setAccounts(accounts);
	};

	return { loadAccounts };
};
