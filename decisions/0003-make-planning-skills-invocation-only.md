# 0003: Make planning skills invocation-only

Status: Accepted
Date: 2026-06-08

## Context

The original `code-anchored-context` skill (246 lines) had a broad description
that surfaced on almost any behavior-changing work. That auto-triggering put
heavy guidance into the agent context window even when it was not wanted, which
was a primary complaint about the tool.

The valuable kernel is small: make the agent plan beyond the application code
(tests, e2e, IaC, CI/CD, configuration, observability, rollout, security), keep
a durable plan, and distill it into durable artifacts.

## Decision

Replace the single broad skill with two lean, invocation-only skills:

- `plan-with-context` - draft the durable plan in an initiative's `plan.md`.
- `grill-and-distribute` - interrogate gaps, distribute into per-concern docs,
  and promote accepted decisions into the `decisions/` log.

Their descriptions are tuned to explicit invocation phrases ("plan with
context", "grill me", "distribute the plan") so they do not auto-fire during
ordinary plan-mode work. Retire the broad `code-anchored-context` skill and the
`release-context-closeout` skill (its reference work becomes the reference
package's `reference-from-tags`).

## Consequences

Positive:

- No context-window cost until a human explicitly asks for the workflow.
- The built-in plan mode remains the default for casual planning.
- The kernel value (planning the whole change surface) is preserved.

Negative or tradeoffs:

- Users must know the invocation phrases; mitigated by README and AGENTS guidance.

## Alternatives Considered

| Alternative | Why not |
| --- | --- |
| Keep one broad auto-triggering skill | The auto-trigger and bloat were the core complaint. |
| Soften the broad skill's trigger only | Still one large skill; less clear than two focused ones. |

## Origin

- Initiative: `context/initiatives/split-planning-reference/`
- Release tag, PR, or commit: this restructure commit.

## Links

- `packages/planning/template/.agents/skills/plan-with-context/SKILL.md`
- `packages/planning/template/.agents/skills/grill-and-distribute/SKILL.md`
