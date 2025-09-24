# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a modern portfolio landing page built with Next.js 15, TypeScript, and Tailwind CSS v4. The project uses the new App Router architecture and incorporates shadcn/ui components with Radix UI primitives for consistent, accessible UI components.

## Development Commands

### Core Development
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint with Next.js configuration

### Package Management
- `npm install` - Install dependencies
- `npm install <package>` - Add new dependency
- `npm install -D <package>` - Add development dependency

## Architecture & Structure

### Framework Stack
- **Next.js 15** with App Router (src/app directory)
- **TypeScript** for type safety
- **Tailwind CSS v4** with PostCSS for styling
- **shadcn/ui** component library with Radix UI primitives
- **Framer Motion** for animations
- **Lucide React** for icons

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/
│   ├── portfolio/         # Feature-specific components
│   │   ├── Hero.tsx       # Landing hero section
│   │   ├── About.tsx      # About section
│   │   ├── Projects.tsx   # Projects showcase
│   │   └── Contact.tsx    # Contact form
│   └── ui/                # Reusable UI components (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
└── lib/
    └── utils.ts           # Utility functions (cn helper)
```

### Key Architectural Patterns

#### Component Organization
- **Feature-based structure**: Portfolio components grouped in `components/portfolio/`
- **UI components**: Reusable components in `components/ui/` following shadcn/ui patterns
- **Utility functions**: Centralized in `lib/utils.ts` with `cn()` helper for class merging

#### Styling System
- **Tailwind CSS v4** with custom theme configuration
- **CSS Variables**: Design tokens defined in globals.css with light/dark theme support
- **Component variants**: Using `class-variance-authority` for type-safe component variants
- **Responsive design**: Mobile-first approach with md/lg breakpoints

#### TypeScript Configuration
- **Path aliases**: `@/*` maps to `src/*` for cleaner imports
- **Strict mode**: Enabled for better type safety
- **Next.js plugin**: Integrated for App Router support

### Component Patterns

#### shadcn/ui Integration
The project uses shadcn/ui components configured with:
- **Style**: "new-york" variant
- **Base color**: Slate
- **CSS variables**: Enabled for theme customization
- **RSC**: React Server Components enabled

#### Class Name Management
Uses `cn()` utility function combining `clsx` and `tailwind-merge` for:
- Conditional class application
- Tailwind class conflict resolution
- Type-safe class composition

### Development Workflow

#### Adding New Components
1. For UI components: Use shadcn/ui CLI or follow existing patterns in `components/ui/`
2. For feature components: Add to `components/portfolio/` with consistent naming
3. Use TypeScript interfaces for props and maintain type safety

#### Styling Guidelines
- Use Tailwind utility classes primarily
- Leverage CSS variables for theme-aware colors
- Follow responsive design patterns (mobile-first)
- Use consistent spacing scale (Tailwind defaults)

#### File Import Patterns
- Use `@/` alias for src directory imports
- Group imports: React, Next.js, then local components
- Use named exports for components and utilities

### Environment Setup

#### Node.js Version
Project uses Node.js features compatible with Next.js 15 requirements.

#### Package Manager
The project uses npm (evidenced by package-lock.json).

### Common Development Patterns

#### Component Structure
```typescript
import React from 'react';
// Other imports

interface ComponentProps {
  // Props definition
}

export default function Component({ ...props }: ComponentProps) {
  return (
    // Component JSX
  );
}
```

#### Responsive Design
- Mobile-first approach with `md:` and `lg:` prefixes
- Consistent grid layouts using `grid md:grid-cols-2 lg:grid-cols-3`
- Responsive typography scaling

#### Animation Integration
Framer Motion is available for complex animations, though current implementation uses CSS transitions.