'use client';

import { useLogin } from '@/features/auth/login';
import { Field, FieldDescription, FieldLabel, Input } from '@/shared/ui';
import { PublicPaths } from '@/shared/config/public-routes.ts';
import { FormWrapper } from '@/shared/ui';

export function LoginForm() {
	const { register, router, handleSubmit, errors, onSubmit, mutation } = useLogin();

	return (
		<div className='w-full max-w-md'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormWrapper
					header='Log In and Track Your Money!'
					description='Note and track your money in all your spaces!'
					bodyActions={[
						{
							text: mutation.isPending ? 'Logging In...' : 'Log In',
							type: 'submit',
							disabled: mutation.isPending,
						},
					]}
					bottomActions={[
						{
							text: 'Forgot Password?',
							function: () => router.push(PublicPaths.FORGOT_PASSWORD),
							type: 'button',
						},
						{
							text: 'Don`t have an account?',
							function: () => router.push(PublicPaths.REGISTER),
							type: 'button',
						},
					]}>
					<Field>
						<FieldLabel htmlFor='email'>E-mail</FieldLabel>
						<Input
							id='email'
							type='text'
							placeholder='example@gmail.com'
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: 'Invalid email address',
								},
							})}
						/>
						{errors.email && <FieldDescription className='text-red-500'>{errors.email?.message}</FieldDescription>}
					</Field>
					<Field>
						<FieldLabel htmlFor='password'>Password</FieldLabel>
						<Input
							id='password'
							type='password'
							placeholder='••••••••'
							{...register('password', {
								required: 'Password is required',
							})}
						/>
						{errors.password && <FieldDescription className='text-red-500'>{errors.password?.message}</FieldDescription>}
					</Field>
				</FormWrapper>
			</form>
		</div>
	);
}
