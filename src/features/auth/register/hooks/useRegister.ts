import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { PublicPaths } from '@/shared/config/public-routes.ts';
import { LoginResponse, register as registerUser } from '@/entities/user';
import { AuthError } from '@supabase/supabase-js';

interface Inputs {
	email: string;
	password: string;
}

export function useRegister() {
	const router = useRouter();

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
		mutationFn: ({ email, password }) => registerUser(email, password),
		onSuccess: (data): void => {
			if (data.user) {
				toast.error('This email is already registered. Please log in.');
				return;
			} else {
				toast.success('Registration successful! Please check your email to confirm your account.');
			}
			router.push(PublicPaths.LOGIN);
		},
		onError: (error: AuthError) => {
			toast.error(error.message ?? 'Registration error! Please try again.');
		},
	});

	return { register, handleSubmit, watch, errors, onSubmit, router, mutation };
}
