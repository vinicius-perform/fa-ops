import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { tasks as initialTasks, Task, TaskStatus, taskStatusMeta } from "@/data/mock";
import { PriorityBadge } from "@/components/ui-blocks/Badges";
import { Calendar, GripVertical, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, DragEvent } from "react";

const COLUMNS: TaskStatus[] = ["pending", "in-progress", "waiting", "completed"];

const Tasks = () => {
  const [items, setItems] = useState<Task[]>(initialTasks);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (e: DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: DragEvent, status: TaskStatus) => {
    e.preventDefault();
    if (!draggingId) return;
    setItems(prev => prev.map(t => t.id === draggingId ? { ...t, status } : t));
    setDraggingId(null);
  };

  return (
    <>
      <Topbar
        title="Tasks"
        subtitle="Drag cards across columns to update status"
        actions={<TopbarPrimaryButton>New task</TopbarPrimaryButton>}
      />

      <div className="p-6 lg:p-10 animate-in-fade">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {COLUMNS.map(col => {
            const colTasks = items.filter(t => t.status === col);
            return (
              <div
                key={col}
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleDrop(e, col)}
                className="bg-muted/40 rounded-2xl p-3 min-h-[600px]"
              >
                <div className="flex items-center justify-between px-2 py-2">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", taskStatusMeta[col].accent)} />
                    <h3 className="text-[13px] font-semibold tracking-tight">{taskStatusMeta[col].label}</h3>
                    <span className="text-[11px] font-semibold text-muted-foreground bg-background rounded-md px-1.5 py-0.5">{colTasks.length}</span>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground transition-colors text-[18px] leading-none px-1">+</button>
                </div>
                <div className="space-y-2 mt-1">
                  {colTasks.map(t => (
                    <div
                      key={t.id}
                      draggable
                      onDragStart={e => handleDragStart(e, t.id)}
                      className={cn(
                        "premium-card p-3.5 cursor-grab active:cursor-grabbing group",
                        draggingId === t.id && "opacity-40"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[13px] font-medium leading-snug text-foreground line-clamp-3">{t.title}</p>
                        <GripVertical className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <PriorityBadge priority={t.priority} />
                        {t.analysisId && (
                          <span className="inline-flex items-center gap-1 text-[10.5px] text-muted-foreground">
                            <Link2 className="h-3 w-3" /> Linked
                          </span>
                        )}
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground truncate">{t.clientName}</span>
                        <div className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(t.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-[11px] text-foreground/70 font-medium">{t.responsible}</span>
                      </div>
                    </div>
                  ))}
                  {colTasks.length === 0 && (
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center text-[12px] text-muted-foreground">
                      Drop tasks here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tasks;
