'use client';

import { ModalWrapper, Field, FieldDescription, FieldLabel, Input } from '@/shared/ui';
import { useUpdateAccount } from '@/features/accounts/update-account/hooks/useUpdateAccount';

interface UpdateAccountModalProps {
	id: string;
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
}

export function UpdateAccountModal({ id, title, description, isOpen, onClose }: UpdateAccountModalProps) {
	const { register, handleSubmit, onSubmit, errors, isPending } = useUpdateAccount({ id, onClose });

	return (
		<ModalWrapper
			header={`Update Account ${title}`}
			description='Fill in the details to update the account.'
			bottomActions={[
				{
					text: isPending ? 'Updating account...' : 'Update Account',
					type: 'submit',
					disabled: isPending,
				},
			]}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit(onSubmit)}>
			<Field className='mb-2'>
				<FieldLabel htmlFor='title'>Title</FieldLabel>
				<FieldDescription>Change title to new</FieldDescription>
				<Input
					id='title'
					type='text'
					placeholder={`New title`}
					{...register('name', {
						value: title,
						required: 'Title is required',
					})}
				/>
				{errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
			</Field>
			<Field className='mb-2'>
				<FieldLabel htmlFor='title'>Description</FieldLabel>
				<FieldDescription>Change description to new</FieldDescription>
				<Input
					id='title'
					type='text'
					placeholder={`New description (Optional)`}
					{...register('description', {
						value: description,
						maxLength: {
							value: 200,
							message: 'Description cannot exceed 200 characters',
						},
					})}
				/>
				{errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
			</Field>
		</ModalWrapper>
	);
}
