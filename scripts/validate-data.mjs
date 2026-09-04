import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();

async function readJson(relativePath) {
  return JSON.parse(await readFile(resolve(root, relativePath), 'utf8'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertHttps(url, label) {
  const parsed = new URL(url);
  assert(parsed.protocol === 'https:', `${label} 必须使用 https: ${url}`);
}

const watch = await readJson('data/watch-sources.json');
const state = await readJson('data/source-state.json');
const inbox = await readJson('data/inbox/candidates.json');

assert(watch.schemaVersion === 1, 'watch-sources.json schemaVersion 必须为 1');
assert(
  watch.policy?.publishMode === 'review-required',
  '自动发布策略必须是 review-required',
);
assert(watch.policy?.officialSourceRequired === true, '必须启用官方来源硬门槛');
assert(
  Array.isArray(watch.sources) && watch.sources.length > 0,
  '监控来源不能为空',
);

const sourceIds = new Set();
for (const source of watch.sources) {
  assert(typeof source.id === 'string' && source.id.length > 0, '来源缺少 id');
  assert(!sourceIds.has(source.id), `来源 id 重复: ${source.id}`);
  sourceIds.add(source.id);
  assert(
    typeof source.publisher === 'string' && source.publisher.length > 0,
    `${source.id} 缺少 publisher`,
  );
  assertHttps(source.url, source.id);
  assert(
    Array.isArray(source.keywords) && source.keywords.length > 0,
    `${source.id} 缺少 keywords`,
  );
}

assert(
  state.schemaVersion === 1 && typeof state.sources === 'object',
  'source-state.json 结构无效',
);
assert(
  inbox.schemaVersion === 1 && Array.isArray(inbox.items),
  'candidates.json 结构无效',
);

const candidateUrls = new Set();
for (const item of inbox.items) {
  assert(sourceIds.has(item.sourceId), `候选项引用未知来源: ${item.sourceId}`);
  assertHttps(item.url, item.id ?? 'candidate');
  assert(!candidateUrls.has(item.url), `候选 URL 重复: ${item.url}`);
  candidateUrls.add(item.url);
  assert(
    ['pending', 'accepted', 'rejected'].includes(item.status),
    `候选状态无效: ${item.status}`,
  );
}

console.log(
  `数据检查通过：${watch.sources.length} 个官方监控源，${inbox.items.length} 个候选项。`,
);
