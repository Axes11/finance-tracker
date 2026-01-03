import { CurrencyCrypto, CurrencyMoney, CurrencyStocks, DatePicker, FormField, FormSelect, Input, ModalWrapper } from '@/shared';
import { AccountType, TransactionShema } from '@/entities';

import { useUpdateTransaction } from '../hooks/useUpdateTransaction.ts';
import { Controller } from 'react-hook-form';

interface CurrencyOption {
	label: string;
	value: string;
}

interface CreateAccountModalProps {
	transaction: TransactionShema;
	isOpen: boolean;
	onClose: () => void;
}

const defineCurrencyOptions = (type: AccountType): CurrencyOption[] => {
	const currencyMap: Record<AccountType, Record<string, string>> = {
		bank: CurrencyMoney,
		stocks: CurrencyStocks,
		crypto: CurrencyCrypto,
	};

	return Object.values(currencyMap[type]).map((currency) => ({
		label: currency,
		value: currency,
	}));
};

export function UpdateTransactionModal({ transaction, isOpen, onClose }: CreateAccountModalProps) {
	const { register, control, handleSubmit, onSubmit, isPending, errors } = useUpdateTransaction({ id: transaction.id, onClose });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<ModalWrapper
				header={`Create Transaction For ${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}`}
				description='Fill in the details to create a new transaction.'
				bottomActions={[
					{
						text: isPending ? 'Creating transaction...' : 'Create Transaction',
						type: 'submit',
						disabled: isPending,
					},
				]}
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmit(onSubmit)}>
				<div className='flex gap-4 justify-between'>
					<div className='flex flex-col gap-4'>
						<FormField label='Account' tag='account_id' description='Select account for transaction' error={errors.account_id}>
							<Controller
								name='account_id'
								control={control}
								disabled={true}
								rules={{ required: 'Account is required' }}
								render={({ field }) => <FormSelect title='Account' placeholder='Account 1' options={[]} value={field.value} onChange={field.onChange} />}
							/>
						</FormField>
						<FormField label='Description' tag='description' description='Give your transaction description' error={errors.description}>
							<Input
								id='title'
								type='text'
								placeholder='Sent money for...'
								{...register('description', {
									required: 'Description is required',
									value: transaction.description,
									maxLength: {
										value: 50,
										message: 'Description cannot exceed 50 characters',
									},
								})}
							/>
						</FormField>
						<FormField label='Amout' tag='amount' description='Give amount of transaction' error={errors.amount}>
							<Input
								id='title'
								type='text'
								placeholder='100$'
								{...register('amount', {
									required: 'Amount is required',
									value: transaction.amount,
									maxLength: {
										value: 50,
										message: 'Amount cannot exceed 50 characters',
									},
								})}
							/>
						</FormField>
					</div>
					<div className='flex flex-col gap-4'>
						<FormField label='Currency' tag='currency' description='Select currency' error={errors.currency}>
							<Controller
								name='currency'
								control={control}
								defaultValue={transaction.currency}
								rules={{ required: 'Currency is required' }}
								render={({ field }) => <FormSelect title='Currencies' placeholder='USD / BTC / AAPL' options={defineCurrencyOptions(transaction.type)} value={field.value} onChange={field.onChange} />}
							/>
						</FormField>
						<FormField label='Category' tag='category' description='Give category of transaction' error={errors.category}>
							<Input
								id='category'
								type='text'
								defaultValue={transaction.category}
								placeholder='Investment'
								{...register('category', {
									required: 'Category is required',
									value: transaction.category,
									maxLength: {
										value: 50,
										message: 'Category cannot exceed 10 characters',
									},
								})}
							/>
						</FormField>
						<FormField label='Date' tag='date' description='Select date of transaction' error={errors.category}>
							<Controller
								name='date'
								control={control}
								defaultValue={new Date(`${transaction.date}T00:00:00`)}
								rules={{ required: 'Date is required' }}
								render={({ field }) => <DatePicker placeholder='Select date' value={field.value} onChange={field.onChange} />}
							/>
						</FormField>
					</div>
				</div>
			</ModalWrapper>
		</form>
	);
}
