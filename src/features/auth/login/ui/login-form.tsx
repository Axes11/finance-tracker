'use client';

import { PublicPaths } from '@/shared/config';
import { FormWrapper, FormField, Input } from '@/shared/ui';

import { useLogin } from '../hooks/useLogin';

export function LoginForm() {
	const { register, router, handleSubmit, errors, onSubmit, mutation } = useLogin();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormWrapper
				header='Log in'
				description='Track your wealth across all accounts in one place.'
				bodyActions={[
					{
						text: mutation.isPending ? 'Logging in...' : 'Log in',
						type: 'submit',
						disabled: mutation.isPending,
					},
				]}
				bottomActions={[
					{
						text: 'Forgot password?',
						function: () => router.push(PublicPaths.FORGOT_PASSWORD),
					},
					{
						text: "Don't have an account? Sign up",
						function: () => router.push(PublicPaths.REGISTER),
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
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
