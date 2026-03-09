'use client';

import { FormWrapper, Input, FormField } from '@/shared/ui';
import { PublicPaths } from '@/shared/config';

import { useRegister } from '../hooks/useRegister';

export function RegisterForm() {
	const { register, router, handleSubmit, errors, onSubmit, mutation } = useRegister();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormWrapper
				header='Sign up'
				description='Create an account to start tracking your wealth.'
				bodyActions={[
					{
						text: mutation.isPending ? 'Registering...' : 'Create account',
						type: 'submit',
						disabled: mutation.isPending,
					},
				]}
				bottomActions={[
					{
						text: 'Already have an account? Log in',
						function: () => router.push(PublicPaths.LOGIN),
					},
				]}>
				<FormField label='E-mail' tag='email' error={errors.email}>
					<Input
						id='email'
						type='text'
						placeholder='name@example.com'
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Invalid email address',
							},
						})}
					/>
				</FormField>
				<FormField label='Password' tag='password' error={errors.password}>
					<Input
						id='password'
						type='password'
						placeholder='••••••••'
						{...register('password', {
							required: 'Password is required',
						})}
					/>
				</FormField>
			</FormWrapper>
		</form>
	);
}
