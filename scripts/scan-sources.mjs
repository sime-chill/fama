import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const baselineOnly = process.argv.includes('--baseline');
const watchPath = resolve(root, 'data/watch-sources.json');
const statePath = resolve(root, 'data/source-state.json');
const inboxPath = resolve(root, 'data/inbox/candidates.json');

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const writeJson = async (path, value) =>
  writeFile(path, `${JSON.stringify(value, null, 2)}\n`);
const cleanText = (value) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();

function canonicalUrl(value, base) {
  try {
    const url = new URL(value, base);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    url.hash = '';
    for (const key of Array.from(url.searchParams.keys())) {
      if (key.startsWith('utm_') || ['ref', 'source', 'nc2'].includes(key))
        url.searchParams.delete(key);
    }
    return url.toString();
  } catch {
    return null;
  }
}

function extractLinks(html, base, keywords) {
  const links = [];
  const anchorPattern =
    /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorPattern.exec(html))) {
    const url = canonicalUrl(match[1], base);
    if (!url) continue;
    const title = cleanText(match[2]) || url;
    const haystack = `${title} ${url}`.toLowerCase();
    const matchedKeywords = keywords.filter((keyword) =>
      haystack.includes(keyword.toLowerCase()),
    );
    if (matchedKeywords.length === 0) continue;
    links.push({ url, title: title.slice(0, 240), matchedKeywords });
  }
  return [...new Map(links.map((link) => [link.url, link])).values()];
}

async function fetchPage(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'ChipAtlasSourceWatch/1.0 (+https://yhhe.top/chipatlas/)',
      accept: 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

const watch = await readJson(watchPath);
const state = await readJson(statePath);
const inbox = await readJson(inboxPath);
const now = new Date().toISOString();
const existingCandidateUrls = new Set(inbox.items.map((item) => item.url));
let changedSources = 0;
let newCandidates = 0;
let failures = 0;

await Promise.all(
  watch.sources.map(async (source) => {
    try {
      const html = await fetchPage(source.url);
      const links = extractLinks(html, source.url, source.keywords);
      const fingerprint = createHash('sha256')
        .update(
          links
            .map((link) => `${link.url}\t${link.title}`)
            .sort()
            .join('\n'),
        )
        .digest('hex');
      const previous = state.sources[source.id];
      const previousUrls = new Set(previous?.seenUrls ?? []);

      if (!previous || previous.fingerprint !== fingerprint) {
        changedSources += 1;
        if (previous && !baselineOnly) {
          for (const link of links) {
            if (
              previousUrls.has(link.url) ||
              existingCandidateUrls.has(link.url)
            )
              continue;
            const id = createHash('sha1')
              .update(link.url)
              .digest('hex')
              .slice(0, 12);
            inbox.items.unshift({
              id,
              sourceId: source.id,
              publisher: source.publisher,
              title: link.title,
              url: link.url,
              discoveredAt: now,
              status: 'pending',
              matchedKeywords: link.matchedKeywords,
              reviewNote: '',
            });
            existingCandidateUrls.add(link.url);
            newCandidates += 1;
          }
        }

        state.sources[source.id] = {
          fingerprint,
          updatedAt: now,
          seenUrls: links.map((link) => link.url).slice(0, 500),
        };
      }
      console.log(`✓ ${source.publisher}: ${links.length} 个相关链接`);
    } catch (error) {
      failures += 1;
      console.warn(`! ${source.publisher}: ${error.message}`);
    }
  }),
);

if (changedSources > 0) {
  state.lastScanAt = now;
  inbox.generatedAt = now;
  await writeJson(statePath, state);
  await writeJson(inboxPath, inbox);
}

console.log(
  `${baselineOnly ? '基线建立' : '检索完成'}：${changedSources} 个来源发生变化，${newCandidates} 个新候选，${failures} 个来源暂时失败。`,
);
if (failures === watch.sources.length) process.exitCode = 1;
