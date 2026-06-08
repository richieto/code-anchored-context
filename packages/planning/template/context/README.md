# context/

This folder is the working bench for PROJECT_NAME: the live planning and
implementation context for work in progress.

It is meant to drift and to be disposable. Initiatives accumulate here while
work is active and can be archived once their durable conclusions have been
distilled out. The two things that are meant to persist are:

- the append-only decision log under [`../decisions/`](../decisions/), and
- release-anchored behavior under `reference/` if the project uses the
  reference package.

## Start Here

- `initiatives/` holds one folder per piece of work in progress.
- `project-profile.md` captures repo-wide operating facts (stack, commands,
  test layers, e2e, CI/CD, infrastructure, observability) when populated.
- `_templates/initiative/` is the shape to copy when starting a new initiative.

## How Work Flows

```text
plan-with-context        ->  context/initiatives/<slug>/plan.md
grill-and-distribute     ->  per-concern docs (spec, interface, architecture,
                             testing, delivery, infrastructure, operations,
                             backlog, release-doc-notes)
                         ->  accepted decisions promoted to ../decisions/
```

1. Start an initiative by copying `_templates/initiative/` into
   `context/initiatives/<slug>/`.
2. Use the `plan-with-context` skill to draft the durable plan in `plan.md`.
   The plan must consider the whole change surface, not only application code:
   unit and integration tests, e2e, IaC, CI/CD, configuration and secrets,
   observability, rollout, and security.
3. When the plan is settled, use the `grill-and-distribute` skill to
   interrogate the gaps, fan the plan into the per-concern docs, and promote
   accepted architecture and design decisions into the durable
   [`../decisions/`](../decisions/) log.

## The Rule

`plan.md` is allowed to be messy, but it must not become the only place where
settled truth lives. Settled behavior moves into the per-concern docs; durable
decisions move into the decision log; future reference impact is captured in
`release-doc-notes.md`.

## Relationship To reference/

`context/` describes what is being planned, built, or decided. `reference/`
describes what the system does as of a release tag or baseline. Do not edit
`reference/` from normal development work. Capture future reference impact in
each initiative's `release-doc-notes.md`.
