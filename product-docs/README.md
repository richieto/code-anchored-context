# Product Docs

This folder holds release-anchored product documentation for PROJECT_NAME.

Product docs describe shipped behavior for a known release, tag, or explicit
baseline. They are not the place for in-progress planning, implementation
notes, or draft architecture decisions. Put that work in `context/`.

## Start Here

- `releases/index.md` records release or baseline documentation refreshes.
- `_authoring/README.md` explains how humans and agents should author product
  docs.
- `_authoring/workflow.md` defines when product docs are refreshed and what
  belongs here.
- `_authoring/areas/` contains per-area authoring guidance.

## Standard Layout

```text
product-docs/
  README.md
  releases/
    index.md
  _authoring/
    README.md
    workflow.md
    terminology.md
    areas/
      <area>.md
  _templates/
    area/
      README.md
      features/
        feature-template.md
  <Area>/
    README.md
    features/
      <feature>.md
```

Every documented area should have:

- a high-level `README.md` that explains the area's purpose and architecture
- one page per feature under `features/`
- an authoring guide under `product-docs/_authoring/areas/`

## Contributing

- Refresh product docs only when explicitly asked.
- For existing projects with little or no product documentation, create
  baseline product docs only when explicitly asked; otherwise document touched
  behavior during future release refreshes.
- Write for non-developer technical readers unless the project states
  otherwise.
- Write from behavior outward: product-readable first, technically anchored
  where details affect shipped behavior, operations, or support.
- Describe behavior, inputs, outputs, permissions, errors, business rules, and
  operational expectations in domain language.
- Prefer Mermaid diagrams for flows, architecture, and relationships.
- Add release refreshes to `product-docs/releases/index.md`.
