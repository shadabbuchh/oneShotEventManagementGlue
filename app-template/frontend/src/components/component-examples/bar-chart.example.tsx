/**
 * Bar Chart Examples
 *
 * This file contains multiple working examples of bar charts using shadcn/ui chart components.
 * Copy the example closest to your use case and adapt the data structure.
 */

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components';

// =============================================================================
// Example 1: Basic Vertical Bar Chart
// Use for: Simple categorical comparisons
// =============================================================================

const basicBarData = [
  { category: 'Product A', value: 275 },
  { category: 'Product B', value: 200 },
  { category: 'Product C', value: 187 },
  { category: 'Product D', value: 173 },
  { category: 'Product E', value: 90 },
];

const basicBarConfig = {
  value: {
    label: 'Sales',
    color: 'var(--chart-1)',
  },
};

export function BasicBarChartExample() {
  return (
    <ChartContainer config={basicBarConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={basicBarData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 2: Horizontal Bar Chart
// Use for: Ranking, comparisons with long labels
// =============================================================================

const horizontalBarData = [
  { department: 'Engineering', employees: 145 },
  { department: 'Sales', employees: 89 },
  { department: 'Marketing', employees: 67 },
  { department: 'Support', employees: 54 },
  { department: 'HR', employees: 23 },
];

const horizontalBarConfig = {
  employees: {
    label: 'Employees',
    color: 'var(--chart-2)',
  },
};

export function HorizontalBarChartExample() {
  return (
    <ChartContainer
      config={horizontalBarConfig}
      className="min-h-[300px] w-full"
    >
      <BarChart accessibilityLayer data={horizontalBarData} layout="horizontal">
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="department"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          width={100}
        />
        <XAxis type="number" hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="employees"
          fill="var(--color-employees)"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 3: Grouped Bar Chart
// Use for: Comparing multiple series across categories
// =============================================================================

const groupedBarData = [
  { month: 'Jan', sales: 186, revenue: 205 },
  { month: 'Feb', sales: 305, revenue: 340 },
  { month: 'Mar', sales: 237, revenue: 260 },
  { month: 'Apr', sales: 273, revenue: 295 },
  { month: 'May', sales: 209, revenue: 230 },
  { month: 'Jun', sales: 214, revenue: 240 },
];

const groupedBarConfig = {
  sales: {
    label: 'Sales',
    color: 'var(--chart-1)',
  },
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-2)',
  },
};

export function GroupedBarChartExample() {
  return (
    <ChartContainer config={groupedBarConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={groupedBarData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
        <Bar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 4: Stacked Bar Chart
// Use for: Part-to-whole relationships across categories
// =============================================================================

const stackedBarData = [
  { quarter: 'Q1', product1: 120, product2: 80, product3: 45 },
  { quarter: 'Q2', product1: 150, product2: 95, product3: 60 },
  { quarter: 'Q3', product1: 135, product2: 88, product3: 52 },
  { quarter: 'Q4', product1: 165, product2: 110, product3: 70 },
];

const stackedBarConfig = {
  product1: {
    label: 'Product 1',
    color: 'var(--chart-1)',
  },
  product2: {
    label: 'Product 2',
    color: 'var(--chart-2)',
  },
  product3: {
    label: 'Product 3',
    color: 'var(--chart-3)',
  },
};

export function StackedBarChartExample() {
  return (
    <ChartContainer config={stackedBarConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={stackedBarData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="quarter"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="product1"
          fill="var(--color-product1)"
          stackId="a"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="product2"
          fill="var(--color-product2)"
          stackId="a"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="product3"
          fill="var(--color-product3)"
          stackId="a"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 5: Bar Chart with Custom Labels
// Use for: Emphasizing specific values, targets, or thresholds
// =============================================================================

const labeledBarData = [
  { region: 'North', target: 300, actual: 285 },
  { region: 'South', target: 250, actual: 270 },
  { region: 'East', target: 280, actual: 265 },
  { region: 'West', target: 320, actual: 340 },
];

const labeledBarConfig = {
  actual: {
    label: 'Actual',
    color: 'var(--chart-1)',
  },
  target: {
    label: 'Target',
    color: 'var(--chart-2)',
  },
};

export function LabeledBarChartExample() {
  return (
    <ChartContainer config={labeledBarConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={labeledBarData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="region"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="target"
          fill="var(--color-target)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="actual"
          fill="var(--color-actual)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 6: Bar Chart with Negative Values
// Use for: Profit/loss, changes, comparisons with positive/negative values
// =============================================================================

const negativeBarData = [
  { month: 'Jan', change: 45 },
  { month: 'Feb', change: -23 },
  { month: 'Mar', change: 67 },
  { month: 'Apr', change: -15 },
  { month: 'May', change: 89 },
  { month: 'Jun', change: 34 },
];

const negativeBarConfig = {
  change: {
    label: 'Change',
    color: 'var(--chart-1)',
  },
};

export function NegativeBarChartExample() {
  return (
    <ChartContainer config={negativeBarConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={negativeBarData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={value => `${value > 0 ? '+' : ''}${value}%`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={value => [
                `${value > 0 ? '+' : ''}${value}%`,
                'Change',
              ]}
            />
          }
        />
        <Bar
          dataKey="change"
          fill="var(--color-change)"
          radius={[4, 4, 4, 4]}
        />
      </BarChart>
    </ChartContainer>
  );
}
