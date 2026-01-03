import { Card, Carousel, CarouselContent, CarouselItem } from '@/shared';
import { AccountSchema, AccountType, useAccountStore } from '@/entities';
import { CreateAccount, CreateTransaction } from '@/features';

import { SummaryCard } from '../ui/summary-card.tsx';
import { SummaryCardSkeleton } from '../ui/summary-card-skeleton.tsx';

interface SummaryCardProps {
	data: AccountSchema[];
	header: string;
	description: string;
	type?: AccountType;
}

export function SummaryBord({ data, header, description, type }: SummaryCardProps) {
	const { isLoading } = useAccountStore();

	return (
		<Card className='p-6 w-full'>
			<div className='flex flex-col gap-2'>
				<span className='text-2xl font-bold'>{header}</span>
				<span className='text-sm text-muted-foreground'>{description}</span>
			</div>
			{data.length === 0 && !type && !isLoading && (
				<Card className='flex items-center justify-center'>
					<span className='text-sm text-muted-foreground'>No accounts found.</span>
				</Card>
			)}
			{isLoading && (
				<div className='grid grid-cols-4 gap-2 auto-rows-fr'>
					{Array.from({ length: type ? 3 : 4 }).map((_, i) => (
						<SummaryCardSkeleton key={i} />
					))}
				</div>
			)}
			<Carousel className='w-full'>
				<CarouselContent>
					{Array.from({ length: Math.ceil(data.length / 4) }).map((_, slideIndex) => {
						const start = slideIndex * 4;
						const end = start + 4;
						const chunk = data.slice(start, end);

						return (
							<CarouselItem key={slideIndex}>
								<div className='grid grid-cols-4 gap-2 auto-rows-fr'>
									{chunk.map((item: AccountSchema) => (
										<SummaryCard key={item.id} id={item.id} title={item.name} description={item.description} amount={2000} badge={type ?? item.type} change={2000} />
									))}

									{type && slideIndex === Math.ceil(data.length / 4) - 1 && <CreateAccount type={type} />}
								</div>
							</CarouselItem>
						);
					})}
				</CarouselContent>
			</Carousel>
			<div>{type && !isLoading && data.length !== 0 && <CreateTransaction type={type} />}</div>
		</Card>
	);
}
