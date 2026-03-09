/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', 'IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
				display: ['var(--font-display)', 'Syne', 'ui-sans-serif', 'system-ui'],
				mono: ['var(--font-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
			},
			letterSpacing: {
				tightest: '-0.04em',
				tighter: '-0.03em',
			},
			maxWidth: {
				content: '1200px',
			},
		},
	},
	plugins: [],
};
