'use client';

import { Card, Field, FieldDescription, FieldLabel, FormWrapper, Input } from '@/shared/ui';
import { PublicPaths } from '@/shared/config';

import { useForgotPassword } from '../hooks/useForgotPassword.ts';

export function ForgotPasswordForm() {
	const { step, sendCode, changePassword, handleSubmit, register, errors, router, mutationSendCode, mutationChangePassword, resendAfter } = useForgotPassword();

	return (
		<div className='w-full max-w-md'>
			<form>
				{step !== 'passwordChanged' ? (
					<FormWrapper
						header='Change Your Password'
						description='We will send mail to your email address to change your password.'
						bodyActions={[
							{
								text: mutationSendCode?.isPending ? 'Sending Code...' : 'Send Code',
								function: () => handleSubmit(sendCode)(),
								hide: step === 'sendCode',
								disabled: mutationSendCode?.isPending,
								type: 'button',
							},
							{
								text: mutationChangePassword?.isPending ? 'Changing Password...' : 'Change Password',
								function: () => handleSubmit(changePassword)(),
								hide: step === 'newPassword',
								disabled: mutationSendCode?.isPending,
								type: 'button',
							},
						]}
						bottomActions={[
							{
								text: mutationSendCode.isSuccess && resendAfter > 0 ? `Resend Code After 00:${resendAfter < 10 ? `0${resendAfter}` : resendAfter}` : 'Resend Code',
								function: () => handleSubmit(sendCode)(),
								disabled: (resendAfter > 0 && mutationSendCode.isSuccess) || mutationSendCode?.isPending,
								type: 'button',
							},
							{
								text: 'Don`t Remember Your Email?',
								function: () => {
									router.push(PublicPaths.DONT_REMEMBER_EMAIL);
								},
								type: 'button',
							},
							{
								text: 'Back to Login',
								function: () => {
									router.push(PublicPaths.LOGIN);
								},
								type: 'button',
							},
						]}>
						{step === 'sendCode' && (
							<Field>
								<FieldLabel htmlFor='email'>E-mail</FieldLabel>
								<FieldDescription>Your email address.</FieldDescription>
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
						)}
						{step === 'newPassword' && (
							<Field>
								<FieldLabel htmlFor='newPassword'>New Password</FieldLabel>
								<Input
									id='newPassword'
									type='password'
									placeholder='••••••••'
									{...register('newPassword', {
										required: 'New password is required',
										minLength: {
											value: 8,
											message: 'Password must be at least 6 characters long',
										},
									})}
								/>
								{errors.newPassword && <FieldDescription className='text-red-500'>{errors.newPassword?.message}</FieldDescription>}
							</Field>
						)}
					</FormWrapper>
				) : (
					<Card>
						<FieldDescription className='text-green-500 text-center text-xl font-bold'>Your password has been changed successfully! </FieldDescription>
						<FieldDescription className='text-muted-foreground text-center'> Now you can return to the application and login with new password!</FieldDescription>
					</Card>
				)}
			</form>
		</div>
	);
}
