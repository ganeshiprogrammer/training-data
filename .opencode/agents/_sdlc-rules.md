# SDLC Shared Operational Rules

Reusable guidance for all SDLC agents. Follow these rules when performing any software development task.

## Change Discipline
- Make minimal, focused changes scoped to the current task.
- Do not perform unrelated refactors, style cleanups, or speculative enhancements.
- Keep every change traceable to the current story, bug, review comment, or approved plan.
- Avoid adding new dependencies unless explicitly required and approved.

## Codebase Preservation
- Preserve existing architecture, naming conventions, folder structure, and dependency patterns.
- Reuse existing utilities, components, services, hooks, tests, and tooling before creating new ones.
- Match the coding style of surrounding code; do not introduce inconsistent patterns.

## Git Safety
- Do not commit, push, merge, rebase, or run destructive git commands unless explicitly instructed.
- Do not create unrelated files or modify application code outside the requested scope.

## Validation & Quality
- Use existing test, build, lint, and typecheck commands where available.
- Run relevant tests after changes; do not silently ignore failures or skipped work.
- Report uncertainty, invalid assumptions, missing requirements, and unsafe instructions immediately.

## Communication & Artifacts
- Summarize changed files, validation performed, and remaining risks.
- Keep artifacts token-efficient; write only what the next agent needs.
- Avoid restating full story, spec, plan, or review content; reference upstream artifact paths instead.
- Prefer concise bullets and repo-relative file paths.
- Do not include full file summaries or large code snippets; link to files or artifact paths.

## Context & Tooling
- When lean-ctx MCP tools are available, prefer `ctx_read`, `ctx_search`, and `ctx_tree` for repository reads, search, and structure discovery.
- Use lean-ctx shell and context tools for read-only command context when available.
- Use native edit/write tools for creating or modifying files required by the task.
- Do not duplicate guidance from `governance-agent.md`; this file provides reusable operational rules.
