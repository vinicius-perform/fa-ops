import { Search, Bell, Plus } from "lucide-react";
import { ReactNode } from "react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const Topbar = ({ title, subtitle, actions }: TopbarProps) => {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-4 px-6 lg:px-10 h-[68px]">
        <div className="min-w-0">
          <h1 className="text-[18px] font-semibold tracking-tight text-foreground truncate">{title}</h1>
          {subtitle && <p className="text-[12.5px] text-muted-foreground truncate">{subtitle}</p>}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/60 hover:bg-muted border border-transparent hover:border-border transition-all w-[280px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search clients, tasks, members…"
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
            />
            <kbd className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-background border border-border">⌘K</kbd>
          </div>

          <button className="relative h-9 w-9 grid place-items-center rounded-xl hover:bg-muted transition-colors">
            <Bell className="h-[17px] w-[17px] text-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>

          {actions}
        </div>
      </div>
    </header>
  );
};

export const TopbarPrimaryButton = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-foreground text-background text-[13px] font-semibold hover:bg-foreground/90 active:scale-[0.98] transition-all shadow-sm"
  >
    <Plus className="h-4 w-4" />
    {children}
  </button>
);
