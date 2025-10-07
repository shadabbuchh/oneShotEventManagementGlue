/**
 * Line Chart Examples
 *
 * This file contains multiple working examples of line charts using shadcn/ui chart components.
 * Copy the example closest to your use case and adapt the data structure.
 */

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components';

// =============================================================================
// Example 1: Basic Line Chart
// Use for: Simple time series or continuous data visualization
// =============================================================================

const basicLineData = [
  { month: 'January', value: 186 },
  { month: 'February', value: 305 },
  { month: 'March', value: 237 },
  { month: 'April', value: 273 },
  { month: 'May', value: 209 },
  { month: 'June', value: 214 },
];

const basicLineConfig = {
  value: {
    label: 'Value',
    color: 'var(--chart-1)',
  },
};

export function BasicLineChartExample() {
  return (
    <ChartContainer config={basicLineConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={basicLineData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 2: Multiple Line Chart
// Use for: Comparing multiple data series over time
// =============================================================================

const multipleLineData = [
  { month: 'January', desktop: 186, mobile: 80, tablet: 45 },
  { month: 'February', desktop: 305, mobile: 200, tablet: 120 },
  { month: 'March', desktop: 237, mobile: 120, tablet: 90 },
  { month: 'April', desktop: 273, mobile: 190, tablet: 130 },
  { month: 'May', desktop: 209, mobile: 130, tablet: 85 },
  { month: 'June', desktop: 214, mobile: 140, tablet: 95 },
];

const multipleLineConfig = {
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

export function MultipleLineChartExample() {
  return (
    <ChartContainer
      config={multipleLineConfig}
      className="min-h-[200px] w-full"
    >
      <LineChart accessibilityLayer data={multipleLineData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="tablet"
          type="monotone"
          stroke="var(--color-tablet)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 3: Line Chart with Dots
// Use for: Emphasizing individual data points
// =============================================================================

const dottedLineData = [
  { week: 'Week 1', sales: 120 },
  { week: 'Week 2', sales: 145 },
  { week: 'Week 3', sales: 138 },
  { week: 'Week 4', sales: 167 },
  { week: 'Week 5', sales: 189 },
  { week: 'Week 6', sales: 201 },
];

const dottedLineConfig = {
  sales: {
    label: 'Sales',
    color: 'var(--chart-1)',
  },
};

export function DottedLineChartExample() {
  return (
    <ChartContainer config={dottedLineConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={dottedLineData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="week"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="sales"
          type="monotone"
          stroke="var(--color-sales)"
          strokeWidth={2}
          dot={{
            fill: 'var(--color-sales)',
            r: 4,
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 4: Step Line Chart
// Use for: Discrete value changes (status transitions, step functions)
// =============================================================================

const stepLineData = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 52 },
  { time: '08:00', value: 125 },
  { time: '12:00', value: 189 },
  { time: '16:00', value: 156 },
  { time: '20:00', value: 98 },
];

const stepLineConfig = {
  value: {
    label: 'Value',
    color: 'var(--chart-2)',
  },
};

export function StepLineChartExample() {
  return (
    <ChartContainer config={stepLineConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={stepLineData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="value"
          type="step"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 5: Line Chart with Custom Axes
// Use for: Financial data, detailed metrics with formatted values
// =============================================================================

const customAxesLineData = [
  { date: '2024-01', revenue: 12500, expenses: 8200 },
  { date: '2024-02', revenue: 15800, expenses: 9500 },
  { date: '2024-03', revenue: 14200, expenses: 8800 },
  { date: '2024-04', revenue: 18900, expenses: 10200 },
  { date: '2024-05', revenue: 21400, expenses: 11500 },
  { date: '2024-06', revenue: 19800, expenses: 10800 },
];

const customAxesLineConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--chart-2)',
  },
};

export function CustomAxesLineChartExample() {
  return (
    <ChartContainer
      config={customAxesLineConfig}
      className="min-h-[300px] w-full"
    >
      <LineChart accessibilityLayer data={customAxesLineData}>
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
              formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="expenses"
          type="monotone"
          stroke="var(--color-expenses)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 6: Dashed Line Chart
// Use for: Projections, forecasts, or secondary/reference data
// =============================================================================

const dashedLineData = [
  { month: 'Jan', actual: 186, forecast: 180 },
  { month: 'Feb', actual: 305, forecast: 290 },
  { month: 'Mar', actual: 237, forecast: 250 },
  { month: 'Apr', actual: 273, forecast: 280 },
  { month: 'May', actual: null, forecast: 310 },
  { month: 'Jun', actual: null, forecast: 340 },
];

const dashedLineConfig = {
  actual: {
    label: 'Actual',
    color: 'var(--chart-1)',
  },
  forecast: {
    label: 'Forecast',
    color: 'var(--chart-2)',
  },
};

export function DashedLineChartExample() {
  return (
    <ChartContainer config={dashedLineConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={dashedLineData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="actual"
          type="monotone"
          stroke="var(--color-actual)"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          dataKey="forecast"
          type="monotone"
          stroke="var(--color-forecast)"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
