import { X, ArrowsOutSimple, Minus } from '@phosphor-icons/react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Color } from '@/shared/constants';

export function TitleBar() {
	return (
		<>
			<header className='titlebar fixed w-full h-10 flex items-center flex-row-reverse justify-end border-b pl-2.5' data-tauri-drag-region>
				<div className='window-controls flex flex-row items-center'>
					<button
						style={{ backgroundColor: Color.RED }}
						id='close'
						className='w-4 h-4 rounded-full bg-transparent m-1 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:opacity-100'
						onClick={() => getCurrentWindow().close()}>
						<X className='w-3 h-3 opacity-0 hover:opacity-100' color={Color.GREY} weight='bold' />
					</button>
					<button
						style={{ backgroundColor: Color.YELLOW }}
						id='maximize'
						className='w-4 h-4 rounded-full bg-transparent m-1 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:opacity-100'
						onClick={() => getCurrentWindow().toggleMaximize()}>
						<ArrowsOutSimple className='w-3 h-3 opacity-0 hover:opacity-100' color={Color.GREY} weight='bold' />
					</button>
					<button
						style={{ backgroundColor: Color.GREEN }}
						id='minimize'
						className='w-4 h-4 rounded-full bg-transparent m-1 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:opacity-100'
						onClick={() => getCurrentWindow().minimize()}>
						<Minus className='w-3 h-3 opacity-0 hover:opacity-100' color={Color.GREY} weight='bold' />
					</button>
				</div>
			</header>
		</>
	);
}
