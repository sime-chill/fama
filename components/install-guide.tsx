import { Plus, Share } from 'lucide-react';

export function InstallGuide() {
  return (
    <details className="group relative">
      <summary className="inline-flex h-11 cursor-pointer list-none items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:brightness-105 [&::-webkit-details-marker]:hidden">
        <Plus className="size-4 transition group-open:rotate-45" />添加到 iPhone
      </summary>
      <div className="fixed inset-x-4 bottom-[max(6rem,calc(env(safe-area-inset-bottom)+5rem))] z-[60] mx-auto max-w-lg rounded-[26px] border border-white/10 bg-popover p-5 shadow-2xl">
        <h2 className="text-lg font-semibold">添加“芯存图谱”到主屏幕</h2>
        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">使用 Safari 打开公网链接，就能像普通 App 一样启动。再次点击“添加到 iPhone”可收起说明。</p>
        <ol className="mt-4 space-y-2">
          {[
            ['1', '确认当前页面是在 Safari 中打开'],
            ['2', '点击 Safari 底部的分享按钮'],
            ['3', '向下找到“添加到主屏幕”，再点“添加”'],
          ].map(([number, text], index) => (
            <li key={number} className="flex items-center gap-3 rounded-2xl bg-white/[0.045] p-3 text-sm">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary font-mono text-xs text-primary-foreground">{number}</span>
              <span className="flex-1">{text}</span>
              {index === 1 && <Share className="size-4 text-primary" />}
            </li>
          ))}
        </ol>
      </div>
    </details>
  );
}
