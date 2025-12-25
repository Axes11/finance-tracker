export const AppRoutes = {
	LOGIN: 'login',
	REGISTER: 'register',
	HOME: 'home',
	CRYPTO: 'cryto',
	STOCKS: 'stocks',
	BANK: 'bank',
	MAIN: 'main',
};

export const RoutePaths: Record<keyof typeof AppRoutes, string> = {
	LOGIN: '/public/login',
	REGISTER: '/public/register',
	HOME: '/private/home',
	CRYPTO: '/private/crypto',
	STOCKS: '/private/stocks',
	BANK: '/private/bank',
	MAIN: '/private/main',
};
