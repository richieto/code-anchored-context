#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runCli, reportError } from '../lib/installer.js';

const cliName = 'code-anchored-context-planning';
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

const agentsStart = '<!-- code-anchored-context:planning:start -->';
const agentsEnd = '<!-- code-anchored-context:planning:end -->';

const skills = [
  {
    name: 'plan-with-context',
    readmeEntry:
      '- `plan-with-context` - invoke explicitly to draft a durable plan for an initiative in `plan.md`, covering code plus tests, e2e, IaC, CI/CD, and operations.'
  },
  {
    name: 'grill-and-distribute',
    readmeEntry:
      '- `grill-and-distribute` - invoke explicitly to interrogate the plan, distribute it into the durable initiative docs, and promote accepted decisions into the `decisions/` log.'
  }
];

function renderAgentSection(projectName) {
  return `${agentsStart}
## Plan With Durable Context

This project keeps durable working context under [\`context/\`](context/) and an
append-only decision log under [\`decisions/\`](decisions/).

\`context/\` is a disposable working bench: initiatives under
[\`context/initiatives/\`](context/initiatives/) hold the live plan and the
distilled per-concern docs. [\`decisions/\`](decisions/) is durable: accepted
architecture and design decisions are promoted there so they survive after an
initiative folder is archived.

These skills are invocation-only. They do not run automatically; ask for them
by name:

- Use [\`.agents/skills/plan-with-context/SKILL.md\`](.agents/skills/plan-with-context/SKILL.md)
  to draft a durable plan in an initiative's \`plan.md\`. It forces coverage of
  the whole change surface: unit tests, e2e, IaC, CI/CD, config, observability,
  rollout, and security, not only application code.
- Use [\`.agents/skills/grill-and-distribute/SKILL.md\`](.agents/skills/grill-and-distribute/SKILL.md)
  once the plan is settled to interrogate gaps, fan the plan into the durable
  initiative docs, and promote accepted decisions into [\`decisions/\`](decisions/).

Use [\`context/project-profile.md\`](context/project-profile.md) for repo-wide
stack, command, test, delivery, and infrastructure facts when it is populated.
${agentsEnd}`;
}

const config = {
  cliName,
  packageRoot,
  packageJson,
  summaryLabel: 'Plan With Durable Context',
  metadataPath: '.code-anchored-context/planning.json',
  skills,
  agents: {
    start: agentsStart,
    end: agentsEnd,
    render: renderAgentSection
  },
  nextSteps: [
    'Then: invoke .agents/skills/plan-with-context/SKILL.md when you start planning an initiative.'
  ]
};

runCli(config, process.argv.slice(2)).catch((error) => reportError(error, cliName));
