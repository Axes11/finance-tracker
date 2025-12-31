import { Field, FieldDescription, FieldLabel, Input, ModalWrapper } from '@/shared/ui';
import { useCreateAccount } from '../hooks/useCreateAccount.ts';
import { AccountType } from '@/entities/account';

interface CreateAccountModalProps {
	type: AccountType;
	isOpen: boolean;
	onClose: () => void;
}

export default function CreateAccountModal({ type, isOpen, onClose }: CreateAccountModalProps) {
	const { register, handleSubmit, onSubmit, isPending, errors } = useCreateAccount(type);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
				<Field className='mb-2'>
					<FieldLabel htmlFor='title'>Title</FieldLabel>
					<FieldDescription>Give your account title</FieldDescription>
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
					{errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
				</Field>
				<Field>
					<FieldLabel htmlFor='description'>Description (Optional)</FieldLabel>
					<FieldDescription>Give your account description</FieldDescription>
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
					{errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
				</Field>
			</ModalWrapper>
		</form>
	);
}
