import { useLocation } from "react-router-dom";
import { RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientSelector } from "@/components/shared/ClientSelector";
import { AdAccountSelector } from "@/components/shared/AdAccountSelector";
import { PeriodSelector } from "@/components/shared/PeriodSelector";
import { useGlobalFilters } from "@/hooks/useGlobalFilters";
import { formatDate } from "@/lib/format";

const TITLES: Record<string, { title: string; subtitle?: string }> = {
  "/": { title: "Visão geral", subtitle: "Indicadores consolidados do período" },
  "/traffic": { title: "Tráfego pago", subtitle: "Funil, campanhas e indicadores" },
  "/commercial": { title: "Métricas comerciais", subtitle: "Leads, consultas e origem de vendas" },
  "/accounts": { title: "Status das contas", subtitle: "Monitoramento operacional" },
  "/investment": { title: "Banco de investimento", subtitle: "Saldos e estimativas" },
  "/clients": { title: "Clientes", subtitle: "Cadastro e permissões" },
  "/reports": { title: "Relatórios", subtitle: "Exportação e histórico" },
  "/settings": { title: "Configurações", subtitle: "Preferências e integrações" },
};

export function Topbar() {
  const { pathname } = useLocation();
  const { period } = useGlobalFilters();
  const meta = TITLES[pathname] ?? { title: "FA Ads Intelligence" };

  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-border">
      <div className="px-6 py-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[20px] font-semibold text-foreground tracking-tight truncate">{meta.title}</h1>
            {meta.subtitle && <p className="text-[12.5px] text-muted-foreground mt-0.5">{meta.subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-muted-foreground pr-2 border-r border-border">
              <span>Período aplicado:</span>
              <span className="font-mono text-foreground">{formatDate(period.start)} → {formatDate(period.end)}</span>
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" /> Atualizar
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" /> Exportar
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ClientSelector />
          <AdAccountSelector />
          <PeriodSelector />
        </div>
      </div>
    </header>
  );
}
