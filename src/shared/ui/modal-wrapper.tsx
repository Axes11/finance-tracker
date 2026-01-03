import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Colors, ScrollArea } from '@/shared';
import { ReactNode } from 'react';

interface ModalWrapperProps {
	header: string;
	description: string;
	children: ReactNode;
	bottomActions?: BottomActions[];
	isOpen: boolean;
	onClose?: () => void;
	scrollable?: boolean;
	onSubmit?: () => void;
}

interface BottomActions {
	function?: () => void;
	text: string;
	type?: 'submit' | 'button';
	color?: keyof typeof Colors;
	disabled?: boolean;
}

export function ModalWrapper({ header, description, children, isOpen, onClose, scrollable, onSubmit, bottomActions }: ModalWrapperProps) {
	const content = (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
			<DialogContent className='sm:max-w-[500px]'>
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

	return scrollable ? <ScrollArea className='h-72 w-48 rounded-md border'>{content}</ScrollArea> : content;
}
