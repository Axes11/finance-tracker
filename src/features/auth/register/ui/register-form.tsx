'use client';

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/shared/ui/field.tsx';
import { Input } from '@/shared/ui/input.tsx';
import { Card } from '@/shared/ui/card.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { PublicPaths } from '@/shared/config/public-routes.ts';
import { useRegister } from '@/features/auth/register/hooks/useRegister.ts';

export function RegisterForm() {
	const { register, router, handleSubmit, errors, onSubmit } = useRegister();

	return (
		<div className='w-full max-w-md'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card className={'p-6'}>
					<FieldSet>
						<FieldLegend className='font-bold'>Register and Track Your Money!</FieldLegend>
						<FieldDescription>Note and track your money in all your spaces!</FieldDescription>
						<FieldGroup>
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
											value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
											message: 'Invalid email address',
										},
									})}
								/>
								{errors.password && <FieldDescription className='text-red-500'>{errors.password?.message}</FieldDescription>}
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
						</FieldGroup>
						<Button type='submit' className='cursor-pointer'>
							Register
						</Button>
						<div className='flex items-center justify-center flex-col'>
							<Button type='button' onClick={() => router.push(PublicPaths.LOGIN)} className='cursor-pointer' variant='link'>
								Already have an account?
							</Button>
						</div>
					</FieldSet>
				</Card>
			</form>
		</div>
	);
}
