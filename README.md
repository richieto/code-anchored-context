# Code-Anchored Context

Keep the context around your code close to the code, structured enough that both
humans and AI agents can find it.

Code-Anchored Context is two small, independent practices. Adopt either or both:

- Planning - draft a durable plan for a change, then distribute it into
  per-concern docs and a permanent decision log. Forces the agent to think
  beyond the code: tests, e2e, IaC, CI/CD, config, observability, and rollout.
- Reference - keep release-anchored documentation accurate by refreshing it from
  the diff between release tags.

They share one idea but have no hard dependency on each other.

## Quick Start

Install the planning workflow into a project:

```bash
npx @code-anchored-context/planning init --project-name "My App"
```

Then, when you want to plan a real change, ask your agent:

```text
Plan with durable context: <what you want to build>
```

Install the reference workflow into a project:

```bash
npx @code-anchored-context/reference init --project-name "My App"
```

Then, after cutting a release tag, ask your agent:

```text
Refresh reference from the last release tag to this one.
```

Both installers are idempotent, accept `--target <path>` and `--dry-run`, and
expose a `status` command.

## The Mental Model

There are three kinds of truth, and they live in three places:

| Folder | Meaning | Lifetime | Package |
| --- | --- | --- | --- |
| `context/` | What you are planning and building right now. | Disposable working bench; archive when done. | planning |
| `decisions/` | Why the system is the way it is. | Durable, append-only decision log. | planning |
| `reference/` | What the system does as of a release tag. | Refreshed per release. | reference |

The planning workflow distills the disposable bench into the durable artifacts:
accepted decisions go to `decisions/`, and future reference impact is noted for
the reference workflow. The reference workflow reads the code diff between tags,
so it works whether or not anyone used the planning workflow.

## The Skills

Each package installs invocation-only agent skills. They do not run
automatically, so they never crowd the context window until you ask for them.

Planning (`@code-anchored-context/planning`):

- `plan-with-context` - draft the durable plan in an initiative's `plan.md`.
- `grill-and-distribute` - interrogate the plan for gaps, fan it into the
  per-concern docs, and promote accepted decisions into `decisions/`.

Reference (`@code-anchored-context/reference`):

- `reference-from-tags` - refresh `reference/` from a tag-to-tag diff.
- `reference-baseline` - document the current accepted behavior as a first
  baseline.

## Want To Understand The Idea? Start Here

The reasoning lives in [`writing/`](writing/) as two independent narratives:

**Durable Context** (planning — `context/` and `decisions/`):

1. [The Rationale](writing/durable-context/rationale.md) - why planning context
   must live in the repo.
2. [Why](writing/durable-context/why.md) - the principle.
3. [The Structure](writing/durable-context/structure.md) - flat initiatives and
   the decision log.
4. [Limitations](writing/durable-context/limitations.md) - when not to use it.

**Code-Anchored Docs** (reference — shipped-behavior docs from release tags):

1. [Why](writing/code-anchored-docs/why.md) - docs drift and the
   release-anchored model.
2. [Keeping Docs In Sync](writing/code-anchored-docs/keeping-in-sync.md) - the
   tag-diff workflow.
3. [Limitations](writing/code-anchored-docs/limitations.md) - when not to use it.

## Repository Layout

This repo is an npm workspaces monorepo:

```text
packages/planning/    @code-anchored-context/planning
packages/reference/   @code-anchored-context/reference
writing/              shared narrative (not published)
context/  decisions/  this repo dogfoods the planning model
```

Run the test suites with:

```bash
npm test --workspaces
```
