# 0001: Split into planning and reference packages

Status: Accepted
Date: 2026-06-08

## Context

The project began as a single `code-anchored-context` package that bundled a
broad working-context practice and a release-anchored reference practice into
one install. That bundle was too ambitious for adoption: the two practices have
different audiences, different triggers, and no hard dependency on each other.

- The planning/working-context practice is opinionated and process-heavy.
- The reference practice ("keep docs accurate from release tag to release tag")
  is mechanical and broadly useful on its own.

Some adopters want only reference; some want only planning; some want both.
Forcing them together raised the cost of adopting either.

## Decision

Split the project into two focused packages under one umbrella, organized as an
npm workspaces monorepo:

- `@code-anchored-context/planning` - invocation-only planning skills plus the
  `context/` and `decisions/` scaffold.
- `@code-anchored-context/reference` - the `reference/` scaffold plus the
  reference authoring and tag-diff skills.

The reference package must work independently of whether the planning package
was ever used.

## Consequences

Positive:

- Each package has a small, single-purpose surface and an easy README.
- Adopters take only what they need.
- The reference updater no longer depends on planning artifacts.

Negative or tradeoffs:

- Two packages to version and publish instead of one.
- Some installer logic is duplicated per package (accepted; see the monorepo
  layout).

## Alternatives Considered

| Alternative | Why not |
| --- | --- |
| Keep one slimmed package | Still forces both practices on every adopter. |
| One package with opt-in modules | Harder to explain than two focused packages. |
| Two unrelated repos | Loses the shared umbrella, writing, and history. |

## Origin

- Initiative: `context/initiatives/split-planning-reference/`
- Release tag, PR, or commit: this restructure commit.

## Links

- `context/initiatives/split-planning-reference/architecture.md`
- `decisions/0002-flatten-working-context-and-decision-log.md`
