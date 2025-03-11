# K-Skeleton: Personal Website

A personal website built with SvelteKit to showcase projects and publications.

## Technologies

- SvelteKit
- TypeScript
- Bun
- NocoDB for data storage

## Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Start with automatic browser opening
bun run dev -- --open
```

## Production Build

```bash
# Build the project
bun run build

# Preview the build
bun run preview
```

## Deployment

For deployment on VPS with Nginx, `svelte-adapter-bun` is used.

```bash
# Run on server
bun ./build/index.js
```

## Project Structure

- `src/` - source code
  - `routes/` - routes and pages
  - `lib/` - components and utilities
- `static/` - static files
- `build/` - compiled production code

## License

All rights reserved © Borys Kharchenko (but feel free to use the code for your own projects 🙃)
