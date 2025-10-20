# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Escala de Acólitos is a Catholic church scheduling system for altar servers (acólitos) and acolytes. This is a Next.js 15 frontend MVP built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Development Commands

### Core Development
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

### Dependencies
- `npm install` - Install all dependencies
- `yarn install` - Alternative package manager

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with CSS variables
- **Components**: shadcn/ui with "new-york" style
- **Icons**: Lucide React
- **Theme**: next-themes with light/dark mode support

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard area
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── acolitos/      # Manage altar servers
│   │   ├── scales/        # Manage schedules
│   │   └── layout.tsx     # Admin layout with AdminSidebar
│   ├── acolito/           # Altar server area
│   │   ├── dashboard/     # Personal dashboard
│   │   ├── scales/        # View personal schedules
│   │   ├── perfil/        # Personal profile
│   │   └── layout.tsx     # User layout with AcolitoSidebar
│   ├── login/             # Authentication
│   ├── register/          # User registration
│   ├── layout.tsx         # Root layout with theme provider
│   └── globals.css        # Global Tailwind styles
├── components/
│   ├── admin-sidebar.tsx  # Navigation for admin area
│   ├── acolito-sidebar.tsx # Navigation for user area
│   ├── theme-provider.tsx # Dark/light theme provider
│   └── ui/               # shadcn/ui components
└── lib/
    └── utils.ts          # Utility functions (cn for className merging)
```

### Key Architectural Patterns

**Dual-Area Application**: Two distinct user experiences with separate layouts:
- **Admin Area** (`/admin/*`) - Church administrators manage altar servers and schedules
- **User Area** (`/acolito/*`) - Altar servers view their assignments and profile

**Layout System**: 
- Root layout provides theme support and global UI (Toaster)
- Admin and user areas have dedicated layouts with specialized sidebars
- Each area has its own navigation structure and styling

**Component Organization**:
- Shared UI components in `components/ui/` (shadcn/ui)
- Role-specific components at component root level
- TypeScript path mapping with `@/*` alias for clean imports

**Styling Architecture**:
- Tailwind CSS with CSS variables for theming
- shadcn/ui component system with customizable variants
- Consistent design language across admin and user interfaces

### Navigation Structure

**Admin Routes**:
- `/admin/dashboard` - Overview and statistics
- `/admin/acolitos` - Altar server management
- `/admin/scales` - Schedule creation and management
- `/admin/configuracoes` - Settings

**User Routes**:
- `/acolito/dashboard` - Personal dashboard with upcoming masses
- `/acolito/escalas` - View personal schedule assignments
- `/acolito/perfil` - Personal profile management
- `/acolito/configuracoes` - User settings

### Development Notes

**Current State**: This is an MVP frontend-only application. Authentication and data persistence are simulated with mock data.

**TypeScript Configuration**: Uses strict mode with `@/*` path mapping to `./src/*`. Next.js plugin enabled for optimal development experience.

**Styling Approach**: shadcn/ui components with Tailwind CSS v4, using CSS variables for consistent theming. Components follow "new-york" style variant.

**Component Patterns**: Extensive use of Lucide React icons, consistent navigation patterns between admin and user areas, and responsive design considerations.