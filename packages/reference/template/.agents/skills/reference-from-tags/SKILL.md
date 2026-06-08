---
name: reference-from-tags
description: Refresh release-anchored reference/ from the diff between two release tags. Use ONLY when a human explicitly asks to refresh reference for a release, update reference from tags, update a specific reference page, or fix a demonstrable reference error. Do not trigger automatically during feature work, bug fixes, or refactors.
---

# Reference From Tags

Use this skill when a human explicitly asks to refresh `reference/` for a
release. It updates reference material from the code diff between two release
tags, so it works whether or not any planning workflow was used in the repo.

This is a documentation workflow. It must not change executable behavior.

## Invariants

- Reference is release-anchored. Reference at tag `release/vX_Y_Z` describes the
  behavior of that release.
- Do not refresh reference as a side effect of feature work, bug fixes, or
  refactors. This is an explicit, on-request activity only.
- Read `reference/README.md`, `reference/_authoring/workflow.md`, and the
  matching area guides under `reference/_authoring/areas/` before editing.
- The diff between tags is the source of truth. Planning artifacts, if any, are
  optional enrichment, never a requirement.
- Preserve existing reference. Extend and correct pages; do not wipe them.

## Workflow

### 1) Establish The Tag Range

Determine the previous reference tag and the target tag.

```bash
git tag --list --sort=-creatordate | head
```

- The target is usually the newly cut release tag (or `HEAD` for an unreleased
  refresh the human explicitly requests).
- The base is the previous release tag already recorded in
  `reference/releases/index.md`.
- If either end is ambiguous, ask before proceeding. Do not guess the range.

Record the resolved range, for example `release/v1_2_0..release/v1_3_0`.

### 2) Scope The Diff By Area

Read the area guides in `reference/_authoring/areas/`. For each documented
area, inspect the diff limited to that area's source locations:

```bash
git diff --name-status <base-tag>..<target-tag> -- <area-source-paths>
git diff <base-tag>..<target-tag> -- <area-source-paths>
```

Work one area at a time. The area guide tells you which paths own behavior and
which changes to ignore.

### 3) Pull In Optional Planning Context

If the planning package is in use, read relevant
`context/initiatives/*/release-doc-notes.md` for behavior the team flagged for
documentation. Treat this as a hint list, not a substitute for verifying the
diff. Skip this step entirely when there is no `context/`.

### 4) Update Only Affected Reference

- Update an area's `README.md` when the high-level picture changed.
- Update or add `features/<feature>.md` pages for behavior that changed or was
  added.
- Write from behavior outward, for the audience defined in
  `reference/_authoring/workflow.md`.
- Verify claims against the diff, source, tests, config, and infrastructure as
  needed.

Ignore changes with no released-behavior impact: pure refactors, internal
renames, formatting, lint fixes, test-only changes, and dependency bumps.

### 5) Record The Release

Append one row to `reference/releases/index.md`:

- Tag, date, areas refreshed, owner, and a one-sentence summary.
- "Areas refreshed" lists only areas with material behavior changes.

### 6) Validate And Summarize

```bash
git diff --check
git diff --name-status
```

Confirm the diff is documentation only. Report the tag range, the areas
refreshed, the pages changed, and the release row added.

## Single-Page And Fix Requests

When the human asks only to update one page or fix a demonstrable error
(broken link, factual inaccuracy), make the minimal change to that page and
skip the full tag-range workflow. Still verify the corrected fact against
source before editing.
