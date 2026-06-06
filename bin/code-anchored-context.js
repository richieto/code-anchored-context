#!/usr/bin/env node

import { execPath } from 'node:process';
import { constants as fsConstants } from 'node:fs';
import {
  access,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templateRelease = 'v0_1_0';
const templateReleaseLabel = 'v0.1.0';
const defaultRelease = 'v1_0_0';
const skillName = 'code-anchored-context';
const metadataRelativePath = 'context/.code-anchored-context.json';
const repositorySkills = [
  {
    name: 'code-anchored-context',
    readmeEntry: '- `code-anchored-context` - use central `context/` initiatives for planning, implementation context, programs, planned initiatives, ADRs, backlog, and release-documentation notes.'
  },
  {
    name: 'project-baseline',
    readmeEntry: '- `project-baseline` - run the first adoption baseline pass: populate `context/project-profile.md`, domain terminology, reference area guides, baseline reference pages, and baseline clarifications.'
  },
  {
    name: 'release-context-closeout',
    readmeEntry: '- `release-context-closeout` - close out a completed release, advance `context/current.md`, carry unfinished work forward, and integrate shipped knowledge into `reference/`.'
  }
];
const agentSectionStart = '<!-- code-anchored-context:start -->';
const agentSectionEnd = '<!-- code-anchored-context:end -->';

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const packageJson = await readPackageJson();

  if (args.help) {
    printHelp(packageJson);
    return;
  }

  if (args.version) {
    console.log(packageJson.version);
    return;
  }

  if (args.command === 'status') {
    await printStatus(args.target, packageJson);
    return;
  }

  if (args.command !== 'init') {
    throw new Error(`Unknown command "${args.command}". Run "code-anchored-context --help".`);
  }

  validateRelease(args.release);

  const targetRoot = path.resolve(args.target);
  const projectName = args.projectName ?? await inferProjectName(targetRoot);
  const installer = new Installer({
    targetRoot,
    projectName,
    release: args.release,
    force: args.force,
    dryRun: args.dryRun,
    packageJson
  });

  await installer.init({ includeReference: args.reference });
}

function parseArgs(argv) {
  const options = {
    command: 'help',
    target: process.cwd(),
    projectName: undefined,
    release: defaultRelease,
    force: false,
    dryRun: false,
    reference: true,
    help: false,
    version: false
  };

  const positionals = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--version' || arg === '-v') {
      options.version = true;
      continue;
    }

    if (arg === '--force') {
      options.force = true;
      continue;
    }

    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (arg === '--no-reference') {
      options.reference = false;
      continue;
    }

    if (arg.startsWith('--target=')) {
      options.target = arg.slice('--target='.length);
      continue;
    }

    if (arg === '--target') {
      options.target = readOptionValue(argv, index, '--target');
      index += 1;
      continue;
    }

    if (arg.startsWith('--project-name=')) {
      options.projectName = arg.slice('--project-name='.length);
      continue;
    }

    if (arg === '--project-name') {
      options.projectName = readOptionValue(argv, index, '--project-name');
      index += 1;
      continue;
    }

    if (arg.startsWith('--release=')) {
      options.release = arg.slice('--release='.length);
      continue;
    }

    if (arg === '--release') {
      options.release = readOptionValue(argv, index, '--release');
      index += 1;
      continue;
    }

    if (arg.startsWith('-')) {
      throw new Error(`Unknown option "${arg}". Run "code-anchored-context --help".`);
    }

    positionals.push(arg);
  }

  if (positionals.length > 1) {
    throw new Error(`Unexpected arguments: ${positionals.slice(1).join(' ')}`);
  }

  options.command = positionals[0] ?? (options.help || options.version ? 'meta' : 'help');
  options.help = options.help || options.command === 'help';

  return options;
}

function readOptionValue(argv, index, optionName) {
  const value = argv[index + 1];

  if (!value || value.startsWith('-')) {
    throw new Error(`${optionName} requires a value.`);
  }

  return value;
}

