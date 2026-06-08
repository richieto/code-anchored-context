---
name: reference-baseline
description: Run the first baseline pass that documents a project's current accepted behavior under reference/. Use ONLY when a human explicitly asks to create initial/baseline reference, document the current system, or generate domain terminology and baseline clarifications. Do not trigger automatically.
---

# Reference Baseline

Use this skill when a human explicitly asks to document the current system as a
starting point under `reference/`. This is common when adopting reference in an
existing project that has little or no reference material.

This is a documentation workflow. It must not change executable behavior.

## Invariants

- Read the nearest `AGENTS.md`, `reference/README.md`,
  `reference/_authoring/README.md`, and `reference/_authoring/workflow.md`
  before editing.
- Keep `reference/_authoring/terminology.md` for project and product domain
  language.
- Keep accepted, currently-true behavior in `reference/`.
- Keep uncertain, ambiguous, future, or disputed behavior out of `reference/`.
  Capture it in `reference/_authoring/baseline-clarifications.md`.
- Prefer source-backed facts. Do not guess. Mark unknowns clearly.
- Preserve user work and existing documentation. Extend existing area guides
  and reference pages rather than replacing them wholesale.
- If the planning package is also installed and `context/project-profile.md`
  exists, read it for repo-wide operating facts, but do not require it.

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

### 2) Map Reference Areas

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

### 3) Populate Domain Terminology

Update `reference/_authoring/terminology.md` with canonical product and domain
language discovered during the baseline pass.

Include:

- reader-facing names for product concepts
- overloaded or misleading code-level names and their preferred translation
- relationships between important concepts
- wording guardrails that prevent false claims

When terminology is ambiguous, do not force a definition. Add the ambiguity to
`reference/_authoring/baseline-clarifications.md` and link to it from the
relevant area guide when useful.

### 4) Write Baseline Reference

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

### 5) Capture Clarifications

Create or update `reference/_authoring/baseline-clarifications.md` when the
baseline pass finds unresolved questions.

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

### 6) Record The Baseline

Append or update one row in `reference/releases/index.md`.

If there is a release tag, use it. If there is no tag yet, use a clear label
such as:

```text
baseline/<branch>@<short-sha>
baseline/2026-06-06
```

The summary should say this was the first baseline documentation pass and list
the refreshed areas.

### 7) Validate And Summarize

Before finishing:

- run `git diff --check`
- inspect `git diff --name-status`
- confirm the diff is documentation, reference, skills, agent guidance, or
  comment-only source pointers

Report:

- baseline reference point
- reference areas and feature pages created or updated
- terminology added or clarified
- unresolved baseline clarifications
- validation commands run
