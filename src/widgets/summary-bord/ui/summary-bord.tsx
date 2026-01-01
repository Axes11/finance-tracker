import { Card } from '@/shared/ui';
import { SummaryCard } from '@/shared/ui';
import { AccountSchema, AccountType } from '@/entities/account';
import { CreateAccount } from '@/features/accounts/create-account';

interface SummaryCardProps {
	data: AccountSchema[];
	header: string;
	description: string;
	type?: AccountType;
}

export function SummaryBord({ data, header, description, type }: SummaryCardProps) {
	return (
		<Card className='p-6 w-full'>
			<div className='flex flex-col gap-2'>
				<span className='text-2xl font-bold'>{header}</span>
				<span className='text-sm text-muted-foreground'>{description}</span>
			</div>
			{data.length === 0 && !type && (
				<Card className='flex items-center justify-center'>
					<span className='text-sm text-muted-foreground'>No accounts found.</span>
				</Card>
			)}
			<div className='grid grid-cols-4 gap-2 auto-rows-fr'>
				{type
					? data?.map((item: AccountSchema, index: number) => <SummaryCard id={item.id} key={index} title={item.name} description={item.description} amount={2000} badge={type} change={2000} />)
					: data.map((item: AccountSchema, index: number) => <SummaryCard id={item.id} key={index} title={item.name} description={item.description} amount={2000} badge={item.type} change={2000} />)}
				{type && <CreateAccount type={type} />}
			</div>
		</Card>
	);
}
