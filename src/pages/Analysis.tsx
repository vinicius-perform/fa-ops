import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { analyses, Analysis as AnalysisType, clients } from "@/data/mock";
import { PriorityBadge } from "@/components/ui-blocks/Badges";
import { Search, FileDown, Save, ListPlus, Calendar, User, ChevronRight, X, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EmptyState } from "@/components/ui-blocks/EmptyState";

const Analysis = () => {
  const [selected, setSelected] = useState<AnalysisType | null>(null);
  const [query, setQuery] = useState("");
  const filtered = analyses.filter(a => a.clientName.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <Topbar
        title="Analysis"
        subtitle="Operational deep-dives across your client portfolio"
        actions={<TopbarPrimaryButton onClick={() => analyses[0] && setSelected(analyses[0])}>New analysis</TopbarPrimaryButton>}
      />

      <div className="p-6 lg:p-10 space-y-6 animate-in-fade">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-muted/60 border border-transparent focus-within:bg-background focus-within:border-border transition-all flex-1 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search analyses…" className="flex-1 bg-transparent text-[13px] outline-none" />
          </div>
          <select className="h-10 px-3 rounded-xl bg-muted/60 text-[13px] outline-none border border-transparent hover:border-border transition-all">
            <option>All clients</option>
            {clients.map(c => <option key={c.id}>{c.name}</option>)}
          </select>
          <select className="h-10 px-3 rounded-xl bg-muted/60 text-[13px] outline-none border border-transparent hover:border-border transition-all">
            <option>All priorities</option>
            <option>Urgent</option><option>High</option><option>Medium</option><option>Low</option>
          </select>
          <select className="h-10 px-3 rounded-xl bg-muted/60 text-[13px] outline-none border border-transparent hover:border-border transition-all">
            <option>All statuses</option>
            <option>Active</option><option>Draft</option><option>Completed</option>
          </select>
        </div>

        {/* Analyses list */}
        {analyses.length === 0 ? (
          <EmptyState
            icon={<FileSearch className="h-6 w-6" />}
            title="No analyses yet"
            description="Create your first analysis to document client situation, problems, opportunities and an action plan."
            actionLabel="New analysis"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map(a => (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className="premium-card p-6 text-left group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">{a.clientName}</span>
                      <PriorityBadge priority={a.priority} />
                    </div>
                    <h3 className="text-[15px] font-semibold tracking-tight mt-1.5 line-clamp-1">{a.currentSituation}</h3>
                    <p className="text-[12.5px] text-muted-foreground mt-1.5 line-clamp-2">{a.problems}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-[11.5px] text-muted-foreground">
                  <div className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {a.responsible}</div>
                  <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Due {new Date(a.deadline).toLocaleDateString()}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Slide-over editor */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-foreground/20 backdrop-blur-sm animate-in-fade" onClick={() => setSelected(null)} />
          <div className="w-full max-w-[640px] bg-background border-l border-border shadow-xl flex flex-col animate-slide-in-right">
            <div className="px-7 py-5 border-b border-border flex items-center justify-between sticky top-0 bg-background/90 backdrop-blur-xl z-10">
              <div>
                <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">Analysis</p>
                <h2 className="text-[18px] font-semibold tracking-tight">{selected.clientName}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="h-9 w-9 rounded-xl grid place-items-center hover:bg-muted transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin px-7 py-6 space-y-6">
              {/* Meta */}
              <div className="grid grid-cols-3 gap-3">
                <Field label="Responsible">
                  <p className="text-[13px] font-medium">{selected.responsible}</p>
                </Field>
                <Field label="Deadline">
                  <p className="text-[13px] font-medium">{new Date(selected.deadline).toLocaleDateString()}</p>
                </Field>
                <Field label="Priority">
                  <PriorityBadge priority={selected.priority} />
                </Field>
              </div>

              <Block label="Current situation" value={selected.currentSituation} />
              <Block label="Problems found" value={selected.problems} accent="destructive" />
              <Block label="Opportunities" value={selected.opportunities} accent="success" />
              <Block label="Action plan" value={selected.actionPlan} accent="primary" />
              <Block label="Internal notes" value={selected.notes || "—"} />
            </div>

            <div className="px-7 py-4 border-t border-border flex items-center gap-2 bg-background/90 backdrop-blur-xl">
              <button className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-foreground text-background text-[13px] font-semibold hover:bg-foreground/90 transition-all">
                <Save className="h-4 w-4" /> Save
              </button>
              <button className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-muted hover:bg-muted/70 text-foreground text-[13px] font-semibold transition-colors">
                <FileDown className="h-4 w-4" /> Export PDF
              </button>
              <button className="ml-auto inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold hover:bg-primary/90 transition-colors">
                <ListPlus className="h-4 w-4" /> Generate tasks
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-xl bg-muted/50 p-3">
    <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">{label}</p>
    {children}
  </div>
);

const Block = ({ label, value, accent }: { label: string; value: string; accent?: "destructive" | "success" | "primary" }) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        accent === "destructive" ? "bg-destructive" :
        accent === "success" ? "bg-success" :
        accent === "primary" ? "bg-primary" : "bg-muted-foreground"
      )} />
      <p className="text-[11.5px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
    </div>
    <div className="rounded-2xl border border-border bg-card p-4 text-[13.5px] leading-relaxed text-foreground/90">
      {value}
    </div>
  </div>
);

export default Analysis;
