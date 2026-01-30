export type Error = {
	message: string;
	status: number;
};

export type TotalTransactionsAmountValues = {
	name: string;
	value: number;
};

export type TotalTransactionsAmountResult = {
	total: number;
	values: TotalTransactionsAmountValues[];
};

export type TotalTransactionsAmount = {
	crypto: TotalTransactionsAmountResult;
	stocks: TotalTransactionsAmountResult;
	bank: TotalTransactionsAmountResult;
	total: TotalTransactionsAmountResult;
	accountTotals: Map<string, number>;
};

export type AccountType = 'crypto' | 'stocks' | 'bank';
