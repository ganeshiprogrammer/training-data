# Codebase Analyzer Agent — react-playwright-demo

> **Role:** Analyze this repository and generate two context artifacts for future AI SDLC agents.
> **Outputs only:** `docs/ai/project-context.md` and `docs/ai/context-map.json`
> **Safety:** Never modify application code. Never overwrite `governance-agent.md` or `story-analyzer.md`.

---

## 1. Agent Role & Responsibility

- Inspect the repository to understand its current state, stack, conventions, and boundaries.
- Produce a compact, human-readable `docs/ai/project-context.md` that future agents can read in seconds.
- Produce a compact, machine-readable `docs/ai/context-map.json` that tools can ingest.
- **Scope limit:** You may only create or update the two paths above. No other file creation, no code edits, no config changes.
- If the two output paths already exist, overwrite them with freshly derived content.

---

## 2. High-Signal Inspection Targets

Focus on these files and folders. Do **not** walk every file.

**At a glance (read first):**
- `package.json` — dependencies, scripts, type module flag
- `vite.config.js` — build tool and plugins
- `eslint.config.js` — lint rules and style hints
- `playwright.config.ts` — test runner settings, base URL, webServer command
- `index.html` — entry point and title
- `.github/workflows/playwright.yml` — CI setup

**Architecture (read next):**
- `src/main.jsx` — React root, StrictMode, global CSS import
- `src/App.jsx` — router setup, route table
- `src/pages/*.jsx` — top-level pages and their imports
- `src/components/*.jsx` — component patterns, props, `data-testid` usage, styling approach

**Tests (sample, do not inventory every spec):**
- `tests/*.spec.ts` and `tests/*.spec.js` — test patterns, POM usage, locator strategy

**Config / ignored files (note presence, do not dump contents):**
- `.gitignore` — ignored build/test artifacts
- `README.md` — note if it contains project info or is empty

**Skip or ignore:**
- `node_modules/`, `dist/`, `.git/`, `tests/screenshots/`
- Any dead/known-unused files (e.g., `src/components/dashboard.jsx`) — mention them as dead code only

---

## 3. Detecting Project Architecture

Use this fast triage:

1. **Framework:** React SPA confirmed by `react`, `react-dom`, `react-router-dom` in `dependencies` and `main.jsx` using `createRoot`.
2. **Router:** `BrowserRouter` with `<Routes>` in `App.jsx`. Expect route entries there.
3. **Build:** Vite (`vite`, `@vitejs/plugin-react`). Check `vite.config.js` for plugins or aliases.
4. **Language:** JavaScript + JSX (`type: "module"`, `.jsx` files, `ecmaVersion: 2020`). No TypeScript in source.
5. **Tests:** Playwright E2E (`@playwright/test`). Check `playwright.config.ts` for projects, baseURL, and webServer command.
6. **State:** No external state library. Look for `useState`, `useReducer`, or context in pages/components.
7. **API/Backend:** None wired. Data is static/mock arrays inside components. If `fetch`/axios appears later, note it.
8. **Styling:** Inline `style` props are dominant. Note if `index.css` (global variables) or `App.css` (unused Vite template leftovers) are present.

---

## 4. Capturing Coding Conventions

From the source, record only **project-specific** patterns. Skip generic React advice.

- **Component exports:** `export default function ComponentName(...)` — function components only.
- **File naming:** Components are PascalCase `.jsx`. Utility/helpers would be camelCase (none exist yet).
- **Strings:** JSX and strings use **double quotes** in existing code. Match that.
- **Semicolons:** Present in most files. Preserve that style.
- **Test locators:** Every interactive/test-targeted element **must** have `data-testid` in kebab-case with descriptive prefixes (e.g., `stat-card-revenue`, `activity-user-1`).
- **Dead code awareness:** There is a known unused file `src/components/dashboard.jsx` (lowercase, unreferenced). Do not treat it as active source.
- **Filename mismatch:** `src/components/StateCard.jsx` is imported as `StatCard` in `Dashboard.jsx`. Note this if it still exists; do not “fix” it during analysis.

---

## 5. Deriving Dependency & Framework Patterns

- Read `package.json` to confirm the stack, but **do not paste dependency lists** into `project-context.md`.
- Summarize in 1–2 bullets per category:
  - *Runtime:* React 19 + React Router DOM 7. No Redux, no axios, no UI framework.
  - *Build:* Vite 8 with standard React plugin.
  - *Lint:* ESLint 9 flat config, `no-unused-vars` is error, hooks/refresh plugins active.
  - *Test:* Playwright 1.59+ with Chromium/Firefox/WebKit projects.
- If new dependencies have been added since the last analysis, mention the category change briefly (e.g., “Added `zod` for validation”) rather than listing versions.

---

## 6. Summarizing Cross-Cutting Concerns (Compactly)

For each area, capture **only what is true and specific to this repo**.

### API / Service Layer
- No backend API wired. Data is static arrays inside `src/pages/Dashboard.jsx`.
- Playwright tests include API mocking examples in `dashboard-advanced.spec.js` (commented/demo only).

### State Management
- React `useState` only. No Redux, Zustand, or Context used currently.
- Local component state for UI toggles (e.g., notification dropdown) and search filtering.

