'use client';

import { ModalWrapper, Input, FormField } from '@/shared/ui';

import { useCreateAccount } from '../hooks/useCreateAccount';
import { AccountType } from '@/shared/types';

interface CreateAccountModalProps {
	type: AccountType;
	isOpen: boolean;
	onClose: () => void;
}

export default function CreateAccountModal({ type, isOpen, onClose }: CreateAccountModalProps) {
	const { register, handleSubmit, onSubmit, isPending, errors } = useCreateAccount({ type, onClose });

	return (
		<ModalWrapper
			header={`Create Account For ${type.charAt(0).toUpperCase() + type.slice(1)}`}
			description='Fill in the details to create a new account.'
			bottomActions={[
				{
					text: isPending ? 'Creating account...' : 'Create Account',
					type: 'submit',
					disabled: isPending,
				},
			]}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit(onSubmit)}>
			<FormField label='Title' description='Give your account title' tag='title' error={errors.title}>
				<Input
					id='title'
					type='text'
					placeholder='Main Account'
					{...register('title', {
						required: 'Title is required',
						maxLength: {
							value: 50,
							message: 'Title cannot exceed 50 characters',
						},
					})}
				/>
			</FormField>
			<FormField label='Descrption' description='Give your account descrption (Optional)' tag='description' error={errors.description}>
				<Input
					id='description'
					type='text'
					placeholder='Account for investments in stocks...'
					{...register('description', {
						maxLength: {
							value: 200,
							message: 'Description cannot exceed 200 characters',
						},
					})}
				/>
			</FormField>
		</ModalWrapper>
	);
}
