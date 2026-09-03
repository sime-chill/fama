'use client';

import { useState } from 'react';
import { Plus, Share } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function InstallGuide() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className="h-11 rounded-xl px-4" onClick={() => setOpen(true)}><Plus />添加到 iPhone</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="mx-auto max-w-lg rounded-t-[30px] border-white/10 bg-popover pb-[max(1rem,env(safe-area-inset-bottom))] sm:left-1/2 sm:w-[min(480px,calc(100%-2rem))] sm:-translate-x-1/2">
          <SheetHeader className="px-5 pb-2 pt-6">
            <SheetTitle className="text-xl font-semibold">添加“芯存图谱”到主屏幕</SheetTitle>
            <SheetDescription>使用 Safari 打开公网链接，就能像普通 App 一样启动。</SheetDescription>
          </SheetHeader>
          <ol className="mx-5 mb-5 mt-3 space-y-3">
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
        </SheetContent>
      </Sheet>
    </>
  );
}
