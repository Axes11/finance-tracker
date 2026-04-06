export type GlobalSearchCategory = 'Pages' | 'Actions' | 'Shortcuts' | 'Accounts' | 'Transactions';

export interface GlobalSearchAction {
	type: 'navigate' | 'transaction';
	path: string;
	transactionId?: string;
}

export interface GlobalSearchItem {
	id: string;
	label: string;
	description: string;
	path: string;
	category: GlobalSearchCategory;
	keywords?: readonly string[];
	icon?: React.ReactNode;
	action?: GlobalSearchAction;
	meta?: string;
}

export interface GlobalSearchGroup {
	category: GlobalSearchCategory;
	items: GlobalSearchItem[];
}
