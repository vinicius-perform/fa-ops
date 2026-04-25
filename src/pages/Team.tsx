import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { Search, MoreHorizontal, UserPlus, ChevronRight, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EmptyState } from "@/components/ui-blocks/EmptyState";
import { useData } from "@/hooks/useData";
import { AddMemberDialog } from "@/components/forms/AddMemberDialog";
import { EditMemberDialog } from "@/components/forms/EditMemberDialog";

const Team = () => {
  const { teamMembers } = useData();
  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const roles = ["all", ...Array.from(new Set(teamMembers.map(m => m.role)))];

  const filtered = teamMembers.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.role.toLowerCase().includes(query.toLowerCase()) ||
      m.department.toLowerCase().includes(query.toLowerCase());
    
    const matchesRole = selectedRole === "all" || m.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <Topbar
        title="Team"
        subtitle={`${teamMembers.length} members across ${new Set(teamMembers.map(t => t.department)).size} departments`}
        actions={
          <AddMemberDialog>
            <TopbarPrimaryButton>Add member</TopbarPrimaryButton>
          </AddMemberDialog>
        }
      />

      <div className="p-6 lg:p-10 space-y-6 animate-in-fade">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-muted/60 border border-transparent focus-within:bg-background focus-within:border-border transition-all flex-1 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Search members, roles, depts…" 
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground" 
            />
          </div>
          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="h-10 px-3 rounded-xl border border-muted bg-muted/60 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Roles</option>
            {roles.filter(r => r !== "all").map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {teamMembers.length === 0 ? (
          <AddMemberDialog>
            <EmptyState
              icon={<UserPlus className="h-6 w-6" />}
              title="No team members"
              description="Add your first team member to start assigning clients and tracking productivity."
              actionLabel="Add member"
            />
          </AddMemberDialog>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(m => (
              <EditMemberDialog key={m.id} member={m}>
                <div className="premium-card bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:border-[#95ec00]/20 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer group animate-in-fade-up">
                  <div className="flex flex-col items-center">
                    <div className={cn("h-16 w-16 rounded-2xl text-white text-[20px] font-bold grid place-items-center mb-4 shadow-lg transform group-hover:scale-105 transition-transform duration-300", m.avatarColor)}>
                      {m.initials}
                    </div>
                    <h3 className="text-[17px] font-bold text-foreground group-hover:text-[#95ec00] transition-colors">{m.name}</h3>
                    <p className="text-[12.5px] text-muted-foreground mt-0.5">{m.role}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border space-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Assigned Clients</p>
                      <div className="mt-2 flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-[#95ec00]/10 text-[#95ec00] grid place-items-center shrink-0">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <p className="text-[13.5px] font-bold text-foreground">
                          {m.assignedClients || 0} {m.assignedClients === 1 ? 'Client' : 'Clients'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        "px-2 h-5 rounded-full text-[10px] font-bold uppercase tracking-tight flex items-center gap-1",
                        m.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      )}>
                        <span className={cn("h-1 w-1 rounded-full", m.status === "active" ? "bg-success" : "bg-muted-foreground")} />
                        {m.status}
                      </div>
                      <div className="h-7 w-7 rounded-lg bg-white/[0.05] grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="h-4 w-4 text-[#95ec00]" />
                      </div>
                    </div>
                  </div>
                </div>
              </EditMemberDialog>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Team;
