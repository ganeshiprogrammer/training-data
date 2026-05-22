## Source
- Story key: `TS-05`
- Spec: `docs/ai/stories/TS-05/spec.md`
- Handoff: `.opencode/executions/exec-2b6ede48-f718-49f9-8966-687151b71cd8/handoffs/story_analyzer.json`
- Context: `docs/ai/context-map.json` + `docs/ai/project-context.md` (stack, conventions)
- Governance: `.opencode/agents/governance-agent.md`

## Target Files
| File | Action |
|------|--------|
| `src/mock/activeUsersMetrics.js` | **CREATE** — new constants file (new directory `src/mock/`) |
| `src/components/ActiveUsersOverview.jsx` | **CREATE** — new widget component |
| `src/pages/Dashboard.jsx` | **MODIFY** — import + render new component after line 210 |
| `tests/Dashboard.spec.ts` | **MODIFY** — add new `test.describe` block |

## Steps

### Step 1 — Create `src/mock/activeUsersMetrics.js`
- Create directory `src/mock/` (does not exist yet).
- Default-export an array of exactly 6 objects: `{ timeBlock, userCount, trend }`.
- Data values (matching "Active Users" stat card value = `3,842`):
  | timeBlock | userCount | trend |
  |---|---|---|
  | 12:00 AM - 04:00 AM | 1,240 | Stable |
  | 04:00 AM - 08:00 AM | 892 | Upward |
  | 08:00 AM - 12:00 PM | 2,840 | Peak |
  | 12:00 PM - 04:00 PM | 3,842 | Peak |
  | 04:00 PM - 08:00 PM | 2,156 | Downward |
  | 08:00 PM - 12:00 AM | 1,670 | Stable |
- `userCount` stored as Number (not string); comma-formatting done at render time.
- No `useState` — plain `export default` array.

### Step 2 — Create `src/components/ActiveUsersOverview.jsx`
- Import `activeUsersMetrics` from `../mock/activeUsersMetrics.js`.
- Compute peak block dynamically: `Math.max(...data.map(d => d.userCount))`, then find the matching block object for the peak indicator text.
- Render structure (all inline styles per spec UI Notes):
  - `<section data-testid="active-users-section">` — container card (`background: "#fff"`, `borderRadius: "12px"`, `padding: "20px 24px"`, `boxShadow`, `border`, `marginTop: "24px"`).
  - `<h2 data-testid="active-users-title">` — "Active Users Overview" (identical heading style to "Recent Activity").
  - Peak indicator `<p data-testid="active-users-peak">` — "Peak traffic: {peakBlock.timeBlock} ({peakBlock.userCount.toLocaleString()} users)" with muted styling.
  - `.map()` over the 6 entries — each row as a `<div>` with `data-testid="active-users-row-{index}"`.
  - Each row contains three children:
    - Time label `<span data-testid="active-users-block-{index}">` — `fontSize: "14px"`, `fontWeight: 600`.
    - User count `<span data-testid="active-users-count-{index}">` — comma-formatted via `.toLocaleString()`, `fontSize: "16px"`, `fontWeight: 700`.
    - Trend badge `<span data-testid="active-users-trend-{index}">` — pill shape; `"Peak"` gets `color: "#4f46e5"`, `background: "#eef2ff"`; all others get `color: "#6b7280"`, `background: "#f3f4f6"`.
  - Row separators: `borderBottom: "1px solid #f1f3f9"` on all but last row.
- Peak detection logic: use `Array.prototype.reduce` or `Math.max` + `find` — no `useState`, no `useEffect`.

### Step 3 — Modify `src/pages/Dashboard.jsx`
- Add import: `import ActiveUsersOverview from "../components/ActiveUsersOverview";`
- Insert `<ActiveUsersOverview />` as a self-closing tag **after** line 210 (`<RecentCustomers />`) inside `<main>`.
- Do **not** modify any other imports, state, or JSX in this file.

