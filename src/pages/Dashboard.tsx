import { Topbar, TopbarPrimaryButton } from "@/components/layout/Topbar";
import { KpiCard } from "@/components/ui-blocks/KpiCard";
import { TrendingUp, Users, Briefcase, FileText, Calendar, ArrowUpRight, Activity as ActivityIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { weeklyFlow, activities, tasksByStatus } from "@/data/mock";
import { cn } from "@/lib/utils";
import { useData } from "@/hooks/useData";
import { NewAnalysisDialog } from "@/components/forms/NewAnalysisDialog";

const Dashboard = () => {
  const { clients, teamMembers, analyses, tasks } = useData();

  // Calculate real-time stats
  const totalRevenue = clients.reduce((sum, c) => sum + c.monthlyFee, 0);
  const pendingTasks = tasks.filter(t => t.status !== "completed").length;

  return (
    <>
      <Topbar
        title="Command Center"
        subtitle="Strategic overview and operational performance"
        actions={
          <NewAnalysisDialog>
            <TopbarPrimaryButton>New analysis</TopbarPrimaryButton>
          </NewAnalysisDialog>
        }
      />

      <div className="p-6 lg:p-10 space-y-8 animate-in-fade">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Monthly Revenue"
            value={`R$ ${totalRevenue.toLocaleString()}`}
            trend="+12.5%"
            icon={<TrendingUp className="h-4 w-4" />}
            chartColor="text-success"
          />
          <KpiCard
            title="Active Clients"
            value={clients.length.toString()}
            trend="+2 this month"
            icon={<Briefcase className="h-4 w-4" />}
            chartColor="text-primary"
          />
          <KpiCard
            title="Pending Tasks"
            value={pendingTasks.toString()}
            trend="-5% vs last week"
            icon={<Calendar className="h-4 w-4" />}
            chartColor="text-warning"
          />
          <KpiCard
            title="Team Members"
            value={teamMembers.length.toString()}
            trend="Active"
            icon={<Users className="h-4 w-4" />}
            chartColor="text-info"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="xl:col-span-2 premium-card p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-[16px] font-bold tracking-tight">Operational Flow</h3>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">Analyses and tasks completed weekly</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Analyses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-info" />
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Tasks</span>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyFlow}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <ChartTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px"
                    }}
                  />
                  <Bar dataKey="analyses" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="tasks" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            <div className="premium-card p-6">
              <h3 className="text-[14px] font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                <ActivityIcon className="h-3.5 w-3.5" /> Recent Activity
              </h3>
              <div className="space-y-5">
                {activities.length === 0 ? (
                  <p className="text-[13px] text-muted-foreground italic">No recent activity recorded.</p>
                ) : (
                  activities.map(a => (
                    <div key={a.id} className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-muted grid place-items-center shrink-0">
                        {a.type === "analysis" ? <FileText className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium leading-none truncate">{a.title}</p>
                        <p className="text-[11px] text-muted-foreground mt-1">{a.meta} · {a.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="premium-card p-6 bg-foreground text-background">
              <h3 className="text-[14px] font-bold uppercase tracking-widest opacity-60 mb-1">Growth Forecast</h3>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-[28px] font-bold tracking-tighter">R$ 142k</span>
                <span className="text-[12px] font-medium opacity-80">+18% goal</span>
              </div>
              <p className="text-[12px] opacity-70 mt-2 leading-relaxed">You're on track to hit the Q2 target. 3 new contracts in negotiation.</p>
              <button className="w-full mt-6 h-10 rounded-xl bg-background text-foreground text-[13px] font-bold hover:bg-background/90 transition-colors flex items-center justify-center gap-2">
                View Reports <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