function printHelp(packageJson) {
  console.log(`code-anchored-context

Usage:
  code-anchored-context init [options]
  code-anchored-context status [options]

Options:
  --target <path>          Project root to install into. Defaults to cwd.
  --project-name <name>   Name used to replace PROJECT_NAME placeholders.
  --release <slug>        Initial release slug. Defaults to ${defaultRelease}.
  --no-reference          Skip the reference/ starter files.
  --force                 Replace existing generated directories.
  --dry-run               Show planned changes without writing files.
  -h, --help              Show help.
  -v, --version           Show package version.

Examples:
  npx code-anchored-context init --project-name "My App"
  npx code-anchored-context@${packageJson.version} init --project-name "My App"
  npx code-anchored-context status --target ../existing-project
  npx code-anchored-context init --release v2_0_0 --no-reference

Use an explicit npm version, such as code-anchored-context@${packageJson.version},
when you want a reproducible initializer. The status command reads
${metadataRelativePath} from an initialized project.
`);
}

function validateRelease(release) {
  if (!/^[A-Za-z0-9._-]+$/.test(release)) {
    throw new Error('Release must contain only letters, numbers, dots, underscores, or hyphens.');
  }
}

async function inferProjectName(targetRoot) {
  try {
    const packageJson = JSON.parse(
      await readFile(path.join(targetRoot, 'package.json'), 'utf8')
    );

    if (typeof packageJson.name === 'string' && packageJson.name.trim()) {
      return packageJson.name.replace(/^@[^/]+\//, '');
    }
  } catch {
    // Fall through to the directory name.
  }

  return path.basename(targetRoot);
}

class Installer {
  constructor({ targetRoot, projectName, release, force, dryRun, packageJson }) {
    this.targetRoot = targetRoot;
    this.projectName = projectName;
    this.release = release;
    this.force = force;
    this.dryRun = dryRun;
    this.packageJson = packageJson;
    this.actions = [];
    this.agentsFilePath = path.join(targetRoot, 'AGENTS.md');
  }

  async init({ includeReference }) {
    await this.ensureDirectory(this.targetRoot);

    await this.installAgentsFile();
    await this.installSkill();
    const installedContext = await this.copyTemplatePath('context', 'context');

    if (installedContext) {
      await this.renameReleasePaths();
    }

    if (includeReference) {
      await this.copyTemplatePath('reference', 'reference');
    } else {
      this.note('skip reference/ (--no-reference)');
    }

    await this.writeMetadata({ includeReference });

    this.printSummary();
  }

  async installAgentsFile() {
    const targetFile = await this.findAgentsFile();
    const targetDisplay = path.basename(targetFile);
    this.agentsFilePath = targetFile;

    if (!await exists(targetFile)) {
      await this.copyTemplatePath('AGENTS.md', 'AGENTS.md');
      this.agentsFilePath = path.join(this.targetRoot, 'AGENTS.md');
      return;
    }

    const current = await readFile(targetFile, 'utf8');
    const section = this.renderAgentSection();

    if (current.includes(agentSectionStart) && current.includes(agentSectionEnd)) {
      const updated = current.replace(
        new RegExp(`${escapeRegExp(agentSectionStart)}[\\s\\S]*?${escapeRegExp(agentSectionEnd)}`),
        section
      );

      if (updated === current) {
        this.note(`${targetDisplay} already has Code-Anchored Context guidance`);
        return;
      }

      await this.writeFile(targetFile, updated, `update ${targetDisplay} Code-Anchored Context section`);
      return;
    }

    const existingSkillPaths = repositorySkills.filter((skill) =>
      current.includes(`.agents/skills/${skill.name}/SKILL.md`)
    );

    if (existingSkillPaths.length === repositorySkills.length) {
      this.note(`${targetDisplay} already points to the Code-Anchored Context skills`);
      return;
    }

    const separator = current.endsWith('\n') ? '\n' : '\n\n';
    await this.writeFile(
      targetFile,
      `${current}${separator}${section}\n`,
      `append Code-Anchored Context guidance to ${targetDisplay}`
    );
  }

  async findAgentsFile() {
    const canonicalPath = path.join(this.targetRoot, 'AGENTS.md');

    let entries;

    try {
      entries = await readdir(this.targetRoot, { withFileTypes: true });
    } catch {
      return canonicalPath;
    }

    if (entries.some((entry) => entry.isFile() && entry.name === 'AGENTS.md')) {
      return canonicalPath;
    }

    const match = entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase() === 'agents.md')
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right))[0];

    return match ? path.join(this.targetRoot, match) : canonicalPath;
  }

  renderAgentSection() {
    return `${agentSectionStart}
## Code-Anchored Context

In-progress specs, plans, ADRs, backlog, implementation context, and
release-documentation notes live under [\`context/\`](context/).
Start with [\`context/current.md\`](context/current.md).
Use [\`context/project-profile.md\`](context/project-profile.md) for
repo-wide stack, command, testing, delivery, infrastructure, observability,
and generated-artifact facts when it has been populated.

For first-time adoption after \`init\`, use the repo-wide skill at
[\`.agents/skills/project-baseline/SKILL.md\`](.agents/skills/project-baseline/SKILL.md)
to populate the project profile, domain terminology, baseline reference, and
baseline clarification notes.

For behavior-changing work, use the repo-wide skill at
[\`.agents/skills/${skillName}/SKILL.md\`](.agents/skills/${skillName}/SKILL.md).
Keep initiative knowledge centralized under \`context/\`; area
\`AGENTS.md\` files should point there rather than copying active plans.

For post-release cleanup after a release branch has merged or a release is
accepted, use the repo-wide skill at
[\`.agents/skills/release-context-closeout/SKILL.md\`](.agents/skills/release-context-closeout/SKILL.md).
${agentSectionEnd}`;
  }

  async installSkill() {
    for (const skill of repositorySkills) {
      await this.copyTemplatePath(
        `.agents/skills/${skill.name}`,
        `.agents/skills/${skill.name}`
      );
    }

    const readmeTarget = await this.findExistingTargetPath('.agents/skills/README.md');
    const readmePath = readmeTarget.exists
      ? readmeTarget.path
      : path.join(this.targetRoot, '.agents/skills/README.md');
    const readmeDisplay = readmeTarget.exists
      ? readmeTarget.display
      : '.agents/skills/README.md';

    if (!await exists(readmePath)) {
      await this.copyTemplatePath('.agents/skills/README.md', '.agents/skills/README.md');
      return;
    }

    const current = await readFile(readmePath, 'utf8');

    const missingSkills = repositorySkills.filter((skill) => !current.includes(skill.name));

    if (missingSkills.length === 0) {
      this.note(`${readmeDisplay} already lists the Code-Anchored Context skills`);
      return;
    }

    const entry = [
      '',
      '## Code-Anchored Context Skills',
      '',
      ...missingSkills.map((skill) => skill.readmeEntry),
      ''
    ].join('\n');

    await this.writeFile(
      readmePath,
      `${current.trimEnd()}\n${entry}`,
      `append Code-Anchored Context skills to ${readmeDisplay}`
    );
  }

  async copyTemplatePath(sourceRelative, targetRelative) {
    const sourcePath = path.join(packageRoot, sourceRelative);
    const targetInfo = await this.findExistingTargetPath(targetRelative);
    const targetPath = path.join(this.targetRoot, targetRelative);

    if (targetInfo.exists) {
      const variantNote = targetInfo.caseVariant ? ` at ${targetInfo.display}` : '';

      if (!this.force) {
        this.note(`skip ${targetRelative} (already exists${variantNote}; use --force to replace)`);
        return false;
      }

      await this.removePath(targetInfo.path, `replace ${targetInfo.display}`);
    }

    await this.copyRecursive(sourcePath, targetPath, targetRelative);
    return true;
  }

  async findExistingTargetPath(targetRelative) {
    const parts = targetRelative.split('/').filter(Boolean);
    let currentPath = this.targetRoot;
    const displayParts = [];

    for (const part of parts) {
      let entries;

      try {
        entries = await readdir(currentPath, { withFileTypes: true });
      } catch {
        return this.missingTargetPath(targetRelative);
      }

      const exactMatch = entries.find((entry) => entry.name === part);
      const caseMatch = exactMatch ?? entries.find(
        (entry) => entry.name.toLowerCase() === part.toLowerCase()
      );

      if (!caseMatch) {
        return this.missingTargetPath(targetRelative);
      }

      currentPath = path.join(currentPath, caseMatch.name);
      displayParts.push(caseMatch.name);
    }

    const display = displayParts.join('/');

    return {
      caseVariant: display !== targetRelative,
      display,
      exists: true,
      path: currentPath
    };
  }

  missingTargetPath(targetRelative) {
    return {
      caseVariant: false,
      display: targetRelative,
      exists: false,
      path: path.join(this.targetRoot, targetRelative)
    };
  }

  async copyRecursive(sourcePath, targetPath, displayPath) {
    if (this.shouldSkipTemplatePath(displayPath)) {
      this.note(`skip ${displayPath} (template repository context)`);
      return;
    }

    const sourceStats = await stat(sourcePath);

    if (sourceStats.isDirectory()) {
      await this.ensureDirectory(targetPath, `create ${displayPath}/`);
      const entries = await readdir(sourcePath, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.name === '.DS_Store') {
          continue;
        }

        await this.copyRecursive(
          path.join(sourcePath, entry.name),
          path.join(targetPath, entry.name),
          path.posix.join(displayPath, entry.name)
        );
      }

      return;
    }

    const contents = await readFile(sourcePath);
    const transformed = this.transformText(contents, displayPath);
    await this.writeFile(targetPath, transformed, `create ${displayPath}`);
  }

  shouldSkipTemplatePath(displayPath) {
    const initiativePrefix = `context/releases/${templateRelease}/initiatives/`;

    return (
      displayPath.startsWith(initiativePrefix) &&
      displayPath !== `${initiativePrefix}.gitkeep`
    );
  }

  transformText(contents, displayPath) {
    if (displayPath === 'context/current.md') {
      return this.renderStarterCurrent();
    }

    if (displayPath === `context/releases/${templateRelease}/backlog.md`) {
      return this.renderStarterReleaseBacklog();
    }

    let text = contents.toString('utf8');
    text = text.replaceAll('PROJECT_NAME', this.projectName);
    text = text.replaceAll(templateRelease, this.release);
    text = text.replaceAll(templateReleaseLabel, this.releaseLabel());
    return text;
  }

  renderStarterCurrent() {
    return `# Current Context

Current release: \`${this.release}\`

Start here:

- \`releases/${this.release}/README.md\`
- \`releases/${this.release}/backlog.md\`
- \`releases/${this.release}/initiatives/\`

Project-wide operating profile:

- \`project-profile.md\`

Durable or deferred context:

- \`programs/\`
- \`backlog/\`

Changing the current release is a release transition. Use:

- \`_templates/release-transition.md\`

Active programs:

- None yet.

Registered initiatives:

- None yet.

To start an initiative, copy \`context/_templates/initiative/\` into
\`context/releases/${this.release}/initiatives/<initiative-slug>/\`, then update the
copied \`README.md\` first so agents have a clear entry point before editing the
supporting files.
`;
  }

  renderStarterReleaseBacklog() {
    return `# ${this.releaseLabel()} Backlog

This file tracks release-level working context that is not yet captured
by an initiative, plus a short summary of initiative progress once
initiatives exist.

## Loose Candidates

No backlog items recorded yet.

## Initiative Summary

No initiatives registered yet.
`;
  }

  async writeMetadata({ includeReference }) {
    const metadataPath = path.join(this.targetRoot, metadataRelativePath);
    const previous = await readOptionalJson(metadataPath);
    const now = new Date().toISOString();
    const referenceScaffold = includeReference || await exists(path.join(this.targetRoot, 'reference'))
      ? 'included'
      : 'not-installed';
    const metadata = {
      schemaVersion: 1,
      packageName: this.packageJson.name,
      installedVersion: this.packageJson.version,
      firstInstalledVersion: previous?.firstInstalledVersion ?? previous?.installedVersion ?? this.packageJson.version,
      firstInstalledAt: previous?.firstInstalledAt ?? previous?.installedAt ?? now,
      lastUpdatedAt: now,
      projectName: this.projectName,
      initialRelease: previous?.initialRelease ?? this.release,
      lastInitRelease: this.release,
      referenceScaffold,
      installedSkills: repositorySkills.map((skill) => skill.name)
    };

    await this.writeFile(
      metadataPath,
      `${JSON.stringify(metadata, null, 2)}\n`,
      `${previous ? 'update' : 'create'} ${metadataRelativePath}`
    );
  }

  releaseLabel() {
    return this.release.replaceAll('_', '.');
  }

  async renameReleasePaths() {
    if (this.release === templateRelease) {
      return;
    }

    await this.renamePath(
      path.join(this.targetRoot, 'context/releases', templateRelease),
      path.join(this.targetRoot, 'context/releases', this.release),
      `rename context/releases/${templateRelease} to context/releases/${this.release}`
    );

    await this.renamePath(
      path.join(this.targetRoot, 'context/_templates/program/releases', `${templateRelease}.md`),
      path.join(this.targetRoot, 'context/_templates/program/releases', `${this.release}.md`),
      `rename context/_templates/program/releases/${templateRelease}.md to ${this.release}.md`
    );
  }

  async renamePath(from, to, message) {
    if (this.dryRun) {
      this.note(message);
      return;
    }

    if (!await exists(from)) {
      return;
    }

    if (await exists(to)) {
      if (!this.force) {
        this.note(`skip ${path.relative(this.targetRoot, to)} (already exists; use --force to replace)`);
        return;
      }

      await this.removePath(to, `replace ${path.relative(this.targetRoot, to)}`);
    }

    this.note(message);

    await mkdir(path.dirname(to), { recursive: true });
    await rename(from, to);
  }

  async ensureDirectory(directory, message) {
    if (message) {
      this.note(message);
    }

    if (!this.dryRun) {
      await mkdir(directory, { recursive: true });
    }
  }

  async removePath(filePath, message) {
    this.note(message);

    if (!this.dryRun) {
      await rm(filePath, { recursive: true, force: true });
    }
  }

  async writeFile(filePath, contents, message) {
    this.note(message);

    if (!this.dryRun) {
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, contents);
    }
  }

  note(message) {
    this.actions.push(message);
  }

  printSummary() {
    const prefix = this.dryRun ? '[dry-run] ' : '';

    for (const action of this.actions) {
      console.log(`${prefix}${action}`);
    }

    console.log(`${prefix}Code-Anchored Context ready for ${this.projectName}.`);

    if (!this.dryRun) {
      console.log(`Next: ask your agent to read ${this.agentsFilePath}.`);
      console.log('Then: ask your agent to use .agents/skills/project-baseline/SKILL.md for the first baseline pass.');
    }
  }
}

