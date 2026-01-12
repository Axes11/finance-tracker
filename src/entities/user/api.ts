'use server';

import { PublicPaths } from '@/shared/config';
import { getSupabaseServer } from '@/shared/lib/server/supabaseServer';
import { loginSchema, registerSchema, emailSchema, updatePasswordSchema } from '@/shared/lib/validation';

import { LoginResponse } from './model';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
	// Validate input
	const validated = loginSchema.parse({ email, password });

	const supabase = await getSupabaseServer();

	const { data, error } = await supabase.auth.signInWithPassword({
		email: validated.email,
		password: validated.password,
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
	// Validate input with stronger password requirements
	const validated = registerSchema.parse({ email, password });

	const supabase = await getSupabaseServer();

	const { data, error } = await supabase.auth.signUp({
		email: validated.email,
		password: validated.password,
	});

	if (error) throw error;

	return data;
};

export const sendChangePasswordEmail = async (email: string): Promise<void> => {
	// Validate email
	const validated = emailSchema.parse({ email });

	const supabase = await getSupabaseServer();

	const { error } = await supabase.auth.resetPasswordForEmail(validated.email, {
		redirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL + PublicPaths.FORGOT_PASSWORD}`,
	});

	if (error) throw error;
};

export const updatePassword = async (newPassword: string, access_token: string, refresh_token: string): Promise<void> => {
	// Validate input
	const validated = updatePasswordSchema.parse({ newPassword, access_token, refresh_token });

	const supabase = await getSupabaseServer();

	await supabase.auth.setSession({ access_token: validated.access_token, refresh_token: validated.refresh_token });

	const { error } = await supabase.auth.updateUser({
		password: validated.newPassword,
	});

	if (error) throw error;

	await supabase.auth.signOut();
};
