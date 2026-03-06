import { ReactNode } from 'react';

import { FieldError } from 'react-hook-form';

interface FormFieldProps {
	label: string;
	tag: string;
	description?: string;
	error?: FieldError;
	children: ReactNode;
}

export function FormField({ label, tag, description, error, children }: FormFieldProps) {
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={tag} className='font-mono text-[0.62rem] font-medium tracking-[0.1em] uppercase text-muted-foreground'>
				{label}
			</label>
			{children}
			{description && !error && <p className='font-mono text-[0.58rem] tracking-[0.04em] text-muted-foreground/70'>{description}</p>}
			{error && <span className='font-mono text-[0.62rem] text-destructive'>{error.message}</span>}
		</div>
	);
}
