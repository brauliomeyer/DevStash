#!/usr/bin/env node
// Valideert .github/workflows/nextjs.yml (structuur + versies).
// Gebruik: node scripts/validate-workflow.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const here = path.dirname(fileURLToPath(import.meta.url));
const workflowPath = path.resolve(here, '..', '..', '.github', 'workflows', 'nextjs.yml');

function assert(cond, msg) {
  if (!cond) {
    console.error('ASSERT FAIL:', msg);
    process.exit(1);
  }
}

const raw = fs.readFileSync(workflowPath, 'utf8');

let d;
try {
  d = yaml.load(raw);
} catch (err) {
  console.error('YAML PARSE ERROR:', err.message);
  process.exit(1);
}
console.log('YAML parse OK:', path.relative(process.cwd(), workflowPath));

// Top-level secties
['name', 'on', 'permissions', 'concurrency', 'jobs'].forEach((k) =>
  assert(k in d, `top-level key "${k}"`),
);

// Triggers: push naar main én dev, plus handmatige dispatch
assert(Array.isArray(d.on.push.branches), 'push.branches is een array');
assert(d.on.push.branches.includes('main'), 'push.branches bevat "main"');
assert(d.on.push.branches.includes('dev'), 'push.branches bevat "dev"');
assert('workflow_dispatch' in d.on, 'workflow_dispatch trigger aanwezig');

// Jobs (de gecorrigeerde assert)
assert('build' in d.jobs, 'jobs bevat "build"');
assert('deploy' in d.jobs, 'jobs bevat "deploy"');

// Permissions
assert(d.permissions.contents === 'read', 'permissions.contents = read');
assert(d.permissions.pages === 'write', 'permissions.pages = write');
assert(d.permissions['id-token'] === 'write', "permissions.'id-token' = write");

// Concurrency
assert(d.concurrency.group === 'pages', 'concurrency.group = pages');
assert(d.concurrency['cancel-in-progress'] === false, 'cancel-in-progress = false');

// Build job
const build = d.jobs.build;
assert(build['runs-on'] === 'ubuntu-latest', 'build.runs-on = ubuntu-latest');
assert(build['timeout-minutes'] === 15, 'build.timeout-minutes = 15');
assert(build.env.NEXT_TELEMETRY_DISABLED === '1', 'NEXT_TELEMETRY_DISABLED = 1');
assert(build.defaults.run['working-directory'] === './devstash', 'working-directory = ./devstash');

const steps = build.steps;
const names = steps.map((s) => s.name);
['Checkout', 'Setup Node', 'Verify lockfile', 'Install dependencies', 'Verify Next binary', 'Build', 'Upload artifact'].forEach(
  (n) => assert(names.includes(n), `build-stap aanwezig: ${n}`),
);

const checkout = steps.find((s) => s.name === 'Checkout');
assert(checkout.uses === 'actions/checkout@v7', 'checkout@v7');

const setup = steps.find((s) => s.name === 'Setup Node');
assert(setup.uses === 'actions/setup-node@v7', 'setup-node@v7');
assert(setup.with['node-version'] === '24', 'node-version = 24');
assert(setup.with.cache === 'npm', 'cache = npm');
assert(setup.with['cache-dependency-path'] === './devstash/package-lock.json', 'cache-dependency-path');

assert(steps.find((s) => s.name === 'Verify lockfile').run === 'npm ci --dry-run --no-audit --no-fund', 'verify lockfile stap');
assert(steps.find((s) => s.name === 'Install dependencies').run === 'npm ci --no-audit --no-fund', 'install stap');
assert(steps.find((s) => s.name === 'Verify Next binary').run === 'npx --no-install next --version', 'verify next stap');
assert(steps.find((s) => s.name === 'Build').run === 'npm run build', 'build stap');

const upload = steps.find((s) => s.name === 'Upload artifact');
assert(upload.uses === 'actions/upload-pages-artifact@v5', 'upload-pages-artifact@v5');
assert(upload.with.path === './devstash/out', 'artifact pad = ./devstash/out');

// Deploy job
const deploy = d.jobs.deploy;
assert(deploy.needs === 'build', 'deploy.needs = build');
assert(deploy['runs-on'] === 'ubuntu-latest', 'deploy.runs-on = ubuntu-latest');
assert(deploy.environment.name === 'github-pages', 'environment.name = github-pages');
assert(deploy.environment.url === '${{ steps.deployment.outputs.page_url }}', 'environment.url expressie');
assert(deploy.steps[0].name === 'Deploy to GitHub Pages', 'deploy stap naam');
assert(deploy.steps[0].id === 'deployment', 'deploy stap id = deployment');
assert(deploy.steps[0].uses === 'actions/deploy-pages@v5', 'deploy-pages@v5');

console.log('ALLE ASSERTS GESLAAGD');
console.log('Build-stappen:', names.join(' | '));
