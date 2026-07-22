import { Calendar } from "lucide-react";
import { useGlobalFilters } from "@/hooks/useGlobalFilters";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PRESETS: { key: any; label: string }[] = [
  { key: "today", label: "Hoje" },
  { key: "yesterday", label: "Ontem" },
  { key: "last7", label: "Últimos 7 dias" },
  { key: "last30", label: "Últimos 30 dias" },
  { key: "this_month", label: "Este mês" },
  { key: "last_month", label: "Mês anterior" },
];

export function PeriodSelector() {
  const { preset, period, setPreset, setCustomRange } = useGlobalFilters();
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(period.start);
  const [to, setTo] = useState(period.end);

  const today = new Date().toISOString().slice(0, 10);
  const invalid = from > to || from > today || to > today;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="h-8 px-3 rounded-md border border-border bg-input text-[12.5px] flex items-center gap-2 hover:border-border-strong transition-colors">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{period.label}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-3" align="start">
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {PRESETS.map(p => (
            <button
              key={p.key}
              onClick={() => { setPreset(p.key); setOpen(false); }}
              className={cn(
                "text-[12px] px-2 py-1.5 rounded-md border transition-colors text-left",
                preset === p.key ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-border-strong"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="border-t border-border pt-3 space-y-2">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Personalizado</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10.5px] text-muted-foreground">De</label>
              <Input type="date" value={from} max={today} onChange={e => setFrom(e.target.value)} className="h-8 text-[12px]" />
            </div>
            <div>
              <label className="text-[10.5px] text-muted-foreground">Até</label>
              <Input type="date" value={to} max={today} onChange={e => setTo(e.target.value)} className="h-8 text-[12px]" />
            </div>
          </div>
          {invalid && <p className="text-[10.5px] text-destructive">Datas inválidas.</p>}
          <Button
            size="sm"
            disabled={invalid}
            onClick={() => { setCustomRange(from, to); setOpen(false); }}
            className="w-full h-8"
          >
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
