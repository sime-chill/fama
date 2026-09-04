/* oxlint-disable next/no-html-link-for-pages -- Native navigation is intentional for iOS resilience. */
import { atlasPath } from '@/lib/paths';

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-28 pt-12 text-xs text-muted-foreground sm:px-8 sm:pb-10">
      <div className="flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>芯存图谱 · 从 Memory 看懂 AI 芯片</p>
        <div className="flex gap-4">
          <a href={atlasPath('/sources/')} className="hover:text-foreground">
            来源方法
          </a>
          <span>数据核验于 2026-09-04</span>
        </div>
      </div>
    </footer>
  );
}
