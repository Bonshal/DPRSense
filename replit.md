# Intelligent Project Appraisal Platform

## Overview

This is an AI-powered Detailed Project Report (DPR) analysis and appraisal platform designed for government infrastructure projects. The application simulates intelligent analysis of DPR documents, providing comprehensive insights into project compliance, financial validation, risk assessment, and data extraction. Built as a demo platform for the Ministry of Development of North Eastern Region (MDoNER), it showcases how AI can streamline project appraisal workflows.

The platform features a complete authentication flow, document upload simulation, and a multi-view dashboard that presents analysis results across different dimensions - from compliance checklists to financial cross-validation and risk predictions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for client-side routing, providing a lightweight alternative to React Router. The application implements a multi-page flow: Login → Upload → Analyzing → Dashboard (with sub-routes).

**UI Component System**: Shadcn UI with Radix UI primitives, configured in "new-york" style. The design follows Carbon Design System principles with government dashboard patterns, emphasizing minimalism, professionalism, and data clarity. Components use a dark-mode-first approach with custom CSS variables for theming.

**State Management**: TanStack Query (React Query) for server state management, with a custom query client configured for API data fetching and caching. Form state is managed using React Hook Form with Zod validation.

**Styling**: Tailwind CSS with extensive customization for colors, borders, and elevation effects. Custom utility classes like `hover-elevate` and `active-elevate-2` provide consistent interaction feedback. Typography uses Inter for UI and JetBrains Mono for numerical data.

**Design Rationale**: The choice of Shadcn UI provides a complete component library with accessibility built-in, while Tailwind allows for precise design system implementation. The dark mode focus aligns with government dashboard aesthetics and reduces eye strain during extended analysis sessions.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript, using ESM modules throughout.

**API Structure**: RESTful API with clear separation between authentication (`/api/auth/*`) and data endpoints (`/api/dpr/*`). The server implements:
- POST `/api/auth/login` - Authentication endpoint
- GET `/api/dpr/analysis` - Retrieves DPR analysis data
- POST `/api/dpr/action` - Records user actions (approve/flag/reject)

**Data Storage**: In-memory storage implementation (`MemStorage` class) for demo purposes. The architecture is designed with an `IStorage` interface, making it straightforward to swap to a database-backed solution. Mock DPR analysis data is served from static fixtures to simulate AI processing results.

**Development Experience**: Custom Vite middleware integration for HMR (Hot Module Replacement) in development. The server uses conditional imports for Replit-specific plugins when running in that environment.

**Architecture Decision**: Express was chosen for its simplicity and widespread adoption, making the codebase accessible. The in-memory storage keeps the demo self-contained without external dependencies, while the interface-based design allows easy migration to persistent storage.

### Database Schema (Drizzle ORM Ready)

**ORM**: Drizzle ORM configured for PostgreSQL, though currently using in-memory storage.

**Schema Design** (defined but not actively used):
- `users` table: Simple authentication with id, username, and password fields
- Type-safe schema definitions using `drizzle-zod` for automatic Zod schema generation
- Migration support configured via `drizzle-kit` with output to `./migrations`

**Complex Data Types**: DPR analysis data uses rich TypeScript interfaces including:
- `ExtractedEntity`: Data points with source document references (page images, highlight boxes)
- `CompletenessItem`: Checklist tracking with Found/Not Found status
- `RiskPrediction`: Probability and severity level classification
- `Inconsistencies`: Financial cross-validation results

**Design Rationale**: Drizzle provides type-safe database operations with minimal overhead. The schema is kept simple for authentication while complex analysis data is handled through JSONB or separate normalized tables in production. The current mock implementation allows the UI to be fully functional without database setup.

### Form Validation & Type Safety

**Validation**: Zod schemas define the contract between client and server. Shared schemas in `@shared/schema.ts` ensure consistency:
- `loginSchema`: Username and password validation
- `actionSchema`: User action validation (approve/flag/reject with optional comments)
- Complex nested types for DPR analysis data structures

**Type Safety**: Full TypeScript coverage with strict mode enabled. Path aliases (`@/*`, `@shared/*`) provide clean imports. The `createInsertSchema` from `drizzle-zod` automatically generates insertion schemas from database tables.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Headless component primitives (accordion, dialog, dropdown, popover, etc.) providing accessibility and keyboard navigation out of the box
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority (cva)**: Type-safe component variants
- **cmdk**: Command palette component
- **Recharts**: Charting library (imported but ready for data visualization features)

### Development & Build Tools
- **Vite**: Frontend build tool and dev server with React plugin
- **esbuild**: Server-side bundling for production
- **TypeScript**: Type checking across the entire stack
- **PostCSS**: CSS processing with Autoprefixer

### Validation & Data Processing
- **Zod**: Schema validation and type inference
- **React Hook Form**: Form state management with Zod resolver integration
- **date-fns**: Date manipulation and formatting

### Database & Backend
- **@neondatabase/serverless**: PostgreSQL driver (configured for future use)
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **connect-pg-simple**: PostgreSQL session store (imported for future session management)

### Code Quality
- Path resolution configured for clean imports (`@/`, `@shared/`, `@assets/`)
- ESLint-ready structure with TypeScript-specific rules
- Incremental TypeScript compilation with build info caching

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Project structure visualization (dev only)
- **@replit/vite-plugin-dev-banner**: Development environment indicator (dev only)

These plugins are conditionally loaded only in development when running on Replit, ensuring clean production builds.