## Story Summary

Add an "Active Users Overview" widget to the Dashboard showing a 6-block hourly breakdown of active user traffic. The widget renders from a static mock dataset with no backend calls, displays trend-colored badges per time block, and identifies the peak traffic period. The peak user count (3,842) must exactly match the existing "Active Users" summary stat card value.

## Requirements

- New "Active Users Overview" section rendered on the Dashboard page below or alongside the "Recent Activity" section.
- Widget uses static mock data from a dedicated constants file at `src/mock/activeUsersMetrics.js` — no `useState` or inline data in the component.
- Data contains exactly 6 time-block objects with `timeBlock`, `userCount`, and `trend` fields.
- Each row displays: time block label, user count (comma-formatted), and a trend badge.
- Trend badge applies semantic color:
  - `"Peak"` — high-contrast accent color (blue or green).
  - `"Upward"`, `"Downward"`, `"Stable"` — standard muted dashboard text color.
- Peak indicator text displayed (e.g., "Peak traffic: 2:00 PM" or "Peak block: 12:00 PM - 04:00 PM").
- Highest userCount in the breakdown (3,842) must exactly match the existing "Active Users" stat card value in `Dashboard.jsx` (line 24: `value: "3,842"`).
- Zero network/API calls — component reads the mock constants file synchronously; no fetch/axios.
- No external charting library dependency — use a structured flex-list/table layout (acceptable placeholder per story).

## Acceptance Criteria

- [ ] Widget section renders on the dashboard without breaking the responsive grid layout or overlapping existing sections.
- [ ] Widget title "Active Users Overview" is visible with heading styling consistent with "Recent Activity" (`fontSize: "18px"`, `fontWeight: 600`, `color: "#1a1d2e"`).
- [ ] All 6 time-block objects are displayed with `timeBlock` and `userCount` values correctly rendered.
- [ ] Peak indicator text is visible and references the time block with the highest `userCount`.
- [ ] Trend badge for `"Peak"` entries uses a distinct accent color (e.g., `#4f46e5` blue or `#10b981` green).
- [ ] Trend badge for `"Upward"`, `"Downward"`, `"Stable"` entries uses muted/secondary text color (e.g., `#6b7280`).
- [ ] Highest userCount value (3,842 in "12:00 PM - 04:00 PM") exactly matches the "Active Users" stat card value (`stat-value-users` = "3,842") — can be verified visually.
- [ ] No network requests are made by the widget (confirmable via browser DevTools Network tab).
- [ ] Container card uses white background, rounded corners, and subtle drop shadow matching existing card patterns (`background: "#fff"`, `borderRadius: "12px"`, `boxShadow: "0 1px 4px rgba(0,0,0,0.06)"`).

## Impacted Areas

- `src/mock/activeUsersMetrics.js` — **new** constants file containing the static 6-element JSON array (directory does not exist yet; must be created).
- `src/components/ActiveUsersOverview.jsx` — **new** widget component that imports the mock data and renders the time-block list.
- `src/pages/Dashboard.jsx` — import and render `<ActiveUsersOverview />` in the page layout after the activity section.
- `tests/Dashboard.spec.ts` — add a new `test.describe` block for Active Users Overview widget tests.
- `tests/dashboard-advanced.spec.js` — optionally extend POM with new locators.

## Open Questions

- [CLARIFY] Should "Peak traffic" indicator display a single time (e.g., "2:00 PM" as example in story) or the full time-block range (e.g., "12:00 PM - 04:00 PM")? The highest count is 3,842 in the "12:00 PM - 04:00 PM" block. Resolve the exact format.
- [CLARIFY] Should the widget be placed **below** "Recent Activity" (single-column stack) or **alongside** it in a two-column grid? The story says "alongside or below" — decide per implementation.
- [CLARIFY] The story mentions two `"Peak"` trend entries (08:00 AM - 12:00 PM and 12:00 PM - 04:00 PM) but only one highest-count value (3,842). Should both "Peak" rows use the accent color, or only the absolute maximum row?

## Assumptions

- [ASSUME] Widget placed directly below the `activity-section` / `recent-customers-section` as a full-width section, following the single-column stack pattern established by TS-03.
- [ASSUME] New component file at `src/components/ActiveUsersOverview.jsx` (PascalCase, default-export function component, inline styles, `data-testid` attributes).
- [ASSUME] Mock data constants file at `src/mock/activeUsersMetrics.js` exporting a named `const activeUsersMetrics = [...]` (default export).
- [ASSUME] Trend badge palette: `"Peak"` uses `#4f46e5` (indigo accent, matching sidebar active link color); `"Upward"` / `"Downward"` / `"Stable"` use `#6b7280` (muted gray, matching secondary text).
- [ASSUME] No charting library introduced; layout uses a flex-list/table structure per story's placeholder allowance.
- [ASSUME] `data-testid` naming pattern: `active-users-section` (section container), `active-users-title` (heading), `active-users-peak` (peak indicator), `active-users-row-{index}` (each time-block row), `active-users-block-{index}`, `active-users-count-{index}`, `active-users-trend-{index}` (individual cells within a row).

