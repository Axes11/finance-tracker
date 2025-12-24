import axios from 'src/shared/api/axios.ts';

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	},
);
