#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runCli, reportError } from '../lib/installer.js';

const cliName = 'code-anchored-context-reference';
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

const agentsStart = '<!-- code-anchored-context:reference:start -->';
const agentsEnd = '<!-- code-anchored-context:reference:end -->';

const skills = [
  {
    name: 'reference-from-tags',
    readmeEntry:
      '- `reference-from-tags` - invoke explicitly to refresh release-anchored `reference/` from the diff between two release tags.'
  },
  {
    name: 'reference-baseline',
    readmeEntry:
      '- `reference-baseline` - invoke explicitly for the first baseline pass: document the current accepted behavior under `reference/`.'
  }
];

function renderAgentSection(projectName) {
  return `${agentsStart}
## Release-Anchored Reference

This project keeps release-anchored reference material under
[\`reference/\`](reference/). Reference describes accepted system behavior as of a
known release tag or explicit baseline. It is not edited as a side effect of
feature work, bug fixes, or refactors.

Touch \`reference/\` only when a human explicitly asks to refresh reference for a
release, create or refresh a baseline, update a specific page, or fix a
demonstrable error. The authoring workflow, per-area guides, and domain
terminology live under
[\`reference/_authoring/\`](reference/_authoring/README.md).

These skills are invocation-only:

- Use [\`.agents/skills/reference-from-tags/SKILL.md\`](.agents/skills/reference-from-tags/SKILL.md)
  to refresh reference from the diff between two release tags. It works whether
  or not any planning workflow was used; it can optionally read
  \`release-doc-notes.md\` when present, but does not require it.
- Use [\`.agents/skills/reference-baseline/SKILL.md\`](.agents/skills/reference-baseline/SKILL.md)
  for the first baseline pass that documents the current accepted behavior.
${agentsEnd}`;
}

const config = {
  cliName,
  packageRoot,
  packageJson,
  summaryLabel: 'Release-Anchored Reference',
  metadataPath: '.code-anchored-context/reference.json',
  skills,
  agents: {
    start: agentsStart,
    end: agentsEnd,
    render: renderAgentSection
  },
  nextSteps: [
    'Then: invoke .agents/skills/reference-baseline/SKILL.md if you want a first baseline, or reference-from-tags at release time.'
  ]
};

runCli(config, process.argv.slice(2)).catch((error) => reportError(error, cliName));
