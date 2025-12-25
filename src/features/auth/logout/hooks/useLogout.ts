import useUserStore from '@/entities/user/store.ts';

export function useLogout() {
	const user = useUserStore();

	const logout = () => {
		user.logoutUser();
	};

	return {
		logout,
	};
}
