import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { KpiCard } from "@/components/ui-blocks/KpiCard";
import { Briefcase, Users, ListChecks, FileSearch, AlertTriangle, CheckCircle2, FileText, UserPlus } from "lucide-react";
import { activities, clients, tasks, teamMembers, weeklyFlow, tasksByStatus, teamProductivity, clientsBySector } from "@/data/mock";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

const sectorColors = ["#95ec00", "#0f0f0f", "#a3a3a3", "#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899", "#14b8a6", "#f43f5e"];

const Dashboard = () => {
  const pendingTasks = tasks.filter(t => t.status !== "completed").length;
  const completedThisMonth = tasks.filter(t => t.status === "completed").length;
  const delayed = clients.filter(c => c.status === "delayed").length;

  const activityIcon = (type: string) => {
    switch (type) {
      case "analysis": return <FileSearch className="h-3.5 w-3.5" />;
      case "task": return <CheckCircle2 className="h-3.5 w-3.5" />;
      case "client": return <Briefcase className="h-3.5 w-3.5" />;
      case "member": return <UserPlus className="h-3.5 w-3.5" />;
      default: return <FileText className="h-3.5 w-3.5" />;
    }
  };

  return (
    <>
      <Topbar
        title="Good morning, Camila"
        subtitle="Here's what's happening across operations today."
        actions={<TopbarPrimaryButton>New analysis</TopbarPrimaryButton>}
      />

      <div className="p-6 lg:p-10 space-y-6 animate-in-fade">
        {/* KPI grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard label="Total Clients" value={clients.length} icon={<Briefcase className="h-5 w-5" />} delta={{ value: "+2", positive: true }} accent="primary" />
          <KpiCard label="Team Members" value={teamMembers.length} icon={<Users className="h-5 w-5" />} delta={{ value: "+1", positive: true }} accent="info" />
          <KpiCard label="Pending Tasks" value={pendingTasks} icon={<ListChecks className="h-5 w-5" />} delta={{ value: "-4", positive: true }} accent="warning" />
          <KpiCard label="Analyses This Week" value={26} icon={<FileSearch className="h-5 w-5" />} delta={{ value: "+18%", positive: true }} accent="success" />
          <KpiCard label="Delayed Actions" value={delayed} icon={<AlertTriangle className="h-5 w-5" />} delta={{ value: "+1", positive: false }} accent="destructive" />
          <KpiCard label="Completed / Month" value={completedThisMonth + 78} icon={<CheckCircle2 className="h-5 w-5" />} delta={{ value: "+12%", positive: true }} accent="success" />
        </section>

        {/* Charts row */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Weekly flow — big */}
          <div className="premium-card p-6 xl:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight">Weekly operational flow</h3>
                <p className="text-[12px] text-muted-foreground mt-0.5">Analyses & tasks created over the last 7 days</p>
              </div>
              <div className="flex items-center gap-3 text-[11.5px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Tasks</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-foreground" /> Analyses</span>
              </div>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyFlow} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#95ec00" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#95ec00" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gAnalyses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f0f0f" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="#0f0f0f" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12, boxShadow: "var(--shadow-lg)" }} />
                  <Area type="monotone" dataKey="tasks" stroke="#95ec00" strokeWidth={2.5} fill="url(#gTasks)" />
                  <Area type="monotone" dataKey="analyses" stroke="#0f0f0f" strokeWidth={2} fill="url(#gAnalyses)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tasks by status — donut */}
          <div className="premium-card p-6">
            <h3 className="text-[15px] font-semibold tracking-tight">Tasks by status</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5 mb-3">Distribution across pipelines</p>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={tasksByStatus} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
                    {tasksByStatus.map((_, i) => (
                      <Cell key={i} fill={["#a3a3a3", "#3b82f6", "#f59e0b", "#10b981"][i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {tasksByStatus.map((s, i) => (
                <div key={s.name} className="flex items-center gap-2 text-[12px]">
                  <span className="h-2 w-2 rounded-full" style={{ background: ["#a3a3a3", "#3b82f6", "#f59e0b", "#10b981"][i] }} />
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="ml-auto font-semibold tabular-nums">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom row */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Team productivity */}
          <div className="premium-card p-6 xl:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight">Team productivity</h3>
                <p className="text-[12px] text-muted-foreground mt-0.5">Completed vs open tasks per member</p>
              </div>
            </div>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamProductivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                  <Bar dataKey="completed" fill="#95ec00" radius={[6, 6, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="open" fill="#e5e5e5" radius={[6, 6, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity feed */}
          <div className="premium-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold tracking-tight">Recent activity</h3>
              <button className="text-[11.5px] font-semibold text-muted-foreground hover:text-foreground transition-colors">View all</button>
            </div>
            <div className="space-y-1">
              {activities.map(a => (
                <div key={a.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/60 transition-colors">
                  <div className="mt-0.5 h-7 w-7 rounded-lg bg-muted grid place-items-center text-foreground/70 shrink-0">
                    {activityIcon(a.type)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-foreground leading-tight">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{a.meta} · {a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients by sector */}
        <section className="premium-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight">Clients by sector</h3>
              <p className="text-[12px] text-muted-foreground mt-0.5">Portfolio diversification snapshot</p>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientsBySector} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={90} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={18}>
                  {clientsBySector.map((_, i) => <Cell key={i} fill={sectorColors[i % sectorColors.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
