/** Layout */
export const Layout = {
	navHeight: 60,
	contentMaxWidth: 1200,
	gridSize: 60,
} as const;

/** Spacing (px) */
export const Spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	'2xl': 40,
	'3xl': 50,
	'4xl': 60,
	'5xl': 80,
} as const;

/** Typography presets */
export const Typography = {
	heroHeading: {
		fontFamily: 'var(--font-display)',
		fontWeight: 800,
		letterSpacing: '-0.04em',
		lineHeight: 0.95,
	},
	sectionHeading: {
		fontFamily: 'var(--font-display)',
		fontWeight: 800,
		letterSpacing: '-0.03em',
		lineHeight: 1.1,
	},
	body: {
		fontFamily: 'var(--font-sans)',
		fontWeight: 400,
		lineHeight: 1.82,
	},
	monoLabel: {
		fontFamily: 'var(--font-mono)',
		fontSize: '0.62rem',
		fontWeight: 400,
		letterSpacing: '0.1em',
		textTransform: 'uppercase' as const,
	},
	navLink: {
		fontSize: '0.72rem',
		fontWeight: 500,
		letterSpacing: '0.06em',
		textTransform: 'uppercase' as const,
	},
	button: {
		fontFamily: 'var(--font-display)',
		fontWeight: 700,
		fontSize: '0.78rem',
		letterSpacing: '0.06em',
		textTransform: 'uppercase' as const,
	},
} as const;

/** Breakpoints (px) */
export const Breakpoints = {
	smallMobile: 400,
	mobile: 680,
	tablet: 1024,
} as const;
