---
name: project-baseline
description: Run the first Code-Anchored Context adoption baseline. Use after init when a human asks to populate the project profile, document the current product baseline, create initial reference, generate domain terminology, or capture baseline ambiguities and clarifications before normal release work begins.
---

# Project Baseline

Use this skill after `code-anchored-context init` when the project needs its
first source-backed operating profile and accepted behavior baseline. The goal
is to make the next release start from known project facts instead of an empty
scaffold.

This is a documentation and context workflow. It must not change executable
behavior.

## Invariants

- Read the nearest `AGENTS.md`, `context/current.md`,
  `context/project-profile.md`, `reference/_authoring/README.md`, and
  `reference/_authoring/workflow.md` before editing.
- Keep `context/project-profile.md` for repo-wide operating facts: stack,
  commands, source roots, verification, delivery, infrastructure,
  observability, and generated artifacts.
- Keep `reference/_authoring/terminology.md` for project and product domain
  language. Do not replace `context/terminology.md`; that file defines the
  Code-Anchored Context practice vocabulary.
- Keep accepted current behavior in `reference/`.
- Keep uncertain, ambiguous, future, or disputed behavior out of
  `reference/`. Capture it in `context/baseline-clarifications.md` or in the
  matching area guide's baseline discovery notes.
- Prefer source-backed facts. Do not guess. Mark unknowns clearly.
- Preserve user work and existing documentation. Extend existing area guides
  and reference pages rather than replacing them wholesale.

## Baseline Scope

If the human names a scope, use it:

- whole repository
- one product, package, service, or app
- one feature family
- one operational surface, such as delivery, infrastructure, observability, or
  support

If no scope is named, default to a broad first-pass baseline for the current
working tree. Record the reference point you used in
`reference/releases/index.md`, such as a branch, tag, commit SHA, date, or
human-named baseline label.

## Workflow

### 1) Inspect The Repository Shape

Gather source-backed facts from:

- manifests, lockfiles, runtime version files, build config, and framework
  config
- source roots, application boundaries, package boundaries, APIs, jobs,
  generated artifacts, and code owners
- tests, fixtures, e2e tooling, seeded data, and test environments
- CI/CD workflows, deployment scripts, release toggles, artifact publishing,
  and environment promotion
- infrastructure as code, service manifests, secrets references, and
  environment dependencies
- observability, logs, metrics, traces, alerts, dashboards, runbooks, support
  tooling, rollback, recovery, and repair procedures
- existing product, user, API, operations, or support docs

Use `rg` and source-native tooling before inventing commands.

### 2) Populate `context/project-profile.md`

Replace starter unknowns with source-backed facts. Keep the profile concise
and useful for future agents.

Cover:

- repository shape and source roots
- stack and runtime
- install, local run, build, lint, typecheck, test, smoke, package, and
  release commands
- verification expectations and known gaps
- delivery and release conventions
- infrastructure and configuration
- operations, observability, support, rollback, and repair
- generated artifacts and their owning sources

If a fact cannot be established from source, leave it as `Unknown` and name
the files or folders that were inspected.

### 3) Map Reference Areas

Identify the product or operational areas that need baseline reference. For
each area, create or update:

```text
reference/_authoring/areas/<area-slug>.md
```

Use `reference/_authoring/areas/_template.md` when creating a new area guide.
Record:

- source orientation
- reference root
- feature inventory
- what matters at release time
- what to ignore
- code orientation and search terms
- baseline discovery notes
- area-specific terminology and cross-links

### 4) Populate Domain Terminology

Update `reference/_authoring/terminology.md` with canonical product and domain
language discovered during the baseline pass.

Include:

- reader-facing names for product concepts
- overloaded or misleading code-level names and their preferred translation
- relationships between important concepts
- wording guardrails that prevent false claims

When terminology is ambiguous, do not force a definition. Add the ambiguity to
`context/baseline-clarifications.md` and link to it from the relevant area
guide when useful.

### 5) Write Baseline Reference

For each selected area, create or update:

```text
reference/<Area>/README.md
reference/<Area>/features/<feature>.md
```

Use `reference/_templates/area/README.md` and
`reference/_templates/area/features/feature-template.md` for new pages.

Write from behavior outward:

- purpose and reader summary
- primary workflows
- entry points
- observable behavior
- business rules
- inputs, outputs, data effects, and state changes
- permissions, validation, errors, and edge cases
- configuration, integrations, dependencies, and operational expectations
- source references for verification

Prefer broad, accurate coverage over exhaustive implementation detail. Link to
source when useful, but do not make source links a substitute for explanation.

### 6) Capture Clarifications

Create or update `context/baseline-clarifications.md` when the baseline pass
finds unresolved questions.

Use sections such as:

```text
# Baseline Clarifications

Reference point: <branch, tag, commit, date, or baseline label>
Last reviewed: <date>

## Ambiguities

| Topic | Question | Source | Impact | Proposed owner |
| --- | --- | --- | --- | --- |

## Assumptions Made

| Topic | Assumption | Why it was safe enough | Follow-up |
| --- | --- | --- | --- |

## Deferred Baseline Work

| Area | Missing coverage | Reason | Follow-up |
| --- | --- | --- | --- |
```

Do not put unresolved questions into product-facing reference as if they were
accepted behavior.

### 7) Record The Baseline

Append or update one row in `reference/releases/index.md`.

If there is a release tag, use it. If there is no tag yet, use a clear label
such as:

```text
baseline/<branch>@<short-sha>
baseline/2026-06-06
```

The summary should say this was the first baseline documentation pass and list
the refreshed areas.

### 8) Validate And Summarize

Before finishing:

- run `git diff --check`
- inspect `git diff --name-status`
- run documentation validation commands named in `context/project-profile.md`,
  if any
- confirm the diff is documentation, context, reference, skills, agent
  guidance, or comment-only source pointers

Report:

- baseline reference point
- profile facts populated
- reference areas and feature pages created or updated
- terminology added or clarified
- unresolved baseline clarifications
- validation commands run
