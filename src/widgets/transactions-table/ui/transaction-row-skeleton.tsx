import { TableCell, TableRow, Skeleton } from '@/shared/ui';

export function TransactionRowSkeleton() {
	return (
		<TableRow>
			<TableCell>
				<Skeleton className='w-4 h-4 rounded-full' />
			</TableCell>
			<TableCell>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell className='text-right'>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell className='text-right'>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
		</TableRow>
	);
}
