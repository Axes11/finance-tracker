export const PublicRoutes = {
	LOGIN: 'login',
	REGISTER: 'register',
	FORGOT_PASSWORD: 'forgot',
	DONT_REMEMBER_EMAIL: 'dont-remember-email',
};

export const PublicPaths: Record<keyof typeof PublicRoutes, string> = {
	LOGIN: '/login',
	REGISTER: '/register',
	FORGOT_PASSWORD: '/forgot',
	DONT_REMEMBER_EMAIL: '/dont-remember-email',
};
