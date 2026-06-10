# writing/

Companion writing and presentation material. Not part of either installable
package.

Two independently-branded practices live here. They share one principle — keep
truth anchored in the repository, close to the code — but solve different
problems and ship as different packages.

## Shared

- [When Spec-Driven Design Becomes Interface-Driven Design](ssd-to-idd.md) —
  precursor critique; introduces durable context.
- [Markdown For Work, HTML For People](formats.md) — what format the writing
  should live in.
- [Overview (HTML)](code-anchored-context.html) — lightweight presentation of
  both practices for stakeholders.

## Durable Context

Own the working bench and the decision log in the repo. What you plan durably
becomes the agent's working context when implementation starts.

Package: `@code-anchored-context/planning` · installs `context/` and
`decisions/`.

Reading order:

1. [The Rationale](durable-context/rationale.md) — why planning context must
   live in the repo.
2. [Why](durable-context/why.md) — the principle and the two lifetimes on this
   side.
3. [The Structure](durable-context/structure.md) — flat initiatives and the
   decision log.
4. [Limitations](durable-context/limitations.md) — when not to use it.

HTML: [Practitioner Brief](durable-context/brief.html)

## Code-Anchored Docs

Keep shipped-behavior documentation accurate from release tags. Refreshed from
the diff between tags once per release. Works with zero planning adoption.

Package: `@code-anchored-context/reference` · installs `reference/` by default
(`docs/reference/` is a natural alternative).

Reading order:

1. [Why](code-anchored-docs/why.md) — docs drift and the release-anchored model.
2. [Keeping Docs In Sync](code-anchored-docs/keeping-in-sync.md) — the tag-diff
   workflow.
3. [Limitations](code-anchored-docs/limitations.md) — when not to use it.

HTML: [Practitioner Brief](code-anchored-docs/brief.html)
