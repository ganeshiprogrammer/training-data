# Context Pack: final_review

Read this pack first. Open full artifacts only when a necessary detail is missing.

## Story
- Key: TS-02
- Title: Add Customer List Widget to Dashboard Page
- Description: User Story As an administrator using AdminPro, I want to view a summary list of customers directly on the Dashboard page, So that I can quickly see recent customer overviews without having to navigate away to the dedicated Customers tab. Description & Scope We need to add a new "Recent Customers" list widget to the main Dashboard view. Since the backend API endpoints for this data are still under development, this UI component should be populated entirely with mock data matching our current design system. The widget should be placed below the existing metrics cards (or alongside the "Recent Activity" list, depending on the layout grid) and match the existing UI styling (clean white cards, specific typography, and standard avatar icons). UI & Design Specifications Widget Title: Recent Customers Mock Data Fields per Row: Avatar: Circular badge with initials (e.g., "DJ" for David Jones), u…

## Handoffs
### ai_reviewer
{
  "missing": true
}
### auto_fixer
{
  "missing": true
}
### code_implementer
{
  "acceptanceCriteria": [
    "[ ] **UI alignment** — Widget integrates into the Dashboard layout and matches **Recent Activity** styling (margins, borders, shadows, fonts).",
    "[ ] **Data rendering** — All **3** mock records render in the list.",
    "[ ] **Status badges** — `Active` uses green styling; `Pending` uses yellow/orange styling, per mock data.",
    "[ ] **Responsiveness** — List layout remains usable on standard desktop and laptop resolutions.",
    "[ ] **No backend dependency** — No HTTP/API requests; data comes only from local state/mock data."
  ],
  "contextPointers": [
    "docs/ai/context-map.json",
    "docs/ai/project-context.md (only relevant sections if needed)",
    "docs/ai/stories/TS-02/implementation-plan.md",
    "docs/ai/stories/TS-02/spec.md"
  ],
  "fullArtifacts": [
    "docs/ai/stories/TS-02/implementation-plan.md"
  ],
  "keyOutputs": [
    "src/pages/Dashboard.jsx",
    "tests/Dashboard.spec.ts",
    "opencode/executions/exec-78dad94f-416c-4df5-8a2c-77fbf2b5b888/",
    "docs/ai/stories/",
    "src/components/RecentCustomers.jsx"
  ],
  "nextAgentHints": [
    "Read the handoff first. Open the full artifact only when needed for details.",
    "Validate changes against the implementation plan before review."
  ],
  "primaryArtifact": "docs/ai/stories/TS-02/implementation-plan.md",
  "risks": [],
  "schemaVersion": 1,
  "status": "completed",
  "stepKey": "code_implementer",
  "summary": "Code implementation finished with 5 changed file(s).",
  "targetFiles": [
    "src/pages/Dashboard.jsx",
    "tests/Dashboard.spec.ts",
[truncated]

### implementation_planner
{
  "acceptanceCriteria": [
    "[ ] **UI alignment** — Widget integrates into the Dashboard layout and matches **Recent Activity** styling (margins, borders, shadows, fonts).",
    "[ ] **Data rendering** — All **3** mock records render in the list.",
    "[ ] **Status badges** — `Active` uses green styling; `Pending` uses yellow/orange styling, per mock data.",
    "[ ] **Responsiveness** — List layout remains usable on standard desktop and laptop resolutions.",
    "[ ] **No backend dependency** — No HTTP/API requests; data comes only from local state/mock data."
  ],
  "contextPointers": [
    "docs/ai/context-map.json",
    "docs/ai/project-context.md (only relevant sections if needed)",
    "docs/ai/stories/TS-02/spec.md"
  ],
  "fullArtifacts": [
    "docs/ai/stories/TS-02/implementation-plan.md"
  ],
  "keyOutputs": [
    "Actionable implementation steps documented",
    "Target files identified for planned edits"
  ],
  "nextAgentHints": [
    "Read the handoff first. Open the full artifact only when needed for details.",
    "Implement the plan and inspect listed target files first.",
    "Keep edits scoped; avoid printing full file contents, full diffs, or large code blocks in chat."
  ],
  "primaryArtifact": "docs/ai/stories/TS-02/implementation-plan.md",
  "risks": [],
  "schemaVersion": 1,
  "status": "completed",
  "stepKey": "implementation_planner",
  "summary": "Implementation plan generated for code implementation.",
  "targetFiles": [
    "src/pages/Dashboard.jsx",
    "src/components/RecentActivity.jsx",
    "src/components/RecentCustomers.
[truncated]


## Target Files
- src/pages/Dashboard.jsx
- src/components/RecentActivity.jsx
- src/components/RecentCustomers.jsx
- import RecentCustomers from "../components/RecentCustomers
- src/components/dashboard.jsx
- tests/Dashboard.spec.ts
- docs/ai/stories/TS-02/spec.md
- docs/ai/stories/TS-02/implementation-plan.md
- docs/ai
- .opencode/executions
- opencode/executions/exec-78dad94f-416c-4df5-8a2c-77fbf2b5b888/
- docs/ai/stories/

## Selected Context Map
{
  "agentEntryPoints": {
    "contextMap": "docs/ai/context-map.json",
    "governance": ".opencode/agents/governance-agent.md",
    "projectContext": "docs/ai/project-context.md",
    "sdlcRules": ".opencode/agents/_sdlc-rules.md"
  },
  "schemaVersion": 1,
  "selectedEntries": {
    "conventions": {
      "components": "PascalCase .jsx",
      "locators": "data-testid kebab-case",
      "tests": "*.spec.ts or *.spec.js"
    },
    "keyPaths": {
      "components": "src/components/",
      "config": {
        "eslint": "eslint.config.js",
        "playwright": "playwright.config.ts",
        "vite": "vite.config.js"
      },
      "entry": "src/main.jsx",
      "pages": "src/pages/",
      "router": "src/App.jsx",
      "tests": "tests/"
    },
    "notes": [
      "Inline style props are the established styling pattern.",
      "data-testid attributes are mandatory for testable elements.",
      "No backend API; data is static/mock only.",
      "No 'start' script in package.json; playwright webServer references 'npm run start'.",
      "Dead code: src/components/dashboard.jsx (lowercase, unused).",
      "Filename mismatch: StateCard.jsx exported as StatCard."
    ],
    "scripts": {
      "build": "vite build",
      "dev": "vite",
      "lint": "eslint .",
      "preview": "vite preview",
      "test": "npx playwright test"
    },
    "stack": {
      "buildTool": "Vite 8",
      "framework": "React 19 SPA",
      "language": "JavaScript + JSX",
      "linting": "ESLint 9 flat config",
      "router": "react-router-dom 7",
      "testFramework": "Playwright 1.59+"
    }
  }
}

## Fallback Artifacts
- Story spec: docs/ai/stories/TS-02/spec.md
- Implementation plan: docs/ai/stories/TS-02/implementation-plan.md
- Project context: docs/ai/project-context.md
- Context map: docs/ai/context-map.json
