# Project Skills

This directory contains repository-wide skills for agents working in this
project.

- Each skill is a folder containing a `SKILL.md` file.
- Skills are loaded on demand for repeated workflows and project conventions.

## Release-Anchored Reference Skills

These skills are invocation-only. Ask for them by name; they do not run as a
side effect of ordinary work.

- `reference-from-tags` - invoke explicitly to refresh release-anchored
  `reference/` from the diff between two release tags.
- `reference-baseline` - invoke explicitly for the first baseline pass:
  document the current accepted behavior under `reference/`.
