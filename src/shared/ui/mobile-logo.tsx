import { ClaroLogo } from './claro-logo';

export function MobileLogo() {
	return (
		<div className='flex items-center gap-2.5 lg:hidden mb-2'>
			<ClaroLogo size={22} style={{ '--claro-eye': 'var(--background)' } as React.CSSProperties} />
			<span className='font-display text-lg font-extrabold tracking-tight'>CLARO</span>
		</div>
	);
}
