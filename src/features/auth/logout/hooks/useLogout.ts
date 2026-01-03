import { useUserStore } from '@/entities';
import { supabaseClient } from '@/shared';

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
