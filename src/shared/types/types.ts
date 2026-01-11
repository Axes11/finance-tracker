export type Error = {
	message: string;
	status: number;
};

export type TotalTransactionsAmount = {
	crypto: number;
	stocks: number;
	bank: number;
	total: number;
	accountTotals: Record<string, number>;
};

export type AccountType = 'crypto' | 'stocks' | 'bank';
