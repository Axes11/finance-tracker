import { ReactNode } from 'react';

import { Button } from './button';
import { Divider } from './divider';
import { AuthHeader } from './auth-header';
import { MobileLogo } from './mobile-logo';

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

interface FormWrapperProps {
	header: string;
	description: string;
	bodyActions: BodyActions[];
	bottomActions?: BottomActions[];
	children: ReactNode;
}

export function FormWrapper({ header, description, bodyActions, bottomActions, children }: FormWrapperProps) {
	return (
		<div className='flex flex-col gap-8'>
			<MobileLogo />

			<AuthHeader title={header} description={description} />

			<div className='flex flex-col gap-5'>
				{children}

				{bodyActions.map((btn, key) =>
					btn.function ? (
						btn.hide && (
							<Button key={key} onClick={btn.function} type={btn.type} variant='primary' size='full' disabled={btn.disabled}>
								{btn.text}
							</Button>
						)
					) : (
						<Button key={key} type={btn.type} variant='primary' size='full' disabled={btn.disabled}>
							{btn.text}
						</Button>
					),
				)}
			</div>

			{bottomActions && bottomActions.length > 0 && (
				<>
					<Divider />
					<div className='flex flex-col items-center gap-3'>
						{bottomActions.map((btn, key) => (
							<Button key={key} type={btn.type ?? 'button'} onClick={btn.function} variant='ghost-link' disabled={btn.disabled}>
								{btn.text}
							</Button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
