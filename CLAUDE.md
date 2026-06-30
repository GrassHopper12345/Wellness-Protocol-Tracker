# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Protocol Tracker is a full-stack Next.js 14 (App Router) application for tracking supplement regimens, health symptoms, lab values, and protocol progress. The backend is Next.js API routes + Prisma ORM + PostgreSQL.

## Setup

```bash
npm install
docker compose up -d          # Start PostgreSQL
cp .env.example .env
npx prisma migrate dev        # Run migrations
npx prisma db seed            # Optional: seed data
npm run dev                   # Start dev server at localhost:3000
```

**Required env var:**
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/protocol_tracker"
```

## Common Commands

```bash
npm run dev           # Development server
npm run build         # Production build
npm run lint          # ESLint
npx prisma studio     # Database GUI
npx prisma migrate dev --name <name>   # Create a new migration
npx vitest            # Run all tests
npx vitest run <path> # Run a single test file
```

## Architecture

### Data Model

The core hierarchy is `Protocol → Stage → (Supplement[], LogEntry[])`. Protocols also have top-level `LabResult[]` and `Note[]`. See `prisma/schema.prisma` for the authoritative schema.

### API Layer

API routes live in `app/api/` and follow Next.js App Router conventions (`route.ts` files). They use Prisma directly — no separate service layer.

### Frontend Data Fetching

Client components use **TanStack Query** hooks from `hooks/` to fetch from the API routes. Server components fetch directly via Prisma where appropriate. Forms use **React Hook Form** + **Zod** schemas for validation — Zod schemas should be shared between the form and the corresponding API route for consistency.

### Component Organization

- `components/ui/` — shadcn/ui primitives (do not modify these directly; use `npx shadcn-ui@latest add <component>` to add new ones)
- `components/protocols/`, `components/labs/`, etc. — feature-specific composite components
- `components/forms/` — form components wiring RHF + Zod + shadcn/ui inputs

### Lab Value Charts

Lab visualizations use **Recharts** and live in `components/labs/`. Each biomarker gets a line chart; reference range bounds are rendered as reference lines.
