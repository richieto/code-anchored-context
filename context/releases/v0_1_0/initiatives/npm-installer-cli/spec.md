# Spec

## Purpose

Provide a simple way to install the Code-Anchored Context template into an
existing repository so humans can tell their agents to start using the local
`AGENTS.md`, `.agents/skills/`, and `context/` workflow immediately.

## Goals

- Publishable npm package metadata exists.
- A `code-anchored-context init` command installs the template into a target
  project.
- A `code-anchored-context status` command reports installed scaffold metadata
  when the target was initialized by a version that writes metadata.
- The initializer is safe by default and does not overwrite existing generated
  directories unless `--force` is passed.
- The initializer replaces `PROJECT_NAME` and the initial release slug during
  install.

## Non-Goals

- Do not make consuming projects depend on the package at runtime.
- Do not refresh reference in `reference/`.
- Do not migrate or merge an existing project's bespoke planning system.
- Do not require package dependencies for the initializer.

## Behavior

The normal flow is:

1. A human runs `npx code-anchored-context init` from an existing repository or
   passes `--target <path>`.
2. The command infers the project name from the target `package.json` or folder
   name unless `--project-name` is supplied.
3. The command uses `v1_0_0` as the initial release slug unless `--release` is
   supplied.
4. The command installs:
   - `AGENTS.md`
   - `.agents/skills/code-anchored-context/SKILL.md`
   - `.agents/skills/project-baseline/SKILL.md`
   - `.agents/skills/release-context-closeout/SKILL.md`
   - `context/`, including `context/project-profile.md`
   - `reference/` unless `--no-reference` is supplied
   - `context/.code-anchored-context.json`
5. If `AGENTS.md` already exists, the command appends or refreshes a
   Code-Anchored Context section instead of replacing the whole file.
6. If generated directories already exist, the command skips them unless
   `--force` is supplied.
7. `--dry-run` prints planned actions without writing files.
8. `code-anchored-context status` reads `context/.code-anchored-context.json`
   from the selected target and prints the running CLI version, installed
   scaffold version, project name, release, reference scaffold state, and
   installed skills. Older installs without metadata are reported without
   modifying files.

The release slug may contain only letters, numbers, dots, underscores, and
hyphens because it becomes part of generated file paths.

## Acceptance Criteria

- [x] `npm test` passes.
- [x] `node ./bin/code-anchored-context.js init --dry-run` prints planned
      actions without writing files.
- [x] Installing into an empty target creates the expected agent and
      Working context files.
- [x] Installing into an empty target creates
      `context/project-profile.md` with project placeholders replaced.
- [x] Installing into an empty target creates all packaged skills:
      `code-anchored-context`, `project-baseline`, and
      `release-context-closeout`.
- [x] Installing into an empty target creates
      `context/.code-anchored-context.json` with package version metadata.
- [x] Installing without `--release` uses `v1_0_0` as the initial current
      release.
- [x] `code-anchored-context status` reports the running CLI version and
      installed scaffold metadata.
- [x] Installing with `--no-reference` skips `reference/`.
- [x] Existing `docs/` folders are preserved and do not block
      `reference/` installation.
- [x] A custom `--release` updates content and release folder names.
- [x] Existing generated paths are skipped unless `--force` is supplied.

## Dependencies

- npm for distribution.
- Node.js 18 or newer for the CLI runtime.
