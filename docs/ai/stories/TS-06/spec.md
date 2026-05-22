## Story Summary
Add a static `/about` route and page to the AdminPro SPA, displaying system info (app name, version, last-updated timestamp) and a grid of core team contributors. Data is hardcoded in a new mock file. A new "About" navigation link is added to the sidebar below "Settings."

## Requirements
- New route `/about` registered in `src/App.jsx` alongside existing `/` and `/dashboard` routes.
- New page component at `src/pages/About.jsx` — follows the same layout pattern as `src/pages/Dashboard.jsx` (flex container, `<Sidebar />` on left, `<main>` content area).
- New mock data file at `src/mock/aboutData.js` exporting `systemInfo` and `teamMembers` objects (structure per story JSON).
- New "About" nav item added to the `navItems` array in `src/components/Sidebar.jsx`, placed after "Settings" with an info/question-mark icon and `testId: "nav-about"`.
  - Icon choice: either an SVG inline element or a unicode character (ⓘ / ℹ️). Match existing emoji-icon pattern established in `Sidebar.jsx`.
- Sidebar "About" item must visually highlight (active styling) when the `/about` route is active — parity with the "Dashboard" tab active state.
- Application Overview card at top of `/about`: renders `appName`, `version`, and `lastUpdated` from mock data.
- Team Profiles grid: multi-column flex/grid section mapping `teamMembers` array. Each card shows `initials` as a circular avatar placeholder, `name`, and `role`.
- Layout is responsive: stacks vertically on tablet/mobile, spreads into columns on desktop.

## Acceptance Criteria
- Route `/about` is accessible; navigating to `/about` renders the About page with all sections visible.
- Clicking the "About" link in the sidebar navigates to `/about` and the link shows the active highlight style (matching Dashboard link behavior).
- The system info card displays the text "AdminPro Portal", "v2.4.0-stable", and "May 2026".
- The team grid renders exactly 3 member cards with correct initials ("SJ", "MC", "ER"), names, and roles.
- On a viewport ≥ 1024px, team cards appear in a multi-column grid (≥ 2 columns). On ≤ 768px, they stack in a single column.
- Every new interactive/testable element has a kebab-case `data-testid` attribute.
- Navigating to `/` or `/dashboard` still works and the Dashboard page renders correctly.

## Impacted Areas
- `src/App.jsx` — add `/about` route importing `About` page component.
- `src/pages/About.jsx` — new file (create).
- `src/mock/aboutData.js` — new file (create).
- `src/components/Sidebar.jsx` — add "About" nav item; refactor `active` logic to be route-driven (see Implementation Notes).
- `tests/About.spec.ts` — new Playwright spec (create).
- `tests/Dashboard.spec.ts` — update `navLinks` array in the sidebar test to include `"nav-about"`.

## Open Questions
- `[CLARIFY]` Icon for the About nav link: story suggests "info or question-mark SVG." Should we use a text emoji (e.g., `ℹ️`, `❓`) to match the existing emoji-icon pattern in `Sidebar.jsx`, or an inline SVG? Match existing pattern unless otherwise directed.
- `[CLARIFY]` Responsive breakpoint values: story says "tablet/mobile" and "desktop." No exact px values given. Proposed: single-column ≤ 768px, 2-column 769–1023px, 3-column ≥ 1024px. Confirm or adjust.

## Assumptions
- `[ASSUME]` The Sidebar will need to be refactored to use `useLocation()` from react-router-dom (or `NavLink` components) so that the "About" item highlights when `/about` is active. Currently `active` is hardcoded per nav item. This is necessary for the "active state parity with Dashboard" AC.
- `[ASSUME]` The existing `navItems` array in `Sidebar.jsx` will be migrated from `<a href="#">` tags to `<Link>` / `<NavLink>` from react-router-dom to enable actual client-side navigation (currently all links are `href="#"` — no navigation occurs). This is implied by the routing AC but is a larger change than just adding one item.
- `[ASSUME]` The `systemInfo.environment` field from the mock JSON ("Production Mock Environment") is informational only and not rendered in the spec — the AC lists only appName, version, and lastUpdated. If it should render, clarify in Open Questions.
- `[ASSUME]` Mock data file uses `export default { systemInfo, teamMembers }` pattern (matching existing `src/mock/activeUsersMetrics.js` default-export convention).

## UI Notes
- **Page layout**: Match Dashboard pattern — `<div style={{ display: "flex", minHeight: "100vh", background: "#f4f6fb" }}>` as outer wrapper, `<Sidebar />` on left, `<main style={{ flex: 1, padding: "32px 40px" }}>` for content.
- **System info card**: Use a white card container (`background: "#fff"`, `borderRadius: "12px"`, `padding: "24px"`, `boxShadow`) for the overview section. Headings in bold, values in secondary color (`#6b7280`).
- **Team grid**: CSS grid or flexbox. Suggested: `display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px"`.
- **Team member card**: White card with centered layout. Avatar circle: `width: "48px"`, `height: "48px"`, `borderRadius: "50%"`, `background: "#4f46e5"`, initials in white bold text.
- **Inline styles only** — no CSS modules or external stylesheets.
- **data-testid** naming convention: kebab-case. Examples: `about-page`, `about-system-card`, `about-system-name`, `about-system-version`, `about-system-updated`, `about-team-grid`, `about-team-card-1`, `about-team-initials-1`, `about-team-name-1`, `about-team-role-1`.

## Implementation Notes
- Follow the existing mock file pattern in `src/mock/activeUsersMetrics.js`: camelCase filename, default export.
- The `Sidebar.jsx` currently uses placeholder `<a href="#">` tags with a hardcoded `active` prop. Enabling highlight-on-navigate and actual routing will require:
  - Import `useLocation` from `"react-router-dom"`.
  - Compute `isActive` by comparing `pathname` with each item's route path (e.g., `navItems` gains a `path` property like `/dashboard`, `/about`, etc.).
  - Alternatively, replace `<a>` with `<NavLink>` from react-router-dom and style via `className` or inline `style` callback.
- Route registration pattern in `App.jsx` (per `docs/ai/project-context.md`):
  ```jsx
  import About from "./pages/About";
  // inside <Routes>:
  <Route path="/about" element={<About />} />
  ```
- The page should render a `<title>About</title>` element matching the Dashboard convention (`<title>Dashboard</title>`).
- Do not modify `package.json`, `vite.config.js`, `eslint.config.js`, or `playwright.config.ts`.
- Run `npm run lint` after implementation and fix all errors.
- See `docs/ai/context-map.json` for path references and `docs/ai/project-context.md` for architecture rules.

## Test Notes
- Create `tests/About.spec.ts` — follow the existing test pattern from `tests/Dashboard.spec.ts`:
  - `test.describe("About - Page Load")` — verify page title, `/about` route loads, all sections visible.
  - `test.describe("About - System Info Card")` — verify app name, version, last-updated text.
  - `test.describe("About - Team Grid")` — verify exactly 3 cards, correct initials/name/role per card.
  - `test.describe("About - Sidebar Navigation")` — verify "About" link is visible, clickable, navigates to `/about`, and highlights as active.
  - `test.describe("About - Screenshots")` — full-page screenshot saved to `tests/screenshots/about-full.png`.
- Update `tests/Dashboard.spec.ts` — add `"nav-about"` to the `navLinks` array in the "should display the sidebar with all navigation items" test.
- Every new element must have a `data-testid` (kebab-case) that is exercised in at least one Playwright assertion.
- Playwright locators must use `page.getByTestId(...)` — no CSS/DOM-structure selectors (per governance rules).
