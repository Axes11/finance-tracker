// import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

// interface UserStore {
// 	user: User | null;
// 	loginUser: (newUser: User) => void;
// 	logoutUser: () => void;
// }

interface UserStore {
	user: { id: string; name: string } | null;
	loginUser: (newUser: { id: string; name: string }) => void;
	logoutUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
	user: null,

	// loginUser: (newUser: User) => set({ user: newUser }),
	loginUser: (newUser: { id: string; name: string }) => set({ user: newUser }),
	logoutUser: () => set({ user: null }),
}));

export default useUserStore;
