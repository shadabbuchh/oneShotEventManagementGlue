/**
 * Grid Component Examples
 *
 * This file contains multiple working examples of the Grid component for responsive layouts.
 * Copy the example closest to your use case and adapt the content.
 */

import {
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components';

// =============================================================================
// Example 1: Basic Grid with Cards
// Use for: Simple responsive card layouts, dashboards, product grids
// =============================================================================

export function BasicGridExample() {
  const items = [
    { id: 1, title: 'Item 1', description: 'Description for item 1' },
    { id: 2, title: 'Item 2', description: 'Description for item 2' },
    { id: 3, title: 'Item 3', description: 'Description for item 3' },
    { id: 4, title: 'Item 4', description: 'Description for item 4' },
    { id: 5, title: 'Item 5', description: 'Description for item 5' },
    { id: 6, title: 'Item 6', description: 'Description for item 6' },
  ];

  return (
    <Grid>
      {items.map(item => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}

// =============================================================================
// Example 2: Grid with Custom Gap
// Use for: Adjusting spacing between grid items
// =============================================================================

export function CustomGapGridExample() {
  const items = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
  }));

  return (
    <Grid gap="gap-4">
      {items.map(item => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Smaller gap between items (gap-4)</p>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}

// =============================================================================
// Example 3: Grid with Custom Min Column Width
// Use for: Controlling when items wrap to new rows
// =============================================================================

export function CustomMinWidthGridExample() {
  const products = [
    { id: 1, name: 'Product A', price: 29.99 },
    { id: 2, name: 'Product B', price: 39.99 },
    { id: 3, name: 'Product C', price: 49.99 },
    { id: 4, name: 'Product D', price: 59.99 },
  ];

  return (
    <Grid minColumnWidth={320}>
      {products.map(product => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${product.price}</p>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}

// =============================================================================
// Example 4: Grid with GridItem Wrapper
// Use for: Consistent spacing and alignment of grid children
// =============================================================================

export function GridItemWrapperExample() {
  const features = [
    {
      id: 1,
      icon: '🚀',
      title: 'Fast',
      description: 'Lightning-fast performance',
    },
    {
      id: 2,
      icon: '🔒',
      title: 'Secure',
      description: 'Enterprise-grade security',
    },
    {
      id: 3,
      icon: '📱',
      title: 'Responsive',
      description: 'Works on all devices',
    },
    {
      id: 4,
      icon: '🎨',
      title: 'Beautiful',
      description: 'Modern, clean design',
    },
  ];

  return (
    <Grid gap="gap-6">
      {features.map(feature => (
        <GridItem key={feature.id}>
          <Card className="h-full">
            <CardHeader>
              <div className="text-4xl mb-2">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}

// =============================================================================
// Example 5: Dashboard Metrics Grid
// Use for: Dashboard layouts with metric cards
// =============================================================================

export function DashboardMetricsGridExample() {
  const metrics = [
    { id: 1, label: 'Total Revenue', value: '$124,500', change: '+12.5%' },
    { id: 2, label: 'Active Users', value: '2,345', change: '+8.2%' },
    { id: 3, label: 'Conversion Rate', value: '3.24%', change: '-2.1%' },
    { id: 4, label: 'Avg. Order Value', value: '$89.50', change: '+5.7%' },
  ];

  return (
    <Grid gap="gap-4" minColumnWidth={240}>
      {metrics.map(metric => (
        <Card key={metric.id}>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p
              className={`text-sm ${
                metric.change.startsWith('+')
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {metric.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}

// =============================================================================
// Example 6: Image Gallery Grid
// Use for: Photo galleries, portfolio layouts
// =============================================================================

export function ImageGalleryGridExample() {
  const images = [
    { id: 1, title: 'Image 1', url: 'https://via.placeholder.com/400x300' },
    { id: 2, title: 'Image 2', url: 'https://via.placeholder.com/400x300' },
    { id: 3, title: 'Image 3', url: 'https://via.placeholder.com/400x300' },
    { id: 4, title: 'Image 4', url: 'https://via.placeholder.com/400x300' },
    { id: 5, title: 'Image 5', url: 'https://via.placeholder.com/400x300' },
    { id: 6, title: 'Image 6', url: 'https://via.placeholder.com/400x300' },
  ];

  return (
    <Grid gap="gap-4" minColumnWidth={300}>
      {images.map(image => (
        <Card key={image.id} className="overflow-hidden">
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-4">
            <p className="font-medium">{image.title}</p>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}

// =============================================================================
// Example 7: Wide Gap Grid
// Use for: More breathing room between items
// =============================================================================

export function WideGapGridExample() {
  const categories = [
    { id: 1, name: 'Electronics', count: 145 },
    { id: 2, name: 'Clothing', count: 289 },
    { id: 3, name: 'Home & Garden', count: 167 },
    { id: 4, name: 'Sports', count: 98 },
  ];

  return (
    <Grid gap="gap-8">
      {categories.map(category => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{category.count} items</p>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}

// =============================================================================
// Example 8: Nested Grids
// Use for: Complex layouts with grids inside grids
// =============================================================================

export function NestedGridExample() {
  const sections = [
    {
      id: 1,
      title: 'Section A',
      items: [
        { id: 'a1', name: 'Item A1' },
        { id: 'a2', name: 'Item A2' },
      ],
    },
    {
      id: 2,
      title: 'Section B',
      items: [
        { id: 'b1', name: 'Item B1' },
        { id: 'b2', name: 'Item B2' },
      ],
    },
  ];

  return (
    <Grid gap="gap-6">
      {sections.map(section => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid gap="gap-3" minColumnWidth={150}>
              {section.items.map(item => (
                <div key={item.id} className="p-3 bg-muted rounded-md text-sm">
                  {item.name}
                </div>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}
