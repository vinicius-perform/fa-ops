import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { StatusBadge, PriorityBadge } from "@/components/ui-blocks/Badges";
import { Search, Calendar, AlertCircle, MoreHorizontal, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EmptyState } from "@/components/ui-blocks/EmptyState";
import { useData } from "@/hooks/useData";
import { AddClientDialog } from "@/components/forms/AddClientDialog";

const Clients = () => {
  const { clients, teamMembers } = useData();
  const [query, setQuery] = useState("");
  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.niche.toLowerCase().includes(query.toLowerCase())
  );
  const teamById = Object.fromEntries(teamMembers.map(m => [m.id, m]));

  return (
    <>
      <Topbar
        title="Clients"
        subtitle={`${clients.length} registered accounts`}
        actions={
          <AddClientDialog>
            <TopbarPrimaryButton>Add client</TopbarPrimaryButton>
          </AddClientDialog>
        }
      />

      <div className="p-6 lg:p-10 space-y-6 animate-in-fade">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-muted/60 border border-transparent focus-within:bg-background focus-within:border-border transition-all flex-1 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search clients..." className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground" />
          </div>
        </div>

        {clients.length === 0 ? (
          <AddClientDialog>
            <EmptyState
              icon={<Briefcase className="h-6 w-6" />}
              title="No clients yet"
              description="Add your first client to start managing analyses, tasks and the team responsible for them."
              actionLabel="Add client"
            />
          </AddClientDialog>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(c => (
            <div key={c.id} className="premium-card p-5 group cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("h-11 w-11 rounded-xl grid place-items-center text-white font-semibold", c.logoColor)}>
                    {c.initials}
                  </div>
                  <div>
                    <p className="text-[14.5px] font-semibold tracking-tight">{c.name}</p>
                    <p className="text-[12px] text-muted-foreground">{c.niche}</p>
                  </div>
                </div>
                <button className="h-8 w-8 rounded-lg grid place-items-center hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>


              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  {c.team.slice(0, 4).map(id => {
                    const m = teamById[id];
                    return m ? (
                      <div key={id} className={cn("h-7 w-7 rounded-full grid place-items-center text-white text-[10px] font-semibold ring-2 ring-card", m.avatarColor)} title={m.name}>
                        {m.initials}
                      </div>
                    ) : null;
                  })}
                  {c.team.length > 4 && (
                    <div className="h-7 w-7 rounded-full bg-muted text-muted-foreground grid place-items-center text-[10px] font-semibold ring-2 ring-card">
                      +{c.team.length - 4}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Last: {c.lastAnalysis}
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

export default Clients;
