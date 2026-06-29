# Protocol Tracker

A full-stack wellness protocol management application for tracking supplement regimens, health symptoms, lab values, and protocol progress over time. Built for individuals managing complex, multi-stage health protocols who need a structured way to log, visualize, and reflect on their progress.

---

## Features

### Protocol Management
- Create and manage multiple health protocols, each with a name, description, and goal
- Organize protocols into sequential stages (e.g. Stage 1 → Stage 2 → Stage 3)
- Set stage start dates and status (Active, Complete, Paused)
- View all active protocols at a glance from the dashboard

### Supplement Tracking
- Attach supplements to specific protocol stages
- Record dosage, frequency, and timing for each supplement
- View the full supplement schedule for any given stage

### Symptom & Daily Log Entries
- Log how you feel day-to-day tied to a specific stage
- Track energy, digestion, mood, pain, or any custom symptom category
- View a timeline of log entries per stage to identify trends

### Lab Value Tracking
- Record lab panel results (test name, value, unit, date)
- Set custom reference ranges and flag out-of-range values
- Visualize lab values over time with line charts per biomarker
- Associate results with a specific protocol for context

### Notes & Journal
- Write freeform journal entries tied to a protocol or standalone
- Useful for recording observations, reactions to supplements, or clinical notes

### Dashboard
- Overview of all active protocols and their current stage
- Recent log entries and upcoming stage transitions
- Sparkline health trend per protocol

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) (App Router) | Full-stack React framework with server-side rendering and API routes |
| [TypeScript](https://www.typescriptlang.org/) | Static typing across the entire codebase |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for rapid UI development |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible, composable component library built on Radix UI |
| [TanStack Query](https://tanstack.com/query) | Server state management, caching, and data synchronization |
| [React Hook Form](https://react-hook-form.com/) | Performant form state management with minimal re-renders |
| [Zod](https://zod.dev/) | TypeScript-first schema validation for forms and API payloads |
| [Recharts](https://recharts.org/) | Composable charting library for lab value visualizations |

### Backend
| Technology | Purpose |
|---|---|
| Next.js API Routes | Server-side REST endpoints colocated with the frontend |
| [Prisma ORM](https://www.prisma.io/) | Type-safe database client with schema migrations |
| [PostgreSQL](https://www.postgresql.org/) | Relational database for all application data |

### Developer Tooling
| Technology | Purpose |
|---|---|
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | Code linting and formatting |
| [Vitest](https://vitest.dev/) | Unit testing for utilities and business logic |
| [Docker](https://www.docker.com/) | Local PostgreSQL database via Docker Compose |

---

## Database Schema

```
Protocol
  ├── id, name, description, goal, createdAt, updatedAt
  │
  ├── Stage[]
  │     ├── id, name, description, startDate, status, order
  │     ├── Supplement[]
  │     │     └── id, name, dosage, frequency, timing, notes
  │     └── LogEntry[]
  │           └── id, date, energyLevel, symptoms, notes
  │
  ├── LabResult[]
  │     └── id, testName, value, unit, referenceMin, referenceMax, date, flagged
  │
  └── Note[]
        └── id, title, content, date
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Docker (for local PostgreSQL)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/GrassHopper12345/protocol-tracker.git
cd protocol-tracker

# Install dependencies
npm install

# Start PostgreSQL via Docker
docker compose up -d

# Copy environment variables
cp .env.example .env

# Run Prisma migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/protocol_tracker"
```

---

## Project Structure

```
protocol-tracker/
├── app/                    # Next.js App Router pages and layouts
│   ├── dashboard/          # Dashboard overview page
│   ├── protocols/          # Protocol list and detail pages
│   │   └── [id]/
│   │       └── stages/     # Stage detail and log entry views
│   ├── labs/               # Lab value logging and charts
│   ├── notes/              # Journal/notes pages
│   └── api/                # Next.js API route handlers
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui base components
│   ├── protocols/          # Protocol-specific components
│   ├── labs/               # Lab chart and table components
│   └── forms/              # Form components with RHF + Zod
├── lib/                    # Utilities, Prisma client, helpers
├── hooks/                  # Custom React hooks (TanStack Query)
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history
└── types/                  # Shared TypeScript types
```

---

## Roadmap

- [ ] Export protocol summary as PDF
- [ ] Supplement interaction notes
- [ ] Reminder/notification system for dosing schedules
- [ ] Lab value trend analysis and annotations
- [ ] Mobile-responsive kiosk view for daily logging

---

## Background

This project was built out of a personal need to manage complex, multi-stage supplement and health protocols for family members with unique physiological considerations. The goal was a structured alternative to spreadsheets and handwritten notes — something that could track both the *plan* (protocol stages and supplements) and the *outcome* (symptoms, lab values, daily observations) in one place.