### Routing
- `BrowserRouter` in `App.jsx`. Current routes: `/` → `/dashboard`, `/dashboard`.
- Add new routes in `App.jsx` and create the corresponding page in `src/pages/`.

### Styling
- **Primary:** inline `style` props on JSX elements.
- **Secondary:** `src/index.css` defines CSS variables and light/dark `color-scheme` media queries; imported globally in `main.jsx`.
- `src/App.css` exists but is **not imported** by `App.jsx` (Vite template leftover). Do not recommend using it.
- No Tailwind, styled-components, or CSS modules.

### Validation
- No forms or validation libraries currently.
- If validation appears later, mention the library and where it is applied.

### Testing
- Playwright E2E in `tests/`.
- Locators: `data-testid` only. No CSS-class or DOM-structure selectors.
- POM pattern demonstrated in `dashboard-advanced.spec.js`.
- Screenshots write to `tests/screenshots/`.
- `npm run lint` and `npx playwright test` are the validation commands.

### Build / Deployment
- `npm run dev` (Vite dev server on 5173), `npm run build`, `npm run preview`.
- GitHub Actions workflow runs Playwright on push/PR to `main`/`master`.
- No deployment config (Netlify/Vercel/Docker) present.

---

## 7. Project-Specific Rules for Future Agents

Extract these from the code and from `governance-agent.md`. Keep bullets short.

- **Do not add new runtime dependencies** without explicit justification.
- **Do not switch styling approach** away from inline `style` props.
- **Do not remove or rename `data-testid` values** without updating Playwright references.
- **Do not create new top-level source folders** (`src/hooks/`, `src/utils/`, etc.) without approval.
- **Do not delete known dead code** (e.g., `dashboard.jsx`) unless the task explicitly calls for cleanup.
- **Preserve the existing folder structure** (`src/components/`, `src/pages/`, `tests/`).
- **Run `npm run lint` after any code change** and fix errors before finishing.
- **All new interactive elements must have `data-testid` attributes** and corresponding Playwright assertions.
- **Match existing quote style and semicolon usage.**
- **Do not modify config files** (`vite.config.js`, `eslint.config.js`, `playwright.config.ts`) unless the task explicitly requires it.
- Reference `.opencode/agents/governance-agent.md` and `.opencode/agents/_sdlc-rules.md` for full governance and shared operational rules. Do not repeat them in outputs.

---

## 8. Output Formats

### 8.1 `docs/ai/project-context.md`

- **Word budget:** Target under 2,000 words; hard maximum 5,000 words. Prefer under ~15,000 characters.
- **Style:** Concise bullets. No full file summaries. No full directory inventories. No large code snippets. No pasted package/config contents.
- **Do not repeat governance** — reference `.opencode/agents/governance-agent.md` instead.
- **Required headings** (exact or very close):

```markdown
# Project Context

## Stack

## Commands

## Folder Map

## Architecture Rules

## Testing Rules

## Styling and Component Rules

## Common Paths

## Deeper Docs

## Agent Notes
```

- **Deeper Docs:** link to deeper documentation if present (e.g., `README.md`, `docs/`). If none, write `None found`.
- **Agent Notes:** short do/don’t bullets for future SDLC agents. Reference governance instead of repeating it.

### 8.2 `docs/ai/context-map.json`

- Single valid JSON object. No comments. No markdown fences in the file. No long prose fields. No full file inventory.
- Compact JSON only.
- Use `schemaVersion: 1`.
- Standard shape:

```json
{
  "schemaVersion": 1,
  "projectName": "react-playwright-demo",
  "agentEntryPoints": {
    "governance": ".opencode/agents/governance-agent.md",
    "projectContext": "docs/ai/project-context.md",
    "contextMap": "docs/ai/context-map.json"
  },
  "stack": {
    "framework": "React",
    "language": "JavaScript + JSX",
    "router": "react-router-dom",
    "buildTool": "Vite",
    "testFramework": "Playwright",
    "linting": "ESLint 9 flat config"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "npx playwright test"
  },
  "keyPaths": {
    "entry": "src/main.jsx",
    "router": "src/App.jsx",
    "pages": "src/pages/",
    "components": "src/components/",
    "tests": "tests/",
    "config": {
      "vite": "vite.config.js",
      "eslint": "eslint.config.js",
      "playwright": "playwright.config.ts"
    }
  },
  "conventions": {
    "components": "PascalCase .jsx",
    "tests": "*.spec.ts or *.spec.js",
    "locators": "data-testid kebab-case"
  },
  "notes": [
    "Inline style props are the established styling pattern.",
    "data-testid attributes are mandatory for testable elements.",
    "No backend API; data is static/mock only."
  ]
}
```

- Empty strings and empty arrays are acceptable when unknown.

---

## 9. Safety & Scope Rules

- **Read-only analysis.** Do not edit, delete, or create any application source file, config file, or test file.
- **Only two outputs:** `docs/ai/project-context.md` and `docs/ai/context-map.json`. Create the `docs/ai/` directories if needed.
- **No unrelated files:** Do not create READMEs, CHANGELOGs, or other artifacts.
- **Protected files:** Do not overwrite `.opencode/agents/governance-agent.md` or `.opencode/agents/story-analyzer.md`.
- If you detect conflicting or missing information, document it in `project-context.md` under `## Agent Notes` rather than guessing or changing code.
