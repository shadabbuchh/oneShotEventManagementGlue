/**
 * Area Chart Examples
 *
 * This file contains multiple working examples of area charts using shadcn/ui chart components.
 * Copy the example closest to your use case and adapt the data structure.
 */

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components';

// =============================================================================
// Example 1: Basic Area Chart
// Use for: Simple trend visualization with single data series
// =============================================================================

const basicAreaData = [
  { month: 'January', value: 186 },
  { month: 'February', value: 305 },
  { month: 'March', value: 237 },
  { month: 'April', value: 273 },
  { month: 'May', value: 209 },
  { month: 'June', value: 214 },
];

const basicAreaConfig = {
  value: {
    label: 'Value',
    color: 'var(--chart-1)',
  },
};

export function BasicAreaChartExample() {
  return (
    <ChartContainer config={basicAreaConfig} className="min-h-[200px] w-full">
      <AreaChart accessibilityLayer data={basicAreaData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="value"
          type="monotone"
          fill="var(--color-value)"
          fillOpacity={0.4}
          stroke="var(--color-value)"
        />
      </AreaChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 2: Stacked Area Chart
// Use for: Comparing multiple data series with cumulative totals
// =============================================================================

const stackedAreaData = [
  { month: 'January', desktop: 186, mobile: 80, tablet: 45 },
  { month: 'February', desktop: 305, mobile: 200, tablet: 120 },
  { month: 'March', desktop: 237, mobile: 120, tablet: 90 },
  { month: 'April', desktop: 273, mobile: 190, tablet: 130 },
  { month: 'May', desktop: 209, mobile: 130, tablet: 85 },
  { month: 'June', desktop: 214, mobile: 140, tablet: 95 },
];

const stackedAreaConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
  tablet: {
    label: 'Tablet',
    color: 'var(--chart-3)',
  },
};

export function StackedAreaChartExample() {
  return (
    <ChartContainer config={stackedAreaConfig} className="min-h-[200px] w-full">
      <AreaChart accessibilityLayer data={stackedAreaData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="desktop"
          type="monotone"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
        <Area
          dataKey="mobile"
          type="monotone"
          fill="var(--color-mobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="tablet"
          type="monotone"
          fill="var(--color-tablet)"
          fillOpacity={0.4}
          stroke="var(--color-tablet)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 3: Interactive Area Chart with Axes
// Use for: Detailed data visualization with axis labels and values
// =============================================================================

const interactiveAreaData = [
  { date: '2024-01', revenue: 12500 },
  { date: '2024-02', revenue: 15800 },
  { date: '2024-03', revenue: 14200 },
  { date: '2024-04', revenue: 18900 },
  { date: '2024-05', revenue: 21400 },
  { date: '2024-06', revenue: 19800 },
];

const interactiveAreaConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
};

export function InteractiveAreaChartExample() {
  return (
    <ChartContainer
      config={interactiveAreaConfig}
      className="min-h-[300px] w-full"
    >
      <AreaChart accessibilityLayer data={interactiveAreaData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
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
              indicator="line"
              labelFormatter={value => `Period: ${value}`}
              formatter={value => [`$${value.toLocaleString()}`, 'Revenue']}
            />
          }
        />
        <Area
          dataKey="revenue"
          type="monotone"
          fill="var(--color-revenue)"
          fillOpacity={0.4}
          stroke="var(--color-revenue)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 4: Step Area Chart
// Use for: Discrete value changes over time (status changes, counts)
// =============================================================================

const stepAreaData = [
  { time: '00:00', users: 45 },
  { time: '04:00', users: 52 },
  { time: '08:00', users: 125 },
  { time: '12:00', users: 189 },
  { time: '16:00', users: 156 },
  { time: '20:00', users: 98 },
];

const stepAreaConfig = {
  users: {
    label: 'Active Users',
    color: 'var(--chart-2)',
  },
};

export function StepAreaChartExample() {
  return (
    <ChartContainer config={stepAreaConfig} className="min-h-[200px] w-full">
      <AreaChart accessibilityLayer data={stepAreaData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="users"
          type="step"
          fill="var(--color-users)"
          fillOpacity={0.4}
          stroke="var(--color-users)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 5: Gradient Area Chart
// Use for: Visually appealing trend display with gradient fill
// =============================================================================

const gradientAreaData = [
  { week: 'Week 1', sales: 4200 },
  { week: 'Week 2', sales: 5100 },
  { week: 'Week 3', sales: 4800 },
  { week: 'Week 4', sales: 6300 },
  { week: 'Week 5', sales: 7200 },
  { week: 'Week 6', sales: 6900 },
];

const gradientAreaConfig = {
  sales: {
    label: 'Sales',
    color: 'var(--chart-1)',
  },
};

export function GradientAreaChartExample() {
  return (
    <ChartContainer
      config={gradientAreaConfig}
      className="min-h-[200px] w-full"
    >
      <AreaChart accessibilityLayer data={gradientAreaData}>
        <defs>
          <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-sales)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-sales)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="week"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="sales"
          type="monotone"
          fill="url(#fillSales)"
          stroke="var(--color-sales)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
