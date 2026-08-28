Reading the context pack and context map, then pulling in handoff/spec only if needed for accurate target files.
Reading full content from the context pack and handoff files.
Inspecting Dashboard layout and RecentActivity styling patterns.
# TS-02 Implementation Plan: Recent Customers Widget

## Goal

Add a **Recent Customers** widget to the AdminPro Dashboard with three mock customer rows (avatar initials, name, email, status badge). Data is local/static only—no API calls. Visual and structural patterns should mirror **Recent Activity**.

## Current State (from inspection)

- `src/pages/Dashboard.jsx`: metrics grid (`data-testid="stats-grid"`), then a full-width **Recent Activity** section (`data-testid="activity-section"`) rendering `<RecentActivity activities={filteredActivities} />`.
- `src/components/RecentActivity.jsx`: white card rows, circular avatar (`#4f46e5`), bold primary + muted secondary text, `data-testid` per row (`activity-item-{id}`, etc.).
- No customer widget or two-column widget row exists yet.

## Placement Decision

Use a **two-column widget row** below the stats grid:

- Left: existing Recent Activity (unchanged behavior, including search filter).
- Right: new Recent Customers widget.

Use CSS grid with `gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"` and `gap: "24px"` so desktop/laptop shows side-by-side and narrower viewports stack. This satisfies the spec’s “alongside Recent Activity” option without removing activity from the page.

## Implementation Steps

### 1. Create `RecentCustomers` component

**File:** `src/components/RecentCustomers.jsx`

- Export default `RecentCustomers({ customers })` (prop-driven for testability; mock array can live in Dashboard).
- Define mock data constant in Dashboard (see step 2) matching spec:

| Field | Values |
|-------|--------|
| 1 | David Jones, DJ, david.j@example.com, Active |
| 2 | Emma Watson, EW, emma.w@example.com, Active |
| 3 | Frank Miller, FM, f.miller@example.com, Pending |

- Mirror **Recent Activity** row styling:
  - Outer list: `listStyle: "none"`, column `gap: "12px"`.
  - Row card: `background: "#fff"`, `borderRadius: "10px"`, `padding: "14px 20px"`, `border: "1px solid #f1f3f9"`, `boxShadow: "0 1px 3px rgba(0,0,0,0.04)"`, flex row with `gap: "16px"`.
  - Avatar: 40×40 circle, initials, brand blue (`#3b82f6` or match activity `#4f46e5`).
  - Name: `fontWeight: 600`, `fontSize: "14px"`, `color: "#1a1d2e"`.
  - Email: `fontSize: "13px"`, `color: "#6b7280"`.
  - Status badge: compact pill on the right (replace activity “time” slot).

- Status styling helper (inline, no new CSS files):
  - **Active:** green text/background (e.g. `#166534` on `#dcfce7` or similar).
  - **Pending:** yellow/orange (e.g. `#92400e` on `#fef3c7`).

- Required `data-testid` (kebab-case):
  - `recent-customers-widget` (root/section wrapper inside component or on section in Dashboard)
  - `customer-list`
  - `customer-item-{id}`
  - `customer-avatar-{id}`
  - `customer-name-{id}`
  - `customer-email-{id}`
  - `customer-status-{id}`

- No `fetch`, `axios`, or effects for data loading.

### 2. Wire into Dashboard page

**File:** `src/pages/Dashboard.jsx`

- `import RecentCustomers from "../components/RecentCustomers"`.
- Add `const customers = [ ... ]` (3 records from spec) near existing `activities` constant.
- Below `stats-grid`, replace the single full-width activity block with a widgets container, e.g. `data-testid="dashboard-widgets"`:
  - Grid/flex layout for two children.
  - **Activity column:** keep `data-testid="activity-section"`, title “Recent Activity”, search count, `<RecentActivity activities={filteredActivities} />`.
  - **Customers column:** new `data-testid="customers-section"`, `h2` title **Recent Customers**, `<RecentCustomers customers={customers} />`.
- Do **not** filter customers by `searchQuery` (out of scope).
- Do **not** modify `Sidebar`, `StateCard`, or dead `src/components/dashboard.jsx`.

### 3. Responsiveness

- Widget row uses `auto-fit` / `minmax` so columns stack on smaller widths.
- Avoid fixed pixel widths on the widget row; let children use `minWidth: 0` if flex overflow appears.

### 4. Tests (recommended, not blocking unless your stage requires them)

If adding coverage, extend `tests/Dashboard.spec.ts` only—follow existing `data-testid` locator style:

- Widget title visible (“Recent Customers”).
- Exactly 3 `[data-testid^="customer-item-"]` rows.
- Status text/colors for Active vs Pending (assert visible text; optional computed style check).
- No new network assertions needed if no HTTP is introduced.

Existing activity tests should keep passing; re-run after layout change.

## Target Files

| Action | Path |
|--------|------|
| Create | `src/components/RecentCustomers.jsx` |
| Edit | `src/pages/Dashboard.jsx` |
| Edit (optional) | `tests/Dashboard.spec.ts` |

**Do not edit:** `src/components/dashboard.jsx`, `docs/ai/stories/TS-02/spec.md`, `docs/ai/stories/TS-02/implementation-plan.md` (written by app), `.opencode/executions/**`.

## Context Budget

- Open **target files first** (`RecentCustomers.jsx`, `Dashboard.jsx`); read `RecentActivity.jsx` only as the style reference.
- Do not broad-scan `src/`, `tests/`, or `docs/ai/` beyond targets + `RecentActivity.jsx`.
- Skip `node_modules`, build output, `.opencode/executions`, and generated artifacts.
- Use native edit tools; do not paste full files or large diffs in chat.
- Run only the validation commands below for the changed surface.

## Validation Commands

```bash
npm run lint
npm run build
npx playwright test tests/Dashboard.spec.ts
```

Manual check (if not automating): load dashboard via `npm run dev`, confirm 3 rows, badge colors, and side-by-side/stacked layout at desktop and ~1024px width.

**Note:** `playwright.config.ts` may reference `npm run start`, which is absent from `package.json`; use `npm run dev` for local preview if webServer fails.

## Acceptance Criteria Mapping

| Criterion | How to verify |
|-----------|----------------|
| UI alignment | Match Recent Activity card/row styles; shared widget row below stats |
| 3 mock records | Count `customer-item-*` locators or visual check |
| Status badges | Active green, Pending yellow/orange on Frank Miller row |
| Responsiveness | Resize viewport; grid stacks without overflow |
| No backend | No fetch/API in new/edited files; lint + code review |

## Risks

| Risk | Mitigation |
|------|------------|
| Layout change breaks activity Playwright tests | Keep `activity-section` and existing testids; run `Dashboard.spec.ts` |
| Playwright `webServer` / missing `start` script | Run dev server manually or fix config only if tests fail for that reason |
| Inconsistent blues (`#3b82f6` vs `#4f46e5`) | Prefer `#4f46e5` to match Recent Activity avatars |
| Accidental API wiring | Keep data as const + props only |

## Assumptions

- **Recent Activity** remains the visual reference; no design files in repo for this story.
- Customer list is not search-filtered.
- Status values are only `Active` and `Pending` for this story.
- Tests are optional unless the implementer stage explicitly requires new Playwright cases; lint + build + existing Dashboard spec are the minimum gate.
- Filename `StateCard.jsx` / export `StatCard` mismatch is pre-existing; import as `StatCard` from `StateCard.jsx` without renaming.
