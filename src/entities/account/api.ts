'use server';

import { AccountSchema } from './model.ts';
import { getSupabaseServer } from '@/shared/lib/server/supabaseServer';
import { AccountType } from '@/shared/types';
import { accountSchema } from '@/shared/lib/validation';

export const createAccount = async (type: AccountType, name: string, description: string): Promise<void> => {
	// Validate input
	const validated = accountSchema.parse({ type, name, description });

	const supabase = await getSupabaseServer();

	const { error } = await supabase.from('accounts').insert([validated]);
	if (error) throw error;
};

export const getAccounts = async (): Promise<AccountSchema[]> => {
	const supabase = await getSupabaseServer();

	const { data, error } = await supabase.from('accounts').select('*');

	if (error) throw error;

	return data;
};

export const deleteAccount = async (id: string): Promise<void> => {
	// Validate ID format
	if (!id || typeof id !== 'string') {
		throw new Error('Invalid account ID');
	}

	const supabase = await getSupabaseServer();

	const { error } = await supabase.from('accounts').delete().eq('id', id);
	if (error) throw error;
};

export const updateAccount = async (id: string, updates: Partial<{ name: string; description: string }>): Promise<void> => {
	// Validate ID format
	if (!id || typeof id !== 'string') {
		throw new Error('Invalid account ID');
	}

	// Validate updates - sanitize and trim strings
	const sanitizedUpdates: Partial<{ name: string; description: string }> = {};
	if (updates.name !== undefined) {
		sanitizedUpdates.name = String(updates.name).trim().slice(0, 100);
	}
	if (updates.description !== undefined) {
		sanitizedUpdates.description = String(updates.description).trim().slice(0, 500);
	}

	const supabase = await getSupabaseServer();

	const { error } = await supabase.from('accounts').update(sanitizedUpdates).eq('id', id);
	if (error) throw error;
};
