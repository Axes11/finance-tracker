'use server';

import { PublicPaths } from '@/shared/config';
import { getSupabaseServer } from '@/shared/lib/server/supabaseServer';

import { LoginResponse } from './model';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
	const supabase = await getSupabaseServer();

	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) throw error;
	return data;
};

export const logout = async (): Promise<void> => {
	const supabase = await getSupabaseServer();

	const { error } = await supabase.auth.signOut();

	if (error) throw error;
};

export const register = async (email: string, password: string): Promise<LoginResponse> => {
	const supabase = await getSupabaseServer();

	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
	});

	if (error) throw error;

	return data;
};

export const sendChangePasswordEmail = async (email: string): Promise<void> => {
	const supabase = await getSupabaseServer();

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL + PublicPaths.FORGOT_PASSWORD}`,
	});

	if (error) throw error;
};

export const updatePassword = async (newPassword: string, access_token: string, refresh_token: string): Promise<void> => {
	const supabase = await getSupabaseServer();

	await supabase.auth.setSession({ access_token, refresh_token });

	const { error } = await supabase.auth.updateUser({
		password: newPassword,
	});

	if (error) throw error;

	await supabase.auth.signOut();
};
