'use server';

import { PublicPaths } from '@/shared/config';
import { getSupabaseServer } from '@/shared/lib/server/supabaseServer';

import { LoginResponse } from './model';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
	try {
		const supabase = await getSupabaseServer();

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) throw error;
		return data;
	} catch (error) {
		console.error('Error logging in:', error);
		throw error;
	}
};

export const logout = async (): Promise<void> => {
	try {
		const supabase = await getSupabaseServer();

		const { error } = await supabase.auth.signOut();

		if (error) throw error;
	} catch (error) {
		console.error('Error logging out:', error);
		throw error;
	}
};

export const register = async (email: string, password: string): Promise<LoginResponse> => {
	try {
		const supabase = await getSupabaseServer();

		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) throw error;

		return data;
	} catch (error) {
		console.error('Error registering:', error);
		throw error;
	}
};

export const sendChangePasswordEmail = async (email: string): Promise<void> => {
	try {
		const supabase = await getSupabaseServer();

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL + PublicPaths.FORGOT_PASSWORD}`,
		});

		if (error) throw error;
	} catch (error) {
		console.error('Error sending change password email:', error);
		throw error;
	}
};

export const updatePassword = async (newPassword: string, access_token: string, refresh_token: string): Promise<void> => {
	try {
		const supabase = await getSupabaseServer();

		await supabase.auth.setSession({ access_token, refresh_token });

		const { error } = await supabase.auth.updateUser({
			password: newPassword,
		});

		if (error) throw error;

		await supabase.auth.signOut();
	} catch (error) {
		console.error('Error updating password:', error);
		throw error;
	}
};
