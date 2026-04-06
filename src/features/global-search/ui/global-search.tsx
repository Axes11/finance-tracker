'use client';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { Button, Input, Popover, PopoverAnchor, PopoverContent, ScrollArea, Separator } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

import { useGlobalSearch } from '../hooks/useGlobalSearch';

export function GlobalSearch() {
	const { query, isOpen, pathname, groupedItems, setIsOpen, handleChange, handleSelect } = useGlobalSearch();

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverAnchor asChild>
				<div className='relative w-full'>
					<MagnifyingGlass size={16} className='pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground' />
					<Input
						type='text'
						value={query}
						onChange={handleChange}
						onFocus={() => setIsOpen(true)}
						placeholder='Search pages, accounts, transactions...'
						className='h-full border-0 pl-11 pr-4 focus-visible:border-0 focus-visible:ring-0'
					/>
				</div>
			</PopoverAnchor>
			<PopoverContent
				align='start'
				side='bottom'
				sideOffset={11}
				className='w-[min(42rem,calc(100vw-2rem))] translate-x-[-1px] top-2.5 border-border bg-background p-0 shadow-none max-h-[min(70vh,44rem)] overflow-hidden'>
				<ScrollArea className='h-[min(70vh,44rem)]'>
					<div className='flex flex-col'>
						{groupedItems.length ? (
							groupedItems.map((group, groupIndex) => (
								<div key={group.category}>
									<div className='px-4 py-3 font-mono text-[0.64rem] font-medium tracking-[0.1em] text-muted-foreground uppercase'>{group.category}</div>
									<div className='flex flex-col'>
										{group.items.map((item) => {
											const isActive = pathname === item.path;

											return (
												<Button
													key={item.id}
													type='button'
													variant='ghost'
													onClick={() => handleSelect(item)}
													className={cn('h-auto w-full justify-start rounded-none px-4 py-3 text-left hover:bg-muted/40', isActive && 'bg-muted/50')}>
													<div className='flex min-w-0 flex-1 items-start gap-3'>
														<div className='mt-0.5 text-foreground'>{item.icon}</div>
														<div className='min-w-0 flex-1'>
															<div className='truncate font-display text-sm font-bold tracking-tight'>{item.label}</div>
															<div className='truncate font-sans text-xs text-muted-foreground'>{item.description}</div>
														</div>
														<div className='shrink-0 font-mono text-[0.62rem] tracking-[0.08em] text-muted-foreground uppercase'>{item.meta ?? item.path.replace('/', '')}</div>
													</div>
												</Button>
											);
										})}
									</div>
									{groupIndex < groupedItems.length - 1 && <Separator />}
								</div>
							))
						) : (
							<div className='px-4 py-6 text-sm text-muted-foreground'>Nothing found for “{query}”.</div>
						)}
					</div>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
}
