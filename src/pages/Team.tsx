import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { teamMembers } from "@/data/mock";
import { Mail, Phone, MoreHorizontal, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EmptyState } from "@/components/ui-blocks/EmptyState";

const Team = () => {
  const [query, setQuery] = useState("");
  const filtered = teamMembers.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.role.toLowerCase().includes(query.toLowerCase()) ||
    m.department.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Topbar
        title="Team"
        subtitle={`${teamMembers.length} members across ${new Set(teamMembers.map(t => t.department)).size} departments`}
        actions={<TopbarPrimaryButton>Add member</TopbarPrimaryButton>}
      />

      <div className="p-6 lg:p-10 space-y-6 animate-in-fade">
        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-muted/60 border border-transparent focus-within:bg-background focus-within:border-border transition-all flex-1 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, role, department…"
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60">
            {["All", "Active", "Inactive"].map((t, i) => (
              <button key={t} className={cn(
                "px-3 h-8 rounded-lg text-[12px] font-medium transition-all",
                i === 0 ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}>{t}</button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(m => (
            <div key={m.id} className="premium-card p-5 group">
              <div className="flex items-start justify-between">
                <div className={cn("h-12 w-12 rounded-xl grid place-items-center text-white font-semibold", m.avatarColor)}>
                  {m.initials}
                </div>
                <button className="h-8 w-8 rounded-lg grid place-items-center hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <div className="mt-4">
                <p className="text-[14.5px] font-semibold text-foreground tracking-tight">{m.name}</p>
                <p className="text-[12px] text-muted-foreground">{m.role} · {m.department}</p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={cn(
                  "inline-flex items-center gap-1.5 text-[10.5px] font-medium px-2 py-0.5 rounded-full border",
                  m.status === "active" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"
                )}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", m.status === "active" ? "bg-success" : "bg-muted-foreground")} />
                  {m.status === "active" ? "Active" : "Inactive"}
                </span>
                <span className="text-[10.5px] font-medium text-muted-foreground">
                  {m.assignedClients} {m.assignedClients === 1 ? "client" : "clients"}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-1.5">
                <a href={`mailto:${m.email}`} className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-3.5 w-3.5" /> <span className="truncate">{m.email}</span>
                </a>
                <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" /> {m.phone}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table view */}
        <div className="premium-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-[14px] font-semibold tracking-tight">All members</h3>
            <span className="text-[12px] text-muted-foreground">{filtered.length} results</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-muted-foreground bg-muted/40">
                  <th className="px-6 py-3 font-medium text-[11.5px] uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 font-medium text-[11.5px] uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 font-medium text-[11.5px] uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 font-medium text-[11.5px] uppercase tracking-wider">Clients</th>
                  <th className="px-6 py-3 font-medium text-[11.5px] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 font-medium text-[11.5px] uppercase tracking-wider">Contact</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(m => (
                  <tr key={m.id} className="border-t border-border hover:bg-muted/40 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className={cn("h-8 w-8 rounded-lg grid place-items-center text-white text-[11px] font-semibold", m.avatarColor)}>{m.initials}</div>
                        <span className="font-medium">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">{m.role}</td>
                    <td className="px-6 py-3 text-muted-foreground">{m.department}</td>
                    <td className="px-6 py-3 tabular-nums">{m.assignedClients}</td>
                    <td className="px-6 py-3">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 text-[10.5px] font-medium px-2 py-0.5 rounded-full border",
                        m.status === "active" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"
                      )}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", m.status === "active" ? "bg-success" : "bg-muted-foreground")} />
                        {m.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{m.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
