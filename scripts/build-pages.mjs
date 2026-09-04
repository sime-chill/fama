import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const requestedOutput = process.env.CHIPATLAS_PAGES_OUT
  ? path.resolve(process.env.CHIPATLAS_PAGES_OUT)
  : path.join(root, 'pages-dist');
const port = 8799;
const origin = `http://127.0.0.1:${port}`;
const env = { ...process.env, CHIPATLAS_TARGET: 'github-pages' };
// Bun launches this script locally, while Vinext and Wrangler need the Node
// runtime. `node` is available on GitHub's Pages runner; Windows callers can
// provide an absolute CHIPATLAS_NODE path through siteflow.json.
const node = process.env.CHIPATLAS_NODE || 'node';

const buildCode = await run(
  node,
  ['./node_modules/vinext/dist/cli.js', 'build'],
  env,
);
if (buildCode !== 0) process.exit(buildCode);

const clientDir = path.join(root, 'dist', 'client');
if (!(await isDirectory(clientDir))) {
  throw new Error('Vinext completed without dist/client.');
}

await rm(requestedOutput, { recursive: true, force: true });
await mkdir(requestedOutput, { recursive: true });
await cp(clientDir, requestedOutput, { recursive: true });

// A path-style assetPrefix is stored below dist/client/chipatlas by Vinext.
// A GitHub project page already mounts the repository at /chipatlas, so the
// physical files must live at the repository root.
const prefixedAssets = path.join(requestedOutput, 'chipatlas');
if (await isDirectory(prefixedAssets)) {
  await cp(prefixedAssets, requestedOutput, { recursive: true, force: true });
  await rm(prefixedAssets, { recursive: true, force: true });
}

const worker = spawn(
  node,
  [
    './node_modules/wrangler/bin/wrangler.js',
    'dev',
    '--config',
    'dist/server/wrangler.json',
    '--port',
    String(port),
    '--local',
  ],
  { cwd: root, env, stdio: ['ignore', 'pipe', 'pipe'] },
);
let workerLog = '';
worker.stdout.on('data', (chunk) => {
  workerLog += chunk.toString();
});
worker.stderr.on('data', (chunk) => {
  workerLog += chunk.toString();
});

try {
  await waitForServer(origin, worker);
  const { chips, memoryTopics } = await import('../lib/catalog.ts');
  const routes = [
    '/',
    '/chips/',
    '/memory/',
    '/vendors/',
    '/sources/',
    '/updates/',
    ...chips.map((chip) => `/chips/${chip.id}/`),
    ...memoryTopics.map((topic) => `/memory/${topic.id}/`),
  ];

  for (const route of routes) {
    const response = await fetch(origin + route, {
      redirect: 'follow',
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) {
      throw new Error(
        `Static render failed for ${route}: HTTP ${response.status}`,
      );
    }
    const html = await response.text();
    if (
      !html.includes('<!DOCTYPE html>') &&
      !html.includes('<!doctype html>')
    ) {
      throw new Error(`Static render for ${route} did not return HTML.`);
    }
    const outputFile =
      route === '/'
        ? path.join(requestedOutput, 'index.html')
        : path.join(requestedOutput, route.slice(1), 'index.html');
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, html);
  }

  const manifestPath = path.join(requestedOutput, 'manifest.webmanifest');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  manifest.id = '/chipatlas/';
  manifest.start_url = '/chipatlas/';
  manifest.scope = '/chipatlas/';
  manifest.icons = manifest.icons.map((icon) => ({
    ...icon,
    src: icon.src.startsWith('/chipatlas/')
      ? icon.src
      : `/chipatlas${icon.src}`,
  }));
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(path.join(requestedOutput, '.nojekyll'), '');
  console.log(`[pages] rendered ${routes.length} routes to ${requestedOutput}`);
} finally {
  worker.kill();
  await Promise.race([
    new Promise((resolve) => worker.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
}

async function run(command, args, childEnv) {
  return await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      env: childEnv,
      stdio: 'inherit',
    });
    child.once('error', reject);
    child.once('exit', (code) => resolve(code ?? 1));
  });
}

async function isDirectory(candidate) {
  try {
    return (await stat(candidate)).isDirectory();
  } catch {
    return false;
  }
}

async function waitForServer(serverOrigin, child) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(
        `Wrangler exited before static rendering began.\n${workerLog}`,
      );
    }
    try {
      const response = await fetch(serverOrigin + '/', {
        signal: AbortSignal.timeout(1500),
      });
      if (response.ok) return;
    } catch {
      // The worker is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(
    `Timed out waiting for the static rendering worker.\n${workerLog}`,
  );
}
