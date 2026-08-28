# Implementation Plan: TS-03 — Recent Customers Widget

## Source
- Story key: `TS-03`
- Spec: `docs/ai/stories/TS-03/spec.md`
- Context: `docs/ai/context-map.json` — conventions (inline styles, kebab-case `data-testid`, no backend)
- Handoff: `.opencode/executions/exec-393cdddd-ec3c-4af9-85ee-281e7b5e61aa/handoffs/story_analyzer.json`

## Target Files
| File | Action |
|------|--------|
| `src/components/RecentCustomers.jsx` | **Create** — new widget component |
| `src/pages/Dashboard.jsx` | **Modify** — import + render RecentCustomers |
| `tests/Dashboard.spec.ts` | **Modify** — add new test describe block |
| `tests/dashboard-advanced.spec.js` | **Optionally modify** — POM extension (spec says optional) |

## Steps

### Step 1: Create `src/components/RecentCustomers.jsx`
- Default-export function component, no props, no state.
- Static mock data as a local `const customers = [...]` array of 3 objects:
  - `{ id: 1, name: "David Jones", email: "david.jones@example.com", status: "Active", initials: "DJ" }`
  - `{ id: 2, name: "Emma Watson", email: "emma.watson@example.com", status: "Active", initials: "EW" }`
  - `{ id: 3, name: "Frank Miller", email: "frank.miller@example.com", status: "Pending", initials: "FM" }`
- Renders a section (`<section data-testid="recent-customers-section">`) wrapping:
  - `<h2 data-testid="recent-customers-title">Recent Customers</h2>` styled per spec (18px/600/#1a1d2e).
  - `<ul>` with `data-testid="rc-list"`, reset styles matching activity-list.
  - Each `<li>` rendered via `.map()` with `data-testid="rc-item-{id}"`, card styling matching activity items (white bg, border, border-radius, box-shadow, padding, gap).
  - Inside each row: avatar div (`rc-avatar-{id}`, 40x40 circle, `#3b82f6` bg, initials), name div (`rc-name-{id}`), email div (`rc-email-{id}`), status badge span (`rc-status-{id}`).
  - Status badge styling: Active = `#d1fae5` bg / `#065f46` text, Pending = `#fef3c7` bg / `#92400e` text.
- **Validation**: `npm run build` passes with no errors.

### Step 2: Modify `src/pages/Dashboard.jsx`
- Add import: `import RecentCustomers from "../components/RecentCustomers";`
- Add `<RecentCustomers />` JSX after the `<section data-testid="activity-section">` closing tag (before `</main>`). No wrapper Fragment needed — it naturally follows the activity section.
- **Validation**: `npm run build` passes; page renders widget below Recent Activity.

### Step 3: Add tests in `tests/Dashboard.spec.ts`
- Add new `test.describe("Dashboard - Recent Customers", ...)` block **after** the Screenshots describe block.
- `test.beforeEach` navigates to `/dashboard`.
- Tests:
  1. **Widget section visible** — section `recent-customers-section` and title `recent-customers-title` with text "Recent Customers".
  2. **3 customer rows** — `[data-testid^="rc-item-"]` has count 3.
  3. **Row 1 details** — rc-name-1 = "David Jones", rc-email-1 = "david.jones@example.com", rc-avatar-1 = "DJ".
  4. **Row 2 details** — rc-name-2 = "Emma Watson", rc-email-2 = "emma.watson@example.com", rc-avatar-2 = "EW".
  5. **Row 3 details** — rc-name-3 = "Frank Miller", rc-email-3 = "frank.miller@example.com", rc-avatar-3 = "FM".
  6. **Status badges** — rc-status-1 and rc-status-2 have text "Active"; rc-status-3 has text "Pending".
  7. **Status colors** — rc-status-1 has green bg `rgb(209, 250, 229)` (via `toHaveCSS`); rc-status-3 has amber bg `rgb(254, 243, 199)`.
- **Validation**: `npm run test` passes all new and existing tests.

### Step 4 (Optional): Extend `tests/dashboard-advanced.spec.js`
- If POM-based tests exist, add recent-customers selectors and assertions.
- Skip if no POM structure found for this widget — spec marks this as optional.

### Step 5: Visual regression (optional)
- Add screenshot test capturing the recent-customers-section region to `tests/screenshots/`.
- Spec marks this optional; implement only if screenshot tests are expected from prior pattern.

## Data/API Notes
- **No API calls**. All data is a static `const` array within the component.
- No `useState`, `useEffect`, or prop passing required.

## UI Notes
- Card styling **exactly mirrors** RecentActivity list items:
  - `background: "#fff"`, `borderRadius: "10px"`, `padding: "14px 20px"`, `border: "1px solid #f1f3f9"`, `boxShadow: "0 1px 3px rgba(0,0,0,0.04)"`.
- Row layout: `flex`, `alignItems: "center"`, `gap: "16px"`.
- Avatar: `#3b82f6` brand blue (different from RecentActivity's `#4f46e5` — intentional per spec).
- Widget sits directly below `activity-section` in page flow (single-column stack).

## Tests
- **Required**: New `test.describe("Dashboard - Recent Customers", ...)` block in `tests/Dashboard.spec.ts` (7 test cases listed above).
- **Optional**: POM extension in `tests/dashboard-advanced.spec.js`, screenshot test.
- Use `data-testid` locators exclusively — no CSS class or structural selectors.

## Risks
1. **Filename mismatch risk**: `StateCard.jsx` exports as `StatCard` — verify the import in Dashboard.jsx uses the correct component name for RecentCustomers.
2. **Styling drift**: Spec explicitly calls out `#3b82f6` for avatars vs `#4f46e5` in RecentActivity — ensure this difference is intentional and not a copy-paste bug.
3. **No explicit empty state**: Spec doesn't mention an empty state. Since data is static and hardcoded, no empty state is needed. Do not add one.
4. **Rows are NOT clickable**: Spec assumes display-only. No `<a>`, `<button>`, or click handlers.

## Context Budget
- **Do NOT read**: `src/components/dashboard.jsx` (dead code), `src/App.jsx`, `src/main.jsx`, `Sidebar.jsx`, `StateCard.jsx` — not impacted by this story.
- **Do NOT read**: `tests/example.spec.ts` — not relevant.
- **Do NOT read**: Full `project-context.md` — all needed conventions are in `context-map.json` and the spec.
- **Reference only**: `RecentActivity.jsx` for styling patterns (already read above), `Dashboard.jsx` for insertion point (already read above), `Dashboard.spec.ts` for test patterns (already read above).

## Handoff
- The implementer should start with Step 1 (create RecentCustomers.jsx), then Step 2 (modify Dashboard.jsx), then Step 3 (add tests). Step 4 is optional.
- All styling is inline; no CSS changes needed.
- Verify with both `npm run build` and `npm run test` before marking complete.
