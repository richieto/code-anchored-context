# Delivery

## Packaging

- The repository is an npm workspaces monorepo. The root `package.json` is
  `private` and is never published.
- Each package under `packages/` publishes independently:
  - `@code-anchored-context/planning`
  - `@code-anchored-context/reference`
- Each package `files` array ships `bin/`, `lib/`, `template/`, `README.md`,
  and `LICENSE`.

## Build And Test

- No build step; the CLIs are plain ESM Node scripts (`"type": "module"`,
  Node >= 18).
- Tests run with `node --test` per package. From the root:

```bash
npm test --workspaces
```

## Publishing

Each package is published with its own version. Suggested flow per package:

```bash
npm publish --workspace @code-anchored-context/planning --access public
npm publish --workspace @code-anchored-context/reference --access public
```

Scoped packages publish privately by default, so `--access public` is required
for public release.

## Install Surface For Adopters

```bash
npx @code-anchored-context/planning init --project-name "My App"
npx @code-anchored-context/reference init --project-name "My App"
```

Each `init` is idempotent: re-running updates the AGENTS.md marker section and
skips existing scaffold directories unless `--force` is passed.
