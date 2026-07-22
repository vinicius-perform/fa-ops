import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="border border-dashed border-border rounded-xl p-10 text-center flex flex-col items-center gap-3">
      <div className="h-11 w-11 rounded-lg bg-accent grid place-items-center">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-[14px] font-semibold text-foreground">{title}</h3>
        {description && <p className="text-[12.5px] text-muted-foreground mt-1 max-w-md">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
