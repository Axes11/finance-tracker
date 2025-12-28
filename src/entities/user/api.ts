import supabaseClient from '../../shared/lib/supabaseClient.ts';
import { LoginResponse } from './model.ts';

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
