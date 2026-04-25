import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { Search, Calendar, User, Target, CheckCircle2, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { EmptyState } from "@/components/ui-blocks/EmptyState";
import { useData } from "@/hooks/useData";
import { NewTaskDialog } from "@/components/forms/NewTaskDialog";

const Tasks = () => {
  const { tasks, updateTask } = useData();
  const [query, setQuery] = useState("");
  
  const sortedAndFiltered = useMemo(() => {
    let result = tasks.filter(t =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.clientName.toLowerCase().includes(query.toLowerCase())
    );

    // Sort by status first (pending first), then by date
    return result.sort((a, b) => {
      // If one is completed and other is not
      if (a.status === "completed" && b.status !== "completed") return 1;
      if (a.status !== "completed" && b.status === "completed") return -1;

      // Both have same status, sort by date
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      
      return dateA - dateB;
    });
  }, [tasks, query]);

  const handleToggle = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    updateTask(id, { status: newStatus as any });
  };

  const pendingCount = tasks.filter(t => t.status !== "completed").length;

  return (
    <>
      <Topbar
        title="Tasks"
        subtitle={`${pendingCount} pending tasks for your team`}
        actions={
          <NewTaskDialog>
            <TopbarPrimaryButton>New task</TopbarPrimaryButton>
          </NewTaskDialog>
        }
      />

      <div className="p-6 lg:p-10 space-y-8 animate-in-fade max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 h-12 px-4 rounded-2xl bg-white border border-black/5 shadow-sm focus-within:ring-2 focus-within:ring-[#95ec00]/20 transition-all flex-1 max-w-md">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Search tasks or clients…" 
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground font-medium" 
            />
          </div>
        </div>

        {tasks.length === 0 ? (
          <NewTaskDialog>
            <EmptyState
              icon={<ListTodo className="h-8 w-8 text-[#95ec00]" />}
              title="No tasks yet"
              description="Start organizing your work by creating your first task."
              actionLabel="Create Task"
            />
          </NewTaskDialog>
        ) : (
          <div className="space-y-4">
            {sortedAndFiltered.map(t => (
              <div 
                key={t.id}
                className={cn(
                  "group relative bg-white rounded-[24px] p-6 border border-black/5 shadow-sm hover:shadow-md hover:border-[#95ec00]/20 transition-all transform hover:scale-[1.005]",
                  t.status === "completed" && "opacity-60 bg-[#f8f8f8]"
                )}
              >
                <div className="flex items-center gap-6">
                  {/* Checkpoint Circle */}
                  <div 
                    onClick={() => handleToggle(t.id, t.status)}
                    className="flex-shrink-0 cursor-pointer transition-transform active:scale-90"
                  >
                    {t.status === "completed" ? (
                      <div className="h-8 w-8 rounded-full bg-[#95ec00] grid place-items-center">
                        <CheckCircle2 className="h-5 w-5 text-black" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full border-2 border-black/10 group-hover:border-[#95ec00] transition-colors" />
                    )}
                  </div>

                  {/* Task Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "text-[17px] font-bold text-[#1d1d1f] tracking-tight truncate",
                      t.status === "completed" && "line-through text-black/40"
                    )}>
                      {t.title}
                    </h3>
                    
                    <div className="flex items-center flex-wrap gap-4 mt-1.5">
                      <div className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors",
                        t.status === "completed" 
                          ? "bg-muted/30 text-muted-foreground border-transparent" 
                          : "bg-blue-50 text-blue-600 border-blue-100/50"
                      )}>
                        <Target className="h-3 w-3" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{t.clientName}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <User className={cn("h-3.5 w-3.5", t.status !== "completed" && "text-[#95ec00]")} />
                        <span className={cn("text-[12px] font-semibold", t.status === "completed" && "text-muted-foreground")}>
                          {t.responsible}
                        </span>
                      </div>

                      {t.priority === "urgent" && t.status !== "completed" && (
                        <div className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-100 text-[10px] font-bold uppercase tracking-widest">
                          Obrigatório
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Execution Date */}
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-black/5 transition-colors",
                      t.status === "completed" ? "bg-muted/20" : "bg-[#f5f5f7]"
                    )}>
                      <Calendar className={cn("h-4 w-4", t.status !== "completed" && "text-[#95ec00]")} />
                      <span className={cn("text-[13px] font-bold", t.status === "completed" ? "text-muted-foreground" : "text-[#1d1d1f]")}>
                        {new Date(t.dueDate).toLocaleDateString(undefined, { day: "2-digit", month: "2-digit" })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
