import { CurrencyMoney, CurrencyCrypto, CurrencyStocks } from '@/shared/constants';
import { AccountType } from '@/shared/types';

export type TransactionSchema = {
	id: string;
	user_id: string;
	account_id: string;
	amount: number;
	type: AccountType;
	description: string;
	currency: CurrencyMoney | CurrencyCrypto | CurrencyStocks;
	category: string;
	date: string;
	created_at: string;
};

export type CurrencyMoney = (typeof CurrencyMoney)[keyof typeof CurrencyMoney];
export type CurrencyCrypto = (typeof CurrencyCrypto)[keyof typeof CurrencyCrypto];
export type CurrencyStocks = (typeof CurrencyStocks)[keyof typeof CurrencyStocks];
