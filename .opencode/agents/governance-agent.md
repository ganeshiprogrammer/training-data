# Governance Agent — react-playwright-demo

> Strict AI development rules for this repository.
> Refer to `_sdlc-rules.md` for shared operational rules that apply to all agents.

---

## 1. Project Type & Technology Assumptions

| Layer | Technology | Version (major) |
|-------|-----------|-----------------|
| Framework | React (SPA) | 19 |
| Router | react-router-dom | 7 |
| Build Tool | Vite | 8 |
| Language | JavaScript (ES2020+) + JSX | — |
| Test Framework | Playwright | 1.59+ |
| Linting | ESLint 9 flat config | — |
| Package Manager | npm | — |

**Key assumptions:**
- This is a **single-page dashboard demo** with React components and Playwright end-to-end tests.
- No backend API is wired up; data is static/mock only.
- No CSS framework is in use (Tailwind, styled-components, etc. are **not** present).
- `type: "module"` is set in `package.json` — all source files use ESM (`import`/`export`).

---

## 2. Code Quality Rules

### 2.1 Style & Formatting
- **Match existing code style** exactly. Do not introduce Prettier, EditorConfig, or formatting changes unless explicitly requested.
- Use **double quotes** for JSX attributes and strings if surrounding code does.
- Use **semicolons** where the existing code uses them.
- Use **inline styles** (`style={{ ... }}`) for component styling — this is the established pattern. Do not add CSS modules, Tailwind, or styled-components.

### 2.2 Linting
- Run `npm run lint` after any code change and fix all errors before finishing.
- ESLint rules to respect:
  - `no-unused-vars` is `error` (with `varsIgnorePattern: '^[A-Z_]'`).
  - `react-hooks` and `react-refresh` plugin rules are active.
- Do not disable ESLint rules inline unless the task explicitly requires it.

### 2.3 Naming
- React components: **PascalCase** files and exports (`StatCard.jsx`, `Dashboard.jsx`).
- Utility/helper files: **camelCase**.
- Test files: `*.spec.ts` or `*.spec.js` in the `tests/` directory.
- `data-testid` attributes: **kebab-case** with descriptive prefixes (`stat-card-revenue`, `activity-user-1`).

---

## 3. Architecture Rules

### 3.1 Folder Structure
Preserve the existing layout. Do not reorganize folders.

```
src/
  components/     — Reusable React components (PascalCase .jsx)
  pages/          — Top-level route pages (PascalCase .jsx)
  assets/         — Static images, SVGs
  App.jsx         — Root router setup
  main.jsx        — Entry point (StrictMode)
tests/
  *.spec.ts       — Playwright tests (TypeScript preferred)
  *.spec.js       — Playwright tests (JavaScript allowed)
  screenshots/    — Playwright screenshot outputs (gitignored preferred)
public/           — Static assets served at root
```

### 3.2 Component Patterns
- Use **function components** with hooks. No class components.
- Export components as `export default function ComponentName(...)`.
- Keep components in `src/components/` or `src/pages/` — no new top-level folders without approval.
- Every interactive or test-targeted element **must** have a `data-testid` attribute. This is non-negotiable for Playwright stability.

### 3.3 Routing
- `BrowserRouter` is initialized in `App.jsx`. All route additions go through `App.jsx`.
- Only `/dashboard` is currently routable. New pages require a route entry and a corresponding page component.

### 3.4 Dead Code
- There is a known unused file: `src/components/dashboard.jsx` (lowercase, unreferenced). Do not delete or modify it unless the task explicitly calls for cleanup.
- Do not create duplicate or placeholder components that mirror existing ones.

---

## 4. Security Rules

- **No secrets in code.** Never hardcode API keys, tokens, or credentials in `.jsx`, `.js`, `.ts`, or config files.
- **No new network dependencies.** Do not add axios, fetch wrappers, or backend SDKs unless explicitly required.
- **No eval or dangerous HTML injection.** `dangerouslySetInnerHTML` is banned unless explicitly justified.
- **Validate all user-facing inputs** if you add forms; sanitize before rendering.
- Keep dependencies minimal. The project is intentionally lightweight.

---

## 5. Testing Expectations

### 5.1 Playwright Conventions
- Tests live in `tests/`.
- Use `data-testid` locators (`page.getByTestId(...)`) — never rely on CSS classes or DOM structure for selectors.
- Group related tests with `test.describe("...", () => { ... })`.
- Use `test.beforeEach` for shared setup (e.g., `page.goto("/dashboard")`).
- For large test suites, follow the **Page Object Model (POM)** pattern as demonstrated in `tests/dashboard-advanced.spec.js`.

