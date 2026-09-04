const basePath = process.env.NEXT_PUBLIC_FAMA_BASE_PATH ?? '';

export function famaPath(path: string): string {
  if (!path.startsWith('/')) return path;
  if (!basePath) return path;
  if (path === '/') return `${basePath}/`;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}

export const famaBasePath = basePath;
