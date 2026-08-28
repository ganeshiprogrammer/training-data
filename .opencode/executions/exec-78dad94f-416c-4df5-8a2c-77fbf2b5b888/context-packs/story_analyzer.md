# Context Pack: story_analyzer

Read this pack first. Open full artifacts only when a necessary detail is missing.

## Story
- Key: TS-02
- Title: Add Customer List Widget to Dashboard Page
- Description: User Story As an administrator using AdminPro, I want to view a summary list of customers directly on the Dashboard page, So that I can quickly see recent customer overviews without having to navigate away to the dedicated Customers tab. Description & Scope We need to add a new "Recent Customers" list widget to the main Dashboard view. Since the backend API endpoints for this data are still under development, this UI component should be populated entirely with mock data matching our current design system. The widget should be placed below the existing metrics cards (or alongside the "Recent Activity" list, depending on the layout grid) and match the existing UI styling (clean white cards, specific typography, and standard avatar icons). UI & Design Specifications Widget Title: Recent Customers Mock Data Fields per Row: Avatar: Circular badge with initials (e.g., "DJ" for David Jones), u…

## Handoffs
None for this stage.

## Target Files
- docs/ai/stories/TS-02/spec.md

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
