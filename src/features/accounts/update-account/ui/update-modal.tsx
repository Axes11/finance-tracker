'use client';

import { ModalWrapper, Input, FormField } from '@/shared/ui';
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
			<FormField label='Title' description='Update you account title' tag='title' error={errors.title}>
				<Input
					id='title'
					type='text'
					placeholder={`New title`}
					{...register('title', {
						value: title,
						required: 'Title is required',
					})}
				/>
			</FormField>
			<FormField label='Title' description='Update you account description' tag='description' error={errors.description}>
				<Input
					id='description'
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
			</FormField>
		</ModalWrapper>
	);
}
