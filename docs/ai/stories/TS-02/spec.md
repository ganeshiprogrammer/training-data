Reading the story-analyzer context pack first.
Description is truncated; checking execution artifacts for the full story details.
Searching for the full TS-02 story definition referenced by the context pack.
# TS-02: Add Customer List Widget to Dashboard Page

## Overview

Add a **Recent Customers** list widget to the AdminPro Dashboard so administrators can see a concise customer summary without opening the Customers tab. Data is **mock-only** until backend APIs exist.

## User Story

**As** an administrator using AdminPro,  
**I want** a summary list of customers on the Dashboard page,  
**So that** I can quickly see recent customer overviews without navigating to the dedicated Customers tab.

## Scope

### In scope

- New **Recent Customers** widget on the main Dashboard view
- Static mock data (3 records) rendered in the UI
- Row layout: avatar initials, name, email, status badge
- Visual alignment with existing Dashboard patterns (white cards, typography, avatars)
- Placement below existing metrics cards **or** alongside the **Recent Activity** list, per the current layout grid
- Responsive behavior on standard desktop and laptop widths

### Out of scope

- Backend/API integration for customer data
- HTTP requests or live data fetching
- Customers tab changes
- More than 3 list rows on the Dashboard widget

## Requirements

1. **Widget presence** — Dashboard shows a widget titled **Recent Customers**.
2. **Mock data only** — Widget uses local static data (component state or equivalent); no API calls.
3. **Record limit** — Exactly **3** customer rows are shown.
4. **Row content** — Each row includes:
   - **Avatar** — Circular badge with initials (e.g. `DJ` for David Jones), using existing theme colors (e.g. `#3b82f6` or similar brand blues)
   - **Customer name** — Bold primary text
   - **Email** — Secondary text below the name
   - **Status badge** — Small badge for account status
5. **Status styling** — `Active` → green badge/text/background; `Pending` → yellow/orange badge/text/background
6. **Layout integration** — Widget fits the Dashboard grid below metric cards and/or beside **Recent Activity**, with consistent margins, borders, shadows, and fonts
7. **Testability** — Interactive and structural elements use `data-testid` attributes (project convention)
8. **Styling approach** — Follow established **inline style props** pattern used elsewhere in the app

## UI Notes

| Element | Specification |
|--------|----------------|
| Widget title | `Recent Customers` |
| Card style | Clean white card consistent with Dashboard widgets |
| Avatar | Circular initials badge; brand/theme blue tones |
| Name | Bold (e.g. David Jones) |
| Email | Muted/secondary below name |
| Status | Compact colored badge per row |
| Reference section | Match **Recent Activity** widget styling (spacing, borders, shadows, typography) |
| Max rows | 3 |

## Mock Data

Use this static array in component state (or equivalent local mock):

```json
[
  {
    "id": 1,
    "name": "David Jones",
    "initials": "DJ",
    "email": "david.j@example.com",
    "status": "Active"
  },
  {
    "id": 2,
    "name": "Emma Watson",
    "initials": "EW",
    "email": "emma.w@example.com",
    "status": "Active"
  },
  {
    "id": 3,
    "name": "Frank Miller",
    "initials": "FM",
    "email": "f.miller@example.com",
    "status": "Pending"
  }
]
```

## Acceptance Criteria

- [ ] **UI alignment** — Widget integrates into the Dashboard layout and matches **Recent Activity** styling (margins, borders, shadows, fonts).
- [ ] **Data rendering** — All **3** mock records render in the list.
- [ ] **Status badges** — `Active` uses green styling; `Pending` uses yellow/orange styling, per mock data.
- [ ] **Responsiveness** — List layout remains usable on standard desktop and laptop resolutions.
- [ ] **No backend dependency** — No HTTP/API requests; data comes only from local state/mock data.

## Implementation Notes

### Stack and paths (from context map)

| Area | Location / detail |
|------|-------------------|
| Framework | React 19 SPA (JavaScript + JSX) |
| Build | Vite 8 |
| Router | `react-router-dom` 7 — `src/App.jsx` |
| Entry | `src/main.jsx` |
| Pages | `src/pages/` |
| Components | `src/components/` |
| Tests | `tests/` — Playwright 1.59+ |
| Lint | ESLint 9 flat config — `eslint.config.js` |

### Conventions

- **Inline style props** are the established styling pattern.
- **`data-testid`** is required on testable elements.
- **No backend** — static/mock data only for this story.

### Project quirks (for planners/implementers)

- Unused dead code: `src/components/dashboard.jsx` (lowercase) — do not extend unless intentionally cleaning up.
- `StateCard.jsx` exports `StatCard` (filename/export mismatch) — follow existing import patterns when touching Dashboard metrics.
- `package.json` has no `start` script; Playwright `webServer` may reference `npm run start` — verify test/dev scripts when adding tests (`npm run dev`, `npx playwright test`).

### Suggested touch points (non-binding)

- Dashboard page under `src/pages/`
- New or extended component under `src/components/` for the Recent Customers widget
- Playwright specs under `tests/` for rendering, row count, status colors, and absence of network calls (if tests are added in a later step)

## Open Questions

1. **Exact placement** — Should the widget sit strictly below metric cards, strictly beside **Recent Activity**, or follow whatever the current Dashboard grid already supports? Story allows either; confirm against live layout during implementation.
2. **Component structure** — Single new widget component vs. extending an existing Dashboard container — left to implementation planner unless product specifies a file name.

## Assumptions

- Story content matches the full Jira/user description for **TS-02** (context pack description was truncated; remainder taken from the same story text used for this feature in project execution metadata).
- **Recent Activity** already exists on the Dashboard and serves as the visual reference for the new widget.
- Status values in mock data are limited to `Active` and `Pending` for this story.
- No authentication or role changes are required beyond the existing AdminPro admin Dashboard access.

## References

- Context pack: `.opencode/executions/exec-78dad94f-416c-4df5-8a2c-77fbf2b5b888/context-packs/story_analyzer.md`
- Output target: `docs/ai/stories/TS-02/spec.md`
- Context map: `docs/ai/context-map.json`
- Project context (if needed later): `docs/ai/project-context.md`
- SDLC / governance: `.opencode/agents/_sdlc-rules.md`, `.opencode/agents/governance-agent.md`
