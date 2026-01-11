import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AuthError } from '@supabase/supabase-js';

import { register as registerUser } from '@/entities/user/api.ts';

import { PublicPaths } from '@/shared/config';
import { LoginResponse } from '@/entities/user';

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
		mutationFn: ({ email, password }) => registerUser(email.trim(), password.trim()),
		onSuccess: (): void => {
			toast.success('Registration successful!');
			router.push(PublicPaths.LOGIN);
		},
		onError: (error: AuthError) => {
			toast.error(error.message ?? 'Registration error! Please try again.');
		},
		retry: false,
	});

	return { register, handleSubmit, watch, errors, onSubmit, router, mutation };
}
