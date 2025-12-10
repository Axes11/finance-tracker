import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserStore {
	user: User | null;
	loginUser: (newUser: User) => void;
	logoutUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
	user: null,

	loginUser: (newUser: User) => set({ user: newUser }),
	logoutUser: () => set({ user: null }),
}));

export default useUserStore;
