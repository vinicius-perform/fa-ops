import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { PriorityBadge } from "@/components/ui-blocks/Badges";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EmptyState } from "@/components/ui-blocks/EmptyState";
import { useData } from "@/hooks/useData";
import { NewAnalysisDialog } from "@/components/forms/NewAnalysisDialog";
import { EditAnalysisDialog } from "@/components/forms/EditAnalysisDialog";
import { Analysis as AnalysisType } from "@/data/mock";
import { Trash2, Pencil, Search, Calendar, User, FileText, ChevronRight, Layout, AlertCircle, X, Save, FileDown, ListPlus, StickyNote } from "lucide-react";

const Analysis = () => {
  const { analyses, deleteAnalysis } = useData();
  const [selected, setSelected] = useState<AnalysisType | null>(null);
  const [query, setQuery] = useState("");

  const filtered = analyses.filter(a =>
    a.clientName.toLowerCase().includes(query.toLowerCase()) ||
    a.responsible.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Topbar
        title="Analyses"
        subtitle={`${analyses.length} active analyses in progress`}
        actions={
          <NewAnalysisDialog>
            <TopbarPrimaryButton>New analysis</TopbarPrimaryButton>
          </NewAnalysisDialog>
        }
      />

      <div className="p-6 lg:p-10 space-y-6 animate-in-fade">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-muted/60 border border-transparent focus-within:bg-background focus-within:border-border transition-all flex-1 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Search by client or responsible…" 
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground" 
            />
          </div>
        </div>

        {analyses.length === 0 ? (
          <NewAnalysisDialog>
            <EmptyState
              icon={<FileText className="h-6 w-6" />}
              title="No analyses found"
              description="Create your first strategic analysis to start tracking client performance and opportunities."
              actionLabel="New analysis"
            />
          </NewAnalysisDialog>
        ) : (
          <div className="flex gap-6 h-[calc(100vh-280px)] min-h-[500px]">
            {/* List */}
            <div className="w-[380px] space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              {filtered.map(a => (
                <div
                  key={a.id}
                  onClick={() => setSelected(a)}
                  className={cn(
                    "premium-card p-4 cursor-pointer transition-all border",
                    selected?.id === a.id ? "border-primary ring-1 ring-primary/20 bg-primary/5" : "hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[13.5px] font-semibold">{a.clientName}</p>
                    <PriorityBadge priority={a.priority} />
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5"><User className="h-3 w-3" /> {a.responsible}</div>
                    <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Due {new Date(a.deadline).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 premium-card p-0 flex flex-col overflow-hidden">
              {selected ? (
                <>
                  <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                    <div>
                      <h2 className="text-[17px] font-bold tracking-tight">{selected.clientName} Analysis</h2>
                      <p className="text-[12.5px] text-muted-foreground mt-0.5">Created on {selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : "Date not set"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={selected.priority} />
                      <div className="w-[1px] h-6 bg-border mx-1" />
                      <EditAnalysisDialog analysis={selected} />
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this analysis?")) {
                            deleteAnalysis(selected.id);
                            setSelected(null);
                          }
                        }}
                        className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                    <section className="space-y-4">
                      <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 pb-2 border-b border-border/50">
                        <StickyNote className="h-4 w-4 text-[#95ec00]" /> Full Strategic Notes
                      </h3>
                      <div 
                        className="text-[15px] text-[#1d1d1f] leading-relaxed whitespace-pre-wrap bg-white p-6 rounded-2xl border border-border/50 shadow-sm min-h-[300px]"
                        dangerouslySetInnerHTML={{ __html: selected.notes || "No notes provided for this analysis." }}
                      />
                    </section>

                    {/* Keep other sections as optional if data exists */}
                    {selected.currentSituation && (
                      <section className="space-y-3">
                        <h3 className="text-[14px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                          <Layout className="h-4 w-4" /> Current Situation
                        </h3>
                        <p className="text-[14px] text-muted-foreground leading-relaxed whitespace-pre-wrap">{selected.currentSituation}</p>
                      </section>
                    )}
                    {selected.problems && (
                      <section className="space-y-3">
                        <h3 className="text-[14px] font-bold uppercase tracking-widest text-warning flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" /> Identified Problems
                        </h3>
                        <p className="text-[14px] text-muted-foreground leading-relaxed whitespace-pre-wrap">{selected.problems}</p>
                      </section>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                  <div className="h-14 w-14 rounded-2xl bg-muted grid place-items-center mb-4">
                    <FileText className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h3 className="text-[16px] font-semibold">Select an analysis</h3>
                  <p className="text-[13px] text-muted-foreground mt-1 max-w-[280px]">Choose an analysis from the list on the left to view full details and action plan.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Analysis;
