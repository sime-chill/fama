/* oxlint-disable next/no-html-link-for-pages -- Native navigation is intentional for iOS resilience. */
import { CircuitBoard, Database, Library, MemoryStick } from 'lucide-react';

const navigation = [
  { href: '/chips', label: '芯片库', icon: CircuitBoard },
  { href: '/memory', label: '存储专题', icon: MemoryStick },
  { href: '/sources', label: '来源库', icon: Library },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-background/86 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-8">
        <a href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-[13px] bg-primary text-primary-foreground shadow-[0_0_32px_color-mix(in_oklch,var(--primary)_24%,transparent)]">
            <Database className="size-4.5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">Silicon Memory Atlas</span>
            <span className="block truncate text-base font-semibold tracking-tight">芯存图谱</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="主导航">
          {navigation.map(({ href, label, icon: Icon }) => (
            <a key={href} href={href} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/[0.055] hover:text-foreground">
              <Icon className="size-4" />
              {label}
            </a>
          ))}
        </nav>

        <a href="/sources" className="rounded-full border border-primary/30 bg-primary/8 px-3 py-1.5 text-[11px] font-medium text-primary">
          来源可核验
        </a>
      </div>
    </header>
  );
}

export function MobileNav() {
  return (
    <nav className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 mx-auto grid max-w-md grid-cols-3 rounded-[22px] border border-white/10 bg-[#102027]/94 p-1.5 shadow-2xl backdrop-blur-xl sm:hidden" aria-label="移动端主导航">
      {navigation.map(({ href, label, icon: Icon }) => (
        <a key={href} href={href} className="flex min-w-0 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium text-muted-foreground transition active:bg-white/10 active:text-foreground">
          <Icon className="size-4" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
