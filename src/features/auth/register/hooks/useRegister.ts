import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { PublicPaths } from '@/shared/config/public-routes.ts';
import { register as registerUser } from '@/entities/user';

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

	const mutation = useMutation<void, Error, Inputs>({
		mutationFn: ({ email, password }) => registerUser(email, password),
		onSuccess: () => {
			toast.success('Registration successful! Please check your email to confirm your account.');
			router.push(PublicPaths.LOGIN);
		},
		onError: () => {
			toast.error('Registration Error! Something went wrong during registration.');
		},
	});

	return { register, handleSubmit, watch, errors, onSubmit, router };
}
