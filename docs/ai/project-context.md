# Project Context

## Stack
- React 19 SPA + React Router DOM 7
- Vite 8 (build tool)
- JavaScript + JSX (ES2020+, ESM, `type: "module"`)
- Playwright 1.59+ (E2E tests)
- ESLint 9 flat config

## Commands
- `npm run dev` — Vite dev server (port 5173)
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — ESLint check
- `npx playwright test` — run E2E tests
- Note: `playwright.config.ts` webServer uses `npm run start`, but `package.json` does not define a `start` script. Use `npm run dev` for local serving.

## Folder Map
- `src/main.jsx` — entry point (StrictMode, global `index.css`)
- `src/App.jsx` — BrowserRouter, route table
- `src/pages/` — top-level route pages (PascalCase `.jsx`)
- `src/components/` — reusable React components (PascalCase `.jsx`)
- `tests/` — Playwright specs (`*.spec.ts`, `*.spec.js`)
- `public/` — static assets
- `.github/workflows/playwright.yml` — CI

## Architecture Rules
- Function components only; export default pattern.
- No external state library (React `useState` only).
- No backend API wired; all data is static/mock inside components.
- Router: `BrowserRouter` in `App.jsx`. Current routes: `/` → `/dashboard`, `/dashboard`.
- Add new routes in `App.jsx` and create matching page in `src/pages/`.
- Dead code: `src/components/dashboard.jsx` (lowercase, unreferenced). Do not touch unless cleanup is in scope.
- Filename mismatch: `src/components/StateCard.jsx` is exported as `StatCard` and imported as such in `Dashboard.jsx`.

## Testing Rules
- Playwright E2E in `tests/`.
- Locators must use `data-testid` (kebab-case) — no CSS-class or DOM-structure selectors.
- Page Object Model (POM) pattern demonstrated in `tests/dashboard-advanced.spec.js`.
- Screenshot outputs go to `tests/screenshots/` (gitignored preferred).
- Every new interactive element must have a `data-testid` and at least one Playwright assertion exercising it.
- CI runs on push/PR to `main`/`master` via GitHub Actions.

## Styling and Component Rules
- Primary styling: inline `style` props on JSX elements.
- Secondary: `src/index.css` defines CSS variables and light/dark color-scheme media queries; imported globally in `main.jsx`.
- `src/App.css` exists but is **not imported** (Vite template leftover).
- No Tailwind, styled-components, or CSS modules.
- Components live in `src/components/` or `src/pages/` only.
- `data-testid` naming: kebab-case with descriptive prefix (e.g., `stat-card-revenue`, `activity-user-1`).

## Common Paths
- Entry: `src/main.jsx`
- Router: `src/App.jsx`
- Dashboard page: `src/pages/Dashboard.jsx`
- Components: `src/components/Sidebar.jsx`, `src/components/StateCard.jsx`, `src/components/RecentActivity.jsx`
- Tests: `tests/Dashboard.spec.ts`, `tests/dashboard-advanced.spec.js`, `tests/example.spec.ts`
- Config: `vite.config.js`, `eslint.config.js`, `playwright.config.ts`

## Deeper Docs
- `README.md` — nearly empty (only `# training-data`). No additional docs found.

## Agent Notes
- Read `.opencode/agents/governance-agent.md` and `.opencode/agents/_sdlc-rules.md` before making changes.
- Do not add new runtime dependencies without explicit justification.
- Do not create new top-level source folders (`src/hooks/`, `src/utils/`, etc.) without approval.
- Do not modify config files (`vite.config.js`, `eslint.config.js`, `playwright.config.ts`) unless the task requires it.
- Do not switch styling away from inline `style` props.
- Do not remove or rename existing `data-testid` values without updating all Playwright references.
- Run `npm run lint` after any code change and fix errors before finishing.
- Match existing quote style (double quotes in JSX/strings) and semicolon usage.
