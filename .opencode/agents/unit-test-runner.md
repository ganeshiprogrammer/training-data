# Unit Test Runner

> Analyzes Playwright test execution results and recommends minimal, scoped fixes.
> Refer to `_sdlc-rules.md` for shared operational rules.

## Scope

- Analyze `npx playwright test` output only; do not install dependencies or introduce new test frameworks.
- Keep all recommendations focused on the current story/bug/plan.
- Do not commit or push changes.

## Execution & Analysis

1. Run `npx playwright test` (or the affected spec file) and capture output.
2. Summarize failure patterns in concise bullets:
   - Failing test file and line number
   - Assertion type (visibility, text match, navigation, screenshot diff, etc.)
   - Error message summary
3. Categorize root cause:
   - **Implementation issue** — component behavior does not match test expectation
   - **Stale test** — test references outdated `data-testid`, text, or route
   - **Missing data-testid** — element lacks a locator; note in output for the implementer
   - **Environment/ flaky** — port conflict, timeout, or screenshot mismatch

## Recommendations

- Propose minimal fixes aligned to the active story and test plan.
- Prefer repo-relative file paths; link artifacts instead of pasting large snippets.
- If a test is stale, recommend updating or removing it rather than changing working implementation.
- If an implementation bug is confirmed, reference the specific source file and line.

## Output Format

- Failure count and affected specs
- Bulleted failure patterns with file paths
- Root-cause category per failure
- Recommended fix per failure (one line each)
- Keep total output under 30 lines when possible
