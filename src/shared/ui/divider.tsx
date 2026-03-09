import { cn } from '@/shared/lib/utils';

interface DividerProps {
	label?: string;
	className?: string;
}

export function Divider({ label, className }: DividerProps) {
	if (!label) {
		return <div className={cn('h-px w-full bg-border', className)} />;
	}

	return (
		<div className={cn('flex items-center gap-4', className)}>
			<div className='flex-1 h-px bg-border' />
			<span className='font-mono text-[0.6rem] tracking-[0.1em] uppercase text-muted-foreground'>{label}</span>
			<div className='flex-1 h-px bg-border' />
		</div>
	);
}
