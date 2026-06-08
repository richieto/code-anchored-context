# Plan

## Current Alignment

Split the single package into two packages in a monorepo. Planning is
invocation-only; reference is independent and tag-driven. Working context is a
disposable bench; durable decisions live in a top-level `decisions/` log.

The settled conclusions have been distributed into `architecture.md`,
`delivery.md`, and the repo-wide `decisions/` log. This file remains the
alignment trail.

## Working Notes

- The root of the over-ambition was release-grouped initiatives; flattening
  removed most of the machinery (see decision 0002).
- The installer logic is shared via a generic `lib/installer.js` copied into
  each package and parameterized by a `config` object.
- Both packages can install into the same repo: AGENTS.md uses distinct marker
  pairs, and each package writes its own metadata file under
  `.code-anchored-context/`.

## Change Surface

- Application or runtime code: two Node CLIs and a shared installer lib. Done.
- Unit and integration tests: per-package smoke tests via `node --test`. Done.
- End-to-end tests: not applicable; the smoke tests install into temp dirs.
- Infrastructure as code: not applicable.
- CI/CD and build/release: npm workspaces; publish per package. See
  `delivery.md`.
- Configuration and secrets: none.
- Observability and operations: not applicable for a CLI scaffold tool.
- Security and data: none; the tool only writes documentation scaffolding.
- Reference and release-doc impact: the umbrella README and per-package READMEs.

## Open Questions

- Whether to later add an umbrella `code-anchored-context` meta-installer that
  delegates to both packages.

## Notes To Promote

- [x] Settled technical shape into `architecture.md`
- [x] Delivery and packaging into `delivery.md`
- [x] Durable decisions into the repo-wide `decisions/` log
