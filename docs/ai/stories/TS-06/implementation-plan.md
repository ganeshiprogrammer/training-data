## Source
- Story key: TS-06
- Spec: `docs/ai/stories/TS-06/spec.md`
- Context: `docs/ai/context-map.json` + `docs/ai/project-context.md`
- Handoff: `.opencode/executions/exec-0d8565f2-d6bd-43f7-aff9-5a71230f8318/handoffs/story_analyzer.json`

## Target Files
- **Create:** `src/mock/aboutData.js`
- **Create:** `src/pages/About.jsx`
- **Modify:** `src/App.jsx`
- **Modify:** `src/components/Sidebar.jsx`
- **Create:** `tests/About.spec.ts`
- **Modify:** `tests/Dashboard.spec.ts`

## Steps

### Step 1 — Create mock data file: `src/mock/aboutData.js`
- `export default { systemInfo, teamMembers }` (reusing default-export convention from `src/mock/activeUsersMetrics.js`).
- `systemInfo`: `{ appName: "AdminPro Portal", version: "v2.4.0-stable", lastUpdated: "May 2026", environment: "Production Mock Environment" }`.
- `teamMembers`: array of 3 objects:
  - `{ initials: "SJ", name: "Sarah Johnson", role: "Lead Developer" }`
  - `{ initials: "MC", name: "Marcus Chen", role: "UX Designer" }`
  - `{ initials: "ER", name: "Elena Rodriguez", role: "Product Manager" }`
- **Validation:** File is valid ESM; no syntax errors.

