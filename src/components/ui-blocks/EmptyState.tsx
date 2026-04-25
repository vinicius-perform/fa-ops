import React, { ReactNode, forwardRef } from "react";
import { Plus } from "lucide-react";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, actionLabel, onAction, ...props }, ref) => (
    <div ref={ref} {...props} className="premium-card p-12 flex flex-col items-center text-center">
      <div className="h-14 w-14 rounded-2xl bg-muted grid place-items-center text-muted-foreground mb-4">
        {icon}
      </div>
      <h3 className="text-[16px] font-semibold tracking-tight">{title}</h3>
      <p className="text-[13px] text-muted-foreground mt-1.5 max-w-sm">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-foreground text-background text-[13px] font-semibold hover:bg-foreground/90 transition-all"
        >
          <Plus className="h-4 w-4" />
          {actionLabel}
        </button>
      )}
    </div>
  )
);

EmptyState.displayName = "EmptyState";
