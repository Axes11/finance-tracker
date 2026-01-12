/** @type {import('tailwindcss').Config} */
export default {
	content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './widgets/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
			},
		},
	},
	plugins: [],
};
