import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/shared/ui/field.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { Card } from '@/shared/ui/card.tsx';
import { ReactNode } from 'react';

interface BodyActions {
	function?: () => void;
	text: string;
	type: 'submit' | 'button';
	disabled?: boolean;
	hide?: boolean;
}

interface BottomActions {
	function: () => void;
	text: string;
	type?: 'submit' | 'button';
	disabled?: boolean;
}

interface ForgotPasswordProps {
	header: string;
	description: string;
	bodyActions: BodyActions[];
	bottomActions?: BottomActions[];
	children: ReactNode;
}

export function FormWrapper({ header, description, bodyActions, bottomActions, children }: ForgotPasswordProps) {
	return (
		<Card className={'p-6'}>
			<FieldSet>
				<FieldLegend className='font-bold'>{header}</FieldLegend>
				<FieldDescription>{description}</FieldDescription>
				<FieldGroup>{children}</FieldGroup>
				{bodyActions.map((btn, key) =>
					btn.function ? (
						btn.hide && (
							<Button key={key} onClick={btn.function} type={btn.type} className='cursor-pointer' disabled={btn.disabled}>
								{btn.text}
							</Button>
						)
					) : (
						<Button key={key} type={btn.type} className='cursor-pointer' disabled={btn.disabled}>
							{btn.text}
						</Button>
					),
				)}
				<div className='flex items-center justify-center flex-col'>
					{bottomActions?.map((btn, key) => (
						<Button key={key} type='button' onClick={btn.function} className='cursor-pointer' variant='link' disabled={btn.disabled}>
							{btn.text}
						</Button>
					))}
				</div>
			</FieldSet>
		</Card>
	);
}
