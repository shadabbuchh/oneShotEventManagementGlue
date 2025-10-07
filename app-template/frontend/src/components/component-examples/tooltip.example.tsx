/**
 * Tooltip Examples
 *
 * This file contains working examples of various tooltip configurations for charts.
 * Copy the example closest to your use case and adapt the formatting.
 */

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components';

// =============================================================================
// Example 1: Default Tooltip
// Use for: Standard tooltip with basic data display
// =============================================================================

const defaultTooltipData = [
  { month: 'Jan', sales: 4200 },
  { month: 'Feb', sales: 5100 },
  { month: 'Mar', sales: 4800 },
  { month: 'Apr', sales: 6300 },
  { month: 'May', sales: 7200 },
];

const defaultTooltipConfig = {
  sales: {
    label: 'Sales',
    color: 'var(--chart-1)',
  },
};

export function DefaultTooltipExample() {
  return (
    <ChartContainer
      config={defaultTooltipConfig}
      className="min-h-[200px] w-full"
    >
      <LineChart accessibilityLayer data={defaultTooltipData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
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
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 2: Tooltip with Custom Formatter
// Use for: Formatting values (currency, percentages, units)
// =============================================================================

const formattedTooltipData = [
  { month: 'Jan', revenue: 42500, growth: 12.5 },
  { month: 'Feb', revenue: 51200, growth: 15.2 },
  { month: 'Mar', revenue: 48900, growth: 13.8 },
  { month: 'Apr', revenue: 63400, growth: 18.9 },
  { month: 'May', revenue: 72100, growth: 22.3 },
];

const formattedTooltipConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
  growth: {
    label: 'Growth',
    color: 'var(--chart-2)',
  },
};

export function FormattedTooltipExample() {
  return (
    <ChartContainer
      config={formattedTooltipConfig}
      className="min-h-[200px] w-full"
    >
      <LineChart accessibilityLayer data={formattedTooltipData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => {
                if (name === 'revenue') {
                  return [`$${value.toLocaleString()}`, 'Revenue'];
                }
                if (name === 'growth') {
                  return [`${value}%`, 'Growth Rate'];
                }
                return [value, name];
              }}
            />
          }
        />
        <Line
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 3: Tooltip with Label Formatter
// Use for: Custom label display (dates, periods, categories)
// =============================================================================

const labelFormatterData = [
  { date: '2024-01-15', visitors: 1250 },
  { date: '2024-02-15', visitors: 1580 },
  { date: '2024-03-15', visitors: 1420 },
  { date: '2024-04-15', visitors: 1890 },
  { date: '2024-05-15', visitors: 2140 },
];

const labelFormatterConfig = {
  visitors: {
    label: 'Visitors',
    color: 'var(--chart-1)',
  },
};

export function LabelFormatterTooltipExample() {
  return (
    <ChartContainer
      config={labelFormatterConfig}
      className="min-h-[200px] w-full"
    >
      <LineChart accessibilityLayer data={labelFormatterData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => {
            const date = new Date(value);
            return date.toLocaleDateString('en-US', { month: 'short' });
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={label => {
                const date = new Date(label);
                return date.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                });
              }}
            />
          }
        />
        <Line
          dataKey="visitors"
          type="monotone"
          stroke="var(--color-visitors)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 4: Tooltip with Indicator Styles
// Use for: Different visual indicators (line, dot, dashed)
// =============================================================================

const indicatorTooltipData = [
  { category: 'A', value1: 120, value2: 98, value3: 85 },
  { category: 'B', value1: 145, value2: 112, value3: 95 },
  { category: 'C', value1: 138, value2: 105, value3: 88 },
  { category: 'D', value1: 167, value2: 128, value3: 102 },
];

const indicatorTooltipConfig = {
  value1: {
    label: 'Primary',
    color: 'var(--chart-1)',
  },
  value2: {
    label: 'Secondary',
    color: 'var(--chart-2)',
  },
  value3: {
    label: 'Tertiary',
    color: 'var(--chart-3)',
  },
};

export function IndicatorTooltipExample() {
  return (
    <ChartContainer
      config={indicatorTooltipConfig}
      className="min-h-[200px] w-full"
    >
      <BarChart accessibilityLayer data={indicatorTooltipData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Bar
          dataKey="value1"
          fill="var(--color-value1)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="value2"
          fill="var(--color-value2)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="value3"
          fill="var(--color-value3)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 5: Tooltip with Hide Options
// Use for: Simplified tooltips without labels or indicators
// =============================================================================

const hideOptionsData = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 52 },
  { time: '08:00', value: 125 },
  { time: '12:00', value: 189 },
  { time: '16:00', value: 156 },
  { time: '20:00', value: 98 },
];

const hideOptionsConfig = {
  value: {
    label: 'Active Users',
    color: 'var(--chart-1)',
  },
};

export function HideOptionsTooltipExample() {
  return (
    <ChartContainer config={hideOptionsConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={hideOptionsData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent hideLabel={true} hideIndicator={true} />
          }
        />
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
// Example 6: Tooltip with Custom Cursor
// Use for: Visual feedback during hover interactions
// =============================================================================

const customCursorData = [
  { quarter: 'Q1 2023', revenue: 42000 },
  { quarter: 'Q2 2023', revenue: 51000 },
  { quarter: 'Q3 2023', revenue: 48000 },
  { quarter: 'Q4 2023', revenue: 63000 },
  { quarter: 'Q1 2024', revenue: 72000 },
];

const customCursorConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
};

export function CustomCursorTooltipExample() {
  return (
    <ChartContainer
      config={customCursorConfig}
      className="min-h-[200px] w-full"
    >
      <BarChart accessibilityLayer data={customCursorData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="quarter"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
          cursor={{ fill: 'var(--color-revenue)', opacity: 0.1 }}
        />
        <Bar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

// =============================================================================
// Example 7: Tooltip with Multiple Data Keys
// Use for: Displaying multiple metrics with custom names
// =============================================================================

const multipleKeysData = [
  { product: 'Product A', q1: 120, q2: 145, q3: 138, q4: 167 },
  { product: 'Product B', q1: 98, q2: 112, q3: 105, q4: 128 },
  { product: 'Product C', q1: 85, q2: 95, q3: 88, q4: 102 },
];

const multipleKeysConfig = {
  q1: {
    label: 'Q1',
    color: 'var(--chart-1)',
  },
  q2: {
    label: 'Q2',
    color: 'var(--chart-2)',
  },
  q3: {
    label: 'Q3',
    color: 'var(--chart-3)',
  },
  q4: {
    label: 'Q4',
    color: 'var(--chart-4)',
  },
};

export function MultipleKeysTooltipExample() {
  return (
    <ChartContainer
      config={multipleKeysConfig}
      className="min-h-[200px] w-full"
    >
      <BarChart accessibilityLayer data={multipleKeysData} layout="horizontal">
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="product"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <XAxis type="number" hide />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="dot"
              formatter={(value, name) => [`${value} units`, name]}
            />
          }
        />
        <Bar dataKey="q1" fill="var(--color-q1)" stackId="quarters" />
        <Bar dataKey="q2" fill="var(--color-q2)" stackId="quarters" />
        <Bar dataKey="q3" fill="var(--color-q3)" stackId="quarters" />
        <Bar
          dataKey="q4"
          fill="var(--color-q4)"
          stackId="quarters"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
