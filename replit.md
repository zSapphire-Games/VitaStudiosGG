# Vita Studios Website

## Overview

This is a premium marketing website for Vita Studios, a high-end indie game development studio. The project showcases the studio's portfolio, team, and provides a contact mechanism for potential clients and collaborators. Built with React, Express, and styled using Tailwind CSS with shadcn/ui components, the site emphasizes cinematic aesthetics inspired by Apple's Human Interface Guidelines with a gaming industry twist.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type safety and modern component patterns
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing

**UI & Styling:**
- Tailwind CSS for utility-first styling with custom design tokens
- shadcn/ui component library (New York variant) providing pre-built, accessible React components
- Framer Motion for animations and scroll-based interactions
- Design philosophy: Premium minimalism with cinematic gaming aesthetics, drawing from Apple HIG principles

**State Management & Data Fetching:**
- TanStack Query (React Query) for server state management, caching, and API request handling
- React Hook Form with Zod validation for type-safe form management
- Custom query client configured with specific error handling and stale time policies

**Component Structure:**
- Single-page application with a home page featuring multiple sections (Hero, About, Projects, Team, Contact)
- Modular component architecture using shadcn/ui primitives
- Path aliases configured for clean imports (`@/` for client code, `@shared/` for shared types)

### Backend Architecture

**Server Framework:**
- Express.js running in ESNext module mode
- TypeScript for type safety across the entire stack
- Custom middleware for request logging and JSON response tracking

**API Design:**
- RESTful endpoints under `/api` prefix
- Contact form submission endpoint (`POST /api/contact`) with validation
- Contact retrieval endpoint (`GET /api/contact`) for viewing submissions
- Zod schema validation using shared schemas between client and server

**Data Layer:**
- Currently using in-memory storage (`MemStorage` class) for contact submissions
- Drizzle ORM configured for PostgreSQL with schema defined in `shared/schema.ts`
- Database schema includes `contact_submissions` table with fields for name, email, message, and timestamps
- Migration setup configured but using memory storage as current implementation

**Development Workflow:**
- Hot module replacement in development via Vite middleware integration
- Separate build steps for client (Vite) and server (esbuild)
- Production mode serves static client assets from Express

### Design System

**Color Palette:**
- Light mode primary with pure white backgrounds and pure black text
- Celestial blue accent color (HSL: 210 100% 60%) for interactive elements
- Subtle shadows at 3-5% opacity for depth
- CSS custom properties for theming with HSL color space

**Typography:**
- System font stack for performance and native feel
- Responsive font sizing (64-72px hero titles on desktop, 36-42px on mobile)
- Line height of 1.6 for optimal readability

**Spacing & Layout:**
- Consistent spacing scale using Tailwind's 4px-based system
- Container max-width of 7xl with responsive padding
- Generous section spacing (py-20 to py-32 on desktop, py-12 on mobile)

## External Dependencies

### Third-Party UI Libraries
- **Radix UI Primitives**: Comprehensive set of unstyled, accessible component primitives (accordion, dialog, dropdown, popover, etc.)
- **Framer Motion**: Animation library for scroll effects, entrance animations, and interactive transitions
- **Embla Carousel**: Carousel/slider component for project showcases

### Form & Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library for runtime type checking
- **@hookform/resolvers**: Integration layer between React Hook Form and Zod

### Data & API
- **TanStack Query**: Server state management and data fetching
- **@neondatabase/serverless**: PostgreSQL driver optimized for serverless environments (configured but not actively used)
- **Drizzle ORM**: TypeScript ORM for PostgreSQL with type-safe queries
- **drizzle-zod**: Integration for generating Zod schemas from Drizzle schemas

### Development Tools
- **Vite**: Build tool and dev server with HMR
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS & Autoprefixer**: CSS processing pipeline
- **@replit/vite-plugin-***: Replit-specific development plugins for enhanced DX

### Utility Libraries
- **clsx & tailwind-merge**: Conditional className utilities
- **class-variance-authority**: Type-safe variant API for component styling
- **date-fns**: Date manipulation and formatting
- **lucide-react**: Icon library

### Session & Storage
- **connect-pg-simple**: PostgreSQL session store for Express (configured for future use)