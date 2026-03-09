import { ComponentProps } from 'react';

interface ClaroLogoProps extends Omit<ComponentProps<'svg'>, 'children'> {
	size?: number;
}

export function ClaroLogo({ size = 26, ...props }: ClaroLogoProps) {
	const height = Math.round((size / 26) * 28);

	return (
		<svg width={size} height={height} viewBox='0 0 52 58' fill='none' {...props}>
			{/* antenna ball */}
			<circle cx='26' cy='3' r='3' fill='currentColor' />
			{/* antenna stem */}
			<line x1='26' y1='6' x2='26' y2='13' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' />
			{/* body */}
			<path d='M26 10C15.507 10 7 18.507 7 29v16c0 0 3-2.5 5 0s4 2.5 6 0 4 2.5 6 0 4 2.5 6 0 4 2.5 6 0 2-2.5 5 0V29C41 18.507 32.493 10 26 10Z' fill='currentColor' />
			{/* eyes white */}
			<ellipse cx='19.5' cy='27' rx='4.5' ry='5' fill='var(--claro-eye, #111110)' />
			<ellipse cx='32.5' cy='27' rx='4.5' ry='5' fill='var(--claro-eye, #111110)' />
			{/* pupils */}
			<circle cx='20.5' cy='27.5' r='2.2' fill='currentColor' />
			<circle cx='33.5' cy='27.5' r='2.2' fill='currentColor' />
			{/* smile */}
			<path d='M20 35.5 Q26 40.5 32 35.5' stroke='var(--claro-eye, #111110)' strokeWidth='1.8' strokeLinecap='round' fill='none' />
		</svg>
	);
}
