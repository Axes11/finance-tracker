import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthError } from '@supabase/supabase-js';

import { useUserStore, login, useAccountStore, LoginResponse } from '@/entities';
import { PrivatePaths } from '@/shared/config/private-routes.ts';

interface Inputs {
	email: string;
	password: string;
}

const ERROR_MAP: Record<string, string> = {
	'Invalid login credentials': 'Wrong email or password',
	'Email not confirmed': 'Email not confirmed. Please check your inbox.',
};

export function useLogin() {
	const router = useRouter();

	const { loginUser } = useUserStore();
	const { loadAccounts } = useAccountStore();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		mutation.mutate({ email: data.email, password: data.password });
	};

	const mutation = useMutation<LoginResponse, AuthError, Inputs>({
		mutationFn: ({ email, password }) => login(email, password),
		onSuccess: (data) => {
			toast.success('Login successful!');
			loadAccounts();

			if (data.user) loginUser(data.user);

			router.push(PrivatePaths.MAIN);
		},
		onError: (error) => {
			toast.error(ERROR_MAP[error.message] ?? 'Login error! Please try again.');
		},
	});

	return { register, mutation, router, handleSubmit, watch, errors, onSubmit };
}
