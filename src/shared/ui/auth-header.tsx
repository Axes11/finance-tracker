interface AuthHeaderProps {
	title: string;
	description?: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
	return (
		<div className='flex flex-col gap-3'>
			<h1 className='font-display text-[2.2rem] font-extrabold tracking-[-0.04em] leading-[0.95]'>{title}</h1>
			{description && <p className='text-[0.86rem] leading-[1.82] text-muted-foreground'>{description}</p>}
		</div>
	);
}
