import * as React from 'react';

import { cn } from '@/shared/lib/utils.ts';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				'h-12 w-full min-w-0 border border-border bg-transparent px-4 font-sans text-[0.88rem] outline-none transition-colors',
				'placeholder:text-muted-foreground/50',
				'focus-visible:border-foreground focus-visible:ring-0',
				'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
				'aria-invalid:border-destructive',
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
