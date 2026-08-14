# SA-1: Users Page — Implementation Plan

## Story Summary
Add a `/users` page displaying a static table of mock users (`name`, `email`, `role`), update the sidebar to include a navigation link, and add a Playwright E2E test. The implementation strictly follows inline styling, kebab-case `data-testid`, and existing component patterns.

## Resolved Decisions
- **User fields:** `name`, `email`, and `role`.
- **Display format:** Standard HTML `<table>` with inline styles.
- **Sidebar navigation:** Add "Users" link to the existing `navItems` array. Existing links remain `<a href="#">`; only the new Users link uses React Router `<Link>`.
- **Capabilities:** No pagination, search, or filtering. Static array only.
- **Test file extension:** `.ts` (matches `Dashboard.spec.ts` and `example.spec.ts`).

## Files to Touch
- `src/pages/Users.jsx` (Create)
- `src/App.jsx` (Modify)
- `src/components/Sidebar.jsx` (Modify)
- `tests/Users.spec.ts` (Create)

## Implementation Steps

### Step 1: Create `src/pages/Users.jsx`
1. Define a static array `mockUsers` with at least 3 objects containing `id`, `name`, `email`, and `role`.
2. Export a default function component `Users`.
3. Render a wrapper `<div data-testid="users-page" style={{ padding: "24px" }}>`.
4. Add an `<h1 data-testid="users-title" style={{ marginBottom: "16px" }}>Users</h1>`.
5. Render an HTML `<table data-testid="users-table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>` with:
   - `<thead>` containing `<tr>` with three `<th>` elements:
     - `<th data-testid="table-header-name" style={{ borderBottom: "2px solid #ddd", padding: "8px" }}>Name</th>`
     - `<th data-testid="table-header-email" style={{ borderBottom: "2px solid #ddd", padding: "8px" }}>Email</th>`
     - `<th data-testid="table-header-role" style={{ borderBottom: "2px solid #ddd", padding: "8px" }}>Role</th>`
   - `<tbody>` mapping over `mockUsers`. For each user at `index`:
     - `<tr key={user.id} data-testid={`user-row-${index}`} style={{ borderBottom: "1px solid #eee" }}>
     - `<td data-testid={`user-name-${index}`} style={{ padding: "8px" }}>{user.name}</td>`
     - `<td data-testid={`user-email-${index}`} style={{ padding: "8px" }}>{user.email}</td>`
     - `<td data-testid={`user-role-${index}`} style={{ padding: "8px" }}>{user.role}</td>`
     - `</tr>`
6. Ensure all styling uses inline `style` props. No CSS classes or external stylesheets.

### Step 2: Update `src/App.jsx`
1. Import `Users` from `../pages/Users`.
2. Add a new `<Route path="/users" element={<Users />} />` inside the `<Routes>` component, alongside the existing `/dashboard` route. Maintain existing import ordering and formatting.

### Step 3: Update `src/components/Sidebar.jsx`
1. Import `Link` from `react-router-dom` alongside existing imports.
2. Add a new navigation item to the `navItems` array:
   ```js
   { label: "Users", icon: "👤", active: false, testId: "nav-users" }
   ```
3. Inside the `.map()` rendering the navigation links, conditionally render a `<Link>` for the Users item and an `<a>` for all others to satisfy the decision to only update the new link:
   ```jsx
   {item.label === "Users" ? (
     <Link to="/users" key={item.label} data-testid={item.testId} style={{
       display: "flex", alignItems: "center", gap: "12px", padding: "12px 24px",
       color: item.active ? "#fff" : "#9ca3af", background: item.active ? "rgba(79,70,229,0.3)" : "transparent",
       textDecoration: "none", fontSize: "14px", fontWeight: item.active ? 600 : 400,
       borderLeft: item.active ? "3px solid #4f46e5" : "3px solid transparent", transition: "all 0.2s",
     }}>
       <span>{item.icon}</span>
       {item.label}
     </Link>
   ) : (
     <a key={item.label} href="#" data-testid={item.testId} style={{
       display: "flex", alignItems: "center", gap: "12px", padding: "12px 24px",
       color: item.active ? "#fff" : "#9ca3af", background: item.active ? "rgba(79,70,229,0.3)" : "transparent",
       textDecoration: "none", fontSize: "14px", fontWeight: item.active ? 600 : 400,
       borderLeft: item.active ? "3px solid #4f46e5" : "3px solid transparent", transition: "all 0.2s",
     }}>
       <span>{item.icon}</span>
       {item.label}
     </a>
   )}
   ```
   *Note: Copy the exact `style` object from the existing `<a>` mapping to maintain visual consistency.*

### Step 4: Create `tests/Users.spec.ts`
1. Import `test` and `expect` from `@playwright/test`.
2. Create a test suite `Users Page`.
3. **Test 1: Table Content**
   - Navigate to `/users`.
   - Assert `users-page` is visible.
   - Assert table headers (`table-header-name`, `table-header-email`, `table-header-role`) contain correct text.
   - Assert first row (`user-row-0`) and its cells (`user-name-0`, `user-email-0`, `user-role-0`) contain the expected mock data values.
4. **Test 2: Sidebar Navigation**
   - Navigate to `/dashboard`.
   - Assert `nav-users` link is visible.
   - Assert `nav-users` has `href="/users"`.
   - Click `nav-users` and assert URL changes to `/users`.
5. Use `page.getByTestId()` exclusively for locators. Do not use CSS selectors or DOM structure queries.

## Context Budget
- **Target files only:** `src/pages/Users.jsx`, `src/App.jsx`, `src/components/Sidebar.jsx`, `tests/Users.spec.ts`.
- **No full-file reads required:** The implementation steps provide exact structural changes. The implementer should only reference the existing `Sidebar.jsx` map/render logic for styling consistency.
- **Linting:** Run `npm run lint` after modifying `Sidebar.jsx` and `App.jsx` to ensure the new `Link` import and JSX syntax comply with ESLint rules.

## Risks & Assumptions
- **Assumption:** The `Sidebar.jsx` component's `navItems` array is the single source of truth for navigation. Adding to it and conditionally rendering `<Link>` satisfies the requirement without refactoring the component's architecture.
- **Assumption:** Mock user data will be hardcoded directly in `Users.jsx` as specified. No external data files or API mocks are created.
- **Assumption:** Table styling will use standard HTML table elements with inline styles for borders, padding, and text alignment. No CSS modules or Tailwind are introduced.
- **Risk:** React Router DOM 7's `<Link>` component might render slightly different attributes than standard `<a>` tags depending on the router configuration. The test asserts `href="/users"` which aligns with standard React Router behavior, but if the test fails due to hash routing or base paths, the locator should be adjusted to `page.getByRole('link', { name: 'Users' })` as a fallback.
- **Risk:** ESLint may flag unused imports or missing `key` props if the map logic is copied incorrectly. The implementer must ensure `key={item.label}` is present on both the `<Link>` and `<a>` branches.
