# Split Code-Anchored Context Into Two Packages

Status: Implementing
Primary area: packaging and agent skills
Started: 2026-06-08

## Summary

Restructure the single `code-anchored-context` package into an npm workspaces
monorepo with two focused packages under the Code-Anchored Context umbrella:

- `@code-anchored-context/planning` - invocation-only planning skills plus the
  `context/` and `decisions/` scaffold.
- `@code-anchored-context/reference` - the `reference/` scaffold plus the
  reference authoring and tag-diff skills.

The working-context model is flattened (no release folders), durable decisions
move to a top-level `decisions/` log, and the heavy multi-release machinery is
retired.

## Touched Areas

- Packages and CLIs: `packages/planning/`, `packages/reference/`
- Agent skills: `plan-with-context`, `grill-and-distribute`,
  `reference-from-tags`, `reference-baseline`
- Working context scaffold: `context/` (flattened) and `decisions/` (new)
- Reference scaffold: moved to `packages/reference/template/reference/`
- Tests: per-package smoke tests under each package's `tests/`
- Docs: umbrella `README.md` and per-package READMEs

## Current Source Of Truth

- `plan.md`
- `architecture.md`
- `delivery.md`

## Decisions

- `decisions/0001-split-into-planning-and-reference-packages.md`
- `decisions/0002-flatten-working-context-and-decision-log.md`
- `decisions/0003-make-planning-skills-invocation-only.md`

## Open Questions

- npm package names use the `@code-anchored-context/*` scope; the unscoped
  `code-anchored-context` name is reserved for a possible future umbrella
  installer.
- Multi-release program tracking is intentionally out of scope for now.

## Implementation Status

- Monorepo, both packages, skills, scaffolds, and per-package tests are in
  place. This repo now dogfoods the flat planning model.

## Agent Notes

- This initiative documents the restructure itself. Keep durable choices in the
  repo-wide `decisions/` log, not only here.
