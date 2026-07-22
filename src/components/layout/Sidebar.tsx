import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Megaphone, TrendingUp, Activity, Wallet,
  Users, FileBarChart, Settings, LogOut, ChevronsLeft, ChevronsRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_LABEL } from "@/types";

const items = [
  { to: "/", label: "Visão geral", icon: LayoutDashboard, end: true },
  { to: "/traffic", label: "Tráfego pago", icon: Megaphone },
  { to: "/commercial", label: "Métricas comerciais", icon: TrendingUp },
  { to: "/accounts", label: "Status das contas", icon: Activity },
  { to: "/investment", label: "Banco de investimento", icon: Wallet },
  { to: "/clients", label: "Clientes", icon: Users },
  { to: "/reports", label: "Relatórios", icon: FileBarChart },
  { to: "/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const { user, role, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState<boolean>(() => localStorage.getItem("fa.sidebar") === "1");

  useEffect(() => { localStorage.setItem("fa.sidebar", collapsed ? "1" : "0"); }, [collapsed]);

  const name = (user?.user_metadata?.full_name as string) || user?.email?.split("@")[0] || "Usuário";
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <aside className={cn(
      "hidden md:flex flex-col shrink-0 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 transition-[width] duration-200",
      collapsed ? "w-[68px]" : "w-[240px]"
    )}>
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-4 border-b border-sidebar-border">
        <div className="h-8 w-8 rounded-lg bg-primary grid place-items-center shrink-0">
          <span className="text-primary-foreground font-bold text-[13px] font-mono">FA</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sidebar-accent-foreground font-semibold text-[13.5px] leading-tight truncate">FA Ads</p>
            <p className="text-sidebar-muted text-[10.5px] leading-tight truncate">Intelligence</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => cn(
              "group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className="h-[16px] w-[16px] shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-accent grid place-items-center text-[11px] font-semibold text-accent-foreground shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold text-sidebar-accent-foreground truncate">{name}</p>
              <p className="text-[10px] text-sidebar-muted truncate">{role ? ROLE_LABEL[role] : "—"}</p>
            </div>
            <button onClick={() => signOut()} title="Sair" className="p-1.5 rounded-md text-sidebar-muted hover:text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button onClick={() => signOut()} className="w-full grid place-items-center p-2 rounded-md text-sidebar-muted hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-md text-[11px] text-sidebar-muted hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          {collapsed ? <ChevronsRight className="h-3.5 w-3.5" /> : <><ChevronsLeft className="h-3.5 w-3.5" /> Recolher</>}
        </button>
      </div>
    </aside>
  );
}
