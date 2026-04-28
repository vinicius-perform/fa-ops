import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Briefcase, FileSearch, ListChecks, BarChart3, Settings, ChevronRight, Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/team", label: "Team", icon: Users },
  { to: "/clients", label: "Clients", icon: Briefcase },
  { to: "/analysis", label: "Analysis", icon: FileSearch },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const initials = user?.user_metadata?.full_name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "VM";
  const fullName = user?.user_metadata?.full_name || "Vinícius Marinho";

  return (
    <aside className="hidden md:flex w-[260px] shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen sticky top-0">
      {/* Brand */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <span className="text-sidebar-primary-foreground font-bold text-[15px] tracking-tight">FA</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sidebar-accent-foreground font-semibold text-[15px] tracking-tight">FA Ops</span>
            <span className="text-sidebar-muted text-[11px] font-medium">Operational Control</span>
          </div>
        </div>
      </div>

      {/* Search quick action */}
      <div className="px-3 pb-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/60 hover:bg-sidebar-accent text-sidebar-muted hover:text-sidebar-accent-foreground text-[13px] transition-colors">
          <Search className="h-3.5 w-3.5" />
          <span>Quick search</span>
          <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-sidebar/80 border border-sidebar-border">⌘K</kbd>
        </button>
      </div>

      <div className="px-3 mt-2 mb-2">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-muted">Workspace</p>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {items.map(({ to, label, icon: Icon, end }) => {
          const active = end ? pathname === to : pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-200",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-sidebar-primary" />
              )}
              <Icon className={cn("h-[17px] w-[17px] transition-colors", active ? "text-sidebar-primary" : "text-sidebar-muted group-hover:text-sidebar-accent-foreground")} />
              <span>{label}</span>
              {active && <ChevronRight className="ml-auto h-3.5 w-3.5 text-sidebar-muted" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / user */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 grid place-items-center text-white text-[12px] font-semibold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-sidebar-accent-foreground truncate">{fullName}</p>
              <p className="text-[11px] text-sidebar-muted truncate">Director · Online</p>
            </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="h-8 w-8 rounded-lg grid place-items-center hover:bg-destructive/10 hover:text-destructive text-sidebar-muted transition-colors"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
