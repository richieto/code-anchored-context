# Agent Guidance - PROJECT_NAME

This file applies to the whole repo. Area-specific `AGENTS.md` files in
subfolders layer on top of it. Read those too when working in a given area.

<!-- code-anchored-context:planning:start -->
## Plan With Durable Context

This project keeps durable working context under [`context/`](context/) and an
append-only decision log under [`decisions/`](decisions/).

`context/` is a disposable working bench: initiatives under
[`context/initiatives/`](context/initiatives/) hold the live plan and the
distilled per-concern docs. [`decisions/`](decisions/) is durable: accepted
architecture and design decisions are promoted there so they survive after an
initiative folder is archived.

These skills are invocation-only. They do not run automatically; ask for them
by name:

- Use [`.agents/skills/plan-with-context/SKILL.md`](.agents/skills/plan-with-context/SKILL.md)
  to draft a durable plan in an initiative's `plan.md`. It forces coverage of
  the whole change surface: unit tests, e2e, IaC, CI/CD, config, observability,
  rollout, and security, not only application code.
- Use [`.agents/skills/grill-and-distribute/SKILL.md`](.agents/skills/grill-and-distribute/SKILL.md)
  once the plan is settled to interrogate gaps, fan the plan into the durable
  initiative docs, and promote accepted decisions into [`decisions/`](decisions/).

Use [`context/project-profile.md`](context/project-profile.md) for repo-wide
stack, command, test, delivery, and infrastructure facts when it is populated.
<!-- code-anchored-context:planning:end -->
