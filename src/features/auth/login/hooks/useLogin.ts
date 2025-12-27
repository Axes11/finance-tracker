import { useUserStore, login } from '@/entities/user';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { LoginResponse } from '@/entities/user';
import { PrivatePaths } from '@/shared/config/private-routes.ts';

interface Inputs {
	email: string;
	password: string;
}

export function useLogin() {
	const router = useRouter();

	const { loginUser } = useUserStore();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		mutation.mutate({ email: data.email, password: data.password });
	};

	const mutation = useMutation<LoginResponse, Error, Inputs>({
		mutationFn: ({ email, password }) => login(email, password),
		onSuccess: (data) => {
			toast.success('Login successful!');

			loginUser(data.user);
			router.push(PrivatePaths.MAIN);

			localStorage.setItem('token', data?.session.access_token);
			localStorage.setItem('refresh-token', data?.session.refresh_token);
		},
		onError: () => {
			toast.error('Login Error! Something went wrong during login.');
		},
	});

	return { register, mutation, router, handleSubmit, watch, errors, onSubmit };
}
