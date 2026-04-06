'use client';

import { useState } from 'react';

import type { ChartRangeKey, HistoricalSeriesByRange } from '@/entities/charts/model';
import { Button, Switch } from '@/shared/ui';
import { ChartLine } from '@/shared/ui';
import { ColorsFormPieChart } from '@/shared/constants';

import { RANGE_LABELS, useDynamicChartRanges } from '../hooks/useDynamicChart';

interface DynamicChartProps {
	seriesByRange: HistoricalSeriesByRange;
}

export function DynamicChart({ seriesByRange }: DynamicChartProps) {
	const [selectedRange, setSelectedRange] = useState<ChartRangeKey>('30d');
	const [visibleLines, setVisibleLines] = useState({
		crypto: true,
		stocks: true,
		bank: true,
		total: true,
	});
	const { data, ranges } = useDynamicChartRanges(seriesByRange, selectedRange);

	return (
		<div className='w-full h-full flex flex-col'>
			<div className='flex-1 min-h-0'>
				<ChartLine data={data} visibleLines={visibleLines} />
			</div>
			<div className='px-4 py-2 flex flex-wrap items-center justify-between gap-4 shrink-0 border-t border-border/60'>
				<div className='flex flex-wrap items-center gap-4'>
					<label className='flex items-center gap-2 text-xs font-mono uppercase'>
						<Switch checked={visibleLines.crypto} onCheckedChange={(checked) => setVisibleLines((prev) => ({ ...prev, crypto: checked }))} />
						<span className='inline-block size-2 rounded-full' style={{ backgroundColor: ColorsFormPieChart[1] }} />
						Crypto
					</label>
					<label className='flex items-center gap-2 text-xs font-mono uppercase'>
						<Switch checked={visibleLines.stocks} onCheckedChange={(checked) => setVisibleLines((prev) => ({ ...prev, stocks: checked }))} />
						<span className='inline-block size-2 rounded-full' style={{ backgroundColor: ColorsFormPieChart[0] }} />
						Stocks
					</label>
					<label className='flex items-center gap-2 text-xs font-mono uppercase'>
						<Switch checked={visibleLines.bank} onCheckedChange={(checked) => setVisibleLines((prev) => ({ ...prev, bank: checked }))} />
						<span className='inline-block size-2 rounded-full' style={{ backgroundColor: ColorsFormPieChart[2] }} />
						Bank
					</label>
					<label className='flex items-center gap-2 text-xs font-mono uppercase'>
						<Switch checked={visibleLines.total} onCheckedChange={(checked) => setVisibleLines((prev) => ({ ...prev, total: checked }))} />
						<span className='inline-block size-2 rounded-full bg-foreground' />
						Total
					</label>
				</div>
				<div className='flex items-center gap-2'>
					{ranges.map((range) => (
						<Button key={range} variant={selectedRange === range ? 'default' : 'ghost'} size='sm' onClick={() => setSelectedRange(range)} className='h-7 px-2 text-xs'>
							{RANGE_LABELS[range]}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}
