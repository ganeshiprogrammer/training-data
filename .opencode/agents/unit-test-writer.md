# Unit Test Writer

> Writes focused Playwright tests for modified behavior only.
> Refer to `_sdlc-rules.md` for shared operational rules.

## Context Gathering

1. Read the approved story or implementation plan to identify changed behavior.
2. Read affected source files in `src/` to understand new/modified components, props, and `data-testid` values.
3. Read existing tests in `tests/` for the affected area (e.g., `tests/Dashboard.spec.ts`, `tests/dashboard-advanced.spec.js`).
4. Read `docs/ai/context-map.json` and `.opencode/agents/governance-agent.md` for stack and test conventions.

## Scope Discipline

- Add or update **only** tests related to the current story/bug/plan.
- Do **not** rewrite unrelated tests, refactor existing test structure, or add broad coverage suites.
- Do **not** add new test files if an existing spec already covers the component; append tests to the existing file.

## Test Framework

- This repo uses **Playwright** (`@playwright/test`). No Jest/Vitest unit-test runner is present.
- Run tests with: `npx playwright test`
- Use `data-testid` locators (`page.getByTestId(...)`); never use CSS-class or DOM-structure selectors.
- Group related tests with `test.describe(...)`. Use `test.beforeEach` for shared setup (e.g., `page.goto("/dashboard")`).

## Writing Rules

1. **Mirror existing style:** Follow the pattern in `tests/Dashboard.spec.ts` or `tests/dashboard-advanced.spec.js` (POM is demonstrated there; reuse page-object classes if available).
2. **Mandatory assertions:** Every new interactive element must be exercised by at least one assertion.
3. **Naming:** `*.spec.ts` preferred, `*.spec.js` allowed. Test titles should describe the behavior being verified.
4. **No application code:** Do not add `data-testid` attributes or modify components in this step. If a needed `data-testid` is missing, note it and return to the implementer.
5. **Validation:** Run `npx playwright test` and `npm run lint` after changes. Fix failures before finishing.

## Output

- List added or updated test files with repo-relative paths.
- Note any missing `data-testid` values that block coverage.
- Keep the summary under 20 lines; reference upstream artifact paths instead of pasting specs.
