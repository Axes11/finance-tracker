'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';

interface DatePickerProps {
	placeholder: string;
	value?: Date;
	onChange?: (date: Date | undefined) => void;
}

export function DatePicker({ placeholder, value, onChange }: DatePickerProps) {
	const [open, setOpen] = React.useState(false);

	const handleDateChange = (newDate: Date | undefined) => {
		onChange?.(newDate);
		setOpen(false);
	};

	return (
		<div className='flex flex-col gap-3 w-full'>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<button
						type='button'
						id='date'
						className='flex h-12 w-full items-center justify-between border border-border bg-transparent px-4 font-sans text-[0.88rem] outline-none transition-colors focus-visible:border-foreground focus-visible:ring-0 data-[placeholder]:text-muted-foreground/50'
						data-placeholder={!value ? '' : undefined}>
						<span className={value ? 'text-foreground' : 'text-muted-foreground/50'}>{value ? value.toLocaleDateString() : placeholder}</span>
						<ChevronDownIcon className='size-4 text-muted-foreground' />
					</button>
				</PopoverTrigger>
				<PopoverContent className='w-auto overflow-hidden p-0' align='start'>
					<Calendar mode='single' selected={value} captionLayout='dropdown' onSelect={handleDateChange} />
				</PopoverContent>
			</Popover>
		</div>
	);
}
