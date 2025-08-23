# Treasure-Home School Portal

A comprehensive full-stack school management portal built with React, Node.js, Express, and Supabase.

## Project Overview

Treasure-Home School Portal provides a complete solution for school management with role-based authentication and modular architecture. The system supports four user roles: Admin, Teacher, Student, and Parent, each with tailored dashboards and functionality.

**School Information:**
- Name: Treasure-Home School
- Motto: "Qualitative Education and Moral Excellence"
- Location: Seriki-Soyinka, Ifo, Ogun State

## Features

### Core Modules (Phase 1)
- **Authentication & Authorization**: Supabase-powered auth with role-based access
- **Announcements**: Create, read, update, delete announcements with audience targeting
- **Gallery**: Image management with Supabase Storage integration
- **Admin User Management**: Complete CRUD operations for user accounts
- **Contact Forms**: Message handling and communication

### Module Scaffolding (Future Development)
- **Online Exams**: Question bank and exam builder (structure ready)
- **Attendance Tracking**: Student attendance management (feature flagged)
- **Fee Management**: Payment tracking and billing (feature flagged)

### Role-Based Dashboards
- **Admin Dashboard**: User management, system statistics, full access
- **Teacher Dashboard**: Exam creation, announcement posting, class management
- **Student Dashboard**: Exam access, grade viewing, announcements
- **Parent Dashboard**: Child progress, announcements, communication

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Wouter for routing
- TanStack Query for data fetching
- Supabase client for authentication

### Backend
- Node.js with Express
- Supabase for database and authentication
- CORS middleware for cross-origin requests
- JWT verification middleware
- Multer for file uploads

### Database & Storage
- Supabase (PostgreSQL + Auth + Storage)
- Row Level Security policies
- Real-time subscriptions

## Local Development (Replit)

### Prerequisites
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Set up the database schema (see Database Setup below)
3. Configure environment variables

### Installation & Setup

1. **Clone the repository** (already done in Replit)

2. **Install dependencies** (already handled by Replit)

3. **Environment Variables**
   
   Copy the example files and fill in your values:
   ```bash
   cp .env.example .env
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   This starts both frontend (port 5000) and backend (port 8000) concurrently.

## Environment Variables

### Root .env
