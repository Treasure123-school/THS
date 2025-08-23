# Treasure-Home School Portal

## Overview

Treasure-Home School Portal is a comprehensive full-stack school management system built with React, Node.js, Express, and designed for future Supabase integration. The application serves Treasure-Home School in Seriki-Soyinka, Ifo, Ogun State, with the motto "Qualitative Education and Moral Excellence."

The system features role-based authentication supporting four user types (Admin, Teacher, Student, Parent) with dedicated dashboards and functionality. Core modules include announcements, gallery management, contact forms, and user administration, with scaffolding in place for future exam systems, attendance tracking, and fee management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite build tooling
- **Styling**: TailwindCSS with shadcn/ui component library using the "new-york" style
- **Routing**: Wouter for client-side navigation with protected routes
- **State Management**: TanStack Query for server state and data fetching
- **UI Components**: Radix UI primitives with custom styling via CSS variables

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Database**: Currently using in-memory storage with planned migration to PostgreSQL via Drizzle ORM
- **Authentication**: Session-based authentication (prepared for Supabase JWT integration)
- **API Design**: RESTful endpoints with role-based access control
- **Middleware**: CORS, authentication middleware, and role guards for route protection

### Data Architecture
- **Schema Definition**: Centralized schema in `/shared/schema.ts` using Drizzle ORM and Zod validation
- **Storage Layer**: Abstract storage interface with in-memory implementation for development
- **Database Tables**: Profiles, announcements, gallery, question bank, exams, and related tables
- **File Storage**: Prepared for Supabase Storage integration for gallery images and documents

### Authentication & Authorization
- **Role-Based Access**: Four-tier role system (admin, teacher, student, parent)
- **Route Protection**: Protected routes with role-specific access controls
- **Session Management**: Server-side session handling with planned JWT integration
- **Permission System**: Role guards and middleware for API endpoint protection

### Modular Feature System
- **Feature Flags**: Configurable feature toggles for exam system, fee management, attendance tracking
- **Modular Components**: Separate service layers for announcements, gallery, admin functions, and auth
- **Dashboard Architecture**: Role-specific dashboards with customized content and permissions
- **Extensible Design**: Prepared scaffolding for future modules without breaking existing functionality

### Development & Deployment
- **Monorepo Structure**: Single repository with client/server separation
- **Build System**: Vite for frontend, esbuild for backend production builds
- **Development Setup**: Hot reload, error overlay, and Replit integration
- **Production Ready**: Configured for Vercel (frontend) and Render (backend) deployment

## External Dependencies

### Database & Storage
- **PostgreSQL**: Production database via Drizzle ORM (currently using in-memory storage)
- **Supabase**: Planned integration for authentication, database, and file storage
- **Drizzle Kit**: Database migrations and schema management

### Authentication
- **Supabase Auth**: Future integration for user authentication and session management
- **JWT**: Token-based authentication for API access (prepared)

### UI & Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **TailwindCSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Pre-built component library with consistent styling

### File Management
- **Supabase Storage**: Image and document storage for gallery and user uploads (planned)
- **Multer**: File upload middleware for handling multipart form data

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **ESLint/Prettier**: Code formatting and linting (configured)
- **Vite Plugins**: Runtime error overlay and development tooling for Replit

### Third-party Services
- **Email Service**: Prepared integration for contact forms and notifications
- **Payment Processing**: Scaffolded for future fee management system
- **Analytics**: Ready for integration of user activity tracking