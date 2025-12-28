export const PrivateRoutes = {
	HOME: 'home',
	CRYPTO: 'crypto',
	STOCKS: 'stocks',
	BANK: 'bank',
	MAIN: 'main',
};

export const PrivatePaths: Record<keyof typeof PrivateRoutes, string> = {
	HOME: '/home',
	CRYPTO: '/crypto',
	STOCKS: '/stocks',
	BANK: '/bank',
	MAIN: '/main',
};
