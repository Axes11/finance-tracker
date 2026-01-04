import { AccountType } from '@/shared/types';

export type AccountSchema = {
	id: string;
	user_id: string;
	type: AccountType;
	name: string;
	description: string;
	created_at: string;
};

export type Account = {
	type: AccountType;
	name: string;
	description: string;
};
