'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
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
					<Button variant='outline' id='date' className='w-full justify-between font-normal'>
						{value ? value.toLocaleDateString() : placeholder}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto overflow-hidden p-0' align='start'>
					<Calendar mode='single' selected={value} captionLayout='dropdown' onSelect={handleDateChange} />
				</PopoverContent>
			</Popover>
		</div>
	);
}
