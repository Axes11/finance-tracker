import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserStore {
	user: User | null;
	isAuthLoading: boolean;

	loginUser: (newUser: User) => void;
	logoutUser: () => void;
	setAuthLoading: (value: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	isAuthLoading: true,

	loginUser: (newUser) => set({ user: newUser, isAuthLoading: false }),
	logoutUser: () => set({ user: null, isAuthLoading: false }),
	setAuthLoading: (value) => set({ isAuthLoading: value }),
}));
