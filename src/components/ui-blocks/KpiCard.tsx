import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: { value: string; positive?: boolean };
  icon: ReactNode;
  accent?: "default" | "primary" | "warning" | "destructive" | "info" | "success";
}

const accents: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  default: "bg-muted text-foreground",
  primary: "bg-primary/15 text-foreground",
  warning: "bg-warning/15 text-warning",
  destructive: "bg-destructive/15 text-destructive",
  info: "bg-info/15 text-info",
  success: "bg-success/15 text-success",
};

export const KpiCard = ({ label, value, delta, icon, accent = "default" }: KpiCardProps) => {
  return (
    <div className="premium-card p-5 group">
      <div className="flex items-start justify-between">
        <div className={cn("h-10 w-10 rounded-xl grid place-items-center", accents[accent])}>
          {icon}
        </div>
        {delta && (
          <span className={cn(
            "inline-flex items-center gap-0.5 text-[11.5px] font-semibold px-2 py-1 rounded-lg",
            delta.positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          )}>
            {delta.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta.value}
          </span>
        )}
      </div>
      <div className="mt-5">
        <p className="text-[12.5px] text-muted-foreground font-medium">{label}</p>
        <p className="text-[28px] font-semibold tracking-tight text-foreground mt-1 tabular-nums">{value}</p>
      </div>
    </div>
  );
};
