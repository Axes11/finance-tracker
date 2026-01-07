'use client';

import { FormWrapper, Input, FormField } from '@/shared/ui';
import { PublicPaths } from '@/shared/config';

import { useRegister } from '../hooks/useRegister';

export function RegisterForm() {
	const { register, router, handleSubmit, errors, onSubmit, mutation } = useRegister();

	return (
		<div className='w-full max-w-md'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormWrapper
					header='Register and Track Your Money!'
					description='Note and track your money in all your spaces!'
					bodyActions={[
						{
							text: mutation.isPending ? 'Registering...' : 'Register',
							type: 'submit',
							disabled: mutation.isPending,
						},
					]}
					bottomActions={[
						{
							text: 'Already have an account?',
							function: () => router.push(PublicPaths.LOGIN),
						},
					]}>
					<FormField label='E-mail' description='Enter unique email for your user.' tag='email' error={errors.email}>
						<Input
							id='email'
							type='text'
							placeholder='example@gmail.com'
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Invalid email address 1',
								},
							})}
						/>
					</FormField>
					<FormField label='Password' description='Password must be at least 8 characters long.' tag='password' error={errors.password}>
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
		</div>
	);
}
