export const PrivateRoutes = {
	HOME: 'home',
	CRYPTO: 'cryto',
	STOCKS: 'stocks',
	BANK: 'bank',
	MAIN: 'main',
};

export const PrivatePaths: Record<keyof typeof PrivateRoutes, string> = {
	HOME: '/private/home',
	CRYPTO: '/private/crypto',
	STOCKS: '/private/stocks',
	BANK: '/private/bank',
	MAIN: '/private/main',
};
