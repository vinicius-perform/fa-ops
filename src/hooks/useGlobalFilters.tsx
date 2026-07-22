import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { Period } from "@/types";

type PeriodPreset =
  | "today"
  | "yesterday"
  | "last7"
  | "last30"
  | "this_month"
  | "last_month"
  | "custom";

interface Filters {
  clientId: string | null;
  accountId: string | null;
  preset: PeriodPreset;
  period: Period;
  setClientId: (id: string | null) => void;
  setAccountId: (id: string | null) => void;
  setPreset: (p: PeriodPreset) => void;
  setCustomRange: (start: string, end: string) => void;
}

const Ctx = createContext<Filters | undefined>(undefined);

const PRESET_LABELS: Record<PeriodPreset, string> = {
  today: "Hoje",
  yesterday: "Ontem",
  last7: "Últimos 7 dias",
  last30: "Últimos 30 dias",
  this_month: "Este mês",
  last_month: "Mês anterior",
  custom: "Personalizado",
};

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function computePeriod(preset: PeriodPreset, customStart?: string, customEnd?: string): Period {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const label = PRESET_LABELS[preset];
  switch (preset) {
    case "today":
      return { start: toISO(today), end: toISO(today), label };
    case "yesterday": {
      const d = new Date(today);
      d.setDate(d.getDate() - 1);
      return { start: toISO(d), end: toISO(d), label };
    }
    case "last7": {
      const s = new Date(today);
      s.setDate(s.getDate() - 6);
      return { start: toISO(s), end: toISO(today), label };
    }
    case "last30": {
      const s = new Date(today);
      s.setDate(s.getDate() - 29);
      return { start: toISO(s), end: toISO(today), label };
    }
    case "this_month": {
      const s = new Date(today.getFullYear(), today.getMonth(), 1);
      return { start: toISO(s), end: toISO(today), label };
    }
    case "last_month": {
      const s = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const e = new Date(today.getFullYear(), today.getMonth(), 0);
      return { start: toISO(s), end: toISO(e), label };
    }
    case "custom":
      return { start: customStart ?? toISO(today), end: customEnd ?? toISO(today), label };
  }
}

export function GlobalFiltersProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams();

  const [clientId, setClientIdState] = useState<string | null>(() => params.get("client") ?? localStorage.getItem("fa.clientId"));
  const [accountId, setAccountIdState] = useState<string | null>(() => params.get("account") ?? localStorage.getItem("fa.accountId"));
  const [preset, setPresetState] = useState<PeriodPreset>(() => (params.get("preset") as PeriodPreset) ?? (localStorage.getItem("fa.preset") as PeriodPreset) ?? "last7");
  const [customStart, setCustomStart] = useState<string | undefined>(() => params.get("from") ?? undefined);
  const [customEnd, setCustomEnd] = useState<string | undefined>(() => params.get("to") ?? undefined);

  useEffect(() => {
    const next = new URLSearchParams(params);
    clientId ? next.set("client", clientId) : next.delete("client");
    accountId ? next.set("account", accountId) : next.delete("account");
    next.set("preset", preset);
    if (preset === "custom") {
      customStart && next.set("from", customStart);
      customEnd && next.set("to", customEnd);
    } else {
      next.delete("from");
      next.delete("to");
    }
    setParams(next, { replace: true });
    if (clientId) localStorage.setItem("fa.clientId", clientId); else localStorage.removeItem("fa.clientId");
    if (accountId) localStorage.setItem("fa.accountId", accountId); else localStorage.removeItem("fa.accountId");
    localStorage.setItem("fa.preset", preset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, accountId, preset, customStart, customEnd]);

  const period = useMemo(() => computePeriod(preset, customStart, customEnd), [preset, customStart, customEnd]);

  const value: Filters = {
    clientId, accountId, preset, period,
    setClientId: setClientIdState,
    setAccountId: setAccountIdState,
    setPreset: setPresetState,
    setCustomRange: (s, e) => { setCustomStart(s); setCustomEnd(e); setPresetState("custom"); },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useGlobalFilters() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGlobalFilters must be used inside GlobalFiltersProvider");
  return ctx;
}
