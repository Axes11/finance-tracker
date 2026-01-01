'use client';

import { Field, FieldDescription, FieldLabel, Input, PublicPaths, FormWrapper } from '@/shared';

import { useRegister } from '../hooks/useRegister.ts';

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
					<Field>
						<FieldLabel htmlFor='email'>E-mail</FieldLabel>
						<FieldDescription>Enter unique email for your user.</FieldDescription>
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
						{errors.email && <FieldDescription className='text-red-500'>{errors.email?.message}</FieldDescription>}
					</Field>
					<Field>
						<FieldLabel htmlFor='password'>Password</FieldLabel>
						<FieldDescription>Password must be at least 8 characters long.</FieldDescription>
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
