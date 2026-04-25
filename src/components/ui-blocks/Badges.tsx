import { cn } from "@/lib/utils";
import { Priority, ClientStatus, priorityMeta, clientStatusMeta } from "@/data/mock";

export const PriorityBadge = ({ priority, size = "sm" }: { priority: Priority; size?: "sm" | "md" }) => {
  const meta = priorityMeta[priority];
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-medium",
      size === "sm" ? "text-[10.5px] px-2 py-0.5" : "text-[12px] px-2.5 py-1",
      meta.className,
    )}>
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
};

export const StatusBadge = ({ status }: { status: ClientStatus }) => {
  const meta = clientStatusMeta[status];
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border font-medium text-[10.5px] px-2 py-0.5",
      meta.className,
    )}>
      {meta.label}
    </span>
  );
};
