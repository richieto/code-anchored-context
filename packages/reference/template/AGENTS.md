# Agent Guidance - PROJECT_NAME

This file applies to the whole repo. Area-specific `AGENTS.md` files in
subfolders layer on top of it. Read those too when working in a given area.

<!-- code-anchored-context:reference:start -->
## Release-Anchored Reference

This project keeps release-anchored reference material under
[`reference/`](reference/). Reference describes accepted system behavior as of a
known release tag or explicit baseline. It is not edited as a side effect of
feature work, bug fixes, or refactors.

Touch `reference/` only when a human explicitly asks to refresh reference for a
release, create or refresh a baseline, update a specific page, or fix a
demonstrable error. The authoring workflow, per-area guides, and domain
terminology live under
[`reference/_authoring/`](reference/_authoring/README.md).

These skills are invocation-only:

- Use [`.agents/skills/reference-from-tags/SKILL.md`](.agents/skills/reference-from-tags/SKILL.md)
  to refresh reference from the diff between two release tags. It works whether
  or not any planning workflow was used; it can optionally read
  `release-doc-notes.md` when present, but does not require it.
- Use [`.agents/skills/reference-baseline/SKILL.md`](.agents/skills/reference-baseline/SKILL.md)
  for the first baseline pass that documents the current accepted behavior.
<!-- code-anchored-context:reference:end -->
