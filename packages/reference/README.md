# @code-anchored-context/reference

Invocation-only agent skills and scaffold for release-anchored reference.
Document accepted system behavior, and refresh it from the diff between release
tags.

This works whether or not you use any planning workflow. The code diff between
tags is the source of truth; planning artifacts, if present, are optional
enrichment.

## Install

```bash
npx @code-anchored-context/reference init --project-name "My App"
```

Options: `--target <path>`, `--dry-run`, `--force`. A `status` command reports
what is installed.

This adds, into the target repo:

- `reference/` - the reference tree, with `_authoring/` (workflow, area guides,
  terminology), `_templates/`, and `releases/index.md`.
- `.agents/skills/reference-from-tags/` and `.agents/skills/reference-baseline/`.
- A `Release-Anchored Reference` section in `AGENTS.md`.

## Use

The skills are invocation-only. For an existing project, capture the current
behavior first:

```text
Create a baseline reference for this repo.
```

At release time:

```text
Refresh reference from <previous-tag> to <new-tag>.
```

## Boundary

Reference describes what shipped for a known release. It is not edited as a side
effect of feature work. Refresh it only when explicitly asked.
