import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Finance Tracker',
		short_name: 'Finance Tracker',
		description: 'Finance dashboard app',
		start_url: '/',
		display: 'standalone',
		background_color: '#000000ff',
		theme_color: '#000000ff',
		icons: [
			{
				src: '/icons/192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/icons/512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}
