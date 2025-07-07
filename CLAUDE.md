# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with SvelteKit 5 and TypeScript. The site showcases projects and serves as a professional portfolio for Borys Kharchenko. It uses NocoDB as a headless CMS for content management and is deployed using Bun runtime.

## Common Commands

### Development
- `bun install` - Install dependencies
- `bun run dev` - Start development server
- `bun run devlocal` - Start development server with local network access
- `bun run dev -- --open` - Start development server and open browser

### Build and Deploy
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun ./build/index.js` - Run production build on server

### Code Quality
- `bun run check` - Run TypeScript and Svelte checks
- `bun run check:watch` - Run checks in watch mode
- `bun run lint` - Run linting (Prettier + ESLint)
- `bun run format` - Format code with Prettier

### Testing
- `bun run test` - Run Playwright tests (requires build first)

## Architecture and Key Technologies

### Core Stack
- **Svelte 5** with new runes system for reactive state
- **SvelteKit** for full-stack framework with file-based routing
- **TypeScript** for type safety
- **Bun** as runtime and package manager
- **NocoDB** as headless CMS for project data
- **svelte-adapter-bun** for production deployment

### Project Structure
```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── types.ts        # TypeScript type definitions
│   └── ...
├── routes/
│   ├── +layout.svelte  # Global layout
│   ├── +page.svelte    # Homepage
│   ├── api/projects/   # API endpoints
│   ├── projects/       # Project pages
│   │   ├── +page.server.js
│   │   └── [slug]/     # Dynamic project pages
│   ├── cats/           # Cats page
│   ├── misc/           # Miscellaneous page
│   └── showcase/       # Showcase page
static/                 # Static assets
personal/projects/      # Project content (aliased as $projects)
```

### Key Design Patterns

#### Data Fetching
- Uses SvelteKit's `load` functions for server-side data fetching
- API routes in `src/routes/api/` follow REST conventions
- NocoDB integration for dynamic content management

#### Routing
- File-based routing with SvelteKit conventions
- Dynamic routes using `[slug]` pattern for project pages
- Server-side load functions for data fetching

#### Styling
- **NO Tailwind CSS** - uses global CSS and component-scoped styles
- Global styles in `src/routes/styles.css`
- Component-specific styles in `.svelte` files

## Environment Configuration

### Required Environment Variables
- `NOCODB_URL` - NocoDB instance URL
- `NOCODB_API_KEY` - NocoDB API token

### Configuration Files
- `svelte.config.js` - SvelteKit configuration with Bun adapter
- `vite.config.ts` - Vite configuration with path aliases
- `tsconfig.json` - TypeScript configuration
- `playwright.config.ts` - Testing configuration

## Development Guidelines

### Code Style
- Use descriptive variable names following Svelte/SvelteKit conventions
- Prefer server-side rendering and static generation
- Optimize for performance and minimal JavaScript bundle size
- Use Svelte 5 runes for reactive state management

### Component Organization
- Components in `src/lib/components/`
- Use `.svelte` files for components
- Props for data passing
- Reactive declarations for local state

### Data Management
- Project data fetched from NocoDB API
- Type definitions in `src/lib/types.ts`
- Server-side data loading preferred over client-side

### Performance Optimization
- Leverage Svelte's compile-time optimizations
- Use `{#key}` blocks for forced re-rendering when needed
- Implement code splitting through dynamic imports
- Optimize images and assets

## Important Notes

- The project uses Bun runtime instead of Node.js
- NocoDB serves as the content management system
- Global CSS is preferred over CSS frameworks
- The site is optimized for SEO and performance
- All project content is managed through NocoDB API

## Aliases and Paths

- `$lib` → `./src/lib`
- `$projects` → `./personal/projects`
- Static assets served from `static/` directory