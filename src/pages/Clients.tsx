import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { StatusBadge, PriorityBadge } from "@/components/ui-blocks/Badges";
import { Search, Calendar, AlertCircle, MoreHorizontal, Briefcase, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EmptyState } from "@/components/ui-blocks/EmptyState";
import { useData } from "@/hooks/useData";
import { AddClientDialog } from "@/components/forms/AddClientDialog";
import { EditClientDialog } from "@/components/forms/EditClientDialog";

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
            <EditClientDialog key={c.id} client={c}>
              <div className="premium-card p-5 group cursor-pointer hover:border-[#95ec00]/20 transition-all hover:scale-[1.01] active:scale-[0.99]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-11 w-11 rounded-xl grid place-items-center text-white font-semibold shadow-lg", c.logoColor)}>
                      {c.initials}
                    </div>
                    <div>
                      <p className="text-[14.5px] font-bold tracking-tight">{c.name}</p>
                      <p className="text-[12px] text-muted-foreground font-medium">{c.niche}</p>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-lg grid place-items-center bg-muted/50 group-hover:bg-[#95ec00]/10 transition-colors">
                    <Settings2 className="h-4 w-4 text-muted-foreground group-hover:text-[#95ec00]" />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between">
                  <div className="flex items-center -space-x-2">
                    {c.team?.slice(0, 4).map(id => {
                      const m = teamById[id];
                      return m ? (
                        <div key={id} className={cn("h-7 w-7 rounded-full grid place-items-center text-white text-[10px] font-bold ring-2 ring-white", m.avatarColor)} title={m.name}>
                          {m.initials}
                        </div>
                      ) : null;
                    })}
                    {c.team?.length > 4 && (
                      <div className="h-7 w-7 rounded-full bg-[#f5f5f7] text-muted-foreground grid place-items-center text-[10px] font-bold ring-2 ring-white">
                        +{c.team.length - 4}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-black/30 uppercase tracking-widest">
                    <Calendar className="h-3.5 w-3.5 text-[#95ec00]" />
                    {c.lastAnalysis === "Never" ? "No analysis" : c.lastAnalysis}
                  </div>
                </div>
              </div>
            </EditClientDialog>
          ))}
        </div>
        )}
      </div>
    </>
  );
};

export default Clients;