### Step 4 — Modify `tests/Dashboard.spec.ts`
- Append a new `test.describe("Dashboard - Active Users Overview", ...)` block before the screenshots group (or at end of file, before the last describe).
- `test.beforeEach` navigates to `/dashboard`.
- Required test cases:
  1. **Widget section and title visible** — `active-users-section` and `active-users-title` with text "Active Users Overview".
  2. **Peak indicator visible** — `active-users-peak` contains the peak block label and "3,842".
  3. **Exactly 6 rows render** — locator `[data-testid^="active-users-row-"]` has count 6.
  4. **Row 0 (12:00 AM - 04:00 AM)** — verify block text, count text ("1,240"), trend text ("Stable"), gray badge style via `toHaveCSS("color", "rgb(107, 114, 128)")`.
  5. **Row 3 (12:00 PM - 04:00 PM)** — verify block text, count text ("3,842"), trend text ("Peak"), indigo badge style via `toHaveCSS("color", "rgb(79, 70, 229)")`.
  6. **Cross-verify count** — `active-users-count-3` value "3,842" equals `stat-value-users` value "3,842".
- All locators use `data-testid` only — no CSS class or DOM structure selectors.

### Step 5 — Validation
- Run `npm run lint` — fix any ESLint errors from new/changed files.
- Run `npm run build` — ensure Vite build succeeds.
- Run `npx playwright test tests/Dashboard.spec.ts` — ensure all existing + new tests pass.

## Data/API Notes
- **No network calls.** Component sync-imports a static JS array. No fetch, axios, or XHR.
- Mock data uses `userCount` as Number. Comma formatting via `.toLocaleString("en-US")`.
- Peak `3,842` in 12:00 PM - 04:00 PM block — matches Dashboard.jsx stat card value line 24.

## UI Notes
- Placement: Full-width section under `<RecentCustomers />` in the single-column stack (matches pattern from TS-03).
- Container card styling matches `StateCard.jsx` pattern: white bg, `borderRadius: "12px"`, `padding: "20px 24px"`, `boxShadow`, `border`.
- Heading matches "Recent Activity" style: `fontSize: "18px"`, `fontWeight: 600`, `color: "#1a1d2e"`, `marginBottom: "16px"`.
- Trend badge pill styling identical to `RecentCustomers.jsx` status badge shape: `padding: "2px 10px"`, `borderRadius: "12px"`, `fontSize: "12px"`, `fontWeight: 600`.
- Row layout: flex-row with 3 inline regions (time label / user count / trend badge), `padding: "12px 0"`, `borderBottom` separators.
- All styling inline — no CSS modules, no stylesheet changes.

## Tests
- **Existing file modified:** `tests/Dashboard.spec.ts` — append new describe block (see Step 4).
- **Manual check:** Open browser DevTools Network tab, filter fetch/XHR — zero requests during widget render.
- **Optional:** Add screenshot test capturing the new widget section to `tests/screenshots/`.

## Risks
1. **Peak accent color ambiguity:** Spec open question: both "Peak" rows vs only the max row. **Resolution per spec:** both "Peak" entries use accent (`#4f46e5` / `#eef2ff`). If reviewer disagrees, revert non-max Peak row to gray.
2. **`toHaveCSS` color format:** Playwright returns computed colors as `rgb(...)`. Test assertions must use `rgb(79, 70, 229)` not `#4f46e5`.
3. **`src/mock/` directory does not exist.** The `mkdir -p` command is needed before creating the file.
4. **Dead code `src/components/dashboard.jsx`** — do not touch per governance rules.
5. **`StatCard.jsx` vs `StateCard.jsx`** known filename mismatch; do not fix here.

## Context Budget
- Read-only context needed: `src/pages/Dashboard.jsx` (insertion point lines 209-211), `tests/Dashboard.spec.ts` (existing describe patterns), `src/components/RecentCustomers.jsx` (peer component pattern), `src/components/StateCard.jsx` (card styling reference).
- **Do NOT read:** `src/components/Sidebar.jsx`, `src/App.jsx`, `src/main.jsx`, `src/App.css`, `src/index.css`, `eslint.config.js`, `vite.config.js`, `playwright.config.ts` — these are unchanged.
- **Do NOT read/write:** `src/components/dashboard.jsx` (dead code, untouched).
- Focus reads on: `src/mock/` (new file), `src/components/ActiveUsersOverview.jsx` (new file), changes to Dashboard.jsx (2 lines), test additions (~70 lines).
