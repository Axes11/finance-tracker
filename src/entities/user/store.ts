import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserStore {
	user: User | null;
	hydrated: boolean;

	loginUser: (newUser: User) => void;
	logoutUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	hydrated: false,

	loginUser: (newUser) => set({ user: newUser, hydrated: true }),
	logoutUser: () => set({ user: null }),
}));
