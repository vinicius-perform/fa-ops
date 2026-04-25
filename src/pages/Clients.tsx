import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { clients, teamMembers } from "@/data/mock";
import { StatusBadge, PriorityBadge } from "@/components/ui-blocks/Badges";
import { Search, Calendar, Users as UsersIcon, AlertCircle, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Clients = () => {
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
        subtitle={`${clients.length} active accounts · R$ ${clients.reduce((s, c) => s + c.monthlyFee, 0).toLocaleString()}/mo`}
        actions={<TopbarPrimaryButton>Add client</TopbarPrimaryButton>}
      />

      <div className="p-6 lg:p-10 space-y-6 animate-in-fade">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-muted/60 border border-transparent focus-within:bg-background focus-within:border-border transition-all flex-1 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search clients, niches…" className="flex-1 bg-transparent text-[13px] outline-none" />
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60">
            {["All", "Active", "Attention", "Growth", "Delayed"].map((t, i) => (
              <button key={t} className={cn(
                "px-3 h-8 rounded-lg text-[12px] font-medium transition-all",
                i === 0 ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}>{t}</button>
            ))}
          </div>
        </div>

        {/* Client cards */}
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

              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <StatusBadge status={c.status} />
                <PriorityBadge priority={c.priority} />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-medium">Monthly fee</p>
                  <p className="text-[15px] font-semibold tabular-nums mt-0.5">R$ {c.monthlyFee.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-medium">Pending</p>
                  <p className="text-[15px] font-semibold tabular-nums mt-0.5 inline-flex items-center gap-1.5">
                    {c.pendingActions > 3 && <AlertCircle className="h-3.5 w-3.5 text-warning" />}
                    {c.pendingActions}
                  </p>
                </div>
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
      </div>
    </>
  );
};

export default Clients;
