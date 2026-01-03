import { Skeleton, TableCell, TableRow } from '@/shared';

export function TransactionRowSkeleton() {
	return (
		<TableRow>
			<TableCell className='font-medium'>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell colSpan={1}>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell colSpan={1}>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell colSpan={1}>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell colSpan={1}>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell className='text-right' colSpan={1}>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell className='text-right' colSpan={1}>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
			<TableCell className='text-right' colSpan={1}>
				<Skeleton className='w-full h-[25px]' />
			</TableCell>
		</TableRow>
	);
}
