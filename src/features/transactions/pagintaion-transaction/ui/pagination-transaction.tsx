import { Button, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, Spinner } from '@/shared/ui';
import { usePagination } from '../hooks/usePagination';
import { ArrowCircleLeft, ArrowCircleRight } from '@phosphor-icons/react';

export function PaginationTransaction() {
	const { page, isFetchingNextPage, handleNext, handlePrevious } = usePagination();

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<Button disabled={isFetchingNextPage} variant='ghost' onClick={handlePrevious}>
						<ArrowCircleLeft size={32} />
					</Button>
				</PaginationItem>
				{page >= 1 && (
					<>
						{isFetchingNextPage ? (
							<Button variant='secondary'>
								<Spinner />
							</Button>
						) : (
							<Button variant='secondary' onClick={handlePrevious}>
								{page}
							</Button>
						)}
					</>
				)}
				<PaginationItem>
					{isFetchingNextPage ? (
						<Button variant='secondary'>
							<Spinner />
						</Button>
					) : (
						<Button variant='secondary' onClick={handleNext}>
							{page + 1}
						</Button>
					)}
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<Button disabled={isFetchingNextPage} variant='ghost' onClick={handleNext}>
						<ArrowCircleRight size={32} />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
