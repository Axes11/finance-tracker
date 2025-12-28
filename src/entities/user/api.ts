import supabaseClient from '../../shared/lib/supabaseClient.ts';
import { LoginResponse } from './model.ts';
import { PublicPaths } from '@/shared/config/public-routes.ts';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) throw error;
	return data;
};

export const logout = async (): Promise<void> => {
	const { error } = await supabaseClient.auth.signOut();

	if (error) throw error;
};

export const register = async (email: string, password: string): Promise<LoginResponse> => {
	const { data, error } = await supabaseClient.auth.signUp({
		email: email,
		password: password,
	});

	if (error) throw error;

	return data;
};

export const sendChangePasswordEmail = async (email: string): Promise<void> => {
	const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
		redirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL + PublicPaths.FORGOT_PASSWORD}`,
	});

	if (error) throw error;
};

export const updatePassword = async (newPassword: string, access_token: string, refresh_token: string): Promise<void> => {
	await supabaseClient.auth.setSession({ access_token, refresh_token });

	const { error } = await supabaseClient.auth.updateUser({
		password: newPassword,
	});

	if (error) throw error;

	await supabaseClient.auth.signOut();
};
