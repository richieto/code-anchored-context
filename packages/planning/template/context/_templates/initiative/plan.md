# Plan

Use this file as the working alignment space for humans and agents. It may
contain rough thinking, questions, options, partial plans, and notes from
collaboration sessions.

A durable plan considers the whole change surface, not only the application
code. Before the plan is settled, make sure it has addressed each of these
that apply:

- Application or runtime code
- Unit and integration tests
- End-to-end tests
- Infrastructure as code and environment changes
- CI/CD pipelines and build/release behavior
- Configuration, feature flags, and secrets (by name only)
- Observability, rollback, and operational impact
- Security, permissions, and data handling
- Reference or release-documentation impact

`plan.md` is allowed to be messy, but it must not become the only place where
settled truth lives. Promote stable conclusions into the appropriate files:

- `spec.md` for settled behavior and acceptance criteria
- `interface.md` for settled UI, API, config, or human workflow details
- `architecture.md` for settled internal shape, boundaries, flows, and data
- `testing.md` for settled verification strategy, coverage, and release gates
- `delivery.md` for settled CI/CD, build, deployment, and promotion behavior
- `infrastructure.md` for settled environment shape, IaC, and dependencies
- `operations.md` only for actionable runtime, support, failure, rollback, and
  repair notes
- `backlog.md` for executable work items
- the repo-wide `decisions/` log for durable architecture and design decisions
- `release-doc-notes.md` for future reference impact

## Current Alignment

Describe the current agreed direction.

## Working Notes

- Note 1

## Open Questions

- Question 1

## Options Considered

| Option | Pros | Cons | Status |
| --- | --- | --- | --- |
| TBD | TBD | TBD | Open |

## Notes To Promote

Use this section as a short queue of stable points that should be moved into
the canonical files.

- [ ] Move settled behavior into `spec.md`
- [ ] Move settled interface details into `interface.md`
- [ ] Move settled technical shape into `architecture.md`
- [ ] Move settled verification strategy into `testing.md`
- [ ] Move settled delivery and pipeline behavior into `delivery.md`
- [ ] Move settled environment and IaC context into `infrastructure.md`
- [ ] Move actionable runtime/support concerns into `operations.md`
- [ ] Move executable work into `backlog.md`
- [ ] Promote accepted decisions into the repo-wide `decisions/` log
- [ ] Move reference impact into `release-doc-notes.md`