async function readPackageJson() {
  return JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));
}

async function printStatus(target, packageJson) {
  const targetRoot = path.resolve(target);
  const metadataPath = path.join(targetRoot, metadataRelativePath);
  const metadata = await readOptionalJson(metadataPath);

  console.log(`Code-Anchored Context status for ${targetRoot}`);
  console.log(`Running CLI version: ${packageJson.version}`);

  if (!metadata) {
    console.log('Installed metadata: not found');
    console.log(`Metadata path: ${metadataRelativePath}`);
    return;
  }

  console.log(`Installed version: ${metadata.installedVersion ?? 'Unknown'}`);
  console.log(`Project: ${metadata.projectName ?? 'Unknown'}`);
  console.log(`Initial release: ${metadata.initialRelease ?? 'Unknown'}`);
  console.log(`Last init release: ${metadata.lastInitRelease ?? 'Unknown'}`);
  console.log(`Reference scaffold: ${metadata.referenceScaffold ?? 'Unknown'}`);
  console.log(`Installed skills: ${formatList(metadata.installedSkills)}`);
  console.log(`Metadata path: ${metadataRelativePath}`);

  if (metadata.installedVersion && metadata.installedVersion !== packageJson.version) {
    console.log('Note: running CLI version differs from installed metadata.');
  }
}

function formatList(value) {
  return Array.isArray(value) && value.length > 0 ? value.join(', ') : 'Unknown';
}

async function readOptionalJson(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return undefined;
  }
}

async function exists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

main().catch((error) => {
  console.error(error.message);
  console.error(`Run "${path.basename(execPath)} ${path.relative(process.cwd(), fileURLToPath(import.meta.url))} --help" for usage.`);
  process.exitCode = 1;
});
