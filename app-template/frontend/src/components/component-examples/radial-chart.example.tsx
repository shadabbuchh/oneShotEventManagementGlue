/**
 * Radial Chart Examples
 *
 * This file contains multiple working examples of radial charts using shadcn/ui chart components.
 * Copy the example closest to your use case and adapt the data structure.
 */

import {
  RadialBar,
  RadialBarChart,
  PolarGrid,
  PolarRadiusAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components';

// =============================================================================
// Example 1: Basic Radial Chart
// Use for: Progress indicators, completion rates, single metric display
// =============================================================================

const basicRadialData = [
  { name: 'Progress', value: 72, fill: 'var(--chart-1)' },
];

const basicRadialConfig = {
  value: {
    label: 'Completion',
  },
  Progress: {
    label: 'Progress',
    color: 'var(--chart-1)',
  },
};

export function BasicRadialChartExample() {
  return (
    <ChartContainer config={basicRadialConfig} className="min-h-[250px] w-full">
      <RadialBarChart
        data={basicRadialData}
        startAngle={90}
        endAngle={-270}
        innerRadius={80}
        outerRadius={140}
      >
        <ChartTooltip content={<ChartTooltipContent />} />
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="value" cornerRadius={10} />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-4xl font-bold"
        >
          {basicRadialData[0].value}%
        </text>
      </RadialBarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 2: Stacked Radial Chart
// Use for: Multiple progress indicators, layered metrics
// =============================================================================

const stackedRadialData = [
  { category: 'Desktop', value: 85, fill: 'var(--chart-1)' },
  { category: 'Mobile', value: 72, fill: 'var(--chart-2)' },
  { category: 'Tablet', value: 58, fill: 'var(--chart-3)' },
];

const stackedRadialConfig = {
  value: {
    label: 'Usage',
  },
  Desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  Mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
  Tablet: {
    label: 'Tablet',
    color: 'var(--chart-3)',
  },
};

export function StackedRadialChartExample() {
  return (
    <ChartContainer
      config={stackedRadialConfig}
      className="min-h-[300px] w-full"
    >
      <RadialBarChart
        data={stackedRadialData}
        startAngle={90}
        endAngle={-270}
        innerRadius={30}
        outerRadius={130}
      >
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <PolarGrid gridType="circle" />
        <RadialBar dataKey="value" cornerRadius={5} />
      </RadialBarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 3: Radial Chart with Label
// Use for: Goal tracking, target achievement visualization
// =============================================================================

const labeledRadialData = [
  { metric: 'Sales Target', achieved: 68, fill: 'var(--chart-1)' },
];

const labeledRadialConfig = {
  achieved: {
    label: 'Achieved',
  },
  'Sales Target': {
    label: 'Sales Target',
    color: 'var(--chart-1)',
  },
};

export function LabeledRadialChartExample() {
  const targetValue = 85;
  const currentValue = labeledRadialData[0].achieved;

  return (
    <ChartContainer
      config={labeledRadialConfig}
      className="min-h-[300px] w-full"
    >
      <RadialBarChart
        data={labeledRadialData}
        startAngle={90}
        endAngle={-270}
        innerRadius={70}
        outerRadius={120}
      >
        <ChartTooltip content={<ChartTooltipContent />} />
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          polarRadius={[76, 64]}
        />
        <RadialBar dataKey="achieved" cornerRadius={10} />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-3xl font-bold"
        >
          {currentValue}%
        </text>
        <text
          x="50%"
          y="50%"
          dy={25}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground text-sm"
        >
          of {targetValue}% goal
        </text>
      </RadialBarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 4: Multiple Metrics Radial Chart
// Use for: Dashboard widgets showing multiple KPIs
// =============================================================================

const multiMetricsRadialData = [
  { metric: 'Revenue', value: 92, fill: 'var(--chart-1)' },
  { metric: 'Customers', value: 78, fill: 'var(--chart-2)' },
  { metric: 'Satisfaction', value: 85, fill: 'var(--chart-3)' },
  { metric: 'Efficiency', value: 71, fill: 'var(--chart-4)' },
];

const multiMetricsRadialConfig = {
  value: {
    label: 'Score',
  },
  Revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
  Customers: {
    label: 'Customers',
    color: 'var(--chart-2)',
  },
  Satisfaction: {
    label: 'Satisfaction',
    color: 'var(--chart-3)',
  },
  Efficiency: {
    label: 'Efficiency',
    color: 'var(--chart-4)',
  },
};

export function MultiMetricsRadialChartExample() {
  return (
    <ChartContainer
      config={multiMetricsRadialConfig}
      className="min-h-[350px] w-full"
    >
      <RadialBarChart
        data={multiMetricsRadialData}
        startAngle={90}
        endAngle={-270}
        innerRadius={30}
        outerRadius={130}
      >
        <ChartTooltip
          content={
            <ChartTooltipContent formatter={value => [`${value}%`, 'Score']} />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <PolarGrid gridType="circle" />
        <RadialBar
          dataKey="value"
          label={{ position: 'insideStart', fill: '#fff' }}
        />
      </RadialBarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 5: Radial Chart with Grid
// Use for: Detailed progress tracking with reference lines
// =============================================================================

const gridRadialData = [
  { phase: 'Planning', completion: 100, fill: 'var(--chart-1)' },
  { phase: 'Development', completion: 75, fill: 'var(--chart-2)' },
  { phase: 'Testing', completion: 45, fill: 'var(--chart-3)' },
  { phase: 'Deployment', completion: 20, fill: 'var(--chart-4)' },
];

const gridRadialConfig = {
  completion: {
    label: 'Completion',
  },
  Planning: {
    label: 'Planning',
    color: 'var(--chart-1)',
  },
  Development: {
    label: 'Development',
    color: 'var(--chart-2)',
  },
  Testing: {
    label: 'Testing',
    color: 'var(--chart-3)',
  },
  Deployment: {
    label: 'Deployment',
    color: 'var(--chart-4)',
  },
};

export function GridRadialChartExample() {
  return (
    <ChartContainer config={gridRadialConfig} className="min-h-[350px] w-full">
      <RadialBarChart
        data={gridRadialData}
        startAngle={0}
        endAngle={360}
        innerRadius={40}
        outerRadius={140}
      >
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={value => [`${value}%`, 'Complete']}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <PolarGrid
          gridType="circle"
          radialLines={true}
          stroke="var(--border)"
          strokeOpacity={0.5}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <RadialBar dataKey="completion" cornerRadius={5} />
      </RadialBarChart>
    </ChartContainer>
  );
}
