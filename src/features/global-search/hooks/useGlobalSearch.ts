'use client';

import { ChangeEvent, createElement, useMemo, useState } from 'react';

import { Bank, ChartLineUp, CurrencyBtc, House, Keyboard, PlusCircle, TrendUp, Vault, type Icon, type IconWeight } from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';

import { useAccountStore } from '@/entities/account';
import { useTransactionModal, useTransactionsStore } from '@/entities/transaction';

import { PrivatePaths, PRIVATE_NAVIGATION_ITEMS } from '@/shared/config';
import { AccountSchema } from '@/entities/account';
import { TransactionSchema } from '@/entities/transaction';
import { GlobalSearchCategory, GlobalSearchGroup, GlobalSearchItem } from '@/shared/types';

const SEARCH_ICON_MAP = {
	main: House,
	crypto: CurrencyBtc,
	stocks: ChartLineUp,
	bank: Vault,
	transaction: PlusCircle,
	analytics: TrendUp,
	shortcut: Keyboard,
} as const;

const ENTITY_TYPE_PATH_MAP = {
	crypto: PrivatePaths.CRYPTO,
	stocks: PrivatePaths.STOCKS,
	bank: PrivatePaths.BANK,
} as const;

const ENTITY_TYPE_ICON_MAP = {
	crypto: CurrencyBtc,
	stocks: ChartLineUp,
	bank: Bank,
} as const;

const CATEGORY_ORDER: Record<GlobalSearchCategory, number> = {
	Pages: 0,
	Actions: 1,
	Shortcuts: 2,
	Accounts: 3,
	Transactions: 4,
};

const RESULT_LIMIT_PER_GROUP = 5;

const normalize = (value: string) => value.trim().toLowerCase();
const formatAmount = (amount: number, currency: string) => `${amount > 0 ? '+' : ''}${amount} ${currency}`;

function createIcon(IconComponent: Icon) {
	return createElement(IconComponent, { size: 16, weight: 'duotone' as IconWeight });
}

function createNavigationSearchItems(): GlobalSearchItem[] {
	return PRIVATE_NAVIGATION_ITEMS.map((item) => {
		const Icon = SEARCH_ICON_MAP[item.icon];

		return {
			...item,
			keywords: [...item.keywords],
			icon: createIcon(Icon),
			action: { type: 'navigate', path: item.path },
			meta: item.path.replace('/', ''),
		};
	});
}

function createAccountSearchItems(accounts: AccountSchema[]): GlobalSearchItem[] {
	return accounts.map((account) => {
		const Icon = ENTITY_TYPE_ICON_MAP[account.type];
		const path = ENTITY_TYPE_PATH_MAP[account.type];

		return {
			id: `account-${account.id}`,
			label: account.name,
			description: account.description || `${account.type} account`,
			path,
			category: 'Accounts',
			keywords: [account.type, account.name, account.description],
			icon: createIcon(Icon),
			action: { type: 'navigate', path },
			meta: account.type,
		};
	});
}

function createTransactionSearchItems(accounts: AccountSchema[], transactions: TransactionSchema[]): GlobalSearchItem[] {
	const accountsMap = new Map(accounts.map((account) => [account.id, account]));

	return transactions.map((transaction) => {
		const account = accountsMap.get(transaction.account_id);
		const Icon = ENTITY_TYPE_ICON_MAP[transaction.type];
		const path = ENTITY_TYPE_PATH_MAP[transaction.type];
		const accountName = account?.name ?? 'Unknown account';
		const description = [accountName, formatAmount(transaction.amount, transaction.currency), transaction.date].filter(Boolean).join(' · ');

		return {
			id: `transaction-${transaction.id}`,
			label: transaction.description || 'Untitled transaction',
			description,
			path,
			category: 'Transactions',
			keywords: [transaction.description, transaction.currency, transaction.type, transaction.date, accountName, String(transaction.amount)],
			icon: createIcon(Icon),
			action: { type: 'transaction', path, transactionId: transaction.id },
			meta: `${transaction.currency} ${transaction.amount} ${accountName}`,
		};
	});
}

