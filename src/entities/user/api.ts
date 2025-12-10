import supabaseClient from './../../shared/lib/supabaseClient';
import { LoginResponse } from './model';

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
