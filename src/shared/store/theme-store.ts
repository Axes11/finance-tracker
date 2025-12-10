import { create } from 'zustand';

interface ThemeStore {
	theme: 'light' | 'dark';
	switchTheme: () => void;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
	theme: 'light',
	switchTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
}));

export default useThemeStore;
