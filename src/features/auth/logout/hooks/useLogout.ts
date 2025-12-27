import { useUserStore } from '@/entities/user';

export function useLogout() {
	const user = useUserStore();

	const logout = () => {
		user.logoutUser();
	};

	return {
		logout,
	};
}
