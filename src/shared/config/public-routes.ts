export const PublicRoutes = {
	LOGIN: 'login',
	REGISTER: 'register',
	FORGOT_PASSWORD: 'forgot',
};

export const PublicPaths: Record<keyof typeof PublicRoutes, string> = {
	LOGIN: '/public/login',
	REGISTER: '/public/register',
	FORGOT_PASSWORD: '/public/forgot',
};
