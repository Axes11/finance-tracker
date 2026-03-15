import { create } from 'zustand';
import type { HistoricalData } from './model';

interface ChartsStore {
	historicalData: HistoricalData | null;

	setHistoricalData: (data: HistoricalData) => void;
}

export const useChartsStore = create<ChartsStore>((set) => ({
	historicalData: null,

	setHistoricalData: (data: HistoricalData) => set({ historicalData: data }),
}));