function getScore(item: GlobalSearchItem, query: string) {
	if (!query) {
		return item.category === 'Pages' ? 100 : item.category === 'Actions' ? 90 : 80;
	}

	const normalizedLabel = normalize(item.label);
	const normalizedDescription = normalize(item.description);
	const normalizedMeta = normalize(item.meta ?? '');
	const normalizedKeywords = (item.keywords ?? []).filter(Boolean).map(normalize);

	if (normalizedLabel === query) return 120;
	if (normalizedKeywords.some((keyword) => keyword === query)) return 110;
	if (normalizedLabel.startsWith(query)) return 100;
	if (normalizedMeta.startsWith(query)) return 95;
	if (normalizedDescription.startsWith(query)) return 90;
	if (normalizedKeywords.some((keyword) => keyword.includes(query))) return 80;
	if (normalizedLabel.includes(query)) return 75;
	if (normalizedMeta.includes(query)) return 70;
	if (normalizedDescription.includes(query)) return 65;

	return -1;
}

function filterGlobalSearchItems(items: GlobalSearchItem[], query: string) {
	const normalizedQuery = normalize(query);

	return items
		.map((item) => ({ item, score: getScore(item, normalizedQuery) }))
		.filter(({ score }) => score >= 0)
		.sort((a, b) => b.score - a.score)
		.map(({ item }) => item);
}

function groupGlobalSearchItems(items: GlobalSearchItem[]): GlobalSearchGroup[] {
	const groups = new Map<GlobalSearchGroup['category'], GlobalSearchItem[]>();

	for (const item of items) {
		const categoryItems = groups.get(item.category) ?? [];
		if (categoryItems.length < RESULT_LIMIT_PER_GROUP) {
			categoryItems.push(item);
			groups.set(item.category, categoryItems);
		}
	}

	return Array.from(groups.entries())
		.sort((a, b) => CATEGORY_ORDER[a[0]] - CATEGORY_ORDER[b[0]])
		.map(([category, categoryItems]) => ({
			category,
			items: categoryItems,
		}));
}

export function useGlobalSearch() {
	const router = useRouter();
	const pathname = usePathname();
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const accounts = useAccountStore((state) => state.accounts);
	const transactions = useTransactionsStore((state) => state.transactions);
	const { actions } = useTransactionModal();

	const navigationItems = useMemo(() => createNavigationSearchItems(), []);
	const accountItems = useMemo(() => createAccountSearchItems(accounts), [accounts]);
	const transactionItems = useMemo(() => createTransactionSearchItems(accounts, transactions), [accounts, transactions]);

	const searchItems = useMemo(() => [...navigationItems, ...accountItems, ...transactionItems], [navigationItems, accountItems, transactionItems]);
	const filteredItems = useMemo(() => filterGlobalSearchItems(searchItems, query), [searchItems, query]);
	const groupedItems = useMemo(() => groupGlobalSearchItems(filteredItems), [filteredItems]);

	const closeSearch = () => {
		setIsOpen(false);
		setQuery('');
	};

	const handleSelect = (item: GlobalSearchItem) => {
		const action = item.action ?? { type: 'navigate' as const, path: item.path };

		if (action.type === 'transaction' && action.transactionId) {
			const transaction = transactions.find((entry) => entry.id === action.transactionId);
			if (!transaction) {
				closeSearch();
				router.push(action.path);
				return;
			}

			if (pathname !== action.path) {
				router.push(action.path);
			}

			actions.openUpdate(transaction);
			closeSearch();
			return;
		}

		closeSearch();
		router.push(action.path);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextValue = event.target.value;
		setQuery(nextValue);
		setIsOpen(true);
	};

	return {
		query,
		isOpen,
		pathname,
		groupedItems,
		setIsOpen,
		handleChange,
		handleSelect,
	};
}
