import { Card, Skeleton } from '@/shared';

export function SummaryCardSkeleton() {
	return (
		<Card className='p-6 flex flex-col gap-4 items-start justify-between w-full h-52'>
			<div className='flex justify-between items-center w-full'>
				<div className='flex flex-row gap-3 items-start'>
					<div>
						<Skeleton className='w-[60px] h-[40px]' />
					</div>
					<Skeleton className='w-[20px] h-[10px]' />
				</div>
			</div>

			<Skeleton className='w-[150px] h-[75px]' />

			<div className='flex flex-row justify-between items-center w-full'>
				<Skeleton className='w-[40px] h-[20px]' />
			</div>
		</Card>
	);
}
