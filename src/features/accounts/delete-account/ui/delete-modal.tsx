'use client';

import { ModalWrapper, Input, FormField } from '@/shared/ui';

import { useDeleteAccount } from '../hooks/useDeleteAccount';

interface CreateAccountModalProps {
	id: string;
	title: string;
	isOpen: boolean;
	onClose: () => void;
}

export default function DeleteAccountModal({ id, title, isOpen, onClose }: CreateAccountModalProps) {
	const { register, handleSubmit, onSubmit, isPending, errors } = useDeleteAccount({ id, onClose });

	return (
		<ModalWrapper
			header={`Delete Account ${title}`}
			description='Fill in the details to delete the account.'
			bottomActions={[
				{
					text: isPending ? 'Deleting account...' : 'Delete Account',
					type: 'submit',
					disabled: isPending,
				},
			]}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit(onSubmit)}>
			<FormField label='Submit' description='Submit if you wanna delete account' tag='title' error={errors.title}>
				<Input
					id='title'
					type='text'
					placeholder={`account/${title}`}
					{...register('title', {
						required: 'Title is required',
						validate: (value) => {
							if (value === `account/${title}`) return true;
							return 'Title does not match';
						},
					})}
				/>
			</FormField>
		</ModalWrapper>
	);
}
