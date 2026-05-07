# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm start` → serves at http://localhost:4200 with hot reload
- **Build (prod):** `npm run build`
- **Build (watch):** `npm run watch`
- **Tests:** `npm test` — uses Vitest + jsdom (not Karma/Jasmine)

## Architecture

Angular 21 standalone application — no NgModule pattern anywhere. Bootstrap is via `bootstrapApplication()` in `src/main.ts` with `appConfig` from `src/app/app.config.ts`.

### Key Files
- `src/app/app.ts` — root component; imports feature components directly
- `src/app/app.config.ts` — global providers (router, error listeners)
- `src/app/app.routes.ts` — route definitions (currently empty)
- `src/models/expediente.ts` — `Expediente` interface (id, nombre, estado, fechaCreacion)

### Feature: Bandeja (Work Tray)
`src/app/bandeja/` — the only feature component. Manages a list of `Expediente` records:
- State lives entirely in the component (no services, no NgRx)
- Persistence via `localStorage` (load on `ngOnInit`, save on every mutation)
- Uses `FormsModule` for `[(ngModel)]` two-way binding

## Code Style
- Prettier: 100-char line width, single quotes, Angular HTML parser (`.prettierrc`)
- TypeScript strict mode — all strict checks enabled including `noImplicitReturns` and `noImplicitOverride`
- Angular template strict checking (`strictTemplates: true`)
- Standalone components only — never use NgModule
