'use client';

import { useLogin } from '@/features/auth/login';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, Input, Card, Button } from '@/shared/ui';
import { PublicPaths } from '@/shared/config/public-routes.ts';

export function LoginForm() {
	const { register, router, handleSubmit, errors, onSubmit, mutation } = useLogin();

	return (
		<div className='w-full max-w-md'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card className={'p-6'}>
					<FieldSet>
						<FieldLegend className='font-bold'>Log In and Track Your Money!</FieldLegend>
						<FieldDescription>Note and track your money in all your spaces!</FieldDescription>
						<FieldGroup>
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
						</FieldGroup>
						<Button type='submit' className='cursor-pointer'>
							{mutation.isPending ? 'Log In' : 'Logging In...'}
						</Button>
						<div className='flex items-center justify-center flex-col'>
							<Button type='button' onClick={() => router.push(PublicPaths.FORGOT_PASSWORD)} className='cursor-pointer' variant='link'>
								Forgot Password?
							</Button>
							<Button type='button' onClick={() => router.push(PublicPaths.REGISTER)} className='cursor-pointer' variant='link'>
								Don`t have an account?
							</Button>
						</div>
					</FieldSet>
				</Card>
			</form>
		</div>
	);
}
