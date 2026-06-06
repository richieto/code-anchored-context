# Code-Anchored Context Template

This repository is a reusable starting point for keeping repository-local
working context and release-anchored reference close to the
code they describe.

It separates two kinds of truth:

| Folder | Meaning | Updated when |
| --- | --- | --- |
| `context/` | What the team is planning, building, deciding, validating, shipping, hosting, deferring, and learning, plus optional repo-wide operating facts in `project-profile.md`. | During normal development. |
| `reference/` | What the system does as of a known release or explicit baseline. | Only during explicit reference refresh work. |

The goal is to give humans and AI agents enough structured context to change a
codebase without relying on chat history, tribal memory, or scattered planning
notes.

## What This Template Contains

- `AGENTS.md` with repo-wide agent guidance.
- `.agents/skills/` with skills for the first adoption baseline, recurring
  working-context workflow, and post-release context closeout.
- `context/` with terminology, release context, backlog/program structure,
  a repo-wide project profile starter, initiative templates, and
  release-documentation notes.
- `reference/` with a generic release-anchored reference workflow,
  authoring guide structure, and area/page templates.

## Adopting This In A Project

The quickest path is the npm initializer:

```bash
npx code-anchored-context init \
  --project-name "My Project" \
  --release v1_0_0
```

Useful options:

```bash
npx code-anchored-context init --dry-run
npx code-anchored-context init --no-reference
npx code-anchored-context init --target ../existing-project
npx code-anchored-context status --target ../existing-project
```

If `--release` is omitted, the initializer uses `v1_0_0` as the first current
release because most adoptions happen in existing products.

The initializer copies the repo-local agent context into the target project,
adds or updates guidance in `AGENTS.md`, installs repository skills under
`.agents/skills/`, and replaces
basic placeholders such as `PROJECT_NAME` and the initial release slug.
It also writes `context/.code-anchored-context.json` so the target repo records
which package version last initialized or refreshed the scaffold.

Installed skills:

- `code-anchored-context` for behavior-changing work during development.
- `project-baseline` for the first adoption baseline: populate
  `context/project-profile.md`, product/domain terminology, reference area
  guides, baseline reference pages, and baseline clarifications.
- `release-context-closeout` for post-release cleanup after a release branch
  has merged or a release is accepted.

After `init`, the recommended first baseline pass is:

```text
Ask your agent to use .agents/skills/project-baseline/SKILL.md for the first
baseline pass.
```

That pass turns the scaffold into project-specific context by inspecting local
source-backed facts, documenting accepted current behavior under `reference/`,
and recording unresolved baseline ambiguities in `context/`.

For repeatable installs, pin the npm package version:

```bash
npx code-anchored-context@0.2.7 init --project-name "My Project"
```

Unpinned `npx code-anchored-context init` is convenient, but it is not a
project-local dependency or lockfile. Use `status` later to compare the
running CLI with the scaffold metadata stored in the target repo.

Manual adoption still works:

1. Copy the files into a repository root.
2. Replace `PROJECT_NAME` placeholders with the project name.
3. Set the first active release in `context/current.md`.
4. Run the equivalent of the `project-baseline` skill: populate
   `context/project-profile.md`, reference area guides, domain terminology,
   baseline reference pages, and baseline clarifications from source-backed
   facts.
5. Add or revise area-specific `AGENTS.md` files so they point back to
   `context/` and `reference/_authoring/`.
6. Keep product or domain-specific reference content out of this template repo.


## Working Rule

Working context can evolve with the branch. Reference material should
stay stable and release-accurate. When behavior changes during development,
record future reference impact in the relevant initiative's
`release-doc-notes.md`; refresh `reference/` only when that work is
explicitly requested.
