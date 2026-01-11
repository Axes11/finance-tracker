import { useQuery } from '@tanstack/react-query';

import { useTransactionsStore } from '@/entities/transaction';
import { getTransactions } from '@/entities/transaction/api';
import { useEffect } from 'react';

export const usePagination = () => {
	const { page, limit, setPage, setTransactions } = useTransactionsStore();

	const { data, isPending, isPlaceholderData } = useQuery({
		queryKey: ['transactions', page, limit],
		queryFn: () => getTransactions(page, limit),
		placeholderData: (previousData) => previousData,
	});

	useEffect(() => {
		if (data) {
			setTransactions(data);
		}
	}, [data, setTransactions]);

	const handleNext = () => setPage(page + 1);
	const handlePrevious = () => setPage(Math.max(0, page - 1));

	return {
		page,
		limit,
		isFetchingNextPage: isPending && isPlaceholderData,
		handleNext,
		handlePrevious,
	};
};
