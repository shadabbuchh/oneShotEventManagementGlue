/**
 * Radar Chart Examples
 *
 * This file contains multiple working examples of radar charts using shadcn/ui chart components.
 * Copy the example closest to your use case and adapt the data structure.
 */

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
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
// Example 1: Basic Radar Chart
// Use for: Multi-dimensional data comparison (skills, metrics, ratings)
// =============================================================================

const basicRadarData = [
  { skill: 'Communication', score: 85 },
  { skill: 'Problem Solving', score: 92 },
  { skill: 'Leadership', score: 78 },
  { skill: 'Technical', score: 95 },
  { skill: 'Creativity', score: 88 },
  { skill: 'Teamwork', score: 90 },
];

const basicRadarConfig = {
  score: {
    label: 'Score',
    color: 'var(--chart-1)',
  },
};

export function BasicRadarChartExample() {
  return (
    <ChartContainer config={basicRadarConfig} className="min-h-[300px] w-full">
      <RadarChart data={basicRadarData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="skill" />
        <PolarGrid />
        <Radar
          dataKey="score"
          fill="var(--color-score)"
          fillOpacity={0.6}
          stroke="var(--color-score)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 2: Multiple Series Radar Chart
// Use for: Comparing multiple entities across same dimensions
// =============================================================================

const multiRadarData = [
  { category: 'Speed', productA: 85, productB: 70 },
  { category: 'Quality', productA: 92, productB: 88 },
  { category: 'Price', productA: 65, productB: 90 },
  { category: 'Features', productA: 88, productB: 75 },
  { category: 'Support', productA: 78, productB: 85 },
  { category: 'Ease of Use', productA: 90, productB: 82 },
];

const multiRadarConfig = {
  productA: {
    label: 'Product A',
    color: 'var(--chart-1)',
  },
  productB: {
    label: 'Product B',
    color: 'var(--chart-2)',
  },
};

export function MultipleRadarChartExample() {
  return (
    <ChartContainer config={multiRadarConfig} className="min-h-[350px] w-full">
      <RadarChart data={multiRadarData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <PolarAngleAxis dataKey="category" />
        <PolarGrid />
        <Radar
          dataKey="productA"
          fill="var(--color-productA)"
          fillOpacity={0.5}
          stroke="var(--color-productA)"
          strokeWidth={2}
        />
        <Radar
          dataKey="productB"
          fill="var(--color-productB)"
          fillOpacity={0.5}
          stroke="var(--color-productB)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 3: Radar Chart with Dots
// Use for: Emphasizing individual data points in multi-dimensional view
// =============================================================================

const dottedRadarData = [
  { metric: 'Performance', value: 88 },
  { metric: 'Reliability', value: 95 },
  { metric: 'Scalability', value: 82 },
  { metric: 'Security', value: 90 },
  { metric: 'Cost', value: 75 },
  { metric: 'Maintainability', value: 85 },
];

const dottedRadarConfig = {
  value: {
    label: 'Rating',
    color: 'var(--chart-2)',
  },
};

export function DottedRadarChartExample() {
  return (
    <ChartContainer config={dottedRadarConfig} className="min-h-[300px] w-full">
      <RadarChart data={dottedRadarData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="metric" />
        <PolarGrid />
        <Radar
          dataKey="value"
          fill="var(--color-value)"
          fillOpacity={0.6}
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={{
            r: 4,
            fill: 'var(--color-value)',
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 4: Radar Chart with Custom Grid
// Use for: Different visualization styles (circle vs polygon grid)
// =============================================================================

const customGridRadarData = [
  { dimension: 'Innovation', score: 90 },
  { dimension: 'Market Share', score: 75 },
  { dimension: 'Customer Satisfaction', score: 88 },
  { dimension: 'Revenue Growth', score: 82 },
  { dimension: 'Brand Recognition', score: 85 },
];

const customGridRadarConfig = {
  score: {
    label: 'Score',
    color: 'var(--chart-3)',
  },
};

export function CustomGridRadarChartExample() {
  return (
    <ChartContainer
      config={customGridRadarConfig}
      className="min-h-[300px] w-full"
    >
      <RadarChart data={customGridRadarData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="dimension" />
        <PolarGrid gridType="circle" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar
          dataKey="score"
          fill="var(--color-score)"
          fillOpacity={0.6}
          stroke="var(--color-score)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 5: Lines Only Radar Chart
// Use for: Cleaner visualization focusing on boundaries/limits
// =============================================================================

const linesRadarData = [
  { aspect: 'Mobile', current: 85, target: 95 },
  { aspect: 'Desktop', current: 92, target: 95 },
  { aspect: 'Tablet', current: 78, target: 85 },
  { aspect: 'Performance', current: 88, target: 90 },
  { aspect: 'Accessibility', current: 82, target: 90 },
];

const linesRadarConfig = {
  current: {
    label: 'Current',
    color: 'var(--chart-1)',
  },
  target: {
    label: 'Target',
    color: 'var(--chart-2)',
  },
};

export function LinesRadarChartExample() {
  return (
    <ChartContainer config={linesRadarConfig} className="min-h-[350px] w-full">
      <RadarChart data={linesRadarData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <PolarAngleAxis dataKey="aspect" />
        <PolarGrid />
        <Radar
          dataKey="current"
          stroke="var(--color-current)"
          fill="var(--color-current)"
          fillOpacity={0}
          strokeWidth={2}
          dot={{
            r: 4,
            fill: 'var(--color-current)',
          }}
        />
        <Radar
          dataKey="target"
          stroke="var(--color-target)"
          fill="var(--color-target)"
          fillOpacity={0}
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{
            r: 4,
            fill: 'var(--color-target)',
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
}
