# @code-anchored-context/planning

Invocation-only agent skills for durable planning. Draft a plan for a change in
an initiative, then grill it for gaps and distribute it into per-concern docs
and an append-only decision log.

The point: make the agent plan the whole change surface, not just the code -
unit tests, e2e, infrastructure as code, CI/CD, configuration, observability,
rollout, and security.

## Install

```bash
npx @code-anchored-context/planning init --project-name "My App"
```

Options: `--target <path>`, `--dry-run`, `--force`. A `status` command reports
what is installed.

This adds, into the target repo:

- `context/` - a disposable working bench, with `initiatives/`, a
  `project-profile.md`, and an initiative template.
- `decisions/` - a durable, append-only decision log.
- `.agents/skills/plan-with-context/` and `.agents/skills/grill-and-distribute/`.
- A `Plan With Durable Context` section in `AGENTS.md`.

## Use

The skills are invocation-only. Ask for them by name:

```text
Plan with durable context: <what you want to build>
```

then, once the plan is settled:

```text
Grill me and distribute the plan.
```

## How It Fits

`context/` is meant to be archived over time; the durable outputs are the
`decisions/` log and any reference impact captured in `release-doc-notes.md`.
For release-anchored documentation, see `@code-anchored-context/reference`.
