# BusTrack — Bus Tracking and Ticketing System

A modern web application for managing bus transportation, built with React, Vite, and Tailwind CSS. It supports three user roles: **Passenger**, **Driver**, and **Admin**.

## Features

### Passenger
- Search and browse available trips
- Interactive seat selection and booking
- View and manage tickets
- Real-time bus tracking
- Submit feedback

### Driver
- View assigned trips
- Update trip status (Not Started → In Progress → Completed)
- Access tracking interface

### Admin
- Dashboard with system overview
- Manage buses (add, edit, delete)
- Manage routes
- Manage trips and schedules

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) | UI framework |
| [Vite 5](https://vitejs.dev) | Build tool & dev server |
| [TypeScript 5](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [React Router 6](https://reactrouter.com) | Client-side routing |
| [Axios](https://axios-http.com) | HTTP client |
| [Leaflet](https://leafletjs.com) + [React Leaflet](https://react-leaflet.js.org) | Map & bus tracking |
| [Recharts](https://recharts.org) | Dashboard charts |
| [shadcn/ui](https://ui.shadcn.com) | UI component library |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Form handling & validation |
| [TanStack React Query](https://tanstack.com/query) | Server state management |
| [Lucide React](https://lucide.dev) | Icons |
| [Sonner](https://sonner.emilkowal.dev) | Toast notifications |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
npm run dev
# or
bun dev
```

The app will start at **http://localhost:8080**.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

### Quick Login (Mock Auth)

The app uses mock authentication. Log in with any email to test different roles:

| Email contains | Role assigned |
|----------------|---------------|
| `admin` | Admin |
| `driver` | Driver |
| anything else | Passenger |

Password can be any non-empty string.

### Example Flows

1. **Passenger**: Register or log in → Browse trips → Select seats → Book → View tickets
2. **Driver**: Log in with a "driver@" email → View assigned trips → Update trip status
3. **Admin**: Log in with an "admin@" email → Manage buses, routes, and trips

## Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ui/           # shadcn/ui components
├── contexts/         # React context providers (Auth)
├── hooks/            # Custom React hooks
├── layouts/          # Page layout wrappers
├── pages/
│   ├── passenger/    # Passenger pages (Dashboard, Trips, Booking, etc.)
│   ├── driver/       # Driver pages
│   └── admin/        # Admin pages (ManageBuses, ManageRoutes, etc.)
└── lib/              # Utility functions
```

## License

This project is for educational purposes.
