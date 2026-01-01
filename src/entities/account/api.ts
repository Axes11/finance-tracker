import { supabaseClient } from '@/shared/lib';
import { AccountSchema, AccountType } from '@/entities/account/model.ts';

export const createAccount = async (type: AccountType, name: string, description: string): Promise<void> => {
	const { error } = await supabaseClient.from('accounts').insert([{ type, name, description }]);
	if (error) throw error;
};

export const getAccounts = async (): Promise<AccountSchema[]> => {
	const { data, error } = await supabaseClient.from('accounts').select('*');

	if (error) throw error;

	return data;
};

export const deleteAccount = async (id: string): Promise<void> => {
	const { error } = await supabaseClient.from('accounts').delete().eq('id', id);
	if (error) throw error;
};
