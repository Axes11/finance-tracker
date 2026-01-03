import { Field, FieldDescription, FieldLabel, Input, ModalWrapper } from '@/shared';

import { useDeleteAccount } from '../hooks/useDeleteAccount.ts';

interface CreateAccountModalProps {
	id: string;
	title: string;
	isOpen: boolean;
	onClose: () => void;
}

export default function DeleteAccountModal({ id, title, isOpen, onClose }: CreateAccountModalProps) {
	const { register, handleSubmit, onSubmit, isPending, errors } = useDeleteAccount({ id, onClose });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
				<Field className='mb-2'>
					<FieldLabel htmlFor='title'>Title</FieldLabel>
					<FieldDescription>Give your account title</FieldDescription>
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
					{errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
				</Field>
			</ModalWrapper>
		</form>
	);
}
