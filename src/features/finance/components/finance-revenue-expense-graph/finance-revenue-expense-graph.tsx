import React from 'react';
import { BarChart, CartesianGrid, Bar, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { ChartContainer, ChartTooltip } from 'components/ui/chart';

interface DataPoint {
  month: string;
  revenue: number;
  expenses: number;
}

const chartData: DataPoint[] = [
  { month: 'Jan', revenue: 25000, expenses: 9000 },
  { month: 'Feb', revenue: 82000, expenses: 23000 },
  { month: 'Mar', revenue: 41000, expenses: 15000 },
  { month: 'Apr', revenue: 74000, expenses: 20000 },
  { month: 'May', revenue: 90000, expenses: 26000 },
  { month: 'Jun', revenue: 76000, expenses: 21000 },
  { month: 'Jul', revenue: 28000, expenses: 10000 },
  { month: 'Aug', revenue: 12000, expenses: 5000 },
  { month: 'Sep', revenue: 82000, expenses: 24000 },
  { month: 'Oct', revenue: 41000, expenses: 15000 },
  { month: 'Nov', revenue: 74000, expenses: 20000 },
  { month: 'Dec', revenue: 90000, expenses: 26000 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--secondary-600))',
  },
  expenses: {
    label: 'Expenses',
    color: 'hsl(var(--burgundy-100))',
  },
};

const timePeriods = [
  { value: 'this-year', label: 'This year' },
  { value: 'last-year', label: 'Last year' },
  { value: 'last-6-months', label: 'Last 6 months' },
  { value: 'last-3-months', label: 'Last 3 months' },
];

export default function FinanceRevenueExpenseGraph() {
  const [hoveredKey, setHoveredKey] = React.useState<keyof typeof chartConfig | null>(null);

  return (
    <Card className="w-full md:w-[55%] border-none rounded-[8px] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-high-emphasis">
              Revenue & expense trend
            </CardTitle>
            <CardDescription className="text-medium-emphasis mt-1">
              Compare total revenue and expenses across your selected time period.
            </CardDescription>
          </div>
          <Select defaultValue="this-year">
            <SelectTrigger className="w-[105px] h-[28px] px-2 py-1">
              <SelectValue placeholder="This year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {timePeriods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="hsl(var(--neutral-100))"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="hsl(var(--medium-emphasis))"
            />
            <YAxis
              tickFormatter={(value) => `${value / 1000}k`}
              tickLine={false}
              axisLine={false}
              stroke="hsl(var(--medium-emphasis))"
              label={{
                value: 'Amount (CHF)',
                angle: -90,
                position: 'insideLeft',
                style: {
                  textAnchor: 'middle',
                  fill: 'hsl(var(--medium-emphasis))',
                  fontSize: 12,
                },
              }}
              domain={[0, 100000]}
              ticks={[0, 20000, 40000, 60000, 80000, 100000]}
            />

            <ChartTooltip
              cursor={false}
              content={({ payload, label }) => {
                if (!payload || !hoveredKey) return null;

                const entry = payload.find((p) => p.dataKey === hoveredKey);
                if (!entry) return null;

                const { color, label: seriesLabel } = chartConfig[hoveredKey];

                return (
                  <div className="rounded-md bg-neutral-700 p-3 shadow-lg">
                    <p className="text-sm text-white mb-2">
                      {seriesLabel} ({label}):
                    </p>
                    <div className="flex items-center">
                      <span
                        className="inline-block w-3 h-3 rounded-sm mr-2"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm text-white  font-semibold">
                        CHF {entry.value?.toLocaleString() ?? '0'}
                      </span>
                    </div>
                  </div>
                );
              }}
            />

            <Bar
              name={chartConfig.revenue.label}
              dataKey="revenue"
              fill={chartConfig.revenue.color}
              radius={[4, 4, 0, 0]}
              barSize={20}
              isAnimationActive={false}
              onMouseOver={() => setHoveredKey('revenue')}
              onMouseOut={() => setHoveredKey(null)}
            />
            <Bar
              name={chartConfig.expenses.label}
              dataKey="expenses"
              fill={chartConfig.expenses.color}
              radius={[4, 4, 0, 0]}
              barSize={20}
              isAnimationActive={false}
              onMouseOver={() => setHoveredKey('expenses')}
              onMouseOut={() => setHoveredKey(null)}
            />
          </BarChart>
        </ChartContainer>

        <div className="flex items-center justify-center gap-6 mt-4">
          {Object.entries(chartConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: config.color }} />
              <span className="text-sm text-medium-emphasis">{config.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
