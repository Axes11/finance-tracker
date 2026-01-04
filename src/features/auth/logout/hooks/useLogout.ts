import { useUserStore } from '@/entities/user';
import { logout } from '@/entities/user/api.ts';

export function useLogout() {
	const user = useUserStore();

	const logoutUser = () => {
		logout();
		user.logoutUser();
	};

	return {
		logoutUser,
	};
}
