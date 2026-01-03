import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AuthError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { sendChangePasswordEmail, updatePassword } from '@/entities';

interface Inputs {
	email: string;
	newPassword?: string;
}

const RESEND_INTERVAL = 1000;

export function useForgotPassword() {
	const router = useRouter();
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);
	const [resendAfter, setResendAfter] = useState(60);

	const [step, setStep] = useState<'sendCode' | 'newPassword' | 'passwordChanged'>('sendCode');

	useEffect(() => {
		const hash = window.location.hash;
		if (hash.includes('type=recovery')) {
			const params = new URLSearchParams(hash.replace('#', '?'));
			setTimeout(() => {
				setStep('newPassword');
				setAccessToken(params.get('access_token'));
				setRefreshToken(params.get('refresh_token'));
			}, 0);
		}
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const mutationSendCode = useMutation({
		mutationFn: async (email: string) => sendChangePasswordEmail(email),
		onSuccess: () => {
			toast.success('Password reset email sent! Please check your inbox.');
			resetTimer();
		},
		onError: (error: AuthError) => {
			toast.error(error.message ?? 'Error sending password reset email. Please try again.');
		},
	});

	const mutationChangePassword = useMutation({
		mutationFn: async (newPassword: string) => {
			if (!accessToken || !refreshToken) {
				toast.error('Invalid url or expired!');
			} else {
				await updatePassword(newPassword, accessToken, refreshToken);
			}
		},
		onSuccess: () => {
			toast.success('Password updated successfully!');
			setStep('passwordChanged');
		},
		onError: (error: AuthError) => {
			toast.error(error.message ?? 'Error updating password. Please try again.');
		},
	});

	useEffect(() => {
		if (resendAfter === 0) return;

		const timer = setInterval(() => {
			setResendAfter((prev) => prev - 1);
		}, RESEND_INTERVAL);

		return () => clearInterval(timer);
	}, [resendAfter]);

	const resetTimer = () => setResendAfter(60);

	const sendCode: SubmitHandler<Inputs> = (data) => {
		mutationSendCode.mutate(data.email!);
	};

	const changePassword: SubmitHandler<Inputs> = (data) => {
		mutationChangePassword.mutate(data.newPassword!);
	};

	return { sendCode, changePassword, step, handleSubmit, register, errors, router, mutationSendCode, mutationChangePassword, resendAfter };
}
