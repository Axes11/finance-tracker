import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserStore {
	user: User | null;
	hydrated: boolean;
	isBalancesHidden: boolean;

	loginUser: (newUser: User) => void;
	logoutUser: () => void;
	toggleBalancesVisibility: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	hydrated: false,
	isBalancesHidden: false,

	loginUser: (newUser) => set({ user: newUser, hydrated: true }),
	logoutUser: () => set({ user: null }),
	toggleBalancesVisibility: () => set((state) => ({ isBalancesHidden: !state.isBalancesHidden })),
}));
