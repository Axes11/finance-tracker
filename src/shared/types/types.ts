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

export interface TransactionSchema {
	id: string;
	user_id: string;
	account_id: string;
	amount: number;
	type: AccountType;
	description: string;
	currency: string;
	date: string;
	created_at: string;
}

export type AccountType = 'crypto' | 'stocks' | 'bank';
