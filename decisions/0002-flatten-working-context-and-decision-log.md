# 0002: Flatten working context and add a durable decision log

Status: Accepted
Date: 2026-06-08

## Context

The original model grouped initiatives under release folders
(`context/releases/<version>/initiatives/`). That single choice spawned most of
the heavy machinery: `current.md` as a release transition, a release-transition
checklist, programs, planned-initiative promotion, a cross-initiative backlog,
and a release-closeout skill.

It also left no good home for durable decisions. `context/` is a disposable
working bench that drifts by design, and `reference/` describes release behavior
rather than the rationale behind choices. Architecture and design decisions made
during work need to persist and stay navigable even after their initiative is
archived.

## Decision

Recognize three kinds of truth, not two:

1. Working context (`context/`) - disposable bench. Flatten initiatives to
   `context/initiatives/<slug>/`. Remove release folders, `current.md`,
   programs, planned-initiative promotion, the context backlog, and release
   transitions.
2. Durable decisions (`decisions/`) - a top-level, append-only ADR log with
   numbered entries and statuses (Accepted/Superseded/Deprecated). Accepted
   decisions are promoted here out of initiatives.
3. Released reference (`reference/`) - unchanged, release-tag-anchored, owned by
   the reference package.

Release-anchoring lives entirely on the reference side. The only bridge from
planning to reference is the optional `release-doc-notes.md` an initiative
leaves behind.

## Consequences

Positive:

- `context/` can be archived freely because durable decisions are extracted out.
- Decisions are navigable by status, not by digging through months of folders.
- Removes the bulk of the over-ambitious machinery.

Negative or tradeoffs:

- Multi-release program tracking is dropped for now; revisit if demand appears.
- Adopters with existing release-grouped context must migrate.

## Alternatives Considered

| Alternative | Why not |
| --- | --- |
| Keep release-grouped initiatives | Retains the machinery that made the tool too heavy. |
| Put decisions in `reference/` | Reference is release behavior, not rationale; wrong lifecycle. |
| Keep decisions only in initiatives | They would be lost when the bench is archived. |

## Origin

- Initiative: `context/initiatives/split-planning-reference/`
- Release tag, PR, or commit: this restructure commit.

## Links

- `decisions/0001-split-into-planning-and-reference-packages.md`
