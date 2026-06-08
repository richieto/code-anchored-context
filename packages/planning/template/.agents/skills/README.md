# Project Skills

This directory contains repository-wide skills for agents working in this
project.

- Each skill is a folder containing a `SKILL.md` file.
- Skills are loaded on demand for repeated workflows and project conventions.

## Plan With Durable Context Skills

These skills are invocation-only. Ask for them by name; they do not run as a
side effect of ordinary work.

- `plan-with-context` - invoke explicitly to draft a durable plan for an
  initiative in `plan.md`, covering code plus tests, e2e, IaC, CI/CD, and
  operations.
- `grill-and-distribute` - invoke explicitly to interrogate the plan,
  distribute it into the durable initiative docs, and promote accepted
  decisions into the `decisions/` log.
