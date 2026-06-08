---
name: grill-and-distribute
description: Interrogate a settled initiative plan for gaps, then distribute it into the durable per-concern docs and promote accepted decisions into the decisions/ log. Use ONLY when the human explicitly invokes it, for example "grill me", "distribute the plan", "distribute the context", or "grill and distribute". Do not trigger automatically.
---

# Grill And Distribute

## When To Use This

Use this skill only when a human explicitly asks to "grill me", "distribute
the plan", "distribute the context", or "grill and distribute", and there is a
settled `plan.md` in an initiative under `context/initiatives/`.

This is the second half of durable planning. The first half (`plan-with-context`)
produces the plan; this half pressure-tests it and turns the disposable plan
into durable artifacts.

## Goal

Two outcomes:

1. Grill the human to expose gaps the plan glossed over, especially on surfaces
   beyond the application code.
2. Distribute the settled plan into the per-concern initiative docs, and promote
   accepted decisions into the durable repo-wide `decisions/` log so they
   survive after the initiative folder is archived.

## Workflow

### 1) Load The Plan And Profile

Read the initiative's `README.md` and `plan.md`, and read
`context/project-profile.md` when it exists to know the repository's real
surfaces and tooling.

### 2) Grill

Interrogate the plan with pointed questions. Focus on the surfaces agents
usually skip. Ask only the questions that actually apply to this change, and
prefer concrete questions grounded in the repository's tooling:

- Unit and integration tests: what proves the new behavior? what regressions
  are at risk?
- End-to-end tests: which user or system flows must be exercised?
- Infrastructure as code: what environment, resource, or config changes ship
  with this, and in what order?
- CI/CD and build/release: what pipeline, gate, or artifact changes are needed?
- Configuration, flags, and secrets: what is added or changed? (names only)
- Observability and operations: what logs, metrics, alerts, or dashboards
  change? what is the rollback path?
- Security, permissions, and data: what is the blast radius? what data is
  touched?
- Migration and compatibility: what is the upgrade or backfill story?
- Reference and release-doc impact: what shipped behavior will need documenting?

Record the answers back into `plan.md` as they are settled. If the human defers
a surface, capture that it was considered and deferred, with a reason.

### 3) Distribute Into The Per-Concern Docs

Move settled conclusions out of `plan.md` into the stable initiative files.
Create files that apply and mark the rest as not applicable:

- `spec.md` - settled behavior and acceptance criteria
- `interface.md` - settled UI, API, config, or human workflow details
- `architecture.md` - settled internal shape, boundaries, flows, and data
- `testing.md` - verification strategy, coverage, test data, release gates
- `delivery.md` - CI/CD, build, deployment, and promotion behavior
- `infrastructure.md` - environment shape, IaC, and dependencies
- `operations.md` - only when there is actionable runtime/support/rollback context
- `backlog.md` - executable work items
- `release-doc-notes.md` - future reference impact to review at release time

Keep `plan.md` as the alignment trail, but ensure no settled truth lives only
there.

### 4) Promote Accepted Decisions Into The Decision Log

For each architecture or design decision that was accepted during this work,
promote it into the repo-wide `decisions/` log:

1. Read `decisions/README.md` for the conventions and the current index.
2. Assign the next sequential number `NNNN`.
3. Create `decisions/NNNN-short-title.md` from `decisions/0000-template.md` with
   status `Accepted` and today's date.
4. Fill in context, decision, consequences, and alternatives from the plan and
   the grilling.
5. In the `Origin` section, link back to
   `context/initiatives/<slug>/` and to the release tag, PR, or commit when
   known.
6. Add a row to the index table in `decisions/README.md`.
7. If this decision replaces an earlier one, set the earlier decision's status
   to `Superseded by NNNN`. Never rewrite or delete the earlier decision.

Drafts may exist in the initiative's local `decisions/` folder; the durable
record lives in the repo-wide `decisions/` log.

### 5) Update The Initiative Entry Point

Update the initiative `README.md`: status, touched areas, implementation
status, and the list of promoted decisions.

## Boundary

Do not edit `reference/` here. Future reference impact belongs in the
initiative's `release-doc-notes.md`. Reference refresh is a separate,
explicitly requested activity.

## Completion Check

- The plan was grilled across every applicable surface, with answers captured.
- Settled truth was distributed into the per-concern docs; `plan.md` is no
  longer the only home for it.
- Accepted decisions were promoted into the `decisions/` log with a number,
  status, origin backlinks, and an index row.
- Superseded decisions were marked, not deleted.
- The initiative `README.md` reflects the current status.
- `reference/` was left untouched.
