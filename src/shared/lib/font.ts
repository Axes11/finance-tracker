import { IBM_Plex_Mono, IBM_Plex_Sans, Syne } from 'next/font/google';

export const fontDisplay = Syne({
	subsets: ['latin'],
	variable: '--font-display',
	weight: ['400', '500', '600', '700', '800'],
});

export const fontSans = IBM_Plex_Sans({
	subsets: ['latin'],
	variable: '--font-sans',
	weight: ['300', '400', '500'],
});

export const fontMono = IBM_Plex_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
	weight: ['300', '400', '500'],
});
