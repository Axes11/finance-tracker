import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui';
import { ReactNode } from 'react';
import { Colors } from '@/shared/constants';

interface ModalWrapperProps {
	header: string;
	description: string;
	children: ReactNode;
	bottomActions?: BottomActions[];
	isOpen: boolean;
	onClose?: () => void;
	onSubmit?: () => void;
}

interface BottomActions {
	function?: () => void;
	text: string;
	type?: 'submit' | 'button';
	color?: keyof typeof Colors;
	disabled?: boolean;
}

export function ModalWrapper({ header, description, children, isOpen, onClose, onSubmit, bottomActions }: ModalWrapperProps) {
	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
			<DialogContent className='sm:max-w-[425px]'>
				<form className='flex flex-col gap-3' action={onSubmit}>
					<DialogHeader>
						<DialogTitle>{header}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					{children}
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>
						{bottomActions?.map((btn, key) => (
							<Button color={btn.color ? Colors[btn.color] : undefined} className='cursor-pointer' key={key} type={btn.type} onClick={btn.function} disabled={btn.disabled}>
								{btn.text}
							</Button>
						))}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
