'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { wasteCompositionData } from '@/lib/data';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


export default function WasteReportsChart() {
    const chartConfig = {
        value: {
          label: 'Percentage',
        },
        recyclable: {
          label: 'Recyclable',
          color: 'hsl(var(--chart-1))',
        },
        organic: {
          label: 'Organic',
          color: 'hsl(var(--chart-2))',
        },
        general: {
           label: 'General',
           color: 'hsl(var(--chart-3))',
        }
      };

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig} className="w-full h-full">
         <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={wasteCompositionData} 
            layout="vertical" 
            margin={{ left: 10, right: 30 }}
            accessibilityLayer
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              width={80}
            />
            <Tooltip 
                cursor={{ fill: 'hsl(var(--card))' }} 
                content={<ChartTooltipContent 
                    formatter={(value, name) => `${value}%`}
                />} 
             />
             <Legend content={<ChartLegendContent />} />
            <Bar dataKey="value" radius={5} >
                 {wasteCompositionData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
