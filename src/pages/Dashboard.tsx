import { Activity, Wallet, Users, Megaphone } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { EmptyState } from "@/components/shared/EmptyState";

export default function Dashboard() {
  const { data: clients = [], isLoading } = useClients();

  return (
    <div className="p-6 space-y-6 animate-in-fade">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Clientes", value: clients.length, icon: Users },
          { label: "Contas ativas", value: "—", icon: Activity },
          { label: "Investimento (período)", value: "—", icon: Megaphone },
          { label: "Saldo crítico", value: "—", icon: Wallet },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="surface-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="text-[22px] font-semibold text-foreground mt-2 font-mono">{value}</p>
          </div>
        ))}
      </div>

      <div className="surface-card p-6">
        <h2 className="text-[14px] font-semibold text-foreground mb-1">Visão geral consolidada</h2>
        <p className="text-[12.5px] text-muted-foreground mb-4">Os módulos de tráfego, comercial, status e investimento serão disponibilizados nas próximas entregas. Já é possível cadastrar clientes e contas.</p>
        {isLoading ? null : clients.length === 0 ? (
          <EmptyState icon={Users} title="Nenhum cliente cadastrado" description="Comece adicionando seus clientes em Clientes." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {clients.slice(0, 6).map(c => (
              <div key={c.id} className="border border-border rounded-lg p-3">
                <p className="text-[13px] font-semibold text-foreground truncate">{c.name}</p>
                <p className="text-[11px] text-muted-foreground truncate">{c.segment ?? "—"} · {c.city ?? "—"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
