import { create } from 'zustand';

interface ChartsStore {
	historicalData: HistoricalData | null;

	setHistoricalData: (data: HistoricalData) => void;
}

export const useChartsStore = create<ChartsStore>((set) => ({
	historicalData: null,

	setHistoricalData: (data: HistoricalData) => set({ historicalData: data }),
}));
