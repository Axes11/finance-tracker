'use client';

import { Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid } from 'recharts';

import { ColorsFormPieChart } from '@/shared/constants';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';

type ChartLineData = {
	hour: string;
	crypto: number;
	stocks: number;
	bank: number;
	total: number;
};

interface ChartLineProps {
	data: ChartLineData[];
	visibleLines: {
		crypto: boolean;
		stocks: boolean;
		bank: boolean;
		total: boolean;
	};
}

const chartConfig = {
	crypto: { label: 'Crypto', color: ColorsFormPieChart[1] },
	stocks: { label: 'Stocks', color: ColorsFormPieChart[0] },
	bank: { label: 'Bank', color: ColorsFormPieChart[2] },
	total: { label: 'Total', color: 'hsl(var(--foreground))' },
};

const TOOLTIP_COLORS: Record<string, string> = {
	Crypto: ColorsFormPieChart[1],
	Stocks: ColorsFormPieChart[0],
	Bank: ColorsFormPieChart[2],
	Total: 'hsl(var(--foreground))',
};

const formatHourLabel = (value: string) => {
	const monthOnlyMatch = String(value).match(/^(\d{4})-(\d{2})$/);
	if (monthOnlyMatch) {
		const [, year, month] = monthOnlyMatch;
		return `${month}.${year}`;
	}

	const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})-(\d{2})$/);
	if (!match) return String(value);
	const [, year, month, day, hour] = match;
	return `${day}.${month}.${year} ${hour}:00`;
};

export function ChartLine({ data, visibleLines }: ChartLineProps) {
	return (
		<ChartContainer config={chartConfig} className='w-full h-full p-4'>
			<RechartsLineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
				<CartesianGrid vertical={false} />
				<XAxis dataKey='hour' tickLine={false} axisLine={false} tickMargin={8} minTickGap={28} tickFormatter={(value) => formatHourLabel(String(value))} />
				<YAxis tickLine={false} axisLine={false} tickMargin={8} width={64} />
				<ChartTooltip
					cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeDasharray: '3 3' }}
					shared={false}
					content={
						<ChartTooltipContent
							labelFormatter={(label) => <span className='text-muted-foreground font-mono'>{formatHourLabel(String(label))}</span>}
							formatter={(value, name) => (
								<span className='font-mono font-medium tabular-nums' style={{ color: TOOLTIP_COLORS[String(name)] ?? 'var(--foreground)' }}>
									{String(name)}: {Number(value).toLocaleString()} USD
								</span>
							)}
						/>
					}
				/>

				{visibleLines.crypto && (
					<Line type='basis' dataKey='crypto' name='Crypto' stroke={ColorsFormPieChart[1]} strokeWidth={2.2} dot={false} connectNulls activeDot={{ r: 4, fill: ColorsFormPieChart[1] }} />
				)}
				{visibleLines.stocks && (
					<Line type='basis' dataKey='stocks' name='Stocks' stroke={ColorsFormPieChart[0]} strokeWidth={2.2} dot={false} connectNulls activeDot={{ r: 4, fill: ColorsFormPieChart[0] }} />
				)}
				{visibleLines.bank && (
					<Line type='basis' dataKey='bank' name='Bank' stroke={ColorsFormPieChart[2]} strokeWidth={2.2} dot={false} connectNulls activeDot={{ r: 4, fill: ColorsFormPieChart[2] }} />
				)}
				{visibleLines.total && (
					<Line type='basis' dataKey='total' name='Total' stroke='var(--foreground)' strokeWidth={2.8} dot={false} connectNulls activeDot={{ r: 4, fill: 'hsl(var(--foreground))' }} />
				)}
			</RechartsLineChart>
		</ChartContainer>
	);
}
