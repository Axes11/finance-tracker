import { ReactNode } from 'react';

import { FieldError } from 'react-hook-form';
import { Field, FieldDescription, FieldLabel } from './field';

interface FormFieldProps {
	label: string;
	tag: string;
	description?: string;
	error?: FieldError;
	children: ReactNode;
}

export function FormField({ label, tag, description, error, children }: FormFieldProps) {
	return (
		<Field>
			<FieldLabel htmlFor={tag}>{label}</FieldLabel>
			{children}
			{description && <FieldDescription>{description}</FieldDescription>}
			{error && <p className='text-red-500 text-sm'>{error.message}</p>}
		</Field>
	);
}
