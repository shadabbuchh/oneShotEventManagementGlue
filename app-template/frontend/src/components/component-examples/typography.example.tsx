/**
 * Typography Component Examples
 *
 * This file contains multiple working examples of Typography components for consistent text styling.
 * Copy the example closest to your use case and adapt the content.
 */

import {
  Typography,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components';

// Destructure Typography components for easier access
const {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  Blockquote,
  InlineCode,
  List,
  OrderedList,
  ListItem,
} = Typography;

// =============================================================================
// Example 1: Headings Hierarchy
// Use for: Page titles, section headers, maintaining semantic structure
// =============================================================================

export function HeadingsExample() {
  return (
    <div className="space-y-4">
      <H1>Page Title (H1)</H1>
      <H2>Section Heading (H2)</H2>
      <H3>Subsection Heading (H3)</H3>
      <H4>Small Heading (H4)</H4>
    </div>
  );
}

// =============================================================================
// Example 2: Paragraph Text Variations
// Use for: Body text, descriptions, content blocks
// =============================================================================

export function ParagraphsExample() {
  return (
    <div className="space-y-4">
      <Lead>
        This is a lead paragraph. Use it for introductory text that should stand
        out.
      </Lead>
      <P>
        This is a regular paragraph with standard styling. It's perfect for body
        text and general content.
      </P>
      <Large>This is large text for emphasis without being a heading.</Large>
      <Small>
        This is small text for secondary information like disclaimers or notes.
      </Small>
      <Muted>This is muted text for de-emphasized content.</Muted>
    </div>
  );
}

// =============================================================================
// Example 3: Lists
// Use for: Bullet points, numbered steps, feature lists
// =============================================================================

export function ListsExample() {
  return (
    <div className="space-y-6">
      <div>
        <H3>Features</H3>
        <List>
          <ListItem>Fast performance</ListItem>
          <ListItem>Secure by default</ListItem>
          <ListItem>Easy to use</ListItem>
        </List>
      </div>

      <div>
        <H3>Installation Steps</H3>
        <OrderedList>
          <ListItem>Install dependencies</ListItem>
          <ListItem>Configure settings</ListItem>
          <ListItem>Run the application</ListItem>
        </OrderedList>
      </div>
    </div>
  );
}

// =============================================================================
// Example 4: Blockquote and Inline Code
// Use for: Quotations, code snippets, emphasis
// =============================================================================

export function BlockquoteAndCodeExample() {
  return (
    <div className="space-y-4">
      <Blockquote>
        "The best way to predict the future is to invent it."
        <br />
        <Small className="mt-2">— Alan Kay</Small>
      </Blockquote>

      <P>
        Use <InlineCode>npm install</InlineCode> to install packages, or run{' '}
        <InlineCode>npm run dev</InlineCode> to start the development server.
      </P>
    </div>
  );
}

// =============================================================================
// Example 5: Article Layout
// Use for: Blog posts, documentation, long-form content
// =============================================================================

export function ArticleLayoutExample() {
  return (
    <article className="space-y-6">
      <div>
        <H1>Getting Started with React</H1>
        <Muted>Published on October 1, 2024</Muted>
      </div>

      <Lead>
        React is a JavaScript library for building user interfaces. In this
        guide, we'll explore the fundamentals of React and how to get started.
      </Lead>

      <H2>What is React?</H2>
      <P>
        React is a declarative, efficient, and flexible JavaScript library for
        building user interfaces. It lets you compose complex UIs from small and
        isolated pieces of code called components.
      </P>

      <H3>Key Features</H3>
      <List>
        <ListItem>Component-based architecture</ListItem>
        <ListItem>Virtual DOM for performance</ListItem>
        <ListItem>One-way data binding</ListItem>
        <ListItem>Rich ecosystem</ListItem>
      </List>

      <H2>Installation</H2>
      <P>To create a new React app, run the following command:</P>
      <Blockquote>
        <InlineCode>npx create-react-app my-app</InlineCode>
      </Blockquote>
    </article>
  );
}

// =============================================================================
// Example 6: Card with Typography
// Use for: Feature cards, product descriptions, info boxes
// =============================================================================

export function CardTypographyExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Premium Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Lead>$99/month</Lead>
        <P>Everything you need to grow your business.</P>
        <H4>Features:</H4>
        <List>
          <ListItem>Unlimited projects</ListItem>
          <ListItem>Priority support</ListItem>
          <ListItem>Advanced analytics</ListItem>
          <ListItem>Custom integrations</ListItem>
        </List>
        <Small className="text-muted-foreground">
          Cancel anytime. No hidden fees.
        </Small>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// Example 7: Truncation Examples
// Use for: Limiting text overflow, maintaining layout
// =============================================================================

export function TruncationExample() {
  const longText =
    'This is a very long text that will be truncated to prevent layout issues and maintain a clean appearance in the user interface.';

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <H4>Single Line Truncation</H4>
        <P truncate={true}>{longText}</P>
      </div>

      <div>
        <H4>Multi-line Truncation (2 lines)</H4>
        <P truncate={2}>{longText}</P>
      </div>

      <div>
        <H4>Multi-line Truncation (3 lines)</H4>
        <P truncate={3}>{longText}</P>
      </div>

      <div>
        <H4>No Truncation (wrap)</H4>
        <P truncate="wrap">{longText}</P>
      </div>
    </div>
  );
}

// =============================================================================
// Example 8: Documentation Page Layout
// Use for: API docs, guides, technical documentation
// =============================================================================

export function DocumentationExample() {
  return (
    <div className="space-y-6">
      <div>
        <H1>API Reference</H1>
        <Muted>Complete API documentation</Muted>
      </div>

      <div>
        <H2>Authentication</H2>
        <P>
          All API requests require authentication using an API key. Include your
          API key in the request header:
        </P>
        <Blockquote>
          <InlineCode>Authorization: Bearer YOUR_API_KEY</InlineCode>
        </Blockquote>
      </div>

      <div>
        <H3>Get User</H3>
        <P>Retrieves information about a specific user.</P>

        <H4>Endpoint</H4>
        <InlineCode>GET /api/users/:id</InlineCode>

        <H4>Parameters</H4>
        <List>
          <ListItem>
            <InlineCode>id</InlineCode> - User ID (required)
          </ListItem>
        </List>

        <H4>Response</H4>
        <P>Returns a user object with the following fields:</P>
        <List>
          <ListItem>
            <InlineCode>id</InlineCode> - Unique identifier
          </ListItem>
          <ListItem>
            <InlineCode>name</InlineCode> - User's full name
          </ListItem>
          <ListItem>
            <InlineCode>email</InlineCode> - User's email address
          </ListItem>
        </List>
      </div>
    </div>
  );
}
