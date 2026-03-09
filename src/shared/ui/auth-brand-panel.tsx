import { ClaroLogo } from './claro-logo';

export function AuthBrandPanel() {
	return (
		<div className='hidden lg:flex items-center justify-center border-r border-border relative overflow-hidden bg-foreground'>
			<div className='relative z-10 flex flex-col items-center gap-5 px-12'>
				<ClaroLogo size={80} className='text-background' style={{ '--claro-eye': '#111110' } as React.CSSProperties} />
				<span className='font-display text-3xl font-extrabold tracking-tight text-background'>CLARO</span>
				<p className='font-mono text-[0.62rem] tracking-[0.16em] uppercase text-background/40'>Financial Intelligence</p>
				<p className='font-mono text-[0.66rem] text-background/60 text-center leading-[1.7] mt-2 max-w-55'>&ldquo;I watch everything so you don&apos;t have to.&rdquo;</p>
			</div>
		</div>
	);
}
