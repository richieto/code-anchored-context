---
name: plan-with-context
description: Draft a durable, repository-local plan for a piece of work in an initiative's plan.md. Use ONLY when the human explicitly invokes it, for example "plan with context", "plan with durable context", or "durable plan". Do not trigger this skill automatically for ordinary planning, questions, or coding; the built-in plan mode is fine for those.
---

# Plan With Durable Context

## When To Use This

Use this skill only when a human explicitly asks to "plan with context",
"plan with durable context", or to produce a durable plan for an initiative.

Ordinary planning, questions, and small changes do not need this skill. It
exists to produce a plan that survives the session and feeds the
`grill-and-distribute` step, not to wrap every task.

## Goal

Produce a plan in an initiative's `plan.md` that covers the whole change
surface, not just the application code. Most agents plan the code edit and stop;
the value here is forcing the surrounding surfaces into the plan: tests, e2e,
infrastructure, pipelines, configuration, observability, rollout, and security.

## Workflow

### 1) Read The Local Rules

Read the nearest `AGENTS.md` for the workspace and the area being changed.
Respect area-specific engineering rules first.

### 2) Read The Project Profile

Open `context/project-profile.md` when it exists. It is the repo-wide operating
profile: stack, source roots, commands, test layers, e2e tooling, CI/CD,
infrastructure, observability, and generated artifacts. Use it to learn which
surfaces this repository actually has so the plan can address them. Do not
invent tooling that the profile or the repository does not show.

If the profile is missing or sparse, inspect the repository directly
(manifests, test config, CI/CD workflows, IaC, deploy scripts) enough to know
what surfaces exist. Do not guess.

### 3) Find Or Create The Initiative

Look under `context/initiatives/` for an existing initiative that this work
belongs to. Reuse it when the work fits.

Otherwise create a new initiative by copying `context/_templates/initiative/`
to:

```text
context/initiatives/<initiative-slug>/
```

Update the copied `README.md` first so the status, summary, and touched areas
are clear, then work in `plan.md`.

For a tiny localized fix that does not warrant an initiative, say so and stop;
do not invent process.

### 4) Draft The Plan In plan.md

Write the working plan in the initiative's `plan.md`. Keep it the living
alignment space with the human: current direction, options considered, and open
questions.

Drive the plan across the full change surface. For each item, either plan the
work or explicitly record that it does not apply and why:

- Application or runtime code
- Unit and integration tests
- End-to-end tests
- Infrastructure as code and environment changes
- CI/CD pipelines and build/release behavior
- Configuration, feature flags, and secrets (by name only, never values)
- Observability, rollback, and operational impact
- Security, permissions, and data handling
- Reference or release-documentation impact

Use the project profile to ground each item in the repository's real tooling
and commands.

### 5) Align With The Human

Surface the open questions and the options considered. Keep iterating in
`plan.md` until the human agrees the direction is settled. Do not start
distributing into the stable docs yet; that is the next step.

## Handoff

When the plan is settled, the next step is to interrogate the gaps and
distribute the plan into the durable per-concern docs and the decision log.
Use the `grill-and-distribute` skill for that.

## Completion Check

- The work has an initiative folder under `context/initiatives/`, or a reason
  was given for why none is needed.
- `plan.md` exists and addresses every applicable change surface, marking the
  rest as not applicable with a reason.
- The project profile was read (or the repository was inspected) so the plan is
  grounded in real tooling.
- Open questions and options are visible for the human to confirm.
- Settled truth has not been frozen prematurely; distribution is left to
  `grill-and-distribute`.
