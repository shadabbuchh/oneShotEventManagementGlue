/**
 * Pie Chart Examples
 *
 * This file contains multiple working examples of pie and donut charts using shadcn/ui chart components.
 * Copy the example closest to your use case and adapt the data structure.
 */

import { Pie, PieChart } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components';

// =============================================================================
// Example 1: Basic Pie Chart
// Use for: Simple part-to-whole visualization
// =============================================================================

const basicPieData = [
  { category: 'Chrome', value: 275, fill: 'var(--chart-1)' },
  { category: 'Safari', value: 200, fill: 'var(--chart-2)' },
  { category: 'Firefox', value: 187, fill: 'var(--chart-3)' },
  { category: 'Edge', value: 173, fill: 'var(--chart-4)' },
  { category: 'Other', value: 90, fill: 'var(--chart-5)' },
];

const basicPieConfig = {
  value: {
    label: 'Users',
  },
  Chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  Safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  Firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  Edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  Other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
};

export function BasicPieChartExample() {
  return (
    <ChartContainer config={basicPieConfig} className="min-h-[300px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie data={basicPieData} dataKey="value" nameKey="category" />
      </PieChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 2: Donut Chart
// Use for: Part-to-whole with central space for additional info
// =============================================================================

const donutData = [
  { segment: 'Product A', sales: 450, fill: 'var(--chart-1)' },
  { segment: 'Product B', sales: 320, fill: 'var(--chart-2)' },
  { segment: 'Product C', sales: 280, fill: 'var(--chart-3)' },
  { segment: 'Product D', sales: 190, fill: 'var(--chart-4)' },
];

const donutConfig = {
  sales: {
    label: 'Sales',
  },
  'Product A': {
    label: 'Product A',
    color: 'var(--chart-1)',
  },
  'Product B': {
    label: 'Product B',
    color: 'var(--chart-2)',
  },
  'Product C': {
    label: 'Product C',
    color: 'var(--chart-3)',
  },
  'Product D': {
    label: 'Product D',
    color: 'var(--chart-4)',
  },
};

export function DonutChartExample() {
  return (
    <ChartContainer config={donutConfig} className="min-h-[300px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={donutData}
          dataKey="sales"
          nameKey="segment"
          innerRadius={60}
          outerRadius={100}
        />
      </PieChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 3: Pie Chart with Legend
// Use for: Clear category identification with labels
// =============================================================================

const legendPieData = [
  { department: 'Engineering', headcount: 145, fill: 'var(--chart-1)' },
  { department: 'Sales', headcount: 89, fill: 'var(--chart-2)' },
  { department: 'Marketing', headcount: 67, fill: 'var(--chart-3)' },
  { department: 'Support', headcount: 54, fill: 'var(--chart-4)' },
  { department: 'HR', headcount: 23, fill: 'var(--chart-5)' },
];

const legendPieConfig = {
  headcount: {
    label: 'Employees',
  },
  Engineering: {
    label: 'Engineering',
    color: 'var(--chart-1)',
  },
  Sales: {
    label: 'Sales',
    color: 'var(--chart-2)',
  },
  Marketing: {
    label: 'Marketing',
    color: 'var(--chart-3)',
  },
  Support: {
    label: 'Support',
    color: 'var(--chart-4)',
  },
  HR: {
    label: 'HR',
    color: 'var(--chart-5)',
  },
};

export function LegendPieChartExample() {
  return (
    <ChartContainer config={legendPieConfig} className="min-h-[350px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie
          data={legendPieData}
          dataKey="headcount"
          nameKey="department"
          label
        />
      </PieChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 4: Donut Chart with Label
// Use for: Highlighting total or key metric in center
// =============================================================================

const labeledDonutData = [
  { type: 'Completed', count: 428, fill: 'var(--chart-1)' },
  { type: 'In Progress', count: 156, fill: 'var(--chart-2)' },
  { type: 'Pending', count: 89, fill: 'var(--chart-3)' },
  { type: 'Cancelled', count: 34, fill: 'var(--chart-4)' },
];

const labeledDonutConfig = {
  count: {
    label: 'Tasks',
  },
  Completed: {
    label: 'Completed',
    color: 'var(--chart-1)',
  },
  'In Progress': {
    label: 'In Progress',
    color: 'var(--chart-2)',
  },
  Pending: {
    label: 'Pending',
    color: 'var(--chart-3)',
  },
  Cancelled: {
    label: 'Cancelled',
    color: 'var(--chart-4)',
  },
};

export function LabeledDonutChartExample() {
  const totalTasks = labeledDonutData.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  return (
    <ChartContainer
      config={labeledDonutConfig}
      className="min-h-[300px] w-full"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={labeledDonutData}
          dataKey="count"
          nameKey="type"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={2}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-3xl font-bold"
        >
          {totalTasks}
        </text>
        <text
          x="50%"
          y="50%"
          dy={25}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground text-sm"
        >
          Total Tasks
        </text>
      </PieChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 5: Interactive Pie Chart
// Use for: Emphasis on user interaction, detailed segment info
// =============================================================================

const interactivePieData = [
  { region: 'North America', revenue: 45000, fill: 'var(--chart-1)' },
  { region: 'Europe', revenue: 38000, fill: 'var(--chart-2)' },
  { region: 'Asia Pacific', revenue: 32000, fill: 'var(--chart-3)' },
  { region: 'Latin America', revenue: 18000, fill: 'var(--chart-4)' },
  { region: 'Middle East', revenue: 12000, fill: 'var(--chart-5)' },
];

const interactivePieConfig = {
  revenue: {
    label: 'Revenue',
  },
  'North America': {
    label: 'North America',
    color: 'var(--chart-1)',
  },
  Europe: {
    label: 'Europe',
    color: 'var(--chart-2)',
  },
  'Asia Pacific': {
    label: 'Asia Pacific',
    color: 'var(--chart-3)',
  },
  'Latin America': {
    label: 'Latin America',
    color: 'var(--chart-4)',
  },
  'Middle East': {
    label: 'Middle East',
    color: 'var(--chart-5)',
  },
};

export function InteractivePieChartExample() {
  return (
    <ChartContainer
      config={interactivePieConfig}
      className="min-h-[350px] w-full"
    >
      <PieChart>
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={value => [`$${value.toLocaleString()}`, 'Revenue']}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie
          data={interactivePieData}
          dataKey="revenue"
          nameKey="region"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ value }) => `$${(value / 1000).toFixed(0)}k`}
        />
      </PieChart>
    </ChartContainer>
  );
}
