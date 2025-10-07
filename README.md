# Event Management System

A full-stack TypeScript application for comprehensive event management, built with React, Fastify, and PostgreSQL.

## 🏗️ Architecture Overview

This application follows a modern, type-safe architecture with automatic API contract generation from OpenAPI specifications.

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  • TypeScript + React 19 + Vite                             │
│  • TanStack Query for data fetching                         │
│  • Tailwind CSS + shadcn/ui components                      │
│  • Auto-generated API clients from OpenAPI                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ HTTP/REST API
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    Backend (Fastify)                         │
│  • TypeScript + Fastify 5                                   │
│  • OpenAPI-driven routing with fastify-openapi-glue        │
│  • Drizzle ORM for type-safe database access               │
│  • Service/Repository pattern architecture                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ PostgreSQL Protocol
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    Database (PostgreSQL)                     │
│  • PostgreSQL 15+                                           │
│  • Type-safe migrations with Drizzle Kit                    │
│  • Automated schema generation from TypeScript              │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
app-template/
├── frontend/               # React application
│   ├── src/
│   │   ├── apis/          # Auto-generated API clients
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── styles/        # Global styles
│   └── vite.config.ts     # Vite configuration
│
├── backend/                # Fastify API server
│   ├── src/
│   │   ├── app.ts         # Application setup
│   │   ├── server.ts      # Server entry point
│   │   ├── db/
│   │   │   ├── schema/    # Drizzle schema definitions
│   │   │   └── migrations/# Database migrations
│   │   ├── handlers/      # OpenAPI route handlers
│   │   ├── services/      # Business logic layer
│   │   ├── repositories/  # Data access layer
│   │   └── plugins/       # Fastify plugins
│   └── drizzle.config.ts  # Drizzle ORM configuration
│
├── openapi/                # API specification
│   ├── openapi_spec.yaml  # OpenAPI 3.1 specification
│   ├── types/             # Generated TypeScript types
│   └── orval.config.ts    # API client generation config
```

## ✨ Key Features

### Event Management

- **Event Lifecycle**: Create, publish, archive, and manage events
- **Session Management**: Organize multi-session events with speakers and schedules
- **Attendee Registration**: Public registration forms with customizable fields
- **Check-in System**: Real-time attendee check-in with search and filtering
- **Capacity Management**: Track and enforce event capacity limits

### Technical Features

- **Type Safety**: End-to-end TypeScript with shared types via OpenAPI
- **API Contract**: OpenAPI 3.1 specification with automatic validation
- **Real-time Updates**: Optimistic UI updates with background synchronization
- **Responsive Design**: Mobile-first UI with adaptive layouts
- **Developer Experience**: Hot reload, automatic type generation, and comprehensive tooling

## 📋 Prerequisites

- **Node.js** >= 22.17.1
- **pnpm** ~10.14.0
- **PostgreSQL** 15+
- **Caddy** (optional, for unified development server)

## 🛠️ Development

### API Development Workflow

1. **Define API Contract**: Edit `openapi/openapi_spec.yaml`
2. **Generate Types**: Run `pnpm run gen:handlers` in root
3. **Implement Handlers**: Update service handlers in `backend/src/handlers/`
4. **Frontend Integration**: Types and hooks auto-generated in `frontend/src/apis/`

### 📝 API Documentation

The API follows OpenAPI 3.1 specification. Key endpoints:

- `POST /api/v1/users/register` - Register new user
- `GET /api/v1/events` - List events with filtering
- `POST /api/v1/events` - Create new event
- `GET /api/v1/events/{id}` - Get event details
- `PUT /api/v1/events/{id}` - Update event

**Full API documentation available in `openapi/openapi_spec.yaml`**

## 🏗️ Architecture Patterns

### Backend Architecture

The backend follows a **layered architecture**:

1. **Plugins Layer**: Fastify plugins for cross-cutting concerns
2. **Handlers Layer**: HTTP request handling and validation
3. **Services Layer**: Business logic and orchestration
4. **Repositories Layer**: Data access and persistence
5. **Database Layer**: PostgreSQL with Drizzle ORM

### Frontend Architecture

The frontend uses a **component-based architecture**:

1. **Pages**: Route-level components
2. **Components**: Reusable UI components (shadcn/ui based)
3. **Hooks**: Custom React hooks for logic reuse
4. **APIs**: Auto-generated API clients from OpenAPI
5. **Stores**: Zustand for client-side state management

### Type Safety Flow

```
OpenAPI Spec → TypeScript Types → Backend Handlers
     ↓                               ↓
Frontend Clients ← API Contract ← Type Validation
```


### Database Schema

The application uses the following main entities:

- **Users**: System users and administrators
- **Events**: Event definitions with metadata
- **Sessions**: Event sessions with schedules
- **Attendees**: Event registrations and check-ins
