# SA-1: Users Page

## Story Metadata
- **JIRA Key:** SA-1
- **Title:** Users page
- **Description:** Add users page with mock listing

## Resolved Decisions
The following decisions were made during story refinement and are treated as requirements:

1. **User fields:** Each user entry displays `name`, `email`, and `role`.
2. **Display format:** Users are displayed in a table format.
3. **Sidebar navigation:** The sidebar must include a navigation link to the users page.
4. **No advanced features:** No pagination, search, or filtering capabilities. Simple static list only.

## Acceptance Criteria
1. A new page exists at the `/users` route.
2. The sidebar includes a navigation link to `/users`.
3. The users page displays a table with columns for name, email, and role.
4. Each row in the table represents a mock user with the three fields above.
5. The user data is static (no API calls, no backend integration).
6. No pagination, search, or filtering is implemented.
7. All testable elements (table, rows, cells, navigation link) have `data-testid` attributes using kebab-case naming.
8. A Playwright E2E test exists that exercises the users page and validates the table content and sidebar link.
9. The page follows existing project conventions: function components, inline style props, PascalCase naming, ESLint compliance.

## Requirements

### Functional Requirements
- **FR-1:** Create a new page component at `src/pages/Users.jsx`.
- **FR-2:** Add a route in `src/App.jsx` for `/users` that renders the Users page.
- **FR-3:** Update `src/components/Sidebar.jsx` to include a navigation link to `/users`.
- **FR-4:** Define static mock user data (array of objects with `name`, `email`, and `role`).
- **FR-5:** Render an HTML `<table>` displaying the mock user data with three columns: Name, Email, Role.
- **FR-6:** Each table header cell must have a `data-testid` attribute.
- **FR-7:** Each table row must have a unique `data-testid` attribute (e.g., `user-row-{index}` or `user-row-{name}`).
- **FR-8:** Each table data cell must have a `data-testid` attribute for individual fields (e.g., `user-name-{index}`, `user-email-{index}`, `user-role-{index}`).
- **FR-9:** The sidebar navigation link must have a `data-testid` attribute (e.g., `nav-users`).

### Non-Functional Requirements
- **NFR-1:** Follow existing project conventions: function components, `export default` pattern, inline `style` props.
- **NFR-2:** Use kebab-case `data-testid` attributes for all testable elements.
- **NFR-3:** No new runtime dependencies.
- **NFR-4:** Code must pass existing ESLint rules (`npm run lint`).
- **NFR-5:** No backend API integration; all data is static/mock.

## UI Notes
- The table should be styled using inline `style` props (consistent with project conventions).
- Table headers: "Name", "Email", "Role".
- Mock data should include at least 3–5 users for demonstration.
- The sidebar link should use text "Users" (plural) and be styled consistently with existing sidebar navigation items.
- No additional UI elements (search bar, filter controls, pagination) are required.

## Implementation Notes
- **File locations:**
  - New page: `src/pages/Users.jsx`
  - Router update: `src/App.jsx` (add `/users` route)
  - Sidebar update: `src/components/Sidebar.jsx` (add navigation link)
  - Test: `tests/Users.spec.ts` or `tests/Users.spec.js` (follow existing naming convention)
- **Component structure:**
  - `Users.jsx` must be a function component with default export.
  - Mock data should be defined inline in `Users.jsx` to keep the story scoped and avoid creating new files.
  - Table should use standard HTML elements: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
  - Render rows by mapping over the mock data array.
- **Styling:**
  - Use inline `style` props on all JSX elements.
  - No CSS modules, no Tailwind, no styled-components.
  - `src/index.css` CSS variables may be referenced via inline styles but styling should be primarily inline.
- **Routing:**
  - Add a `<Route path="/users" element={<Users />} />` in `src/App.jsx` alongside existing routes.
  - The sidebar link should use `<Link to="/users">` (React Router DOM 7).
- **Testing:**
  - Playwright test must use `data-testid` locators only (no CSS-class or DOM-structure selectors).
  - Test should assert:
    - The sidebar contains a link to `/users`.
    - The table headers (Name, Email, Role) are present.
    - At least one user row is rendered with correct field values.
  - Test should be placed in `tests/` alongside existing tests.

## Open Questions
- None. All key decisions were resolved prior to this stage.

## Assumptions
1. The sidebar component (`Sidebar.jsx`) can be updated to include a new navigation link without architectural changes. The sidebar either accepts navigation items as props or has internal state that can be extended.
2. The mock user data is defined directly in `Users.jsx` rather than in a separate data file, to minimize new files and keep the story scoped.
3. The table does not require responsive design or horizontal scrolling beyond what the existing project conventions support.
4. The users page does not require authentication or access control (no route guards).
5. The sidebar link text is "Users" (plural) to match the page title.
6. The Playwright test follows the existing testing pattern (either POM in `.js` or direct spec in `.ts`). The choice between `.ts` and `.js` should match the convention used for similar page tests in the repository.
7. No additional components are extracted (e.g., `UserTable`, `UserRow`) unless the implementation naturally benefits from it; the table can be rendered directly in `Users.jsx`.
8. The existing `Dashboard.jsx` page serves as the reference for page structure and styling conventions.

## References
- Project context: `docs/ai/project-context.md`
- Context map: `docs/ai/context-map.json`
- Existing pages: `src/pages/Dashboard.jsx`
- Existing components: `src/components/Sidebar.jsx`, `src/components/StateCard.jsx`, `src/components/RecentActivity.jsx`
- Router: `src/App.jsx`
- Existing tests: `tests/Dashboard.spec.ts`, `tests/dashboard-advanced.spec.js`, `tests/example.spec.ts`
