/**
 * Mixed Chart Examples
 *
 * This file contains working examples of mixed/composed charts that combine multiple chart types.
 * Copy the example closest to your use case and adapt the data structure.
 */

import {
  Line,
  Bar,
  Area,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components';

// =============================================================================
// Example 1: Bar and Line Combination
// Use for: Comparing actual values (bars) with trends or targets (lines)
// =============================================================================

const barLineData = [
  { month: 'Jan', sales: 4000, target: 3800 },
  { month: 'Feb', sales: 3000, target: 3200 },
  { month: 'Mar', sales: 2000, target: 2800 },
  { month: 'Apr', sales: 2780, target: 2500 },
  { month: 'May', sales: 1890, target: 2200 },
  { month: 'Jun', sales: 2390, target: 2400 },
];

const barLineConfig = {
  sales: {
    label: 'Sales',
    color: 'var(--chart-1)',
  },
  target: {
    label: 'Target',
    color: 'var(--chart-2)',
  },
};

export function BarLineChartExample() {
  return (
    <ChartContainer config={barLineConfig} className="min-h-[300px] w-full">
      <ComposedChart accessibilityLayer data={barLineData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
        <Line
          dataKey="target"
          type="monotone"
          stroke="var(--color-target)"
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 2: Area and Line Combination
// Use for: Showing ranges/confidence intervals (area) with actual values (line)
// =============================================================================

const areaLineData = [
  { week: 'W1', actual: 120, min: 100, max: 140 },
  { week: 'W2', actual: 135, min: 115, max: 155 },
  { week: 'W3', actual: 128, min: 108, max: 148 },
  { week: 'W4', actual: 142, min: 122, max: 162 },
  { week: 'W5', actual: 155, min: 135, max: 175 },
  { week: 'W6', actual: 148, min: 128, max: 168 },
];

const areaLineConfig = {
  actual: {
    label: 'Actual',
    color: 'var(--chart-1)',
  },
  min: {
    label: 'Min Range',
    color: 'var(--chart-2)',
  },
  max: {
    label: 'Max Range',
    color: 'var(--chart-2)',
  },
};

export function AreaLineChartExample() {
  return (
    <ChartContainer config={areaLineConfig} className="min-h-[300px] w-full">
      <ComposedChart accessibilityLayer data={areaLineData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="week"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="max"
          fill="var(--color-max)"
          fillOpacity={0.2}
          stroke="none"
          stackId="range"
        />
        <Area
          dataKey="min"
          fill="var(--color-min)"
          fillOpacity={0.2}
          stroke="none"
          stackId="range"
        />
        <Line
          dataKey="actual"
          type="monotone"
          stroke="var(--color-actual)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-actual)', r: 4 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 3: Multiple Bars with Line Overlay
// Use for: Comparing multiple categories with an overall trend
// =============================================================================

const multiBarsLineData = [
  { quarter: 'Q1', product1: 450, product2: 320, total: 770 },
  { quarter: 'Q2', product1: 520, product2: 380, total: 900 },
  { quarter: 'Q3', product1: 480, product2: 340, total: 820 },
  { quarter: 'Q4', product1: 590, product2: 420, total: 1010 },
];

const multiBarsLineConfig = {
  product1: {
    label: 'Product 1',
    color: 'var(--chart-1)',
  },
  product2: {
    label: 'Product 2',
    color: 'var(--chart-2)',
  },
  total: {
    label: 'Total',
    color: 'var(--chart-3)',
  },
};

export function MultipleBarsLineChartExample() {
  return (
    <ChartContainer
      config={multiBarsLineConfig}
      className="min-h-[300px] w-full"
    >
      <ComposedChart accessibilityLayer data={multiBarsLineData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="quarter"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="product1"
          fill="var(--color-product1)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="product2"
          fill="var(--color-product2)"
          radius={[4, 4, 0, 0]}
        />
        <Line
          dataKey="total"
          type="monotone"
          stroke="var(--color-total)"
          strokeWidth={3}
          dot={{ fill: 'var(--color-total)', r: 5 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 4: Stacked Bars with Line
// Use for: Part-to-whole comparison with trend overlay
// =============================================================================

const stackedBarsLineData = [
  { month: 'Jan', online: 180, offline: 120, growth: 15 },
  { month: 'Feb', online: 210, offline: 110, growth: 18 },
  { month: 'Mar', online: 240, offline: 100, growth: 22 },
  { month: 'Apr', online: 270, offline: 95, growth: 25 },
  { month: 'May', online: 310, offline: 90, growth: 30 },
  { month: 'Jun', online: 350, offline: 85, growth: 35 },
];

const stackedBarsLineConfig = {
  online: {
    label: 'Online Sales',
    color: 'var(--chart-1)',
  },
  offline: {
    label: 'Offline Sales',
    color: 'var(--chart-2)',
  },
  growth: {
    label: 'Growth %',
    color: 'var(--chart-3)',
  },
};

export function StackedBarsLineChartExample() {
  return (
    <ChartContainer
      config={stackedBarsLineConfig}
      className="min-h-[300px] w-full"
    >
      <ComposedChart accessibilityLayer data={stackedBarsLineData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={value => `${value}%`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          yAxisId="left"
          dataKey="online"
          fill="var(--color-online)"
          stackId="sales"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          yAxisId="left"
          dataKey="offline"
          fill="var(--color-offline)"
          stackId="sales"
          radius={[4, 4, 0, 0]}
        />
        <Line
          yAxisId="right"
          dataKey="growth"
          type="monotone"
          stroke="var(--color-growth)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-growth)', r: 4 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 5: Area and Bar Combination
// Use for: Cumulative trends (area) with specific breakdowns (bars)
// =============================================================================

const areaBarData = [
  { day: 'Mon', revenue: 4200, expenses: 2800 },
  { day: 'Tue', revenue: 5100, expenses: 3200 },
  { day: 'Wed', revenue: 4800, expenses: 3000 },
  { day: 'Thu', revenue: 6300, expenses: 3800 },
  { day: 'Fri', revenue: 7200, expenses: 4200 },
  { day: 'Sat', revenue: 6900, expenses: 3600 },
  { day: 'Sun', revenue: 5500, expenses: 3100 },
];

const areaBarConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--chart-2)',
  },
};

export function AreaBarChartExample() {
  return (
    <ChartContainer config={areaBarConfig} className="min-h-[300px] w-full">
      <ComposedChart accessibilityLayer data={areaBarData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={value => [`$${value.toLocaleString()}`, '']}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="revenue"
          type="monotone"
          fill="var(--color-revenue)"
          fillOpacity={0.3}
          stroke="var(--color-revenue)"
          strokeWidth={2}
        />
        <Bar
          dataKey="expenses"
          fill="var(--color-expenses)"
          radius={[4, 4, 0, 0]}
          barSize={30}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
