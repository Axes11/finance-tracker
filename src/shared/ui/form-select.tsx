import * as React from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared';

interface SelectOption {
	label: string;
	value: string;
}

interface FormSelectProps {
	placeholder: string;
	title: string;
	options: SelectOption[];
	value?: string;
	onChange?: (value: string) => void;
}

export function FormSelect({ placeholder, title, options, value, onChange }: FormSelectProps) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>{title}</SelectLabel>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
