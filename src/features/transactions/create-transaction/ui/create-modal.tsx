'use client';

import { Controller } from 'react-hook-form';

import { useCreateTransaction } from '../hooks/useCreateTransaction';

import { AccountSchema } from '@/entities/account';

import { ModalWrapper, FormField, Input, FormSelect, DatePicker } from '@/shared/ui';
import { AccountType } from '@/shared/types';

interface CreateAccountModalProps {
	type: AccountType;
	isOpen: boolean;
	onClose: () => void;
}

export function CreateTransactionModal({ type, isOpen, onClose }: CreateAccountModalProps) {
	const { register, control, handleSubmit, onSubmit, isPending, errors, getAccounts, optionsToShow } = useCreateTransaction({ type, onClose });

	const accountOptions = getAccounts(type).map((acc: AccountSchema) => ({
		label: acc.name,
		value: acc.id,
	}));

	return (
		<ModalWrapper
			header={`Create Transaction For ${type.charAt(0).toUpperCase() + type.slice(1)}`}
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
			<div className='grid grid-cols-2 gap-4'>
				<div className='flex flex-col gap-4'>
					<FormField label='Account' tag='account_id' description='Select account for transaction' error={errors.account_id}>
						<Controller
							name='account_id'
							control={control}
							rules={{ required: 'Account is required' }}
							render={({ field }) => <FormSelect title='Account' placeholder='Account 1' options={accountOptions} value={field.value} onChange={field.onChange} />}
						/>
					</FormField>
					<FormField label='Description' tag='description' description='Give your transaction description' error={errors.description}>
						<Input
							id='title'
							type='text'
							placeholder='Sent money for...'
							{...register('description', {
								required: 'Description is required',
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
							rules={{ required: 'Currency is required' }}
							render={({ field }) => <FormSelect title='Currencies' placeholder='USD / BTC / AAPL' options={optionsToShow || []} value={field.value} onChange={field.onChange} />}
						/>
					</FormField>
					<FormField label='Category' tag='category' description='Give category of transaction' error={errors.category}>
						<Input
							id='category'
							type='text'
							placeholder='Investment'
							{...register('category', {
								required: 'Category is required',
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
							rules={{ required: 'Date is required' }}
							render={({ field }) => <DatePicker placeholder='Select date' value={field.value} onChange={field.onChange} />}
						/>
					</FormField>
				</div>
			</div>
		</ModalWrapper>
	);
}
