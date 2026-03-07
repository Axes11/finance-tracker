'use client';

import { Pie, PieChart, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';

interface ChartPieData {
	name: string;
	quantity: number;
	fill: string;
}

interface ChartConfigItem {
	label: string;
}

interface ChartPieProps {
	data: ChartPieData[];
	chartConfig: Record<string, ChartConfigItem>;
	hideValues?: boolean;
}

const mockData = [
	{
		name: 'All',
		quantity: 100,
		fill: 'rgb(256, 256, 256)',
	},
];

const mockConfig = {
	label: 'All',
};

export function ChartPie({ data, chartConfig, hideValues }: ChartPieProps) {
	return (
		<ChartContainer config={chartConfig || mockConfig} className='[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square w-full h-full pb-0'>
			<PieChart>
				<ChartTooltip
					content={
						<ChartTooltipContent
							hideLabel
							formatter={
								hideValues
									? (_, name) => (
											<div className='flex flex-1 justify-between items-center leading-none'>
												<span className='text-muted-foreground'>{name}</span>
												<span className='text-foreground font-mono font-medium tabular-nums'>***</span>
											</div>
										)
									: undefined
							}
						/>
					}
					cursor={false}
				/>
				<Pie stroke='#333' data={data.length > 0 ? data : mockData} dataKey='quantity' nameKey='name' labelLine={false}></Pie>
				<Legend
					layout='horizontal'
					verticalAlign='bottom'
					align='center'
					payload={data.map((entry) => ({
						value: entry.name,
						type: 'circle',
						color: entry.fill,
					}))}
				/>
			</PieChart>
		</ChartContainer>
	);
}