### Step 2 — Create About page: `src/pages/About.jsx`
- Import `Sidebar` from `"../components/Sidebar"` and `{ systemInfo, teamMembers }` from `"../mock/aboutData"`.
- Follow `Dashboard.jsx` layout pattern: `<>`, `<title>About</title>`, flex container (`display: "flex", minHeight: "100vh", background: "#f4f6fb"`), `<Sidebar />`, `<main style={{ flex: 1, padding: "32px 40px" }}>`.
- **System info card**: white card (`#fff`, `borderRadius: 12px`, `padding: 24px`, `boxShadow`), renders `systemInfo.appName`, `systemInfo.version`, `systemInfo.lastUpdated`. data-testids: `about-page`, `about-system-card`, `about-system-name`, `about-system-version`, `about-system-updated`.
- **Team grid**: CSS grid (`display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px"`). Map `teamMembers` to cards. Each card: circular avatar (`width: 48px`, `height: 48px`, `borderRadius: 50%`, `background: "#4f46e5"`, white initials), name, role. data-testids: `about-team-grid`, `about-team-card-{i+1}`, `about-team-initials-{i+1}`, `about-team-name-{i+1}`, `about-team-role-{i+1}`.
- **Responsiveness**: use CSS media query via `@media` in a `<style>` element or responsive inline styles (note: inline styles can't do media queries — use a `<style>` tag inside the component or `window.matchMedia` in a `useEffect`). Spec suggests "stacks vertically on mobile, columns on desktop". Simplest approach: add a `<style>` block with a CSS class for the grid using media queries, OR use `useState`/`useEffect` with `window.matchMedia`. **Recommendation**: Use a `<style>` tag inside `<>` for brevity — e.g., `.team-grid { display: grid; grid-template-columns: 1fr; gap: 20px; } @media (min-width: 769px) { .team-grid { grid-template-columns: repeat(2, 1fr); } } @media (min-width: 1024px) { .team-grid { grid-template-columns: repeat(3, 1fr); } }` — or skip `<style>` and hardcode `gridTemplateColumns` to `repeat(3, 1fr)` given the `auto-fill` approach naturally wraps. Per open questions: default to `repeat(auto-fill, minmax(220px, 1fr))` which gives multi-column ≥ ~800px and single-column below that naturally.
- **Validation:** About page renders in isolation without errors when route added.

### Step 3 — Add route in `src/App.jsx`
- Add `import About from "./pages/About";` alongside existing `Dashboard` import.
- Add `<Route path="/about" element={<About />} />` after the `/dashboard` route.
- **Validation:** `npm run lint` passes. Dev server `npm run dev` shows `/about` route renders.

### Step 4 — Refactor Sidebar for real navigation + add "About": `src/components/Sidebar.jsx`
- Add `import { useLocation, Link } from "react-router-dom";` at top.
- Call `const location = useLocation();` inside the component body.
- Modify `navItems` array:
  - Add `path` property to each item: `Dashboard → "/dashboard"`, `Analytics → "/analytics"`, `Orders → "/orders"`, `Customers → "/customers"`, `Settings → "/settings"`.
  - Remove the `active` boolean property from all items.
  - Insert a new item after Settings: `{ label: "About", icon: "ℹ️", path: "/about", testId: "nav-about" }`.
- Compute active state: replace `item.active` with `location.pathname === item.path`.
- Replace `<a href="#" ...>` with `<Link to={item.path} ...>` (preserve all other attributes and inline styles, including the dynamic active styling based on the computed active state).
- For Dashboard only: also match `location.pathname === "/"` (since root redirects to `/dashboard`, but in case of direct `/` access, the sidebar should still highlight Dashboard). Actually, since `App.jsx` redirects `/` → `/dashboard` via `<Navigate>`, the pathname at Sidebar render time will always be `/dashboard`. But to be safe, do `location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/")`.
- **Validation:** Sidebar links navigate without full page reload. "About" link highlights when on `/about`. Dashboard link still highlights on `/dashboard`.

### Step 5 — Create About page test: `tests/About.spec.ts`
- Follow the exact pattern from `tests/Dashboard.spec.ts` (describe blocks with `test.beforeEach(page.goto("/about"))`).
- Test groups:
  - **"About - Page Load"**: page title "About", `about-page` visible.
  - **"About - System Info Card"**: verify `about-system-name` has text "AdminPro Portal", `about-system-version` has "v2.4.0-stable", `about-system-updated` has "May 2026".
  - **"About - Team Grid"**: verify `about-team-grid` visible, exactly 3 `about-team-card-` elements, verify initials/name/role for each card (SJ/Sarah Johnson/Lead Developer, MC/Marcus Chen/UX Designer, ER/Elena Rodriguez/Product Manager).
  - **"About - Sidebar Navigation"**: "About" link visible, clickable, navigates to `/about`, active when on `/about`. Dashboard link also still works.
  - **"About - Screenshots"**: full-page screenshot to `tests/screenshots/about-full.png`.
- **CRITICAL**: Add `"nav-about"` to the `navLinks` array in the "should display the sidebar with all navigation items" test in `tests/Dashboard.spec.ts` (see Step 6).

### Step 6 — Update `tests/Dashboard.spec.ts`
- In the "should display the sidebar with all navigation items" test, add `"nav-about"` to the `navLinks` array (between `"nav-settings"` and the closing bracket).

### Step 7 — Lint + verify
- Run `npm run lint` and fix any ESLint errors.
- Run `npx playwright test` and confirm all existing + new tests pass.

## Data/API Notes
- No backend. All data is static from `src/mock/aboutData.js`.
- Mock file uses `export default { systemInfo, teamMembers }` matching existing `activeUsersMetrics.js` convention.

## UI Notes
- **Layout**: Same flexbox pattern as Dashboard — `<Sidebar />` left, `<main>` with `flex: 1` and `padding: "32px 40px"`.
- **System info card**: White card with `boxShadow`, labeled rows. Use `<p>` or `<div>` elements with bold labels and secondary-color values.
- **Team grid**: Use CSS `gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))"` to get responsive multi-column behavior naturally. This satisfies the AC (multi-column ≥ 1024px, single-column ≤ 768px) without explicit media queries, since `minmax(220px, 1fr)` naturally collapses at narrow widths.
- **Icon for About nav**: Use `ℹ️` (emoji) to match existing emoji-icon pattern in Sidebar (🏠, 📊, etc.).
- **Active highlight**: Matches existing Sidebar pattern — `color: "#fff"`, `background: "rgba(79,70,229,0.3)"`, `borderLeft: "3px solid #4f46e5"` for active, `color: "#9ca3af"` for inactive.

## Tests
- **New**: `tests/About.spec.ts` — comprehensive test with 5 describe blocks covering page load, system info, team grid, sidebar navigation, and screenshots.
- **Update**: `tests/Dashboard.spec.ts` — add `"nav-about"` to the `navLinks` array.
- **Pattern**: All locators use `page.getByTestId(...)`. No CSS or DOM-structure selectors.
- **Screenshot**: Full-page screenshot saved to `tests/screenshots/about-full.png` (directory already exists).

## Risks
- **Sidebar active state refactoring** is the riskiest step. The `active` property is currently hardcoded. Switching to `useLocation()` means the *Dashboard* page's behavior changes too. If the path matching is wrong, the Dashboard link might not highlight. Mitigation: use `location.pathname === item.path` and test after Step 4.
- **`NavLink` vs `Link` approach**: The spec mentions `NavLink` as an alternative. If `isActive` inline styles via `NavLink` `style` callback prove cleaner, use that instead of `useLocation`. Both are acceptable. The plan assumes `useLocation` + `Link` to minimize diff from current `<a>` pattern.
- **Root path `/`**: Since `App.jsx` redirects `/` → `/dashboard`, `location.pathname` will be `/dashboard` after redirect. But verify this is the case — if the redirect doesn't update pathname before Sidebar renders, Dashboard might not highlight. Mitigation: add `|| (item.path === "/dashboard" && location.pathname === "/")` as a safety check.
- **Existing tests may break**: The Dashboard spec has `await expect(page).toHaveTitle("Dashboard")` — if the sidebar refactoring somehow affects the Dashboard title rendering, this could break. Should be fine since Dashboard has its own `<title>`.

## Context Budget
- **Read only**: `src/App.jsx` (route table), `src/components/Sidebar.jsx` (nav items + active logic), `src/pages/Dashboard.jsx` (layout pattern), `src/mock/activeUsersMetrics.js` (mock pattern), `tests/Dashboard.spec.ts` (test pattern). Do not read entire project or unrelated components.
- **Write only**: the 6 target files listed above. Do not touch config files, unrelated components, or existing mock files.
- **Reference**, don't copy: Existing Dashboard.jsx for layout pattern, Dashboard.spec.ts for test pattern.

## Handoff
The code implementer should:
1. Read `spec.md` for the full data shapes, data-testid list, and test structure.
2. Read `Dashboard.jsx` and `Dashboard.spec.ts` as style references.
3. Execute steps 1–4 (code changes) first, then steps 5–6 (test changes), then step 7 (validation).
4. Run `npm run lint` after each code change to catch errors early.
5. The Sidebar refactoring (Step 4) is the most complex change — be careful to preserve existing styling and behavior for all nav items while adding the "About" link.
