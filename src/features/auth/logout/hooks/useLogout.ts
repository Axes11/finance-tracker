import { useUserStore } from '@/entities/user';
import supabaseClient from '@/shared/lib/supabaseClient.ts';

export function useLogout() {
	const user = useUserStore();

	const logout = () => {
		supabaseClient.auth.signOut();
		user.logoutUser();
	};

	return {
		logout,
	};
}
