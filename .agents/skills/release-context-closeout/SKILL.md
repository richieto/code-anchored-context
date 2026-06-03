---
name: release-context-closeout
description: Close out a completed Code-Anchored Context release. Use after the current release branch has merged or a human says a release is finished, accepted, ready to close, ready for follow-up, or should move to the next release; when asked to carry unfinished work forward, integrate shipped knowledge into reference, refresh release docs, or prepare a documentation-only closeout branch.
---

# Release Context Closeout

Use this skill after a release branch has merged or a human has explicitly
said the release is finished or accepted. The goal is to close the finished
release, advance working context to the next release, carry unfinished work
forward, and fold shipped knowledge into durable `reference/`.

This is a documentation and context workflow. It must not change executable
behavior.

## Invariants

- Do not hardcode release numbers. Derive them from repository context.
- Read the nearest `AGENTS.md`, `context/current.md`,
  `context/project-profile.md` when present, and
  `reference/_authoring/workflow.md` before editing.
- Use release defaults from `context/project-profile.md` when available:
  base branch, release tag pattern, closeout branch naming, push policy,
  PR policy, and release acceptance gates.
- If the project profile does not define a base branch, infer the remote
  default branch. If that is ambiguous, ask.
- The closeout branch may only change documentation, context, reference,
  skills, agent guidance, and comment-only source pointers. If executable
  behavior would change, stop and ask.
- Preserve user work. Inspect dirty files before stashing, rebasing, or
  switching branches. Do not hide unrelated work in a stash.
- Do not open a PR unless the human explicitly asks or the project profile
  says release closeout should open one.

## Derive Releases

1. Read the finished release from committed `context/current.md`.
   If the working tree is dirty, prefer:

```bash
git show HEAD:context/current.md
```

2. Normalize the release slug:
   - Folder slug: keep the stored slug, such as `v1_13` or `v2_0_1`.
   - Display label: replace underscores with dots, such as `v1.13`.
3. Determine the next release:
   - List `context/releases/v*` directories and parse numeric segments.
   - If exactly one higher adjacent release folder already exists, use it.
   - Otherwise increment the final numeric segment.
   - Stop and ask if the current slug cannot be parsed or multiple plausible
     next releases exist.

## Git Preparation

1. Inspect the branch and working tree:

```bash
git status --short --branch
```

2. Classify any pending files:
   - allowed: docs, `context/`, `reference/`, `.agents/`, `AGENTS.md`,
     README-style files, and comment-only source pointers
   - not allowed without human approval: executable source, config that
     changes runtime behavior, dependency files, generated artifacts, or
     unrelated work
3. If closeout-related pending work already exists and the branch needs to be
   recreated from the release base, stash only after classification:

```bash
git stash push -u -m "release-context-closeout: carry-forward context"
```

Keep the stash until the closeout branch has been committed and, if requested,
pushed.

4. Switch to the maintainer-approved release base branch and update it:

```bash
git switch <base-branch>
git pull --ff-only origin <base-branch>
```

5. Re-read `context/current.md` on the fresh base branch. If it does not name
   the finished release, stop before editing reference.
6. Create the closeout branch. Use the project profile's branch naming rule
   when present; otherwise use:

```text
context-release-closeout-<next-release-display>
```

## Context Closeout

- Mark the finished release under `context/releases/<finished>/` as released
  or historical with the final base-branch commit and date.
- Update `context/current.md` to the next release.
- Create `context/releases/<next>/` from
  `context/_templates/release-context/` if missing.
- Promote planned initiatives targeting the next release from
  `context/programs/*/planned-initiatives/`.
- Carry unfinished work forward by creating or updating next-release
  initiatives, planned initiatives, or context backlog items.
- Preserve history. Do not silently move or delete unfinished work from the
  finished release. Mark it as deferred, carried forward, or promoted and link
  to the new location.
- Update release backlogs, program release notes, source comments, and backlog
  item links so future agents do not pick deferred work from the finished
  release by mistake.
- Keep speculative work out of active release scope unless concrete product
  value and target release are clear.

## Reference Integration

Reference integration is part of closeout only after the release has merged or
the human has explicitly accepted the release.

1. Read `reference/_authoring/workflow.md`.
2. Read matching area guides under `reference/_authoring/areas/`.
3. Read all relevant
   `context/releases/<finished>/initiatives/*/release-doc-notes.md`.
4. Verify shipped behavior from the merged diff, source, tests, config,
   infrastructure, or generated artifacts when needed.
5. Update only reference pages affected by shipped behavior.
6. Ignore pure refactors, formatting, lint fixes, test-only changes, and
   dependency bumps with no behavior change.
7. Append one row to `reference/releases/index.md` unless the finished
   release is already recorded.
   - Prefer a release tag when one exists.
   - Otherwise use a clear baseline label with the base-branch commit SHA.

## Validation

- Search for stale paths or status text that still points deferred work at the
  finished release.
- Run:

```bash
git diff --check
git diff --name-status
```

- Inspect the diff and confirm it is docs/context/reference/skills/comment-only
  only.
- Run any documentation validation commands named by `context/project-profile.md`.
- Commit the closeout branch if requested or if the project profile says
  release closeout branches should be committed.
- Push only when requested or when the project profile says release closeout
  branches should be pushed.
- Drop the carry-forward stash only after the relevant commit and push policy
  has succeeded.

## Final Summary

Report:

- finished release and next release
- base branch and closeout branch
- context carried forward
- reference pages changed
- validation commands run
- whether a commit, push, or PR was created
