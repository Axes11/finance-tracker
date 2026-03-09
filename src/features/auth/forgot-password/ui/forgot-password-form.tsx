'use client';

import { FormWrapper, Input, FormField, AuthHeader, Button, MobileLogo } from '@/shared/ui';
import { PublicPaths } from '@/shared/config';

import { useForgotPassword } from '../hooks/useForgotPassword';

export function ForgotPasswordForm() {
	const { step, sendCode, changePassword, handleSubmit, register, errors, router, mutationSendCode, mutationChangePassword, resendAfter } = useForgotPassword();

	if (step === 'passwordChanged') {
		return (
			<div className='flex flex-col gap-8'>
				<MobileLogo />
				<AuthHeader title='Password changed' description='Your password has been changed successfully. You can now log in with your new password.' />
				<Button variant='primary' size='full' onClick={() => router.push(PublicPaths.LOGIN)}>
					Back to Login
				</Button>
			</div>
		);
	}

	return (
		<form>
			<FormWrapper
				header='Forgot password'
				description='We will send a code to your email address to reset your password.'
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
						text: "Don't remember your email?",
						function: () => router.push(PublicPaths.DONT_REMEMBER_EMAIL),
						type: 'button',
					},
					{
						text: 'Back to Login',
						function: () => router.push(PublicPaths.LOGIN),
						type: 'button',
					},
				]}>
				{step === 'sendCode' && (
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
				)}
				{step === 'newPassword' && (
					<FormField label='New Password' tag='newPassword' error={errors.newPassword}>
						<Input
							id='newPassword'
							type='password'
							placeholder='••••••••'
							{...register('newPassword', {
								required: 'New password is required',
								minLength: {
									value: 8,
									message: 'Password must be at least 8 characters long',
								},
							})}
						/>
					</FormField>
				)}
			</FormWrapper>
		</form>
	);
}
