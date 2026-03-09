'use client';

import { useMemo } from 'react';

import { useTransactionsStore } from '@/entities/transaction';

import { Card, ChartPie } from '@/shared/ui';
import { ColorsFormPieChart } from '@/shared/constants';
import { useUserStore } from '@/entities/user';

interface ChartConfigItem {
	label: string;
}

interface ChartPieData {
	name: string;
	quantity: number;
	fill: string;
}

export function PieChart({ type }: { type: 'total' | 'crypto' | 'stocks' | 'bank' }) {
	const totalAmount = useTransactionsStore((state) => state.totalAmount);
	const { isBalancesHidden } = useUserStore();

	const { data, config } = useMemo(() => {
		const dataToDisplay: ChartPieData[] = [];
		const config: Record<string, ChartConfigItem> = {};

		totalAmount[type].values.forEach((item, index) => {
			if (item.value !== 0) {
				const color = ColorsFormPieChart[index % ColorsFormPieChart.length];
				dataToDisplay.push({
					name: item.name,
					quantity: Math.ceil(item.value),
					fill: color,
				});
				config[item.name.toLowerCase()] = { label: item.name };
			}
		});
		return { data: dataToDisplay, config };
	}, [totalAmount, type]);

	return (
		<Card className='py-0 px-6 h-full'>
			<ChartPie data={data} chartConfig={config} hideValues={!isBalancesHidden} />
		</Card>
	);
}
