## Story Summary

Add a "Recent Customers" summary widget to the Dashboard page so admins can see recent customer overviews (name, email, status) without navigating to the dedicated Customers tab. The widget uses static mock data with no backend dependency.

## Requirements

- New "Recent Customers" widget rendered on the Dashboard page below the stats grid.
- Widget displays exactly 3 mock customer records (David Jones, Emma Watson, Frank Miller).
- Each row shows: circular avatar with initials, customer name (bold), email (secondary), and a colored status badge (Active = green, Pending = yellow/orange).
- Widget must visually match the existing "Recent Activity" card styling (white background, border, border-radius, box-shadow, font sizes/weights).
- No HTTP/API calls — data lives entirely as a static JSON array in component state.
- Widget title: "Recent Customers" rendered as an `h2` matching the "Recent Activity" heading style.

## Acceptance Criteria

- [ ] Widget title "Recent Customers" is visible on the dashboard with the same `h2` styling as "Recent Activity" (`fontSize: "18px"`, `fontWeight: 600`, `color: "#1a1d2e"`).
- [ ] All 3 mock records render in a list below the title.
- [ ] Each record displays: avatar initials, customer name, email, and status badge.
- [ ] Status "Active" renders with green styling; "Pending" renders with yellow/orange styling.
- [ ] No more than 3 records are displayed.
- [ ] Widget sits below the stats grid (`data-testid="stats-grid"`) in the page flow.
- [ ] Widget is responsive across standard desktop/laptop resolutions (no horizontal overflow, cards scale with grid).
- [ ] No network requests are made by the component (confirmable via browser DevTools Network tab).

## Impacted Areas

- `src/pages/Dashboard.jsx` — import and render the new widget component in the page layout.
- `src/components/RecentCustomers.jsx` — new component housing the mock data and rendering logic.
- `tests/Dashboard.spec.ts` — add a new `test.describe` block for Recent Customer widget tests.
- `tests/dashboard-advanced.spec.js` — optionally extend POM-based tests if desired.

## Open Questions

- [CLARIFY] Should the "Recent Customers" widget be placed below the "Recent Activity" section (single-column stack) or alongside it in a two-column grid? The story says "below the existing metrics cards (or alongside 'Recent Activity')" — decide per implementation.
- [CLARIFY] Should clicking a customer row navigate somewhere (e.g., customer detail page)? The story says "view a summary list" with no mention of interaction — clarify if rows should be clickable or purely display-only.
- [CLARIFY] Is the avatar background color fixed (`#3b82f6` / brand blue) or should it vary per row? The story mentions "utilizing the existing theme colors (#3b82f6 or similar)."

## Assumptions

- [ASSUME] New component file at `src/components/RecentCustomers.jsx` following the same pattern as `src/components/RecentActivity.jsx` (default-export function component, inline styles, `data-testid` attributes).
- [ASSUME] `data-testid` naming pattern: `recent-customers-section`, `recent-customers-title`, `rc-item-{id}`, `rc-avatar-{id}`, `rc-name-{id}`, `rc-email-{id}`, `rc-status-{id}` — kebab-case with descriptive prefix per project convention.
- [ASSUME] Widget placed directly below the `activity-section` (single-column stack) for simplicity unless clarified otherwise.
- [ASSUME] Rows are **not clickable** (display-only); no navigation or interaction handlers.
- [ASSUME] Avatar background uses the brand blue `#3b82f6` consistently for all rows (matching the activity avatar pattern, which uses `#4f46e5`).

## UI Notes

- Match "Recent Activity" card pattern exactly (`background: "#fff"`, `borderRadius: "10px"`, `padding: "14px 20px"`, `border: "1px solid #f1f3f9"`, `boxShadow: "0 1px 3px rgba(0,0,0,0.04)"`).
- Avatar circle dimensions: `width: "40px"`, `height: "40px"`, `borderRadius: "50%"`, font `700 13px`.
- Customer name: `fontWeight: 600`, `fontSize: "14px"`, `color: "#1a1d2e"`.
- Email address: `fontSize: "13px"`, `color: "#6b7280"` (secondary text below name).
- Status badge: small inline badge with `padding: "2px 10px"`, `borderRadius: "12px"`, `fontSize: "12px"`, `fontWeight: 600`.
  - Active: `background: "#d1fae5"`, `color: "#065f46"` (green).
  - Pending: `background: "#fef3c7"`, `color: "#92400e"` (yellow/amber).
- Widget section heading (`h2`) matches the "Recent Activity" heading: `fontSize: "18px"`, `fontWeight: 600`, `marginBottom: "16px"`, `color: "#1a1d2e"`.
- List uses `ul`/`li` with same reset styles: `listStyle: "none"`, `margin: 0`, `padding: 0`, `display: "flex"`, `flexDirection: "column"`, `gap: "12px"`.

## Implementation Notes

- Create new component `src/components/RecentCustomers.jsx` following the established pattern in `src/components/RecentActivity.jsx`.
- Place the mock data JSON array as a local `const` inside the component (no `useState` needed — data is static).
- Import and render `<RecentCustomers />` in `src/pages/Dashboard.jsx` after the `<RecentActivity />` section (line ~206).
- Use `Fragment` (`<>...</>`) wrapping if needed — or simply append after the activity section.
- Do **not** modify `src/components/dashboard.jsx` (dead code, lowercase, unreferenced).
- All styling must use inline `style` props — no CSS changes, no new stylesheets.
- Reference `docs/ai/context-map.json` — `data-testid` naming is kebab-case per convention.
- Reference `.opencode/agents/governance-agent.md` — section 10: no dead code proliferation, no dependency changes.

## Test Notes

- New `test.describe("Dashboard - Recent Customers", ...)` block in `tests/Dashboard.spec.ts`.
- Tests must use `data-testid` locators exclusively — no CSS-class or structural selectors.
- Required assertions:
  - Widget section and title are visible with text "Recent Customers".
  - All 3 customer rows render (check count of `[data-testid^="rc-item-"]` equals 3).
  - Each row displays correct name (`rc-name-{id}`), email (`rc-email-{id}`), initials (`rc-avatar-{id}`).
  - Status badges render with correct text: "Active" for items 1 & 2, "Pending" for item 3.
  - Status "Active" has green styling, "Pending" has yellow/amber styling.
  - No extra items beyond the 3 mock records are rendered.
- Optionally: screenshot test for the new widget section in `tests/screenshots/`.
