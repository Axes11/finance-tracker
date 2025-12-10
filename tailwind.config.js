/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './widgets/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
			},
		},
	},
	plugins: [tailwind()],
};