## UI Notes

- **Container card:** Match existing card patterns (`background: "#fff"`, `borderRadius: "12px"`, `padding: "20px 24px"`, `boxShadow: "0 1px 4px rgba(0,0,0,0.06)"`, `border: "1px solid #f1f3f9"`).
- **Section heading:** Identical to "Recent Activity" heading — `fontSize: "18px"`, `fontWeight: 600`, `marginBottom: "16px"`, `color: "#1a1d2e"`.
- **Peak indicator text:** Displayed below the heading, styled as a small info line (e.g., `fontSize: "13px"`, `color: "#6b7280"`, `marginBottom: "12px"`). Example: "Peak traffic: 12:00 PM - 04:00 PM (3,842 users)".
- **Row layout:** Clean flex-row per time block with three inline regions: time label (left, bold), user count (center, large number), trend badge (right, small pill).
- **Trend badge:** Rounded pill shape — `padding: "2px 10px"`, `borderRadius: "12px"`, `fontSize: "12px"`, `fontWeight: 600`.
  - `"Peak"` — `color: "#4f46e5"`, `background: "#eef2ff"` (light indigo bg).
  - `"Upward"` / `"Downward"` / `"Stable"` — `color: "#6b7280"`, `background: "#f3f4f6"` (light gray bg).
- **User count text:** Large weight for emphasis — `fontSize: "16px"`, `fontWeight: 700`, `color: "#1a1d2e"`.
- **Time block label:** `fontSize: "14px"`, `fontWeight: 600`, `color: "#374151"`.
- **Row spacing:** `padding: "12px 0"` with a `borderBottom: "1px solid #f1f3f9"` separator between rows; last row has no border.
- Inline `style` props only — no CSS classes or stylesheet changes.

## Implementation Notes

- Create `src/mock/` directory (does not exist yet) and place `activeUsersMetrics.js` exporting the static array as:
  ```js
  const activeUsersMetrics = [ ... ]; // 6 objects as specified
  export default activeUsersMetrics;
  ```
- Create `src/components/ActiveUsersOverview.jsx` that imports `activeUsersMetrics` and maps over it to render rows.
- Render `<ActiveUsersOverview />` in `src/pages/Dashboard.jsx` after the `<RecentCustomers />` component (around line 210, inside `<main>`).
- Compute peak dynamically: find the object with the highest `userCount` among the 6 entries to drive the peak indicator text.
- Do **not** use `useState` — data is static; plain `const` or direct import is sufficient.
- Do **not** modify `src/components/dashboard.jsx` (dead code, lowercase, unreferenced).
- All styling via inline `style` props — no CSS changes, no new stylesheet imports.
- Reference `docs/ai/context-map.json` and `docs/ai/project-context.md` for conventions: `data-testid` kebab-case, no backend, function components only.
- Reference `.opencode/agents/governance-agent.md` for shared rules: no new runtime dependencies, no config file changes.

## Test Notes

- New `test.describe("Dashboard - Active Users Overview", ...)` block in `tests/Dashboard.spec.ts`.
- All locators use `data-testid` exclusively — no CSS-class or DOM-structure selectors.
- Required assertions:
  - Widget section (`active-users-section`) and title (`active-users-title`) are visible with text "Active Users Overview".
  - Peak indicator (`active-users-peak`) is visible with text containing the peak block label and "3,842".
  - Exactly 6 time-block rows render (count of `[data-testid^="active-users-row-"]` equals 6).
  - Each row displays correct time-block label (`active-users-block-{index}`), user count (`active-users-count-{index}`), and trend text (`active-users-trend-{index}`).
  - For rows with `trend: "Peak"`, the badge has indigo/blue styling (`color` CSS property equals `rgb(79, 70, 229)` i.e. `#4f46e5`).
  - For rows with non-Peak trend, the badge has muted gray styling.
  - The highest count value "3,842" appears both in the widget and in the existing "Active Users" stat card (`stat-value-users`) — cross-verify if feasible.
  - No network requests fired by the widget (DevTools Network tab filter for fetch/XHR shows zero requests during widget render).
- Optionally: screenshot test capturing the new widget section to `tests/screenshots/`.
