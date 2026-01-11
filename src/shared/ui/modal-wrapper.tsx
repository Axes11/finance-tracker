import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, ScrollArea, Button } from '@/shared/ui';
import { Colors } from '@/shared/constants';
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
	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
			<DialogContent className='sm:max-w-[600px] max-h-[90vh] flex flex-col p-0'>
				<form
					className='flex flex-col h-full'
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit?.();
					}}>
					<DialogHeader className='p-6 pb-2'>
						<DialogTitle>{header}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>

					{scrollable ? <ScrollArea className='flex-1 p-6 pt-2 max-h-[60vh]'>{children}</ScrollArea> : <div className='flex-1 p-6 pt-2'>{children}</div>}

					<DialogFooter className='p-6 pt-2'>
						<DialogClose asChild>
							<Button variant='outline' type='button'>
								Cancel
							</Button>
						</DialogClose>
						{bottomActions?.map((btn, key) => (
							<Button key={key} type={btn.type} onClick={btn.function} disabled={btn.disabled}>
								{btn.text}
							</Button>
						))}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
