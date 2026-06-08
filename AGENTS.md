# Agent Guidance - Code-Anchored Context

This repository is an npm workspaces monorepo that publishes two packages under
the Code-Anchored Context umbrella. Area-specific `AGENTS.md` files layer on top
of this one; read those too when working in a given area.

## Repository Layout

- `packages/planning/` - the `@code-anchored-context/planning` package:
  invocation-only planning skills plus the `context/` and `decisions/` scaffold
  it installs into adopter repos.
- `packages/reference/` - the `@code-anchored-context/reference` package: the
  `reference/` scaffold plus the reference authoring and tag-diff skills.
- `writing/` - shared narrative and presentation material. Not shipped in either
  npm package.
- `context/` and `decisions/` - this repo's own working bench and durable
  decision log. The repo dogfoods the flat planning model.

Each package is self-contained: its installer lives in `bin/` and `lib/`, and
everything it copies into an adopter repo lives under `template/`. When you
change a package's installed behavior, change the files under that package's
`template/`, not this repo's root `context/` or `decisions/`.

## Working On This Repo

In-progress work for this repository lives under [`context/`](context/), which
is a disposable working bench. Start at
[`context/README.md`](context/README.md). Durable architecture and design
decisions live in the append-only log under [`decisions/`](decisions/).

The planning workflow this project ships is itself invocation-only. When you
want to plan a non-trivial change to this repo, you may use the package skills
at
[`packages/planning/template/.agents/skills/plan-with-context/SKILL.md`](packages/planning/template/.agents/skills/plan-with-context/SKILL.md)
and
[`packages/planning/template/.agents/skills/grill-and-distribute/SKILL.md`](packages/planning/template/.agents/skills/grill-and-distribute/SKILL.md).

## Reference Authoring

This repository does not keep its own `reference/` tree; the reference scaffold
is the payload of the reference package under
`packages/reference/template/reference/`. Do not create a top-level `reference/`
here. If you need to change what reference adopters receive, edit the package
template and its skills.

## Conventions

- Node >= 18, ESM (`"type": "module"`), no build step.
- Run tests with `npm test --workspaces`.
- Keep `AGENTS.md` files lean: coding conventions and agent restrictions, not
  detailed workflow. Workflow guidance belongs in the package skills.
