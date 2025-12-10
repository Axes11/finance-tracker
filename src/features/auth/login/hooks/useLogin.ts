import { login } from '@/entities/user/api';
import { LoginResponse } from '@/entities/user/model';
import useUserStore from '@/entities/user/store';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface ILogin {
	email: string;
	password: string;
}

export default function useLogin() {
	const { loginUser } = useUserStore();

	const mutation = useMutation<LoginResponse, Error, ILogin>({
		mutationFn: ({ email, password }) => login(email, password),
		onSuccess: (data) => {
			loginUser(data.user);

			localStorage.setItem('token', data?.session.access_token);
			localStorage.setItem('refresh-token', data?.session.refresh_token);
		},
		onError: () => {
			toast('Login Error!', {
				description: 'Something went wrong!',
			});
		},
	});

	return { mutation };
}
