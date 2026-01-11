'use server';

import { AccountSchema } from './model.ts';
import { getSupabaseServer } from '@/shared/lib/server/supabaseServer';
import { AccountType } from '@/shared/types';

export const createAccount = async (type: AccountType, name: string, description: string): Promise<void> => {
	const supabase = await getSupabaseServer();

	const { error } = await supabase.from('accounts').insert([{ type, name, description }]);
	if (error) throw error;
};

export const getAccounts = async (): Promise<AccountSchema[]> => {
	const supabase = await getSupabaseServer();

	const { data, error } = await supabase.from('accounts').select('*');

	if (error) throw error;

	return data;
};

export const deleteAccount = async (id: string): Promise<void> => {
	const supabase = await getSupabaseServer();

	const { error } = await supabase.from('accounts').delete().eq('id', id);
	if (error) throw error;
};

export const updateAccount = async (id: string, updates: Partial<{ name: string; description: string }>): Promise<void> => {
	const supabase = await getSupabaseServer();

	const { error } = await supabase.from('accounts').update(updates).eq('id', id);
	if (error) throw error;
};