### 5.2 Test Coverage Requirements
- Any new UI component or page **must** have corresponding Playwright visibility and interaction tests.
- Any new `data-testid` you add must be exercised in at least one test assertion.
- Screenshot tests should write to `tests/screenshots/`.

### 5.3 Running Tests
- Before finishing, ensure the dev server can start (`npm run dev`) and tests can run (`npx playwright test`).
- The Playwright config expects the dev server at `http://localhost:5173`. Do not change the base URL unless the task requires it.

---

## 6. File / Folder Modification Rules

- **Create files only when necessary.** Reuse existing components, utilities, and tests.
- **Do not modify** `package.json`, `vite.config.js`, `eslint.config.js`, or `playwright.config.ts` unless the task explicitly requires it.
- **Do not create** new top-level folders (`src/hooks/`, `src/utils/`, `src/services/`, etc.) without explicit justification.
- **Do not modify** `tests/screenshots/` artifacts directly; let Playwright generate them.
- **Do not touch** `.git/`, `.github/workflows/` unless updating CI is part of the task.
- If you create a new file, add it to the appropriate existing folder.

---

## 7. Dependency Usage Rules

### 7.1 Current Dependency Lock
| Category | Packages |
|----------|----------|
| Runtime | `react`, `react-dom`, `react-router-dom` |
| Dev | `vite`, `@vitejs/plugin-react`, `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `@playwright/test`, `@types/node`, `@types/react`, `@types/react-dom` |

### 7.2 Adding Dependencies
- **Forbidden without explicit approval:** Any new runtime dependency.
- **Allowed with caution:** Type definitions (`@types/*`) and dev-only tooling if the task requires it.
- Before adding anything to `dependencies` or `devDependencies`, verify the same functionality cannot be achieved with existing tools.
- Always run `npm install` and ensure `package-lock.json` is updated if you do add a dependency.

---

## 8. Review Checklist

Before declaring any task complete, verify:

- [ ] `npm run lint` passes with zero errors.
- [ ] `npm run build` completes successfully.
- [ ] Playwright tests pass (`npx playwright test`) or the affected tests are updated and passing.
- [ ] No unused variables or imports were introduced.
- [ ] All new interactive elements have `data-testid` attributes.
- [ ] No new files were created outside existing folders without justification.
- [ ] No unrelated files were modified.
- [ ] No secrets or hardcoded credentials were added.
- [ ] The change is minimal and scoped to the task.

---

## 9. Instructions for Future AI Agents

1. **Read first, write second.** Use `ctx_read`, `ctx_search`, and `ctx_tree` to understand the codebase before making changes.
2. **Follow the inline-style pattern.** This project uses inline `style` props, not external CSS.
3. **Preserve testability.** Every user-facing element needs a `data-testid`. Playwright tests depend on them.
4. **Keep it simple.** This is a demo/teaching project. Over-engineering (state management libraries, design systems, monorepo tooling) is inappropriate.
5. **Report known issues.** If you discover a mismatch (e.g., `StateCard.jsx` filename vs `StatCard` import name), document it in your summary but do not fix it unless the task scope includes cleanup.
6. **Do not run git mutations** (commit, push, rebase) unless explicitly instructed.
7. **When in doubt, ask.** Report invalid assumptions or missing requirements immediately rather than guessing.

---

## 10. Rules to Prevent Unsafe, Unnecessary, or Unrelated Changes

| Risk | Prevention Rule |
|------|-----------------|
| **Scope creep** | If the task is "fix search bug," do not also refactor the sidebar or rename components. |
| **Dependency bloat** | Never add lodash, axios, Redux, Material UI, Tailwind, or similar unless the task literally says "add X." |
| **Style inconsistency** | Do not switch to CSS modules, SCSS, or CSS-in-JS. Continue inline styles. |
| **Test breakage** | Do not remove or rename existing `data-testid` values. If you must, update all Playwright references. |
| **Build breakage** | Do not change `vite.config.js` or `playwright.config.ts` defaults without a strong reason. |
| **Dead code proliferation** | Do not create placeholder/duplicate components. If you create a component, use it. |
| **Security leaks** | Never commit `.env`, keys, or mock credentials in source files. |
| **Git pollution** | Do not create empty commits, merge conflicts, or rebase without explicit instruction. |

---

> **Last updated:** 2026-05-21
> **Owner:** AI Governance Agent for `react-playwright-demo`
